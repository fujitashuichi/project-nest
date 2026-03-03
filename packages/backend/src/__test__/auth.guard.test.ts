import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { loginValidation, registerValidation } from "../middleware/index.js"
import { createResponseMock, requestMocks } from "../__mock__/index.js"
import { NextFunction, Response } from "express"

describe("auth.guard", () => {
  let res: Response | null;
  let next: NextFunction | null;
  beforeEach(() => {
    res = createResponseMock();
    next = vi.fn();
  });
  afterEach(() => {
    res = null;
    next = null;
    vi.restoreAllMocks();
  });


  it("register: 正しいリクエストは通過する", () => {
    registerValidation(requestMocks.register.validRegisterHttpReq(), res!, next!);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("register: Dos攻撃Request_1 は即座にエラーレスポンスを返し、次の関数を呼ばない", () => {
    registerValidation(requestMocks.register.invalidRegisterHttpReq_1(), res!, next!);
    expect(next).not.toHaveBeenCalled();
    expect(res!.status).toHaveBeenCalledWith(400);
    expect(res!.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });

  it("register: Dos攻撃Request_2 は即座にエラーレスポンスを返し、次の関数を呼ばない", () => {
    registerValidation(requestMocks.register.invalidRegisterHttpReq_2(), res!, next!);
    expect(next).not.toHaveBeenCalled();
    expect(res!.status).toHaveBeenCalledWith(400);
    expect(res!.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });


  it ("login: 正しいリクエストは通過する", () => {
    loginValidation(requestMocks.login.validRequestHttpReq(), res!, next!);
    expect(next).toBeCalledTimes(1);
  });

  it ("login: Dos攻撃Request_1 は即座にエラーレスポンスを返し、次の関数を呼ばない", () => {
    loginValidation(requestMocks.login.invalidRegisterHttpReq_1(), res!, next!);
    expect(next).not.toHaveBeenCalled();
    expect(res!.status).toHaveBeenCalledWith(400);
    expect(res!.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    )
  });

  it ("login: Dos攻撃Request_2 は即座にエラーレスポンスを返し、次の関数を呼ばない", () => {
    loginValidation(requestMocks.login.invalidRegisterHttpReq_2(), res!, next!);
    expect(next).not.toHaveBeenCalled();
    expect(res!.status).toBeCalledWith(400);
    expect(res!.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
})