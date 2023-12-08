import { createContext, useContext } from "react";
import { inputReducer } from "@/lib/reducers/inputReducer";
import * as data from "../../lib/data/countries+cities.json";
import { useEffect, useReducer, useState, useTransition } from "react";
import toast from "react-hot-toast";

export const WeatherProvider = createContext();

export const WeatherContextProvider = ({ children }) => {
  const [isPending, startTransition] = useTransition();
  const [state, dispatch] = useReducer(inputReducer, {
    country: "",
    city: "",
    cities: [],
    countries: [],
    weatherCondition: {},
    weatherLocation: {},
    loading: false,
  });

  const handleCountry = (country) => {
    dispatch({ type: "SET_WEATHER_CONDITIONS", payload: {} });
    dispatch({ type: "SET_WEATHER_LOCATION", payload: {} });
    dispatch({ type: "SET_COUNTRY", payload: country });
  };

  const handleCity = (city) => {
    dispatch({ type: "SET_WEATHER_CONDITIONS", payload: {} });
    dispatch({ type: "SET_WEATHER_LOCATION", payload: {} });
    dispatch({ type: "SET_CITY", payload: city });
  };

  useEffect(() => {
    const countries = data.map((country) => {
      return {
        value: country.name,
        label: country.name,
        city: country.cities,
        iso2: country.iso2,
        lattitude: country.latitude,
        longitude: country.longitude,
      };
    });
    dispatch({ type: "SET_COUNTRIES", payload: countries });
  }, []);

  useEffect(() => {
    dispatch({ type: "SET_CITY", payload: "" });

    startTransition(() => {
      const cities =
        state.country &&
        state.country.city.map((country) => {
          return {
            value: country.name,
            label: country.name,
            lattitude: country.latitude,
            longitude: country.longitude,
          };
        });
      dispatch({ type: "SET_CITIES", payload: cities });
    });
  }, [state.country]);

  const fetchWeather = async (country, city) => {
    dispatch({ type: "SET_LOADING" });
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "312ea9c4a3mshabe143b47a6b33fp1306dejsn27b9150a4e53",
        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
      },
    };
    if (country !== "" && city !== "") {
      const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city.lattitude}%2C${city.longitude}`;
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);

        toast.success("Weather Fetching Successful", {
          duration: 2000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setTimeout(() => {
          dispatch({ type: "SET_WEATHER_CONDITIONS", payload: result.current });
          dispatch({ type: "SET_WEATHER_LOCATION", payload: result.location });
          dispatch({ type: "SET_LOADING" });
        }, 2000);
      } catch (error) {
        toast.error("Unable to Fetch Data", {
          duration: 2000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } else {
      const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${country.lattitude}%$2C${country.longitude}`;
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setTimeout(() => {
          dispatch({ type: "SET_WEATHER_CONDITIONS", payload: result.current });
          dispatch({ type: "SET_WEATHER_LOCATION", payload: result.location });
          dispatch({ type: "SET_LOADING" });
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const clearInputs = () => {
    dispatch({ type: "SET_COUNTRY", payload: "" });
    dispatch({ type: "SET_CITY", payload: "" });
    dispatch({ type: "SET_WEATHER_CONDITIONS", payload: {} });
  };

  return (
    <WeatherProvider.Provider
      value={{
        state,
        dispatch,
        handleCountry,
        handleCity,
        fetchWeather,
        clearInputs,
        isPending,
      }}
    >
      {children}
    </WeatherProvider.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherProvider);
  if (context === undefined) {
    throw new Error("useWeather must be used within WeatherProvider");
  }
  return context;
};
