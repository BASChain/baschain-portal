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

            <div class="mail-regist-form-wrapper">
              <el-form label-position="top" label-width="120px" class="bmail-regist-form">
                <!-- 输入 -->
                <div class="bmail-input-container">
                  <el-form-item class="w-100"
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
                <div>
                  <div class="bmail-form-label">{{$t('l.PurchaseYears')}}</div>
                  <div class="years-select-container">
                    <div v-for="idx in maxMailRegYears"
                      :key="idx" class="mail-year-selector">
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
                </div>
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
  </div>
</template>
<style lang="css">
.header-logo img {
  margin-left: 2rem;
}
</style>
<script>
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
  MAIL_HASH_EXIST,MAIL_YEAR_OVER_MAX,LACK_OF_TOKEN
}from '@/web3-lib/api-errors'

import {findMailInfo} from '@/web3-lib/apis/view-api'
import {validPrevRegistMail} from '@/web3-lib/apis/mail-manager-api'

export default {
  name:"MailInternalRegistIndex",
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
      if(this.inputctrl.message) return
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
            if(resp.state){
              console.log(resp.mail)
              that.inputctrl.message = that.$t(`code.${MAIL_HASH_EXIST}`,{mailname:fulltext})
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
.bmail-regist-wrapper {
  background-color: rgba(255,255,255,1);
  min-height: calc( 100vh - 425px);
  width: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  direction: column;
  font-family: PingFangSC-Regular,PingFang SC;
}

.bmail-content-card {
  display: inline-flexbox;
  direction: column;
  justify-content: flex-start;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  align-items: stretch;
  border-radius:4px;
  border:2px solid rgba(225,229,229,1);
}
.bmail-content-card>div {
  margin-left: 2.5rem;
  margin-right: 2.5rem;
}

.bmail-regist-title {
  line-height: 30px;
  font-size: 22px;
  margin: 2.5rem auto;
  width: 100%;
  text-align: left;
}

.bmail-regist-btns {
  margin-top: 1.5rem;
}
.selector-wrapper {
  width: 100%;
  padding: 2px;
}
.bmail-form-label {
  font-size:18px;
  font-weight:400;
  color:rgba(4,6,46,1);
  line-height:25px;
}
.bmail-regist-title {
  line-height: 30px;
  font-size: 22px;
  margin: 1.5rem auto;
  width: 100%;
  text-align: left;
}
.bmail-account, .bmail-alias {
  display: flex;
  width: 100%;
  height: 50px;
}

.bmail-regist-form input.el-input__inner {
  height: 100%;
  line-height: 50px;
  background:rgba(245,246,246,1);
  border-radius: 4px;
  border:1px solid rgba(225,229,229,0.5);
  font-size: 16px;
  caret-color: #00ca9b;
}

.bmail-regist-form input.el-input__inner:focus,.bmail-regist-form input.el-input__inner:hover {
  border:1px solid rgba(0,202,155,.9);
}

.bmail-service-suffix {
  line-height: 50px;
  font-size: 18px;
  font-weight: 400;
  color: #04062e;
}

.bmail-input-container .el-form-item {
  margin-bottom: .25rem;
}

.bmailname-wrapper {
  margin: .5rem auto;
  padding: .5rem .75rem;
  width: 100%;
  border-radius:4px;
}

.bmailname-wrapper div {
  font-size:14px;
  font-weight:400;
  line-height:20px;
}

.years-select-container {
  width: 100%;
  display: inline-flex;
  flex-wrap: wrap;
  direction: row;
  justify-content: flex-start;
  align-items: center;
  /* margin-left: -12px;
  margin-right: -12px; */
}
.years-select-container div.mail-year-selector{
  width: 20%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.mail-year-selector div.bas-total {
  font-size:20px;
  font-family:Lato-Semibold,Lato;
  font-weight:600;
  color:rgba(4,6,46,1);
  line-height:24px;
  letter-spacing:1px;
}

.mail-year-selector div.bas-total::after{
  content:'BAS';
  font-size: 14px;
  margin-left: -.4rem;
}

.mail-year-selector .year-active div.bas-total{
  color:#fff;
}
/*当页面大于1500px 时，大屏幕，主要是PC 端*/
@media (min-width: 1500px) {
  .bmail-box-auto {
    flex: 0 0 41.666667%;
    -ms-flex:0 0 41.666667%;
    max-width: 41.666667%;
  }
}
/*在992 和1499 像素之间的屏幕里，中等屏幕，分辨率低的PC*/
@media (min-width: 992px) and (max-width: 1499px) {
  .bmail-box-auto {
    flex: 0 0 66.666667%;
    -ms-flex:0 0 66.666667%;
    max-width: 66.666667%;
  }

  .years-select-container div.mail-year-selector{
    flex: 0 0 33.33333333%;
    max-width: 33.33333333%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .bmail-box-auto {
    flex: 0 0 80.666667%;
    -ms-flex:0 0 80.666667%;
    max-width: 80.666667%;
  }
  .years-select-container div.mail-year-selector{
    flex: 0 0 33.33333333%;
    max-width: 33.33333333%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
}
@media (max-width: 768px) {
  .bmail-box-auto {
    flex: 0 0 80.666667%;
    -ms-flex:0 0 80.666667%;
    max-width: 80.666667%;
  }
  .years-select-container div.mail-year-selector{
    flex: 0 0 50%;
    max-width: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
}



.year-inner-box {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 62px;
  padding: 7px;
  display: inline-flexbox;
  justify-content: center;
  align-items: center;
  color:rgba(4,6,46,1);
  background:rgba(245,246,246,1);
  border-radius:4px;
  border:1px solid rgba(245,246,246,1);
}

.year-active-icon {
  position: absolute;
  width: 20px;
  height: 20px;
  float:right;
  top: 0px;
  right: 0px;
  background: url('./assets/years-select.png') no-repeat;
  background-size: 100% 100%;
  z-index: 99;
}

.years-select-container div.year-active {
  color:#fff;
  background:rgba(0,202,155,1);
  border-radius:4px;
  border:1px solid rgba(245,246,246,1);
}

.years-select-container div.year-active:focus ,.years-select-container div.year-active:hover{
  opacity: .85;
}

.year-inner-box>div{
  width: 100%;
  text-align: center;
}
</style>
