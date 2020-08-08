<template>
<div>
  <el-row :gutter="20" class="bas-white-bg">
    <el-col :span="24" class="bas-wallet-info">
      <div class="bas-wallet-info--inner">
        <img src="/static/icons/pay.png"
          @click="refreshWalletBalances"
          class="bas-wallet-icon">
        <div>
          <p style="margin-bottom:.85rem;">PaymentWallet</p>
          <span class="bas-small">{{ wallet }}</span>
        </div>
      </div>
      <div>

        <span>
          <a class="bas-text-green" @click="refreshWalletBalances">
            <i class="fa fa-refresh" style="font-size:14px;font-weight:100;"></i>
          </a>
        </span>
      </div>
    </el-col>
  </el-row>
  <div>
    <el-row id="walletBalance" :gutter="20" class="bas-white-bg">
      <el-col :span="8">
        <div class="bas-balance--wrapper">
          <div class="d-block">
            <!-- <h4>
              {{drawBalance}}
            </h4> -->
            <div class="bas-balance--block">
              <count-to ref="DrawBalVol"
                :startVal="countTo.startVal"
                :endVal="drawBalance"
                :duration="countTo.duration"
                decimals="2" />
            </div>
            <p>
              {{$t('l.canRecover')}}
            </p>
            <div>
              <button class="bas-btn-link" @click="withdrawHandle">
                {{$t('l.recoverBasBtn')}}
              </button>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="bas-balance--wrapper">
          <div class="d-block">
            <!-- <h4>{{ ethBalance }}</h4> -->
            <div class="bas-balance--block">
              <count-to ref="EthBalVol"
                :startVal="countTo.startVal"
                :endVal="ethBalance"
                :duration="countTo.duration"
                decimals="4" class="balance-vol"/>
            </div>


            <p>{{$t('p.WalletIndexEthBalance')}}</p>
            <div>
              <el-popover v-if="Boolean(wallet)"
                width="150"
                placement="bottom-end"
                trigger="click"
                >
                <div id="basQrcodeContainer" class="bas-popover-box text-center">
                  <wallet-qr-code width="120" id="ethbal"
                    tipPlacement="right"
                    :content="wallet"/>
                </div>
                <a slot="reference" class="bas-link">
                  {{$t('l.transInBtn')}}
                </a>
              </el-popover>
            </div>

          </div>
        </div>
      </el-col>
      <el-col :span="8" >
        <div class="bas-balance--wrapper">
          <div class="d-block">
            <!-- <h4>{{basBalance}}</h4> -->
            <div class="bas-balance--block">
              <count-to ref="BasBalVol"
                :startVal="countTo.startVal"
                :endVal="basBalance"
                :duration="countTo.duration"
                decimals="2" class="balance-vol"/>
            </div>
            <p>{{$t('p.WallletIndexBASBalance')}}</p>
            <div>
              <el-popover v-if="Boolean(wallet)"
                width="150"
                placement="bottom-end"
                trigger="click"
                >
                <div id="basQrcodeContainer" class="bas-popover-box text-center">
                  <wallet-qr-code width="120" id="ethbal"
                    tipPlacement="left"
                    :content="wallet"/>
                </div>
                <a slot="reference" class="bas-link">
                  {{$t('l.transInBtn')}}
                </a>
              </el-popover>
            </div>
          </div>

        </div>
      </el-col>
    </el-row>
  </div>
  <!-- withdraw dialog -->
  <el-dialog  width="380px"
    :close-on-click-modal="false"
    :show-close="withdraw.closeable"
    :before-close="withDrawCloseHandle"
    :visible.sync="withdraw.visible"
    top="35vh" class="bas-dialog-nobody">
    <div slot="title" class="bas-wrapper--valid">
      <div v-if="withdraw.loading">
        <circle-icon-state className="bascc-icon--loading"/>
      </div>
      <div>
        <span class="bas-tip-text">
          {{$t('p.WithdrawValuePretext')}}
        </span>
        <span class="bas-text-green bas-currency">
          {{ drawBalance }}
        </span>
      </div>
      <div v-if="withdraw.timeover">
        <div class="small text-danger">
          {{$t('g.RequestTimeoutOverTip',{ts:ctrl.timeout})}}
        </div>
      </div>
      <div v-if="!withdraw.loading">
        <el-button size="mini" class="w-25"
          @click="confirmSubmmitWithdraw">
          {{$t('g.Confirm')}}
        </el-button>
      </div>

    </div>

  </el-dialog>
  <!--  -->
  <el-dialog  width="320px"
    :close-on-click-modal="false"
    :show-close="true"
    :visible.sync="sucdialog.visible"
    top="35vh" class="bas-dialog-nobody">
    <div slot="title" class="bas-wrapper--valid">
      <div>
        <circle-icon-state className="bascc-icon--cong"/>
      </div>
      <div v-if="sucdialog.text">
        <div class="bas-text-green">
          {{ sucdialog.text }}
        </div>
      </div>
    </div>
  </el-dialog>
  <el-dialog  width="320px"
    :close-on-click-modal="true"
    :show-close="true"
    :visible.sync="faildialog.visible"
    top="35vh" class="bas-dialog-nobody">
    <div slot="title" class="bas-wrapper--valid">
      <div>
        <circle-icon-state className="bascc-icon--sad"/>
      </div>
      <div v-if="faildialog.text">
        <div class="text-danger">
          {{ faildialog.text }}
        </div>
      </div>
    </div>
  </el-dialog>
  <!-- Table -->
  <div class="pt-2">
    <mine-domain-tabs />
  </div>
