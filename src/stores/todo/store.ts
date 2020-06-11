import BaseStore from "../BaseStore";
import RootStore from "../../stores";
import { observable, flow, action, computed } from "mobx";

import client from "../../lib/client";
import TodoService from "../../services/TodoService";

import { Todo } from "./types";
class TodoStore extends BaseStore {
  root: RootStore;

  constructor(root: RootStore) {
    super();
    this.root = root;
  }

  @observable
  private _todoList: Todo[] = [];

  @computed
  get TodoList() {
    return this._todoList;
  }

  GetTodoList = flow(function* (this: TodoStore, date: string) {
    this._init("GET_TODO_LIST");
    try {
      const {
        data: res,
      }: {
        data: ApiResult<{ status: string; todos: Todo[] }>;
      } = yield TodoService.GetTodos(date);

      const { todos } = res.data;

      this._todoList = todos;
      this._success["GET_TODO_LIST"] = true;
    } catch (e) {
      this._failure["GET_TODO_LIST"] = [false, e];
    } finally {
      this._pending["GET_TODO_LIST"] = false;
    }
  });

  PostTodo = flow(function* (this: TodoStore, article: string) {
    this._init("POST_TODO");
    try {
      yield TodoService.PostTodo(article);
      this._success["POST_TODO"] = true;
    } catch (e) {
      this._failure["POST_TODO"] = [false, e];
    } finally {
      this._pending["POST_TODO"] = false;
    }
  });

  PatchMemo = flow(function* (this: TodoStore, todo_id: number, memo: string) {
    this._init("PATCH_MEMO");
    try {
      yield TodoService.PatchMemo(todo_id, memo);
      this._success["PATCH_MEMO"] = true;
    } catch (e) {
      this._failure["PATCH_MEMO"] = [false, e];
    } finally {
      this._pending["PATCH_MEMO"] = false;
    }
  });

  PatchImportant = flow(function* (this: TodoStore, todo_id: number) {
    this._init("PATCH_IMPORTANT");
    try {
      yield TodoService.PatchImport(todo_id);
      this._success["PATCH_IMPORTANT"] = true;
    } catch (e) {
      this._failure["PATCH_IMPORTANT"] = [false, e];
    } finally {
      this._pending["PATCH_IMPORTANT"] = false;
    }
  });

  PatchChecked = flow(function* (this: TodoStore, todo_id: number) {
    this._init("PATCH_CHECKED");
    try {
      yield TodoService.PatchCheck(todo_id);
      this._success["PATCH_CHECKED"] = true;
    } catch (e) {
      this._failure["PATCH_CHECKED"] = [false, e];
    } finally {
      this._pending["PATCH_CHECKED"] = false;
    }
  });

  DeleteMemo = flow(function* (this: TodoStore, todo_id: number) {
    this._init("DELETE_TODO");
    try {
      yield TodoService.DeleteTodo(todo_id);
      this._success["DELETE_TODO"] = true;
    } catch (e) {
      this._failure["DELETE_TODO"] = [false, e];
    } finally {
      this._pending["DELETE_TODO"] = false;
    }
  });
}

export default TodoStore;
