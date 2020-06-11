import client from "../lib/client";
import qs from "query-string";

class UserService {
  public Login(email: string, password: string) {
    return client.post(`/api/v1/users/login`, qs.stringify({ email, password }));
  }

  public PostSignUp(email: string, password: string, username: string) {
    return client.post(`/api/v1/users/user`, qs.stringify({ email, password, username }));
  }
}

export default new UserService();
