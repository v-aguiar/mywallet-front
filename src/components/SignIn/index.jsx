import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";

import { Button } from "../Button";
import { Input } from "../Input";
import UserContext from "../../contexts/UserContext";

export function SignIn() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    switch (e.target.id) {
      case "emailInput":
        console.log(e.target.id);
        setUserData({ ...userData, email: e.target.value });
        break;

      case "passwordInput":
        console.log(e.target.id);
        setUserData({ ...userData, password: e.target.value });
        break;

      default:
        console.log("Unexpected input!");
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    enterApp();
  };

  const enterApp = async () => {
    const API_URL = "https://project-mywallet-api.herokuapp.com/sign-in";
    // const API_URL = "http://localhost:5000/sign-in";
    const { email, password } = userData;

    const body = {
      email,
    };
    const config = {
      headers: {
        "Password": password,
      },
    };

    setLoading(!loading);
    axios.post(API_URL, body, config)
      .then((response) => {
        setLoading(false);
        setToken(response.data.token);
        navigate("/transactions")
        })
      .catch((error) => {
        console.error("⚠ Couldn't create user!", error);
        setLoading(false);
      });
  };

  return (
    <SignInComponent>
      <header>
        <h1>MyWallet</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <Input
          handleChange={handleChange}
          value={userData.email}
          placeholder="E-mail"
          name="emailInput"
          id="emailInput"
        />
        <Input
          handleChange={handleChange}
          value={userData.password}
          placeholder="Senha"
          type="password"
          name="passwordInput"
          id="passwordInput"
        />
        <Button text="Entrar" loading={loading} />
      </form>

      <Link to="/sign-up">Primeira vez? Cadastre-se!</Link>
    </SignInComponent>
  );
}

const SignInComponent = styled.section`
  height: 100vh;
  margin: 0 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  scroll-behavior: smooth;
  overflow-y: hidden;

  header {
    margin-bottom: 1.75rem;

    h1 {
      font-family: "Saira Stencil One", cursive;
      font-weight: 700;
      font-size: 2rem;

      color: #fff;
    }
  }

  a {
    font-family: "Raleway", sans-serif;
    font-weight: 700;
    font-size: 0.9375rem;
    color: #fff;

    text-decoration: none;
    transition: all 0.4s ease-in-out;

    &:hover {
      -webkit-text-stroke-color: #fff;
      -webkit-text-stroke-width: 0.1px;
      cursor: pointer;
    }
  }
`;
