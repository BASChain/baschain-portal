<template>
  <div class="bmail-regist-wrapper">
    <div class="container inner-center-container">
      <div class="row justify-content-center pt-5 pb-5">
        <div class="bmail-box-auto bmail-content-card">
            <div class="header-logo">
              <img src="/static/icons/logo_header_blk.png" class="img-fluid">
            </div>
            <div class="header-title">
              <h5 class="bmail-regist-title">
               {{$t('l.ApplyMailNameLabel')}}
              </h5>
            </div>

            <div class="bmail-regist-form-wrapper">
              <el-form label-position="top" label-width="120px" class="bmail-regist-form">
                <!-- 输入 -->
                <el-form-item class="w-100"
                  :class="Boolean(inputctrl.message) || Boolean(mailName) ? 'bmail-account-min-bottom':''"
                  show-message="false">
                  <div class="bmail-name-flex">
                    <el-input class="bmail-account" v-model="mailName"
                      :placeholder="$t('p.MailRegistInputPlaceholder')"
                      type="text">
                      <div slot="suffix" class="bmail-service-suffix">
                        {{showMailtext}}
                      </div>
                    </el-input>
                  </div>
                </el-form-item>
                <div class="bmailname-wrapper"
                  :class="Boolean(inputctrl.message) ? 'bas-warn-box' : 'bas-grass-box'"
                  v-if="Boolean(inputctrl.message) || Boolean(mailName)">
                  <div>
                    {{
                      inputctrl.message ? inputctrl.message : $t('p.MailRegistNameWarnTip')
                    }}
                  </div>
                </div>
                <!-- 别名 -->
                <el-form-item >
                  <label class="bmail-form-label">
                    {{$t('l.MailAlias')}}
                  </label>
                  <el-input v-model="mailAlias"
                    :placeholder="$t('p.MailRegistAliasPlaceholder')"
                    class="bmail-alias">
                  </el-input>
                </el-form-item>
                <!-- 购买期限 -->
                <!-- <div> -->
                  <div class="purchase-label-wrapper">
                    <div class="bmail-form-label">{{$t('l.PurchaseYears')}}</div>
                  </div>

                  <div class="years-select-container">
                    <div v-for="idx in maxMailRegYears"
                      :key="idx" class="bmail-year-selector">
                      <div class="selector-wrapper">
                        <div class="year-inner-box"
                          @click="selectYearsHandle(idx)"
                          :class="idx == years ? 'year-active' : ''">
                          <div v-if="idx == years">
                            <div class="year-active-icon">
                            </div>
                          </div>
                          <div class="bas-total">
                            {{(idx)* parseFloat(unitBas)}}
                          </div>
                          <div class="mail-years">
                            <span>{{idx}}</span>
                            <span>{{idx===1 ?$t('l.Year') : $t('l.Years')}}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                <!-- </div> -->
              </el-form>


            </div>

            <div class="bmail-regist-btns">
              <el-button type="primary"
                @click="submitMailName"
                class="bas-btn-primary w-100">
                {{$t('l.RegistBtn')}}
              </el-button>
            </div>
        </div>
      </div>
    </div>

    <el-dialog  width="320px"
      :close-on-click-modal="false"
      :show-close="false"
      :visible.sync="ctrl.loading"
      top="35vh" class="bas-dialog-nobody">
      <div slot="title" class="bas-wrapper--valid">
        <div class="logo-container">
          <CircleLoading></CircleLoading>
        </div>
        <div class="bas-dialog-content">
          <span class="tip-prefix">
            {{$t('g.ValidateOnBlockChain')}}
          </span>
          <span class="tip-green">
             {{mailName}}{{showMailtext}}
          </span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="css">
.header-logo img {
  margin-left: 2rem;
}
</style>
<script>
import './assets/mail-regist.css'
import {
  dateFormat,  wei2Bas,
  handleDomain,toUnicodeDomain,
} from '@/utils'
import {
  validMailAccount
} from '@/utils/Validator'
import {
  PARAM_ILLEGAL,USER_REJECTED_REQUEST,UNSUPPORT_NETWORK ,
  DOMAIN_NOT_EXIST,MAILSERVICE_INACTIVED,MAIL_REGIST_BY_OWNER,
  MAIL_HASH_EXIST,MAIL_YEAR_OVER_MAX,LACK_OF_TOKEN,NetworkRequestFail,
  MAIL_HASH_ABANDONED
}from '@/web3-lib/api-errors'

import {findMailInfo} from '@/web3-lib/apis/view-api'
import {validPrevRegistMail} from '@/web3-lib/apis/mail-manager-api'
import CircleLoading from '@/components/CircleLoading.vue'

