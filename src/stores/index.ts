import UserStore from "./user";
import TodoStore from "./todo/store";

class RootStore {
  userStore: UserStore;
  todoStore: TodoStore;
  constructor() {
    this.userStore = new UserStore(this);
    this.todoStore = new TodoStore(this);
  }
}

export default RootStore;
