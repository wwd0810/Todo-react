import React from "react";
import styled from "@emotion/styled";

interface Props {
  title: string;
}

function Button({ title }: Props) {
  return <Wrap>{title}</Wrap>;
}

const Wrap = styled.button`
  width: 500px;
  height: 60px;

  border: none;

  background: #da6689;
  border-radius: 5px;

  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #e1e1e1;
`;

export default Button;
