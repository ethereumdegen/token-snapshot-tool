 
 


const NODE_ENV = process.env.NODE_ENV
 

const vibeConfig = require('../vibeconfig.json')
 
export default class VibeHelper  {

  static getEnvironmentName() : string{
    let envName = NODE_ENV ? NODE_ENV : 'development'

    return envName
  }

  static getVibeConfig(envName?:string) {

    if(!envName){
      envName = VibeHelper.getEnvironmentName()
    }
     
    let currentConfig = vibeConfig[envName]

    return currentConfig
  }
 

 
      
}