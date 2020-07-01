<template>
  <div class="container pt-3 pb-3">
		<div class="body-wrap agent-body-wrapper">
			<div class="container obil-wrapper">
				<div class="row align-items-center">
					<div class="bas-app-detail">
						<div class="bas-server-hint">
							<img src="/static/img/appstore/chrome.png" alt="" class="img-fluid" @click="openChromeExtension">
							<img src="/static/img/appstore/firefox.png" alt="" class="img-fluid"  @click="openFirefoxExt">
							<div class="bas-hint-info">
								<p>
								  可访问Google play /firefox store 直接点击上方按钮安装即可
								</p>
							</div>
						</div>
						<div class="bas-server-title">
							<h1>{{$t('p.HelpPopQuest1InnerTitle')}}</h1>
							<p>如果你无法透过谷歌扩展商店安装，你可以选择手动下载压缩包方式来安装，这篇教程适用于 Chrome、FireFox。</p>
						</div>
    				<QuestionInstallOffline />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.bas-hint-info {
 margin-left: 8px;
 font-size:18px;
 font-family:PingFangSC-Regular,PingFang SC;
 font-weight:400;
 color:rgba(4,6,46,1);
 padding-top: 70px;
 line-height:25px;
}
.bas-server-hint > img {
 cursor: pointer;
 width: auto;
 height: auto;
 max-width: 100%;
 max-height: 100%;
 margin: 24px 0px 24px 24px;
}
.bas-server-hint {
 display: flex;
 height: auto;
}
.bas-server-title > p {
	height:25px;
	font-size:16px;
	font-family:PingFangSC-Light,PingFang SC;
	font-weight:300;
	color:rgba(66,68,98,1);
	line-height:25px;
}
.bas-server-title > h1 {
	font-size:30px;
	font-family:PingFangSC-Semibold,PingFang SC;
	font-weight:600;
	color:rgba(4,6,46,1);
	line-height:50px;
	margin-top: 32px;
}
.bas-server-hint {
	width: 100%;
	height:176px;
	background:rgba(245,246,246,1);
	border-radius:6px;
	margin-top: 25px;
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
	background: rgba(255,255,255,1);
	border: 1px solid rgba(245,246,246,1);
	width: 100%;
}
.obil-wrapper {
	position: relative;
	background: rgba(255,255,255,1);
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
</style>
<script>
import {
  ChromeExtensionStore,FirefoxExtensionStore,
  getOfflineExtFile,
  getDownloadAppsPath,MacBrowserApp,
  getExtfansUrl,
} from '@/bizlib/apps'

import QuestionInstallOffline from '@/views/Help/popquest/Quest1OfflineInstall.vue'
export default {
	components: {
		QuestionInstallOffline
	},
	computed: {
    ...Vuex.mapState({
      isCN:state => state.lang === 'zh-CN'
    })
  },
  methods: {
    openChromeExtension(){
      let url= ChromeExtensionStore
      window.open(url,'Chrowe Extension')
    },
    openFirefoxExt(){
      let url= FirefoxExtensionStore
      window.open(url,'Firfox Extension')
    },
  },
}
</script>
