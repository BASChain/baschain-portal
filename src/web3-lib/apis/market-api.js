
import { winWeb3 } from "../index";
import apiErrors from "../api-errors";
import { checkSupport } from '../networks'
import { isOwner, assertExpired, parseHexDomain, dateFormat, prehandleDomain, compareWei2Wei } from "../utils";

import ContractJson from '../abi-manager'

import {
  basViewInstance,
  basMarketInstance,
  basTokenInstance
} from "./index";
import { getInfuraWeb3 } from "../infura";
import { compare } from "semver";
import { cat } from "shelljs";

/**
 *
 * @param {*} domainhash
 * @param {*} unitbas
 * @param {*} chainId
 * @param {*} wallet
 */
export async function validAdd2Market(domainhash,salebas,chainId,wallet){
  if (!domainhash || !salebas || !wallet)throw apiErrors.PARAM_ILLEGAL

  if(!checkSupport(chainId))throw apiErrors.UNSUPPORT_NETWORK
  const web3js = winWeb3()

  const view = basViewInstance(web3js,chainId,{ from : wallet })

  /** name,expiration,owner */
  const domainRet = await view.methods.queryDomainInfo(domainhash).call();
  console.log(domainRet)
  if (!domainRet.name)throw apiErrors.DOMAIN_NOT_EXIST
  const owner = domainRet.owner

  if (!isOwner(wallet, owner))throw apiErrors.NO_UPDATE_PERMISSIONS
  if (assertExpired(domainRet.expiration)) throw apiErrors.DOMAIN_EXPIRED

  const spender = ContractJson.BasMarket(chainId).address
  if (!Web3.utils.isAddress(spender))throw apiErrors.PARAM_ILLEGAL

  const salewei = Web3.utils.toWei(salebas+'','ether')

  return {
    domainhash,
    salewei,
    spender,
    chainId,
    wallet,
  }
}

/**
 *
 * @param {*} domainhash
 * @param {*} unitwei
 * @param {*} chainId
 * @param {*} wallet
 */
export function addHashToMarket(domainhash,unitwei,chainId,wallet){
  if (!domainhash || !unitwei || !wallet) throw apiErrors.PARAM_ILLEGAL
  if (!checkSupport(chainId)) throw apiErrors.UNSUPPORT_NETWORK
  const web3js = winWeb3()
  const market = basMarketInstance(web3js, chainId, { from : wallet })

  return market.methods.AddToSells(domainhash, unitwei).send({ from: wallet })
}

/**
 *
 * @param {*} chainId
 * @param {*} wallet
 */
export async function getEWalletOrders(chainId,wallet){
  if (!Web3.utils.isAddress(wallet)){
    throw apiErrors.PARAM_ILLEGAL
  }
  if(!checkSupport(chainId))throw apiErrors.UNSUPPORT_NETWORK

  const web3js = winWeb3()
  const market = basMarketInstance(web3js,chainId,{ from : wallet })
  const view = basViewInstance(web3js, chainId, { from: wallet })

  const total = await market.methods.ordersCountsOf().call()
  const hashes = await market.methods.ordersOf(0, total).call()

  let mailPromise = await (async ()=>{
    let hs = await market.methods.ordersOf(0, total).call()
    return hs.map(h =>{
      return view.methods.queryOrderInfo(wallet,h).call()
    })
  })()

  let mails = await Promise.all(mailPromise)

  mails = mails.map( m => {
    const hash = Web3.utils.keccak256(Web3.utils.hexToString(m.name))
    return {
      hash,
      name: Web3.utils.hexToString(m.name),
      domaintext:parseHexDomain(m.name),
      invalid:Boolean(m.isValid),
      price:m.price
    }
  })
  console.log('market domians',hashes, mails)
  return mails
}

/**
 * @param {*} domainhash
 * @param {*} unitwei
 * @param {*} chainId
 * @param {*} wallet
 */
export async function changeSellPrice(domainhash, unitwei, chainId, wallet) {
  if (!domainhash || !unitwei || !wallet) throw apiErrors.PARAM_ILLEGAL
  if (!checkSupport(chainId)) throw apiErrors.UNSUPPORT_NETWORK
  const web3js = winWeb3()
  const market = basMarketInstance(web3js, chainId, { from: wallet })
  return market.methods.ChangeSellPrice(domainhash, unitwei).send({ from: wallet })
}

/**
 * remove order on market
 * @param {*} domainhash
 * @param {*} chainId
 * @param {*} wallet
 */
