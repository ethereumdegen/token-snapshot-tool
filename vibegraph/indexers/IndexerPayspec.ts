const web3utils = require('web3').utils

import ExtensibleMongoDB , {DatabaseExtension} from 'extensible-mongoose'
import PayspecDBExtension, { PaidInvoiceDefinition } from '../../server/dbextensions/PayspecDBExtension'
import { createRecord, findRecord } from '../../server/lib/mongo-helper'

 
let envmode = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'

export default class IndexerPayspec {
    
  
    mongoDB

    async initialize( mongoDB?:any    ){

      

        let dbName = 'toadzshop_'.concat(envmode)


        if( mongoDB){
            this.mongoDB = mongoDB
        }else{
            this.mongoDB = new ExtensibleMongoDB(  )    
            await this.mongoDB.init( dbName ) 
        }


        let dbExtensions:Array<DatabaseExtension> = []
    
        dbExtensions.push(...[
            //PaidInvoiceDefinition
          new PayspecDBExtension(this.mongoDB),
        
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
       
        
        if(eventName == 'paidinvoice' ){
              
            let uuid = (outputs['0']).toLowerCase()
            let paidBy = web3utils.toChecksumAddress(outputs['1'])
                         
            await IndexerPayspec.insertPaidInvoice(  contractAddress , uuid, paidBy, blockNumber, this.mongoDB) 
        }
        
        
       
    }

     

    static async insertPaidInvoice( contractAddress , invoiceUUID , paidBy, paidAtBlock , mongoDB){

       
       try{
          await createRecord( { payspecContractAddress: contractAddress, invoiceUUID , paidBy , paidAtBlock },  PaidInvoiceDefinition , mongoDB  )  
       }catch(error){
           console.error(error)
       }
        
        
    }




}