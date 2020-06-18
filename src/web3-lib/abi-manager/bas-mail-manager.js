import { mergeGanacheAddress } from "./addrutils.js";
import ContractNames from "./name-enums";

/**
 * l-r:0xf7fC9d1e9c293dC0D8eCeF199f4e62BF1e755233
 * s-r:0xDa9d54E2a517AEe4339832bfE7a74d87513AeD9d
 */
export default {
  BasMailManagerAddresses: mergeGanacheAddress(
    ContractNames.BasMailManager
  ),
  BasMailManagerABI: BasMailManagerJson
};
