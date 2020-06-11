/**
 * LOCAL_CID : dev.env.js define
 * @param {*} contractName
 * @param {*} networks
 */
import { ContractAddresses } from './contracts/addresses'
import GanacheJson from './contracts/ganache.json'

export function assembleAddresses(contractName, networks) {
  const localChainId = process.env.LOCAL_CID || 1337;

  let addresses = ContractAddresses[contractName] ||{};

  if (networks && networks[localChainId]) {
    addresses[localChainId] = networks[localChainId].address || "";
  } else {
    addresses[localChainId] = "";
  }

  return Object.assign({}, addresses);
}
/**
 * merge 1337 to ropsten
 * @param {*} contractName
 */
export function mergeGanacheAddress(contractName) {
  let addresses = ContractAddresses[contractName] || {};
  const gaddr = GanacheJson[contractName] ||{}

  return Object.assign({}, gaddr, addresses)
}


export default {
  assembleAddresses,
  mergeGanacheAddress,
};
