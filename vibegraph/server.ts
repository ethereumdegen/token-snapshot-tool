

 
import ExtensibleMongoDB , {DatabaseExtension} from 'extensible-mongoose'

 

import {DegenAuthExtension} from 'degen-auth'

import VibeGraph from 'vibegraph'
import Web3 from 'web3'
 
  
//import OrderDBExtension from '../server/dbextensions/OrderDBExtensions'



import IndexerPayspec  from './indexers/IndexerPayspec' 
import VibeHelper from './lib/vibe-helper'
import FileHelper from '../lib/file-helper'
import AppHelper from '../lib/app-helper'
import IndexerEIP918 from './indexers/IndexerEIP918'

let EIP918ABI = FileHelper.readJSONFile('./vibegraph/abi/eip918.json')
 


let envmode = AppHelper.getEnvironmentName()
 
let serverConfig = AppHelper.getServerConfig()

 
  async function start(){
  
    let web3URI = serverConfig.web3provider.replace('https','wss')
    
    let web3 = new Web3( web3URI )

     

    console.log('web3 ready with provider ',serverConfig.web3provider )

    let vibeConfig = VibeHelper.getVibeConfig( )
 
    let dbName = 'vibegraph_'.concat(envmode)

    let eip918Indexer = new IndexerEIP918()
    await eip918Indexer.initialize()

    let vibeGraphConfig = {  
        contracts:vibeConfig.contracts,
         
        dbName , 
  
        indexRate: 10*1000,
        fineBlockGap: vibeConfig.fineBlockGap,
        courseBlockGap: vibeConfig.courseBlockGap,
        logging: vibeConfig.logging ,
        subscribe: vibeConfig.subscribe,
        customIndexers:[{
          type:'EIP918', 
          abi: EIP918ABI ,  
          handler: eip918Indexer
       }]
         
         
    }
  
  

    let vibegraph = new VibeGraph(  )
    await vibegraph.init(vibeGraphConfig)
    vibegraph.startIndexing(web3, vibeGraphConfig)
     

  }

 
 
 start()