import * as types from './mutation-types'
import {
  getAssetHashPager, getWalletMails
 } from '@/web3-lib/apis/wallet-api.js'

import { getMailInfo, getDomainInfo } from '@/web3-lib/apis/view-api'
import { getEWalletOrders } from '@/web3-lib/apis/market-api'
import { checkSupport } from "@/web3-lib/networks";
import { wei2Float } from '@/utils'
import {
  WALLET_ASSETS,
  WALLET_MAILS,
  MARKET_ASSETS,
  checkStorage,
  saveToStorage,
  saveToKeyStorage,
  checkKeyStorage,
  comboKey,
} from '@/bascore/indexDBService'



/**
 * load MyAssets from block chain
 * @param {*} param0
 * @param {*} payload
 */
export async function syncEWalletAssets({ commit, rootState }, payload = { chainId, wallet }) {
  const chainId = payload.chainId || rootState.dapp.chainId
  const wallet = payload.wallet || rootState.dapp.wallet
  if (checkSupport(chainId) && wallet){
    const key = comboKey(wallet, chainId)
    //const assets = await checkStorage(WALLET_ASSETS)

    const assets = await checkKeyStorage(WALLET_ASSETS, key)
    commit(types.LOAD_EWALLET_ASSETS, assets||[])
  }

  await saveMyAssets({ commit, rootState }, payload)
}

/**
 * update store to indexed DB
 *
 * @param {*} param0
 */
export async function updateEWalletAssetsIndexedDB({ commit, state,rootState }, payload){
  commit(types.UPDATE_ASSET_PROPS, payload)
  const assets = state.assets ||[]
  console.log("updateEWalletAssetsIndexedDB>>>>",assets)
  try{

    //await saveToStorage(WALLET_ASSETS, assets)
    await saveToStorage(WALLET_ASSETS, assets)
  }catch(ex){
  }
}

/**
 * remove asset
 * @param {*} param0
 * @param {*} hash
 */
export async function removeEWalletAssetsIndexedDB({ commit, state }, hash) {
  commit(types.REMOVE_ASSET_BY_HASH, hash)
  const assets = state.assets || []
  try {
    await saveToStorage(WALLET_ASSETS, assets)
  } catch (ex) {
  }
}


/**
 *
 * @param {*} param0
 * @param {*} payload
 */
export async function fillMyAssets({ commit, rootState }, { chainId, wallet }=payload){

  try{
    chainId = chainId || rootState.dapp.chainId
    wallet = wallet || rootState.dapp.wallet
    const key = comboKey(wallet, chainId)
    //const assets = await checkStorage(WALLET_ASSETS)
    const assets = await saveToKeyStorage(WALLET_ASSETS,key)
    console.log("load MyAssets from Indexed DB.")
    if (assets && assets.length) {
      commit(types.LOAD_EWALLET_ASSETS, assets)
    } else {
      console.log('Not find My Assets in IndexedDB')
    }
  }catch(ex){
    console.log('indexedDB error:',ex)
  }

}

/**
 *
 * @param {*} param0
 * @param {*} payload
 */
async function saveMyAssets({commit,rootState},{chainId,wallet} = payload){
  //console.log("syncEWalletAssets",wallet,chainId,rootState)
  chainId = chainId || rootState.dapp.chainId
  wallet = wallet || rootState.dapp.wallet

  if (checkSupport(chainId) && wallet) {
    try {
      const max = rootState.dapp.maxRegYears || 5
      const pager = await getAssetHashPager(chainId, wallet);

      let assets = pager.assets
      if (assets && assets.length) {
        assets = assets.map(asset => {
          asset.canRechargeYear = calcRechargeYear(asset.expire, max)
          return asset
        })
      }

      commit(types.LOAD_EWALLET_HASHES, pager.hashes)
      commit(types.SET_EWALLET_TOTAL, pager.total)
      commit(types.LOAD_EWALLET_ASSETS, assets)

      const key = comboKey(wallet, chainId)
      await saveToKeyStorage(WALLET_ASSETS, assets, key)
      //console.log("Wallet Assets:",assets)
      //await saveToStorage(WALLET_ASSETS, assets)
    } catch (ex) {
      console.error("Synchronize data on the baschain store to indexedDB", ex)
    }
  } else {
    console.error('Synchronize data on the baschain parameter illegal:', chiainId, wallet)
  }
}

