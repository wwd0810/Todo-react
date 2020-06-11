import React, { useState, useCallback } from "react";
import styled from "@emotion/styled";
import Input from "../common/input/Input";
import Button from "../common/button";
import { Link } from "react-router-dom";

interface Props {
  signUp: (email: string, password: string, username: string) => void;
}

function SignUp({ signUp }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [username, setUsername] = useState<string>("");

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

  const onConfirmChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setConfirm(value);
  }, []);

  const onUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setUsername(value);
  }, []);

  const userSignUp = useCallback(
    (e: any) => {
      e.preventDefault();
      signUp(email, password, username);
    },
    [email, password, signUp, username],
  );

  return (
    <Wrap>
      <p>SignUp</p>
      <form>
        <Input
          type="text"
          name="id"
          value={username}
          onChange={onUsernameChange}
          placeholder="Username"
        />
        <Input type="text" name="id" value={email} onChange={onEmailChange} placeholder="Email" />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="Password"
        />
        <Input
          type="password"
          name="password"
          value={confirm}
          onChange={onConfirmChange}
          placeholder=" Confirm Password"
        />
        <span onClick={userSignUp}>
          <Button title="SignUp" />
        </span>
        <SignLink to="/login">Login</SignLink>
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

export default SignUp;