export function deleteSellOrder(domainhash, chainId, wallet) {
  if (!domainhash || !wallet) throw apiErrors.PARAM_ILLEGAL
  if (!checkSupport(chainId)) throw apiErrors.UNSUPPORT_NETWORK
  const web3js = winWeb3()
  const market = basMarketInstance(web3js, chainId, { from: wallet })
  return market.methods.RemoveSellOrder(domainhash).send({ from: wallet })
}

/**
 * get onsale hash array list
 * @param {*} chainId
 */
export async function getOnSaleDomains(chainId) {
  const web3js = getInfuraWeb3(chainId)
  const market = basMarketInstance(web3js, chainId)
  const view = basViewInstance(web3js, chainId)

  let sellAdded = await market.getPastEvents("SellAdded", {fromBlock:0, toBlock:"latest"})
  let sellChanged = await market.getPastEvents("SellChanged", {fromBlock:0, toBlock:"latest"})
  let soldBySell = await market.getPastEvents("SoldBySell", {fromBlock:0, toBlock:"latest"})
  let sellRemoved = await market.getPastEvents("SellRemoved", {fromBlock:0, toBlock:"latest"})

  var logThread = sellAdded.concat(sellChanged, soldBySell, sellRemoved)

  if (!logThread) {
    return logThread
  }

  //Inverse Priority
  try {
    logThread.sort(function(a, b) {
      return (a.blockNumber - b.blockNumber)
    })
  } catch(e) {
    console.error('Inverse logs error', e)
  }

  console.log('******logThread', logThread)
  
  //filter valid log
  try {
    logThread = logThread.reduceRight((sum, cur) => {
      // console.log('sum',sum)
      // console.log('cur', cur)
      sum = Array.isArray(sum) ? sum : [sum]
      if (((sum).find((el) => Object.is(el.returnValues.nameHash, cur.returnValues.nameHash)))!==undefined) {
        return sum
      }
      return [cur, ...sum]
    })
  } catch(e) {
    console.error('Filter vaild log error', e)
  }

  logThread = logThread.filter(item => {
    return (item.event !== "SellRemoved" && item.event !== "SoldBySell")
  })

  console.log('******logThread', logThread)

  var domainOrders = []
  for (let log of logThread) {
    let singleOrder = await view.methods.queryDomainInfo(log.returnValues.nameHash).call()
    domainOrders.push(Object.assign(singleOrder, { salePrice: log.returnValues.price, nameHash: log.returnValues.nameHash }))
  }
  console.log('******domainOrders', domainOrders)
  return domainOrders
}

/**
 * get sold domain list
 * @param {*} chainId
 */
export async function getSoldDomains(chainId) {
  const web3js = getInfuraWeb3(chainId)
  const market = basMarketInstance(web3js, chainId)
  const view = basViewInstance(web3js, chainId)

  let soldList = await market.getPastEvents("SoldBySell", {fromBlock:0, toBlock:"latest"})
  console.log('##########soldList', soldList)
  
  var soldDomains = []
  for (let log of soldList) {
    let domainInfo = await view.methods.queryDomainInfo(log.returnValues.nameHash).call()
    soldDomains.push(Object.assign(log.returnValues, { expire: domainInfo.expiration, name: domainInfo.name }))
  }
  console.log('##########soldDomains', soldDomains)
  return soldDomains
}

/**
 * buy domain from market
 * @param {*} chainId
 * @param {*} price
 * @param {*} nameHash
 * @param {*} owner
 * @param {*} wallet
 */
export async function buyFromMarket(nameHash, owner, price, chainId, wallet) {
  const web3js = winWeb3()
  const market = basMarketInstance(web3js, chainId, { from: wallet })
  const token = basTokenInstance(web3js, chainId, { from: wallet })

  //查余额
  const costwei = price.toString()
  const walletwei = await token.methods.balanceOf(wallet).call()
  if (compareWei2Wei(walletwei, costwei) < 0) throw apiErrors.LACK_OF_TOKEN

  return market.methods.BuyFromSells(nameHash, owner).send({ from: wallet })
}


export function getMarketAddress(chainId) {
  return ContractJson.BasMarket(chainId).address
}

export default {
  validAdd2Market,
  addHashToMarket,
  getEWalletOrders,
  changeSellPrice,
  deleteSellOrder,
  getOnSaleDomains,
  getSoldDomains,
  buyFromMarket,
  getMarketAddress
}