/**
 *
 * @param {*} param0
 * @param {*} args
 */
export async function loadMyAssets({ commit, rootState}, payload={chainId,wallet}) {

  const chainId = payload.chainId;
  const wallet = payload.wallet;
  //console.log(payload,chainId,wallet)
  if (!chainId || !wallet){
    console.error('chainId or wallet required.')
  } else if (!checkSupport(chainId)){
    console.error(`Network ${chainId} unsupport.`)
  }else {
    const max = rootState.dapp.maxRegYears || 5
    const pager = await getAssetHashPager(chainId, wallet);
    commit(types.LOAD_EWALLET_HASHES,pager.hashes)
    commit(types.SET_EWALLET_TOTAL,pager.total)
    let assets = pager.assets
    if(assets && assets.length){
      assets = assets.map(asset => {
        asset.canRechargeYear = calcRechargeYear(asset.expire,max)
        return asset
      })
    }
    commit(types.LOAD_EWALLET_ASSETS, assets)
  }
}

export function removeMyAssetByHash({commit},hash) {
  commit(types.REMOVE_ASSET_BY_HASH,hash)
}

/**
 * Synchronize data on the baschain
 * and refresh indexeddb
 * @param {*} param0
 * @param {*} payload
 */
export async function syncEWalletMails({ commit, rootState }, payload = { chainId, wallet}){
  const chainId = payload.chainId||rootState.dapp.chainId
  const wallet = payload.wallet||rootState.dapp.wallet
  if(!wallet || !checkSupport(chainId)){
    console.error('wallet or chainId lost')
  }else{
    try{
      const max = rootState.dapp.maxRegYears || 5
      const pager = await getAssetHashPager(chainId, wallet);
      commit(types.LOAD_EWALLET_HASHES, pager.hashes)
      commit(types.SET_EWALLET_TOTAL, pager.total)
      let assets = pager.assets
      if (assets && assets.length) {
        assets = assets.map(asset => {
          asset.canRechargeYear = calcRechargeYear(asset.expire, max)
          return asset
        })
      }

    }catch(ex){
      console.log('Synchronize mails data on the baschain fail')
    }
  }
}

/**
 * first fetch my mails from indexed DB
 * @param {commit,rootState} param0
 * @param {*} payload
 */
export async function fillEWalletMails({ commit, rootState }) {
  try{
    //const mails = await checkStorage(WALLET_MAILS)

    const chainId = rootState.dapp.chainId
    const wallet = rootState.dapp.wallet

    const key = comboKey(wallet, chainId)
    const mails = await checkKeyStorage(WALLET_MAILS,key)

    if(mails && mails.length){
      commit(types.LOAD_EWALLET_MAILS, mails)
    }
  }catch(ex){
    console.log('fill My mails from indexed DB fail',ex)
  }
}

/**
 * Synchronize data on the baschain
 * and refresh indexeddb
 * @param {*} param0
 * @param {*} payload
 */
export async function loadEWalletMails({ commit, rootState},payload={chainId,wallet}){
  const chainId = payload.chainId;
  const wallet = payload.wallet;

  //console.log(payload, chainId, wallet)
  if (!chainId || !wallet) {
    console.error('chainId or wallet required.')
  } else if (!checkSupport(chainId)) {
    console.error(`Network ${chainId} unsupport.`)
  } else {
    try{
      console.log('load My mail list...')

      commit(types.SET_MAILSLOADING_STATE,true)

      let mails = await getWalletMails(chainId,wallet)
      const max = rootState.dapp.maxMailRegYears||5
      mails = mails.map(m =>{
        m.canRechargeYear = calcRechargeYear(m.expiration,max)
        return m
      });
      commit(types.LOAD_EWALLET_MAILS,mails)
      commit(types.SET_MAILSLOADING_STATE,false)

      // const chainId = rootState.dapp.chainId
      // const wallet = rootState.dapp.wallet
      const key = comboKey(wallet, chainId)
      console.log("key", chainId, wallet, key)
      await saveToKeyStorage(WALLET_MAILS,mails,key)
      //await saveToStorage(WALLET_MAILS, mails)
    }catch(ex){
      console.error('load wallet mails',ex)
    }
  }
}

