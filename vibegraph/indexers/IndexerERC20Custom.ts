const web3utils = require('web3').utils

import ExtensibleMongoDB , {DatabaseExtension} from 'extensible-mongoose'
import ERC20DBExtension, { ERC20BalanceModificationDefinition } from '../../dbextensions/ERC20DBExtension'
 
import { createRecord, findRecord } from '../../lib/mongo-helper'

 
let envmode = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'

export default class IndexerERC20Custom {
    
  
    mongoDB

    async initialize( mongoDB?:any    ){

      

        let dbName = 'token_snapshot_tool_'.concat(envmode)


        if( mongoDB){
            this.mongoDB = mongoDB
        }else{
            this.mongoDB = new ExtensibleMongoDB(  )    
            await this.mongoDB.init( dbName ) 
        }


        let dbExtensions:Array<DatabaseExtension> = []
    
        dbExtensions.push(...[
           
          new ERC20DBExtension(this.mongoDB),
        
        ])
        
        dbExtensions.map(ext => ext.bindModelsToDatabase())
    



    }
 

    async modifyLedgerByEvent(evt ){

        console.log('modifyLedgerByEvent', evt)

        let eventName = evt.event 
        let blockNumber = evt.blockNumber

        if(!eventName){
            console.log('WARN: unknown event in ', evt.transactionHash )
            return 
        }
        eventName = eventName.toLowerCase()
        

        let outputs = evt.returnValues
 
        let contractAddress = web3utils.toChecksumAddress(evt.address)
       
        
        if(eventName == 'mint' ){
              
     
            let to = web3utils.toChecksumAddress(outputs['0'] ) 
            let amount = parseInt(outputs['1']) 
 
            await IndexerERC20Custom.addERC20LedgerBalanceModification(  to, contractAddress , amount, blockNumber, this.mongoDB)
         
        }
        
        if(eventName == 'transfer' ){
              
     
        
            let from = web3utils.toChecksumAddress( outputs['0'] )
            let to = web3utils.toChecksumAddress( outputs['1'] )
            let amount = parseInt(outputs['2']) 

            await IndexerERC20Custom.addERC20LedgerBalanceModification(  from, contractAddress , amount * -1, blockNumber, this.mongoDB)
            await IndexerERC20Custom.addERC20LedgerBalanceModification(  to, contractAddress , amount, blockNumber, this.mongoDB)
             
        }
        
        
       
    }

     

    static async addERC20LedgerBalanceModification( accountAddress, contractAddress , amountDelta, blockNumber, mongoDB){

       
       try{
          await createRecord( { accountAddress, contractAddress, amountDelta , blockNumber },  ERC20BalanceModificationDefinition , mongoDB  )  
       }catch(error){
           console.error(error)
       }
        
        
    }




}