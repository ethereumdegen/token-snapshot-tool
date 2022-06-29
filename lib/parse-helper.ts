import { BigNumber, ethers } from "ethers";

const {ObjectId} = require('mongodb'); 
 

 

  export function escapeString(input: string) : string {
        
    return encodeURI(input)
  }

  export function unescapeString(input: string) : string {
      
      return decodeURI(input)
  }

  export function mongoIdToString(mongoId: any) : string{

    if(typeof mongoId == 'string'){
      return mongoId 
    }

    return mongoId.valueOf()
  }
  
  export function stringToMongoId(str: string) : any {

    let result 

    try { 
      result = ObjectId(str)
    }catch(err){
      console.error("input: " , str, err)
      
    }

    return result 
  }




export function priceToCents(price:string){

    if(isNaN(parseFloat(price))) return 0

   let result = Math.floor(parseFloat(price) * 100) 

   if(result < 0) result = 0 

   return result 

}


export function centsToPrice(cents:number){

   if(isNaN(cents)) return "0.00"
   if(cents < 0 ) return "0.00"

   let result = (cents / 100.0).toFixed(2)
   
   if(parseFloat(result) < 0) result = "0.00"

   return result 

}

 export function weiToEth(wei:string) : string{

  return ethers.utils.formatEther(wei);
  
}