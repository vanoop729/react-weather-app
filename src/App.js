import React from "react";
import "./App.css";
import Form from "./components/form.component";
import Weather from "./components/weather.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "./weather-icons/css/weather-icons.css";

const API_KEY = "8c561b585a38e20a6f4c64315fd7d6df";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }

  calculateCelsius = (temp) => {
    let cel = Math.floor(temp - 273.15);
    return cel;
  };

  getWeatherIcon = (rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;

      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;

      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;

      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;

      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;

      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;

      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;

      default:
        this.setState({ icon: this.weatherIcon.Clouds });
    }
  };

  // API call: api.openweathermap.org/data/2.5/weather?q=London,uk&appid={API key}
  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city && country) {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
      );

      const response = await api_call.json();

      if (response.cod !== 200) {
        this.setState({ error: true });

        return;
      }

      this.setState({
        city: `${response.name}, ${response.sys.country}`,
        celsius: this.calculateCelsius(response.main.temp),
        temp_max: this.calculateCelsius(response.main.temp_max),
        temp_min: this.calculateCelsius(response.main.temp_min),
        description: response.weather[0].description,
        error: false,
      });

      this.getWeatherIcon(response.weather[0].id);
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          temp_celsius={this.state.celsius}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
