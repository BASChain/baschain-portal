//import ContractsJson from "./contracts";

import { mergeGanacheAddress } from "./addrutils.js";
import ContractNames from "./name-enums";

/**
 * l-r:0xEe2e88927dC75c7E25406456613Eac3Be24d4661
 * s-r:0x6b83970a7ae5a51A2CF6f94485dB0d537629736C
 */
//export const BasMailABI = ContractsJson.BasMail.abi;

export default {
  BasMailAddresses: mergeGanacheAddress(
    ContractNames.BasMail
  ),
  BasMailABI: BasMailJson
};
