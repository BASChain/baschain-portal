 <template>

</template>
<style>

</style>
<script>
import  {navMenus}  from './js/nav-menu.js'
import TopAvatar from './TopAvatar.vue'
import TopMine from './TopMine'

import LogoHeaderBlack from '@/assets/icons/logo_header_blk.png'
import LogoHeaderColorful from '@/assets/icons/logo_header.png'

export default {
  name:"topbar",
  components:{
    TopAvatar,
  },
  data() {
    return {
      menuCollapsed:false,
      navMenus,
      lang:'',
      colorfulLogo:LogoHeaderColorful,
      blackLogo:LogoHeaderBlack,
      options:[
        {id:"zh-CN",text:"中文"},
        {id:"en",text:"English"},
        {id:"jp",text:"日本語"},
        // {id:"zh-TW",text:"繁體中文"},
      ],
      state:{
        activeColor:"#00ca9b"
      },
      currentRoute:''
    };
  },
  props:{
    isBlack:{
      type:[Boolean,String],
      required:true
    }
  },
  methods:{
    hasSubClick(name){
      console.log(name)
      this.$router.push({name})
    },
    toggleMenu () {
    },
    logout() {
      //alert('logout')
    },
    langChanged( lg ) {
      const i18nLang = this.$i18n.locale;
      if(i18nLang !== lg){
        this.$i18n.locale = lg;
        this.$store.commit('setLang',lg)
      }
    },
    pathActiveLast(to){
      let fullPaths = this.$route.fullpath.split('/')
      return fullPaths.length && fullPaths[fullPaths.length-1] === to
    },
    containPath(to){
      let fullPath = this.$route.fullpath

    },
    navRouter(item){
      console.log('menu',item)
      this.$router.push({name:item.name})
    },
    navSubRouter(item,it){
      console.log('submenu',item,it)
    }
  },
  computed: {
    ...Vuex.mapState({
      topnav:state=>state.topnav
    }),
    topMenus (){
      return this.navMenus.filter(m => !m.hidden)
    },
    navMenuColor(){
      return this.isBlack ? "#ffffff" : "#04062e"
    },
    topbarBgClass() {
      //console.log(this.isBlack)
      return this.isBlack ? 'header-warp-black' : 'header-warp-white'
    },
    topnavClass() {
      return this.isBlack ? 'top-menu-black' : 'top-menu'
    },
    currentRoutePath(){
      return this.$route.fullpath||''
    }
  },
  mounted() {
    let curLang = this.$store.getters['currentLang']
    this.$i18n.locale = curLang;
    this.lang = curLang
    this.currentRoute = this.$route.fullPath
  },
}
</script>
<style>

</style>

