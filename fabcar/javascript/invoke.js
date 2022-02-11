/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');


        let key1 = "p1"
        var patient1 = {
            "name" : "Riaz",
            "diagnosis" : "cancer",
            "oxygenLevel" : "98",
            "heartRate" : "80bpm",
            "glucoseLevel" : "100mg/dl"
        }

        let key2 = "p2"
        var patient2 = {
            "name" : "Mohana",
            "diagnosis" : "diabetis",
            "oxygenLevel" : "90",
            "heartRate" : "80bpm",
            "glucoseLevel" : "150mg/dl"
        }

        let key3 = "p3"
        var patient3 = {
            "name" : "Polok",
            "diagnosis" : "diabetis",
            "oxygenLevel" : "97",
            "heartRate" : "50bpm",
            "glucoseLevel" : "150mg/dl"
        }

        let key4 = "p4"
        var patient4 = {
            "name" : "Nihal",
            "diagnosis" : "heartDisease",
            "oxygenLevel" : "98",
            "heartRate" : "40bpm",
            "glucoseLevel" : "90mg/dl"
        }
        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
        //await contract.submitTransaction('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom');
        
        await contract.submitTransaction("writeJsonData", key1, JSON.stringify(patient1));
        await contract.submitTransaction("writeJsonData", key2, JSON.stringify(patient2));
        await contract.submitTransaction("writeJsonData", key3, JSON.stringify(patient3));
        await contract.submitTransaction("writeJsonData", key4, JSON.stringify(patient4));
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();*/


/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

/*
        let key1 = "p1"
        var patient1 ={
            "name":"ra",
            "sugar":[],
            "oxy":[],
            "heartrate":[]
        }
        let key2 = "p2"
        var patient2 ={
            "name":"ta",
            "sugar":100,
            "oxy":90,
            "heartrate":80
        }
        let key3 = "p3"
        var patient3 ={
            "name":"da",
            "sugar":100,
            "oxy":90,
            "heartrate":70
        }
        let key4 = "p4"
        var patient4 ={
            "name":"fa",
            "sugar":100,
            "oxy":90,
            "heartrate":70
        }
        */

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
       // await contract.submitTransaction("writeJsonData",key1,JSON.stringify(patient1));
       // await contract.submitTransaction("writeJsonData",key2,JSON.stringify(patient2));
       // await contract.submitTransaction("writeJsonData",key3,JSON.stringify(patient3));
       // await contract.submitTransaction("writeJsonData",key4,JSON.stringify(patient4));
        //neeeeeeeew
        //await contract.submitTransaction("writenewData","new",oxy,heart,sugar);
        await contract.submitTransaction("writenewData","new",Number(90),Number(20),Number(90));
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

main();

