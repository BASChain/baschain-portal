<template>
  <!-- <nav class="navbar navbar-expand-md fixed-top"
    :class="isBlack ? 'header-warp-black' : 'header-warp-white'"> -->

 <b-navbar toggleable="lg" fixed="top"
  :class="isBlack ? 'header-warp-black' : 'header-warp-white'">
    <nav-logo :isDark="isBlack" class="nav-brand"/>
    <b-collapse id="nav-collapse" is-nav >
      <b-navbar-nav class="mx-auto">
        <b-nav-item v-for="(m,idx) in topMenus"
          :to="{name: m.name, path: m.to}"
          class="bsnav-li"
          active="is-active"
          :key="idx">
            {{ $t(m.i18n) }}
        </b-nav-item>
      </b-navbar-nav>

    </b-collapse>
      <top-avatar class="ml-auto"/>
      <top-localization />
      <b-navbar-toggle target="nav-collapse">
        <template v-slot:default="{ expanded }">
          <b-icon v-if="expanded" icon="x"></b-icon>
          <b-icon v-else icon="list"></b-icon>
        </template>
      </b-navbar-toggle>
  </b-navbar>
</template>

<script>
import NavLogo from './NavLogo'
import TopAvatar from './TopAvatar.vue'
import TopLocalization from './TopLocalization'

import  {navMenus}  from './js/nav-menu.js'

export default {
  name:"topbar",
  components:{
    NavLogo,
    TopAvatar,
    TopLocalization,
  },
  computed: {
    topMenus() {
      return this.navMenus.filter(m => !m.hidden)
    }
  },
  data() {
    return {
      menuCollapsed:false,
      navMenus,
    };
  },
  props:{
    isBlack:{
      type:[Boolean,String],
      required:true
    }
  },
  methods:{


  },

  mounted() {
    let curLang = this.$store.getters['currentLang']
    console.log(curLang)
    this.$i18n.locale = curLang;
    this.lang = curLang
  },
}
</script>
<style>
.header-warp-black {
  min-height: 76px;
  background-color: rgba(4,6,46,.5);
}
.header-warp-white {
  min-height: 76px;
  background-color: rgba(255,255,255,.9);
  -webkit-transition-property:all;
  transition-property:all;
  -webkit-transition-duration: 0.2s;
          transition-duration: 0.2s;
  -webkit-transition-timing-function: ease-in-out;
          transition-timing-function: ease-in-out;
  -webkit-transition-delay: 0s;
          transition-delay: 0s;
  -webkit-box-shadow: 0 1px 1px 0 rgba(225,229,229,1);
          box-shadow: 0 1px 1px 0 rgba(225,229,229,1);
}
</style>
