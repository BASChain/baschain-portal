import { mergeGanacheAddress } from "./addrutils.js";
import ContractNames from "./name-enums";

/**
 *
 */
export default {
  BasMailAddresses: mergeGanacheAddress(
    ContractNames.BasMail
  ),
  BasMailABI: BasMailJson
};
