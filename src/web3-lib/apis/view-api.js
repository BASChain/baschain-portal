
import { getInfuraWeb3 } from '../infura'

import {
  basRootDomainInstance,
  basMailManagerInstance,
  basViewInstance,
} from "./index";

import {
  prehandleDomain, parseHexDomain, notNullHash,
  assertNullParameter, assertNullAddress, parseHex2Mailtext,
} from "../utils";

import * as ApiErrors from '../api-errors.js'
import { checkSupport } from "../networks";

// /**
//  * depearded
//  * get all root domains for apply select
//  * @param {*} chainId
//  */
// export async function getRootDomains(chainId) {
//   const web3js = getInfuraWeb3(chainId);
//   const rootInst = basMailManagerInstance(web3js, chainId)

//   let namesPromise = await (async () => {
//     let openList = await rootInst.getPastEvents('RootPublicChanged', {
//       fromBlock: 0, toBlock: "latest"
//     })
//     //console.log(openList)

//     return openList.map(d => {
//       return rootInst.getPastEvents("NewRootDomain", {
//         fromBlock: 0, toBlock: "latest",
//         filter: { nameHash: d.returnValues.nameHash }
//       })
//     })
//   })();
//   let namesResult = await Promise.all(namesPromise)

//   let ko = {}
//   let showNames = namesResult.reduce((cur, next) => {
//     ko[next[0].returnValues.nameHash] ? "" : ko[next[0].returnValues.nameHash] = true && cur.push(next)
//     return cur
//   }, []).map((x) => {
//     //console.log(x)
//     return {
//       domaintext: parseHexDomain(x[0].returnValues.rootName),
//       name: Web3.utils.hexToString(x[0].returnValues.rootName),
//       openApplied: Boolean(x[0].returnValues.openToPublic),
//       isCustomed: Boolean(x[0].returnValues.isCustom),
//       hash: x[0].returnValues.nameHash,
//       customPrice: x[0].returnValues.customPrice
//     }
//     //return [parseHexDomain(x[0].returnValues.rootName), x[0].returnValues.openToPublic]
//   })
//   return showNames.filter(r => r.openApplied && isRare(r.domaintext))
// }

/**
 * get all root Domains
 * @param {*} chainId
 */
export async function getRootDomains(chainId) {
  const web3js = getInfuraWeb3(chainId);
  const rootInst = basRootDomainInstance(web3js, chainId)
  const view = basViewInstance(web3js, chainId);

  let namesPromise = await (async () => {
    let openList = await rootInst.getPastEvents("NewRootDomain", {
      fromBlock: 0,
      toBlock: "latest"
    });

    return openList.map(x => {
      return view.methods.queryDomainInfo(x.returnValues.nameHash).call();
    })
  })();
  let namesResult = await Promise.all(namesPromise)
  //console.log(namesResult);

  let rootDomains = namesResult.map(d => {
    const nametext = web3js.utils.hexToString(d.name);
    return {
      hash: web3js.utils.keccak256(nametext),
      name: nametext,
      domaintext: parseHexDomain(d.name),
      isRare: Boolean(d.rIsRare),
      openApplied: Boolean(d.rIsOpen),
      isCustomed: Boolean(d.rIsCustom),
      customPrice: d.rCusPrice,
      owner: d.owner,
      expire: d.expiration
    };
  })
  //console.log("rootDomains", rootDomains);
  return rootDomains.filter(d => d.openApplied && d.isRare);
}

/**
 * get all public domain mail service for apply mail
 * @param {*} chainId
 */
export async function publicMailDomains(chainId){
  const web3js = getInfuraWeb3(chainId);
  const rootInst = basRootDomainInstance(web3js, chainId)
  const mailManager = basMailManagerInstance(web3js, chainId)
  const view = basViewInstance(web3js, chainId)

  /**
   * d.returnValues.domainHash
   */
  let namesPromise = await (async () => {
    let openList = await mailManager.getPastEvents('MailServerOpenChanged', {
      fromBlock: 0, toBlock: "latest"
    })
    //console.log(">>>>>>>>>",openList)
    return openList.map(d => {
      return view.methods.queryDomainEmailInfo(d.returnValues.domainHash).call()
    })
  })();

  let namesResult = await Promise.all(namesPromise)
  //console.log("Mails>>>>>>",namesResult)

  /**
   *
   */
  let ko = {}
  namesResult.map( it => {
    //console.log("Next>>>>", it)
    ko[it.name] = it
  })

  let keys = Object.keys(ko)

  let mailAssets = []
  let nowts = new Date().getTime()

  for(let i = 0;i < keys.length ;i++){
    const data = ko[keys[i]]
    const name = data.name

    const valid = data.isActive && data.openToPublic && (parseFloat(data.expiration) - nowts/1000.00 > 0 )
    mailAssets.push({
      domaintext: parseHexDomain(name),
      hash: Web3.utils.keccak256(Web3.utils.hexToString(name)),
      owner:data.owner,
      expiration:data.expiration,
      isActive:data.isActive,
      openToPublic:data.openToPublic,
      valid: valid
    })
  }

  console.log(mailAssets)

  let showNames = mailAssets.filter( m => m.valid)

  console.log("valid open mails:", showNames)

  return showNames
}

