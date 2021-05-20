<template>
  <div>
    <div class="container pt-3 pb-3">
      <div class="app-exporer-zh-cn">
        <div class="app-explorer--left">
          <div class="inner-center">
            <h1 class="text-left mb-4">BAS Explorer</h1>
            <div class="dropdown abs-btn-group" role="group">
              <button
                type="button"
                class="bas-btn-group--left"
                @click="DownloadExplorerHanle"
              >
                {{ osText + os }}
              </button>
              <button
                id="bas-btn-group--right"
                @click="clickMenu"
                type="button"
                class="dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></button>
              <div
                class="triangle"
                :style="{ display: menuVisible ? '' : 'none' }"
              ></div>
              <div
                class="dropdown-menu bas-btn-group--menu"
                :class="menuVisible ? 'show' : ''"
                aria-labelledby="bas-btn-group--right"
              >
                <a class="dropdown-item" href="#" @click="clickMac">Mac</a>
                <a class="dropdown-item" href="#" @click="clickWin">Windows</a>
              </div>
            </div>
            <div class="bas-explorer-content">
              <p>
                {{ $t(this.aboutExplorer) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="bas-type-title">
        <p>APP</p>
      </div>
      <div class="row-detail justify-content-start">
        <div
          v-for="item in apps"
          :key="item.hash"
          class="col-xl-4 col-md-6 col-12 pt-3"
        >
          <div class="bas-app-detail">
            <div class="bas-app-detail--left pt-1">
              <img :src="item.icon" />
            </div>
            <div class="bas-app-detail--center">
              <div class="bas-inner-title">
                <p>{{ item.title }}</p>
              </div>
              <div class="bas-inner-intro">
                <p>{{ $t(item.intro) }}</p>
              </div>
              <div class="bas-inner-lable">
                <div
                  v-for="min in item.labels"
                  :key="min.hash"
                  class="bas-inner-lable--min"
                >
                  {{ min }}
                </div>
              </div>
            </div>
            <div class="bas-app-detail--right">
              <div class="bas-btn-get" @click="gotoAppDetail(item)">Get</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Line Two -->
      <div class="row-detail justify-content-start">
        <div
          v-for="item in line2Apps"
          :key="item.hash"
          class="col-xl-4 col-md-6 col-12 pt-3"
        >
          <div class="bas-app-detail">
            <div class="bas-app-detail--left pt-1">
              <img :src="item.icon" />
            </div>
            <div class="bas-app-detail--center">
              <div class="bas-inner-title">
                <p>{{ item.title }}</p>
              </div>
              <div class="bas-inner-intro">
                <p>{{ $t(item.intro) }}</p>
              </div>
              <div class="bas-inner-lable">
                <div
                  v-for="min in item.labels"
                  :key="min.hash"
                  class="bas-inner-lable--min"
                >
                  {{ min }}
                </div>
              </div>
            </div>
            <div class="bas-app-detail--right">
              <div class="bas-btn-get" @click="gotoAppDetail(item)">Get</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bas-type-title">
        <p>{{ $t("l.BowserExtension") }}</p>
      </div>
      <div class="row-detail justify-content-start">
        <div
          v-for="item in browsers"
          :key="item.hash"
          class="col-xl-4 col-md-6 col-12 pt-3"
        >
          <div class="bas-app-detail">
            <div class="bas-app-detail--left pt-1">
              <img :src="item.icon" />
            </div>
            <div class="bas-app-detail--center">
              <div class="bas-inner-title">
                <p>{{ item.title }}</p>
              </div>
              <div class="bas-inner-intro">
                <p>{{ $t(item.intro) }}</p>
              </div>
              <div class="bas-inner-lable">
                <div
                  v-for="min in item.labels"
                  :key="min.hash"
                  class="bas-inner-lable--min"
                >
                  {{ min }}
                </div>
              </div>
            </div>
            <div class="bas-app-detail--right">
              <div class="bas-btn-get" @click="toDetail(item.id)">Get</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.row-detail {
  display: flex;
}
.text-left {
  position: absolute;
  top: 128px;
}
.triangle {
  width: 0;
  height: 0;
  top: 0px;
  left: 308px;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid white;
  box-sizing: border-box;
  position: relative;
}
.dropdown {
  position: absolute;
  top: 195px;
}
.dropdown-item:focus {
  background-color: rgba(0, 202, 155, 1);
}
.dropdown-item:hover {
  background-color: rgba(0, 202, 155, 0.5);
}
.dropdown-menu {
  left: 259px;
  top: -2px;
  min-width: 7rem;
  width: 115px;
  border-top: transparent;
  position: relative;
}
.dropdown-toggle::after {
  color: white;
  border-bottom: 0;
  border-top: 0.3em solid;
  border-right: 0.2em solid transparent;
  border-left: 0.2em solid transparent;
}
.abs-btn-group > .bas-btn-group--left {
  width: 306px;
  height: 48px;
  color: #fff;
  background: rgba(0, 202, 155, 1);
  padding: auto 0.25rem;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-size: 20px;
  border: 0px;
}
.abs-btn-group > #bas-btn-group--right {
  width: 18px;
  height: 48px;
  background: rgba(0, 171, 131, 1);
  margin-left: -4px;
  margin-top: -19px;
  border: 0px;
  padding-top: 5px;
}
.bas-btn-get {
  /* width:64px; */
  height: 32px;
  background: rgba(245, 246, 246, 1);
  border-radius: 17px;
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 202, 155, 1);
  line-height: 30px;
  letter-spacing: 1px;
  border: 0px;
  padding: 0px;
  cursor: pointer;
  transform: scale(1, 1);
  -ms-transform: scale(1, 1); /* IE 9 */
  -webkit-transform: scale(1, 1); /* Safari and Chrome */
}
.bas-inner-intro > p {
  margin-bottom: 0rem !important;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(91, 92, 117, 1);
  line-height: 22px;
  letter-spacing: 1px;
}
.bas-inner-intro {
  width: 100%;
  height: 58px;
  padding-top: 8px;
}
.bas-inner-title {
  width: 100%;
  height: 30px;
  padding-top: 6px;
}
.bas-inner-title > p {
  font-size: 20px;
  line-height: 1.4;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(4, 6, 46, 1);
  line-height: 30px;
  letter-spacing: 0.26px;
}
.bas-inner-lable--min {
  width: auto;
  height: 23px;
  padding: 2px;
  text-align: center;
  font-weight: 400;
  border-radius: 14px;
  line-height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, Ping;
  color: rgba(159, 160, 175, 1);
  background: rgba(238, 240, 240, 1);
  margin-right: 5px;
  padding: 3px;
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 1px;
}
.bas-inner-lable {
  width: 100%;
  height: 25px;
  display: flex;
}
.bas-app-detail--left {
  margin: 3% 0 3% 5%;
}
.bas-app-detail--left > img {
  width: 100px;
  /* height: 118px; */
}
.bas-app-detail--center {
  width: 50%;
  /* height: 118px; */
  margin-left: 2.5%;
  margin-top: 2%;
}
.bas-app-detail--right {
  width: 16%;
  /* width: 75px; */
  /* height: 118px; */
  margin-top: 3%;
  margin-right: 3%;
  text-align: center;
}
.bas-type-title {
  margin-top: 2rem;
  margin-bottom: 1rem;
}
.bas-type-title > p {
  font-size: 1.8rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(4, 6, 46, 1);
  line-height: 50px;
  letter-spacing: 2px;
}
.row {
  align-items: center;
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid rgba(235, 240, 240, 1);
}
.bas-app-detail {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  justify-content: space-between;
  display: flex;
}
.bas-app-detail > p {
  text-align: right;
}
.app-exporer-zh-cn,
.app-exporer-en {
  height: 420px;
  width: 100%;
  background-size: cover;
  background-position: 50%;
}
.app-exporer-zh-cn {
  background-image: url("./assets/app_explorer_bg_cn.png");
}
.app-exporer-en {
  background-image: url("./assets/app_explorer_bg_en.png");
}
.app-explorer--left {
  top: 0;
  left: 20px;
  width: 50%;
  height: 100%;
  z-index: 999;
  display: inline-flex;
  direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.bas-explorer-download {
  width: 324px;
  height: 48px;
  color: #fff;
  margin: 1rem auto;
  background: rgba(0, 202, 155, 1);
  padding: auto 0.25rem;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  font-size: 20px;
}

.bas-explorer-select {
  width: 80px;
  background: rgba(0, 202, 155, 1);
  align-items: center;
}
.bas-explorer-select .el-input__inner {
  background: rgba(0, 202, 155, 1);
  color: #fff;
  border: 0px;
}

.inner-center {
  direction: column;
  width: 60%;
  color: #fff;
}
.bas-explorer-content > p {
  position: absolute;
  left: 0;
}

.bas-explorer-content {
  width: 22%;
  justify-self: start;
  display: inline-flex;
  direction: column;
  align-items: stretch;
  margin-top: 20px;
  position: absolute;
  top: 240px;
}
</style>
<script>
import {
  getDownloadAppsPath,
  MacBrowserApp,
  ExtChromeOffline,
} from "@/bizlib/apps";

const products = [
  {
    icon: "/static/icons/bas_bmail.png",
    title: "BMail",
    name: "bmail",
    intro: "p.AppStoreBMailIntro",
    labels: ["ios", "android", "other"],
    type: "app",
    id: 1,
    sort: 1,
  },
  {
    icon: "/static/icons/bas_bp.png",
    title: "BPassword",
    name: "bpassword",
    intro: "Everything Encrypted Decentralized Storage",
    labels: ["ios", "android", "chrome", "firefox"],
    type: "app",
    id: 5,
    sort: 2,
  },
  {
    icon: "/static/icons/bas-mail-server.png",
    title: "BMail server",
    name: "bmail_svr",
    hidden: true,
    intro: "p.AppStoreBMailServerIntro",
    labels: ["mac", "linux", "windows"],
    type: "app",
    id: 2,
    sort: 3,
  },
  {
    icon: "/static/icons/app_eid_logo.png",
    title: "易ID",
    name: "eid",
    hidden: false,
    intro: "",
    labels: ["ios", "android", "miniprogram"],
    type: "app",
    id: 6,
    sort: 4,
  },

  {
    icon: "/static/icons/bas-browser.png",
    title: "BAS Extension",
    intro: "p.AppStoreExtensionIntro",
    labels: ["chrome", "firefox"],
    type: "browser",
    id: 3,
    sort: 1,
  },
  {
    icon: "/static/icons/meta.png",
    title: "MetaMask",
    intro: "p.AppStoreMetaMaskIntro",
    labels: ["chrome", "firefox"],
    type: "browser",
    id: 4,
    sort: 2,
  },
];

const line2Apps = [
  {
    icon: "/static/icons/nj_logo.png",
    title: "NinJa",
    name: "ninja",
    hidden: false,
    intro: "",
    labels: ["ios", "android"],
    type: "app",
    id: 6,
    sort: 5,
  },
];

export default {
  name: "AppStoreIndex",

  data() {
    return {
      menuVisible: false,
      os: "mac",
      osText: "Get BAS Explorer For ",
      aboutExplorer: "p.ProductsExplorerAboutContents",
      osTypes: [
        {
          text: "MAC",
          i18n: "GetExplorer4Mac",
          os: "mac",
        },
        {
          text: "Windows",
          i18n: "GetExplorer4Win",
          os: "windows",
        },
      ],
      osApps: products,
      os2Apps: line2Apps,
    };
  },
  computed: {
    ...Vuex.mapState({
      isCN: (state) => state.lang === "zh-CN",
    }),
    apps: function () {
      return this.osApps
        .filter((item) => item.type === "app" && !item.hidden)
        .sort((a, b) => {
          if (!b.sort || !b.sort) return 1;
          return a.sort >= b.sort ? 1 : -1;
        });
    },
    line2Apps: function () {
      return this.os2Apps
        .filter((item) => item.type === "app" && !item.hidden)
        .sort((a, b) => {
          if (!b.sort || !b.sort) return 1;
          return a.sort >= b.sort ? 1 : -1;
        });
    },
    browsers: function () {
      return this.osApps
        .filter((item) => item.type === "browser" && !item.hidden)
        .sort((a, b) => {
          if (!b.sort || !b.sort) return 1;
          return a.sort >= b.sort ? 1 : -1;
        });
    },
  },
  methods: {
    clickMenu() {
      this.menuVisible = !this.menuVisible;
    },
    clickMac() {
      this.os = "mac";
      this.menuVisible = false;
    },
    clickWin() {
      // this.os = 'windows'
      this.menuVisible = false;

      this.$message(this.$basTip.warn("coming soon..."));
      //alert("产品开发中")
    },
    DownloadExplorerHanle() {
      let fileType = this.os;
      let url = getDownloadAppsPath(MacBrowserApp);
      // console.log('>>>>>>',url)
      window.open(url);
    },
    toDetail(id) {
      if (id < 3) {
        // console.log('$$$$$$$$$', id)
        this.$router.push({ path: "/appstore/appdetail", query: { id: id } });
      } else if (id === 3) {
        this.$router.push({ path: "/appstore/extension", query: { id: id } });
      } else if (id === 4) {
        window.location.href =
          "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?utm_source=chrome-ntp-icon";
      }
    },
    gotoAppDetail(item) {
      const { name, id } = item || {};
      if (!!name) {
        this.$router.push({
          path: `/appstore/appdetail_${name}`,
          query: { id: id },
        });
      }
    },
  },
};
</script>
<style>
</style>
