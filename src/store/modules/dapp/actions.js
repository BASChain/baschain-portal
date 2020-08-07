import * as types from './mutation-types'
import { checkSupport } from '@/web3-lib/networks'
import {
  getBalances
} from '@/web3-lib/apis/token-api'

import { loadDappConfProps } from "@/web3-lib/apis/dapp-conf-api";
import { getRootDomains } from '@/web3-lib/apis/view-api'

import {
  ROOT_ASSETS,
  OPEN_MAILS,
  checkStorage,
  saveToStorage,
} from '@/bascore/indexDBService.js'


const DEF_DATA_TYPE_DICTS = [
]

import { publicMailDomains } from '@/web3-lib/apis/view-api'
import { getWithdrawable } from '@/web3-lib/apis/account-api'

/**
 * reload open mail on BlockChain
 * @param {*} param0
 */
export async function loadPublicMailDomains({commit,state}){
  const chainId = state.chainId
  console.log("Load Public Mails Assets",chainId)
  const assets = await publicMailDomains(chainId)

  commit(types.LOAD_PUBLIC_MAIL_ASSETS,assets)
  try{
    await saveToStorage(OPEN_MAILS, assets)
  }catch(ex){
    console.log(ex)
  }
}
/**
 *
 * @param {*} param0
 */
export async function fillPublicMailDomains({ commit, state }) {
  try{
    console.log('fill open mails')
    const mails = await checkStorage(OPEN_MAILS)
    console.log('fill open mails>>>>>',mails)
    commit(types.LOAD_PUBLIC_MAIL_ASSETS, assets)
  }catch(ex){
    console.log('fill open mails fail')
  }
}

export async function loadRootAssets({commit,state}){
  const chainId = state.chainId
  const assets = await getRootDomains(chainId)

  commit(types.LOAD_ROOT_ASSETS, assets)
  try{
    await saveToStorage(ROOT_ASSETS, assets)
    console.log("Sync Root Assets completed.", assets.length)
  }catch(ex){
    console.log('Sync Root Assets fail',ex)
  }
}

/**
 *
 */
export async function fillRootAssets({commit}){
  try{
    const assets = await checkStorage(ROOT_ASSETS)
    console.log('fecth root assets fill store',assets)
    if (assets) commit(types.LOAD_ROOT_ASSETS, assets)
  }catch(ex){
    console.log("fill root assets fail",ex)
  }
}

/**
 * main js load once
 */
export function checkInjected({commit}){
  const injected = window.web3 && window.ethereum && window.ethereum.isMetaMask;
  if(window.ethereum) {
    window.ethereum.autoRefreshOnNetworkChange = false;
  }
  commit(types.SET_INJECTED, injected);
}

/**
 * if _metamask.unlock auto login
 * @param {*} param0
 */
export async function autoLoginMetaMask({commit}){
  const web3js = window.web3
  const ethereum = window.ethereum;

  if (web3js && ethereum && ethereum.isMetaMask && ethereum.selectedAddress){
    //const chainId = await web3js.eth.getChainId();
    //const accounts = await web3js.eth.getAccounts();

    const wallet = ethereum.selectedAddress
    const chainId = parseInt(ethereum.chainId);

    if(checkSupport(chainId)){
      commit(types.SET_METAMASK_LOGIN, { chainId, wallet: wallet})
      console.log('auto login metamask', chainId, wallet)
    }
  }else {
    commit(types.CLEAN_WEB3_STATE)
  }
}

/**
 * load Balances :eth bas withdraw
 * @param {*} param0
 */
export async function loadDappBalances({commit,state}){
  const chainId = state.chainId
  const wallet = state.wallet
  console.log('load Balance on ',chainId)
  const resp = await getBalances(chainId, wallet);
  console.log("load balances dispatch", resp);
  commit(types.SET_BALANCES, resp);

  if (checkSupport(chainId) && wallet) {
    try{
      const drawRet = await getWithdrawable(chainId,wallet)
      if( drawRet !== undefined){

        commit(types.UPDATE_WITHDRAWABLE_WEI, drawRet.withdrawWei);
      }
    }catch(ex){
      console.log(ex)
    }
  }else {
    commit(types.UPDATE_WITHDRAWABLE_WEI, "0");
  }
  return resp
}

/**
 * notcie : execute position.
 * load DAppConfiguration from Server api
 * @param {*} param0
 * @param {*} param1
 */
export async function loadDAppConfiguration({commit,state}){
  //Because metamask not login or uninstall show domain state data transfrom maybe need.
  //like domain price trans wei to bas ed.
  //TODO call server api should get all dappState
  try{
    const payload = await loadDappConfProps()
    commit(types.LOAD_DAPP_CONFIG,payload)
    const maxYear = payload.maxRegYears
    if (maxYear){
      commit(types.LOAD_DOMAIN_YEAR_ITEMS, maxYear)
    }
  }catch(ex){
    console.error(ex)
  }
}

/**
 *
 * @param {*} param0
 * commit,getters,state,dispatch
 */
const AccountsChangedHandler = ({commit,state}) =>{

  if (
    window.ethereum &&
    window.ethereum.isMetaMask &&
    !window.ethereum.eventNames().find(n => n === "accountsChanged")
  ) {
    console.info("Start AccountChanged listener...")
    window.ethereum.on("accountsChanged", handler);
  }

  function handler(accounts) {
    const chainId = parseInt(window.ethereum.chainId)
    commit(types.UPDATE_CHAINID,chainId)
    console.log(state.injected, accounts, chainId)

    if(accounts && accounts.length) {
      const wallet = accounts[0]
      commit(types.UPDATE_WALLET, wallet)

      // Balance reload
      loadDappBalances({ commit, state })
        .then( ret => {
          console.info(`reload ${wallet} balance`,ret)
        })
        .catch(ex => {});

      // reload assets,move in show page watch
      try {
        if(checkSupport(chainId)){
          dispatch("dapp/loadPublicMailDomains");
        }
      }catch(ex){}

    }
  }
}

const ChainChangedHandler = ({commit,state,dispatch}) => {
  if (
    window.ethereum &&
    window.ethereum.isMetaMask &&
    !window.ethereum.eventNames().find(n => n === "chainChanged")
  ) {
    console.info("Start chainChanged listener...");
    window.ethereum.on("chainChanged", handler);
  }

  async function handler(chainHex) {
    const chainId = parseInt(chainHex)
    commit(types.UPDATE_CHAINID,chainId)
    console.log("ChainId>>",chainId,state.wallet)
    if(state.wallet){
      // Balance reload
      loadDappBalances({ commit, state })
        .then(() => {
          console.info(`Reload ${chainId} balance complete`);
        })
        .catch(ex => {});
    }

    if(checkSupport(chainId)){
      const accounts = await ethereum.request({method:'eth_accounts'})
      //console.log("state.dapp.wallet", state);
      if(accounts && accounts.length && !state.wallet) {
        commit(types.UPDATE_WALLET,accounts[0])
      }
      loadPublicMailDomains({commit,state}).then(()=>{
        console.info("Reload Open public mails complete at ",chainId)
      }).catch(ex=>{})

      loadRootAssets({commit,state}).then(() =>{
        console.info("Reload Open public domains complete at",chainId)
      }).catch(ex=>{})
    }

  }
}


export default {
  checkInjected,
  autoLoginMetaMask,
  loadDappBalances,
  loadDAppConfiguration,
  loadRootAssets,
  loadPublicMailDomains,
  fillRootAssets,
  fillPublicMailDomains,
  AccountsChangedHandler,
  ChainChangedHandler
};
