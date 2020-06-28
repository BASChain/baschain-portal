/**
 * Main File
 */
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import Vue from 'vue'
Vue.config.productionTip = true
/* =====================
 * Plugins Import
 * =====================
 *
 **/
import './plugins/font-awesome'
//import './plugins/vuex'
//import './plugins/axios'

import { i18n } from './plugins/vue-i18n';


import './plugins/bootstrap'
import './plugins/elementui'



//bizjs
import { DAppInfo } from './bascore'
import { CheckRuntime } from '@/bizlib/check-runtime'
const runtime = new CheckRuntime(window.navigator.userAgent)
const browser = runtime.info.name;
global.BasRuntime = Object.assign({}, runtime.info, DAppInfo, { browser })

//Binding Infura
// import { BindInfura } from './web3-lib/infura'
// BindInfura()



//Seria WorkFlow
import App from './App'
import store from './store'
import { router } from './plugins/vue-router';
//import './plugins/vuex-router-sync'

//build need recomment
//global.punycode = require('punycode')


/**
 * all at last
 */
import './assets/css/element-#00CA9B/index.css'
import "./assets/css/main.css";

/**
 * load
 */
store.dispatch("dapp/checkInjected");
store.dispatch("dapp/autoLoginMetaMask");

/* eslint-disable no-new */
global.basvue = new Vue({
  el: "#app",
  i18n,
  router,
  store,
  render: h => h(App),
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  },
});


document.addEventListener('DOMContentLoaded', function () {
  console.log(">>>>DOMCLoaded",new Date().getTime())
  basvue.$mount('#app')
})
