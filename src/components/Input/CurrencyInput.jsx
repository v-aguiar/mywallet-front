import styled from "styled-components";
import InputMask from "react-input-mask";

export function CurrencyInput({
  id,
  name,
  value,
  placeholder = "",
  handleChange,
}) {
  const mask = /^R\$(,[0-9]{2})$/;

  return (
    <Input>
      <InputMask
        mask={mask}
        value={value}
        onChange={handleChange}
        id={id}
        name={name}
        placeholder={placeholder}
        required
      />
    </Input>
  );
}

const Input = styled.span`
  width: 100%;

  input {
    height: 3.625rem;
    width: 100%;

    padding: 1.1rem 0.95rem;
    margin-bottom: 0.82rem;

    border: none;
    outline: none;
    border-radius: 0.3125rem;

    font-size: 1.25rem;
    line-height: 1.476em;
    color: #000;
  }
`;
