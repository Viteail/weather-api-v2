const getWeatherData = async () => {
  try {
    const response = await fetch('https://api.weatherapi.com/v1/current.json?key=f6a4745e7640473f804123545230609&q=london');
    const weatherData = await response.json();
    console.log(weatherData);
  } catch {
    console.log('error');
  }
};

// getWeatherData();
