const web3utils = require('web3').utils

import ExtensibleMongoDB , {DatabaseExtension} from 'extensible-mongoose'
import PayspecDBExtension, { PaidInvoiceDefinition } from '../../dbextensions/PayspecDBExtension'
import { createRecord, findRecord } from '../../lib/mongo-helper'

 
let envmode = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'

export default class IndexerEIP918 {
    
  
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

           // await IndexerEIP918.addERC20LedgerBalanceModification(  from, contractAddress , amount * -1, this.mongoDB)
            await IndexerEIP918.addERC20LedgerBalanceModification(  to, contractAddress , amount, blockNumber, this.mongoDB)
            //await IndexerEIP918.addERC20LedgerBalanceModification(  contractAddress , uuid, paidBy, blockNumber, this.mongoDB)  
        }
        
        if(eventName == 'transfer' ){
              
     
        
            let from = web3utils.toChecksumAddress( outputs['0'] )
            let to = web3utils.toChecksumAddress( outputs['1'] )
            let amount = parseInt(outputs['2']) 

            await IndexerEIP918.addERC20LedgerBalanceModification(  from, contractAddress , amount * -1, blockNumber, this.mongoDB)
            await IndexerEIP918.addERC20LedgerBalanceModification(  to, contractAddress , amount, blockNumber, this.mongoDB)
             
        }
        
        
       
    }

     

    static async addERC20LedgerBalanceModification( accountAddress, contractAddress , amountDelta, blockNumber, mongoDB){

       
       try{
          await createRecord( { payspecContractAddress: contractAddress, invoiceUUID , paidBy , paidAtBlock },  PaidInvoiceDefinition , mongoDB  )  
       }catch(error){
           console.error(error)
       }
        
        
    }




}