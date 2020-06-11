import client from "../lib/client";
import qs from "query-string";

class TodoService {
  public GetTodos(date: string) {
    return client.get(`/api/v1/todo/day/${date}`);
  }

  public PostTodo(article: string) {
    return client.post(`/api/v1/todo/create`, qs.stringify({ article }));
  }

  public PatchMemo(todo_id: number, memo: string) {
    return client.patch(`/api/v1/todo/patch-memo`, qs.stringify({ todo_id, memo }));
  }

  public PatchImport(todo_id: number) {
    return client.patch(`/api/v1/todo/patch-memo`, qs.stringify({ todo_id }));
  }

  public PatchCheck(todo_id: number) {
    return client.patch(`/api/v1/todo/patch-memo`, qs.stringify({ todo_id }));
  }

  public DeleteTodo(todo_id: number) {
    return client.delete(`/api/v1/todo/patch-memo`, { params: { todo_id } });
  }
}

export default new TodoService();
