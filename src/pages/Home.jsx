import Search from "../components/Search";
import Popular from "../components/Popular";
import Desserts from "../components/desserts";

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
