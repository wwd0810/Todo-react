import BaseStore from "../BaseStore";
import RootStore from "../../stores";
import { observable, flow, action, computed } from "mobx";

import UserService from "../../services/UserService";
import { User } from "./types";
import client from "../../lib/client";
class UserStore extends BaseStore {
  root: RootStore;

  constructor(root: RootStore) {
    super();
    this.root = root;
  }

  @observable
  private _isLoggedIn = false;

  @observable
  private _user?: User;

  @observable
  private _userToken?: string;

  @computed
  get isLoggedIn() {
    return this._isLoggedIn;
  }

  @computed
  get user() {
    return this._user;
  }

  @computed
  get userToken() {
    return this._userToken;
  }

  @action
  public logout() {
    this._isLoggedIn = false;
    this._user = undefined;
    this._userToken = undefined;

    delete client.defaults.headers.common["Authorization"];
  }

  @action
  public autoLogin() {
    this._isLoggedIn = true;
  }

  Login = flow(function* (this: UserStore, email: string, password: string) {
    this._init("LOGIN");
    this._isLoggedIn = false;
    try {
      const {
        data: res,
      }: {
        data: ApiResult<{ status: string; token: string; user: User }>;
      } = yield UserService.Login(email, password);

      const { token, user } = res.data;
      client.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      this._user = user;
      this._isLoggedIn = true;
      this._userToken = token;
      this._success["LOGIN"] = true;
    } catch (e) {
      this._failure["LOGIN"] = [false, e];
    } finally {
      this._pending["LOGIN"] = false;
    }
  });

  SignUp = flow(function* (this: UserStore, email: string, password: string, usernmae: string) {
    this._init("SIGN_UP");
    try {
      yield UserService.PostSignUp(email, password, usernmae);
      this._success["SIGN_UP"] = true;
    } catch (e) {
      this._failure["SIGN_UP"] = [false, e];
    } finally {
      this._pending["SIGN_UP"] = false;
    }
  });
}

export default UserStore;
