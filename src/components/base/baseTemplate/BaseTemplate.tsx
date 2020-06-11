import React, { useCallback } from "react";
import styled from "@emotion/styled";

interface Props {
  selected?: number;
  onChange: (num: number) => void;
  children?: React.ReactNode;
}

function BaseTemplate({ selected = 0, onChange, children }: Props) {
  const menu = ["Day", "Month", "Year"];

  const onNavChange = useCallback(
    (e: any) => {
      e.preventDefault();
      const { id } = e.target;
      onChange(Number(id));
    },
    [onChange],
  );

  return (
    <Wrap>
      <TopNav>
        {menu.map((data, idx) => (
          <TopNavItem
            key={idx}
            id={idx.toString()}
            title={String(idx === selected)}
            onClick={onNavChange}
          >
            {data}
          </TopNavItem>
        ))}
      </TopNav>
      <Content>{children}</Content>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
`;

const TopNav = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 2px solid #353a3f;

  display: flex;
  justify-content: center;
`;

const TopNavItem = styled.div`
  width: 100px;
  height: 60px;
  border-bottom: ${(props) => (props.title === "true" ? "2px solid #da6689" : "none")};

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #e1e1e1;
`;

export default BaseTemplate;
