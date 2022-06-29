
import { PaidInvoiceDefinition } from '../server/dbextensions/PayspecDBExtension'
import { findRecord, findRecords } from '../server/lib/mongo-helper'
import PayspecIndexer from '../vibegraph/indexers/IndexerPayspec'

import {getTestDatabase} from "./helpers/test-utils"
import chai, { expect } from 'chai'

describe ('Vibegraph Server',    () => {
  
    let mongoDB
    let payspecIndexer = new PayspecIndexer()


    beforeEach(async () => {

        mongoDB  = await getTestDatabase()
        await mongoDB.dropDatabase()
        
        await payspecIndexer.initialize( mongoDB  )

    
    })

    it('should add a ledger event  ', async () => {
        

        let insert = await payspecIndexer.modifyLedgerByEvent( {

            event:"paidinvoice",
            address:"0x548cf929a38f760ef70f2daea2a6142d96fe56df",
            returnValues:[
                "1234",
                "0x687e8e33591682b8f7fe31aa3b1854720F5A22f0" 
            ]

        } )


        let existing = await findRecords(  {}  , PaidInvoiceDefinition, mongoDB  )
        expect( existing.success == true && existing.data.length > 0).to.eql(true)
    })
})
 

