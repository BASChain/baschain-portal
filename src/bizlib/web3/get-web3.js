//import Web3 from 'web3'

export const getWeb3 = new Promise((resolve,reject)=>{
  if(window.web3 === undefined){
    reject(new Error('Old web3 Metamask unfound in your browser'))
  }
  var web3js = window.web3;
  var web3 = new Web3(web3js.currentProvider)
  resolve({
    web3(){
      return web3
    }
  })
})


export default {
  getWeb3
}