export default {
  name:"MailInternalRegistIndex",
  components:{
    CircleLoading
  },
  computed: {
    showMailtext(){
      const domaintext = this.domaintext
      return `@${domaintext}`
    },
    ...Vuex.mapState({
      unitBas:state => wei2Bas(state.dapp.mailRegGas || 2),
      maxMailRegYears:state => state.dapp.maxMailRegYears
    })
  },
  data() {
    return {
      years:1,
      domaintext:'',
      hash:'',
      owner:'',
      mailName:"",
      mailAlias:"",
      mailActived:false,
      inputctrl:{
        message:''
      },
      ctrl:{
        loading:false,
        timeoutId:null
      }
    }
  },
  methods: {
    initData(domaintext,hash,owner){
      this.domaintext = domaintext
      this.hash = hash
      this.owner = owner
    },
    selectYearsHandle(years){
      this.years = years <=0 || years > this.maxMailRegYears ? this.maxMailRegYears : years
    },
    async submitMailName(){
      if(this.inputctrl.message) {
        this.$message(this.$basTip.error(this.inputctrl.message))
        return
      }
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }

      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const domaintext = this.mailDomainText
      const domainhash = this.hash
      const mailName =this.mailName
      const mailAlias = this.mailAlias

      let msg =''
      if(mailName === ''|| !mailName.trim().length || !domainhash){
        msg = this.$t('code.888888',{text:this.$t('l.ApplyMailNameLabel')})
        this.$message(this.$basTip.error(msg))
        return;
      }

      const years = this.years

      try{
        this.ctrl.loading = true
        /**
         * return :{domaintext,mailalias,years,chainId,wallet,domainhash,mailhash,costwei,basbal,}
         */
        const commitData = await validPrevRegistMail(domainhash,mailName,years,chainId,wallet)
        //console.log(commitData)
        this.ctrl.loading = false

        // route commit page
        //const mailalias = commitData.mailalias
        commitData.mailalias = mailAlias
        const mailhash = commitData.mailhash
        //return;
        this.$router.push({
          path:`/mail/registing/${domaintext}/${years}/${mailName}`,
          name:"mail.registing",
          params:{
            domaintext,
            years,
            mailname:mailName,
            commitData:commitData
          }
        })
      }catch(ex){
        this.ctrl.loading = false
        switch (ex) {
          case UNSUPPORT_NETWORK:
          case LACK_OF_TOKEN:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            return
          case MAIL_HASH_EXIST:
            msg = this.$t(`code.${ex}`,{mailname:mailName})
            this.$message(this.$basTip.error(msg))
            return;
          case MAIL_REGIST_BY_OWNER:
            msg = this.$t(`code.${ex}`,{domaintext})
            this.$message(this.$basTip.error(msg))
            return;
          case PARAM_ILLEGAL:
          case MAILSERVICE_INACTIVED:
          case DOMAIN_NOT_EXIST:
          case MAIL_YEAR_OVER_MAX:
          case PARAM_ILLEGAL:
            console.log('Coding Logic Error:',ex)
            return
          default:
            break;
        }
        if(ex.code === USER_REJECTED_REQUEST){
          msg = this.$t(`code.${ex}`)
          this.$message(this.$basTip.error(msg))
          return;
        }else if(ex.message.includes(NetworkRequestFail)){
          msg = this.$t(`code.-32603`)
          this.$message(this.$basTip.error(msg))
          return;
        }
        console.error("Unknown Error:",ex)
      }
    }
  },
  mounted() {
    const dmtext = this.$route.params.domaintext
    const hash = this.$route.query.hash
    const owner = this.$route.query.owner
    console.log(hash,owner)
    this.initData(dmtext,hash,owner)
    this.mailActived = this.$route.query.mailActived
  },
  watch:{
    mailName:function(val,old) {
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const owner = this.owner
      if(val !== '' && val !== old){
        console.log(val)
        if(!validMailAccount(val)){
          this.inputctrl.message = this.$t('p.ValidMailAccountNameWarn')
          return;
        }
        this.inputctrl.message = ''
        if(this.ctrl.timeoutId){
          clearTimeout(this.ctrl.timeoutId)
        }
        const that = this;
        const fulltext = `${val}@${that.domaintext}`
        this.ctrl.timeoutId = setTimeout(async () => {
          try{

            const resp = await findMailInfo(fulltext,chainId)
            console.log(">>>>>>>.",resp)
            if(resp.state){
              console.log(resp.mail)
              if(resp.mail.abandoned){
                //MAIL_HASH_INVALID
                that.inputctrl.message = that.$t(`code.${MAIL_HASH_ABANDONED}`,{text:fulltext})
              }else{
                that.inputctrl.message = that.$t(`code.${MAIL_HASH_EXIST}`,{text:fulltext})
              }
            }else{
              that.inputctrl.message = ''
            }
          }catch(ex){
            console.log('lazy valid',ex)
            that.inputctrl.message = ''
          }
        },1500)
      }else{
        this.inputctrl.message = ''
      }
    }
  }
}
</script>
<style>

</style>
