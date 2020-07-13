// import { getMailInfo, getDomainInfo } from '@/web3-lib/apis/view-api'
import { getOnSaleDomains, getSoldDomains } from '@/web3-lib/apis/market-api'
import { checkSupport } from "@/web3-lib/networks";
import { wei2Float, dateFormat } from '@/utils'
import {
  MARKET_SOLD,
  MARKET_ONSALE,
  checkStorage,
  saveToStorage,
} from '@/bascore/indexDBService'

export async function loadMarketOrders({commit}, payload={chainId}) {
  let chainId = payload.chainId

  // if (!chainId || !checkSupport(chainId)) {
  //   chainId = 3
  // } else {
    console.log('load market order list...')
    try {
      let onsaleDomains = await getOnSaleDomains(chainId)
      console.log('load market order list...', onsaleDomains)

      onsaleDomains.map(domain=>{
        domain.salePrice = wei2Float(domain.salePrice, 18)
        domain.expiration = dateFormat(domain.expiration)
        return domain
      })

      commit('loadMarketOrders', onsaleDomains)
      await saveToStorage(MARKET_ONSALE, onsaleDomains)

    } catch (e) {
      console.error('load market onsale error', e)
    }
  // }
}

export function updateMarketOrders({commit}, assets) {
  commit('loadMarketOrders', assets)
}

export async function loadMarketSolds({commit}, payload={chainId}) {
  const chainId = payload.chainId

  // if (!chainId || !checkSupport(chainId)) {
  //   console.error('chainid error')
  // } else {
    // console.log('load market sold')
    try {
      let soldDomains = await getSoldDomains(chainId)
      soldDomains.map(domain => {
        domain.price = wei2Float(domain.price, 18)
        domain.expire = dateFormat(domain.expire)
        return domain
      })

      commit('loadMarketSolds', soldDomains)
      await saveToStorage(MARKET_SOLD, soldDomains)

    } catch (e) {
      console.error('load market sold faild', e)
    }
  // }
}

export function updateMarketSolds({ commit }, assets) {
  commit('loadMarketSolds', assets)
}

export default {
  loadMarketOrders,
  updateMarketOrders,
  loadMarketSolds,
  updateMarketSolds
}