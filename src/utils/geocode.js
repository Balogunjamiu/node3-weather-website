const request = require('request')

const geocode= (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYmFsb2d1bmphbWl1IiwiYSI6ImNrZm5jN3dodzAzZzcydXRhbjNqMWlwcmkifQ.xiAPRHNkSrf0WjE-t5J-8w&limit=1'

    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect with the location', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location, Try another search. ', undefined)
        }else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude: body.features[0].center[0],
                location:  body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
