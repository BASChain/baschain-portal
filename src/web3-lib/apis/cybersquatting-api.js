import { winWeb3 } from "../index";

import apiErrors from "../api-errors.js";


import ContractJsons from "../abi-manager";
import { prehandleDomain, domain2Ascii, MaxPriceBas, bas2Wei } from "../utils";

import {
  basTokenInstance,
  basOANNInstance,
  basViewInstance
} from "./index";
import { checkSupport } from "../networks";

/**
 * return commitData
 * @param {*} hash
 * @param {*} years
 * @param {*} openApplied
 * @param {*} isCustomed
 * @param {*} customPriceBas
 * @param {*} chainId
 * @param {*} wallet
 * @param {*} domaintext
 */
export async function preValidRoot(params)
{
  const {
    hash,
    years,
    openApplied = false,
    isCustomed,
    customPriceBas,
    chainId,
    wallet
  } = params;
  //console.log(params);
  if (!hash || !wallet) throw apiErrors.PARAM_ILLEGAL;
 // if (!openApplied && isCustomed) throw apiErrors.PARAM_ILLEGAL;
  if (!years || years < 0) throw apiErrors.PARAM_ILLEGAL;
  if (!checkSupport(chainId)) throw apiErrors.UNSUPPORT_NETWORK;
  if (isCustomed && !customPriceBas) throw apiErrors.UNSUPPORT_NETWORK;

  const approveAddress = ContractJsons.BasOANN(chainId).address;
  if (!approveAddress) throw apiErrors.PARAM_ILLEGAL;

  const web3js = winWeb3();


  const view = basViewInstance(web3js, chainId, { from: wallet });
  const token = basTokenInstance(web3js, chainId, { from: wallet });

  const ethbal = await web3js.eth.getBalance(wallet);
  if (!ethbal || ethbal == 0) {
    throw apiErrors.LACK_OF_ETH;
  }

  const baswei = await token.methods.balanceOf(wallet).call();


  /** MAX_YEAR,AROOT_GAS,BROOT_GAS,SUB_GAS */
  const configRet = await view.methods.getOANNParams().call();
  const MAX_YEAR = configRet.MAX_YEAR ;
  const externalWei = configRet.CUSTOM_PRICE_GAS;


  if(years > parseInt(MAX_YEAR)){
    console.log("Years input > max",years)
    throw apiErrors.PARAM_ILLEGAL;
  }

  //query domianInfo
  /**
   * name,owner,expiration,isRoot,rIsOpen,rIsCustom,rIsRare
   * rCusPrice
   */
  const self = await view.methods.queryDomainInfo(hash).call();
  const curTs = new Date().getTime()/1000;
  if (self.expiration - parseInt(curTs) > 0) {
    throw apiErrors.DOMAIN_NOT_EXPIRED
  }

  /**
   * Cost Wei
   */
  const Bn = web3js.utils.BN;
  let unitWei = Boolean(self.rIsRare) ? configRet.AROOT_GAS : configRet.BROOT_GAS;
  const costwei = isCustomed && openApplied
    ? new Bn(unitWei)
        .mul(new Bn(years + ""))
        .add(new Bn(externalWei))
        .toString()
    : new Bn(unitWei).mul(new Bn(years + "")).toString();

  //check baswei
  if (new Bn(baswei).lt(new Bn(costwei))) {
    throw apiErrors.LACK_OF_TOKEN;
  }


  if(parseFloat(customPriceBas) > MaxPriceBas){
    throw apiErrors.DOMAIN_PRICE_RANGE
  }
  const customPrice =
    (!openApplied || !isCustomed) ? configRet.SUB_GAS :
   bas2Wei(customPriceBas+'',web3js);

  return {
    hash,
    years,
    openApplied,
    isCustomed,
    customPrice,
    costwei,
    chainId,
    wallet,
    spender:approveAddress,
    rootbytes: self.name,
    isRoot:true
  };

}


/**
 *
 * @param {*} param0
 */
export function registRootEmitter({
  rootbytes,
  openApplied,
  isCustomed,
  customPrice,
  years,
  chainId,
  wallet
}) {
  const web3js = winWeb3();
  const oann = basOANNInstance(web3js, chainId, { from: wallet });
  return oann.methods
    .registerRoot(rootbytes, openApplied, isCustomed, customPrice, years)
    .send({ from: wallet });
}

/**
 *
 * @param {*} params
 */
export async function preValidSub4Cybersquatting(params) {
  let { hash, unitBas, roottext, years, chainId, wallet } = params;
  console.log(params)
  if (!hash || !wallet || !roottext) throw apiErrors.PARAM_ILLEGAL;
  if (!years || years < 0) throw apiErrors.PARAM_ILLEGAL;
  if (!checkSupport(chainId)) throw apiErrors.UNSUPPORT_NETWORK;

  const approveAddress = ContractJsons.BasOANN(chainId).address;
  if (!approveAddress) throw apiErrors.PARAM_ILLEGAL;

  const web3js = winWeb3();

  const view = basViewInstance(web3js, chainId, { from: wallet });
  const token = basTokenInstance(web3js, chainId, { from: wallet });

  const ethbal = await web3js.eth.getBalance(wallet);
  if (!ethbal || ethbal == 0) {
    throw apiErrors.LACK_OF_ETH;
  }

  const baswei = await token.methods.balanceOf(wallet).call();

  /** MAX_YEAR,AROOT_GAS,BROOT_GAS,SUB_GAS */
  const configRet = await view.methods.getOANNParams().call();
  const MAX_YEAR = configRet.MAX_YEAR;

  if (years > parseInt(MAX_YEAR)) {
    console.log("Years input > max", years);
    throw apiErrors.PARAM_ILLEGAL;
  }

  const self = await view.methods.queryDomainInfo(hash).call();
  const curTs = new Date().getTime() / 1000;
  if (self.expiration - parseInt(curTs) > 0) {
    throw apiErrors.DOMAIN_NOT_EXPIRED;
  }

  const fulltext = web3.utils.hexToString(self.name);
  const pos = fulltext.lastIndexOf(".");

  let subtext = ''
  if(pos>0){
    subtext = fulltext.substr(0,pos);
  }else{
    subtext = fulltext
  }

  const Bn = web3js.utils.BN;
  const unitwei = web3js.utils.toWei(unitBas + "", "ether");
  const costwei = new Bn(unitwei).mul(new Bn(years + "")).toString();
  if (new Bn(baswei).lt(new Bn(costwei))) {
    throw apiErrors.LACK_OF_TOKEN;
  }

  const rootname = prehandleDomain(roottext);

  return {
    isRoot: false,
    approveAddress,
    subbytes: domain2Ascii(subtext),
    rootbytes: domain2Ascii(rootname),
    hash,
    years,
    costwei,
    wallet,
    chainId
  };
}

export function registSubEmitter(params) {
  const { rootbytes, subbytes,years,chainId,wallet } = params;
  const web3js = winWeb3();

  if (!rootbytes || !subbytes ||!years || !checkSupport(chainId) ||!wallet) throw apiErrors.PARAM_ILLEGAL
    const oann = basOANNInstance(web3js, chainId, { from: wallet });

  return oann.methods
    .registerSub(rootbytes, subbytes, years)
    .send({ from: wallet });
}


export default {
  preValidRoot,
  registRootEmitter,
  preValidSub4Cybersquatting,
  registSubEmitter,
};

