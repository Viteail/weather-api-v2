const query = (args) => document.querySelector(args);

const showForecast = () => {
  const forecastContent = query('#forecast-content');
  forecastContent.classList.remove('hidden');
};

const displayData = (weatherData) => {
  const country = query('#country');
  const name = query('#name');
  const temp = query('#temp');
  const humidity = query('#humidity');
  const wind = query('#wind');
  const condition = query('#condition');
  const conditionImg = query('#condition-img');

  country.textContent = weatherData.location.country;
  name.textContent = weatherData.location.name;
  temp.textContent = `Temp: ${weatherData.current.temp_c}°C`;
  humidity.textContent = `Humidity: ${weatherData.current.humidity}%`;
  wind.textContent = `Wind Speed: ${weatherData.current.wind_kph}kph`;
  condition.textContent = weatherData.current.condition.text;
  conditionImg.src = weatherData.current.condition.icon;

  showForecast();
};

const toggleTemperatureUnits = (weatherData) => {
  const switchTemperature = query('#celsiusToFahrenheit');
  const tempUnit = query('#temperature-unit');
  const temp = query('#temp');

  const handleUnitSwithClick = () => {
    if (temp.textContent === `Temp: ${weatherData.current.temp_c}°C`) {
      temp.textContent = `Temp: ${weatherData.current.temp_f}°F`;
      tempUnit.textContent = '°C';
    } else {
      temp.textContent = `Temp: ${weatherData.current.temp_c}°C`;
      tempUnit.textContent = '°F';
    }
  };

  switchTemperature.onclick = handleUnitSwithClick;
};

const getWeatherData = async (value) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=f6a4745e7640473f804123545230609&q=${value}`,
    );
    const weatherData = await response.json();
    console.log(weatherData);
    displayData(weatherData);
    toggleTemperatureUnits(weatherData);
  } catch {
    console.log('error');
  }
};

const attachEventSearch = () => {
  const searchBar = query('#input-location');
  const searchBtn = query('#search');

  searchBtn.addEventListener('click', () => {
    getWeatherData(searchBar.value);
  });

  searchBar.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchBtn.click();
    }
  });
};

attachEventSearch();
