
import {Mongoose, Schema, Model} from 'mongoose'
 
import ExtensibleMongoDatabase , {TableDefinition,DatabaseExtension} from 'extensible-mongoose'
 
 

 
  export interface Purchaseable {
    parentProductId: string,   //points at the product w all other data 

    variantName: string,  //small,medium,large 
    variantLabel: string , //one or two letters to put on button (xs, lg) 
    
     
   
    priceUsdCents: number,
    status: string //can be disabled temporarily 
  }

 

  export const PurchaseableSchema = new Schema<Purchaseable>({    
    parentProductId:  { type: String, index: true, required: true  },
    variantName:  { type: String, index: true, required: true  },
    variantLabel:  { type: String, index: true, required: true  },

    priceUsdCents:  { type: Number, required: true  },
    status: String   
  })
 
 

  export const PurchaseableDefinition:TableDefinition= {tableName:'purchaseable',schema:PurchaseableSchema}

 

export default class PurchaseableDBExtension extends DatabaseExtension {
 

  
    getBindableModels() : Array<TableDefinition>{

        return  [
          PurchaseableDefinition 
        ]
    } 
    

}