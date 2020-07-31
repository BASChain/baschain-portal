/**
 * jidkphhcnfbacegfgniknpgedbppmeoc 1.0.1
 * bcoibbecpnakojfbbpilgmmmlgnfklea 1.0.3
 */
export const ChromeExtensionStore =
         "https://chrome.google.com/webstore/detail/bas/bcoibbecpnakojfbbpilgmmmlgnfklea?hl=zh-CN&authuser=1";
export const FirefoxExtensionStore = 'https://addons.mozilla.org/zh-CN/firefox/addon/bas/?src=search'
export const RelaDownloadBasePath = '/apps'
export const ExtFansBase ="https://www.extfans.com/search/extensions"

export const MacBrowserApp = 'Uranium.app.zip'
/**
 * prev: bas-1.0.1-chromium.zip
 */
export const ExtChromeOffline = 'bas-1.0.2-chromium.zip'
/**
 * prev
 * bas-1.0.2-fx.xpi
 * cur
 */
export const ExtFirefoxOffline = 'bas-1.0.3-fx.xpi'
export const RELA_DOWNLOAD_BASE="/prod";
export const APPS_BASE="apps";
export const EXTS_BASE="exts";

export function getExtensionStoreUrl(browser){
  return browser === 'chrome' ? ChromeExtensionStore : FirefoxExtensionStore
}

export function getDownloadAppsPath(subPath){
  return `${RELA_DOWNLOAD_BASE}/${APPS_BASE}/${subPath}`
}

/**
 *
 * @param {*} browser
 */
export function getOfflineExtFile(browser){
  return browser === 'chrome' ?
    `${RELA_DOWNLOAD_BASE}/${EXTS_BASE}/${ExtChromeOffline}` : `${RELA_DOWNLOAD_BASE}/${EXTS_BASE}/${ExtFirefoxOffline}`
}

/**
 *
 * @param {*} extname
 */
export function getExtfansUrl(extname) {
  if(!extname)extname = "BAS"
  return `${ExtFansBase}/${extname}`
}

export default {
  MacBrowserApp,
  ChromeExtensionStore,
  FirefoxExtensionStore,
  RelaDownloadBasePath,
  getExtensionStoreUrl,
  getDownloadAppsPath,
  getExtfansUrl,
}
