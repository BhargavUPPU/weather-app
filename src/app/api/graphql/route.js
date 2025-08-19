import axios from "axios";
// import { ApolloServer } from "@apollo/server";
// import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

const API_KEY = "7ccd1310134c7365d63e52adc46507b8";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

const typeDefs = `#graphql
  type Weather {
    name: String
    main: Main
    weather: [WeatherDescription]
    wind: Wind
  }

  type Main {
    temp: Float
    humidity: Int
  }

  type WeatherDescription {
    description: String
  }

  type Wind {
    speed: Float
  }

  type Forecast {
    list: [ForecastItem]
  }

  type ForecastItem {
    dt_txt: String
    main: Main
    weather: [WeatherDescription]
  }

  type Query {
    weatherByCity(city: String!): Weather
    forecastByCity(city: String!): Forecast
    weatherByCoords(lat: Float!, lon: Float!): Weather
  }
`;

const resolvers = {
  Query: {
    weatherByCity: async (_, { city }) => {
      const res = await axios.get(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      return res.data;
    },
    forecastByCity: async (_, { city }) => {
      const res = await axios.get(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      return res.data;
    },
    weatherByCoords: async (_, { lat, lon }) => {
      const res = await axios.get(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      return res.data;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const GET = startServerAndCreateNextHandler(server);
export const POST = startServerAndCreateNextHandler(server);
