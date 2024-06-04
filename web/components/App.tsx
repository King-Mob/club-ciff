import React from "react";
import Home from "./Home";
import Film from "./Film";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const filmId = urlParams.get("filmId");

const App = () => {
  if (filmId) {
    return <Film id={filmId} />;
  } else return <Home />;
};

export default App;
