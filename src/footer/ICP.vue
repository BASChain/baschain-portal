<template>
  <div v-if="shhowICP" class="bas-icp">
    <a
      href="https://beian.miit.gov.cn/#/Integrated/recordQuery"
      target="_blank"
    >
      {{ icp }}
    </a>
  </div>
</template>

<script>
export default {
  name: "ICP",
  components: {},
  data() {
    return {
      icp: "京ICP备2021014697号",
    };
  },
  computed: {
    shhowICP() {
      let host = window.location.hostname;
      return host === "baschain.cc" || host === "www.baschain.cc";
    },
  },
  methods: {},
};
</script>
<style scoped>
.bas-icp {
}
.bas-icp a {
  font-size: 14px;
  color: rgba(4, 6, 46, 1);
  cursor: text;
}

.bas-icp a:hover {
  text-decoration-line: none;
}
</style>
