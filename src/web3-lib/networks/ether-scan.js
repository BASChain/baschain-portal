
const domainHost = "etherscan.io"
const schema = "https"
const subPath = "tx"

import { checkSupport, getNetworkName } from './index'

/**
 *
 * @param {*} chainId
 * @param {*} hash
 */
export function etherscanUrl(chainId,hash) {
  if(!checkSupport(chainId)) return ""
  const networkName = getNetworkName(chainId)
  if(!networkName || !hash) return ""

  return `${schema}://${networkName.toLowerCase()}.${domainHost}/${subPath}/${hash}`
}

export default {
  etherscanUrl
}
