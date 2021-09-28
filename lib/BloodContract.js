'use strict';

const { Contract } = require('fabric-contract-api');

class BloodContract extends Contract{
    
    constructor(){
        super('contract.blood');
    }

    async instantiate(ctx){
        console.log('Instantiate blood donation contract');
    }

    /**
     * create data of blood
     * @param {*} ctx 
     * @param {String} donorsID 
     * @param {String} name 
     * @param {String} age 
     * @param {String} dob 
     * @param {String} bloodType 
     * @param {String} amount 
     */
    async createProfile(ctx, donorsID, name, age, dob, bloodType, amount){
        
        // donors ID, name, age, date of birth, blood type, amount of blood unit
        try {
            //check object and bloodProfileId
            if (!donorsID){
                throw new Error('donorsID is invalid');
            }

            if (!name){
                throw new Error('name is invalid');
            }

            if (!age){
                throw new Error('age is invalid');
            }

            if (!dob){
                throw new Error('dob is invalid');
            }

            if (!bloodType){
                throw new Error('blood type is invalid');
            }

            if (!amount){
                throw new Error('amount type is invalid');
            }

            let bloodDataObject = {
                "donorsID": donorsID,
                "name": name,
                "age": age,
                "dob": dob,
                "bloodType": bloodType, 
                "amount": amount
            };

            //store to ledger 
            await ctx.stub.putState(donorsID, Buffer.from(JSON.stringify(bloodDataObject)));
        } catch (error) {
            throw new Error('Error ' + error);
        }

    }

    /**
     * query profile data
     * @param {*} ctx 
     * @param {*} donorsID 
     * @returns 
     */
    async queryProfile(ctx, donorsID){

        
        try {
            //get data of profile
            let bloodProfileAsByte = await ctx.stub.getState(donorsID);

            //check data
            if (!bloodProfileAsByte || bloodProfileAsByte.toString().length <= 0){
                throw new Error('data of profile ' + bloodProfileAsByte + ' does not exist');
            }

            //convert byte data to json
            let bloodProfile = JSON.parse(bloodProfileAsByte.toString());

            return bloodProfile;
        } catch (error) {
            throw new Error('Error ' + error);
        }
        
    }

    /**
     * delete profile data
     * 
     * @param {Context} ctx 
     * @param {String} donorsID 
     */
    async deleteProfile(ctx, donorsID){
        try {
            await ctx.stub.deleteState(donorsID);
        } catch (error) {
            throw new Error("Error: " + error);
        }
    }
}

module.exports = BloodContract; 