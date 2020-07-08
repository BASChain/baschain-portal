<template>
  <div>
    <el-input
      @keyup.enter.native="queryDomains"
      class="market-search--input"
      placeholder="Please enter a domain name... "
      @input="InputChange"
      v-model="inputInfo">
      <el-button slot="append" icon="el-icon-search"
        @click="queryDomains"
        class="basel-search-append--green" >
        Search
      </el-button>
    </el-input>
    <div v-if="this.searched">hhh</div>
  </div>
</template>
<style scoped>
.basel-search-append--green {
  width: 226px;
}
</style>
<script>
import {queryMarketDomain} from '@/web3-lib/apis/view-api'
export default {
  name: 'SearchInput',
  data() {
    return {
      inputInfo: '',
      searched: false
    }
  },
  methods: {
    InputChange() {
      this.searched = false;
    },
    async queryDomains() {
      console.log('query>>>>>', this.inputInfo)
      let domainInfo = await queryMarketDomain(this.inputInfo)
      console.log('queryRes>>>>>', domainInfo.domaintext===undefined)
      // this.$router.push({
      //   path: "search"
      // })
      this.searched = true
      // this.$emit('issearched', this.searched)
    }
  }
}
</script>
