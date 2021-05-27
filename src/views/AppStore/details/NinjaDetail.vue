<template>
  <div class="container pt-3 pb-3">
    <div class="body-wrap agent-body-wrapper">
      <div class="container obil-wrapper">
        <div class="row align-items-center">
          <div class="bas-app-detail">
            <div class="row bas-app-header">
              <div class="bas-app-header--left">
                <img :src="iconUrl" />
              </div>
              <div class="bas-app-header--right">
                <div class="bas-head-top">
                  <div class="bas-head-top--left">
                    <h1>{{ appName }}</h1>
                    <div class="bas-min-p">
                      {{ $t(appIntro) }}
                    </div>
                  </div>
                  <div class="bas-head-top--right">
                    <div
                      v-if="mobile.show"
                      class="bas-download-button"
                      styble="background-position:bottom right;"
                    >
                      {{ mobile.preIntro }}
                      <div
                        v-if="mobile.buttons && mobile.buttons.length > 0"
                        v-for="butt in mobile.buttons"
                        :key="butt.hash"
                      >
                        <el-popover
                          placement="bottom"
                          width="150"
                          trigger="click"
                        >
                          <div class="bas-qr-con" v-if="Boolean(butt.url)">
                            <WalletQrCode
                              width="120"
                              id="ethbal"
                              tipPlacement="left"
                              :content="butt.url"
                            />
                          </div>
                          <div v-if="!Boolean(butt.url)">Coming soon.</div>
                          <button
                            slot="reference"
                            class="bas-download-button--item"
                          >
                            {{ butt.text }}
                          </button>
                        </el-popover>
                      </div>
                    </div>

                    <!-- desktop -->
                    <div v-if="desktop.show" class="bas-download-button--serve">
                      {{ desktop.preIntro }}
                      <button
                        v-for="butt in desktop.buttons"
                        :key="butt.hash"
                        class="bas-download-button--blue"
                        :class="
                          !butt.url ? 'bas-download-button--disabled' : ''
                        "
                        @click="openDownloadTab(butt.url, butt.text)"
                      >
                        {{ butt.text }}
                      </button>
                    </div>

                    <!-- extension -->
                    <div
                      v-if="extensions.show"
                      class="bas-download-button--serve"
                    >
                      {{ extensions.preIntro }}
                      <button
                        v-for="butt in extensions.buttons"
                        :key="butt.hash"
                        class="bas-download-button--blue"
                        :class="
                          !butt.url ? 'bas-download-button--disabled' : ''
                        "
                        @click="openDownloadTab(butt.url, butt.text)"
                      >
                        {{ butt.text }}
                      </button>
                    </div>
                  </div>
                </div>
                <div class="bas-head-line"></div>

                <div
                  v-for="item in feats"
                  :key="item.hash"
                  class="bas-head-fun"
                >
                  {{ $t(item.title) }}
                  <div
                    v-for="min in item.labels"
                    :key="min.hash"
                    :class="item.styleType === 'done' ? 'bas-done' : ''"
                  >
                    <span
                      class="feat-label"
                      style="margin-left: 0.5rem; font-size: 0.95rem"
                    >
                      {{ $t(min) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row bas-app-img">
              <img v-for="img in imgUrls" :key="img.hash" :src="img" />
            </div>
            <div
              v-for="appintro in localeIntros"
              :key="appintro.hash"
              class="row bas-app-intro"
            >
              <div class="section-intro">
                <h1 v-if="Boolean(appintro.introTitle)">
                  {{ appintro.introTitle }}
                </h1>
              </div>

              <p>{{ appintro.introInfo }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDownloadAppsPath,
  MacBrowserApp,
  ExtChromeOffline,
} from "@/bizlib/apps";
import WalletQrCode from "@/components/WalletQrCode.vue";

const imgUrls = [
  "/static/img/appstore/ninja/addressBook.png",
  "/static/img/appstore/ninja/nj_User.png",
  "/static/img/appstore/ninja/nj-home.png",
  "/static/img/appstore/ninja/user-_ID.png",
];

const intros = {
  en: null,
  "zh-CN": [
    {
      introTitle: "",
      introInfo: "",
    },
    {
      introTitle: "",
      introInfo: "",
    },
  ],
};

const mobileApps = {
  preIntro: "download NinJa for",
  show: true,
  buttons: [
    {
      id: "ios",
      text: "Iphone",
      url: "https://testflight.apple.com/join/2EccEH6p",
    },
    {
      id: "android",
      text: "Android",
      url: "http://d.6boat.com/9ap5",
    },
  ],
};

const extensions = {
  preIntro: "Browser Extension for",
  show: false,
  buttons: [
    {
      id: "chromecrx",
      text: "Chrome",
      url:
        "https://chrome.google.com/webstore/detail/bpassword/bacldcokcfmemiljlckpeokehiloamcj",
    },
    {
      id: "firefox",
      text: "Firefox",
      url: "https://addons.mozilla.org/zh-CN/firefox/addon/bpassword/",
    },
    {
      id: "edge",
      text: "Edge",
      url:
        "https://chrome.google.com/webstore/detail/bpassword/bacldcokcfmemiljlckpeokehiloamcj",
    },
  ],
};

const desktopApps = {
  preIntro: "BPassword Miner for",
  show: false,
  buttons: [
    {
      id: "macOs",
      text: "Mac",
      url: "https://github.com/BASChain",
    },
    {
      id: "window",
      text: "Windows",
      url: "",
    },
    {
      id: "linux",
      text: "Linux",
      url: "https://github.com/BASChain",
    },
  ],
};

export default {
  name: "NinJaDetail",
  components: {
    WalletQrCode,
  },
  data() {
    return {
      appid: 1,
      appName: "NinJa",
      appIntro: "An encrypted chat client based on blockchain",
      iconUrl: "/static/icons/nj_logo.png",
      intros: intros,
      imgUrls,
      mobile: mobileApps,
      extensions: extensions,
      desktop: desktopApps,
      feats: [
        {
          title: "p.AppDetailDownTitle",
          styleType: "done",
          labels: ["点对点加密聊天"],
        },
        {
          title: "p.AppDetailToDoTitle",
          styleType: "undo",
          labels: [],
        },
      ],
    };
  },
  computed: {
    ...Vuex.mapState(["lang"]),
    localeIntros() {
      let localeKey = this.lang;
      if (!!this.intros[localeKey]) return this.intros[localeKey];
      return this.intros["zh-CN"];
    },
  },
  methods: {
    openDownloadTab(url, name) {
      if (url) {
        window.open(url, name || "_blank");
      }
    },
  },
};
</script>
<style scoped>
.bas-qr-con {
  width: 140px;
  height: 140px;
}
.bas-done {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 202, 155, 1);
  line-height: 22px;
  letter-spacing: 1px;
}
.bas-head-fun {
  display: flex;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(91, 92, 117, 1);
  line-height: 22px;
  letter-spacing: 1px;
  padding-top: 12px;
  padding-left: 24px;
}
.bas-head-line {
  width: 85%;
  height: 1px;
  background: rgba(225, 229, 229, 1);
  margin-bottom: 3px;
  margin-left: 24px;
}
.bas-download-button--serve {
  color: rgba(216, 216, 216, 1);
}
.bas-download-button {
  color: rgba(0, 202, 155, 1);
}
.bas-download-button--serve,
.bas-download-button {
  text-align: right;
  padding-top: 3px;
  width: 150%;
  display: flex;
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  line-height: 52px;
  letter-spacing: 1px;
  white-space: nowrap;
}

.bas-download-button--blue {
  background: rgba(42, 102, 236, 1);
}
.bas-download-button--item {
  background: rgba(0, 202, 155, 1);
}
.bas-download-button--gray,
.bas-download-button--blue,
.bas-download-button--item {
  width: auto;
  height: 38px;
  font-size: 18px;
  color: rgba(255, 255, 255, 1);
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  line-height: 25px;
  letter-spacing: 1px;
  margin: 6px;
  border: 0px;
  padding-top: 1px;
  border-radius: 21px;
  text-align: center;
  padding-right: 19px;
  padding-left: 19px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.bas-download-button--disabled {
  cursor: not-allowed;
  background: rgba(91, 92, 117, 0.3);
}
.bas-min-p {
  margin: 0px 0px 0px 24px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(91, 92, 117, 1);
  line-height: 22px;
  letter-spacing: 1px;
}
/* .bas-head-top--left > .bas-min-p {
    width:39px;
    height:22px;
    font-size:16px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(91,92,117,1);
    line-height:22px;
    letter-spacing:1px;
    padding-top: 30px;
    padding-left: 24px;
  } */
.bas-head-top--left > h1 {
  /* width:70px; */
  height: 30px;
  font-size: 22px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(4, 6, 46, 1);
  line-height: 30px;
  letter-spacing: 1px;
  margin-top: 45px;
  padding-left: 24px;
}
.bas-head-top--left {
  width: 42%;
  height: 144px;
  /* background: lightyellow; */
}
.bas-head-top--right {
  width: 50%;
  height: 144px;
  padding-top: 35px;
  /* background: mediumpurple; */
  position: relative;
}
.bas-head-top {
  width: 100%;
  height: 144px;
  display: flex;
}
.bas-app-header--right {
  width: 88%;
}
.bas-app-header--left {
  width: 12%;
}
.bas-app-header--left > img {
  margin: 0 auto;
  width: 100%;
  padding-top: 65px;
}
.bas-app-header {
  width: 100%;
  height: 248px;
  display: flex;
}
.bas-app-img {
  width: 110%;
  height: auto;
  display: flex;
  margin-bottom: 43px;
}
.bas-app-img > img {
  margin-right: 26px;
  width: 226px;
  /* height: 402px; */
}
.bas-app-intro > p {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(4, 6, 46, 1);
  line-height: 25px;
  letter-spacing: 1px;
}
.bas-app-intro > h1,
.section-intro h1 {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(4, 6, 46, 1);
  line-height: 25px;
  letter-spacing: 1px;
  margin-bottom: 0px;
}
.bas-app-intro {
  width: 100%;
  margin-bottom: 24px;
}
.bas-app-detail {
  width: 66%;
  height: 940px;
  height: auto;
  margin: 0 auto;
}
.agent-body-wrapper {
  position: relative;
  padding: 100px auto auto auto;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(245, 246, 246, 1);
  width: 100%;
}
.obil-wrapper {
  position: relative;
  background: rgba(255, 255, 255, 1);
  min-height: 940px;
}
.align-items-center {
  min-height: 940px;
  margin-bottom: 17px;
}
.row {
  display: -ms-flexbox;
  display: -webkit-box;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.body-wrap {
  min-height: 940px;
}

div.section-intro {
  flex: 1 1 100%;
}
</style>
