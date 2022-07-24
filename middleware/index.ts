import { NextApiRequest, NextApiResponse } from "next";
import preAPI from "../preAPI";
import Progress from "./progress";

export type MiddlewareFuncType = (
  req: NextApiRequest,
  res: NextApiResponse,
  progress: Progress
) => any;

export type FuncType = (req: NextApiRequest, res: NextApiResponse) => any;

export type StrToFuncType = MiddlewareFuncType[];

class Middleware {
  static #stringToFunc = new Map<string, StrToFuncType>();
  private static requestPkg: NextApiRequest;
  private static responsePkg: NextApiResponse;
  private static funcArray: StrToFuncType | undefined;

  constructor() {}

  public static use(path: string, middlewareFunc: MiddlewareFuncType) {
    if (!Middleware.#stringToFunc.has(path))
      Middleware.#stringToFunc.set(path, [middlewareFunc]);
    else Middleware.#stringToFunc.get(path)?.push(middlewareFunc);
  }

  public static throwIn(req: NextApiRequest, res: NextApiResponse) {
    preAPI();
    console.log(Middleware.funcArray?.length);
    if (!req.url) return;
    if (Middleware.#stringToFunc.get(req.url) !== undefined) {
      Middleware.funcArray = Middleware.#stringToFunc.get(req.url);
    }
    if (Middleware.funcArray) {
      const progress = new Progress(Middleware.funcArray, req, res);
      progress.next();
      return progress;
    }
    return;
  }

  public static app() {
    return {
      use: Middleware.use,
      throwIn: Middleware.throwIn,
    };
  }
}

export default Middleware;
