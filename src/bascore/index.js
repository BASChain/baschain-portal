const info = require('./info.json')

export const DAppInfo = Object.assign({},info,{
  browserRequire:['chrome','firefox'],
  extensionRequire:['MetaMask']
})

export default {
  DAppInfo
}
