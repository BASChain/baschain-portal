//import { openDb } from 'idb'

const DB_NAME = 'BasIndexDB'
const DB_ASSETS_NAME = "BasAssetsDB"
const DB_VER = 6
export const LATEST_ROOT_DOMAINS = 'latest_root_domains'
export const LATEST_SUB_DOMAINS = 'latest_sub_domains'
export const ROOT_ASSETS = "root_assets"
export const OPEN_MAILS = "open_mails"
export const WALLET_ASSETS = "wallet_assets"

export const WALLET_MAILS = "wallet_mails"
export const MARKET_ASSETS = "market_assets"

export const MARKET_ONSALE = "market_onsale"
export const MARKET_SOLD = "market_sold"

const dbPromise = _ => {
  if(!('indexedDB' in window)){
    throw new Error('Browser does not support IndexedDB.')
  }

  return idb.openDb(DB_ASSETS_NAME, DB_VER, upgradeDb =>{
    if (!upgradeDb.objectStoreNames.contains(LATEST_ROOT_DOMAINS)){
      upgradeDb.createObjectStore(LATEST_ROOT_DOMAINS)
    }
    if (!upgradeDb.objectStoreNames.contains(LATEST_SUB_DOMAINS)) {
      upgradeDb.createObjectStore(LATEST_SUB_DOMAINS)
    }
    if (!upgradeDb.objectStoreNames.contains(ROOT_ASSETS)) {
      upgradeDb.createObjectStore(ROOT_ASSETS)
    }
    if (!upgradeDb.objectStoreNames.contains(OPEN_MAILS)) {
      upgradeDb.createObjectStore(OPEN_MAILS)
    }
    if (!upgradeDb.objectStoreNames.contains(WALLET_ASSETS)) {
      upgradeDb.createObjectStore(WALLET_ASSETS)
    }
    if (!upgradeDb.objectStoreNames.contains(WALLET_MAILS)) {
      upgradeDb.createObjectStore(WALLET_MAILS)
    }
    if (!upgradeDb.objectStoreNames.contains(MARKET_ASSETS)) {
      upgradeDb.createObjectStore(MARKET_ASSETS);
    }
    if (!upgradeDb.objectStoreNames.contains(MARKET_ONSALE)) {
      upgradeDb.createObjectStore(MARKET_ONSALE)
    }
    if (!upgradeDb.objectStoreNames.contains(MARKET_SOLD)) {
      upgradeDb.createObjectStore(MARKET_SOLD)
    }
  })
}

/**
 *
 * @param {*} key
 * @param {*} data
 */
export async function setData(key, data) {
  console.log('setData:',key,data)
  return (await dbPromise()).put(key,data)
}

export const checkStorage = async storeName => {
  return dbPromise()
    .then( db => {
      const tx = db.transaction(storeName,'readonly')
      const store = tx.objectStore(storeName)
      return store.get(storeName)
    })
    .catch(error =>{
      throw error
    })
}

export const saveToStorage = async (storeName,data) => {
  return dbPromise()
    .then(db => {
      console.log('Store:', storeName)
      const tx = db.transaction(storeName,'readwrite')
      const store = tx.objectStore(storeName)
      store.put(data,storeName)

      return tx.complete
    }).catch(error => {
      return error
    })
}

export const saveToKeyStorage = async (storeName, data,key) => {
  key = key || storeName
  return dbPromise()
    .then(db => {
      console.log('Store:', storeName)
      const tx = db.transaction(storeName, 'readwrite')
      const store = tx.objectStore(storeName)
      store.put(data, key)

      return tx.complete
    }).catch(error => {
      return error
    })
}

export const checkKeyStorage = async (storeName,key) => {
  return dbPromise()
    .then(db => {
      const tx = db.transaction(storeName, 'readonly')
      const store = tx.objectStore(storeName)
      return store.get(key)
    })
    .catch(error => {
      throw error
    })
}

/**
 *
 * @param {*} chainId
 * @param {*} wallet
 */
export const comboKey = (wallet, chainId) => {
  wallet = (wallet || '').toUpperCase()
  if (typeof chainId !== 'string' && typeof chainId !== 'number'){
    return `${wallet}`
  }else {
    return `${wallet}_${chainId + ''}`
  }
}

export default {
  LATEST_ROOT_DOMAINS,
  LATEST_SUB_DOMAINS,
  comboKey,
  checkStorage,
  saveToStorage,
  saveToKeyStorage,
  checkKeyStorage
}