/**
 * find a mail info maybe no exist
 * @param {*} fulltext
 * @param {*} chainId
 */
export async function findMailInfo(fulltext,chainId){
  if (assertNullParameter(fulltext))throw ApiErrors.PARAM_ILLEGAL

  const web3js = getInfuraWeb3(chainId)
  chainId = await web3js.eth.getChainId()
  if(!checkSupport(chainId))throw ApiErrors.UNSUPPORT_NETWORK

  const view = basViewInstance(web3js,chainId,{});
  const hash = Web3.utils.keccak256(fulltext)
  const ret = await view.methods.queryEmailInfo(hash).call()

  const resp = {
    state:0,
    mail:null,
    domain:null
  }

  if (!ret.owner || assertNullAddress(ret.owner))return resp;

  const domainhash = ret.domainHash
  const domainRet = await view.methods.queryDomainInfo(domainhash).call()

  resp.state = 1
  resp.mail = {
    hash,
    domainhash,
    expiration:ret.expiration,
    owner:ret.owner,
    aliasName: ret.aliasName ? Web3.utils.hexToString(ret.aliasName) : '',
    abandoned:!Boolean(ret.isValid),
    bca:ret.bcAddress,
    domaintext: parseHexDomain(domainRet.name)
  }

  resp.domain = {
    hash:domainhash,
    domaintext: parseHexDomain(domainRet.name),
    expire:domainRet.expiration,
    owner:domainRet.owner
  }

  return resp
}

/**
 * get mail info ,not exist will throw error.
 * @param {*} hash
 * @param {*} chainId
 */
export async function getMailInfo(hash,chainId) {
  if (!hash) throw ApiErrors.PARAM_ILLEGAL

  const web3js = getInfuraWeb3(chainId)
  chainId = await web3js.eth.getChainId()
  if (!checkSupport(chainId)) throw ApiErrors.UNSUPPORT_NETWORK

  const view = basViewInstance(web3js, chainId, {});
  console.log("find mail by hash:", hash)
  const ret = await view.methods.queryEmailInfo(hash).call()

  const resp = {
    state: 0,
    mail: null,
    domain: null
  }

  if (!ret.owner || assertNullAddress(ret.owner)) return resp;

  const domainhash = ret.domainHash
  const domainRet = await view.methods.queryDomainInfo(domainhash).call()

  resp.state = 1
  resp.mail = {
    hash,
    domainhash,
    expiration: ret.expiration,
    owner: ret.owner,
    aliasName: ret.aliasName ? Web3.utils.hexToString(ret.aliasName):'',
    abandoned: Boolean(ret.isValid),
    bca: ret.bcAddress ? Web3.utils.hexToString(ret.bcAddress) : '',
    domaintext: parseHexDomain(domainRet.name)
  }

  resp.domain = {
    hash: domainhash,
    domaintext: parseHexDomain(domainRet.name),
    expire: domainRet.expiration,
    owner: domainRet.owner
  }

  return resp
}



/**
 *
 * @param {*} text required
 * @param {*} chainId
 */
