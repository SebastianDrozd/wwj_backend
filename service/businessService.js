const { saveNewBusiness, getBusinessByIdRepo } = require("../repo/businessRepo")
const uuid = require('uuid');
const { createNewAddress } = require("../repo/businessAddressRepo");
const { updateAccountSetup } = require("../repo/usersRepo");
const { handleGeocode } = require("../utils/geocoder");

const createNewBusiness = async (req, res) => {
    try {
        let businessAddress = req.body.address;
        let business = req.body.business;
        let addressString = `${businessAddress.street} ${businessAddress.city} ${businessAddress.state_province} ${businessAddress.postal_code} ${businessAddress.country}`
        console.log("this is address string",addressString)
        try{
            let testresponse = await handleGeocode(addressString);
            console.log("this is test response", testresponse)
            const latitude = testresponse[0].latitude;
            const longitude = testresponse[0].longitude;
            
            let businessId = uuid.v4();
            business.id = businessId;
            let response = await saveNewBusiness(business)

            let addressId = uuid.v4();
            businessAddress.id = addressId;
            businessAddress.business_id = response.business.id;
            businessAddress = {...businessAddress, latitude, longitude}
            console.log("this is business address", businessAddress)
            let addressResponse = await createNewAddress(businessAddress) 
            console.log("this is response",response.business)
            let respon3 = await updateAccountSetup(response.business.business_user_id)
            console.log("this is response",respon3)
            res.send(response)
        }
        catch(err){
            console.log(err)
        }
      
        return;
        //let business = req.body.business;
        let address = req.body.address;
        let businessId = uuid.v4();
        business.id = businessId;
        let response = await saveNewBusiness(business)
      
        let addressId = uuid.v4();
        address.id = addressId;
        address.business_id = response.business.id;
        console.log("this is address object that will be sent", address)
        let addressResponse = await createNewAddress(address) 
        console.log("this is response",response.business)
        let respon3 = await updateAccountSetup(response.business.business_user_id)
        console.log("this is response",respon3)
        res.send(response)
    }
    catch (err) {
        res.send(err)
    }


}

const getBusinessById = async (req, res) => {
    let businessId = req.params.id;
    try{
        const response = await getBusinessByIdRepo(businessId)
        console.log(response);
        res.send(response)
    }
    catch(error){
        res.send(err)
    }
}

module.exports = { createNewBusiness,getBusinessById }