import axios from "axios";

const apiKey = process.env.API_KEY_WEATHER;
const apiUrl = process.env.API_URL_WEATHER;

const getWeather = async (cityName) => {
  const url = `${apiUrl}?q=${encodeURIComponent(
    cityName
  )}&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.cod === 200) {
      return {
        city: data.name,
        country: data.sys.country,
        temp: data.main.temp,
        tempMax: data.main.temp_max,
        tempMin: data.main.temp_min,
        description: data.weather[0].description,
        tempIcon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
      };
    } else {
      throw new Error("Cidade não encontrada");
    }
  } catch (error) {
    throw {
      status: 400,
      message: "Não foi possível obter os dados da cidade pretendida.",
    };
  }
};

export default { getWeather, exe };
