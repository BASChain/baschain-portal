<template>
  <div>
    <div class="bas-mine-wallet">
      <button class="bas-avatar-btn" @click="loginAndGotoWalletPage">
        {{$t('g.MineWallet')}}
      </button>
    </div>
  </div>


</template>
<style>
.bas-avatar-btn {
  cursor: pointer;
  display: inline-flex;
  margin: auto 0rem auto .5rem;
  min-width: 80px;
  height: 40px;
  border-radius: 5px;
  /* border-top-right-radius: 0;
  border-bottom-right-radius: 0; */
  font-size: .95rem;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  color: #fff;
  /* padding: 0 20px; */
  border: none!important;
  background: rgba(0,202,155,.85);
}

.bas-avatar-btn-hash {
  width: 80px !important;
  word-break: break-all !important;
  font-size: 14px !important;
}
</style>
<script>

import {
  enableMetaMask,
} from '@/web3-lib'

export default {
  name:"TopAvatar",
  beforeCreate() {
  },
  data() {
    return {
    }
  },
  computed:{

  },
  methods:{
    loginAndGotoWalletPage(){
      if(this.$store.getters['metaMaskDisabled']){
       // console.log('OK')
        const data = {next : {
          name:"wallet.index",
        }};
        this.$metamask(data)
        return
      }
      // //TODO checkSupport

      // //TODO login
      enableMetaMask().then(resp=>{
        console.log("Login EWallet",resp)
        this.$store.commit('dapp/setMetaMaskLogin',res)
      }).catch(ex=>{
        if(ex.code === 4001){
          this.$message(this.$basTip.error($t('code.4001')))
        }else if(ex.code === -32601){
          this.$message(this.$basTip.error($t('g.NetworkTimeout')))
        }
      })
      const curFullPath = this.$route.fullPath
      if(!curFullPath.startsWith('/wallet')) {
        this.$router.push({
          name:"wallet.index",
        })
      }
    }
  },
  mounted(){

  }
}
</script>
