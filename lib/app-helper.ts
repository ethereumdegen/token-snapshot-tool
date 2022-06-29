 
 


const NODE_ENV = process.env.NODE_ENV

import web3utils from 'web3-utils'
import FileHelper from './file-helper'



const serverConfig = require('../serverconfig.json')
 
export default class AppHelper  {

  static getEnvironmentName() : string{
    let envName = NODE_ENV ? NODE_ENV : 'development'

    return envName
  }

  static getServerConfig(envName?:string) {

    if(!envName){
      envName = AppHelper.getEnvironmentName()
    }
     
    let currentConfig = serverConfig[envName]

    return currentConfig
  }
 


  static getChainId(){
    return AppHelper.getServerConfig().chainId
  }

  static getNetworkName(){
    switch (AppHelper.getChainId()){
      case 1 : return 'mainnet'
      case 4 : return 'rinkeby'
      default: return undefined
    }
  }

  static toChecksumAddress(address: string) {
    return web3utils.toChecksumAddress(address)
  }

  static randomHexString(size:number){
    return web3utils.randomHex(size)
  }
 
}