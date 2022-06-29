

import {Schema} from 'mongoose' 
import ExtensibleDB , {TableDefinition,DatabaseExtension} from 'extensible-mongoose'
import ServerSegmentManager from '../segmentmanagers/ServerSegmentManager'
 
/*
    uses price oracles (chainlink) to cache data of ETH-USD price daily using cron  

    (or coingecko?)
    (can copy pool) 


     
*/




export interface AssetPrice {

    baseAssetCode: string,
    referenceAssetCode: string, 
    priceRatio: string, 
    decimalShift: number,
    lastUpdatedAt: number 

}


export const AssetPriceSchema = new Schema<AssetPrice>({    

    baseAssetCode: { type: String, index: true, required: true },
    referenceAssetCode: { type: String, index: true, required: true },
    priceRatio: { type: String, required: true },
    decimalShift: Number,
    lastUpdatedAt: Number 
  })



  export const AssetPriceDefinition:TableDefinition=  {tableName:'assetprices',schema:AssetPriceSchema}


export default class PricingDBExtension extends DatabaseExtension {
 

   
    getBindableModels() : Array<TableDefinition>{

        return [
            AssetPriceDefinition
        ]
    }
 



}