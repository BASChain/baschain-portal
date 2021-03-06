import { winWeb3 } from '../index'
import { checkSupport } from '../networks'

import { basTokenInstance } from "./index.js";
import apiErrors from '../api-errors';
import AddrMgr from '../abi-manager'


/**
 *
 * @param {*} chainId required
 * @param {*} wallet required
 */
export function getTokenInst(chainId,wallet) {
  const web3js = winWeb3()
  return basTokenInstance(web3js,chainId,{from:wallet})
}

/**
 * return BN
 * @param {*} chainId
 * @param {*} wallet
 */
export async function getTokenBalance(chainId,wallet){
  const inst = getTokenInst(chainId,wallet)
  return new Web3.utils.BN(await inst.methods.balanceOf(wallet).call(),16)
}

/**
 * return {ethwei BN,baswei BN}
 * @param {*} chainId
 * @param {*} wallet
 */
export async function getBalances(chainId,wallet) {

  const web3js = winWeb3();
  const ethwei = new Web3.utils.BN(await web3js.eth.getBalance(wallet),16)

  let baswei = new Web3.utils.BN(0x0,16);

  if(checkSupport(chainId)){
    const inst = getTokenInst(chainId, wallet);
    baswei = new Web3.utils.BN(await inst.methods.balanceOf(wallet).call(), 16);
  }

  return {
    ethwei,
    baswei
  };
}

export function approveTokenEmitter(spender,costwei,chainId,wallet) {
  if (!Web3.utils.isAddress(spender) || !costwei || !Web3.utils.isAddress(wallet)){
    throw apiErrors.PARAM_ILLEGAL
  }
  if(!checkSupport(chainId))throw apiErrors.UNSUPPORT_NETWORK
  const web3js = winWeb3()
  const token = basTokenInstance(web3js,chainId,{from:wallet})

  return token.methods.approve(spender,costwei).send({ from : wallet })
}

//export async get

/**
 * get
 * @param {*} chainId
 */
export function getWalletWatchAssetOpts(chainId){
  if(checkSupport(chainId)){
    const tokenABI = AddrMgr.BasToken(chainId)

    return {
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: tokenABI.address,
          symbol: "BAS",
          decimals: 18,
          image: "https://avatars1.githubusercontent.com/u/55933627"
        }
      }
    };
  }else {
    return null
  }
}

export default {
  getTokenInst,
  getTokenBalance,
  getBalances,
  approveTokenEmitter,
  getWalletWatchAssetOpts,
};
