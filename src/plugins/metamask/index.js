//import Vue from 'vue'
import metamask from './Login.vue'
import store from '@/store'
import { router } from '@/plugins/vue-router';
import { i18n } from '@/plugins/vue-i18n';

const PopupBox = Vue.extend(metamask)

/**
 * data: {
 *
 * }
 */
metamask.install = function(data){
  let instance = new PopupBox({
    store,
    i18n,
    router,
    data
  }).$mount()

  document.body.appendChild(instance.$el)

  Vue.nextTick(()=>{
    instance.show()
  })
}

export default metamask;
