
import { mergeGanacheAddress } from "./addrutils.js";
import ContractNames from "./name-enums";

/**
 * l-r:0x98c6f145B8fE9e77e3bBeA47165c3c39beeb6FE6
 * s-r:0x7c31C4Ed7e30082B913ece060FF12DE77DE7d260
 */
export default {
  BasMarketAddresses: mergeGanacheAddress(
    ContractNames.BasMarket
  ),
  BasMarketABI: BasMarketJson
};
