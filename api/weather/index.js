const axios = require('axios')

module.exports = async function (context, req) {

    if (req.method !== "POST") {
        context.res = {
            status: 405,
            body: 'Method not allowed'
        }
    }

    const { location } = req.body

    const encodedLocation = encodeURIComponent(location)

    try {
        // Call the Weather API
        const { data } = await axios({
            method: "GET",
            url: `https://aerisweather1.p.rapidapi.com/observations/${encodedLocation}`,
            headers: {
                "content-type": "application/octet-stream",
                "x-rapidapi-host": "aerisweather1.p.rapidapi.com",
                "x-rapidapi-key": process.env["RAPIDAPI_KEY"],
                "useQueryString": true
            }
        })

        // Pull the information that we need from the Weather API response
        const weatherData = {
            conditions: data.response.ob.weather,
            tempC: data.response.ob.tempC,
            tempF: data.response.ob.tempF
        }
        // Return the data object
        context.res = {
            body: weatherData
        }
    } catch (e) {
        console.log(e)

        context.res = {
            status: 500,
            body: "An error occurred"
        }
    }
}