export async function findDomain4Search(text, chainId) {
  if (text === undefined || !text.length) throw apiErrors.PARAM_ILLEGAL
  const web3js = getInfuraWeb3(chainId);
  const sname = prehandleDomain(text)
  const hash = Web3.utils.keccak256(sname)

  const viewInst = basViewInstance(web3js, chainId)
  console.log(viewInst._address)
  const res = await viewInst.methods.queryDomainInfo(hash).call();
  //console.log('00000000', res)
  const resp = {
    state: 0,
    assetinfo: null,
    rootasset: null,
    registState: false
  }

  if (!res.name || parseInt(res.expiration) < 0) return resp;
  const isRoot = Boolean(res.isRoot)
  resp.registState = true
  resp.state = 1
  resp.assetinfo = {
    name: Web3.utils.hexToString(res.name),
    domaintext: parseHexDomain(res.name),
    hash: hash,
    owner: res.owner,
    isRoot: isRoot,
    openApplied: Boolean(res.rIsOpen),
    isCustomed: Boolean(res.rIsCustom),
    customPrice: res.rCusPrice,
    expire: res.expiration,
    isRare: Boolean(res.rIsRare),
    isOrder: Boolean(res.isMarketOrder),
    roothash: res.sRootHash
  }

  if (!isRoot && notNullHash(res.sRootHash)) {
    const rootRes = await viewInst.methods.queryDomainInfo(res.sRootHash).call();
    resp.rootasset = {
      name: Web3.utils.hexToString(rootRes.name),
      domaintext: parseHexDomain(rootRes.name),
      hash: res.sRootHash,
      owner: rootRes.owner,
      isRoot: Boolean(rootRes.isRoot),
      openApplied: Boolean(rootRes.rIsOpen),
      isCustomed: Boolean(rootRes.rIsCustom),
      customPrice: rootRes.rCusPrice,
      expire: rootRes.expiration,
      isRare: Boolean(rootRes.rIsRare),
      isOrder: Boolean(rootRes.isMarketOrder),
      roothash: rootRes.sRootHash
    }
  }

  return resp
}

/**
 *
 * @param {*} domainhash
 * @param {*} chainId
 */
export async function getDomainInfo(domainhash,chainId){
  if (!checkSupport(chainId)) throw ApiErrors.UNSUPPORT_NETWORK
  if (!notNullHash(domainhash) )return {state:0}

  const web3js = getInfuraWeb3(chainId);
  const viewInst = basViewInstance(web3js, chainId)
  const res = await viewInst.methods.queryDomainInfo(domainhash).call();

  const isRoot = res && Boolean(res.isRoot);

  if (!res.name || parseInt(res.expiration) === 0) return {state:0};
  const resp = {
    state:1,
    assetinfo:{
      name: Web3.utils.hexToString(res.name),
      domaintext: parseHexDomain(res.name),
      hash: domainhash,
      owner: res.owner,
      isRoot: Boolean(res.isRoot),
      openApplied: Boolean(res.rIsOpen),
      isCustomed: Boolean(res.rIsCustom),
      customPrice: res.rCusPrice,
      expire: res.expiration,
      isRare: Boolean(res.rIsRare),
      isOrder: Boolean(res.isMarketOrder),
      roothash: res.sRootHash
    },
    rootasset:{
      isRoot:true,
      hash:res.sRootHash,
      owner:'',
      expire:0
    }
  }

  if(!isRoot && notNullHash(res.sRootHash)){
    const rootRes = await viewInst.methods
      .queryDomainInfo(res.sRootHash)
      .call();
    if(rootRes.owner && rootRes.expiration){
      const rootasset = {
        domaintext: parseHexDomain(rootRes.name),
        hash: res.sRootHash,
        owner:rootRes.owner||'',
        isRoot: Boolean(rootRes.isRoot),
        openApplied: Boolean(rootRes.rIsOpen),
        isCustomed: Boolean(rootRes.rIsCustom),
        customPrice: rootRes.rCusPrice,
        expire: rootRes.expiration,
        isRare: Boolean(rootRes.rIsRare),
        isOrder: Boolean(rootRes.isMarketOrder)
      };

      resp.rootasset = rootasset
    }
  }

  return resp
}

/**
 *
 * @param {*} roottext
 * @param {*} chainId
 */
export async function valid4CustomizeRoot(roottext, chainId) {
  const web3js = getInfuraWeb3(chainId);

  const domaintext = (roottext+'').trim().toLowerCase()
  const name = prehandleDomain(roottext)

  const hash = web3js.utils.keccak256(name);
  const viewInst = basViewInstance(web3js, chainId);
  const ret = await viewInst.methods.queryDomainInfo(hash).call();

  const exist = ret.name && ret.owner
  const curTs = new Date().getTime()/1000
  if (exist && !ret.rIsOpen && parseInt(ret.expiration - curTs)>0) {
    throw ApiErrors.ROOT_REGIST_CLOSE;
  }

  return {
    domaintext: domaintext,
    name:name,
    hash,
    isCustomizeRoot: true
  };
}

// export async function queryMarketDomain(text, chainId) {
//   if (text === undefined || !text.length) throw apiErrors.PARAM_ILLEGAL

//   const web3js = getInfuraWeb3(chainId);
//   const hash = web3js.utils.keccak256(prehandleDomain(text))
//   const view = basViewInstance(web3js, chainId)
//   const domainInfo = await view.methods.queryDomainInfo(hash).call();
//   console.log('------', domainInfo)
//   if (domainInfo.isMarketOrder) {
//     return Object.assign(domainInfo, { domaintext: text })
//   }
//   return []
// }

export default {
  publicMailDomains,
  findMailInfo
}
