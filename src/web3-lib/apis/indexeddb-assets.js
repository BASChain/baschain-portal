import { getInfuraWeb3 } from '../infura'

import apiErrors from '../api-errors.js'
import { checkSupport } from "../networks";

import {
  basRootDomainInstance,
  basSubDomainInstance,
  basViewInstance,
} from "./index";

import { parseHexDomain } from '../utils'

/**
 *
 * @param {*} chainId
 */
export async function getLatestRootDomains(chainId){
  if(!checkSupport(chainId))throw apiErrors.UNSUPPORT_NETWORK

  const web3js = getInfuraWeb3(chainId)
  const rootInst = basRootDomainInstance(web3js,chainId)

  const view = basViewInstance(web3js,chainId)

  let rootPromise = await (async () => {
    let rootEvents = await rootInst.getPastEvents('NewRootDomain',{
      fromBlock: 0, toBlock: "latest"
    });
    rootEvents = rootEvents.reverse().filter((it, idx) => idx < 10)

    return rootEvents.map( d =>{
      const hash = d.returnValues.nameHash
      return view.methods.queryDomainInfo(hash).call()
    })
  })();


  let latest10 = await Promise.all(rootPromise)


  return latest10.map(d => {
    const nametext = web3js.utils.hexToString(d.name);
    return {
      name: nametext,
      domaintext: parseHexDomain(d.name),
      hash: web3js.utils.keccak256(nametext),
      customPrice: d.customPrice,
      isRare: Boolean(d.rIsRare),
      openApplied: Boolean(d.rIsOpen),
      isCustomed: Boolean(d.rIsCustom),
      customPrice: d.rCusPrice,
      owner: d.owner,
      expire: d.expiration
    };
  });
}

export async function getLatestSubDomains(chainId){
  if (!checkSupport(chainId)) throw apiErrors.UNSUPPORT_NETWORK

  const web3js = getInfuraWeb3(chainId)
  const subInst = basSubDomainInstance(web3js, chainId)

  const view = basViewInstance(web3js, chainId)

  let subPromise = await (async ()=>{
    let subEvents = await subInst.getPastEvents('NewSubDomain',{
      fromBlock: 0, toBlock: "latest"
    })

    subEvents = subEvents.reverse().filter((it,idx) => idx < 10 )
    return subEvents.map(d => {
      const hash = d.returnValues.nameHash;
      return view.methods.queryDomainInfo(hash).call();
    });
  })();

  let latest10 = await Promise.all(subPromise)

  return latest10.map( d => {
    const nametext = web3js.utils.hexToString(d.name);
    return {
      hash: web3js.utils.keccak256(nametext),
      roothash: d.rootHash,
      name: nametext,
      domaintext: parseHexDomain(d.name),
      owner: d.owner,
      expire: d.expiration
    };
  })
}

export default {
  getLatestRootDomains,
  getLatestSubDomains
}
