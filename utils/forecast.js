const request = require('request');

const forecast = (latitude, longtitude, callbcack) => {
    const url = 'http://api.weatherstack.com/current?access_key=07379ad0e6970bfc81414e2d2d086b67&query=' + latitude + ',' + longtitude + '&units=m';

    request({url, json: true}, (error, {body} ) => {
        if (error) {
            callbcack('Unable to connect to location service!', undefined)
        } else if (body.error) {
            callbcack('Unable to find location!', undefined)
        } else {
            callbcack(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees. It feels like ' + body.current.feelslike + ' degrees in ' + body.location.name);
        };
    });
}

 module.exports = forecast;