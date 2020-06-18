
import { mergeGanacheAddress } from "./addrutils.js";
import ContractNames from "./name-enums";

/**
 * l-r:0x948aaD089241c7D8E04F030b071ABa3DC49c30e3
 * s-r:
 */
export default {
  BasOANNAddresses: mergeGanacheAddress(
    ContractNames.BasOANN
  ),
  BasOANNABI: BasOANNJson
};
