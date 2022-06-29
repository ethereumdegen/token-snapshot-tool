
import {Mongoose, Schema, Model} from 'mongoose'
 
import ExtensibleMongoDatabase, { RegisteredModel, DatabaseExtension , TableDefinition} from 'extensible-mongoose'


import { BigNumber } from "ethers";
import ServerSegmentManager from '../segmentmanagers/ServerSegmentManager';
import { PayspecInvoice } from 'payspec-js';
import { AssertionResponse } from 'degen-route-loader';
  
//used on front end 
export interface CartItem {
  itemId: string,
  quantity:number 
}
  
export interface Order {
   
    buyerAddress: string,
    status: string, 
   
    createdAt: number 
  
  }


  export interface OrderInvoice extends PayspecInvoice{

    parentOrderId: string,
    shippingDetailsId?: string,
    createdAt: number 
  }
  
  export interface OrderItem {
   
    parentOrderId: string
    parentPurchaseableId: string,
   // parentShopId: string, //cache this here
    quantity: number ,
   // priceEachUsdCents:string,
    createdAt: number 
  
  
  }
  
  
  export interface ShippingDetail { 
    fullName: string,
    streetName: string,
    stateCode: string,
    countryCode: string,
    zipCode: string,
    phone: string,
    email: string,
    publicAddress: String
  }
  

  export const OrderSchema = new Schema<Order>({    
  
    buyerAddress: {type: String, index:true, required:true },
    status: String, 
    createdAt: Number 

  })


    
  export const OrderItemSchema = new Schema<OrderItem>({     
    parentOrderId: {type: String, index:true, required:true  },
   // parentItemId: String,
    parentPurchaseableId: {type: String, index:true, required:true  },
    //parentShopId: String,  //look this up thru the purchaseable 
    quantity: Number ,
    createdAt: Number 
 //   priceEachUsdCents: String   //lock in price at time of order?  no - only for invoice 
  })


  export const ShippingDetailSchema = new Schema<ShippingDetail>({ 
  fullName: { type: String, required:true },
  streetName: { type: String, required:true },
  stateCode: { type: String, required:true },
  countryCode: { type: String, required:true },
  zipCode: { type: String, required:true },
  phone: String,
  email: String,
  publicAddress: { type: String, required:true } //owner
    })


/*
invoices prices can expire SO many invoices can point at one order 

*/
export const OrderInvoiceSchema = new Schema<OrderInvoice>({    

  payspecContractAddress: String,
  description : String,
  nonce: String, //BigNumberToString
  token: String,
  totalAmountDue: String,
  payToArrayStringified: String,
  amountsDueArrayStringified: String,
  expiresAt: Number,
  invoiceUUID: {type: String, unique: true, required:true},

  parentOrderId: {type: String, required:true},
  shippingDetailsId: {type: String, required:true},
  createdAt: Number 
})

 


   export const OrderDefinition:TableDefinition= {tableName:'orders',schema:OrderSchema}
   export const OrderItemDefinition: TableDefinition = {tableName:'orderitems', schema:OrderItemSchema}
   export const OrderInvoiceDefinition: TableDefinition = {tableName: 'orderinvoices', schema: OrderInvoiceSchema}
   export const ShippingDetailDefinition: TableDefinition = {tableName: 'shippingdetails', schema: ShippingDetailSchema}
export default class OrderDBExtension extends DatabaseExtension  {
      
   

 
      getBindableModels() : Array<TableDefinition>{

        return [
          OrderDefinition,
          OrderItemDefinition,
          OrderInvoiceDefinition,
          ShippingDetailDefinition
        ]
    }


}