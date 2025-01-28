
# 🌦️ Weather & Movie Finder

This project is a simple application that lets users search for a city's weather and provides a related movie for that city. It uses the OpenWeather API for weather data and the OMDb API for movie information.

## ✨ Features

- **Search Weather**: Get the current weather for a specific city.
- **Find Related Movie**: Displays a movie associated with the city searched.




## 🛠 Technologies Used
- **APIs** [OpenWeather API](https://openweathermap.org/api) | [TMDB API](https://www.themoviedb.org/)


- **FRONT-END** [![My Skills](https://skillicons.dev/icons?i=html,css,javascript)](https://skillicons.dev)

- **BACK-END** [![My Skills](https://skillicons.dev/icons?i=nodejs,expressjs,supabase)](https://skillicons.dev)

- **TOOLS** [![My Skills](https://skillicons.dev/icons?i=postman,docker)](https://skillicons.dev)



## 🔗 Endpoints

- Example Weather & Movie Request:  `GET 🠊 /api/weather/?city=Porto`
#### Example request body:
```json
{
	"weather": {
		"coord": {
			"lon": -8.4201,
			"lat": 41.5503
		},
		"weather": [
			{
				"id": 500,
				"main": "Rain",
				"description": "light rain",
				"icon": "10n"
			}
		],
		"base": "stations",
		"main": {
			"temp": 9.56,
			"feels_like": 9.09,
			"temp_min": 9.56,
			"temp_max": 9.56,
			"pressure": 1027,
			"humidity": 86,
			"sea_level": 1027,
			"grnd_level": 1000
		},
		"visibility": 10000,
		"wind": {
			"speed": 1.55,
			"deg": 176,
			"gust": 1.5
		},
		"rain": {
			"1h": 0.41
		},
		"clouds": {
			"all": 100
		},
		"dt": 1738098709,
		"sys": {
			"type": 2,
			"id": 2021760,
			"country": "PT",
			"sunrise": 1738050552,
			"sunset": 1738086233
		},
		"timezone": 0,
		"id": 2742032,
		"name": "Braga",
		"cod": 200
	},
	"movies": [
		{
			"title": "Girl with the Golden Panties",
			"releaseDate": "1980-03-28",
			"poster": "https://image.tmdb.org/t/p/w500/eouh5mMl4XBUMEZZJxNwXXQldZX.jpg",
			"rating": 4.8
		}
	]
}
```

## 📥 Installation

Clone the repository:
```bash
   git clone https://github.com/Paulosouzx/Weather.git
   cd Weather
```

Install the required dependencies:
```bash
   npm install
```

Create an **.env** file in the root directory and add the following environment variables:
```bash
    API_KEY_TMDB=
    API_URL_TMDB=https://api.themoviedb.org/3/search/movie

    API_KEY_WEATHER=
    API_URL_WEATHER=https://api.openweathermap.org/data/2.5/weather

    SUPABASE_KEY=
    SUPABASE_URL=https://vxtkzbqgrtmfldgycgnx.supabase.co
```
Start the development server:
```bash
  npm run dev
```
    
## 📦 Docker Setup  
Create a **Dockerfile** in the root of your project with the following content:

### Dockerfile
```bash
FROM node:22

WORKDIR /src

COPY package*.json ./
COPY server.js ./

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```
### Docker Compose
Create a **docker-compose.yml** file in the root of your project with the following 

```bash
services:
  app:
    build:
      context: .
      dockerfile: dockerfile
    ports:
      - "5000:5000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
```

#### Build and start the Docker Compose services:
```bash
docker-compose up --build
```

#### Access the application:
After the container is built and running, you can visit ```http://localhost:5000``` in your browser.

#### Stop the services:
To stop the running services, use:
```bash
docker-compose down
```



## 📦 Docker Hub
[Docker Hub](https://hub.docker.com/r/edgarstratulat/weather-movie-application)

If you prefer to pull the image directly from Docker Hub, you can skip local builds and use:
```bash
docker pull edgarstratulat/weather-movie-application
```


## 

Developed with ❤️ by [Edgar Sousa](https://github.com/edgarstratulat), [Nicolas Silva](https://github.com/NicolasBe23), [Paulo Souza](https://github.com/Paulosouzx), [Simão Fernandes](https://github.com/simaofernandes04) & [João Taveira](https://github.com/torizzon)

