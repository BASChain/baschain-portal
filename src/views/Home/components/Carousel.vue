<template>
  <div>
    <el-carousel :interval="10000" :height="carouselHeight"
      id="HomeCarousel">
      <el-carousel-item v-for="(item,idx) in banners"
        :key="idx">
        <div class="bas-carousel--inner">
          <img :src="`/static/img/${item.img}`" :alt="item.name" class="header-carousel">
          <!-- index 1 -->
          <div  v-if="idx ===0" class="bas-carsouel-float d-none d-md-block">
            <div class="bas-carsouel-inner--container">
              <div class="bas-carsouel-inner--block" >
                <h1 class="text-center" style="font-size:4.75rem;">
                  {{$t('p.HomeGetFreeTitle')}}
                </h1>
                <p style="margin:.75rem auto;font-size:1.2rem;">
                  {{$t('p.HomeGetFreeNetworksTips')}}
                </p>
                <div class="bas-carsouel-inner--block">
                  <button v-loading.lock="ctrl.ethLoading"
                    @click="getETHFreeHandle" :disabled="ctrl.ethLoading"
                    class="carsouel-btn">{{ $t('p.HomeCarouselGetEth') }}</button>
                  <button
                    :disabled="ctrl.basLoading" v-loading.lock="ctrl.basLoading"
                    @click="getBASFree" style="margin-left:1.5rem;"
                    class="carsouel-btn">{{ $t('p.HomeCarouselGetBAS') }}</button>
                </div>
              </div>
            </div>

          </div>

          <div v-if="idx ===1 && isCN"
            class="bas-carsouel-float d-none d-md-block">
            <div class="bas-carsouel-inner--block" >
              <div class="slogan-inner-flex">
                <div class="bas-slogan-block">
                  <span class="bas-slogan yellow-cn">
                    区块
                  </span>
                  <span class="bas-slogan">
                    存续
                  </span>
                  <span class="bas-slogan mr-1">
                    历史
                  </span>
                  <span class="bas-slogan ml-1">
                    科技
                  </span>
                  <span class="bas-slogan green-cn">
                    链接
                  </span>
                  <span class="bas-slogan">
                    未来
                  </span>
                </div>
              </div>

            </div>
          </div>

          <div v-if="idx ===1 && !isCN"
            class="bas-carsouel-float d-none d-md-block">
            <div class="bas-carsouel-inner--block">
              <div class="slogan-inner-flex">
                <div class="bas-slogan-block">
                  <span class="bas-slogan yellow-cn">
                    Block
                  </span>
                  <span class="bas-slogan">
                    Records
                  </span>
                  <span class="bas-slogan">
                    History
                  </span>
                </div>
                <div class="bas-slogan-block">
                  <span class="bas-slogan">
                    Technology
                  </span>
                  <span class="bas-slogan green-cn">
                    Links
                  </span>
                  <span class="bas-slogan">
                    Future
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="bas-declare-wrapper">
      <h6>{{$t('p.HomeDeclaration')}}</h6>
    </div>
  </div>


</template>
<style>
.slogan-inner-flex {
  position: fixed;
  width: 100%;
  left:0;
  top:50%;
  transform: translateY(-50%);
  text-align: center;
  -webkit-transform: translateY(-50%);
}
.bas-carsouel-inner-block {
  position:absolute;
  float: left;
  top: 0;
  width: 100%;
  height: 100%;
  display: inline-flex;
  direction: column;
  justify-content: center;
  align-items: center;
}
.bas-carsouel-inner--container-en .bas-carsouel-block {
  width: 100%;
}

.bas-slogan-block span.bas-slogan {
  font-size:72px;
  font-weight:500;
  line-height:100px;
  letter-spacing:0px;
  margin: 0;
  padding: auto 0;
}

span.yellow-cn {
  color:rgba(253,191,79,1);
}
span.green-cn {
  color:rgba(0, 202, 155, 1);
}

.bas-declare-wrapper {
  height: 48px;
  width: 100%;
  display: inline-flex;
  direction: column;
  justify-content: center;
  align-items:center;
  color: #fff;
  background: rgba(0,202,155,1);
}

.bas-declare-wrapper h6 {
  font-weight:500;
  color:rgba(255,255,255,1);
  line-height:22px;
}
.bas-carsouel-float {
  position: absolute;
  left:0;
  top:0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color:#fff;
  /* border: 2px solid #fff; */
}

.bas-carsouel-inner--block {
  clear: inherit;
  display:block;
  text-align: center;
  margin-bottom: 2rem;
}

.bas-carsouel-inner--container {
  clear: both;
  width: 100vw;
  height: 100%;
  display: inline-flex;
  direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem auto;
}

.carsouel-btn {
  background: rgba(4,6,46,.9);
  border: 1px solid rgba(4,6,46,1);
  margin-top: 1rem;
  color: #fff;
  width: 160px;
  height: 52px;
  font-weight:400;
  font-size:1rem;
  opacity: 0.9;
}


.carsouel-btn:hover {
  opacity: 0.75;
}

.carsouel-btn:disabled {
  background: transparent;
  color: #fff;
  cursor: none;
  border: 1px solid rgba(245,246,246,1);
}

</style>
<script>

import GetFreeProxy from '@/proxies/GetFreeProxy.js'

import {
  MIN_BAS,
  getToken4Bas,
  canGetTokenValid,
  canGetEthValid,
} from '@/web3-lib/apis/send-token-api.js'

import {
  USER_REJECTED_REQUEST,
  UNSUPPORT_NETWORK,MORE_THAN_MIN_TOKEN,
  LACK_OF_TOKEN,LACK_OF_ETH,
  PARAM_ILLEGAL,
  TOKEN_HAS_GET,ENOUGH_BALANCE_OF_ETH
} from '@/web3-lib/api-errors.js'

