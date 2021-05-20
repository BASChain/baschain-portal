// import Vue from 'vue'
// import Router from 'vue-router'
import Paths from "./paths";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
console.log(">>>>>>NODE_ENV>>>>>>>>>>", process.env.NODE_ENV);
export default new VueRouter({
  base: "/",
  mode: process.env.NODE_ENV === "development" ? "hash" : "history",
  scrollBehavior: () => ({ y: 0 }),
  routes: Paths
});
