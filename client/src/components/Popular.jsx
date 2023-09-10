import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { message } from "antd";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

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
    <div>
      <Carousel>
        <h2>Most Popular</h2>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: true,
            drag: "free",
            gap: "1rem",
          }}
        >
          {popular &&
            popular.length > 0 &&
            popular.map((recipe) => (
              <SplideSlide key={recipe.id}>
                <Card>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Button
                    onClick={() => addToFavorites(recipe.id, recipe.title)}
                  >
                    Add to Favorite List
                  </Button>
                </Card>
              </SplideSlide>
            ))}
        </Splide>
      </Carousel>
    </div>
  );
}

const Carousel = styled.div`
  margin: 4rem 25rem;
  text-align: center;
`;

const Card = styled.div`
  min-height: 19rem;
  overflow: hidden;
  position: relative;

  img {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    bottom: 0; /* Position the text at the bottom of the card */
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7); /* Add a semi-transparent background */
    color: white;
    font-weight: bold;
    padding: 8px;
    margin: 0;
  }
`;


const Button = styled.button`
  background-color: #000;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  position: absolute;
  bottom: 8px; /* Adjust the bottom spacing as needed */
  left: 50%;
  transform: translateX(-50%); /* Center the button horizontally */
`;

export default Popular;

