import styled from "styled-components";
import { PlusCircle, MinusCircle } from "phosphor-react";

import { LoadingButton } from "../LoadingButton";

export function TransactionButton({ text, loading }) {
  const [firstWord, secondWord] = text.split(" ");

  return loading ? (
    <LoadingButton />
  ) : (
    <TransactionButtonComponent type="submit">
      {text === "Nova entrada" ? (
        <PlusCircle size={24} color="white" />
      ) : (
        <MinusCircle size={24} color="white" />
      )}

      <span className="btnText">
        <p>{firstWord}</p>
        <p>{secondWord}</p>
      </span>
    </TransactionButtonComponent>
  );
}

const TransactionButtonComponent = styled.button`
  background-color: var(--btn-purple);

  height: 7.125rem;
  width: 9.6875rem;

  padding: 0.75rem;
  margin-bottom: 2.25rem;

  border: none;
  outline: none;
  border-radius: 0.3125rem;

  font-size: 1.063rem;
  text-decoration: none;
  color: #fff;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  transition: all 0.5s ease-in-out;

  .btnText {
    text-align: start;
  }

  &:hover {
    filter: brightness(1.2);
    cursor: pointer;
  }
`;
