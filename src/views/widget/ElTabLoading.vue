<template>
  <div class="table-loading--wrapper">
    <loading-dot />
    <p>{{$t('g.SyncBlockDataTips')}}</p>
  </div>
</template>

<script>
import LoadingDot from '@/components/LoadingDot.vue'

export default {
  name: "ElTabLoading",
  components: {
    LoadingDot,
  },
  props: {
    loading: {
      default: false,
      type: Boolean,
      required: true
    },
    clazz: {
      type: String,
      default:''
    }
  }
}
</script>
<style>
.table-loading--wrapper {
  width: 100%;
  min-height: 2.25rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.table-loading--wrapper p {
  margin: 0px;
  margin-left: 1rem;
}
</style>
