const { getUserProfileInfo, completeProfile, saveUserAddress, changeAccountStatusActive, editUserCoreInfo, editUserPhoneNumber, editUserAddress } = require("../repo/regUsersRepo");
const uuid = require("uuid");
const { handleGeocode } = require("../utils/geocoder");


const getRegularUserProfileInfo = async (req, res) => {
  const email = req.params.email;
  console.log("this is email", email);
  try {
    const data = await getUserProfileInfo(email);
    res.send(data);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const handleCompleteProfile = async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  const userId = req.body.userId;
  try {
    const obj = {
      ph_id: uuid.v4(),
      phone_number: phoneNumber,
      ph_user_id: userId,
    };
    //save the phone number first
    const phId = uuid.v4();
    const response = await completeProfile(obj);
    console.log("phone updated");
    //next we save the address

    const addressObj = {
      id: uuid.v4(),
      address: address.street,
      city: address.city,
      state_province: address.stateProvince,
      country: address.country,
      postal_code: address.postalCode,
      address_user_id: userId,
    };
    let addressString = `${address.street} ${address.city} ${address.stateProvince} ${address.postalCode} ${address.country}`;
    let testresponse = await handleGeocode(addressString);
    const latitude = testresponse[0].latitude;
    const longitude = testresponse[0].longitude;
    addressObj.latitude = latitude;
    addressObj.longitude = longitude;
    console.log("this is address obj", addressObj);
    //send of the address to the database
    const addressResponse = await saveUserAddress(addressObj);
    console.log("address updated");
    //update the user account status to active
    const responseAccount = await changeAccountStatusActive(userId);
    console.log("account status updated");
    res.status(200).json({ message: "Profile completed" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Something went wrong" });
  }
};

const handleEditUserProfile = async (req, res) => {
  console.log("this is req body,",req.body)
  const userInfo = {
    userId : req.body.userId,
    firstname: req.body.firstName,
    lastname : req.body.lastName,
    email: req.body.email,
  }
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  console.log("this is user info",userInfo)
  try{
    const response = await editUserCoreInfo(userInfo);
    console.log("user core info updated")
    const phoneResponse = await editUserPhoneNumber(phoneNumber,userInfo.userId);
    console.log("phone number updated")
    const addressResponse = await editUserAddress(address,userInfo.userId);
    console.log("address updated")
    res.status(200).json({message : "User profile updated"})
  }
  catch(err){
    console.log(err)
    res.status(500).json({message : "Something went wrong"})
  }
};

module.exports = { getRegularUserProfileInfo, handleCompleteProfile, handleEditUserProfile };
