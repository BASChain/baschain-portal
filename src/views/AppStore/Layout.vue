<template>
  <v-layout>
    <page-container>
      <div slot="body" class="bas-gray-bg">
        <router-view />
      </div>
      <foot-container slot="footer"/>
    </page-container>
  </v-layout>
</template>

<script>
  import VLayout from '@/layouts/Default.vue'
  import PageContainer from '@/components/PageContainer.vue'
  import FootContainer from '@/footer/FootContainer.vue'

  export default {
    name:"AppStoreLayout",
    data() {
      return {}
    },
    components: {
      VLayout,
      PageContainer,
      FootContainer,
    },
  }
</script>
<style>

</style>
