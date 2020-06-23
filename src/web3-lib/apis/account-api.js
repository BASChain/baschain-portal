import { winWeb3 } from "../index";

import * as apiErrors from "../api-errors.js";
import { checkSupport } from "../networks";

import { basAccountInstance } from "./index";

/**
 *
 * @param {*} chainId
 * @param {*} wallet
 */
export async function getWithdrawable(chainId,wallet){
  if (!wallet) throw apiErrors.PARAM_ILLEGAL;
  const ret = {
    withdrawWei:0,
    withdrawBas:0
  }

  if (!checkSupport(chainId))return ret;

  const web3js = winWeb3();
  const account = basAccountInstance(web3js,chainId,{from:wallet})

  const wei = await account.methods.ledger(wallet).call()
  const basvol = web3js.utils.fromWei(wei,'ether')

  ret.withdrawWei = wei
  ret.withdrawBas = basvol

  return ret
}

export async function getWithdrawn(chainId,wallet){
  if (!checkSupport(chainId)) throw apiErrors.UNSUPPORT_NETWORK;
  const web3js = winWeb3();
  const account = basAccountInstance(web3js, chainId, { from: wallet });

  const events = await account.getPastEvents(
    "Withdraw",
    {
      filter: { drawer: wallet },
      fromBlock: 0,
      toBlock: "latest"
    },
    function(err) {
      console.log(err);
      if (err) throw err;
    }
  );

  //console.log(events);
  const Bn = web3js.utils.BN;
  return events.reduce((acc,cur) =>{
    return acc.add(new Bn(cur.returnValues.amount));
  },new Bn('0'))
}

/**
 *
 * @param {*} wei
 * @param {*} chainId
 * @param {*} wallet
 */
export function commitWithdrawTo(wei,chainId,wallet){
  if (!checkSupport(chainId)) throw apiErrors.UNSUPPORT_NETWORK;
  const web3js = winWeb3();
  const account = basAccountInstance(web3js, chainId, { from: wallet });
  return account.methods.withdrawTo(wei,wallet).send({from:wallet});
}

export default {
  getWithdrawable,
  commitWithdrawTo,
  getWithdrawn,
  commitWithdrawTo,
};
