<template>
  <div class="bas-circle-loading">
    <div class="bas-circle-inner">
      <div class="bas-loader-dot"></div>
      <div class="bas-loader-dot"></div>
      <div class="bas-loader-dot"></div>
    </div>
  </div>
</template>

<script>
export default {
  name:"BasCircleLoading"
}
</script>
<style>
.bas-circle-loading {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30pt;
  width: 30pt;
  text-align: center;
  background: rgba(229,249,245,1);
  border-radius: 30pt;
}
.bas-circle-inner {
  width:22pt;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.bas-loader-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 6px;
}

.bas-circle-inner .bas-loader-dot:nth-last-child(3) {
  margin :2px auto;
  background: rgba(255,174,47,1);
  animation: dot-down .9s .1s linear infinite;
  -webkit-animation: dot-down .9s .1s linear infinite;
}

.bas-circle-inner .bas-loader-dot:nth-last-child(2) {
  margin :2px auto;
  background:rgba(2,184,148,1);
  animation: dot-down .9s .3s linear infinite;
  -webkit-animation: dot-down .9s .3s linear infinite;
}
.bas-circle-inner .bas-loader-dot:nth-last-child(1) {
  margin :2px auto;
  margin-right: 4px;
  background:rgba(242,133,82,1);
  animation: dot-down .9s .6s linear infinite;
  -webkit-animation: dot-down .9s .6s linear infinite;
}
</style>
