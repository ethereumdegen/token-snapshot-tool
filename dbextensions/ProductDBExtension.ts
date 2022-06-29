
import {Mongoose, Schema, Model} from 'mongoose'
 
import ExtensibleMongoDatabase , {TableDefinition,DatabaseExtension} from 'extensible-mongoose'
 
 

 
  export interface Product {
    name:  string,
    urlSlug:  string,
  
    parentShopId: string, //this can never change bc its cached/duplicated by OrderItem
   // priceUsdCents: number,
    status: string //can be disabled temporarily 
  }

 

  export const ProductSchema = new Schema<Product>({    
    name:  { type: String, index: true, unique: true },
    urlSlug: { type: String, index: true, unique: true },
    
    parentShopId: {type: String, required: true} ,
  //  priceUsdCents: Number,  this is on purchaseable 
    status: String 
  })
 
 

  export const ProductDefinition:TableDefinition= {tableName:'products',schema:ProductSchema}

 

export default class ProductDBExtension extends DatabaseExtension {
 

  
    getBindableModels() : Array<TableDefinition>{

        return  [
          ProductDefinition 
        ]
    } 
    

}