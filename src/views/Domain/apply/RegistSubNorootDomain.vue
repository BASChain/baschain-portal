<template>
  <div class="container">
    <div class="row justify-content-center pt-3">
      <div class="col-md-7 col-sm-10 bas-card" v-loading="ctrl.loading">
        <div class="bas-card__header">
          <div class="bas-card__header-title">
            {{$t('p.DomainRegistSubTitle')}}
          </div>
        </div>
        <div class="bas-gray-split" />

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"DomainRegistSubNotRoot",
  components:{},
  computed: {

  },
  data() {
    return {
      ctrl:{
        loading:false
      }
    }
  },
  methods: {

  },
  mounted() {

  },
}
</script>
<style>

</style>
