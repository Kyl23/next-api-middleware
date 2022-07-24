import { NextApiRequest, NextApiResponse } from "next";
import { FuncType, StrToFuncType } from ".";

export default class Progress {
  private nowFuncId = 0;
  private funcArray: StrToFuncType | undefined;
  private req: NextApiRequest;
  private res: NextApiResponse;
  private ableToAccessWorkFunc: boolean;

  constructor(
    funcArray: StrToFuncType | undefined,
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    this.funcArray = funcArray;
    this.req = req;
    this.res = res;
    this.ableToAccessWorkFunc = false;
  }

  public next() {
    if (this.funcArray && this.nowFuncId > this.funcArray.length) return;
    if (this.funcArray && this.nowFuncId === this.funcArray.length) {
      this.ableToAccessWorkFunc = true;
      return;
    }

    if (this.funcArray) {
      this.funcArray[this.nowFuncId++](this.req, this.res, this);
    }
  }

  public then(workFunc: FuncType) {
    if (this.ableToAccessWorkFunc) workFunc(this.req, this.res);
  }
}
