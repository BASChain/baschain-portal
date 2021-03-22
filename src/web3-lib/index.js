import ApiErrors from "./api-errors.js";
import Infura from "./infura";
import networks from "./networks";
import abimanager from "./abi-manager";
import utils from "./utils";
import BasWebAPI from "./apis";
import detectEthereumProvider from "@metamask/detect-provider";

/**
 * @deprecated
 * call this need after thereum.enable().
 * get window web3
 */
export function winWeb3() {
  if (!window.ethereum || !window.web3) throw ApiErrors.NO_METAMASK;
  // window.web3 = new Web3(window.ethereum.currentProvider);
  return window.web3;
}

export async function winWeb3Async() {
  if (!window.ethereum) throw ApiErrors.NO_METAMASK;
  const provider = await detectEthereumProvider();
  const web3js = new Web3(provider);
  return web3js;
}

/**
 * call this method,need check metamask injected
 */
export async function enableMetaMask() {
  try {
    const ethereum = window.ethereum;

    const nProvider = await detectEthereumProvider();

    const others = [];
    if (window.tron) {
      others.push("Tron");
    }

    if (others.length > 0) {
      const substr = others.join(",");
      const errMsg = `你安装了多个钱包插件[${substr}],请禁用其他钱包插件`;
      throw { code: 79527, message: errMsg };
    }

    let accounts = await ethereum.request({ method: "eth_requestAccounts" });
    if (!accounts.length) throw ApiErrors.NO_ACCOUNT;

    const wallet = accounts[0];
    const web3js = winWeb3();
    const chainId = await web3js.eth.getChainId();

    console.log(">>>>>>", chainId, wallet);
    return {
      chainId,
      wallet
    };
  } catch (ex) {
    console.log("MetaMask Enable Fail:", ex);
    if (ex.code === ApiErrors.USER_REJECTED_REQUEST) {
      throw ApiErrors.USER_REJECTED_REQUEST;
    } else if (ex.code === ApiErrors.RPC_TIMEOUT) {
      throw ApiErrors.RPC_TIMEOUT;
    } else if (ex === ApiErrors.NO_ACCOUNT) {
      throw ApiErrors.NO_ACCOUNT;
    } else {
      throw ex;
    }
  }
}

export async function loginMetaMask() {}

/**
 * Temp sultion
 * when refresh page load before Matemask login
 */
export async function globalWebState() {
  const web3 = window.web3;
  if (!web3) return null;

  const chainId = await web3.eth.getChainId();
  const accounts = await web3.eth.getAccounts();

  const web3State = {
    chainId,
    wallet: accounts.length ? accounts[0] : ""
  };

  return web3State;
}

export default {
  winWeb3,
  Infura,
  networks,
  abimanager,
  utils,
  BasWebAPI
};
