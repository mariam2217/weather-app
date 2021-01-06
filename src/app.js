const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('../utils/forecast.js');
const geocode = require('../utils/geocode.js')

const app = express();
const port = process.env.PORT || 3000

//Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views');
const publicDirPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handelbars engine and use location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mariam Harutyunyan',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mariam Harutyunyan',
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mariam Harutyunyan',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast (latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404error', {
        title: '404',
        name: 'Mariam Harutyunyan',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404error', {
        title: '404',
        name: 'Mariam Harutyunyan',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => {
     console.log(`Server is up on port ${port}.`)
 });

