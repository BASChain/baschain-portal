import { WALLET_ASSETS, WALLET_MAILS } from './obs-enums'
import { openDB } from 'idb'

const CONF_PROPS = {
  dbname:"BASChain-KVS",
  version:1,
}

const KEY_DELIMITER = "_"

export function comboChainKey(chainId,schema) {
  const keyiters = [chainId, schema]
  return keyiters.join(KEY_DELIMITER)
}

export function comboFullKey(chainId,wallet) {
  return `${chainId}${KEY_DELIMITER}${wallet}`
}

const dbPromise = openDB(CONF_PROPS.dbname, CONF_PROPS.version,{
  upgrade(db,oldVersion,newVersion,transaction) {
    db.createObjectStore(WALLET_ASSETS)
    db.createObjectStore(WALLET_MAILS)
  }
})

const idbkvs = {
  async get (schema,key) {
    return (await dbPromise).get(schema,key)
  },
  async set (schema,data,key) {
    return (await dbPromise).put(schema,data,key)
  },
  async delete (schema,key) {
    return (await dbPromise).delete(schema,key)
  },
  async clear (schema) {
    return (await dbPromise).clear(schema)
  },
  async keys (schema) {
    return (await dbPromise).getAllKeys(schema)
  },
  async clearAll (){
    const ret = []
    const ret1 = await dbPromise.clear(WALLET_ASSETS)
    ret.push(ret1)
    const ret2 = await dbPromise.clear(WALLET_MAILS)
    ret.push(ret2)
    return ret
  }
}

export default {
  comboChainKey,
  comboFullKey,
  idbkvs
}
