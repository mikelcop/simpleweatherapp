import React, { useState, useContext } from "react";
import { css } from "glamor";
import searhImage from "../../static/search.png";

import { WeatherContext } from "../../Containers/weatherContainer";

const SearchComponent = () => {
  const Context = useContext(WeatherContext);

  const { city, displayOn } = Context.state;
  const [state, setState] = useState({ searchValue: "" });

  const searchCityName = e => {
    const stringToSearch = e.target.value.trim();
    setState({ searchValue: e.target.value });
    if (stringToSearch !== "") {
      Context.searchCity(stringToSearch);
    }
  };

  const getWeather = woeid => {
    Context.fetchData(woeid);
  };

  const resultList = () => {
    if (city && city.length > 0) {
      return city.map(item => {
        return (
          <div className={resultBox} key={item.woeid}>
            <div className={resultItem} onClick={() => getWeather(item.woeid)}>
              {item.title}
            </div>
          </div>
        );
      });
    }
  };

  // if (displayOn) {
  //   return null;
  // }
  return (
    <div className={displayOn ? "searchBoxSlideOut" : "searchBoxSlideIn"}>
      <div className={inputTitleStyle}>Enter a City Name</div>
      <div className={inputBox}>
        <input
          className={inputStyle}
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChange={e => searchCityName(e)}
          value={state.searchValue}
        />
        {resultList()}
      </div>
    </div>
  );
};

const box = css({
  display: "flex",
  flex: 1,
  padding: 20,
  justifyContent: "center",
  flexWrap: "wrap",
  transform: "translate(0, 50px)",
  transition: "transform 1000ms ease-in-out"
});

const boxOut = css({
  transform: "translate(1600px, 50px)",
  transition: "all 800ms ease-in-out"
});

const inputBox = css({
  marginTop: 30,
  position: "absolute",
  width: "50%",
  border: "1px dotted gray",
  boxShadow:
    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);",
  "@media only screen and (max-width: 700px)": {
    width: "100%"
  }
});

const inputTitleStyle = css({
  width: "100%",
  textAlign: "center"
});

const inputStyle = css({
  width: "100%",
  textIndent: 50,
  backgroundImage: `url(${searhImage})`,
  backgroundPosition: "left",
  backgroundRepeat: "no-repeat",
  backgroundSize: 30
});

const resultBox = css({
  flex: "1 0 100%",
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  backgroundColor: "#d1edf0",
  ":nth-child(even)": {
    backgroundColor: "#ace1e7"
  }
});

const resultItem = css({
  flex: 1,
  padding: "5px 20px"
});

export { SearchComponent };
