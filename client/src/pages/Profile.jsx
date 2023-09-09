import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Typography, List, Button, message } from "antd";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Container = styled.div`
  padding: 20px;
  background-color: #f7f7f7;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  gap: 20px;

  text-align: center;
  width: 100%;
  align-items: center;
`;

const UserInfoContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 900px;
  align-self: center;

  h1 {
    color: blue;
  }
`;

const FavoriteRecipesContainer = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 900px;

  h1 {
    color: blue;
  }
`;

const RecipeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #e0e0e0;

  h4 {
    margin: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled(Button)`
  &:hover {
    transform: translateY(-2px);
  }
`;

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data including favorite recipes from the backend based on the 'id' parameter
    try {
      axios.get(`http://localhost:3001/profile/${id}`).then((response) => {
        setUser(response.data.user);
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // Function to handle viewing a recipe (you can implement this)
  const handleViewRecipe = (recipeId) => {
    // Implement the logic to view a specific recipe
    navigate(`/recipe/recipe/${recipeId}`);
  };

  // Function to handle removing a recipe (you can implement this)
  const handleRemoveRecipe = async (recipeId) => {
    // Implement the logic to remove a specific recipe
    const newRecipes = user.recipes.filter((recipe) => recipe.id !== recipeId);
    setUser({ ...user, recipes: newRecipes });

    try {
      const response = await axios.post(
        `http://localhost:3001/deleteRecipe/${id}`,
        { recipeId }
      );
      console.log(response.data);

      if (response.status === 200) {
        message.success("Recipe removed from favorites");
      } else {
        message.error("Recipe not removed from favorites");
      }
    } catch (error) {
      console.error("Error removing from favorites:", error);
      message.error("Recipe not removed from favorites");
    }
  };

  return (
    <Container>
      <Col>
        <UserInfoContainer>
          <h1>Profile Info 👤</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>age</strong> {user.age}
            </p>
            <p>
              <strong>gender</strong> {user.gender}
            </p>
          </div>
        </UserInfoContainer>
      </Col>
      <Col>
        <FavoriteRecipesContainer>
          <h1 level={3}>Favorite Recipes 😋</h1>
          <List
            dataSource={user.recipes}
            renderItem={(recipe) => (
              <RecipeItem>
                <h4>{recipe.title}</h4>
                <ButtonContainer>
                  <ActionButton
                    type="primary"
                    onClick={() => handleViewRecipe(recipe.id)}
                  >
                    View
                  </ActionButton>
                  <ActionButton
                    type="danger"
                    onClick={() => handleRemoveRecipe(recipe.id)}
                  >
                    Remove
                  </ActionButton>
                </ButtonContainer>
              </RecipeItem>
            )}
          />
        </FavoriteRecipesContainer>
      </Col>
    </Container>
  );
}

export default UserProfile;
