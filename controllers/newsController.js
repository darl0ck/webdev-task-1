'use strict';
const News = require('../models/news.js');
const weatherModels = require('../models/weather.js');

module.exports = async (req, res) => {
    const weather = await weatherModels.getWeather(req.query);

    let article = await News.getNews(req);
    Object.assign(article, {
        weather
    });
    res.render('news', article);

};

