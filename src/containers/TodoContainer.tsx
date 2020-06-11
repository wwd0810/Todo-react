import React from "react";

import { inject, observer } from "mobx-react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";

import TodoStore from "../stores/todo/store";
import Main from "../components/main/main";

interface Props extends RouteComponentProps, ReactCookieProps {
  todoStore?: TodoStore;
}

@inject("todoStore")
@observer
class TodoContainer extends React.Component<Props> {
  private TodoStore = this.props.todoStore! as TodoStore;

  async componentDidMount() {
    this.getTodoList(new Date().toISOString().slice(0, 10));
  }

  getTodoList = async (date: string) => {
    await this.TodoStore.GetTodoList(date);
  };

  render() {
    return <Main />;
  }
}

// function BiddingContainer() {
//   return <Bidding />
// }

export default withCookies(withRouter(TodoContainer));
