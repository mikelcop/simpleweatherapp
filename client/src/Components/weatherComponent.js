import React, { Fragment } from "react";

import { HeaderComponent, SearchComponent, Forecast } from "./Weather";

const Weather = props => {
  return (
    <Fragment>
      <HeaderComponent />
      <SearchComponent />
      <Forecast />
    </Fragment>
  );
};

export default Weather;
