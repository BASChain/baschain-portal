<template>
  <div id="app">
    <router-view :key="$route.fullpath"/>
  </div>
</template>

<script>
  import { startDappListener } from './bascore/web3-eventhandler'
  import {checkSupport} from '@/web3-lib/networks'

  export default {
    //Application Name
    name: 'ExchangeDApp',
    computed: {
      hasLogin(){
        const state = this.$store.state;
        return state.dapp.injected && Boolean(state.dapp.chainId) && Boolean(state.dapp.wallet)
      },
      ...Vuex.mapState({
        latestRootDomainsChanged:state => {return state.domains.latestRootDomainsChanged },
        latestSubDomainsChanged:state => {return state.domains.latestSubDomainsChanged },
        currentChainId:state => state.dapp.chainId
      })
    },
    data() {
      return {

      }
    },
    methods: {
      /**
       * load ewallet assets
       */
      syncMyAssetsFromBlockChain(){
        const web3State = this.$store.getters['web3State']
        if(web3State.chainId &&
          checkSupport(web3State.chainId) && web3State.wallet){
          this.$store.dispatch('ewallet/syncEWalletAssets',web3State)
        }
      }
    },
    created() {
      // console.log(this.$store)
      // this.$store.dispatch('dapp/autoLoginMetaMask');
    },
    mounted() {
      //refresh 如果MetaMask unLocked 就尝试自动登录
      let injected = this.$store.state.dapp.injected;
      // if(injected && window.ethereum && ethereum._metamask.isUnlocked){
      //   //auto login MetaMask
      //   //console.log('DappLoginInit>>>',unlocked)
      //   try{
      //     //this.$store.dispatch('dapp/autoLoginMetaMask');



      //     let that = this;

      //     // startDappListener().then(msg=>{
      //     //   console.log(msg)
      //     // })
      //   }catch(ex){
      //     console.log('LoadDapp',ex)
      //   }
      // }
      this.$store.dispatch('dapp/AccountsChangedHandler')
      //ChainChangedHandler
       this.$store.dispatch('dapp/ChainChangedHandler')
    },
    beforeUpdate() {

    },
    async updated() {

    },
    watch: {
      hasLogin(val,oldval){
        if(val){
          setTimeout(() => {
            console.log('reload assets')
            this.syncMyAssetsFromBlockChain()
          }, 500);
        }
        if(val && !oldval){
          //let mmState = this.$store.getters['web3/loginState'];
          console.log('Watch Login Metamask:old=>new',oldval,val)

          //loading listener
          //DappMetaMaskListener()
          const web3State = this.$store.getters['dapp/web3State']
          //console.log('Watch Login Metamask web3State:',web3State)
          startDappListener().then(msg=>{
            console.log('start listener>>>',msg)
          })
        }else{
          //reset wallet
        }
      },
      latestRootDomainsChanged(val,old){
        console.log('watch latestRootDomainsChanged',val,old)

        if(false && val){
          let that = this
          console.log('Lazy refresh loadLatestRootDomains')
          setTimeout(() => {
            that.$store.dispatch('loadLatestRootDomains',{enfroce:true,pagesize:12})
          }, 5000);
        }
      },
      latestSubDomainsChanged(val,old){
        console.log('watch latestSubDomainsChanged',val,old)
        if(false && val){
          let that = this
          console.log('Lazy refresh loadLatestSubDomains')
          setTimeout(() => {
            that.$store.dispatch('loadLatestSubDomains',{enfroce:true,pagesize:12})
          }, 5000);
        }
      },
      currentChainId(val,old){
        console.log('currentChainId',val)
        const isCN = this.$store.state.lang === 'zh-CN'

        //let
        if(val){
          let msgHtml = ''
          let NoticeOPT = {
            position:'top-left',
            title:'Notice',
            message:'',
            offset: 60,
            duration:5000
          }
          const localCID = process.env.LOCAL_CID||''
          //console.log(checkSupport(val),val,localCID)
          if(checkSupport(val) && (val==3 || val=='3')){
            //NoticeOPT.type='warning'
            NoticeOPT.customClass = 'notification-network-ropsten'

            NoticeOPT.dangerouslyUseHTMLString=true
            const msgI18nText = this.$t('p.RopstenNotificationNetworkContent')
            msgHtml = `<span><i class="fa fa-circle dot-ropsten"></i>${msgI18nText}</span>`
            NoticeOPT.message = msgHtml

            NoticeOPT.duration = 5000

            this.$notify(NoticeOPT)
          }else if(checkSupport(val) && (val==1 || val=='1')){
            //NoticeOPT.type='warning'
            NoticeOPT.customClass = 'notification-network-mainnet'

            NoticeOPT.dangerouslyUseHTMLString=true
            const msgI18nText = this.$t('p.MainnetNotificationNetworkContent')
            msgHtml = `<span><i class="fa fa-circle dot-mainnet"></i>${msgI18nText}</span>`
            NoticeOPT.message = msgHtml

            NoticeOPT.duration = 10000

            this.$notify(NoticeOPT)
          }else if(checkSupport(val) && val == localCID ){
            //NoticeOPT.type='warning'
            console.log(checkSupport(val),val,">>>>")
            NoticeOPT.customClass = 'notification-network-ropsten'

            NoticeOPT.dangerouslyUseHTMLString=true
            const msgI18nText = this.$t('p.LocalNotificationNetworkContent')
            msgHtml = `<span><i class="fa fa-circle dot-mainnet"></i>${msgI18nText}</span>`
            NoticeOPT.message = msgHtml

            NoticeOPT.duration = 10000

            this.$notify(NoticeOPT)
          }
          else{
            //NoticeOPT.type='warning'
            NoticeOPT.customClass = 'notification-network-unsupport'

            NoticeOPT.dangerouslyUseHTMLString=true
            const msgI18nText = this.$t('p.UnsupportNotificationNetworkContent')
            msgHtml = `<span><i class="fa fa-circle dot-unsupport"></i>${msgI18nText}</span>`
            NoticeOPT.message = msgHtml

            NoticeOPT.duration = 30000

            this.$notify(NoticeOPT)
          }
        }
      }
    },
  }
</script>

<style>
/* body {
  min-width: 800px;
} */
</style>
