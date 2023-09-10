import Popular from "../components/Popular";
import Search from "../components/Search";
import Desserts from "../components/Desserts";
import Vegan from "../components/Vegan";
import React from "react";

function Home() {
  return (
    <div>
      <Search />
      <Popular />
      <Desserts />
      <Vegan />
    </div>
  );
}

export default Home;
