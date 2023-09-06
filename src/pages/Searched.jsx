import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const getSearched = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );
    const recipes = await data.json();
    setSearchedRecipes(recipes.results);
  };
  return <div>Searched</div>;
}

export default Searched;
