import { checkSupport } from '@/web3-lib/networks'

/**
 *
 */
export function networkAPIEndpoint() {
  const chainId =
    window.ethereum && window.ethereum.chainId
      ? parseInt(window.ethereum.chainId)
      : 3;
  if (!checkSupport(chainId)) return 3;
  return chainId;
}

export default {
  networkAPIEndpoint
};
