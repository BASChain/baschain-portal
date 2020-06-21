
import { LAST_CHAINID_KEY} from './mutation-types'

/**
 *
 */
const getters = {
  typeDicts: state => {
    return state.typeDiction;
  },
  ruleState: state => {
    const decimals = state.decimals;
    let cid = Cookies.get(LAST_CHAINID_KEY)

    return {
      chainId: state.chainId || cid,
      wallet: state.wallet,
      decimals,
      rareBas: Web3.utils.fromWei(state.rareGas, "ether"),
      rootBas: Web3.utils.fromWei(state.rootGas, "ether"),
      subBas: Web3.utils.fromWei(state.subGas, "ether"),
      externalBas: Web3.utils.fromWei(state.externalGas, "ether"),
      mailSeviceBas: Web3.utils.fromWei(state.mailSeviceGas, "ether"),
      mailRegBas: Web3.utils.fromWei(state.mailRegGas, "ether"),
      maxRegYears: state.maxRegYears,
      maxMailRegYears: state.maxMailRegYears,
      maxDataLength: state.maxDataLength,
      maxPriceBas: state.maxPriceBas,
      minSubBas: Web3.utils.fromWei(state.subGas, "ether")
    };
  },
  /**
   * login status
   */
  loginState:state => {
    //console.log(state.chainId)
    return state.injected && Boolean(state.chainId) && Boolean(state.wallet)
  },
  web3State:state => {
    let cid = Cookies.get(LAST_CHAINID_KEY)
    return {
      injected: state.injected,
      chainId:state.chainId||cid,
      wallet:state.wallet
    };
  },
};

export default getters;
