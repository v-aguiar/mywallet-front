import styled from "styled-components";

export function Transaction({ amount, date, description, type }) {
  return (
    <TransactionComponent type={type}>
      <p className="date">{date}</p>
      <p className="description">{description}</p>
      <p className="amount">R$ {amount},00</p>
    </TransactionComponent>
  );
}

const TransactionComponent = styled.li`
  width: 100%;
  line-height: 2rem;

  display: flex;
  align-items: center;
  position: relative;
  /* gap: 1rem; */

  p {
    font-family: "Raleway", sans-serif;
    font-size: 1.25rem;
    font-weight: 400;
  }
  .date {
    color: var(--light-grey);
    margin-right: 1.4rem;
  }
  .description {
    color: #000;
  }
  .amount {
    justify-self: flex-end;
    position: absolute;
    right: 0;

    color: ${(props) =>
      props.type === "income"
        ? "var(--transaction-green)"
        : "var(--transaction-red)"};
  }
`;
