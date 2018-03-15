'use strict';
const weatherModels = require('../models/weather.js');
const Front = require('../models/frontPage.js');

module.exports = async (req, res) => {

    const weather = await weatherModels.getWeather(req.query);
    const frontPage = Front.fetch();
    Object.assign(frontPage, {
        weather
    });
    res.render('main', frontPage); // this is the important part

};
