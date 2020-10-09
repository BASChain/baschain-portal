import BaseProxy from './Proxy'
import wpaths from './api/wallet-paths'
const ETH_SER = 'https://www.baschain.cn/reth'

const VALID_STATE = "freeCoinState"
const TOKEN_SVR_BASEPATH = '/reth'

class GetFreeProxy extends BaseProxy {
  constructor(parameters = {}) {
    super(TOKEN_SVR_BASEPATH, parameters);
  }

  /**
   * http://104.238.165.23:8082/GetFreeEth?account=0xc5114B4a2D38138f7755011dbB3D72f81819Ab58
   * @param {*} wallet
   */
  getFreeEth(wallet) {
    const uri = `${ETH_SER}/${wpaths.GET_FREE_ETH}?account=${wallet}`;
    return this.getApi(uri);
  }
}

export default GetFreeProxy
