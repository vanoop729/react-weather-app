import React from "react";
import "./form.style.css";

const Weather = (props) => {
  return (
    <div className="container text-light height-100-css">
      <div className="cards pt-4">
        <h1>{props.city}</h1>
        <h5 className="py-4">
          <i className={`wi ${props.weatherIcon} display-1`}></i>
        </h5>

        {props.temp_celsius ? (
          <h1 className="py-2">{props.temp_celsius}&deg;</h1>
        ) : null}

        {/* Show Min and Max temp */}
        {minmaxTemp(props.temp_min, props.temp_max)}

        <h4 className="capitalize py-3">{props.description}</h4>
      </div>
    </div>
  );
};

const minmaxTemp = (min, max) => {
  if (min || max) {
    return (
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    );
  }
};

export default Weather;
