import React, { useState, useCallback } from "react";
import styled from "@emotion/styled";
import Input from "../common/input/Input";
import Button from "../common/button";
import { Link } from "react-router-dom";

interface Props {
  login: (email: string, password: string) => void;
}

function Login({ login }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const userLogin = useCallback(
    (e: any) => {
      e.preventDefault();
      login(email, password);
    },
    [email, login, password],
  );

  const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setEmail(value);
  }, []);

  const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setPassword(value);
  }, []);

  return (
    <Wrap>
      <p>TodoList</p>
      <form>
        <Input type="text" name="id" value={email} onChange={onEmailChange} placeholder="Email" />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="Password"
        />
        <span onClick={userLogin}>
          <Button title="Login" />
        </span>
        <SignLink to="/sign-up">Sign Up</SignLink>
      </form>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > p {
    font-weight: bold;
    font-size: 48px;
    line-height: 56px;
    display: flex;
    align-items: center;

    color: #e1e1e1;
  }

  & > form {
    display: flex;
    flex-direction: column;
    & > span {
      margin-top: 30px;
    }
  }
`;

const SignLink = styled(Link)`
  display: flex;
  justify-content: center;

  height: 28px;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: center;

  margin-top: 30px;

  color: #575c64;
`;

export default Login;
