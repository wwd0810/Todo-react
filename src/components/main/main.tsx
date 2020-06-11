import React, { useState, useCallback, useEffect } from "react";
import styled from "@emotion/styled";
import BaseTemplate from "../base/baseTemplate";

import ArrowLeft from "../../assets/ic_arrow-l.png";
import ArrowRight from "../../assets/ic_arrow-r.png";
import Input from "../common/input";
import TodoItem from "./todoItem";

function Main() {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [selected, setSelected] = useState<number>(0);
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    setDate(new Date());
  }, []);

  const onNavChange = (num: number) => {
    setSelected(num);
  };

  const addDay = useCallback(
    (e: any) => {
      e.preventDefault();
      const year = date?.getFullYear();
      const month = date?.getMonth();
      const day = date?.getDate();

      setDate(new Date(year!, month!, day! + 1));
    },
    [date],
  );

  const subDay = useCallback(
    (e: any) => {
      e.preventDefault();
      const year = date?.getFullYear();
      const month = date?.getMonth();
      const day = date?.getDate();

      setDate(new Date(year!, month!, day! - 1));
    },
    [date],
  );

  const getDay = (day: number) => {
    return days[day];
  };

  const getMonth = (month: number) => {
    return months[month];
  };

  const item = () => {};

  return (
    <BaseTemplate selected={selected} onChange={onNavChange}>
      <Wrap>
        <Calendar>
          <button onClick={subDay}>
            <img src={ArrowLeft} />
          </button>
          <div>
            <span>{getDay(date?.getDay()!)}</span>
            <p>{`${getMonth(date?.getMonth()!)} ${date?.getDate()}, ${date?.getFullYear()}`}</p>
          </div>
          <button onClick={addDay}>
            <img src={ArrowRight} />
          </button>
        </Calendar>
        <InputWrap>
          <Input
            type="text"
            name="text"
            value=""
            //   onChange={onChange}
            placeholder="Add a Task"
          />
        </InputWrap>
        <TodoItem />
        <TodoItem />
        <Divider />
        <TodoItem />
      </Wrap>
    </BaseTemplate>
  );
}

const Wrap = styled.div`
  display: column;
  justify-content: center;
`;

const Calendar = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
    & > span {
      font-size: 48px;
      line-height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;

      /* Text White */
      color: #e1e1e1;
    }
    & > p {
      font-size: 24px;
      line-height: 28px;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;

      color: #575c64;
    }
  }

  & > button {
    /* width: 58px; */
    /* height: 58px; */
    margin: 0px 40px;
    background: rgba(0, 0, 0, 0);
    border: none;
    cursor: pointer;
    & > img {
      width: 58px;
      height: 58px;
    }
  }
`;

const InputWrap = styled.div`
  margin-top: 40px;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background: #353a3f;

  margin-bottom: 20px;
`;

export default Main;
