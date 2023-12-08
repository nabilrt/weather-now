export const inputReducer = (state, action) => {
  switch (action.type) {
    case "SET_COUNTRY":
      return {
        ...state,
        country: action.payload,
      };
    case "SET_CITY":
      return {
        ...state,
        city: action.payload,
      };
    case "SET_CITIES":
      return {
        ...state,
        cities: action.payload,
      };
    case "SET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
      };
    case "SET_WEATHER_CONDITIONS":
      return {
        ...state,
        weatherCondition: action.payload,
      };
    case "SET_WEATHER_LOCATION":
      return {
        ...state,
        weatherLocation: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: !state.loading,
      };
    default:
      throw new Error();
  }
};
