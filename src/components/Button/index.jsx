import styled from "styled-components";

export function Button({ text }) {
  return <ButtonComponent type="submit" value={text} />;
}

const ButtonComponent = styled.input`
  background-color: var(--btn-purple);

  height: 2.85rem;
  width: 100%;

  padding: 0.6875rem;
  margin-bottom: 2.25rem;

  border: none;
  outline: none;
  border-radius: 0.3125rem;

  font-size: 1.25rem;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: all 0.5s ease-in-out;

  &:hover {
    filter: brightness(1.2);
    cursor: pointer;
  }
`;
