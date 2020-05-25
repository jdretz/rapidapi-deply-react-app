import React from 'react';
import './App.css';
import axios from 'axios'

function App() {
  let [location, setLocation] = React.useState('')
  let [tempC, setTempC] = React.useState('')
  let [tempF, setTempF] = React.useState('')
  let [conditions, setConditions] = React.useState('')
  let [loading, setLoading] = React.useState(false)
  let [error, setError] = React.useState(false)

  const fetchWeather = (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    //make edit to redeploy
    axios.post('/api/route', { location })
      .then((data) => {
        setTempC(data.tempC)
        setTempF(data.tempF)
        setConditions(data.conditions)
      })
      .catch(e => {
        setError(true)
        console.log(e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Deploying React App</h1>
      </header>
      <main>
        <h2>Check Your Local Weather</h2>
        <div className='list-wrapper'>Enter a place. Valid entries include:
          <ul>
            <li>city,state</li>
            <li>lat,long</li>
            <li>city,country</li>
            <li>US / CA postal code</li>
          </ul>
        </div>
        <form onSubmit={fetchWeather}>
          <fieldset>
            <label>
              Enter location
              <input
                type='text'
                value={location}
                placeholder='seattle,wa'
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            <button type='submit'>Get Weather</button>
          </fieldset>
        </form>

        <h2>Current Conditions</h2>
        {loading && <p style={{ color: "#CCC" }}>Fetching weather data...</p>}
        {error && <p style={{ color: "red" }}>Something went wrong...</p>}

        {tempC && <p>{tempC} degrees Celcius</p>}
        {tempF && <p>{tempF} degrees Fahrenheit</p>}

        {conditions && <p>{conditions}</p>}
        {!location && !loading && <p>Please enter a location</p>}
      </main>
    </div>
  );
}

export default App;
