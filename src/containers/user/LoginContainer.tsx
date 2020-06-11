import React from "react";
import Login from "../../components/login/Login";
import { inject, observer } from "mobx-react";
import { withRouter, RouteComponentProps } from "react-router";
import { withCookies, ReactCookieProps } from "react-cookie";
import UserStore from "stores/user/store";

interface Props extends RouteComponentProps, ReactCookieProps {
  userStore?: UserStore;
}

interface State {
  logined: boolean;
}

@inject("userStore")
@observer
class LoginContainer extends React.Component<Props, State> {
  private UserStore = this.props.userStore! as UserStore;

  state: State = {
    logined: false,
  };

  login = async (email: string, passsword: string) => {
    await this.UserStore.Login(email, passsword);

    if (this.UserStore.success["LOGIN"]) {
      // if (this.UserStore.userToken) {
      if (this.UserStore.user) {
        let LoginData = this.UserStore.userToken;
        // let LoginData = this.UserStore.user
        // encode 필요한가?
        this.props.cookies?.set("auth", LoginData, { path: "/" });
        this.props.history.push("/");
      }

      // =========================
    }
  };

  render() {
    return <Login login={this.login} />;
  }
}

// function BiddingContainer() {
//   return <Bidding />
// }

export default withCookies(withRouter(LoginContainer));
