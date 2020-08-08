/* =====================
 *
 * =====================
 *
 **/
// import Vue from 'vue'
// import VueRouter from 'vue-router'
import routes from '@/routes'
import store from '@/store'
import metamask from './metamask'


Vue.prototype.$metamask = metamask.install

routes.beforeEach(async (to,from,next) => {
  //console.log(to, '>>>>todo login metamask', next)
  const needLogin = store.getters.metaMaskDisabled;
  if (needLogin){//refresh page no wallet
    await store.dispatch('dapp/autoLoginMetaMask');
  }

  if (to.matched.some(m => m.meta.auth) && needLogin) {
    console.log("todo login metamask");
    metamask.install({
      to,
      from,
      next
    });
  } else if (to.matched.some(m => m.meta.guest) && store.state.auth.authenticated) {
    next({
      name: "home.index"
    });
  } else {
    next();
  }
})