</div>
</template>

<style>
.bas-balance--block {
  margin-bottom: .75rem;
}
.bas-balance--block span{
  margin: auto .5rem;
  font-size: 1.5rem;
  font-family: Lato-Bold,Lato;
  font-weight: 500;
  letter-spacing:1px;
}

.bas-balance--wrapper {
  width: 100%;
  min-height: 116px;
  text-align: center;
  display: block;
  background: rgba(245,246,246,1);
  border: 1px solid rgba(245,246,246,1);
  margin-bottom: 1.25rem;
}

.bas-balance--wrapper>div.d-block {
  width: 100%;
  height: 100%;
  display: inline-flex;
  direction: row;
  justify-content: center;
  margin: .75rem auto;
}
</style>

<script>

import MineDomainList from './MineDomainList.vue'
import MineDomainTabs from './MineDomainTabs.vue'
import WalletQrCode from '@/components/WalletQrCode.vue'
import CircleLoading from '@/components/CircleLoading.vue'
import CircleIconState from '@/components/CircleIconState.vue'
import CountTo from 'vue-count-to'

import {
  PARAM_ILLEGAL,USER_REJECTED_REQUEST,UNSUPPORT_NETWORK,
  NetworkRequestFail
}from '@/web3-lib/api-errors'
import {checkSupport} from '@/web3-lib/networks'

