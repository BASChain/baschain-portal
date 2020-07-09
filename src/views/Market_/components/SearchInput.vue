<template>
  <div>
    <el-input
      @keyup.enter.native="queryDomains"
      class="market-search--input"
      placeholder="Please enter a domain name... "
      @input="InputChange"
      v-model="inputInfo">
      <el-button slot="append" icon="el-icon-search"
        @click="queryDomains"
        class="basel-search-append--green" >
        Search
      </el-button>
    </el-input>
    <div v-if="this.searched" class="bas-search-res">
      <div v-if="this.order.name!==undefined" class="append-result">
        <div class="res-domain">{{this.inputInfo}}</div>
        <div class="res-text">{{$t('l.OnSale')}}</div>
        <el-button type="primary" size="mini" class="res-btn" @click="goBuySell">{{$t('l.Buying')}}</el-button>
      </div>
      <div v-if="this.order.name===undefined && this.registState" class="append-result">
        <div class="res-domain">{{this.inputInfo}}</div>
        <div class="res-text">{{$t('l.HasBeenRegisted')}}</div>
        <el-button type="primary" size="mini" class="res-btn" @click="whois">Whois</el-button>
      </div>
      <div v-if="this.order.name===undefined && !this.registState" class="append-result">
        <div class="res-domain">{{this.inputInfo}}</div>
        <div class="res-text">{{$t('l.Unregist')}}</div>
        <el-button type="primary" size="mini" class="res-btn" @click="goApplyPage">{{$t('l.gotoRegistBtn')}}</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped>
.res-domain {
  color:rgba(0,202,155,1);
  margin: 0px 10px 0px 16px;
}
.res-domain,
.res-text {
  font-size:18px;
  font-family:PingFangSC-Medium,PingFang SC;
  font-weight:500;
  line-height:62px;
  text-align: left;
}
.res-btn {
  right: 0;
  margin: 10px;
  height: 42px;
  width: 108px;
  text-align: center;
  position: absolute;
}
.append-result {
  display: flex;
  position: relative;
  /* justify-content: space-between; */
}
.bas-search-res {
  width: 100%;
  height: 62px;
  margin-top: 33px;
  border-radius:1px;
  border:1px solid rgba(235,237,237,1);
}
.basel-search-append--green {
  width: 226px;
}
</style>
<script>
import { parseHexDomain, strToHex } from '@/web3-lib/utils';
import {findDomain4Search} from '@/web3-lib/apis/view-api'

export default {
  name: 'SearchInput',
  data() {
    return {
      inputInfo: '',
      searched: false,
      order: {},
      registState: false,
      asset: {}
    }
  },
  computed:{
    ...Vuex.mapState({
      saleOrders:state => state.market.marketOrders
    })
  },
  methods: {
    InputChange() {
      this.searched = false
      this.order = {}
      this.registState = false
      this.asset = {}
    },
    queryDomains() {
      console.log('query>>>>>', this.inputInfo)
      const web3State = this.$store.getters["web3State"]
      const name = strToHex(this.inputInfo)
      console.log('strToHex', name)
      console.log('saleOrders', this.saleOrders)
      let orders = this.saleOrders
      for (let i of orders) {
        if (i.name === name) {
          this.order = i
          break
        }
      }
      console.log('this.order', this.order)
      if (this.order.name === undefined) {
        findDomain4Search(this.inputInfo, web3State.chainId).then(resp=>{
          console.log('findDomain4Search=>resp',resp)
          if(resp.state){
            const domaintext = resp.assetinfo.domaintext
            this.asset = Object.assign({},resp.assetinfo,{name:domaintext})
            this.registState = true
          }else{
            this.registState = false
          }
        }).catch(ex=>{
          console.log(ex)
          this.$message(this.$basTip.error('查询服务出错'))
        })
      }
      this.searched = true
    },
    whois() {
      this.$router.push({
        path:`/domain/detail/${this.asset.name}`
      })
    },
    goApplyPage() {
      this.$router.push({ path: '/apply' })
    },
    goBuySell() {
      this.$router.push({ name: `market.buying`, params: { order: this.order, domaintext: this.inputInfo } })
    }
  }
}
</script>
