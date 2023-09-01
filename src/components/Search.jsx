import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <input type="text" placeholder="Hungry? Start here..." />
    </StyledForm>
  );
}

const StyledForm = styled.form`
  margin: 0rem 20rem;
  position: relative;
  width: 100%;
  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 0%;
    color: white;
  }
`;

export default Search;