//load personal orders
export async function loadEWalletOrders({ commit }, payload={chainId, wallet}) {
  const chainId = payload.chainId
  const wallet = payload.wallet
  if (!chainId || !wallet) {
    console.error('chainId or wallet required.')
  } else if (!checkSupport(chainId)) {
    console.error(`Network ${chainId} unsupport.`)
  } else {
    try {
      console.log('load My order list...')
      let orders = await getEWalletOrders(chainId, wallet)
      orders = orders.map(m => {
        m.owner = wallet
        m.price = m.price ? wei2Float(m.price, 18) : ''
        return m
      })
      commit(types.LOAD_EWALLET_ORDERS, orders)
      await saveToStorage(MARKET_ASSETS, orders)
    } catch(e) {
      console.error('load wallet orders', e)
    }
  }
}

/**
 * update my assets props
 * @param {*} param0
 * @param {*} payload hash required
 */
export function updateAssetProps({commit},payload){
  commit(types.UPDATE_ASSET_PROPS,payload)
}


export function updateEWalletOrders({commit}, payload) {
  commit(types.UPDATE_EWALLET_ORDERS, payload)
}
/**
 * hash
 * @param {*} param0
 * @param {*} payload
 */
export function updataMyMailProps({commit},payload){
  console.log(payload)
  commit(types.UPDATE_EWMAIL_PROPS,payload)
}

export async function updateMailInfo({ commit, rootState},payload={hash,chainId}){
  try{
    const hash = payload.hash
    const chainId = payload.chainId
    if(hash && checkSupport(chainId)){
      const resp = await getMailInfo(hash,chainId)
      if(resp.state){
        const max = rootState.dapp.maxMailRegYears || 5
        const canRechargeYear = calcRechargeYear(resp.mail.expiration,max)
        const mail = { hash, expiration: resp.mail.expiration, canRechargeYear: canRechargeYear}
        console.log(">>>>",mail)
        //'domainhash', 'expiration', 'alias','aliasName','owner','hash','domaintext'
        commit(types.UPDATE_EWMAIL_PROPS,mail)
      }
    }
  }catch(ex){
    console.error(ex)
  }
}

/**
 *
 * @param {*} param0
 * @param {*} payload
 */
export async function updateMyAsset({commit,rootState},payload = {hash}){
  const hash = payload.hash
  const chainId = rootState.dapp.chainId
  const wallet = rootState.dapp.wallet

  if(!checkSupport(chainId) || !hash)return

  try{
    const resp = await getDomainInfo(hash,chainId)
    if(resp.state){
      const asset = resp.assetinfo
      const canRechargeYear = calcRechargeYear(asset.expire,rootState.maxRegYears)
      commit(types.UPDATE_ASSET_PROPS, Object.assign({}, asset, { canRechargeYear: canRechargeYear}))

      const assets = rootState.ewallet.assets

      const key = comboKey(wallet,chainId)
      await saveToKeyStorage(WALLET_ASSETS, assets, key)

      //await saveToStorage(WALLET_ASSETS, assets)
    }
  }catch(ex){
    console.error('update asset error',hash)
  }

}

/**
 *
 * @param {*} expire
 * @param {*} max
 */
function calcRechargeYear(expire,max){
  if(!expire) return max || 5
  const expireTS = expire * 1000;
  const currTS = new Date()
  if ((currTS.getTime() / 1000 - expire) > 0) return 5;

  const maxTmpTS = currTS.getTime() + (5 * 365 + 1) * 24 * 3600 * 1000;
  let maxYearTS = maxTmpTS - expireTS
  return Math.floor(maxYearTS / (365 * 24 * 3600 * 1000))
}

export default {
  syncEWalletAssets,
  fillMyAssets,
  loadMyAssets,
  updateAssetProps,
  loadEWalletMails,
  loadEWalletOrders,
  fillEWalletMails,
  updataMyMailProps,
  removeMyAssetByHash,
  updateMailInfo,
  updateMyAsset,
  updateEWalletAssetsIndexedDB,
  removeEWalletAssetsIndexedDB,
}
