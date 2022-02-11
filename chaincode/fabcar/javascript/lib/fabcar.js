/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    //1 initLedger  
    //2 writeData
    //3 readData 
    
    async initLedger(ctx){
        await ctx.stub.putState("genisis", "new ledger")
        return "Success"
    }

    //need to store a json object
    async writeJsonData(ctx, key, value){
        let jsonvalue = JSON.parse(value)
        console.log("***********", jsonvalue);
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(jsonvalue)));
        return Buffer.from(JSON.stringify(jsonvalue));
    }

    async readData(ctx, key){
        let response = await ctx.stub.getState(key);
        response = response.toString('utf-8')
        return JSON.stringify(response);
    }

    async queryPatientsByDiagnosis(ctx, diagnosis){
        let queryString = {}
        queryString.selector = {"diagnosis": diagnosis}
        let iterator = await ctx.stub.getQueryResult(JSON.stringify(queryString))
        let result = await this.getIteratorData(iterator) 
        return JSON.stringify(result)
      
    }

    async getIteratorData(iterator){

        let resultArray = []
       
        while (true){
          let res = await iterator.next()
          let resJson = {}
          if(res.value && res.value.value.toString()){
      
            resJson.key = res.value.key;
            resJson.value = JSON.parse(res.value.value.toString('utf-8'))
            resultArray.push(resJson)          
          }
      
          if(res.done){
            await iterator.close();
            return resultArray
          }
        }
      
    }

    async oxygenMonitor(ctx, oxygenLevel){
        
      
    }



}

module.exports = FabCar;

/*'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const cars = [
            {
                color: 'blue',
                make: 'Toyota',
                model: 'Prius',
                owner: 'Tomoko',
            },
            {
                color: 'red',
                make: 'Ford',
                model: 'Mustang',
                owner: 'Brad',
            },
            {
                color: 'green',
                make: 'Hyundai',
                model: 'Tucson',
                owner: 'Jin Soo',
            },
            {
                color: 'yellow',
                make: 'Volkswagen',
                model: 'Passat',
                owner: 'Max',
            },
            {
                color: 'black',
                make: 'Tesla',
                model: 'S',
                owner: 'Adriana',
            },
            {
                color: 'purple',
                make: 'Peugeot',
                model: '205',
                owner: 'Michel',
            },
            {
                color: 'white',
                make: 'Chery',
                model: 'S22L',
                owner: 'Aarav',
            },
            {
                color: 'violet',
                make: 'Fiat',
                model: 'Punto',
                owner: 'Pari',
            },
            {
                color: 'indigo',
                make: 'Tata',
                model: 'Nano',
                owner: 'Valeria',
            },
            {
                color: 'brown',
                make: 'Holden',
                model: 'Barina',
                owner: 'Shotaro',
            },
        ];

        for (let i = 0; i < cars.length; i++) {
            cars[i].docType = 'car';
            await ctx.stub.putState('CAR' + i, Buffer.from(JSON.stringify(cars[i])));
            console.info('Added <--> ', cars[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryCar(ctx, carNumber) {
        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        console.log(carAsBytes.toString());
        return carAsBytes.toString();
    }

    async createCar(ctx, carNumber, make, model, color, owner) {
        console.info('============= START : Create Car ===========');

        const car = {
            color,
            docType: 'car',
            make,
            model,
            owner,
        };

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : Create Car ===========');
    }

    async queryAllCars(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeCarOwner(ctx, carNumber, newOwner) {
        console.info('============= START : changeCarOwner ===========');

        const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
        if (!carAsBytes || carAsBytes.length === 0) {
            throw new Error(`${carNumber} does not exist`);
        }
        const car = JSON.parse(carAsBytes.toString());
        car.owner = newOwner;

        await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
        console.info('============= END : changeCarOwner ===========');
    }

}

module.exports = FabCar; */
'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract{

   //initledger
   //writeData
   //readData
   async initLedger(ctx){
    await ctx.stub.putState("test","*****")
    return "success"
	}

  key1 = "pnew"
  patient1 ={
  "name":"",
  "sugar":[],
  "oxy":[],
  "heartrate":[],
  "heartratestatus":"",
  "sugarstatus":"",
  "oxystatus":""
  }

  async writenewData(ctx,valuename, valueoxy,vaulehrt,valuesugar){
    this.patient1.name=valuename.toString();
    this.patient1.oxy.push(Number(valueoxy));
    this.patient1.sugar.push(Number(valuesugar));
    this.patient1.heartrate.push(Number(vaulehrt));
    this.patient1.heartratestatus= await this.heartRateMonitor(vaulehrt);
    this.patient1.sugarstatus= await this.GlucoseMonitor(valuesugar);
    this.patient1.oxystatus= await this.OxygenMonitor(valueoxy);

    console.log("**********",this.patient1);
    await ctx.stub.putState(this.key1, Buffer.from(JSON.stringify(this.patient1)));
    return Buffer.from(JSON.stringify(this.patient1));
  }

  async heartRateMonitor(vaulehrt){
  
    let bpm= await Number(vaulehrt);
    let min=60;
    let max=100;
  
    if( bpm < min||bpm > max){
      if(bpm <= min){        
        return 'heart rate is low';
      }
      else if(bpm>max && bpm<max+20){
        return 'heart rate is high';
      }
      else if( max+20 <= bpm ){
        return  'heart rate is too high';
      }
    }
    else{    
      return 'heart rate is in normal range';
    }
  } 


  async GlucoseMonitor (valuesugar){
    let glucoseLevel= await Number(valuesugar);
    let min=80;
    let max=200;
    // normal  range for blood glucose Level is 80-140mg/dl
    
    if(glucoseLevel < min||glucoseLevel > max-60){
      if(glucoseLevel <= min){
        return ('Glucose level is low');
      }
      else if(glucoseLevel>140 && glucoseLevel<max){
        return ('Glucose level is in high');
      }
      else if(glucoseLevel>=max){
        return ('Glucose level is Too high');
      }                  
    }
    else{             
       return ('Glucose level is in normal range');
    }
  }
   

  async OxygenMonitor (valueoxy){
    let oxylevel = await Number(valueoxy);
    let maxlevel=100;
    let minlevel=90;
    // normal  range for oxygen level is 95-100 
  
    if(oxylevel>=95 ){
      return('Oxygen level is okay');
    }
    else if(oxylevel<95 && oxylevel>90){
      return('Oxygen level is slighty low');
    }
    else if(oxylevel<=90 ){
      return('Oxygen level is too low');
    }
  }
  

  async queryPatientsByName(ctx, name){
    let queryString={}
    queryString.selector={"name":name}
    let iterator=await ctx.stub.getQueryResult(JSON.stringify(queryString))
    let result= await this.getIteratorData(iterator) 
    return JSON.stringify(result)
  }

  async getIteratorData(iterator){
    let resultArray=[]
 
    while (true){
      let res = await iterator.next()
      let resJson= {}
      if(res.value && res.value.value.toString() ){
        resJson.key=res.value.key;
        resJson.value=JSON.parse(res.value.value.toString('utf-8'))
        resultArray.push(resJson)
      }

      if(res.done){
        await iterator.close();
        return resultArray
      }
    }
  }
}

module.exports = FabCar;
