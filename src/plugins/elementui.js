// import Vue from 'vue'
//import ElementUI from 'element-ui'
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ELEMENT)
//Vue.use(ElementUI);
Vue.config.lang = 'en'
if(ELEMENT.locale && ELEMENT.lang && ELEMENT.lang.zhCN) {
  ELEMENT.locale(ELEMENT.lang.zhCN);
}

if (Vue.locale && ELEMENT.lang && ELEMENT.lang.zhCN) {
  Vue.locale("zh-CN", ELEMENT.lang.zhCN);
}
if (Vue.locale && ELEMENT.lang && ELEMENT.lang.en) {
  Vue.locale("en", ELEMENT.lang.en);
}
if (Vue.locale && ELEMENT.lang && ELEMENT.lang.ja) {
  Vue.locale("ja", ELEMENT.lang.ja);
}

const offset =260,center = false;
Vue.prototype.$basTip = {
  warn(text){
    return {
      message:text||'',
      showClose: true,
      duration:3000,
      offset,
      center,
      type: 'warn'
    }
  },
  error(text){
    return {
      message:text||'',
      showClose: true,
      duration:6000,
      offset,
      center,
      type: 'error'
    }
  }
}

Vue.prototype.$neterr =(text,options)=>{
  let opts ={
    message: 'Request timeout,Please try again.',
    showClose: true,
    duration: 3000,
    offset,
    center,
    type: 'error'
  }
  if(text){
    opts.message = text
  }
  if(options){
    opts = Object.assign(opts,options)
  }
  return opts;
}
