<template>
  <div class="bas-goback-nav"
    @click="gobackPrevPage"
    :class="clsName">
    <div>
      {{$t('l.GoBackPrevPage')}}
    </div>
  </div>
</template>

<script>
export default {
  name:"GobackNav",
  computed: {

  },
  props : {
    clsName:{
      default:'',
      type:String,
      required:false
    }
  },
  methods: {
    gobackPrevPage(){
      this.$router.go(-1)
    }
  },
}
</script>
<style>
  .bas-goback-nav {
    cursor: pointer;
    height:32px;
    display: inline-flex;
    background:rgba(249,250,250,1);
    border-radius:16px;
    justify-content: flex-start;
    align-items: center;
    margin: .25rem auto;
    margin-left: -15px;
  }

  .bas-goback-nav * {
    font-weight:400;
    font-size: 14px;
    color: rgba(151,151,166,.8);
    margin: auto 1.5rem;
  }

  .bas-goback-nav:hover {
    background-color: rgba(249,250,250,.8);
    color: rgba(151,151,166,1)
  }
</style>
