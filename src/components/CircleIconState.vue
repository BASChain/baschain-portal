<template>
  <div :class="className">
    <div class="bas-circle-inner" v-if="isloading">
      <div class="bas-loader-dot"></div>
      <div class="bas-loader-dot"></div>
      <div class="bas-loader-dot"></div>
    </div>
  </div>
</template>

<script>
export default {
  name:"CircleIconState",
  computed: {
    isloading(){
      return this.className === 'bascc-icon--loading'
    }
  },
  props:{
    className:{
      default:'bascc-icon--success',
      type:String
    }
  }
}
</script>
<style>
.bascc-icon--loading {
  width: 56px;
  height: 56px;
  display: inline-flex;
  justify-content: center;
  align-content: center;
  text-align: center;
  background: rgba(229,249,245,1);
  border-radius: 56px;
}

.bascc-icon--success{
  width: 56px;
  height: 56px;
  background: url(../assets/icons/bingo.png);
  background-size: 56px 56px;
  border-radius: 50%;
  background-repeat: no-repeat;
  border:.1px solid rgba(255,174,47,.1);
}
.bascc-icon--sad{
  width: 56px;
  height: 56px;
  background: url(../assets/icons/icon_sad.png);
  background-size: 56px 56px;
  border-radius: 50%;
  background-repeat: no-repeat;
  border:.1px solid rgba(255,174,47,.1);
}

.bascc-icon--cong{
  width: 56px;
  height: 56px;
  background: url(../assets/icons/icon_cong.png);
  background-size: 56px 56px;
  border-radius: 50%;
  background-repeat: no-repeat;
  border:.1px solid rgba(255,174,47,.1);
}
</style>
