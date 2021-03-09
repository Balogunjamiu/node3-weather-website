const request = require('request')
const weatherUrl = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=3f4829819d973d1a6683e49eecd4ade5&query=' + latitude + ',' + longitude
    request({url, json: true},(error, {body}) => {
        if(error){
            callback('unable to connect to the server', undefined)
        }else if(body.error){
            callback('unable to find location', undefined)
        }else{ 
                  callback(undefined, body.current.weather_descriptions[0] +' .It is currently '+ body.current.temperature +' degrees out.' + ' it feels like ' + body.current.feelslike + ' degrees out')

        }
    })
}
module.exports= weatherUrl