import { AxiosError } from "axios";

declare module "react-canvas-js";

declare global {
  type ApiResult<T> = {
    code: number;
    msg: string;
    data: T;
  };
  type Pending = {
    [key: string]: boolean;
  };
  type Success = {
    [key: string]: boolean;
  };
  type Failure = { [key: string]: [boolean, null | AxiosError] };
}
