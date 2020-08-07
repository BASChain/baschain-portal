<template>
  <div>
    <!-- <top-bar v-bind:isBlack="isBlackTheme"/> -->
    <!-- <top-el-bar v-bind:isBlack="isBlackTheme" /> -->
    <top-bs-bar v-bind:isBlack="isBlackTheme" />
    <slot />
  </div>
</template>

<script>
import TopBar from '@/header/TopBar.vue'
import TopElBar from '@/header/TopElNav.vue'
import TopBsBar from '@/header/TopBSBar.vue'

export default {
  name:'DefaultLayout',
  components: {
    TopBar,
    TopElBar,
    TopBsBar,
  },
  data() {
    return {
      menuCollapsed:false,
    };
  },
  props:{
    topbarTheme: {
      default:'white',
      type:String,
      required:false
    }
  },
  methods:{

  },
  computed: {
    isBlackTheme (){
      return !!(this.topbarTheme ==='black')
    }
  }
}
</script>

<style>


</style>
