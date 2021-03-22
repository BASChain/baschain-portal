
const toWei = Web3.utils.toWei
/**
 * DApp State
 * typeDiction DNS data type diction
 * 2021-03-19 add state [multiShit]
 * 由于狗屎TRON 完全抄袭Metamask代码导致 @see https://github.com/MetaMask/metamask-extension/issues/10377
 */
export default {
  injected:false,
  multiShit:false,//https://github.com/MetaMask/metamask-extension/issues/10377
  chainId:null,
  wallet:null,
  ethwei:null,
  baswei:null,
  withdrawable:null,
  withdrawn:null,
  symbol: "BAS",
  decimals: 18,
  rareGas: toWei('2000','ether'),
  rootGas: toWei('200' ,'ether'),
  subGas: toWei('4', 'ether'),
  externalGas: toWei('100', 'ether'),
  mailSeviceGas: toWei('100', 'ether'),
  mailRegGas: toWei('2', 'ether'),
  maxRegYears: 5,
  domainYearItems:[
    { y: 5, total: 20 }, { y: 4, total: 16 }, { y: 3, total: 12 }, { y: 2, total: 8 }, { y: 1, total: 4 }
  ],
  maxMailRegYears:5,
  mailYearItems:[],
  maxRegDays: 157680000,
  typeDiction: [],
  maxDataLength: 512,
  maxPriceBas:10000000000,
  rootassets:[],
  mailassets:[],//{domaintext,hash}
};
