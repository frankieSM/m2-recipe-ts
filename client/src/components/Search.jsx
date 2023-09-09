import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("searched/" + input);
  };

  return (
    <StyledForm onSubmit={submitHandler}>
      <input
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Hungry? Start here..."
        value={input}
      />
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
  margin-top: 2rem;
  height: 60px;
  background: linear-gradient(35deg, #a32b21, #761d14);
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  input {
    border: none;
    background: linear-gradient(35deg, #a32b21, #761d14);
    font-size: 1.5rem;
    color: white;
    padding: 1rem 3rem;
    border-radius: 1rem;
    outline: none;
    flex: 1;
  }

  .gradient-end {
    flex: 0.1;
    background: linear-gradient(to right, rgba(163, 43, 33, 0), #a32b21);
    width: 100px;
    height: 100%;
  }
`;

export default Search;
