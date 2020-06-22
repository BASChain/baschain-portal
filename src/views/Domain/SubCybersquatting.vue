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
            <el-form-item :label="$t('l.Domain')">
              <el-input v-model="subPart" :disabled="true"
                class="bas-regist--domain-input"
                placeholder="please enter domain...">
                <template slot="append">{{ `.${topPart}` }}</template>
              </el-input>
            </el-form-item>

            <el-form-item :label="$t('l.PriceBas')">
              <span> {{ unitPrice }} </span>
              <span> BAS/year </span>
            </el-form-item>

            <el-form-item  :label="$t('l.PurchaseYears')">
              <el-input-number v-model="years" name="years"
                :disabled="ctrl.loading"
                controls-position=""
                :min="1" :max="maxYears">
              </el-input-number>
              <span>Year </span>
            </el-form-item>
          </el-form>

          <div class="row justify-content-center align-items-center">
            <el-form class="col-10 bas-topinfo-container"
              size="mini" label-position="right"
              >
              <el-form-item>
                <h6 slot="label" class="pt-2">{{$t('p.DomainRegistSubRootInfoTitle')}}</h6>
              </el-form-item>
              <el-form-item label-width="120px" :label="$t('l.ExpiredDate')">
                <span>{{ topExpireDate }}</span>
              </el-form-item>
              <el-form-item label-width="120px" :label="$t('l.Owner')">
                {{ rootasset.owner ? rootasset.owner : $t('l.Unregist') }}
              </el-form-item>
              <el-form-item v-if="rootasset.owner !== ''"
                label-width="120px">
                <a slot="label"
                  class="bas-link topinfo-whois"
                  @click.prevent="gotoWhois(topPart)">
                  Who is >>
                </a>
              </el-form-item>
            </el-form>
          </div>
          <div class="col-12 text-center pt-3">
            <span class="bas-text-green">{{$t('l.Total')}}:</span>
            <h2 class="d-inline bas-text-green">{{getTotal}}</h2>
            <span class="bas-text-green">BAS</span>
          </div>
        </div>
        <div class="bas-card__footer">
          <button class="btn w-25 bas-btn-primary"
            :disabled="ctrl.loading"
            @click="registing">
            {{$t('l.RegistBtn')}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDomainType,
  checkDomainIllegal,
  isRareDomain,
  isSubdomain,
  getSplitDomain
 }  from '@/utils/domain-validator'
import {
  dateFormat,
  diffDays,hasExpired,
  handleDomain,
  wei2Bas
} from '@/utils'

import {
  PARAM_ILLEGAL, LACK_OF_ETH, LACK_OF_TOKEN,
  DOMAIN_PRICE_RANGE, DOMAIN_NOT_EXPIRED,
  UNSUPPORT_NETWORK,USER_REJECTED_REQUEST,
  NetworkRequestFail
} from '@/web3-lib/api-errors.js'
import { checkSupport } from '@/web3-lib/networks'
import { getDomainInfo } from '@/web3-lib/apis/view-api'
import {preValidSub4Cybersquatting } from '@/web3-lib/apis/cybersquatting-api'

export default {
  name:"SubCybersquatting",
  computed:{
    getTotal(){
      return this.years * this.unitPrice;
    },
    topExpireDate(){
      if(!this.rootasset.expire)return ''
      return dateFormat(this.rootasset.expire)
    },
    ...Vuex.mapState({
      maxYears:state => state.dapp.maxRegYears
    }),
  },
  data(){
    return {
      subPart:"",
      topPart:"",
      years:1,
      hasError:false,
      unitPrice:4,
      rootasset:{
        domaintext:"",
        owner:"",
        hash:'',
        expire:0,
      },
      asset:{
        domaintext:"",
        hash:'',
        expire:0,
        owner:""
      },
      ctrl:{
        loading:false,
        closeable:false
      },
    }
  },
  methods:{
    gotoWhois(domain){
      if(!domain)return;
      this.$router.push({
        path:`/domain/detail/${domain}`
      })
    },
    async registing(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const web3State = this.$store.getters['web3State']
      const roottext = this.topPart;
      const years = this.years;
      const hash = this.asset.hash;
      const domaintext = `${this.subPart}.${this.topPart}`

      console.log(domaintext)
      try{
        const chainId = web3State.chainId;
        const wallet = web3State.wallet;
        const unitBas = this.unitPrice

        const validArgs = {
          hash,
          unitBas,
          roottext:roottext,
          years,
          chainId,
          wallet
        }

        console.log("validParams",validArgs)
        this.ctrl.loading = true
        const commitData = await preValidSub4Cybersquatting(validArgs)
        console.log("commitData",commitData)

        this.ctrl.loading = false
        this.$router.push({
          name:"domain.cybersquattingres",
          params:{
            commitData:commitData
          },
          query:{
            domaintext:domaintext
          }
        })
      }catch(ex){
        this.ctrl.loading = false
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
    const topPart = this.$route.query.topPart
    const hash =  this.$route.query.hash
    let subPart = this.$route.query.subPart
    let topText = handleDomain(topPart);
    this.topPart = topText
    this.subPart = subPart
    console.log(`${subPart}.${topText}`)
    const web3State = this.$store.getters['dapp/web3State']
    const ruleState = this.$store.getters['dapp/ruleState']

    if( !hash || !web3State.chainId)return;

    getDomainInfo(hash,web3State.chainId).then(resp=>{
      console.log(resp)
      if(resp.state){
        this.asset = Object.assign(this.asset,resp.assetinfo)
        const rootasset = resp.rootasset
        this.rootasset = Object.assign(this.rootasset,rootasset)
        if(rootasset.isCustomed && rootasset.openApplied){
          this.unitPrice = parseFloat(wei2Bas(rootasset.customPrice))
        }else{
          this.unitPrice = ruleState.subBas
        }
      }else{
        console.log("not found domain:",hash)
      }
    }).catch(ex=>{
      console.log(ex)
    })
  },

  watch:{

  }
}
</script>
<style>
.bas-text-warning {
  margin-top: .2rem;
  color:rgba(255,87,47,1);
  line-height:22px!important;
}
.bas-regist--domain-container {
  width: 60%;
}
.bas-regist--topdomain-container{
  margin-left: 1.375rem;
}
.bas-regist--topdomain-container >p:not(:nth-last-child(1)) {
  margin-bottom: .25rem;
  padding: .25rem 0 !important;
  line-height: 1rem !important;
}

.bas-domain--setprice-tip {
  color:rgba(255,87,47,1);
  background:rgba(255,87,47,0.1);
  border-radius:2px;
  padding: .325rem;
}
.bas-domain--setprice-tip > span {
  color:rgba(255,87,47,1);
}
.bas-topinfo-container {
  background: rgba(245,246,246,1);
  padding: 1rem auto;
}

.bas-topinfo-container > div.el-form-item--mini.el-form-item{
  margin-bottom: .05rem;
}
.topinfo-whois {
  font-size: 18px;
  font-weight: 400;
}

</style>

