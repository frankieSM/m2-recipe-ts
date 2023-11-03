import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Searched() {
  const [searchedRecipes, setSearchedRecipes] = useState([]);
  let params = useParams();

  const getSearched = async (name: string | undefined) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
    );

    // Log the API URL for troubleshooting
    console.log("API URL:", data.url);

    const recipes = await data.json();
    setSearchedRecipes(recipes.results);

    // Log the fetched recipes for troubleshooting
    console.log("Fetched Recipes:", recipes.results);
  };

  useEffect(() => {
    getSearched(params.search);

    // Log the search term from URL for troubleshooting
    console.log("Search Term from URL:", params.search);
  }, [params.search]);

  // Log the searchedRecipes array for troubleshooting
  console.log("Searched Recipes Array:", searchedRecipes);

  return (
    <RecipeGrid>
      {searchedRecipes.map((recipe) => (
        <RecipeCardContainer key={recipe.id}>
          <Link to={"/recipe/recipe/" + recipe.id}>
            <RecipeImage src={recipe.image} alt={recipe.title} />
            <RecipeTitle>{recipe.title}</RecipeTitle>
          </Link>
        </RecipeCardContainer>
      ))}
    </RecipeGrid>
  );
}

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Three equal-width columns */
  gap: 16px; /* Spacing between cards */
  margin-top: 30px;
`;

const RecipeCardContainer = styled.div`
  width: 300px;
  margin: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover:before {
    opacity: 1;
  }
`;

const RecipeTitle = styled.h3`
  font-size: 1.2rem;
  padding: 16px;
  text-align: center;
  color: #333;
`;

export default Searched;
