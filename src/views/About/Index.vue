<template>
  <v-layout topbarTheme="white">
    <page-container class="fixed">
      <div slot="body">
        <div class="container">
          <div class="about-header">
            <h1 class="title">关于公司</h1>
          </div>
          <div class="about-info">
            <div class="info-box">
              <p>
                域世安（北京）科技有限公司成立于2020年，所属行业为科技推广和应用服务业，
                经营范围包含：技术开发、技术转让、技术咨询、技术推广、技术服务；信息系统集成服务；
                基础软件服务；应用软件服务；软件开发；软件咨询；运行维护服务；大数据服务；承办展览展示活动；影视策划；会议服务；
                自然科学研究与试验发展；工程和技术研究与试验发展；产品设计；企业策划；市场调查；
                销售计算机、软件及辅助设备、自行开发的产品、电子产品、文化用品；经营电信业务；互联网信息服务；从事互联网文化活动。
                （市场主体依法自主选择经营项目，开展经营活动；经营电信业务、互联网信息服务、从事互联网文化活动以及依法须经批准的项目，
                经相关部门批准后依批准的内容开展经营活动；不得从事国家和本市产业政策禁止和限制类项目的经营活动。）。
              </p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
      <foot-container slot="footer" />
    </page-container>
  </v-layout>
</template>

<script>
import VLayout from "@/layouts/Default.vue";
import PageContainer from "@/components/PageContainer.vue";
import FootContainer from "@/footer/FootContainer.vue";

export default {
  name: "AboutProfile",
  components: {
    VLayout,
    PageContainer,
    FootContainer,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
<style scoped>
.about-header {
  flex: 1 1 auto;
  padding: 58px 58px;
  text-align: center;
}

.about-info {
  /* border: 1px solid yellowgreen; */
  width: 100%;
  display: flex;
  direction: row;
  justify-content: center;
  align-items: center;
}

.about-info .info-box {
  flex: 0 0 65%;
}

.info-box p {
  text-indent: 2em;
  line-height: 1.5rem;
}
</style>
