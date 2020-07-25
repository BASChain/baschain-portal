/**
 * Main File
 */
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
//import Vue from 'vue'
Vue.config.productionTip = true;
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

//import idbkvs from './bascore/indexDBService'
//global.idbkvs = idbkvs


//bizjs
import { DAppInfo } from './bascore'
import { CheckRuntime } from '@/bizlib/check-runtime'
const runtime = new CheckRuntime(window.navigator.userAgent)
const browser = runtime.info.name;
import { AEGIS } from '@/web3-lib/apis/send-token-api'

global.BasRuntime = Object.assign({}, runtime.info, DAppInfo, { browser, AEGIS })

//Binding Infura
// import { BindInfura } from './web3-lib/infura'
// BindInfura()



//Seria WorkFlow
import App from './App'
import store from './store'
import router from './routes';
import './plugins/vue-router';

//import './plugins/vuex-router-sync'

//build need recomment
//global.punycode = require('punycode')

//fix reload error
// const originalPush = router.prototype.push;
// //location 点击的路由
// router.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }


/**
 * all at last
 */
import './assets/css/element-#00CA9B/index.css'
import "./assets/css/main.css";

/**
 * load on mount App
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
  console.log(">>>>DOMCLoaded",new Date().getTime() )
  basvue.$mount('#app')
})
