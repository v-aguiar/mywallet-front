import styled from "styled-components";

export function Input({
  id,
  name,
  value,
  type = "text",
  placeholder = "",
  handleChange,
}) {
  return (
    <InputComponent
      type={type}
      value={value}
      onChange={handleChange}
      id={id}
      name={name}
      placeholder={placeholder}
      required
    />
  );
}

const InputComponent = styled.input`
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
`;
