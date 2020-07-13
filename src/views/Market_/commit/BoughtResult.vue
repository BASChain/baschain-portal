<template>
  <div class="bas-gray-bg w-100">
    <div class="container bas-market-result">
      <div class="row justify-content-center align-items-center pt-5">
        <el-card shadow="never" style="padding:10px 20px;"
          class="col-md-8 col-sm-10 box-card">
            <h3 class="text-center market-domain-title">
              {{data.domaintext}}
            </h3>
            <p class="market-tips text-center bas-text-green">
              {{getTips}}
            </p>
        </el-card>
      </div>
      <div class="row justify-content-center align-items-center">
        <el-card shadow="never" class="col-md-8 col-sm-10 box-card">
          <div class="clearfix" slot="header">
            <h4>
              Transaction Hash
            </h4>
          </div>
          <div v-for="(item, index) in transactions" :key="index" class="text item bas-inline-between">
            <div class="">{{ item.hash }}</div>
            <div v-if="item.state === 'loading'">
              <loading-dot />
            </div>
            <div v-else-if="item.state === 'success'">
              <i class="fa fa-check bas-text-green"></i>
            </div>
            <div v-else-if="item.state === 'fail'">
              <i class="fa fa-close text-danger"></i>
            </div>
          </div>
        </el-card>
      </div>
      <div class="row justify-content-center align-items-center pb-5">
        <el-card shadow="never" class="col-md-8 col-sm-10 box-card">
          <div class="w-100 bas-btn-group text-center">
            <button @click="gotoUpdateDNS" :disabled="btnDisabled"
              class="w-25 mx-2 btn bas-btn-green-border">
              <i v-if="btnDisabled" class="fa fa-ban"></i>
              {{$t('p.MarketBoughtConfigurationBtn')}}
            </button>
            <button @click="gotoWallet" :disabled="btnDisabled"
              class="w-25 mx-2 btn bas-btn-green-border">
              <i v-if="btnDisabled" class="fa fa-ban"></i>
              {{$t('p.GotoMyWalletBtn')}}
            </button>
            <button @click="gotoMarket" :disabled="btnDisabled"
              class="w-25 mx-2 btn" :class="btnDisabled ? '' : 'bas-btn-primary'">
              <i v-if="btnDisabled" class="fa fa-ban"></i>
              {{$t('p.GobackMarketBtn')}}
            </button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { approveTokenEmitter } from '@/web3-lib/apis/token-api'
import { buyFromMarket, getMarketAddress } from '@/web3-lib/apis/market-api'
import LoadingDot from '@/components/LoadingDot.vue'

import {getWeb3State} from '@/bizlib/web3'
import {approveToMarketEmitter} from '@/bizlib/web3/token-api'
import {buyFromSellEmitter} from '@/bizlib/web3/market-api'

