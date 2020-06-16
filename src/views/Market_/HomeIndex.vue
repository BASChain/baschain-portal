<template>
  <div>
    <div class="market-search-warp">
      <div class="container">
        <div class="row justify-content-center align-items-center">
          <div class="col-md-8 market-search--outer">
            <SearchInput />
            <!-- <el-input class="market-search--input"
              @keyup.enter.native="gotoSearch"
              @input="validSerach"
              placeholder="Please enter a domain name... "
              v-model="searchText">
              <el-button slot="append" icon="el-icon-search"
                @click="gotoSearch"
                class="basel-search-append--green" >
                Search
              </el-button>
            </el-input> -->
          </div>
          <OnSaleMain />
          <HasSoldMain />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from '@/views/Market_/components/SearchInput.vue'
import OnSaleMain from './home/OnSaleMain.vue'
import HasSoldMain from './home/HasSoldMain.vue'
// import { CheckSearchMarketIllegal } from '@/utils/Validator'
export default {
  name:"MarketHomeIndex",
  components:{
    HasSoldMain,
    OnSaleMain,
    SearchInput
  },
  computed: {

  },
  data() {
    return {
      searchText:''
    }
  },
  methods: {
    // gotoSearch(){
    //   let searchText = this.searchText
    //   try{
    //     CheckSearchMarketIllegal(searchText)
    //   }catch(ex){
    //     this.$message(this.$basTip.error(this.$t('p.MarketSearchValidDomainTip')))
    //     return
    //   }
    //   if(searchText && searchText.trim().length){
    //     const text = searchText.trim()
    //     this.$router.push({
    //       name:'market.search',
    //       params:{
    //         searchText:text
    //       }
    //     })
    //   }
    // },
    // validSerach(value){

    // }
  },
}
</script>
<style>

</style>
