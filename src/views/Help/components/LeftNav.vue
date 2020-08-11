<template>
  <el-aside :width="lw">
    <div class="bas-help--leftnav">
      <div class="bas-help-navlogo">
        <img src="/static/icons/logo_green.png">
        <p>
          Help Center
        </p>
      </div>
      <el-menu
        router="true"
        text-color="#04062E"
        active-text-color="#FFF"
        :default-active="activeName" class="bas-el-menu-bg">
        <el-menu-item class="bas-el-menu-item"
          v-for="(m,idx) in menus" :key="idx"
          @click="navRoute(m)"
        :index="m.name">
          <span>{{$t(`l.${m.i18nkey}`)}}</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-aside>
</template>

<script>
export default {
  name:"HelpLeftNav",
  computed: {
    activeName(){
      return  'help.issue'
    }
  },
  data(){
    return {
      lw:'476px',
      activeName:'',
      menus:[
        {
          name:"help.issue",
          i18nkey:"HelpNavCommIssue",
          text:"常见问题",
          to:"help.issue",
          path:"/help/issue",
        },
        {
          name:"help.bmail",
          i18nkey:"HelpNavDomainMail",
          text:"Domain Mail",
          to:"help.bmail",
          path:"/help/bmail",
        },
        // {
        //   name:"help.buyer",
        //   i18nkey:"HelpNavBuyerIssue",
        //   text:"Buyer",
        //   to:"help.buyer",
        //   path:"/help/buyer",
        // },
        {
          name:"help.seller",
          i18nkey:"HelpNavSellerIssue",
          text:"Seller",
          to:"help.seller",
          path:"/help/seller",
        },
      ]
    }
  },
  methods:{
    navRoute(menu){
      if(!menu || !menu.to)return
      console.log("un>>>>>>",menu)
      this.$router.push({
        name:`${menu.to}`
      })
    },
    handleResize(){
      const currW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      if(currW<1000){
        this.lw = '260px'
      }else{
        this.lw = '476px'
      }
    }
  },
  beforeCreate(){

  },
  beforeMount() {
    let rname = this.$route.name
    console.log("Before Updata",rname)
    this.activeName = rname ||'help.issue'
  },
  mounted() {
    let rname = this.$route.name
    console.log("Before Updata",rname)
    this.activeName = rname ||'help.issue'
    this.handleResize()
  },
  watch: {
    $route(to, from) {
     // console.log('路由有变化',to,from)
      this.activeName = to.name
      // this.$forceUpdate()
    }
  },
  created() {
    window.addEventListener('resize',this.handleResize)
  },
  destroyed() {
    window.removeEventListener('resize',this.handleResize)
  },
}
</script>
<style>
.bas-help--leftnav {
  font-size: 1.25rem;
  margin-right: 1.5rem;
  text-align: center;
  background:rgba(245,246,246,1);
  border:1px solid rgba(245,246,246,1);
}

.bas-help-navlogo {
  padding: 1rem auto;
  border-bottom:1px solid rgba(235,237,237,1);
}

.bas-help-navlogo>img {
  margin: 1rem auto;
  width: 60px;
  height: 52px;
}
.bas-el-menu-bg {
  background:rgba(245,246,246,1);
  border: 1px solid rgba(245,246,246,1);
}
</style>
