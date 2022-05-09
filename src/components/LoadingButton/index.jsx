import styled from "styled-components";
import ReactLoading from "react-loading";

export function LoadingButton() {
  return (
    <ButtonComponent type="submit">
      <ReactLoading
        type="spinningBubbles"
        color="white"
        height={"1.25rem"}
        width={"1.25rem"}
      />
    </ButtonComponent>
  );
}

const ButtonComponent = styled.button`
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
`;
