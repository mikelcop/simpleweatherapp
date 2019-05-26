import React, { useContext } from "react";
import { css } from "glamor";
import { WeatherContext } from "../../Containers/weatherContainer";
import { Loader } from "../Commons";
import backArrow from "../../static/backArrow.svg";

const Forecast = () => {
  const Context = useContext(WeatherContext);
  const { fetching, displayOn } = Context.state;
  const { onButtonClick } = Context;
  const { title, consolidated_weather } = Context.state.forecast;

  const forecastDetails = () => {
    if (consolidated_weather) {
      return consolidated_weather.map(item => {
        const min = parseFloat(parseFloat(item.min_temp).toFixed(1));
        const max = parseFloat(parseFloat(item.max_temp).toFixed(1));
        return (
          <div className={itemDiv} key={item.id}>
            <div className={dateGroup}>
              <div className={witem}>{item.applicable_date}</div>
              <div className={witem}>{item.weather_state_name}</div>
            </div>

            <div className={tempGroup}>
              <div className={witem}>{min}&#176;</div>
              <div className={witem}>Min</div>
            </div>

            <div className={tempGroup}>
              <div className={witem}>{max}&#176;</div>
              <div className={witem}>Max</div>
            </div>

            <div>
              <img
                src={`https://www.metaweather.com/static/img/weather/${
                  item.weather_state_abbr
                }.svg`}
                height="42"
                width="42"
              />
            </div>
          </div>
        );
      });
    }
  };

  return (
    <div className={box}>
      <div className={displayOn ? "slide-in" : "slide-out"}>
        <div style={{ width: "100%" }}>
          <span className={ButtonStyle} onClick={() => onButtonClick("clear")}>
            Back
          </span>
        </div>
        <div style={{ width: "100%" }}>
          <h2>5 Days Forecast for {title}</h2>
        </div>

        <div style={{ width: "100%" }}>{forecastDetails()}</div>
      </div>
      {fetching ? (
        <div className={loaderDiv}>
          <Loader />;
        </div>
      ) : null}
    </div>
  );
};

const dateGroup = css({
  display: "flex",
  flexWrap: "wrap",
  width: "35%"
});

const tempGroup = css({
  display: "flex",
  flexWrap: "wrap",
  width: "35%"
});

const witem = css({
  fontSize: "large",
  width: "100%",
  padding: 5
});

const box = css({
  display: "flex",
  flex: 1,
  position: "relative",
  justifyContent: "center",
  padding: 20
});

const loaderDiv = css({
  display: "flex",
  flex: 1,
  width: "100%",
  position: "absolute",
  //top: 0,
  minHeight: "90vh",
  justifyContent: "center",
  alignItems: "center"
});

const ButtonStyle = css({
  width: "100%",
  padding: "5px 5px 5px 30px",
  background: "#63cbd7",
  borderRadius: 5,
  backgroundImage: `url(${backArrow})`,
  backgroundPosition: "left",
  backgroundRepeat: "no-repeat",
  backgroundSize: 30,
  cursor: "pointer",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);"
});

const itemDiv = css({
  display: "flex",
  padding: "5px 15px",
  justifyContent: "space-between",
  backgroundColor: "#ace1e7",
  ":nth-child(even)": {
    backgroundColor: "#d1edf0",
    border: "1px dotted gray"
  }
});

export { Forecast };
