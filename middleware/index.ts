import { NextApiRequest, NextApiResponse } from "next";
import preAPI from "../preAPI";

export type MiddlewareFuncType = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: Function
) => any;

export type FuncType = (req: NextApiRequest, res: NextApiResponse) => any;

export type StrToFuncType = MiddlewareFuncType[];

class Middleware {
  static #stringToFunc = new Map<string, StrToFuncType>();
  private static requestPkg: NextApiRequest;
  private static responsePkg: NextApiResponse;
  private static nowFuncId = 0;
  private static funcArray: StrToFuncType | undefined;
  private static ableToAccessWorkFunc: boolean;
  constructor() {}

  private static next() {
    if (
      Middleware.funcArray &&
      Middleware.nowFuncId > Middleware.funcArray.length
    )
      return;
    if (
      Middleware.funcArray &&
      Middleware.nowFuncId === Middleware.funcArray.length
    ) {
      Middleware.ableToAccessWorkFunc = true;
      return;
    }
    console.log(Middleware.nowFuncId, Middleware.funcArray?.length);
    if (Middleware.funcArray) {
      Middleware.funcArray[Middleware.nowFuncId++](
        Middleware.requestPkg,
        Middleware.responsePkg,
        Middleware.next
      );
      return;
    }
  }

  public static use(path: string, middlewareFunc: MiddlewareFuncType) {
    if (!Middleware.#stringToFunc.has(path))
      Middleware.#stringToFunc.set(path, [middlewareFunc]);
    else Middleware.#stringToFunc.get(path)?.push(middlewareFunc);
  }

  public static throwIn(req: NextApiRequest, res: NextApiResponse) {
    preAPI();
    if (!req.url) return;
    Middleware.ableToAccessWorkFunc = false;
    Middleware.funcArray = Middleware.#stringToFunc.get(req.url);
    if (Middleware.funcArray) {
      Middleware.nowFuncId = 0;
      Middleware.requestPkg = req;
      Middleware.responsePkg = res;
      Middleware.next();
    }
    return Middleware;
  }

  public static then(workFunc: FuncType) {
    if (Middleware.ableToAccessWorkFunc)
      workFunc(Middleware.requestPkg, Middleware.responsePkg);
  }

  public static app() {
    return {
      use: Middleware.use,
      throwIn: Middleware.throwIn,
    };
  }
}

export default Middleware;
