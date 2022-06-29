
import {Mongoose, Schema, Model} from 'mongoose'
 
import ExtensibleMongoDatabase , {TableDefinition,DatabaseExtension} from 'extensible-mongoose'
 

export interface ERC20BalanceModification {
  accountAddress: string,
  contractAddress: string,
  amountDelta: number,
  blockNumber: number     
}
  

export const ERC20BalanceModificationSchema = new Schema<ERC20BalanceModification>({    
  accountAddress:  { type: String, index: true  },
  contractAddress:  { type: String, index: true  },
  amountDelta: Number,
  blockNumber: Number 
}) 


export const ERC20BalanceModificationDefinition:TableDefinition={tableName:'erc20_balance_modifications',schema:ERC20BalanceModificationSchema}


export default class ERC20DBExtension extends DatabaseExtension {
 

  
    getBindableModels() : Array<TableDefinition>{

        return  [
          ERC20BalanceModificationDefinition 
        ]
    } 
    

}