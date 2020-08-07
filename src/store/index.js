
//import createLogger from 'vuex/dist/logger'

import getters from './getters'


//Modules
import assets from './modules/assets'
import dapp from './modules/dapp';
import ewallet from './modules/ewallet'

import web3 from './modules/web3';
import auth from './modules/auth';
import domains from './modules/domains'
import market from './modules/market'


const debug = process.env.NODE_ENV !== 'production'

const mutations = {
  setLang (state,lg) {
    console.log("Commit lang:",lg)
    state.lang = lg;
    Cookies.set('BasLang', lg, { expires: 7 })
  },
  setTopnav(state,name){
    console.log('',name)
    state.topnav = name
  },
  setBrowser(state,payload) {
    if(typeof payload === 'Object'){
      state.browser.name = payload.name
      state.browser.os = payload.os
      state.browser.version = payload.version
      state.browser.detectOS = payload.detectOS
    }
  }
}

const actions = {
  changedLang({commit},lang){

    switch (lang) {
      case "zh-CN":
        if (ELEMENT.locale && ELEMENT.lang.zhCN){
          ELEMENT.locale(ELEMENT.lang.zhCN);
        }
        Cookies.set("BasLang", lang);
        commit("setLang", lang);
        break;
      case "en":
        if (ELEMENT.locale && ELEMENT.lang.en){
          ELEMENT.locale(ELEMENT.lang.en);
        }
        Cookies.set("BasLang", lang);
        commit("setLang", lang);
        break;
      case "jp":
        if (ELEMENT.locale && ELEMENT.lang.ja) {
          ELEMENT.locale(ELEMENT.lang.ja);
        }
        Cookies.set("BasLang", lang);
        commit("setLang",lang);
        break;
      default:
        if (ELEMENT.locale && ELEMENT.lang.zhCN) {
          ELEMENT.locale(ELEMENT.lang.zhCN);
        }
        commit("setLang", "zh-CN");
        Cookies.set("BasLang", "zh-CN");
        break;
    }
  }
}


export default new Vuex.Store({
  actions,
  modules: {
    assets,
    dapp,
    ewallet,
    web3,
    auth,
    domains,
    market
  },
  state:{
    lang: Cookies.get('BasLang') ||"zh-CN",
    topnav:"home.index",
    browser:{
      name:'',
      version:'',
      os:'',
      detectOS:''
    },
  },
  getters,
  mutations,
  strict:debug,
  plugins: [],
})


