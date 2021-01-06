const request = require('request');

const forecast = (latitude, longtitude, callbcack) => {
    const url = 'http://api.weatherstack.com/current?access_key=13a856feac4202da4c2f0c2df4dee4eb&query=' + latitude + ',' + longtitude + '&units=m';

    request({url, json: true}, (error, {body} ) => {
        if (error) {
            callbcack('Unable to connect to location service!', undefined)
        } else if (body.error) {
            callbcack('Unable to find location!', undefined)
        } else {
            callbcack(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees. It feels like ' + body.current.feelslike + ' degrees in ' + body.location.name + '. Wind speed is ' + body.current.wind_speed + ' m/s');
        };
    });
}

 module.exports = forecast;