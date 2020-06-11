//import BasTokenJson from './contracts/BasToken.json'
import { mergeGanacheAddress } from "./addrutils.js";
import ContractNames from "./name-enums";

/**
 * lan: 0xca2140437D9748Af1DA883cADD5997C56A1ff19D
 * ropsten: 0xC51A675D2f18e9912E3bd67014F0892177A9318C
 */
const BasTokenABI = BasTokenJson

export default {
  BasTokenAddresses: mergeGanacheAddress(
    ContractNames.BasToken
  ),
  BasTokenABI
};
