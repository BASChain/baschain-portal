# baschain-web

> BAS Chain Web Portal

> Block Recoreds History Technology Links Future

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9528
node ci/update_appinfo.js
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


## Version history

> 2.x

|  Version  |  Update Date  |  Comments  |
|  ----  |  ----  |  ----  |
|  v2.8.5  |  ----  |  优化钱包余额动态效果<br>  |
|  v2.8.4  |  2020-08-08  |  1.优化市场在售列表区块同步装太显示 <br> 2.增加邮箱域名列表数据条目显示,与其他页面展示形式保持一致<br> 3. fixed 市场列表刷新无效BUG <br> 部署在 https://fixed.baschain.org/home <br> |
|  v2.8.3  |  2020-08-07  |  1. 优化顶部菜单自适应( width< 992px[break-end-point])时,变为折叠,纵向展开方式<br> 2.优化ELement UI i18n 国际化组件 <br> 3.优化 BlockChain 网络变化 & 钱包地址变化时envent 处理,钱包列表刷新只有当前在展示时响应event,钱包余额所有状态时响应event <br> 4.修复邮箱弃用提示Bug   |
|  v2.8.2  |  2020-07-31  |  更新BAS Extension for chrome 1.0.3 <br> |
|  v2.8.0  |  2020-07-24 | 发布 fixed.baschain.org  | 1. MetaMask v8 升级 + web3js <br> 2.更换新合约,初始化数据,eth,bas<br>  |
|  v2.7.8  |  2020-08-08  |  1.优化市场在售列表区块同步装太显示 <br> 2.增加邮箱域名列表数据条目显示,与其他页面展示形式保持一致<br> 3. fixed 市场列表刷新无效BUG <br> 部署在 https://www.ppn.one/home <br> |
|  v2.7.7  |  2020-08-07  |1. 优化顶部菜单自适应( width< 992px[break-end-point])时,变为折叠,纵向展开方式<br> 2.优化ELement UI i18n 国际化组件 <br> 3.优化 BlockChain 网络变化 & 钱包地址变化时envent 处理,钱包列表刷新只有当前在展示时响应event,钱包余额所有状态时响应event <br> 4.修复邮箱弃用提示Bug |
|  v2.7.4  | 2020-7-22 | 更换新合约,初始化数据,eth,bas | 访问地址:https://www.ppn.one <br> https://fixed.baschain.org <br> github 代码为旧合约 |
|  v2.7.3  |  2020-7-21 |  域名资产优化(未开始)  | 更新Indexed 钱包账号域名,按钱包地址 + eth 网络区分存储 |
| v2.7.2 | 2020-7-17  | fixed bugs:<br> 1. 更新 MetaMask 处于不支持网络时提示 <br> 2. 优化域名不存在判断条件,去除expiration > 0 <br> 3.更新插件离线下载版本 <br> 4.更新市场查询结果显示优化#2 <br> 5.更新购买市场域名BAS余额不足提示 <br> 6.更新国际化语言日语支持(邮箱注册模块,市场模块) |
| v2.7.1 | 2020-7-14  | fixed bugs |
| v2.7.0 | 2020-7-13  | feature market |
| v2.6.6 | 2020-6-28  | fixed bug |
| v2.1.0 | 2020-06-03 | Optimize performance <br> 1. add prerender-spa-plugin <br> 2.used CDN js resources <br> 3.Turn on compression *.gz <br> 4.Optimize business code |
| v2.0.0 | 2020-04-27 | update new smart contract v3 |


> 1.x

|  Version  |  Update Date  |  Comments  |
|  ----  |  ----  |  ----  |
| v1.0.0  | 2020-04-16  | - Support Chinese, English, Japanese <br> 1. support apply domain <br>2. configure Domain name DNS data <br>3. Sell my domains ed. |
| v1.0.3 | 2020-4-23 | Complete recharge domains |

## Update
