<template>
  <router-link :to="{name: 'home.index'}" :class="logoClass">
    <img :src="isDark ? darkLogo : lightLogo " class="top-nav-logo"/>
  </router-link>
</template>

<script>

import LogoHeaderBlack from '@/assets/icons/logo_header_blk.png'
import LogoHeaderColorful from '@/assets/icons/logo_header.png'

export default {
  name: "TopNavLogo",
  data:()=>({
    darkLogo: LogoHeaderColorful,
    lightLogo: LogoHeaderBlack,
  }),
  props: {
    isDark: {
      default: false,
      type: Boolean
    },
    logoClass: {
      default:'',
      type:String,
      required:false
    }
  }
}
</script>
<style>
.top-nav-logo {
  margin: 0 !important;
  width: 168px;
}
</style>
