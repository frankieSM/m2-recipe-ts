import React, { useEffect, useState } from "react";
import styled from "styled-components";

function Popular() {
  const [popular, setPopular] = useState([]);

  // Running the function
  useEffect(() => {
    getPopular();
  }, []);

  // Fetching recipes from Spoonacular API
  const getPopular = async () => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8`
    );
    const data = await api.json();
    console.log(data);
    setPopular(data.recipes);
  };

  return (
    <div>
      <h2>Popular Recipes</h2>
      {popular.map((recipe) => {
        return (
          <Carousel>
            <h2>Popular Recipes</h2>
            {popular.map((recipe) => {
              return (
                <Card>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                </Card>
              );
            })}
          </Carousel>
        );
      })}
    </div>
  );
}

const Carousel = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 25rem;
`;

export default Popular;
