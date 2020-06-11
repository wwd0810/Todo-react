import React from "react";
import Login from "../../components/login/Login";
import { inject, observer } from "mobx-react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import UserStore from "stores/user/store";
import SignUp from "../../components/signUp/SignUp";

interface Props extends RouteComponentProps, ReactCookieProps {
  userStore?: UserStore;
}

@inject("userStore")
@observer
class SignUpContainer extends React.Component<Props> {
  private UserStore = this.props.userStore! as UserStore;

  singUp = async (email: string, passsword: string, username: string) => {
    await this.UserStore.SignUp(email, passsword, username);

    if (this.UserStore.success["SIGN_UP"]) {
      this.props.history.push("/login");
    }
  };

  render() {
    return <SignUp signUp={this.singUp} />;
  }
}

// function BiddingContainer() {
//   return <Bidding />
// }

export default withCookies(withRouter(SignUpContainer));
