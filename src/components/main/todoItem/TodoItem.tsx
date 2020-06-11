import React from "react";
import styled from "@emotion/styled";

import MoreIcon from "../../../assets/ic_more.png";

function TodoItem() {
  return (
    <Wrap>
      <Check></Check>
      <div>
        <p className="article">123</p>
        <p className="memo">132</p>
      </div>
      <img src={MoreIcon} />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 500px;
  height: 48px;

  display: flex;

  & > div {
    & > p {
      margin: 0;
    }
    & > .article {
      font-size: 18px;
      line-height: 21px;
      /* identical to box height */
      display: flex;
      align-items: center;

      color: #e1e1e1;

      margin-bottom: 10px;
    }

    & > .memo {
      font-size: 14px;
      line-height: 16px;
      display: flex;
      align-items: center;

      color: #575c64;
    }
  }

  & > img {
    width: 24px;
    height: 24px;

    margin-left: auto;
  }
  margin-bottom: 20px;
`;

const Check = styled.div`
  width: 24px;
  height: 24px;

  background: #575c64;
  border: 2px solid #353a3f;
  box-sizing: border-box;
  border-radius: 5px;

  margin-right: 10px;
`;

export default TodoItem;
