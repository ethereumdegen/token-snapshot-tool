
import {Mongoose, Schema, Model} from 'mongoose'
 
import ExtensibleMongoDatabase, { TableDefinition,DatabaseExtension } from 'extensible-mongoose'

import { BigNumber } from "ethers";

import {PayspecInvoice} from 'payspec-js' 
import ServerSegmentManager from '../segmentmanagers/ServerSegmentManager';
 

export interface PaidInvoice {

    payspecContractAddress: string,
    invoiceUUID: string,
    paidBy: string,
    paidAtBlock: string

}

export const PaidInvoiceSchema = new Schema<PaidInvoice>({    

    payspecContractAddress: { type:String, required:true },
    invoiceUUID: {type:String,required:true, unique:true, indexed: true },
    paidBy: String 

  })



export const PayspecInvoiceSchema = new Schema<PayspecInvoice>({    

    payspecContractAddress: String,
    description : String,
    nonce: String, //BigNumberToString
    token: String,
    totalAmountDue: String,
    
    payToArrayStringified: String,
    amountsDueArrayStringified: String,
    expiresAt: Number,
    invoiceUUID: String 
  })

//make sure big number is saved and loaded proper in mongo

export const PaidInvoiceDefinition:TableDefinition = {tableName:'paidinvoices', schema:PaidInvoiceSchema}
//export const PayspecInvoiceDefinition:TableDefinition= {tableName:'payspecinvoices',schema:PayspecInvoiceSchema}


export default class PayspecDBExtension extends DatabaseExtension   {
 

   

    getBindableModels() : Array<TableDefinition>{

        return [
            PaidInvoiceDefinition, 
            //PayspecInvoiceDefinition
            //PayspecInvoiceDefinition
        ]
    } 

    

}