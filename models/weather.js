'use strict';

const MetaWeather = require('metaweather');
let mw = new MetaWeather();

module.exports = class Weather {
    static async getWeather(options) {
        const woeid = await this.getWoeid(options);

        return this.buildWeatherData(woeid);
    }
    static async getWoeid(options) {
        const weatherData = await this.buildWeatherBody(options);

        return mw.location(weatherData[0].woeid);
    }
    static async buildWeatherBody(options) {
        if (options.lat && options.lon) {
            const { body } = await mw.search().latLon(options.lat, options.lon);

            return body;
        } else if (options.query) {
            const { body } = await mw.search().query(options.query);

            return body;

        }

        const { body } = await mw.search().query('moscow');

        return body;
    }

    static buildWeatherData(weatherData) {
        let data = {};
        Object.assign(data, {
            info: weatherData.body.consolidated_weather,
            city: weatherData.body.title,
            img: weatherData.body.consolidated_weather[0].weather_state_abbr,
            temp: weatherData.body.consolidated_weather[0].the_temp,
            wind: weatherData.body.consolidated_weather[0].wind_speed,
            date: weatherData.body.consolidated_weather[0].applicable_date
        });

        return data;
    }
};