import {wei2BasFormat,hexBN2Ether} from '@/utils'
import {commitWithdrawTo } from '@/web3-lib/apis/account-api'
export default {
  name:"WalletIndex",
  components:{
    MineDomainList,
    MineDomainTabs,
    WalletQrCode,
    CircleLoading,
    CircleIconState,
    CountTo,
  },
  computed:{
    ...Vuex.mapState({
      wallet:state=>state.dapp.wallet,
      drawBalance:state =>{
        return hexBN2Ether(state.dapp.withdrawable,'0[.]0000')
      },
      ethBalance:state =>{
        return hexBN2Ether(state.dapp.ethwei,'0[.]0000')
      },
      basBalance:state => {
        return hexBN2Ether(state.dapp.baswei,'0[.]00')
      }
    }),
  },
  data() {
    return {
      countTo:{
        startVal:0,
        duration:2000,
      },
      withdraw:{
        visible:false,
        loading:false,
        closeable:true,
        error:"",
        timeover:false
      },
      sucdialog:{
        visible:false,
        text:''
      },
      faildialog:{
        visible:false,
        text:''
      },
      ctrl:{
        timeout:30,
        autoclose:10
      },
      refresh:{
        loading:false
      }
    }
  },
  methods:{
    async refreshWalletBalances(){
      //load eth,bas,withdraw
      await this.$store.dispatch('dapp/loadDappBalances')
      this.$refs.DrawBalVol.start()
      this.$refs.EthBalVol.start()
      this.$refs.BasBalVol.start()
    },
    withdrawHandle(){
      let msg = ''
      const drawBas = this.drawBalance;
      const wei = this.$store.state.dapp.withdrawable
      if(!drawBas || parseFloat(drawBas) <= 0.0 ||!wei){
        msg = this.$t('p.CannotWithDrawErrorTip')
        this.$message(this.$basTip.error(msg))
        return;
      }
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      this.withdraw = Object.assign({
        visible:false,
        loading:false,
        closeable:true,
        state:'loading',
        timeover:false
      },{visible:true})
    },
    withDrawCloseHandle(){
      this.withdraw = Object.assign({
        visible:false,
        loading:false,
        closeable:true,
        state:'',
        timeover:false
      })
    },
    showSucDialog(text,autoclose){
      this.sucdialog = Object.assign({visible:true,text:text})
      if(autoclose && autoclose > 0){
        setTimeout(async () => {
          this.sucdialog.visible = false
        }, parseFloat(autoclose)*1000);
      }
    },
    showFailDialog(text,autoclose){
      this.faildialog = Object.assign({visible:true,text:text})
      if(autoclose && autoclose > 0){
        setTimeout(async () => {
          this.faildialog.visible = false
        }, parseFloat(autoclose)*1000);
      }
    },
    confirmSubmmitWithdraw(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const wei = this.$store.state.dapp.withdrawable
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const that = this
      try{
        const emmitter = commitWithdrawTo(wei,chainId,wallet)
        that.withdraw.loading = true
        emmitter.on('transactionHash',txhash =>{
          //TODO
          setTimeout( () => {
            that.withdraw.timeover = true
          }, that.ctrl.timeout*1000);
        }).on('receipt',(receipt)=>{
          console.log(receipt)
          that.withDrawCloseHandle()
          //refresh balance
          that.refreshWalletBalances()
          //show success
          const text = that.$t('p.WithdrawSuccessTip')
          that.showSucDialog(text,6)
        }).on('error',(err,receipt)=>{
          that.withDrawCloseHandle()
          if(err.code === 4001){
            let errMsg = this.$t(`code.${err.code}`)
            that.showFailDialog(errMsg,6)
            //this.$message(this.$basTip.error(errMsg))
            return
          }else if(ex.message.includes(NetworkRequestFail)){
            msg = this.$t(`code.-32603`)
            //that.$message(this.$basTip.error(msg))
            that.showFailDialog(msg,6)
            return;
          }else{
            console.log('unknow-error',err)
            const text = that.$t('p.WithdrawFailTip')
            that.showFailDialog(text,6)
          }
        })
      }catch(ex){
        that.withDrawCloseHandle()
        console.log("catch ex",ex)
        this.$message(this.$basTip.error(ex))
      }
    },
    gotoBreakdownDetail(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }
      this.$router.push({
        name:'income.home'
      })
    },
    loadEWalletAssets(){
      const web3State = this.$store.getters['dapp/web3State']
      const chainId = web3State.chainId;
      const wallet = web3State.wallet
      //console.log("SubListAssets>>>>>",web3State)
      if(checkSupport(chainId) && wallet){
        //fillMyAsset
        this.$store.dispatch('ewallet/syncEWalletAssets',web3State)
      }else{
        console.log('MataMask unlogin or chainId unsupport.',web3State)
      }
    }
  },
  mounted(){
    //load balance
    //this.loadEWalletAssets()
    setTimeout(() => {
      this.$store.dispatch('dapp/loadDappBalances')
    }, 500);

  }
}
</script>
<style>
.bas-wallet-info {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin: .5rem auto;
}

.bas-wallet-icon {
  width: 52px;
  height: 52px;
  margin: 2px 4px;
}

.bas-wallet-info--inner {
  display: inline-flex;
  justify-content: flex-start;
}

.bas-wallet--banlance {
  height: 7rem;
  width: 100%;
  display: inline-flex;
  direction: row;
  justify-content: space-between;
  align-items: center;
  margin: .5rem auto;
  background:rgba(245,246,246,1);
  border:1px solid rgba(245,246,246,1);
}

.bas-wallet--banlance>div {
  margin: auto 1rem;
}


</style>
