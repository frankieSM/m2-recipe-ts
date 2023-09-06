import Search from "../components/Search";
import Popular from "../components/Popular";
import Desserts from "../components/Desserts";

import React from "react";

function Home() {
  return (
    <div>
      <Search />
      <Popular />
      <Desserts />
    </div>
  );
}

export default Home;

//When pages components are finished
//render out <Pages /> instead of
//individual components
