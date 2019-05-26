import React, { createContext, useState } from "react";
import axios from "axios";

import WeatherComponent from "../Components/weatherComponent";

const WeatherContext = createContext();

const apiDomain = `http://localhost:4000`;

const WeatherContainer = () => {
  const [state, setState] = useState({
    city: [],
    forecast: [],
    fetching: false,
    displayOn: false
  });

  const fetchData = async woeid => {
    const url = `${apiDomain}/weather/location`;

    if (woeid !== "") {
      setState({ ...state, fetching: true });
      let req = await axios.post(url, {
        woeid
      });
      let { data } = await req.data;
      setState({ ...state, forecast: data, fetching: false, displayOn: true });
    } else {
      setState({ ...state, forecast: [], fetching: false, displayOn: false });
    }
  };

  const searchCity = async city => {
    const url = `${apiDomain}/weather/city`;
    if (city !== "") {
      setState({ ...state, fetching: true });
      let req = await axios.post(url, {
        city
      });
      let { data } = await req.data;
      setState({
        ...state,
        forecast: [],
        city: data,
        fetching: false,
        displayOn: false
      });
    } else {
      console.log("empty city");
      setState({ ...state, city: [], fetching: false, displayOn: false });
    }
  };

  const onButtonClick = string => {
    if (string === "clear") {
      setState({ ...state, displayOn: false });
    }
  };

  return (
    <div className="container">
      <WeatherContext.Provider
        value={{ state, fetchData, searchCity, onButtonClick }}
      >
        <WeatherComponent />
      </WeatherContext.Provider>
    </div>
  );
};

export { WeatherContainer, WeatherContext };
