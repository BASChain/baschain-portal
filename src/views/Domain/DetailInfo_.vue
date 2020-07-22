<template>
<div class="detail-bg-wrapper">
  <div class="container bas-place-bottom">
    <div class="row justify-content-center">
      <div class="col-7">
        <goback-nav />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-7 bas-card">
        <div class="bas-card-header bas-green-bg text-white">
          <div class="bas-card-header--title">
            <span>{{ handleDomain }}</span> {{$t('p.DominDetailRegistTitle')}}
          </div>

        </div>

        <div class="bas-detail-body">
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DominDetailOwnerLabel')}}</label>
            <span class="bas-small">{{asset.owner}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('l.DomainHash')}}</label>
            <span>{{asset.hash}}</span>
          </div>
          <hr/>

          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainDetailTypeLabel')}}</label>
            <span>{{ $t(`g.${domainType}`) }}</span>
          </div>
          <div class="bas-inline" :class="asset.isRoot ? '' : 'd-none'">
            <label class="bas-form-label">{{$t('p.DomainDetailOpenApplyLabel')}}</label>
            <span>{{ asset.openApplied ? $t('g.Y') : $t('g.N')}}</span>
          </div>
          <div class="bas-inline">
            <label class="bas-form-label">{{$t('p.DomainExpirationLable')}}</label>
            <span>{{expireDate}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-7 ref-splitor-bar">
        <div class="detail-splitor">
          <span @click="refToggler">
            {{ctrl.refStatus ? $t('l.ChevronUp') : $t('p.DomainDetailOpenShowMore') }}
            <i class="fa" :class="refStatusCls"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" v-if="ctrl.refStatus">
      <div class="col-7 bas-card">
        <div class="bas-card-header">
          <div class="bas-domain-data">
            <span>{{$t('l.ReffererData')}}</span>
          </div>
          <!-- <a v-if="isMine" class="bas-link" @click="gotoSetting">
            {{$t('l.GotoConfiguration')}}
          </a> -->
          <div class="bas-detail-body">
            <div class="bas-inline">
              <label class="bas-form-label">{{$t('p.DomainDetailRefiPv4Label')}}</label>
              <span>{{refdata.A}}</span>
            </div>
            <div class="bas-inline">
              <label class="bas-form-label">{{$t('p.DomainDetailRefIPv6Label')}}</label>
              <span>{{refdata.AAAA}}</span>
            </div>
            <div class="bas-inline">
              <label class="bas-form-label">{{$t('p.DomainDetailRefWalletLabel')}}</label>
              <span>{{refdata.BlockChain}}</span>
            </div>
            <div class="bas-inline">
              <label class="bas-form-label">{{$t('l.RefDataMX')}}</label>
              <span>{{refdata.MX}}</span>
            </div>
            <div class="bas-inline">
              <label class="bas-form-label">{{$t('l.RefDataMXBCA')}}</label>
              <span>{{refdata.MXBCA}}</span>
            </div>
            <div class="bas-inline">
              <label class="bas-form-label">{{$t('p.DomainDetailRefAliasLabel')}}</label>
              <span>{{refdata.CName}}</span>
            </div>
            <div class="bas-inline">
              <label class="bas-form-label">{{$t('p.DomainDetailRefExtensionLabel')}}</label>
              <span>{{refdata.Optional}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mb-5">
      <div v-if="showRegistBtn"
        class="col-7 bas-card__body bas-card__body--footer bas-gray-bg">
          <div class="left-unit">
            <label>{{$t('p.DomainDetailRegistSubTips')}}</label>
            <h1 class="bas-text-green d-inline">{{subUnitPrice}}</h1>
            <span class="bas-text-green">BAS/{{$t('g.EnumTSYear')}}</span>
          </div>
          <div class="right-operate">
            <button class="btn bas-btn-primary " @click="gotoRegistSub">
              {{$t('l.gotoRegistBtn')}}
            </button>
          </div>
          <!-- <div class="row justify-content-center">
            <div class="col-12 text-center bas-sub-price">
                <label>{{$t('p.DomainDetailRegistSubTips')}}</label>
                <h1 class="bas-text-green d-inline">{{subUnitPrice}}</h1>
                <span class="bas-text-green">BAS/{{$t('g.EnumTSYear')}}</span>
            </div>
            <div class="col-12 text-center pt-2">

            </div>
          </div> -->
      </div>
    </div>
  </div>
</div>

</template>

<style scoped>
.detail-splitor span {
  cursor: pointer;
}

.left-unit> label {
  font: 16px;
  font-weight:400;
  color:rgba(150,150,166,1);
}
.left-unit> h1 {
  color:rgba(0,202,155,1);
  font-weight:bold;
  font-size: 36px;
}

.left-unit> span {
  font-size: 14px;
}


/* .left-unit> h1::after {
  margin-left: .5rem;
  content: 'BAS';
  font-size: 14px;
} */

.bas-place-bottom {
  padding-bottom: 98px;
}
.bas-sub-price > h1 {
  font-size:36px;
  font-family:Lato-Bold,Lato;
  font-weight:bold;
  color:rgba(0,202,155,1);
  line-height:44px;
  letter-spacing:1px;
}
.bas-sub-price > label {
  font-size:14px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(4,6,46,1);
}
.bas-domain-data {
  font-size:22px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(4,6,46,1);
  line-height:30px;
  letter-spacing:1px;
  padding: 25px 24px 7px 24px;
  border-left: 1px solid rgba(235,237,237,1);
  border-right: 1px solid rgba(235,237,237,1);
}
.bas-detail-body {
  padding: 2px 24px 3px 24px;
  border-left: 1px solid rgba(235,237,237,1);
  border-right: 1px solid rgba(235,237,237,1);
  border-bottom: 1px solid rgba(235,237,237,1);
}
.bas-inline > span {
  font-size:16px;
  font-family:Lato-Regular,Lato;
  font-weight:400;
  color:rgba(4,6,46,1);
  line-height:19px;
  }
.bas-inline > label {
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(150,150,166,1);
  line-height:25px;
  margin: 0px;
}
.bas-inline {
  margin: 12px 0px 11px 0px;
  line-height: 25px;
}

.bas-card-header--title > span {
  font-size: 22px;
  font-weight: Semibold;
}
.bas-card-header--title {
  font-size:18px;
  font-family:PingFangSC-Regular,PingFang SC;
  color:#FFFFFF;
  line-height:62px;
  letter-spacing:1px;
  margin-left: 24px;
  font-weight: 300;
}

.bas-refdata-box--header {
  border: 1px solid rgba(235,237,237,1);
  border-bottom: 0px ;
}
.bas-refdata-box--body {
  border: 1px solid rgba(235,237,237,1);
  border-top: 0px ;
}

.refdata-form div.el-textarea.is-disabled>textarea.el-textarea__inner {
  color:rgba(4, 6, 46, .85);
  cursor: copy;
  background-color: rgba(255,255,255,.95);
  border: 1px solid rgba(235,237,237,.65);
}

.refdata-form label.el-form-item__label {
  color:rgba(4, 6, 46, .95);
}
.domain-ref-data {
  word-break: break-all;
  font-size:.85rem;
}
.bas-card__body--top-canregist {
  clear: both;
  width: 100%;
  height: 118px;
}

.bas-card__body--footer {
  display: inline-flex;
  height: 72px;
  justify-content: space-between;
  align-items: center;
}

.detail-bg-wrapper {
  width: 100%;
  height: 100%;
  background: #fff;

}

.bas-whois--right-container{
  width: 100%;
  display: inline-flex;
  justify-content: flex-end;
}

.bas-whois--right-box {
  width: 180px;
}
</style>
<script>

import { getDomainDetail } from "@/web3-lib/apis/domain-api"

import {
  getDomainType,isTop,
} from '@/utils/Validator.js'
import {
  hasExpired,toUnicodeDomain,
  dateFormat,hex2IPv4,hex2IPv6,
  isOwner,handleDomain,
  wei2Bas
} from '@/utils'

import GobackNav from "@/components/GobackNav.vue"

export default {
  name:"DomainDetail",
  components:{
    GobackNav,
  },
  computed:{
    ...Vuex.mapGetters({
      loginState:'dapp/loginState'
    }),
    refStatusCls(){
      return this.ctrl.refStatus ? 'fa-chevron-down' : 'fa-chevron-up'
    },
    handleDomain(){
      return toUnicodeDomain(this.domain)
    },
    isMine(){
      return isOwner(this.configs.wallet,this.asset.owner)
    },
    subUnitPrice(){
      const ruleState = this.$store.getters["dapp/ruleState"]
      if(this.asset.openApplied && this.asset.isCustomed && this.asset.customPrice){
        return wei2Bas(this.asset.customPrice)
      }else {
        return ruleState.subBas
      }
    },
    expireDate(){
      if(this.asset.expire){
        return dateFormat(this.asset.expire)
      }
      return ''
    },
    ipv4Str(){
      if(this.dns.ipv4){
        return hex2IPv4(this.dns.ipv4)
      }else{
        return ''
      }
    },
    ipv6Str(){
      if(this.dns.ipv6){
        return hex2IPv6(this.dns.ipv6)
      }else{
        return ''
      }
    },
    domainType(){
      if(!this.domain)return ''
      return getDomainType(this.domain)
    },
    showRegistBtn(){
      if(!this.domain)return false;
      return isTop(this.domain) && this.asset.openApplied
    }
  },
  data(){
    return {
      domain:'',
      unitPrice:4,
      contact:{
        tel:'',
        email:'',
        website:'',
        address:'',
      },
      asset:{
        name:'',
        owner:'',
        openApplied:false,
        isCustomed:false,
        expire:null,
        customPrice:0
      },
      info:{
        owner:'',
        openApplied:false,
        isCustomed:false,
        isPureA:false,
        customedPrice:'',
        expire:'',
      },
      dns:{
        owner:'',
        ipv4:'',
        ipv6:'',
        wallet:'',
        alias:'',
        extrainfo:''
      },
      refdata:{
        A:"",

      },
      ctrl: {
        refStatus: false
      },
      configs:{
        subGas:4,
      }
    }
  },

  methods:{
    loadDomainDetail(text){
      if(!text)return;
      const web3State = this.$store.getters['web3State']
      const tss = new Date().getTime()
      console.log("start",tss)
      //const resp = await getDomainDetail(text,web3State.chainId)

      getDomainDetail(text,web3State.chainId).then(resp=>{
        const tse = new Date().getTime()
        //console.log('Load DomainInfo resp>>',resp,((new Date().getTime()/1000) - tss))
        console.log('Load DomainInfo resp>>',tse,parseInt(tse - tss))
        if(resp.state){
          this.asset = Object.assign({},resp.assetinfo)
          this.refdata = Object.assign({},resp.refdata)
        }
      }).catch(ex=>{
        console.log("infrua get error",ex)
      })


    },
    gotoRegistSub() {
      if(this.$store.getters["metaMaskDisabled"]){
        this.$metamask()
        return;
      }
      let topText = this.domain
      if(topText){
        this.$router.push({
          path:`/domain/applysub/${topText}`,
        })
      }
    },
    gotoSetting(){
      if(!this.domain)return;
      let msg = '';
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return;
      }

      if(hasExpired(this.asset.expire)){
        msg = this.$t('g.DomainExpired')
        this.$message(this.$basTip.error(msg))
        return
      }
      let domain = toUnicodeDomain(this.asset.name)
      this.$router.push({path:`/domain/dnsupdate/${domain}`})
      // this.$router.push({
      //   name:'domain.subsettings',
      //   params:{
      //     domain:this.domain
      //   }
      // })
    },

    refToggler(){
      this.ctrl.refStatus = !this.ctrl.refStatus
    }
  },
  mounted(){
    const domaintext = this.$route.params.id;
    this.domain = domaintext
    if(!domaintext)return ;
    console.log(domaintext)
    this.loadDomainDetail(this.domain)
  },
  watch: {
    loginState(val,old){
      if(val && old == false){
        console.log('DetailInfo>>>>loginState',val)
        //this.loadDomainDetail(this.domain)
      }
    }
  },
}
</script>
<style>
.ref-splitor-bar {
  height: 24px;
  border-left:1px solid rgba(235,237,237,1);
  border-right:1px solid rgba(235,237,237,1);
  border-bottom: 1px solid rgba(235,237,237,1);
  background:rgba(249,250,250,1);
  font-size: 14px;
  font-weight: 200;
  text-align: center;
  align-items: center;
}

.bas-whois--second {
  width: 100%;
  display: inline-flex;
  direction: row;
  align-items: center;
  justify-content:space-between;
}
.bas-whois--right-container {
  display: inline-block;
  justify-items: center;
  min-width: 200px;
}
.bas-price-container {
  display: inline-block;
  justify-items: baseline;
  font-size: 14px;
}
</style>
