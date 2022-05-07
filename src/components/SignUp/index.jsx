import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import { Button } from "../Button";
import { Input } from "../Input";

export function SignUp() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange = (e) => {
    switch(e.target.id) {
      case 'nameInput': 
        console.log(e.target.id);
        setUserData({ ...userData, name: e.target.value });
      break;

      case 'emailInput':
        console.log(e.target.id);
        setUserData({ ...userData, email: e.target.value });
      break;

      case 'passwordInput':
        console.log(e.target.id);
        setUserData({ ...userData, password: e.target.value });
      break;

      case 'confirmInput':
        console.log(e.target.id);
        setUserData({ ...userData, confirm: e.target.value });
      break;

      default : 
        console.log("Unexpected input!")
      break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  const registerUser = async () => {
    // api url: https://project-mywallet-api.herokuapp.com/
    const API_URL = "https://project-mywallet-api.herokuapp.com/sign-up";
    const { name, email, password, confirm } = userData;

    const body = {
      name,
      email
    };
    const config = {
      headers: {
        Password: password,
        Confirm: confirm
      }
    };

    setLoading(!loading);
    const promise = axios.post(API_URL, body, config);
    promise.then((response) => {
      setLoading(false);
      console.log(response)
    })
    promise.catch (error =>  {
      console.error("⚠ Couldn't create user!", error)
      setLoading(false);
    })
  }

  return (
    <SignUpComponent>
      <header>
        <h1>MyWallet</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <Input
          handleChange={handleChange}
          value={userData.name}
          placeholder="Nome"
          name="nameInput"
          id="nameInput"
        />
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
        <Input
          handleChange={handleChange}
          value={userData.confirm}
          placeholder="Confirme a senha"
          type="password"
          name="confirmInput"
          id="confirmInput"
        />
        <Button text="Cadastrar" loading={loading} />
      </form>

      <Link to="/sign-in" >Já tem uma conta? Entre agora!</Link>
    </SignUpComponent>
  );
}

const SignUpComponent = styled.section`
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
      -webkit-text-stroke-width: .1px;
      cursor: pointer;
    }
  }
`;
