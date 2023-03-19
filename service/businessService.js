const { saveNewBusiness } = require("../repo/businessRepo")
const uuid = require('uuid');
const { createNewAddress } = require("../repo/addressRepo");
const { updateAccountSetup } = require("../repo/usersRepo");
const { handleGeocode } = require("../utils/geocoder");
const createNewBusiness = async (req, res) => {
    try {
        console.log("this is the request body", req.body)
        console.log("this is the address", req.body.address)
        let sampleAddress = req.body.address;
        let test = "5517 n central ave chicago il 60630"
        try{
            let testresponse = await handleGeocode(test);
            console.log("this is test response", testresponse)
            const latitude = testresponse[0].latitude;
            const longitude = testresponse[0].longitude;
            console.log("this is latitude", latitude)
            console.log("this is longitude", longitude)
        }
        catch(err){
            console.log(err)
        }
      
        return;
        let business = req.body.business;
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

module.exports = { createNewBusiness }