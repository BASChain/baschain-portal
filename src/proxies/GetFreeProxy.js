import BaseProxy from './Proxy'
import wpaths from './api/wallet-paths'

const VALID_STATE = "freeCoinState"
const TOKEN_SVR_BASEPATH = '/reth'

class GetFreeProxy extends BaseProxy {
  constructor(parameters = {}) {
    super(TOKEN_SVR_BASEPATH, parameters);
  }

  getFreeEth(wallet) {
    const uri = `${this.endpoint}/${wpaths.GET_FREE_ETH}?account=${wallet}`;
    return this.getApi(uri);
  }
}

export default GetFreeProxy
