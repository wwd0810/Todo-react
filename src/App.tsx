import React from "react";
import {
  Switch,
  RouteProps,
  Redirect,
  useHistory,
  withRouter,
  RouteComponentProps,
} from "react-router";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { inject, observer } from "mobx-react";
import UserStore from "./stores/user";
import { withCookies, ReactCookieProps } from "react-cookie";

import client from "./lib/client";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainPage from "./pages/MainPage";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<{}>;
  role: string[] | string;
}

interface Props extends RouteComponentProps, ReactCookieProps {
  userStore?: UserStore;
}

@inject("userStore")
@observer
class App extends React.Component<Props> {
  private UserStore = this.props.userStore! as UserStore;

  async componentDidMount() {
    const auth = this.props.cookies!.get("auth");
    if (auth) {
      let LoginData: string = auth;
      console.log(LoginData);
      this.UserStore.autoLogin();
      client.defaults.headers.common["Authorization"] = `Bearer ${LoginData}`;
      return <Redirect to="/main" />;
    }
  }

  PrivateRoute = ({ component: Component, ...other }: PrivateRouteProps) => {
    return (
      <Route
        {...other}
        render={(props: any) => {
          // if (this.UserStore.pending["LOGIN"] || this.UserStore.pending["SESSION_REFRESH"])
          //   return null;
          console.log(this.UserStore.isLoggedIn);
          if (!this.UserStore.isLoggedIn) {
            console.log(this.UserStore.isLoggedIn!);
            console.log(this.UserStore.user!);
            console.log(client.defaults.headers.common["Authorization"]);
            return <Redirect to="/login" />;
          }

          return <Component {...props} />;
        }}
      />
    );
  };
  render() {
    return (
      <Router>
        <Helmet>TodoList</Helmet>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/sign-up" component={SignUpPage} />
          <this.PrivateRoute exact path="/" role="Login" component={MainPage} />
          <this.PrivateRoute exact path="/main" role="Login" component={MainPage} />
        </Switch>
      </Router>
    );
  }
}

export default withCookies(withRouter(App));
