<template>
  <div class="localization-wrapper">
    <el-select v-model="lang" size="mini"
      @change="langChanged"
      class="bas-i18n-select-top">
      <el-option v-for="option in options"
        size="mini"
        :label="option.text"
        :value="option.id"
        :key="option.id">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "TopLocalization",
  computed: {
  },
  data() {
    return {
      lang:'',
      options:[
        {id:"zh-CN",text:"中文"},
        {id:"en",text:"English"},
        {id:"jp",text:"日本語"},
        // {id:"zh-TW",text:"繁體中文"},
      ],
    }
  },
  methods: {
    langChanged() {
      const selLang = this.lang
      if(this.$i18n.locale !== selLang) {
        this.$store.dispatch('changedLang',selLang)
        this.$i18n.locale = selLang
      }
    }
  },
  mounted() {
    let curLang = this.$store.getters['currentLang']
    this.$i18n.locale = curLang;
    this.lang = curLang
  },

}
</script>
<style>

</style>
