<template>
  <div class="bg-white">
    <h1 class="bas-market-title pt-5 pb-3">
      {{getTitle}}
    </h1>
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-10 pb-5">
          <div class="row ">
            <div v-for="item in domains"
              class="col-lg-6 col-md-6 bas-row--padding"
              :key="item.owner">
              <div class="bas-list-card">
                <div class="list-card--header">
                  <div class="bas-block">
                    <h4>{{item.domaintext}}</h4>
                    <p class="bas-small-owner">
                      {{item.shortAddress}}
                    </p>
                  </div>
                  <div class="inline-btn-group">
                    <span class="number">
                      {{item.sellprice}}
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
                      {{$t('l.expire')}}:{{item.expireDate}}
                    </p>
                  </div>
                  <div class="block-inline">
                    <a class="market-whois" @click="gotoWhois(item.domaintext)">
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
import {MarketProxy} from '@/proxies/MarketProxy.js'

export default {
  name:"OnSaleMain",
  computed: {
    getTitle(){
      return this.$t('p.MarketOnSaleDomainTitle')
    },
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
      },
      domains: [
        {
          owner: '0x08970…59FB',
          domaintext: 'rte',
          shortAddress: '0x08970…59FB',
          sellprice: '2000',
          expireDate: '2020-05-06'
        },
        {
          owner: '0x08970…59FB',
          domaintext: 'ngx',
          shortAddress: '0x08970…59FB',
          sellprice: '9000',
          expireDate: '2020-05-06'
        },
        {
          owner: '0x08970…59FB',
          domaintext: 'coco.bas',
          shortAddress: '0x08970…59FB',
          sellprice: '7800',
          expireDate: '2020-05-06'
        },
        {
          owner: '0x08970…59FB',
          domaintext: 'nn',
          shortAddress: '0x08970…59FB',
          sellprice: '1900',
          expireDate: '2020-05-06'
        }
      ]
    }
  },
  methods: {
    gotoWhois(text){
      if(text){
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
      const web3State = getWeb3State()
      if(isOwner(data.owner,web3State.wallet)){
        this.$message(this.$basTip.error('当前域名已在您账户下,不需要购买.'))
        return;
      }
      console.log(data)
      let domaintext = data.domaintext
      let pricevol = data.sellprice
      //isOwner

      if(domaintext && typeof pricevol !== 'undefined'){
        this.$router.push({
          path:`/market/buying/${domaintext}/${pricevol}`
        })
      }
    }
  },
  mounted(){
    let ruleState = this.$store.getters['web3/ruleState']
    this.ruleState = Object.assign({},ruleState)
    this.$store.dispatch('loadMarketOnSale',{enfroce:true,pagesize:8})
  },
}
</script>
<style scoped>


</style>
