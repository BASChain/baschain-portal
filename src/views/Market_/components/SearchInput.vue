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
  </div>
</template>
<style scoped>
.basel-search-append--green {
  width: 226px;
}
</style>
<script>
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
      console.log('Input>>>>>')
      this.searched = false;
      this.$emit('issearched', this.searched)
    },
    queryDomains() {
      console.log('query>>>>>', this.inputInfo)
      this.$router.push({
        path: "search"
      })
      this.searched = true
      this.$emit('issearched', this.searched)
    }
  }
}
</script>
