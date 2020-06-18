import { mergeGanacheAddress } from "./addrutils.js";
import ContractNames from "./name-enums";

/**
 * l-r:0x720Da26432b6501AeD0020dA04ee67257928d9BD
 * s-r:0xfc9fecfbDB278FFd879ea1205a2e7503E1fd2bfC
 */
export default {
  BasMinerAddresses: mergeGanacheAddress(
    ContractNames.BasMiner
  ),
  BasMinerABI: BasMinerJson
};
