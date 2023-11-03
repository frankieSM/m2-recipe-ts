import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { message } from "antd";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

function Desserts() {
  const [desserts, setDesserts] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    getDesserts();
  }, []);

  const getDesserts = async () => {
    try {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=8&tags=dessert`
      );
      const data = await api.json();
      setDesserts(data.recipes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dessert recipes:", error);
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
        <h2>Sweet Treats</h2>
        <Splide
          options={{
            perPage: 4,
            arrows: false,
            pagination: true,
            drag: "free",
            gap: "1rem",
          }}
        >
          {desserts &&
            desserts.length > 0 &&
            desserts.map((recipe) => (
              <SplideSlide key={recipe.id}>
                <Card>
                  <CardTitle>{recipe.title}</CardTitle>
                  <CardImage src={recipe.image} alt={recipe.title} />
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
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: #white;
  color: black;
  border: 2px solid black;
  padding: 5px 10px;
  cursor: pointer;
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardTitle = styled.p`
  background: linear-gradient(35deg, #a32b21, #761d14);
  color: white;
  font-weight: bold;
  padding: 8px;
  margin: 0;
`;

export default Desserts;
