import React, { HTMLAttributes } from "react";
import styled from "@emotion/styled";

interface Props extends HTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  value?: string;
  valueNum?: number;
  placeholder?: string;
}

function Input({ onChange, type, name, value, valueNum, placeholder, ...other }: Props) {
  return (
    <Wrap
      {...other}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

const Wrap = styled.input`
  padding: 16px 20px;
  width: 500px;
  height: 60px;
  background: #353a3f;
  border: 2px solid #2f3238;
  box-sizing: border-box;
  border-radius: 5px;

  ::placeholder {
    font-size: 24px;
    /* line-height: 28px; */
    display: flex;
    align-items: center;

    color: #575c64;
  }
  margin-bottom: 20px;
`;

export default Input;
