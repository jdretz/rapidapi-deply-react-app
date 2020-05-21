const axios = require('axios');

exports.handler = async function (event, context) {
    let RAPIDAPI_KEY;

    RAPIDAPI_KEY = process.env.RAPIDAPI_KEY

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed"
        };
    }
    const body = JSON.parse(event.body)

    const { location } = body

    const encodedLocation = encodeURIComponent(location)

    try {
        const { data } = await axios({
            method: "GET",
            url: `https://aerisweather1.p.rapidapi.com/observations/${encodedLocation}`,
            headers: {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "aerisweather1.p.rapidapi.com",
                "x-rapidapi-key": RAPIDAPI_KEY,
                "useQueryString": true
            }
        })

        const weatherData = {
            conditions: data.response.ob.weather,
            tempC: data.response.ob.tempC,
            tempF: data.response.ob.tempF
        }

        return {
            statusCode: 200,
            body: JSON.stringify(weatherData)
        }
    } catch (e) {
        console.log(e)
        return {
            statusCode: 500,
            body: 'Server error.'
        }
    }
}