export default {
  large:false,
  name:"HeaderCarouselEle",
  data() {
    return {
      carouselHeight:"66.67vh",
      declaration:"",
      banners:[
        {
          name:"FirstBanner",
          img:'banner_670_0.png'
        },
        {
          name:"Second",
          img:'banner_670_1.png'
        },
        // {
        //   name:"Third",
        //   img:'banner_2.png'
        // }
      ],
      ctrl:{
        ethLoading:false,
        basLoading:false,
      }
    }
  },
  computed: {
    ...Vuex.mapState({
      isCN:state=> {return state.lang ==='zh-CN'}
    })
  },
  mounted() {
    //todo check injected

  },
  methods: {
    initCarousel() {
      let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      this.screenWith = width;
    },
    resizeCarousel() {

    },
    async getETHFreeHandle(){
      //let url= "https://faucet.metamask.io/";
      //window.open(url,'Get Ether');
      console.log("Get Eth Free ...")
      if(this.ctrl.ethLoading){
        let tips = this.$t('g.ApplyingTestTokenOrEtn',{text:'ETH'})
        this.$message(this.$basTip.error(tips))
        return
      }
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      let web3State = this.$store.getters['web3State']
      let chainId = web3State.chainId;
      let wallet = web3State.wallet;

      let msg = ''

      if(parseInt(chainId) !== 3){
        msg = this.$t('g.OnlyRopstenGetBas')
        this.$message(this.$basTip.error(msg))
        return;
      }

      let that = this
      try{
        that.ctrl.ethLoading = true
        const valid = await canGetEthValid(chainId,wallet)
        let proxy = new GetFreeProxy()
        proxy.getFreeEth(wallet).then(resp=>{
          console.log(resp)
          msg = that.$t("g.GetTokenOrETHSuccess")
          that.$message(that.$basTip.warn(msg))

          setTimeout(() => {
            that.ctrl.ethLoading = false
          }, 3000);
        }).catch(ex=>{
          that.ctrl.ethLoading = false
          console.log(ex)
          if(ex.code === USER_REJECTED_REQUEST){
            msg = this.$t(`code.${USER_REJECTED_REQUEST}`)
            this.$message(this.$basTip.error(msg))

            return;
          }else{
            console.error('Get ETH Fail :',ex)
            msg = this.$t('g.GetTokenOrETHFail')
            this.$message(this.$basTip.error(msg))
            return;
          }
        })

      }catch(ex){
        that.ctrl.ethLoading = false
        switch (ex) {
          case UNSUPPORT_NETWORK:
            msg = this.$t('g.OnlyRopstenGetBas')
            this.$message(this.$basTip.error(msg))
            return;
          case ENOUGH_BALANCE_OF_ETH:
            msg = this.$t('g.EnoughEthBalanceCannotApply')
            this.$message(this.$basTip.error(msg))
            return;
          case LACK_OF_ETH:
            msg = this.$t('g.SenderLackOfEthTip')
            this.$message(this.$basTip.error(msg))
            return;
          case PARAM_ILLEGAL:
            console.error('Get ETH Error',ex)
            return;
          default:
            break;
        }
      }
    },
    async getBASFree(){
      let tipmsg = ""
      if(this.ctrl.basLoading){
        tipmsg = this.$t("p.HomeGetFreeHandlingWarn")
        this.$message(this.$basTip.warn(tipmsg))
        return
      }
      if(this.$store.getters['metaMaskDisabled']){
        this.$metamask()
        return
      }
      let web3State = this.$store.getters['web3State']
      let chainId = web3State.chainId;
      let wallet = web3State.wallet;

      let msg = ""
      if(parseInt(chainId) !== 3){
        msg = this.$t("p.HomeGetFreeNetworksTips")
        this.$message(this.$basTip.error(msg))
        return;
      }

      try{

        const valid = await canGetTokenValid(chainId,wallet);
        const emitter =  getToken4Bas(chainId,wallet)

        emitter.on('transactionHash',txhash=>{
          console.log(txhash)
          this.ctrl.basLoading = true
        }).on("receipt",(receipt) => {
          console.log(resp)
          msg = this.$t('g.GetBasTokenSuccess')
          this.$message(this.$basTip.warn(msg))
          this.ctrl.basLoading = false
        }).on('error',(ex,receipt) =>{
          this.ctrl.basLoading = false
          if(ex.code === USER_REJECTED_REQUEST){
            msg = this.$t(`code.${USER_REJECTED_REQUEST}`)
            this.$message(this.$basTip.error(msg))
            return;
          }else{
            console.error('Get Free Bas Fail:',ex)
          }
        }).catch(ex=>{
          console.error('Get Free Bas Fail>>>:',ex)
        })

      }catch(ex){
        console.log(ex)
        switch (ex) {
          case LACK_OF_ETH:
            msg = this.$t('g.GetBasLackOfEth')
            this.$message(this.$basTip.error(msg))
            return;
          case UNSUPPORT_NETWORK:
            msg = this.$t('g.OnlyRopstenGetBas')
            this.$message(this.$basTip.error(msg))
            return;
          case MORE_THAN_MIN_TOKEN:
            msg = this.$t(`code.${ex}`,{minbas:`${MIN_BAS}BAS`})
            this.$message(this.$basTip.error(msg))
            return;
          case TOKEN_HAS_GET:
            msg = this.$t(`code.${ex}`)
            this.$message(this.$basTip.error(msg))
            return;
          case LACK_OF_TOKEN:

            console.error('Get Free Bas Fail:',ex)
          default:
            break;
        }


      }
    }
  }
}
</script>
<style>

</style>
