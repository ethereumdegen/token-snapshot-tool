
import {Mongoose, Schema, Model} from 'mongoose'
 
import ExtensibleMongoDatabase , {TableDefinition,DatabaseExtension} from 'extensible-mongoose'
 
 
  

  //used for declaring that new physical stock has been added -- affects quantity in stock (sum these and subtract finalized order quantities)
  export interface InventoryAdjustment {
    parentPurchaseableId: string,
    quantityDelta: number,
    //createdByAddress: string   //keeping track of which pub addr changed 
    createdAt: number  
  }
   
 
  export const InventoryAdjustmentSchema = new Schema<InventoryAdjustment>({    
    parentPurchaseableId:  { type: String, index: true  },
    quantityDelta:Number,

    createdAt: Number 
  }) 


  export const InventoryAdjustmentDefinition:TableDefinition={tableName:'inventoryadjustments',schema:InventoryAdjustmentSchema}
 

export default class InventoryDBExtension extends DatabaseExtension {
 

  
    getBindableModels() : Array<TableDefinition>{

        return  [
          InventoryAdjustmentDefinition//, ShopItemDefinition 
        ]
    } 
    

}