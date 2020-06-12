<template scoped>
	<div class="container pt-3 pb-3">
		<div class="body-wrap agent-body-wrapper">
			<div class="container obil-wrapper">
				<div class="row align-items-center">
					<div class="bas-app-detail">
						<div class="row bas-app-header">
							<div class="bas-app-header--left">
								<img :src="apps[componentid].iconUrl">
							</div>
							<div class="bas-app-header--right">
								<div class="bas-head-top">
									<div class="bas-head-top--left">
										<h1>{{ apps[componentid].appName }}</h1>
										<div class="bas-min-p">
											<p>{{ apps[componentid].appIntro }}</p>
											<p>{{ apps[componentid].appIntro }}</p>
										</div>
									</div>
									<div class="bas-head-top--right">
										<div v-if="componentid!=2" class="bas-download-button" styble="background-position:bottom right;">
											{{ apps[componentid].info }}
											<div v-for="butt in apps[componentid].downloadButtons" :key="butt.hash">
												<el-popover
													placement="bottom"
													width="150"
													trigger="click">
													<div class="bas-qr-con">
														<WalletQrCode width="120" id="ethbal"
														tipPlacement="left"
														:content="butt.url" />
													</div>
													<button slot="reference" class="bas-download-button--item">
													{{butt.buttInfo}}
													</button>
												</el-popover>
												
											</div>
										</div>
										<div v-if="componentid!=0" class="bas-download-button--serve">
											{{ apps[componentid].serveInfo }}
											<button v-for="butt in apps[componentid].serveButts" :key="butt.hash" class="bas-download-button--blue">{{butt.buttInfo}}</button>
										</div>
									</div>
								</div>
								<div class="bas-head-line"></div>
								<div v-for="item in apps[componentid].details" :key="item.hash" class="bas-head-fun">
									{{ item.osTitle }}
									<div v-for="min in item.osLabels" :key="min.hash" :class="item.styleType==='done'?'bas-done':''">{{ min }}</div>
								</div>
							</div>
						</div>
						<div class="row bas-app-img">
							<img v-for="img in apps[componentid].imgUrls" :key="img.hash" :src="img">
						</div>
						<div v-for="appintro in apps[componentid].intros" :key="appintro.hash" class="row bas-app-intro">
							<h1>{{ appintro.introTitle }}</h1>
							<p>{{ appintro.introInfo }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style scoped>
.bas-qr-con {
	width: 140px;
	height: 140px;
}
.bas-done {
	font-size:16px;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	color:rgba(0,202,155,1);
	line-height:22px;
	letter-spacing:1px;
}
.bas-head-fun {
	display: flex;
	font-size:16px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(91,92,117,1);
	line-height:22px;
	letter-spacing:1px;
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
	color: rgba(216,216,216,1);
}
.bas-download-button {
	color:rgba(0,202,155,1);
}
.bas-download-button--serve,
.bas-download-button {
	text-align: right;
	padding-top: 3px;
	width: 150%;
	display: flex;
	font-size:18px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	line-height:52px;
	letter-spacing:1px;
	white-space:nowrap;
}

.bas-download-button--blue {
	background:rgba(42,102,236,1);
}
.bas-download-button--item {
	background:rgba(0,202,155,1);
}
.bas-download-button--gray,
.bas-download-button--blue,
.bas-download-button--item {
	width: auto;
	height:38px;
	font-size:18px;
	color:rgba(255,255,255,1);
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	line-height:25px;
	letter-spacing:1px;
	margin: 6px;
	border: 0px;
	padding-top: 1px;
	border-radius:21px;
	text-align: center;
	padding-right: 19px;
	padding-left: 19px;
	white-space:nowrap;
	text-overflow:ellipsis;
	overflow:hidden;
}
.bas-min-p > p {
	margin-bottom: 0px;
	font-size:16px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(91,92,117,1);
	line-height:22px;
	letter-spacing:1px;
}
.bas-head-top--left > .bas-min-p {
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
}
.bas-head-top--left > h1 {
	/* width:70px; */
	height:30px;
	font-size:22px;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	color:rgba(4,6,46,1);
	line-height:30px;
	letter-spacing:1px;
	padding-top: 45px;
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
	width: 100%;
	/* height: 402px; */
	display: flex;
	margin-bottom: 43px;
}
.bas-app-img > img {
	margin-right: 26px;
	width: 226px;
	height: 402px;
}
.bas-app-intro > p {
	font-size:16px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight: 400;
	color:rgba(4,6,46,1);
	line-height:25px;
	letter-spacing:1px;
}
.bas-app-intro > h1 {
	font-size:18px;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	color:rgba(4,6,46,1);
	line-height:25px;
	letter-spacing:1px;
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

import {getDownloadAppsPath,MacBrowserApp,ExtChromeOffline} from '@/bizlib/apps'
import WalletQrCode from '@/components/WalletQrCode.vue'
export default {
	name:"AppStoreDetail",
	components: {
		WalletQrCode
	},
	computed: {
		...Vuex.mapState({
		isCN:state => state.lang === 'zh-CN'
		})
	},
	data() {
		return {
			componentid: 0,
			components: {
				WalletQrCode
			},
			apps: [
				{
					appid: 0,
					appName: "BPassword",
					appIntro: "intro",
					iconUrl: "/static/icons/bas_bp.png",
					imgUrls: [
						'/static/img/appstore/Account.png',
						'/static/img/appstore/BP_Account.png',
						'/static/img/appstore/BP_home.png'
					],
					serveInfo: '',
					serveButts: [],
					info: 'download BPassword for ',
					downloadButtons: [
						{
							id: 'iphone',
							buttInfo: 'Iphone',
							url: 'https://baidu.com'
						},
						{
							id: 'android',
							buttInfo: 'Android',
							url: ''
						}
					],
					details: [
						{
							osTitle: "已开发的功能:",
							styleType: "done",
							osLabels:[
								'# 去中心化',
								'# 安全加密',
								'# 安全加密'
							]
						},
						{
							osTitle: "正在完善的功能:",
							styleType: "undo",
							osLabels:[
								'# 正在完善的功能',
								'# 正在完善的功能'
							]
						}
					],
					intros: [
						{
							introTitle: "Explore your creations in full screen.",
							introInfo: "Immerse yourself by using the vivid Retina displays of iPad or Mac. Simply tap the center divider, then drag to view your code or live project on the full screen. You can also customize built-in games like Battleship and Brick Breaker, then immerse yourself by letting them take up the whole screen."
						},
						{
							introTitle: "Explore your creations in full screen.",
							introInfo: "Immerse yourself by using the vivid Retina displays of iPad or Mac. Simply tap the center divider, then drag to view your code or live project on the full screen. You can also customize built-in games like Battleship and Brick Breaker, then immerse yourself by letting them take up the whole screen."
						}
					]
				},
				{
					appid: 1,
					appName: "BMail",
					appIntro: "intro",
					iconUrl: "/static/icons/bas_bmail.png",
					imgUrls: [
						'/static/img/appstore/Account.png',
						'/static/img/appstore/BP_Account.png',
						'/static/img/appstore/BP_home.png'
					],
					serveInfo: 'download BMail server for ',
					serveButts: [
						{
							id: 'mac',
							buttInfo: 'Mac'
						},
						{
							id: 'linux',
							buttInfo: 'Linux'
						},
						{
							id: 'windows',
							buttInfo: 'Windows'
						}
					],
					info: 'download BMail for ',
					downloadButtons: [
						{
							id: 'iphone',
							buttInfo: 'Iphone',
							url: ''
						},
						{
							id: 'android',
							buttInfo: 'Android',
							url: ''
						}
					],
					details: [
						{
							osTitle: "已开发的功能:",
							styleType: "done",
							osLabels:[
								'# 去中心化',
								'# 安全加密',
								'# 安全加密'
							]
						},
						{
							osTitle: "正在完善的功能:",
							styleType: "undo",
							osLabels:[
								'# 正在完善的功能',
								'# 正在完善的功能'
							]
						}
					],
					intros: [
						{
							introTitle: "Explore your creations in full screen.",
							introInfo: "Immerse yourself by using the vivid Retina displays of iPad or Mac. Simply tap the center divider, then drag to view your code or live project on the full screen. You can also customize built-in games like Battleship and Brick Breaker, then immerse yourself by letting them take up the whole screen."
						},
						{
							introTitle: "Explore your creations in full screen.",
							introInfo: "Immerse yourself by using the vivid Retina displays of iPad or Mac. Simply tap the center divider, then drag to view your code or live project on the full screen. You can also customize built-in games like Battleship and Brick Breaker, then immerse yourself by letting them take up the whole screen."
						}
					]
				},
				{
					appid: 2,
					appName: "BMail server",
					appIntro: "intro",
					iconUrl: "/static/icons/bas-mail-server.png",
					imgUrls: [],
					serveInfo: 'download BMail server for ',
					serveButts: [
						{
							id: 'mac',
							buttInfo: 'Mac'
						},
						{
							id: 'linux',
							buttInfo: 'Linux'
						},
						{
							id: 'windows',
							buttInfo: 'Windows'
						}
					],
					info: '',
					downloadButtons: [],
					details: [
						{
							osTitle: "已开发的功能:",
							styleType: "done",
							osLabels:[
								'# 去中心化',
								'# 安全加密',
								'# 安全加密'
							]
						},
						{
							osTitle: "正在完善的功能:",
							styleType: "undo",
							osLabels:[
								'# 正在完善的功能',
								'# 正在完善的功能'
							]
						}
					],
					intros: [
						{
							introTitle: "Explore your creations in full screen.",
							introInfo: "Immerse yourself by using the vivid Retina displays of iPad or Mac. Simply tap the center divider, then drag to view your code or live project on the full screen. You can also customize built-in games like Battleship and Brick Breaker, then immerse yourself by letting them take up the whole screen."
						},
						{
							introTitle: "Explore your creations in full screen.",
							introInfo: "Immerse yourself by using the vivid Retina displays of iPad or Mac. Simply tap the center divider, then drag to view your code or live project on the full screen. You can also customize built-in games like Battleship and Brick Breaker, then immerse yourself by letting them take up the whole screen."
						}
					]
				}
			],
		}
	},
	methods: {
		// DownloadExplorerHanle(){
    //   let fileType = this.os
    //   let url = getDownloadAppsPath(MacBrowserApp)
    //   window.open(url)
    // }
	},
	mounted: function() {
		this.componentid = this.$route.query.id
	}
}
</script>

<style>

</style>
