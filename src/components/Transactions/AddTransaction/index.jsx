import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import styled from "styled-components";
import axios from "axios";

import { Input } from "../../Input";
import { Button } from "../../Button";
import UserContext from "../../../contexts/UserContext";

export function AddTransaction() {
  const [loading, setLoading] = useState(false);
  const [transactionData, setTransactionData] = useState({
    amount: "",
    description: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const isIncome = location.pathname.includes("income");

  const { token, setToken } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const localToken = localStorage.getItem("token");

    if (token === "" && localToken !== null && localToken.length > 0) {
      setToken(localToken);
      window.location.reload();
    }
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    switch (e.target.id) {
      case "amountInput":
        console.log(e.target.id);
        // TODO mask input
        setTransactionData({ ...transactionData, amount: e.target.value });
        break;

      case "descriptionInput":
        console.log(e.target.id);
        setTransactionData({ ...transactionData, description: e.target.value });
        break;

      default:
        console.log("Unexpected input!");
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction();
    } catch (err) {
      console.error("⚠ Error adding transaction!");
    }
  };

  const addTransaction = async () => {
    const API_URL = "https://project-mywallet-api.herokuapp.com/transactions";
    const type = isIncome ? "income" : "expense";

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const body = {
      type,
      ...transactionData,
    };

    setLoading(!loading);
    try {
      await axios.post(API_URL, body, config);
      navigate("/transactions");

      setLoading(false);
    } catch (err) {
      console.error("⚠ Error adding transaction!");
      setLoading(false);
    }
  };

  return (
    <AddTransactionComponent>
      <header>
        <h1>{isIncome ? "Nova entrada" : "Nova saída"}</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <Input
          handleChange={handleChange}
          value={transactionData.amount}
          placeholder="Valor"
          name="amountInput"
          id="amountInput"
        />
        <Input
          handleChange={handleChange}
          value={transactionData.description}
          placeholder="Descrição"
          name="descriptionInput"
          id="descriptionInput"
        />
        <Button
          text={isIncome ? "Salvar entrada" : "Salvar saída"}
          loading={loading}
        />
      </form>
    </AddTransactionComponent>
  );
}

const AddTransactionComponent = styled.article`
  height: 100vh;
  margin: 0 1.5rem;

  display: flex;
  flex-direction: column;

  scroll-behavior: smooth;
  overflow-y: hidden;

  header {
    margin: 1.5625rem 0;

    font-family: "Raleway", sans-serif;
    font-weight: 700;
    font-size: 1.625rem;
    color: #fff;
  }
`;
