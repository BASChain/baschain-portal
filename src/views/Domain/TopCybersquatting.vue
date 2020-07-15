<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-7 bas-card">
        <div class="bas-card__header">
          <div class="bas-card__header-title">
            {{$t('l.CybersquattingDomain')}}
          </div>
        </div>
        <div class="bas-gray-split" />
        <div class="bas-card__body bas-border-none">
          <el-form class="col-10" label-width="160px">
            <el-form-item :label="$t('l.Domain')" >
              <el-input v-model="asset.domaintext" :disabled="true"
                class="bas-regist--domain-input"
                placeholder="please enter domain...">
                <template slot="append">{{ domainType }}</template>
              </el-input>
            </el-form-item>


            <el-form-item :label="$t('l.PriceBas')" >
              <span> {{unitPrice}} </span>
              <span> BAS/year </span>
            </el-form-item>
            <el-form-item :label="$t('l.HasOpenAppliedSubRegistLabel')">
              <el-radio-group v-model="asset.openApplied"
                @change="openAppliedChange">
                <el-radio :label="false" @change="closeSubApply">
                  {{$t('l.N')}}
                </el-radio>
                <el-radio  :label="true"  @change="openSubApply">
                  {{$t('l.Y')}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('l.SubDomainPrice')"
              v-if="Boolean(asset.openApplied)"
              class="regist-custom--wrapper">
              <div class="inner-flexbox">
                <el-input-number v-model="subUnitPrice" name="subUnitPrice"
                  :precision="2" :step="1.0"
                  controls-position="" :disabled="!this.asset.isCustomed"
                  :max="parseFloat(ctrlState.maxPriceBas||10000000000)"
                  :min="parseFloat(ctrlState.minSubBas||4)" >
                </el-input-number>
                <el-checkbox v-model="asset.isCustomed"
                  @change="customedChangeHandle"
                  class="bas-external--tip">
                  <p class="tips">
                    Notice: {{$t('p.DomainRegistExternalBasTip')}}{{ ruleState.mailSeviceBas }}BAS
                  </p>
                </el-checkbox>
              </div>
            </el-form-item>
            <el-form-item :label="$t('l.PurchaseYears')">
              <el-input-number v-model="years" name="years"
                controls-position=""
                :min="1" :max="ctrlState.maxRegYears">
              </el-input-number>
              <span>Year</span>
            </el-form-item>
          </el-form>


          <div class="col-12 text-center">
            <span class="bas-text-green">{{$t('l.Total')}}:</span>
            <h2 class="d-inline bas-text-green">{{getTotal}}</h2>
            <span class="bas-text-green">BAS</span>
          </div>
        </div>
        <div class="bas-card__footer">
          <button class="btn w-25 bas-btn-primary" @click="registing">
            {{$t('l.RegistBtn')}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.regist-custom--wrapper div.inner-flexbox {
  display: inline;
}
.bas-external--tip {
  width: calc(100% - 190px);
  color: rgba(255,87,47,1);
  background: rgba(255,87,47,0.1);
  border-radius: 2px;
  padding-left: 1px;
}
.bas-external--tip span.el-checkbox__label {
  width: calc(100% - 20px);
  height: inherit;
}
.bas-external--tip span.el-checkbox__label>p.tips{
  width: 100%;
  word-break:break-word;
  white-space: normal;
  margin: 2px auto;
}
</style>
<script>


import {wei2Bas,dateFormat,hasExpired} from '@/utils'
import {
  getDomainType
} from '@/utils/Validator'

import {
  PARAM_ILLEGAL, LACK_OF_ETH, LACK_OF_TOKEN,
  DOMAIN_PRICE_RANGE, DOMAIN_NOT_EXPIRED,
  UNSUPPORT_NETWORK,USER_REJECTED_REQUEST,
  NetworkRequestFail
} from '@/web3-lib/api-errors.js'

import { MaxPriceBas } from '@/web3-lib/utils'
import { checkSupport } from '@/web3-lib/networks'
import { getDomainInfo } from '@/web3-lib/apis/view-api'
import { preValidRoot } from '@/web3-lib/apis/cybersquatting-api'

export default {
  name:"TopCybersquatting",
  computed:{
    domainType(){
      const text = this.asset.domaintext||''
      if(text === '')return ''
      const typ = getDomainType(text)
      const typeText = this.$t(`g.${typ}`)
      return typeText
    },
    unitPrice(){
      const ruleState = this.$store.getters["dapp/ruleState"]
      return  this.asset.isRare ? ruleState.rareBas : ruleState.rootBas
    },
    getTotal(){
      const ruleState = this.$store.getters["dapp/ruleState"]
      const unitBas = this.asset.isRare ? ruleState.rareBas : ruleState.rootBas
      let baseSum = this.years * unitBas;
      const externalBas = ruleState.externalBas
      return this.asset.openApplied ? baseSum + parseFloat(externalBas) : baseSum;
    },
    getTopExpireDate(){
      if(!this.topData.expire)return ''
      return dateFormat(this.topData.expire)
    },
    ...Vuex.mapGetters({
      ruleState:'dapp/ruleState'
    }),
    ...Vuex.mapState({
      maxYears:state => state.dapp.maxRegYears
    }),
  },
  data(){
    return {
      domain:"",
      years:1,
      subUnitPrice:4,
      asset:{
        domaintext:'',
        hash:'',
        openApplied:'',
        isCustomed:false,
        isRoot:true,
        isRare:false,
        expire:0
      },
      commitData:{
        domaintext:'',
        hash:''
      },
      ctrl:{
        error:'',
        loading:false
      },
      ctrlState:{
        minBas:4,
        maxPriceBas:10000000000
      }
    }
  },
  methods:{
    closeSubApply(){

    },
    openSubApply(){

    },
    openAppliedChange(){
      if(!this.asset.openApplied || !this.asset.isCustomed){
        this.subUnitPrice = parseFloat(this.ctrlState.subBas)
      }else{
        this.subUnitPrice = parseFloat(wei2Bas(this.asset.customPrice))
      }
    },
    customedChangeHandle(){
      if(!this.asset.isCustomed){
        this.subUnitPrice = parseFloat(this.ctrlState.subBas)
      }else if(this.asset.customPrice){
        this.subUnitPrice = parseFloat(wei2Bas(this.asset.customPrice))
      }
    },
    async registing(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const web3State = this.$store.getters['web3State']

      try{
        const validArgs = {
          hash:this.asset.hash,
          years:this.years,
          openApplied:this.asset.openApplied,
          isCustomed:this.asset.isCustomed,
          customPriceBas:this.subUnitPrice,
          chainId:web3State.chainId,
          wallet:web3State.wallet
        }
        console.log("valid args",validArgs)
        const commitData = await preValidRoot(validArgs)
        console.log("commitData",commitData)
        this.$router.push({
          name:"domain.cybersquattingres",
          params:{
            commitData:commitData
          },
          query:{
            domaintext:this.asset.domaintext
          }
        })
      }catch(ex){
        let msg = ''
        const domaintext = this.domaintext
        switch (ex) {
          case LACK_OF_ETH:
          case LACK_OF_TOKEN:
          case UNSUPPORT_NETWORK:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            return
          case DOMAIN_PRICE_RANGE:
            msg = this.$t(`code.${ex}`,{begin:4,end:MaxPriceBas})
            this.$message(this.$basTip.error(msg))
            return
          case DOMAIN_NOT_EXPIRED:
          case PARAM_ILLEGAL:
            console.log('lost args',ex)
            return;
          default:
            break;
        }

        if(ex.code === USER_REJECTED_REQUEST){
          let errMsg = that.$t(`code.${ex.code}`)
          that.$message(that.$basTip.error(errMsg))
        }else if(ex.message.includes(NetworkRequestFail)){
          that.$message(that.$basTip.error(ex.message))
        }else{
          console.error("Unknow Error",ex)
        }
      }

    }
  },
  mounted(){
    const ruleState = this.$store.getters["dapp/ruleState"]
    this.ctrlState = Object.assign(this.ctrlState,ruleState)
    const domain = this.$route.query.domaintext
    const hash = this.$route.query.hash
    console.log("domain",domain,hash,this.ctrlState,ruleState)
    this.asset.domaintext = domain
    this.asset.hash = hash

    const web3State = this.$store.getters["web3State"];
    if(hash && checkSupport(web3State.chainId)){
      getDomainInfo(hash,web3State.chainId).then(resp=>{
        if(resp.assetinfo){
          this.asset = Object.assign(this.asset,resp.assetinfo)
          if(resp.assetinfo.isCustomed){
            this.subUnitPrice = parseFloat(wei2Bas(resp.assetinfo.customPrice))
          }
          console.log("Asset",this.asset)
        }else{
          //TODO
        }
      }).catch(ex=>{
        console.log(ex)
        //TODO
      })
    }else{
      //TODO
    }
  },
}
</script>

