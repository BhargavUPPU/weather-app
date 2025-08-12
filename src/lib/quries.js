import { gql } from "@apollo/client";

export const GET_WEATHER_BY_CITY = gql`
  query WeatherByCity($city: String!) {
    weatherByCity(city: $city) {
      name
      main {
        temp
        humidity
      }
      weather {
        description
      }
      wind {
        speed
      }
    }
  }
`;

export const GET_FORECAST_BY_CITY = gql`
  query ForecastByCity($city: String!) {
    forecastByCity(city: $city) {
      list {
        dt_txt
        main {
          temp
        }
        weather {
          description
        }
      }
    }
  }
`;

export const GET_WEATHER_BY_COORDS = gql`
  query WeatherByCoords($lat: Float!, $lon: Float!) {
    weatherByCoords(lat: $lat, lon: $lon) {
      name
      main {
        temp
        humidity
      }
      weather {
        description
      }
      wind {
        speed
      }
    }
  }
`;
