'use strict';

const { Contract } = require('fabric-contract-api');

class MedicalContract extends Contract {

    constructor() {
        super('contract.medical');
    }

    async instantiate(ctx) {
        console.log('Instantiate medical contract successfully');
    }

    /**
     * @param {*} ctx 
     * @param {*} packageID 
     * @param {*} name 
     * @param {*} importDate 
     * @param {*} supplierId 
     * @param {*} supplierName 
     */
    async createPackageData(ctx, packageID, name, importDate, supplierId, supplierName) {
        try {
            //check object and bloodProfileId
            if (!packageID) {
                throw new Error('packageID is invalid');
            }

            if (!name) {
                throw new Error('name is invalid');
            }

            if (!importDate) {
                throw new Error('importDate is invalid');
            }

            if (!supplierId) {
                throw new Error('supplierId is invalid');
            }

            if (!supplierName) {
                throw new Error('supplierName is invalid');
            }

            let packageDataObject = {
                "packageID": packageID,
                "name": name,
                "importDate": importDate,
                "supplierId": supplierId,
                "supplierName": supplierName
            };

            //store to ledger 
            await ctx.stub.putState(packageID, Buffer.from(JSON.stringify(packageDataObject)));
        } catch (error) {
            throw new Error('Error ' + error);
        }
    }

    /**
     * create data of equipment
     * @param {*} ctx 
     * @param {String} equipmentID 
     * @param {String} name
     * @param {String} quantily 
     * @param {String} unit
     */
    async createEquipment(ctx, equipmentID, name, quantily, unit, packageID, state, reUse) {

        // donors ID, name, age, date of birth, blood type, amount of blood unit
        try {
            //check object and bloodProfileId
            if (!equipmentID) {
                throw new Error('equipmentID is invalid');
            }

            if (!name) {
                throw new Error('name is invalid');
            }

            if (!quantily) {
                throw new Error('quantily is invalid');
            }

            if (!unit) {
                throw new Error('unit is invalid');
            }

            if (!packageID) {
                throw new Error('packageID is invalid');
            }

            if (!unit) {
                throw new Error('unit is invalid');
            }

            if (!packageID) {
                throw new Error('packageID is invalid');
            }

            if (!state) {
                throw new Error('state is invalid');
            }

            if (!reUse) {
                throw new Error('reUse is invalid');
            }

            let equipmentDataObject = {
                "equipmentID": equipmentID,
                "name": name,
                "quantily": quantily,
                "unit": unit,
                "packageID": packageID,
                "state": state,
                "reUse": reUse
            };

            //store to ledger 
            await ctx.stub.putState(equipmentID, Buffer.from(JSON.stringify(equipmentDataObject)));
        } catch (error) {
            throw new Error('Error ' + error);
        }

    }

    /**
     * @param {*} ctx 
     * @param {*} packageID 
     * @returns 
     */
    async queryDataPackage(ctx, packageID){
        try {
            //get data of profile
            let packageDataAsByte = await ctx.stub.getState(packageID);

            //check data
            if (!packageDataAsByte || packageDataAsByte.toString().length <= 0) {
                throw new Error('data of profile ' + packageDataAsByte + ' does not exist');
            }

            //convert byte data to json
            let packageData = JSON.parse(packageDataAsByte.toString());

            return packageData;
        } catch (error) {
            throw new Error('Error ' + error);
        }
    }

    /**
     * query equipment data
     * @param {*} ctx 
     * @param {*} equipmentID 
     * @returns 
     */
    async queryEquipData(ctx, equipmentID) {

        try {
            //get data of profile
            let equipDataAsByte = await ctx.stub.getState(equipmentID);

            //check data
            if (!equipDataAsByte || equipDataAsByte.toString().length <= 0) {
                throw new Error('data of profile ' + equipDataAsByte + ' does not exist');
            }

            //convert byte data to json
            let equipData = JSON.parse(equipDataAsByte.toString());

            return equipData;
        } catch (error) {
            throw new Error('Error ' + error);
        }

    }

    /**
     * update data of equipment
     * @param {*} ctx 
     * @param {*} equipmentID 
     * @param {*} newName 
     * @param {*} newQuantily 
     * @param {*} newUnit 
     * @param {*} newPackageID 
     */
    async updateDataEquipment(ctx, equipmentID, newName, newQuantily, newUnit, newPackageID, newState, reUse) {

        // donors ID, name, age, date of birth, blood type, amount of blood unit
        try {
            //check object and bloodProfileId
            if (!equipmentID) {
                throw new Error('equipmentID is invalid');
            }

            if (!newName) {
                throw new Error('newName is invalid');
            }

            if (!newQuantily) {
                throw new Error('newQuantily is invalid');
            }

            if (!newUnit) {
                throw new Error('newUnit is invalid');
            }

            if (!newPackageID) {
                throw new Error('newPackageID is invalid');
            }

            if (!newState) {
                throw new Error('newState is invalid');
            }

            if (!reUse) {
                throw new Error('reUse is invalid');
            }

            let equipDataAsByte = await ctx.stub.getState(equipmentID);

            //check data
            if (!equipDataAsByte || equipDataAsByte.toString().length <= 0) {
                throw new Error('data of profile ' + equipmentID + ' does not exist');
            }

            //convert byte data to json
            let newEquipData = JSON.parse(equipDataAsByte.toString());

            newEquipData.name = newName;
            newEquipData.quantily = newQuantily;
            newEquipData.newUnit = newUnit;
            newEquipData.newPackageID = newPackageID;
            newEquipData.state = newState;
            newEquipData.reUse = reUse;

            //store to ledger 
            await ctx.stub.putState(equipmentID, Buffer.from(JSON.stringify(newEquipData)));
        } catch (error) {
            throw new Error('Error ' + error);
        }

    }

    /**
     * update data of package
     * @param {*} ctx 
     * @param {*} packageID 
     * @param {*} newName 
     * @param {*} newImportDate 
     * @param {*} newSupplierId 
     * @param {*} newSupplierName 
     */
    async updateDataPackage(ctx, packageID, newName, newImportDate, newSupplierId, newSupplierName) {

        try {
            //check object and bloodProfileId
            if (!packageID) {
                throw new Error('packageID is invalid');
            }

            if (!newName) {
                throw new Error('newName is invalid');
            }

            if (!newImportDate) {
                throw new Error('newImportDate is invalid');
            }

            if (!newSupplierId) {
                throw new Error('newSupplierId is invalid');
            }

            if (!newSupplierName) {
                throw new Error('newSupplierName is invalid');
            }

            let packageDataAsByte = await ctx.stub.getState(packageID);

            //check data
            if (!packageDataAsByte || packageDataAsByte.toString().length <= 0) {
                throw new Error('data of profile ' + packageID + ' does not exist');
            }

            //convert byte data to json
            let newPackageData = JSON.parse(packageDataAsByte.toString());

            newPackageData.name = newName;
            newPackageData.importDate = newImportDate;
            newPackageData.supplierId = newSupplierId;
            newPackageData.supplierName = newSupplierName;

            //store to ledger 
            await ctx.stub.putState(packageID, Buffer.from(JSON.stringify(newPackageData)));
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
    async deleteProfile(ctx, donorsID) {
        try {
            await ctx.stub.deleteState(donorsID);
        } catch (error) {
            throw new Error("Error: " + error);
        }
    }
}

module.exports = MedicalContract; 