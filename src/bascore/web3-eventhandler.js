
import store from "@/store";
import * as DappStoreTypes from '@/store/modules/dapp/mutation-types'
import { winWeb3 } from '@/web3-lib'

import { basTokenInstance } from "@/web3-lib/apis";
import { checkSupport} from '@/web3-lib/networks'
import { getWithdrawable } from '@/web3-lib/apis/account-api'

const BN = Web3.utils.BN


/**
 * call this function to start listener account and network changed.
 * required the metamask injected
 *
 */
export function startDappListener() {
  const web3js = winWeb3();
  const ethereum = window.ethereum

  if (!web3js || !ethereum) {
    return Promise.reject('MetaMask env not injected. listener unloaded.')
  }

  const zeroBN = new BN("0")

  /**
   * listener account changed
   */
  if (!ethereum.eventNames().find(n => n === 'accountsChanged')) {
    ethereum.on('accountsChanged', async function (accounts) {
      const chainId =  parseInt(ethereum.chainId)
      // update ethwei baswei withdraw
      if (accounts.length) {
        const wallet = accounts[0]
        console.log("Current account changed:", wallet)
        store.commit(`dapp/${DappStoreTypes.UPDATE_WALLET}`, wallet);

        //const ethweiBN = new BN(await web3js.eth.getBalance(wallet), 16);

        web3js.eth.getBalance(wallet).then(bal =>{
          const ethweiBN = new BN(bal, 16);
          console.log("ether",bal)
          store.commit(`dapp/${DappStoreTypes.UPDATE_ETHWEI}`, ethweiBN);
        }).catch(ex=>{
          console.warn("Get ether balance error",ex)
        })


        if (checkSupport(chainId)) {
          // baswei update
          const inst = basTokenInstance(web3js, chainId, { from: wallet });
          const basweiBN = new BN(await inst.methods.balanceOf(wallet).call(), 16)
          store.commit(`dapp/${DappStoreTypes.UPDATE_BASWEI}`, basweiBN);

          // withdrawwei update
          try{
            const withDraw = await getWithdrawable(chainId,wallet)
            if (withDraw !== undefined) {
              store.commit('dapp/updateWithdrawable', withDraw.withdrawWei);
            }
          }catch(ex){
            console.warn('get withdraw fail',ex)
          }

          //loadMyAssets
          try{
            store.dispatch('ewallet/loadRootAssets', { chainId, wallet: wallet })
            store.dispatch('ewallet/syncEWalletAssets', { chainId: chainId, wallet: wallet })
            store.dispatch('ewallet/loadEWalletMails', { chainId: chainId, wallet: wallet })
            store.dispatch("ewallet/loadEWalletOrders", {chainId: chainId,wallet: wallet});
          }catch(ex){
            console.warn(ex)
          }

        }
      } else {
        store.commit(`dapp/${DappStoreTypes.UPDATE_WALLET}`, null);
      }
    })
  }


  //chainChanged
  //networkChanged
  if (!ethereum.eventNames().find(n => n === 'chainChanged')) {
    ethereum.on("chainChanged", async function (chainIdHex) {
      const chainId = parseInt(chainIdHex)
      console.log("Current network changed", chainId)
      store.commit(`dapp/${DappStoreTypes.UPDATE_CHAINID}`, chainId);

      const accounts = await web3js.eth.getAccounts()
      if (accounts.length) {
        const wallet = accounts[0]

        const ethweiBN = new BN(await web3js.eth.getBalance(wallet), 16);
        store.commit(`dapp/${DappStoreTypes.UPDATE_ETHWEI}`, ethweiBN);

        if (checkSupport(chainId)) {
          const inst = basTokenInstance(web3js, chainId, { from: wallet });
          const basweiBN = new BN(
            await inst.methods.balanceOf(wallet).call(),
            16
          );
          store.commit(`dapp/${DappStoreTypes.UPDATE_BASWEI}`, basweiBN);

          try {
            const withDraw = await getWithdrawable(chainId, wallet)
            console.log(withDraw);
            if (withDraw !== undefined) {
              store.commit('dapp/updateWithdrawable', withDraw.withdrawWei);
            }
          } catch (ex) {
            console.warn('get withdraw fail', ex)
          }

          //loadRootAssets
          try{
            store.dispatch('dapp/loadRootAssets', { chainId: chainId, wallet })
            store.dispatch('ewallet/syncEWalletAssets', { chainId: chainId, wallet })
            store.dispatch("ewallet/loadEWalletOrders", {chainId: chainId,wallet: wallet});
          }catch(ex){}

        }else{
          store.commit(`dapp/${DappStoreTypes.UPDATE_BASWEI}`, zeroBN);
          store.commit('dapp/updateWithdrawable', zeroBN);
        }
      }else{
        store.commit(`dapp/${DappStoreTypes.UPDATE_ETHWEI}`, zeroBN);
        store.commit(`dapp/${DappStoreTypes.UPDATE_BASWEI}`, zeroBN);
        store.commit('dapp/updateWithdrawable', zeroBN);
      }

    });
  }

  return Promise.resolve('load listener completed.')
}


async function chainHandler(chainHex) {
  console.log(chainHex);
}
