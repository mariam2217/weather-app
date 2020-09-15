const request = require('request');


const geocode = (address, callbcack) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWFyaWFtaCIsImEiOiJja2VlNGdvdWswaHdnMzJtbGd1eXZlOGdvIn0.yH-4JxqSdpq2WilFb_fgdw&limit=3';

    request({url, json: true}, (error, {body} ) => {
        if (error) {
            callbcack('Unable to connect to location service!', undefined)
        } else if (body.features.length === 0) {
            callbcack('Unable to find location!', undefined)
        } else {
            callbcack(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        };
    });
 };

 module.exports = geocode;