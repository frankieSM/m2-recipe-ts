import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { message } from "antd";
function Popular() {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    try {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8`
      );
      const data = await api.json();
      setPopular(data.recipes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching popular recipes:", error);
      setLoading(false);
    }
  };

  const addToFavorites = async (recipeId, recipeTitle) => {
    try {
      const response = await axios.post(
        `http://localhost:3001/addRecipe/${userId}`,
        {
          recipeId,
          recipeTitle,
        }
      );
      console.log(response.data);

      if (response.status === 201) {
        message.success("Recipe added to favorites");
      } else {
        message.error("Recipe not added to favorites");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error);
      message.error("Recipe not added to favorites");
    }
  };

  return (
    <Container>
      <h2>Popular Recipes</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <RecipeList>
          {popular.map((recipe) => (
            <RecipeCard key={recipe.id}>
              <RecipeImage src={recipe.image} alt={recipe.title} />
              <RecipeTitle>{recipe.title}</RecipeTitle>
              <Button onClick={() => addToFavorites(recipe.id, recipe.title)}>
                Add to Favorite List
              </Button>
            </RecipeCard>
          ))}
        </RecipeList>
      )}
    </Container>
  );
}

const Container = styled.div`
  padding: 20px;
`;

const RecipeList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const RecipeCard = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const RecipeImage = styled.img`
  max-width: 100%;
  height: auto;
`;

const RecipeTitle = styled.h3`
  margin: 10px 0;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default Popular;
