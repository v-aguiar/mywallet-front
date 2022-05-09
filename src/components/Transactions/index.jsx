import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import styled from "styled-components";
import { SignOut } from "phosphor-react";

import UserContext from "../../contexts/UserContext";
import { TransactionButton } from "./TransactionButton";
import { Transaction } from "./Transaction";

export function Transactions() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const { token } = useContext(UserContext);

  useEffect(() => {
    getTransactions();
  }, []); //eslint-disable-line

  useEffect(() => {
    getBalance();
  }, [transactions]); //eslint-disable-line

  const getTransactions = async () => {
    const API_URL = "https://project-mywallet-api.herokuapp.com/transactions";

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
      console.log("TRansaction data: ", data);

      setTransactions(data);

      setLoading(false);
    } catch (err) {
      console.error("⚠ Couldn't get transactions!", err);
      setLoading(false);
    }
  };

  const getBalance = () => {
    let balanceSum = 0;

    transactions.forEach(({ amount, type }) => {
      balanceSum += type === "income" ? amount * 1 : amount * -1;
    });

    setBalance(balanceSum);
  };

  return (
    <TransactionsComponent balance={balance} transactions={transactions}>
      <header>
        <h1>Olá, {name}</h1>
        <SignOut size={24} color={"white"} />
      </header>

      <div className="transactionsDisplay">
        {transactions.length === 0 ? (
          <p className="placeholder">
            Não há registros de
            <br />
            entrada ou saída
          </p>
        ) : (
          <>
            <ul>
              {transactions.map(
                ({ amount, date, description, type, timestamp }) => {
                  return (
                    <Transaction
                      key={timestamp}
                      amount={amount}
                      date={date}
                      description={description}
                      type={type}
                    />
                  );
                }
              )}
            </ul>
            <span className="balanceLine">
              <p>Saldo</p>
              <p className="balance">RS {balance},00</p>
            </span>
          </>
        )}
      </div>

      <footer>
        <Link to="/transactions/income">
          <TransactionButton loading={loading} text="Nova entrada" />
        </Link>
        <Link to="/transactions/expense">
          <TransactionButton loading={loading} text="Nova saída" />
        </Link>
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

  .balanceLine {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    font-family: "Raleway", sans-serif;
    font-size: 1.25rem;
    font-weight: 400;

    p:first-child {
      font-weight: 700;
    }

    p:last-child {
      color: ${({ balance }) =>
        balance > 0 ? "var(--transaction-green)" : "var(--transaction-red)"};
    }
  }

  .transactionsDisplay {
    width: 100%;
    height: 27.875rem;
    border-radius: 0.3125rem;
    background-color: #fff;

    ${(props) => {
      return props.transactions.length > 0
        ? {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.44rem .69rem",
          }
        : { display: "flex", alignItems: "center", justifyContent: "center" };
    }}

    .placeholder {
      color: var(--text-grey);
      font-family: "Raleway", sans-serif;
      font-size: 1.25rem;
      font-weight: 400;
    }
  }

  ul {
    width: 100%;
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.9375rem;

    width: 100%;

    margin: 0.8125rem 0;
  }
`;
