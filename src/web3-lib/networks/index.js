import NWTypes from './network-types'

const DEF_CHAINID = 3

export const Networks = [
  { chainId: 1, name: NWTypes.MAINNET, state: false },
  { chainId: 3, name: NWTypes.ROPSTEN, state: true },
  { chainId: 4, name: NWTypes.RINKEBY, state: false },
  { chainId: 5, name: NWTypes.GOERILI, state: false },
  { chainId: 42, name: NWTypes.KOVAN, state: false },
  { chainId:1337, name:NWTypes.LOCAL, state:true}
]

export function getDefaultNetwork(){
  return Networks.find(network => network.chainId === DEF_CHAINID)
}

/**
 * Unfound or unsupport return default
 * @param {*} chainId
 */
export function getNetwork(chainId) {
  if (!checkSupport(chainId))return getDefaultNetwork();
  return Networks.find(nw => nw.chainId === parseInt(chainId))
}



/**
 *
 * @param {*} chainId
 */
export function getNetworkName(chainId){
  if(!chainId)return ''
  const nw = Networks.find(network => network.chainId === parseInt(chainId))
  return nw ? nw.name : ''
}

/**
 * return
 */
export function getSupports(){
  return Networks.filter( nw => nw.state && nw.chainId !==1337)
}

/**
 *
 */
export function getSupportNames() {
  const supports = Networks.filter(nw => nw.state && nw.chainId !== 1337)

  return supports.map(n => n.name.replace(/(^|\s)[a-z]/g,function(s) {
    return s.toUpperCase()
  }))
}



/**
 *
 * @param {*} chainId
 */
export function checkSupport(chainId){
  if(chainId === undefined)throw 'ChainId Illegal'

  const nw = Networks.find(nw => nw.chainId === parseInt(chainId))

  return nw && nw.state
}

export default {
  getNetwork,
  getDefaultNetwork,
  checkSupport,
  getSupports
}
