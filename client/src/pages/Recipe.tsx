import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import React from "react";

interface RecipeDetails {
  title: string;
  image: string;
  id: number;
  summary: string;
  instructions: string;
  extendedIngredients: Ingredient[];
}

interface Ingredient {
  id: number;
  original: string;
}

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState<RecipeDetails | null>(null);
  const [activeTab, setActiveTab] = useState("instructions");

  const userId = localStorage.getItem("userId");

  const fetchDetails = async () => {
    try {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const detailData: RecipeDetails = await data.json();
      setDetails(detailData);
      console.log(detailData);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  const addToFavorites = async (
    recipeId: number | undefined,
    recipeTitle: string | undefined
  ) => {
    if (recipeId && recipeTitle) {
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
    }
  };

  return (
    <DetailWrapper>
      <div>
        <h2>{details?.title}</h2>
        <img src={details?.image} alt="" />
        <Button onClick={() => addToFavorites(details?.id, details?.title)}>
          Add to Favorite List
        </Button>
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>
        {activeTab === "instructions" && (
          <div>
            <h3
              dangerouslySetInnerHTML={{ __html: details?.summary || "" }}
            ></h3>
            <h3
              dangerouslySetInnerHTML={{ __html: details?.instructions || "" }}
            ></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details?.extendedIngredients?.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe;
