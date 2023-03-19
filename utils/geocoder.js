const NodeGeocoder = require('node-geocoder');



const handleGeocode = async (address) => {

    return new Promise((resolve,reject) => {
        let options = {
            provider: 'openstreetmap'
        };
        
        let geoCoder = NodeGeocoder(options);
        console.log("sending off to geocode")
        geoCoder.geocode(address)
            .then((res) => {
                console.log(res)
              resolve(res);
            })
            .catch((err) => {
                console.log(err)
                reject(err);
            });
    })
}
module.exports = { handleGeocode }