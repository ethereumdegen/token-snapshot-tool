
 
import fs from 'fs'
import path from 'path'


import web3utils from 'web3-utils'

const FileReader = require('filereader')

import AppHelper from './app-helper'

const serverConfig = require('../../server/serverconfig.json')[AppHelper.getEnvironmentName()]

export default class FileHelper{


    static  readJSONFile(uri:string){

         let input =  fs.readFileSync(path.resolve( uri),   {encoding:'utf8', flag:'r'}); 

         return JSON.parse(input)
    }

    static readLocalFile( path:string, encoding: BufferEncoding){

        return fs.readFileSync(path,{ encoding  });
     
    }

    static readLocalFileUTF8( path:string  ){

        let output = fs.readFileSync(path,{ encoding: 'utf8' });
    
        return output 

    }


    static mkdirSync(path){
        try{
            fs.mkdirSync(path)
        }catch(e){
            //console.error(e)
        }
       
    }
    
    static saveBinaryFileToCache(data: string, fileName: string) : {savedFile: boolean, error:any} {
          

        let imageStoragePath = serverConfig.imageStoragePath

        console.log('saving file to cache', imageStoragePath)
        

        try{
            fs.writeFileSync(
                path.join(imageStoragePath.concat(fileName)), 
                data, 'binary')
            return {savedFile: true , error:undefined}
        }catch(error){
            console.error(error)
            return {savedFile: false , error:error}
        } 

    }


    static saveBase64FileToCache(data: string, fileName: string) : {savedFile: boolean, error:any} {
          

        let imageStoragePath = serverConfig.imageStoragePath

        console.log('saving file to cache', imageStoragePath)
        

        try{
            fs.writeFileSync(
                path.join(imageStoragePath.concat(fileName)), 
                data, 'base64')
            return {savedFile: true , error:undefined}
        }catch(error){
            console.error(error)
            return {savedFile: false , error:error}
        } 

    }
 


    static getFileDataBinary(file: File): Promise<string | ArrayBuffer | null> {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsBinaryString(file)
          reader.onload = () => resolve(reader.result)
          reader.onerror = (error: any) => reject(error)
        })
      }


      static readLocalFileBase64( path:string  ){

        let output = fs.readFileSync(path,{ encoding: 'base64' });
    
        return output 

    }

      static getFileDataBase64(file: File): Promise<string | ArrayBuffer | null> {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result)
          reader.onerror = (error: any) => reject(error)
        })
      }
      

    static addRandomSaltToFileName(fileName:string){

        let fileNameSalt = web3utils.randomHex(16)

        let fileNamePrefix = fileName.split('.')[0]
        let fileNamePostfix = fileName.split('.')[1]

        return fileNamePrefix.concat('_').concat(fileNameSalt).concat('.').concat(fileNamePostfix)

    }


}