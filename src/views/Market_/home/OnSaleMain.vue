<template>
  <div class="bg-white">
    <h1 class="bas-market-title pt-5 pb-3">
      {{getTitle1}}
    </h1>
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-10 pb-5">
          <div class="row ">
            <div v-for="item in soldItems"
              class="col-lg-6 col-md-6 bas-row--padding"
              :key="item.hash">
              <div class="bas-list-card">
                <div class="list-card--header">
                  <div class="bas-block">
                    <h4>{{paraseDomain(item.name)}}</h4>
                    <p class="bas-small-owner">
                      {{item.owner | ellipsis}}
                    </p>
                  </div>
                  <div class="inline-btn-group">
                    <span class="number">
                      {{item.salePrice}}
                    </span>
                    <div class="bas-buy-button">
                      <el-button type="primary" size="mini" @click="gotoBuying(item)">
                        {{$t('l.Buying')}}
                      </el-button>
                    </div>
                  </div>
                </div>
                <div class="list-card--footer">
                  <div class="block-inline">
                    <p class="bas-small-expire">
                      {{$t('l.expire')}}:{{item.expiration}}
                    </p>
                  </div>
                  <div class="block-inline">
                    <a class="market-whois" @click="gotoWhois(item.name)">
                      Who is
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  toUnicodeDomain,compressAddr,isOwner,
  TS_DATEFORMAT,dateFormat,wei2Float
} from '@/utils'

import {getWeb3State} from '@/bizlib/web3'
// import {MarketProxy} from '@/proxies/MarketProxy.js'
import {parseHexDomain} from  '@/web3-lib/utils/index.js'


export default {
  name:"OnSaleMain",
  computed: {
    getTitle1(){
      return this.$t('p.MarketOnSaleDomainTitle')
    },
    ...Vuex.mapState({
      soldItems:state => state.market.marketOrders
    })
    // ...Vuex.mapState({
    //   items:state=>{
    //     return state.domains.marketOnSale || []
    //   }
    // })
  },
  data() {
    return {
      total:0,
      pagenumber:1,
      pagesize:8,
      ruleState:{
        decimals:18
      }
    }
  },
  methods: {
    paraseDomain(name) {
      return parseHexDomain(name)
    },
    gotoWhois(text){
      if(text){
        text = parseHexDomain(text)
        this.$router.push({
          path:`/domain/detail/${text}`
        })
      }
    },
    gotoBuying(data) {
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      // const web3State = getWeb3State()
      const web3State = this.$store.getters['web3State']
      if(isOwner(data.owner,web3State.wallet)){
        this.$message(this.$basTip.error('当前域名已在您账户下,不需要购买.'))
        return;
      }
      console.log(data)
      let domaintext = parseHexDomain(data.name)
      let pricevol = data.salePrice

      console.log(domaintext, pricevol)
      if(domaintext && typeof pricevol !== 'undefined'){
        this.$router.push({
          name: `market.buying`,
          params: { order: data, domaintext: domaintext }
        })
      }
    }
  },
  async mounted(){
    const web3State = this.$store.getters['web3State']
    // if (web3State.chainId && web3State.wallet) {
      this.$store.dispatch('market/loadMarketOrders', web3State)
    // }
  },
  filters: {
    ellipsis (value) {
      let len=value.length;
      if (!value) return ''
      if (value.length > 10) {
        return value.substring(0,6) + '...' +value.substring(len-4,len)
      }
      return value
		}
  }
}
</script>

