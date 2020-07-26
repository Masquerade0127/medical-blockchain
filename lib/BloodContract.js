'use strict';

const { Contract } = require('fabric-contract-api');

class BloodContract extends Contract{
    
    constructor(){
        super('camcam.family.blood');
    }

    async instantiate(ctx){
        console.log('Instantiate camcam.family.blood contract');
    }

    /**
     * create data of blood
     * 
     * @param {Context} ctx 
     * @param {String} bloodProfileId 
     * @param {String} bloodProfileObject 
     */
    async createProfile(ctx, bloodProfileId, bloodProfileObject){
        
        try {
            //check object and bloodProfileId
            if (!bloodProfileId){
                throw new Error('bloodProfileId is invalid');
            }
            if (!bloodProfileObject){
                throw new Error('profile data invalid');
            }

            //store to ledger 
            await ctx.stub.putState(bloodProfileId, Buffer.from(JSON.stringify(bloodProfileObject)));
        } catch (error) {
            throw new Error('Error ' + error);
        }

    }

    /**
     * query profile data
     * 
     * @param {Context} ctx 
     * @param {String} bloodProfileId 
     */
    async queryProfile(ctx, bloodProfileId){

        try {
            //get data of profile
            let bloodProfileAsByte = await ctx.stub.getState(bloodProfileId);

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
     * @param {String} bloodProfileId 
     */
    async deleteProfile(ctx, bloodProfileId){
        try {
            await ctx.stub.deleteState(bloodProfileId);
        } catch (error) {
            throw new Error("Error: " + error);
        }
    }
}

module.exports = BloodContract; 