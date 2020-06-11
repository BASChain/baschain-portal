<template>
  <div>
    <div class="text item">
      Recent Transactions Top 10
    </div>
    <div class="bas-pager-container">
      <row-card-item v-for="(item,idx) in latestList"
        :key="idx" :info="item" transAttr="update"
        showBtn="1"
      />
    </div>
    <div class="bas-pagination">
      <el-pagination
        layout="prev, pager, next"
        :total="300">
      </el-pagination>
    </div>
  </div>
</template>
<style>
.bas-pagination {
  text-align: center !important;
}

</style>
<script>
import RowCardItem from '@/components/RowCardItem.vue'

export default {
  name:"MarketLatestTransaction",
  data(){
    return {
      latestList:[]
    }
  },
  mounted(){

  },
  components:{
    RowCardItem,
  }
}
</script>

