<template>
  <div class="background-fill-wrapper bas-gray-bg">
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-md-8 col-sm-10 pb-2" style="padding-left:0">
          <button class="bas-btn-goback" @click="goback">
            <span class="text">
              {{$t('l.GoBackPrevPage')}}
            </span>
          </button>
        </div>
      </div>
      <div class="row justify-content-center align-items-center">
        <el-card class="col-md-8 col-sm-10 box-card">
          <div class="clearfix" slot="header">
            <h4>
              Transaction Hash
            </h4>
          </div>
          <div class="text item bas-inline-between"
            v-for="(item,index) in transactions" :key="index">
            <div class="">{{item.hash}}</div>
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

      <div class="row justify-content-center align-items-center mt-3">
        <el-card class="col-md-8 col-sm-10 box-card">
          <div class="domain-regist--result-container text-center">
            <img src="/static/icons/bingo.png" class="bas-bingo">
            <h6 v-if="registState == 'approving'" class="bas-text-green mt-2">
              {{$t('p.DomainRegistApprove')}}
            </h6>
            <h6 v-if="registState == 'confirming'" class="bas-text-green mt-2">
              {{$t('p.DomainRegistConfirm')}}
            </h6>
            <h6 v-if="registState == 'fail'" class="text-danger mt-2">
              {{$t('p.DomainRegistFail')}}
            </h6>
            <h6 v-if="registState == 'success'" class="bas-text-green mt-2">
              {{$t('p.DomainRegistSuccess')}}
            </h6>
            <h2 style="margin-top:.75rem;">
              {{ domaintext }}
            </h2>
            <h6 v-if="registState == 'success'"
              style="color:rgba(212,216,216,1)">
              {{ $t('p.DomainRegistSuccessTip') }}
            </h6>
          </div>

          <div class="w-100 bas-btn-group text-center">
            <button @click="gotoUpdateDNS" :disabled="btnDisabled"
              class="w-25 mx-2 btn bas-btn-green-border">
              <i v-if="btnDisabled" class="fa fa-ban"></i>
              {{$t('l.ConfigurationDNS')}}
            </button>
            <button @click="gotoWallet" :disabled="btnDisabled"
              class="w-25 mx-2 btn bas-btn-green-border">
              <i v-if="!completed" class="fa fa-ban"></i>
              {{$t('l.GtotoMyWallet')}}
            </button>
            <button @click="continueRegist" :disabled="btnDisabled"
              class="w-25 mx-2 btn" :class="btnDisabled ? '' : 'bas-btn-primary'">
              <i v-if="!completed" class="fa fa-ban"></i>
              {{$t('l.ApplyAgain')}}
            </button>
          </div>
        </el-card>
      </div>

    </div>

  </div>
</template>
<style>

</style>
<script>
import LoadingDot from '@/components/LoadingDot.vue'
import {
  approveToken4OannEmitter,
  registSubEmitter
} from '@/web3-lib/apis/oann-api.js'

import {registRootEmitter} from '@/web3-lib/apis/cybersquatting-api'

export default {
  name:"CybersquattingResult",
  components:{
    LoadingDot,
  },
  computed: {
    btnDisabled(){
      return !this.completed
    },
  },
  data() {
    return {
      completed:false,
      domaintext:'',
      registState:'approving',
      commitData:{
        hash:'',
        isRoot:true,
      },
      transactions:[],
    }
  },
  methods: {
    addTxHashItem(hash,state){
      this.transactions.push({
        hash,state
      })
    },
    updateTxHashItem(hash,state){
      let idx = this.transactions.findIndex(el => el.hash === hash)
      if(idx >= 0){
        this.transactions.splice(idx,1,{hash,state})
      }
    },
    goback(){
      this.$router.go(-1)
    },
    commitApprove(){
      const web3State = this.$store.getters['dapp/web3State'];
      let chainId = web3State.chainId;
      let wallet = web3State.wallet;
      const spender = this.commitData.spender
      const costwei = this.commitData.costwei
      console.log(typeof costwei)
      if(!costwei||!chainId){
        console.log('refresh page')
        const msg = this.$t('g.RefreshPageNotCommitAgain')
        this.$message(this.$basTip.error())
        return
      }
      approveToken4OannEmitter(costwei,chainId,wallet).on('transactionHash',(txhash)=>{
        this.registState = 'approving'
        this.addTxHashItem(txhash,'loading')
      }).on('receipt',(receipt)=>{
        let status = receipt.status;
        this.updateTxHashItem(receipt.transactionHash,'success')
        this.registState = 'confirming'
      }).on('error',(err,receipt)=>{
        console.error('Approve RPC',err)
        this.registState = 'fail'
        //4001
        if(receipt){
          this.updateTxHashItem(receipt.transactionHash,'fail')
        }
      }).catch(ex=>{
        this.registState = 'fail'
        if(ex.code === 4001){
          let errMsg = this.$t(`code.${ex.code}`)
          this.$message(this.$basTip.error(errMsg))
        }else if(ex.code === -32601 && ex.message){
          this.$message(this.$basTip.error(ex.message))
        }
      })
    },
    domainSendTransaction(){
      let data = this.commitData
      let that = this
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = data.wallet || web3State.wallet
      const isRoot = data.isRoot
      if(isRoot){
        const rootData = Object.assign({},data,{namebytes:data.name,wallet:wallet})
        registRootEmitter(rootData).on('transactionHash',(txhash)=>{
          that.addTxHashItem(txhash,'loading')
        }).on('receipt',(receipt)=>{
          console.log('Regist Sub Complete>>>>>',receipt)
          let status = receipt.status;
          if(status){
            that.registState = 'success'
            that.updateTxHashItem(receipt.transactionHash,'success')
            setTimeout(() => {
              that.$store.dispatch('ewallet/syncEWalletAssets',web3State)
            }, 1000);
            //that.$store.commit('updateLatestRootDomainsChanged',true)
          }else{
            that.registState = 'fail'
            that.updateTxHashItem(receipt.transactionHash,'fail')
          }
          that.completed = true
        }).on('error',(err,receipt)=>{
          console.error(err)
          that.registState = 'fail'
          if(receipt){
            that.updateTxHashItem(receipt.transactionHash,'fail')
          }
        }).catch(ex=>{
          that.registState = 'fail'
          if(ex.code === 4001){
            let errMsg = that.$t(`code.${ex.code}`)
            that.$message(that.$basTip.error(errMsg))
          }else if(ex.code === -32601 && ex.message){
            that.$message(that.$basTip.error(ex.message))
          }else{
            console.error(ex)
          }
        })
      }else{

      }
    },
    gotoWallet(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      //subasset,topasset
      const activeTab = this.commitData.isRoot ? 'topasset': 'subasset'
      this.$router.push({
        name:'wallet.layout',
        query:{
          activeName:activeTab
        }
      })
    },
    gotoUpdateDNS(){

    },
    continueRegist(){
      this.$router.go(-2)
    }
  },
  mounted() {
    const domaintext = this.$route.query.domaintext
    this.domaintext = domaintext
    const commitData = this.$route.params.commitData
    if(commitData){
      this.commitData = Object.assign(commitData)
      if(this.commitData.hash && this.commitData.costwei){
        this.commitApprove()
      }
    }
  },
  watch: {
    registState:function(val,old) {
      if(old === 'approving' && val === 'confirming'){
        this.domainSendTransaction()
      }
    }
  },
}
</script>
<style>

</style>
