import { useState, useContext, useEffect } from "react";

import axios from "axios";
import styled from "styled-components";
import { SignOut } from "phosphor-react";

import UserContext from "../../contexts/UserContext";

import { TransactionButton } from "./TransactionButton";

export function Transactions() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [transactions, setTransactions] = useState()

  const { token } = useContext(UserContext);

  useEffect(() => {
    getTransactions();
  }, []); //eslint-disable-line

  const getTransactions = async () => {
    const API_URL = "https://project-mywallet-api.herokuapp.com/transactions";
    // const API_URL = "http://localhost:5000/transactions";

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    setLoading(!loading);
    try {
      const { data } = await axios.get(API_URL, config);

      data.name ? setName(data.name) : setName(data[0].name);

      // TODO -> When there are transactions, store and render'em through a state



      setLoading(false);
    } catch (err) {
      console.error("⚠ Couldn't get transactions!", err)
      setLoading(false);
    }
  };

  return (
    <TransactionsComponent>
      <header>
        <h1>Olá, {name}</h1>
        <SignOut size={24} color={"white"} />
      </header>

      <div className="transactionsDisplay">
        <p>
          Não há registros de
          <br />
          entrada ou saída
        </p>
      </div>

      <footer>
        <TransactionButton loading={loading} text="Nova entrada" />
        <TransactionButton loading={loading} text="Nova saída" />
      </footer>
    </TransactionsComponent>
  );
}

const TransactionsComponent = styled.section`
  margin: 0 1.5625rem;

  header {
    margin: 1.5625rem 0;

    font-family: "Raleway", sans-serif;
    font-weight: 700;
    font-size: 1.625rem;
    color: #fff;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .transactionsDisplay {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 27.875rem;
    border-radius: 0.3125rem;
    background-color: #fff;

    p {
      color: var(--text-grey);
      font-family: "Raleway", sans-serif;
      font-size: 1.25rem;
      font-weight: 400;
    }
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.9375rem;

    width: 100%;

    margin: 0.8125rem 0;
  }
`;
