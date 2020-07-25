// import Vue from 'vue'
// import Router from 'vue-router'
import Paths from './paths'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
  base: '/',
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  routes: Paths
});