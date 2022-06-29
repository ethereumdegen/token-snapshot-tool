
import {Mongoose, Schema, Model} from 'mongoose'
 
import ExtensibleMongoDatabase , {TableDefinition,DatabaseExtension} from 'extensible-mongoose'
import ServerSegmentManager from '../segmentmanagers/ServerSegmentManager'
 

export interface Shop {
    name:  string,
    urlSlug:  string,
  //  shopId: number, use _id 
    //thumbnailImage: string | undefined,
    adminAddress: string,
  }
  
  


  //used for declaring that new physical stock has been added -- affects quantity in stock (sum these and subtract finalized order quantities)
  export interface InventoryAdjustment {
    parentItemId: string,
    quantityDelta: number,
    createdAt: number 

  }
   

  export const ShopSchema = new Schema<Shop>({    
    name:  { type: String, index: true, unique: true },
    urlSlug: { type: String, index: true, unique: true },
   // shopId: { type: Number, index: true, unique: true }, 
    adminAddress: { type: String, index: false, unique: false },
  })
 


  export const ShopDefinition:TableDefinition={tableName:'shops',schema:ShopSchema}

 
 

export default class ShopDBExtension extends DatabaseExtension {
 

  
    getBindableModels() : Array<TableDefinition>{

        return  [
            ShopDefinition//, ShopItemDefinition 
        ]
    } 
    

}