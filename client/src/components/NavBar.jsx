import React from "react";
import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";


function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

//   const navigate = useNavigate();

// const handleViewRecipe = (recipeName) => {
//   navigate(`/recipe/${recipeName}`);
// };


  const userId = localStorage.getItem("userId");
  return (
    <Nav>
      <Logo
        onClick={() => {
          window.location.href = "/recipe";
        }}
      >
        DishDelight
      </Logo>
      <CategoryLinks>
        <StyledNavLink to="cuisine/Italian">
          <FaPizzaSlice />
          <h4>Italian</h4>
        </StyledNavLink>
        <StyledNavLink to="cuisine/American">
          <FaHamburger />
          <h4>American</h4>
        </StyledNavLink>
        <StyledNavLink to="cuisine/Thai">
          <GiNoodles />
          <h4>Thai</h4>
        </StyledNavLink>
        <StyledNavLink to="cuisine/Japanese">
          <GiChopsticks />
          <h4>Japanese</h4>
        </StyledNavLink>
      </CategoryLinks>
      <AuthButtons>
        <NavLink to={`profile/${userId}`}>
          <ProfileIcon>👤</ProfileIcon>
        </NavLink>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </AuthButtons>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  color: white;
  padding: 1rem;
`;

const Logo = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const CategoryLinks = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  display: flex;

  align-items: center;
  gap: 4px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff9900; /* Change the color on hover */
  }

  h4 {
    font-size: 18px;
  }
`;

const ProfileIcon = styled.div`
  background-color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(0.9);
  }
`;

const LogoutButton = styled.button`
  background-color: #ff4d4d;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(0.9);
  }
`;

export default Navbar;
