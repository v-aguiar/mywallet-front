import styled from "styled-components";
import ReactLoading from "react-loading";
import { PlusCircle, MinusCircle } from "phosphor-react"

export function TransactionButton({ text, loading }) {
  return loading 
    ? <ReactLoading type="spinningBubbles" color="white" height={"1.25rem"} width={"1.25rem"}/>
    : <TransactionButtonComponent type="submit" >
        {
          text === "Nova entrada" 
            ? <PlusCircle size={24} color="white"/> 
            : <MinusCircle size={24} color="white"/> 
        }
        <p>{ text }</p>
      </TransactionButtonComponent>;
}

const TransactionButtonComponent = styled.button`
  background-color: var(--btn-purple);

  height: 7.125rem;
  width: 100%;

  padding: 0.75rem;
  margin-bottom: 2.25rem;

  border: none;
  outline: none;
  border-radius: 0.3125rem;

  font-size: 1.25rem;
  color: #fff;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  transition: all 0.5s ease-in-out;

  &:hover {
    filter: brightness(1.2);
    cursor: pointer;
  }
`