export default {
  name:"MarketBoughtResult",
  components:{
    LoadingDot
  },
  computed: {
    getTips(){
      let state = this.buyingState
      if(state === 'approving'){
        return this.$t('p.DomainRegistApprove')
      }else if(state === 'confirming'){
        return this.$t('p.DomainRegistConfirm')
      }else if(state === 'success') {
        return this.$t('g.OperateTipSuccess')
      }else if(state === 'fail'){
        return this.$t('g.OperateTipFail')
      }
      return ''
    },
    btnDisabled(){
      return !this.ctrl.completed
    }
  },
  data() {
    return {
      ctrl:{
        completed: false
      },
      buyingState:'approving',//confirm
      data: {},
      transactions:[]
    }
  },
  methods: {
    addTxHashItem(hash, state) {
      this.transactions.push({ hash,state })
    },
    updateTxHashItem(hash, state) {
      let index = this.transactions.findIndex(el => el.hash === hash)
      if (index >= 0) {
        this.transactions.splice(index, 1, { hash, state })
      }
    },
    commitApprove(){
      let data = this.data;
      if(!data.owner || !data.nameHash || !data.costWei){
        throw new Error('illegal arguments.')
        return;
      }
      const web3State = this.$store.getters['web3State']
      let chainId = web3State.chainId;
      let wallet = web3State.wallet;

      console.log(">>>>>>>>>>Approve>>>>>>>", data.owner, data.costWei, chainId, wallet)
      
      let spender = getMarketAddress(chainId)
      console.log('market address', spender)
      let that = this;
      approveTokenEmitter(spender, data.costWei, chainId, wallet).on('transactionHash', txhash => {
        that.buyingState = 'approving'
        that.addTxHashItem(txhash, 'loading')
        console.log('that.transactions>>>>>', that.transactions)
      }).on('receipt', (receipt) => {
        console.log('receipt IN COMMIT &&&&&&&&', receipt.status)
        that.buyingState = 'confirming'
        that.updateTxHashItem(receipt.transactionHash, 'success')
      }).on('error', (err, receipt) => {
        that.buyingState = 'fail'
        if (receipt.status) {
          that.updateTxHashItem(receipt.transactionHash, 'fail')
        }
      })
    },
    buySendTransaction() {
      let data = this.data;
      console.log('excute buying>>>>>Send>', data)
      const web3State = this.$store.getters['web3State']
      let chainId = web3State.chainId;
      let wallet = web3State.wallet;
      
      // let res = await buyFromMarket()


      let that = this;
      try {
        buyFromMarket(data.nameHash, data.owner, data.costWei, chainId, wallet)
        .then(function(receipt) {
          console.log('buyFromMarket>>>>receipt', receipt)
          if (receipt.status) {
            that.buyingState = 'success'
            that.addTxHashItem(receipt.transactionHash, 'success')
          } else {
            that.buyingState = 'fail'
            that.addTxHashItem(receipt.transactionHash, 'fail')
          }
          that.ctrl.completed = true
        })
      } catch (error) {
        console.error(error)
      }
      
      // .on('transactionHash', txhash => {
      //   
      //   console.log('that.transactions>>>>>', that.transactions)
      // }).on('receipt', receipt => {
      //   console.log('receipt IN BYU&&&&&&&&', receipt.status)
      //   if (receipt.status) {
      //     that.buyingState = 'success'
      //     that.updateTxHashItem(receipt.transactionHash, 'success')
      //   } else {
      //     that.buyingState = 'fail'
      //     that.updateTxHashItem(receipt.transactionHash, 'fail')
      //   }
      //   that.ctrl.completed = true
      // }).on('error', (ex, receipt) => {
      //   that.buyingState = 'fail'
      //   if (ex.code === 4001) {
      //     let errMsg = that.$t(`code.${ex.code}`)
      //     that.$message(that.$basTip.error(errMsg))
      //   }else if (ex.code === -32601 && ex.message){
      //     that.$message(that.$basTip.error(ex.message))
      //   }else {
      //     console.error(ex)
      //   }
      //   if (receipt.status){
      //     that.updateTxHashItem(receipt.transactionHash, 'fail')
      //   }
      // })
    },
    gotoUpdateDNS(){
      let fullDomain = this.data.domaintext
      console.log(fullDomain)
      if(fullDomain){
        this.$router.push({path:`/domain/dnsupdate/${fullDomain}`})
      }
    },
    gotoWallet(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      this.$router.push({name:'wallet.layout'})
    },
    gotoMarket(){
       this.$router.push({name:'market.index'})
    }
  },
  mounted() {
    // this.dappState = Object.assign({},this.$store.getters['web3/dappState'])
    this.data = this.$route.params.commitData;
    console.log('commitData', this.data)
    this.commitApprove()
  },
  watch: {
    buyingState: function (val, old) {
      if (old === 'approving' && val === 'confirming'){
        this.buySendTransaction()
      }
    }
  },
}
</script>
<style>
.market-domain-title {
  font-size: 36px;
}
.bas-market-result > div.el-card__body {
  padding: .25rem 20px;
}

.bas-market-result .el-card {
  border: none;
}
</style>
