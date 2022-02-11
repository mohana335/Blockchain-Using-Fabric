/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/*'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');


async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

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

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        //const result = await contract.evaluateTransaction('queryAllCars');
        //let result = await contract.evaluateTransaction('queryPatientsByDiagnosis', 'p1');
        //console.log(result)
        //result = result.toString('utf-8')
        //console.log(result)

        const result = await contract.evaluateTransaction('queryPatientsByDiagnosis',"diabetis");
        console.log(`Transaction has been evaluated. The result is: ${result.toString('utf-8')}`);
        var a = JSON.parse(result.toString('utf-8'));
        console.log(a);
        //console.log(a[0].key);
        //console.log(a[0].value);
        //console.log(a[0].value.name);
        //console.log(a[0].value.diagnosis);
        //console.log(a[0].value.oxygenLevel);
        //console.log(a[0].value.heartRate);
        //console.log(a[0].value.glucoseLevel);

        // Disconnect from the gateway.
        await gateway.disconnect();
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
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
const path = require('path');
const fs = require('fs');


async function main() {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

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

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        //const result = await contract.evaluateTransaction('readData',"pnew");//neeww test
        const result = await contract.evaluateTransaction('queryPatientsByName',"new");
        console.log(`Transaction has been evaluated, result is: ${result.toString('utf-8')}`);
        var a=JSON.parse(result.toString('utf-8'));
        console.log(a);
        console.log(a[0].key);
        console.log(a[0].value);
        console.log(a[0].value.name);
        console.log(a[0].value.heartrate);
        console.log(a[0].value.oxy);
        console.log(a[0].value.sugar);
        console.log(a[0].value.heartratestatus);
        console.log(a[0].value.sugarstatus);
        console.log(a[0].value.oxystatus)
        //a[0].value.heartrate.push(100);
        //a[0].value.heartrate.push(199);
        //a[0].value.heartrate.push(200);
        /*
        let key4 = a[0].key
        var patient4 ={
            "name":a[0].value.name,
            "sugar":a[0].value.sugar,
            "oxy":a[0].value.oxy,
            "heartrate":a[0].value.heartrate
        }
        a[0].value.heartrate.push(120);
        console.log(a[0].value.heartrate);

        console.log(key4);
        await contract.submitTransaction("writeJsonData",key4,JSON.stringify(patient4));
     */
        // Disconnect from the gateway.
        await gateway.disconnect();
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

main();

