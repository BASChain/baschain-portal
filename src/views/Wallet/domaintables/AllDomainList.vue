<template>
  <div>
    <el-table type="index"
      v-loading="false"
      :data="items" @cell-click="gotoDetail"
      style="width: 100%">
      <el-table-column
        header-align="left"
        align="left"
        :class-name="'bas-link'"
        prop="domaintext"
        index="domain"
        :label="$t('l.Domain')"
        >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="expire"
        sortable
        :label="$t('l.ExpiredDate')"
        :formatter="expireFormat"
        >
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="type"
        :formatter="translateType"
        :label="$t('l.DomainType')">
      </el-table-column>
      <el-table-column header-align="center"
        index="operate" width="200"
        class-name="el-tbc-operator"
        align="right" :label="$t('l.Operating')">
        <template slot-scope="scope">
          <el-dropdown class="bas-drop">
            <el-button size="mini" type="default" >
               {{$t('l.MoreOperation')}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="scope.row"
                :disabled="scope.row.hadExpired"
                @click.native="goSetting(scope.$index,scope.row)">
               {{$t('l.Configuration')}}
              </el-dropdown-item>
              <el-dropdown-item
                :disabled="scope.row.canRechargeYear <= 0"
                @click.native="handleShowRechage(scope.$index,scope.row)"
                >
                {{$t('l.Recharge')}}
              </el-dropdown-item>
              <el-dropdown-item
                @click.native="handleShowTransout(scope.$index,scope.row)"
                :disabled="scope.row.hadExpired || scope.row.isorder">
                {{$t('l.TransOut')}}
              </el-dropdown-item>
              <el-dropdown-item v-if="scope.row.isRoot && !scope.row.mailActived"
                @click.native="handleShowMailDialog(scope.$index,scope.row)"
                :disabled="scope.row.hadExpired || scope.row.isorder">
                {{$t('l.ActivationMailBtn')}}
              </el-dropdown-item>
              <el-dropdown-item  v-if="scope.row.mailActived"
                @click.native="gotoRegistMailIndex(scope.$index,scope.row)"
                :disabled="scope.row.hadExpired">
                {{$t('l.InternalRegistBMail')}}
              </el-dropdown-item>
              <el-dropdown-item v-if="scope.row.isRoot"
                @click.native="goRegistSub(scope.$index,scope.row)"
                :disabled="scope.row.hadExpired">
                 {{$t('l.RegistSubDomain')}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            :disabled="scope.row.isorder"
            size="mini"
            :type="scope.row.isorder ? 'default':'primary'"
            @click="handleShowSaleOn(scope.$index, scope.row)">
            {{$t('l.SaleOn')}}
          </el-button>
        </template>
      </el-table-column>

      <el-tab-loading :loading="syncState" slot="empty" v-if="syncState"/>

      <el-tab-loading :loading="syncState" slot="append" v-if="syncState && items.length>0 "/>
    </el-table>

    <!-- Dialog Begin -->
    <!-- Trans Out Dialog -->
    <el-dialog  width="45%"
      :close-on-click-modal="false"
      :show-close="!transout.loading"
      :before-close="hiddenTransoutDialog"
      :visible.sync="transout.visible"
      custom-class="transout-dialog">
      <div slot="title" class="transout-header">
        <h5> {{transoutTitle}} </h5>
      </div>
      <div class="transout-body" >
        <div class="inner">
          <el-form label-width="126px"
            @submit.native.prevent>
            <el-form-item :label="$t('l.TransToDomainLabel')">
              <el-input type="text" v-model="transout.totext"
                @input="fetchDomainInfo4Transout"
                :disabled="transout.loading"
                :placeholder="$t('l.TransToDomainPlaceholder')"/>
            </el-form-item>
            <el-form-item :label="$t('l.TransToDomainBCA')">
              <el-input type="text" v-model="transout.tobca"
                :disabled="transout.loading"
                :placeholder="$t('l.TransToDomainBCAPlaceHolder')"/>
            </el-form-item>
            <el-form-item>
              <div class="transout-tips">
                <span>
                  {{$t('l.TransToDomainBCAPTips')}}
                </span>
              </div>
            </el-form-item>

            <el-form-item>
              <div class="bas-btns-between">
                <el-button type="primary"
                  @click="submitTransout"
                  :disabled="transout.loading"
                  class="bas-btn-primary bas-w-60">
                  {{transout.loading ?  $t('l.Transactioning'): $t('l.Confirm')}}
                  <loading-dot v-if="transout.loading"/>
                </el-button>
                <el-button type="plaintext"
                  @click="hiddenTransoutDialog"
                  :disabled="transout.loading"
                  class="bas-btn-secondary bas-w-30">
                  {{$t('l.Cancel')}}
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>

    <!-- RechargeDialog -->
    <el-dialog width="846px"
      :close-on-click-modal="false"
      :show-close="recharge.closeable"
      :before-close="hiddenRechargeDialog"
      :visible.sync="recharge.visible"
      top="20vh"
      custom-class="bas-dialog">
      <div class="bas-dg-header" slot="title">
        <div class="title">
          <span>
            {{$t('l.Domain')}} :
          </span>
          <span>{{recharge.domaintext}}</span>
        </div>
        <div class="expiration-tip">
          <span>
           {{
             $t('p.MailRechargeDialogExpirationTip',{expireDate:recharge.expirationText})
            }}
          </span>
          <hr>
        </div>
      </div>

      <div class="bas-dg-body">
        <el-row :gutter="24">
          <el-col v-for="(it,idx) in recharge.items"
            :key="idx"
            :class="( idx >= 3 ) && Boolean(!recharge.moreshow) ? 'd-none' : ''"
            :span="8">
            <div class="recharge-year-box"
              @click="selectedYear(it.y)"
              :class=" it.y === recharge.chargeYears ? 'box-selected':''">
              <div class="inner-box">
                <div class="year-box-inline">
                  <span>{{$t(`l.RechargeY${it.y}`)}}</span>
                </div>
                <div class="year-box-inline">
                  <span class="bas-unit">{{it.total}}</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <div class="bas-inline-between recharge-tips">
            <div class="max-tip">
              {{$t('p.MailRechargeMaxYearsComments',{year:recharge.maxchargeYears})}}
            </div>
            <div @click="toggleMoreshow"
              class="recharge-more-toggle">
              <span>
                <div class="fa" :class="recharge.moreshow ? 'fa-chevron-up' : 'fa-chevron-down'"></div>
                {{$t('l.MoreChargeYears')}}
              </span>
            </div>
          </div>
        </el-row>
      </div>

      <div class="dialog-footer" slot="footer">
        <div class="container text-center">
          <el-button type="primary"
            :disabled="recharge.loading"
            @click="submitRechargeDomain"
            class="bas-w-40 bas-btn-primary">
            <div style="position:relative;">
              <LoadingDot v-if="recharge.loading"/>
            </div>
             {{recharge.loading ? $t('l.RechargingTip') : $t('l.ConfirmRechargeBtn')}}
          </el-button>
        </div>
      </div>
    </el-dialog>

    <!-- Actived BMail  -->
    <el-dialog  width="24%"
      :close-on-click-modal="false"
      :show-close="!mailDialog.loading"
      :before-close="cancelMailDialog"
      :visible.sync="mailDialog.visible"
      custom-class="bas-eldialog-nobody">

      <div slot="title" class="contianer mail-dialog--body">
        <div class="row justify-content-center">
          <div class="col-10 text-center">
            <h5>
              {{$t('p.MailDialogOpenMailServicePrefixText')}}
              <span>{{'@' + mailDialog.domaintext}}</span>
              {{$t('p.MailDialogOpenMailServiceSuffixText')}}
            </h5>
            <div class="bas-mail-expire">
              {{$t('l.ExpiredDate') + ':'}}
              <span>{{expireTime(mailDialog.expire)}}</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 text-center bas-open-mail">
            <el-button :disabled="mailDialog.loading"
              type="primary" class="w-50"
              @click="submitActivationMail()">
              <div class="bas-inline-flex-around">
                <div>
                  {{
                    mailDialog.loading ?
                  $t('g.PaymentOngoing') : $t('p.EWalletActivationMailServiceNotice', {cost:this.mailServiceBas})
                  }}
                </div>
                <div>
                  <loading-dot v-if="mailDialog.loading"
                    style="margin-right:4px;"/>
                </div>
              </div>
            </el-button>
          </div>
        </div>

        <div class="row justify-content-center" v-if="mailDialog.loading">
          <div class="col-10 text-center pt-2">
            <span class="metamask-nopop-tips">
             {{$t('g.MetaMaskNoPopTips')}}
            </span>
          </div>
        </div>

        <el-checkbox v-model="mailDialog.checked" v-show="!mailDialog.loading"
          :disabled="mailDialog.loading  || mailDialog.checklocked"
          class="bas-check-public">{{$t('l.ActivationOnlyInternal')}}
        </el-checkbox>
      </div>
    </el-dialog>

    <el-dialog width="476px"
      :close-on-click-modal="false"
      :show-close="!saleOn.loading"
      :before-close="hiddenSaleOnDialog"
      :visible.sync="saleOn.visible"
      top="35vh"
      custom-class="bas-dialog">
      <div class="bas-dg-header" slot="title">
        <div class="title">
          <span class="">
            {{$t('p.SaleOnDialogDomainTitle',{text:$t('g.RootDomainLower')})}}
          </span>
          <span class="title-domain">
            {{saleOn.domaintext}}
          </span>
        </div>
        <div class="sub-title">
          <span>
            {{$t('p.CommonDialogSubTitleExpireLabel',{expiration:saleOn.expireDate})}}
          </span>
        </div>
      </div>
      <div class="bas-dg-body">
        <el-input type="text"
          :disabled="saleOn.loading"
          :placeholder="$t('p.SaleOnDialogUnitBasPlaceholder')"
          v-model="saleOn.salebas" class="input-unit-bas"
          :min="0" :max="100">
          <div class="suffix" slot="suffix">BAS</div>
        </el-input>

        <el-button @click="submitSetSalePrice"
          :disabled="saleOn.loading"
          type="primary" class="w-100 bas-btn-primary">
          <div>
            <LoadingDot v-if="saleOn.loading" />
          </div>
          {{saleOn.loading ? $t('l.Transactioning') : $t('l.Confirm')}}
        </el-button>
      </div>
    </el-dialog>
    <!-- ****Biz Dialog end**** -->

  </div>
</template>

<script>

import LoadingDot from '@/components/LoadingDot.vue'
import ElTabLoading from '@/views/widget/ElTabLoading.vue'
import dayjs from 'dayjs'

import {
  TS_DATEFORMAT,isDateExpired,dateFormat,
  isOwner,maxRechageYears,getYearItems,
  numThousandsFormat,
} from '@/utils'
import {
  getDomainType,isRareTop,
  MAX_BILLON_VOL,validBetweenZero2Billion
} from '@/utils/Validator.js'

import {
  PARAM_ILLEGAL,
  USER_REJECTED_REQUEST,
  UNSUPPORT_NETWORK,
  LACK_OF_ETH,
  LACK_OF_TOKEN,
  DOMAIN_NOT_EXIST,
  ACCOUNT_NOT_MATCHED,
  MAILSERVICE_ONLY_RARE_OPEN,
  DOMAIN_EXPIRED,
  MAILSERVICE_HAS_ACTIVED,
  NetworkRequestFail,
  NO_UPDATE_PERMISSIONS,
  RECHARGE_YEAR_RANGE,
  ROOT_REGIST_CLOSE,
} from '@/web3-lib/api-errors.js'
import { getDomainBCADatas } from '@/web3-lib/apis/domain-api'
import { getDomainInfo } from '@/web3-lib/apis/view-api'
import {
  transoutOwnershipCi,approveTraOspEmitter
} from '@/web3-lib/apis/ownership-api'
import { approveTokenEmitter } from '@/web3-lib/apis/token-api'
import {
  validRecharge4Domain,rechargeSubDomain,rechargeRootDomain,
} from '@/web3-lib/apis/oann-api'

import {activationRootMailService} from '@/web3-lib/apis/mail-manager-api'
import { validAdd2Market,addHashToMarket } from '@/web3-lib/apis/market-api'

export default {
  name:"AllDomainList",
  components:{
    LoadingDot,
    ElTabLoading,
  },
  computed: {
    ...Vuex.mapState({
      items:state => state.ewallet.assets.filter( it =>{
        it.hadExpired = isDateExpired(it.expire)
        return it
      }),
      syncState: state => state.ewallet.assetsLoading
    }),
    transoutTitle(){
      return this.$t('p.WalletHomeTransoutDialogTitle',{text:this.transout.domaintext||''})
    },
  },
  data() {
    return {
      txTimeout:30,
      transout:{
        visible:false,
        loading:false,
        domaintext:'',
        domainhash:'',
        tobca:'',
        totext:''
      },
      recharge:{
        visible:false,
        loading:false,
        closeable:true,
        moreshow:false,
        chargeYears:0,
        maxchargeYears:0,
        isRoot:true,
        state:'',//approving
        items:[],
        expiration:0,
        expirationText:'',
        domaintext:'',
        domainhash:'',
        unitbas:'',
        owner:''
      },
      mailDialog:{
        visible:false,
        loading:false,
        hash:null,
        owner:null,
        domaintext:null,
        expire: 0,
        checked: false,
        checklocked:false
      },
      saleOn:{
        visible:false,
        loading:false,
        domaintext:'',
        domainhash:'',
        owner:'',
        salebas:0,
        expire:0,
        expireDate:''
      },
    }
  },
  methods: {
    expireTime(expiretime) {
      return dateFormat(expiretime, 'YYYY-MM-DD HH:mm:ss')
    },
    expireFormat(row,column,cellVal){
      return dateFormat(cellVal)
    },
    translateType(row){
      let domainType = getDomainType(row.domaintext)
      return this.$t(`g.${domainType}`)
    },
    gotoDetail(row, column, cell){
      if(!row.name || column.index !=='domain')return;
      const domaintext = row.domaintext
      this.$router.push({
        path:`/domain/detail/${domaintext}`
      })
    },
    goSetting(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const domaintext = row.domaintext
      this.$router.push({
        path:`/domain/updaterefdata/${domaintext}`,
        name:'domain.updaterefdata',
        params:{
          domaintext:domaintext,
          hash:row.hash,
          expire:row.expire,
          owner:row.owner,
          isRoot:row.isRoot,
          openApplied:row.openApplied,
          isCustomed:row.isCustomed,
          customedPrice:row.customedPrice
        }
      })
    },
    //recharge begin
    hiddenRechargeDialog(opts={}){
      this.recharge = Object.assign(
        {
          visible:false,
          loading:false,
          closeable:true,
          moreshow:false,
          chargeYears:0,
          maxchargeYears:0,
          state:'',//approving
          items:[],
          expiration:0,
          expirationText:'',
          domaintext:'',
          domainhash:'',
          unitbas:'',
          owner:''
        },
        opts
      )
    },
    toggleMoreshow(){
      this.recharge.moreshow = !this.recharge.moreshow
    },
    selectedYear(year){
      if(this.recharge.loading)return
      this.recharge.chargeYears = year
    },
    async handleShowRechage(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      /**
       * compatible root & sub
       */
      const web3State = this.$store.getters["web3State"]
      const chainId = web3State.chainId;
      const wallet = web3State.wallet;
      const ruleState = this.$store.getters["dapp/ruleState"]
      const canRegMaxYear = row.canRechargeYear || maxRechageYears(row.expire)
      const expirationText = dateFormat(row.expire,TS_DATEFORMAT)
      if(canRegMaxYear<=0){
        let tip = this.$t('p.RechargeTimeEnoughTip',{expirationText,max:ruleState.maxRegYears})
        this.message(this.$basTip.error(tip))
        return;
      }

      const isRoot = row.isRoot;
      let unitbas;

      if(isRoot){
        unitbas = row.isRare ? ruleState.rareBas : ruleState.rootBas;
      }else{
        unitbas = ruleState.subBas
        const roothash = row.roothash
        const rootResp = await getDomainInfo(roothash,chainId);
        if(rootResp.state){
          const rootInfo = rootResp.assetinfo
          if(rootInfo.openApplied && rootInfo.isCustomed){
            unitbas = Web3.utils.fromWei(rootInfo.customPrice,'ether')
          }
        }
      }

      const items = getYearItems(canRegMaxYear,unitbas);

      this.recharge = Object.assign({},this.recharge,{
        visible:true,
        loading:false,
        closeable:true,
        moreshow:false,
        chargeYears:canRegMaxYear,
        maxchargeYears:canRegMaxYear,
        isRoot:isRoot,
        state:'',//approving
        items:items,
        expiration:row.expire,
        expirationText:dateFormat(row.expire,TS_DATEFORMAT),
        domaintext:row.domaintext,
        domainhash:row.hash,
        unitbas:unitbas,
        owner:row.owner
      })
    },
    async submitRechargeDomain(){
      /** root & sub recharge */
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const web3State = this.$store.getters["web3State"]

      const isRoot = this.recharge.isRoot

      if(isRoot){
        await this.submitRechargeRootDomain(web3State)
      }else{
        await this.submitRechargeSubDomain(web3State)
      }

    },
    async submitRechargeSubDomain(web3State){
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const network = web3State.network
      const domaintext = this.recharge.domaintext
      const domainhash = this.recharge.domainhash
      const year = this.recharge.chargeYears
      const canRechargeYear = this.recharge.maxchargeYears
      let msg = ''
      const that = this;

      try{
        const validResp = await validRecharge4Domain(domainhash,year,chainId,wallet)

        const approveAddress = validResp.spender
        const costwei = validResp.costwei

        approveTokenEmitter(approveAddress,costwei,chainId,wallet).on('transactionHash',txhash =>{
          that.recharge.loading = true
          that.recharge.closeable=false
          const timeout = that.txTimeout
          setTimeout(async () => {
            that.$message(that.$basTip.error(that.$t('g.MetaMaskTxSlowTimeoutTip',{ts:timeout})))
            that.recharge.closeable=true
          }, timeout * 1000);
        }).on('receipt',async (receipt)=> {
          try{
            console.log("Approve",receipt)
            const receipt = await rechargeSubDomain(domainhash,year,chainId,wallet)
            that.$store.dispatch('ewallet/updateMyAsset',{hash:domainhash})

            that.hiddenRechargeDialog()
          }catch(ex){
            that.recharge.loading = false
            that.recharge.closeable=true
            if(ex.code === USER_REJECTED_REQUEST){
              msg = that.$t(`code.${USER_REJECTED_REQUEST}`)
              that.$message(that.$basTip.error(msg))
              return;
            }else{
              console.error('Recharge error',ex)
            }
          }
        }).on('error',(err,receipt)=> {
          that.recharge.loading = false
          that.recharge.closeable=true
          if(err.code === USER_REJECTED_REQUEST){
            msg = that.$t(`code.${USER_REJECTED_REQUEST}`)
            that.$message(that.$basTip.error(msg))
            return;
          }else{
            console.error('Approve error',err)
          }
        })
      }catch(ex){
        switch (ex) {
          case UNSUPPORT_NETWORK:
          case LACK_OF_TOKEN:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            return;
          case RECHARGE_YEAR_RANGE:
            msg = this.$t(`code.${ex}`,{max:canRechargeYear})
            this.$message(this.$basTip.error(msg))
            return;
          case ROOT_REGIST_CLOSE:
            const rootText = domaintext.substr(domaintext.lastIndexOf('.')+1)
            msg = this.$t(`code.${ex}-Recharge`,{text:rootText});
            this.$message(this.$basTip.error(msg ))
            return;
          case PARAM_ILLEGAL:
          case DOMAIN_NOT_EXIST:
            console.error('PARAM_ILLEGAL',ex)
            break;
          default:
            console.error(ex)
            break;
        }
      }

    },
    async submitRechargeRootDomain(web3State){
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const network = web3State.network

      const domainhash = this.recharge.domainhash
      const year = this.recharge.chargeYears
      const canRechargeYear = this.recharge.maxchargeYears

      let msg = ''
      const that = this;

      try{
        const validRet = await validRecharge4Domain(domainhash,year,chainId,wallet)
        const approveAddress = validRet.spender
        const costwei = validRet.costwei
        approveTokenEmitter(approveAddress,costwei,chainId,wallet).on('transactionHash',txhash =>{
          that.recharge.loading = true
          that.recharge.closeable=false
          const timeout = that.txTimeout
          setTimeout(async () => {
            that.$message(that.$basTip.error(that.$t('g.MetaMaskTxSlowTimeoutTip',{ts:timeout})))
            that.recharge.closeable=true
          }, timeout * 1000);
        }).on('receipt',async (receipt)=> {
          try{
            console.log("Approve Root",receipt)
            const receipt = await rechargeRootDomain(domainhash,year,chainId,wallet)
            that.$store.dispatch('ewallet/updateMyAsset',{hash:domainhash})
            that.hiddenRechargeDialog()
          }catch(ex){
            that.recharge.loading = false
            that.recharge.closeable=true
            if(ex.code === USER_REJECTED_REQUEST){
              msg = that.$t(`code.${USER_REJECTED_REQUEST}`)
              that.$message(that.$basTip.error(msg))
              return;
            }else{
              console.error('Recharge error',ex)
            }
          }
        }).on('error',(err,receipt)=> {
          that.recharge.loading = false
          that.recharge.closeable=true
          if(err.code === USER_REJECTED_REQUEST){
            msg = that.$t(`code.${USER_REJECTED_REQUEST}`)
            that.$message(that.$basTip.error(msg))
            return;
          }else{
            console.error('Approve error',err)
          }
        })
      }catch(ex){
        switch (ex) {
          case UNSUPPORT_NETWORK:
          case LACK_OF_TOKEN:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            return;
          case RECHARGE_YEAR_RANGE:
            msg = this.$t(`code.${ex}`,{max:canRechargeYear})
            this.$message(this.$basTip.error(msg))
            return;

          case PARAM_ILLEGAL:
          case DOMAIN_NOT_EXIST:
            console.error('PARAM_ILLEGAL',ex)
            return;
          default:
            console.error(ex)
            break;
        }
      }
    },
    //recharge end
    //transout begin
    handleShowTransout(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      this.transout = Object.assign(this.transout,{
        visible:true,
        loading:false,
        domaintext:row.domaintext,
        domainhash:row.hash,
        tobca:'',
        totext:'',
        state:''
      })
    },
    hiddenTransoutDialog(opts={}){
      this.transout = Object.assign({
        visible:false,
        loading:false,
        domaintext:'',
        domainhash:'',
        tobca:'',
        totext:''},
      opts);
    },
    async submitTransout(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }

      const domaintext = this.transout.domaintext
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const domainhash =this.transout.domainhash
      const spender = this.transout.tobca

      let msg = ''
      if(!Web3.utils.isAddress(spender)){
        msg = this.$t('p.WalletTransOutAddressFormatErr')
        this.$message(this.$basTip.error(msg))
        return
      }
      if(isOwner(wallet,spender)){
        msg = this.$t('p.WalletTransOutAddressSelfErr')
        this.$message(this.$basTip.error(msg))
        return
      }

      try{
        this.transout.loading = true
        const hash = await transoutOwnershipCi(domainhash,spender,chainId,wallet)
        this.$store.dispatch('ewallet/removeEWalletAssetsIndexedDB',hash)
        this.hiddenTransoutDialog({visible:false,loading:false})

      }catch(ex){
        this.transout.loading = false
        switch (ex) {
          case DOMAIN_NOT_EXIST:
          case DOMAIN_EXPIRED:
            msg = this.$t(`code.${ex}`,{domaintext:domaintext})
            this.$message(this.$basTip.error(msg))
            return
          case UNSUPPORT_NETWORK:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            return
          case ACCOUNT_NOT_MATCHED:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            return
          default:
            break;
        }

        console.log("Transout Error",ex)
      }

    },
    //fetchDomainInfo4Transout
    async fetchDomainInfo4Transout(val){
      const text = this.transout.totext
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet

      if(text && chainId){
        const datas = await getDomainBCADatas(text,chainId)
        if(datas && datas.length ){
          const bca = datas.find( d => Web3.utils.isAddress(d) && !isOwner(d,wallet))
          if(bca){
            this.transout.tobca = bca
          }
        }
      }
    },
    //transout end
    handleShowMailDialog(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const hash = row.hash
      const domaintext = row.domaintext
      const isRoot = row.isRoot
      if(!isRoot)return;

      this.mailDialog = Object.assign({},this.mailDialog,{
        visible:true,
        hash,
        owner:row.owner,
        domaintext,
        expire: row.expire,
        checked: !row.isRare ? true : false,
        checklocked:!row.isRare
      })
    },
    hiddenMailDialog(opts={}){
      this.mailDialog = Object.assign({
        visible:false,
        loading:false,
        hash:null,
        owner:null,
        domaintext:null,
        expire: 0,
        checked: false,
        checklocked:false
      },opts)
    },
    async submitActivationMail(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }

      const ruleState = this.$store.getters["dapp/ruleState"]
      const web3State = this.$store.getters['web3State']
      const chainId = web3State.chainId
      const wallet = web3State.wallet;

      const owner = this.mailDialog.owner
      const isPublic = !this.mailDialog.checked
      const domaintext =  this.mailDialog.domaintext

      const hash = this.mailDialog.hash
      try{
        this.mailDialog.loading=true
        const resp = await activationRootMailService(hash,isPublic,chainId,wallet)

        //update My assets list
        const assetpart ={hash,mailActived:true,mailPublic:isPublic}

        //ewallet/syncEWalletAssets
        this.$store.dispatch('ewallet/updateEWalletAssetsIndexedDB',assetpart)

        this.hiddenMailDialog({})
      }catch(ex){

        this.mailDialog.loading=false
        let msg = ''
        switch (ex) {
          case MAILSERVICE_HAS_ACTIVED:
            msg = this.$t(`code.${MAILSERVICE_HAS_ACTIVED}`,{domaintext:domaintext})
            this.$message(this.$basTip.error(msg))
            return;
          case LACK_OF_TOKEN:
          case LACK_OF_ETH:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            return;
          case ACCOUNT_NOT_MATCHED:
            msg = this.$t(`code.${ex}`,{wallet,asset:domaintext})
            this.$message(this.$basTip.error(msg))
            return;
          default:
            console.log('logic error',ex)
            break;
        }
      }
    },
    //active mail service
    handleShowSaleOn(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const ruleState = this.$store.getters['dapp/ruleState']
      let salebas = ruleState.subBas
      if(row.isRoot) salebas = ruleState.rootBas
      if(row.isRare) salebas = ruleState.rareBas

      this.saleOn = Object.assign({},this.saleOn,{
        visible:true,
        loading:false,
        domaintext:row.domaintext,
        domainhash:row.hash,
        owner:row.owner,
        salebas:salebas,
        expire:row.expire,
        expireDate:dateFormat(row.expire,TS_DATEFORMAT)
      })
    },
    hiddenSaleOnDialog(opts={}){
      this.saleOn = Object.assign({
        visible:false,
        loading:false,
        domaintext:'',
        domainhash:'',
        owner:'',
        salebas:0,
        expire:0,
        expireDate:''
      },opts);
    },
    async submitSetSalePrice(){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      let errMsg =''
      const web3State = this.$store.getters["web3State"]
      const chainId = web3State.chainId
      const wallet = web3State.wallet
      const network = web3State.network
      const domaintext = this.saleOn.domaintext
      const domainhash = this.saleOn.domainhash


      if(!domainhash){
        console.error('doaminhash lost.')
        return
      }
      const owner = this.saleOn.owner
      if(!isOwner(wallet,owner)){
        errMsg = this.$t(`code.${NO_UPDATE_PERMISSIONS}`,{network,asset:domaintext})
        this.$message(this.$basTip.error(errMsg))
        return
      }
      const salebas = this.saleOn.salebas

      if(!validBetweenZero2Billion(salebas)){
        errMsg = this.$t('p.SaleOnPriceUnitBasValidError',{begin:"0",end:numThousandsFormat(MAX_BILLON_VOL)})
        this.$message(this.$basTip.error(errMsg))
        return
      }
      console.log('>>>>>>>>>',domainhash,domaintext)
      const that = this
      try{
        /** domainhash,salewei,spender,chainId,wallet, */
        that.saleOn.loading = true
        const resp = await validAdd2Market(domainhash,salebas,chainId,wallet)

        const salewei = resp.salewei
        const spender = resp.spender
        approveTraOspEmitter(domainhash,spender,chainId,wallet).on('transactionHash',txhash=>{
          that.saleOn.loading = true
        }).on('receipt', async (receipt)=>{
          try{
            const emmitter = await addHashToMarket(domainhash,salewei,chainId,wallet);
            that.$store.dispatch('ewallet/updateAssetProps',{hash:domainhash,isorder:true})
            that.hiddenSaleOnDialog({
              salebas:4,
              expire:0
            });
          }catch(ex){
            that.saleOn.loading = false
            if(ex.code === USER_REJECTED_REQUEST){
              errMsg = that.$t(`code.${USER_REJECTED_REQUEST}`)
              that.$message(that.$basTip.error(errMsg))
              return
            }else{
              console.error(ex)
            }
          }
        }).on('error',(err,receipt)=>{
          that.saleOn.loading = false
          if(err.code === USER_REJECTED_REQUEST){
            errMsg = that.$t(`code.${USER_REJECTED_REQUEST}`)
            that.$message(that.$basTip.error(errMsg))
            return
          }else{
            console.error(err)
          }
        })
      }catch(ex){
        that.saleOn.loading = false
        let msg = ''
        switch (ex) {
          case UNSUPPORT_NETWORK:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            return;
          case DOMAIN_NOT_EXIST:
          case DOMAIN_EXPIRED:
            msg = this.$t(`code.${ex}`,{domaintext:domaintext})
            this.$message(this.$basTip.error(msg))
            return
          case NO_UPDATE_PERMISSIONS:
          case PARAM_ILLEGAL:
            console.error('validAdd2Market args illegal.')
            return;
          default:
            break;
        }

        if(ex.code === USER_REJECTED_REQUEST){
          msg = this.$t(`code.${ex.code}`)
          this.$message(this.$basTip.error(msg))
          return;
        }else if(ex.message.includes(NetworkRequestFail)){
          msg = this.$t(`code.-32603`)
          this.$message(this.$basTip.error(msg))
          return;
        }
        console.error("Unknown Error:",ex)
      }
    },
    gotoRegistMailIndex(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const domaintext = row.domaintext
      const hash = row.hash
      const owner = row.owner
      this.$router.push({
        path:`/mail/regist_internal/${domaintext}`,
        query:{
          owner:owner,
          hash:hash,
          mailActived:row.mailActived
        }
      });
    },
    goRegistSub(index,row){
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      const toptext = row.domaintext
      if(!row.openApplied){
        const msg = this.$t('code.200001',{roottext:toptext})
        this.$message(this.$basTip.error(msg))
        return
      }
      this.$router.push({
        path:`/domain/applysub/${toptext}`,
      })
    }
  },
}
</script>

