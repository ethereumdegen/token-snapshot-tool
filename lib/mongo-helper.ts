import { AssertionResponse } from "degen-route-loader"
 
import ExtensibleDB, { TableDefinition } from 'extensible-mongoose'
import AppHelper from "./app-helper"
import { stringToMongoId } from "./parse-helper"
 


export async function findRecordById( id: string, definition: TableDefinition, mongoDB: ExtensibleDB ) : Promise<AssertionResponse>{

    let item = await mongoDB.getModel(definition).findById( stringToMongoId(id) )
    
    if(!item){
        return {success:false, error:`Could not find ${definition.tableName}`}
    }

    return {success:true, data: item}
}


export async function findRecord( query: any, definition: TableDefinition, mongoDB: ExtensibleDB ) : Promise<AssertionResponse>{

    let items = await mongoDB.getModel(definition).findOne( query )
    
    if(!items ){
        return {success:false, error:`Could not find record for ${definition.tableName}`}
    }

    return {success:true, data: items}
}

export async function findRecords( query: any, definition: TableDefinition, mongoDB: ExtensibleDB ) : Promise<AssertionResponse>{

    let items = await mongoDB.getModel(definition).find( query )
    
    if(!items ){
        return {success:false, error:`Could not find records for ${definition.tableName}`}
    }

    items = items.filter(x => typeof x != 'undefined')

    return {success:true, data: items}
}


export async function createRecord( input: any, definition: TableDefinition, mongoDB: ExtensibleDB  ){

    let result = await mongoDB.getModel(definition).create(input)

    .then((insert) => {
        return {success:true, data: insert }
    })
    .catch((error) => {
        console.error(error)
        return {success:false,  error: `createRecord: Could not create ${definition.tableName}`}
    }) 

   return result

}

export async function modifyRecord( id: string, update: any , definition: TableDefinition, mongoDB: ExtensibleDB ) : Promise<AssertionResponse>{
 
    let options = {returnOriginal: false}

    let updatedRecord = await mongoDB.getModel(definition).findOneAndUpdate({ _id: stringToMongoId(id)  }, update, options )

    if(!updatedRecord){
        return {success:false, error:`Could not modify ${definition.tableName}`}
    }

    return {success:true, data: updatedRecord}
}




export async function deleteRecord( id: string,  definition: TableDefinition, mongoDB: ExtensibleDB ) : Promise<AssertionResponse>{
 
  
      let updatedRecord = await mongoDB.getModel(definition).findOneAndDelete({ _id: stringToMongoId(id)  } )
  
      if(!updatedRecord){
          return {success:false, error:`Could not modify ${definition.tableName}`}
      }
  
      return {success:true, data: updatedRecord}
  }
  
  