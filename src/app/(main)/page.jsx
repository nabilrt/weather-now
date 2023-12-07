"use client";
import Select, { SingleValue } from "react-select";
import * as data from "../../lib/countries+cities.json";
import { useEffect, useState } from "react";
import Button from "@/modules/button";

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const handleCountry = (country) => {
    setCountry(country);
  };

  const handleCity = (city) => {
    setCity(city);
  };

  useEffect(() => {
    const countries = data.map((country) => {
      return {
        value: country.name,
        label: country.name,
        city: country.cities,
        lattitude: country.lattitude,
        longitude: country.longitude,
      };
    });
    setCountries(countries);
  }, []);

  useEffect(() => {
    setCities([]);
    setCity("");
    const cities =
      country &&
      country.city.map((country) => {
        return { value: country.name, label: country.name };
      });
    setCities(cities);
  }, [country]);

  return (
    <div className="text-center">
      <h1 className="text-xl font-bold mb-4">Weather App</h1>
      <div className="flex flex-col mb-4 ">
        <div className="flex flex-row mt-4 space-x-3 justify-center">
          <Select
            options={countries}
            value={country}
            onChange={(e) => handleCountry(e)}
            isSearchable={true}
            placeholder="Select Country"
            className="w-1/4"
          />

          <Select
            options={cities}
            value={city}
            onChange={(e) => handleCity(e)}
            isDisabled={cities.length === 0}
            isSearchable={true}
            placeholder="Select City"
            className="w-1/4"
          />
          <Button variant="primary" disabled={!country}>Search</Button>
          <Button variant="danger" disabled={!country} onClick={()=>{
            setCountry("");
            setCity("");
          }}>Clear</Button>
        </div>
        
      </div>
    </div>
  );
};

export default HomePage;
