import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { createResponseMock, authRequestMocks } from "../../__mock__/index.js"
import { NextFunction, Response } from "express"
import { requestValidator } from "../../middleware/index.js";
import { cleanupDb } from "../tools/cleanupDb.js";

describe("auth: request.guard", () => {
  let res: Response | null;
  let next: NextFunction | null;
  beforeEach(async () => {
    res = createResponseMock();
    next = vi.fn();
    await cleanupDb();
  }, 50000);
  afterEach(() => {
    res = null;
    next = null;
    vi.restoreAllMocks();
  });


  // register
  it("register: 正しいリクエストは通過する", () => {
    requestValidator("register")(authRequestMocks.register.validReq(), res!, next!);
    expect(next).toHaveBeenCalledWith();
  });

  it("register: Dos攻撃Request_1 はerrorHandlerを呼ぶ", () => {
    requestValidator("register")(authRequestMocks.register.invalidReq_1(), res!, next!);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
  it("register: Dos攻撃Request_2 はerrorHandlerを呼ぶ", () => {
    requestValidator("register")(authRequestMocks.register.invalidReq_2(), res!, next!);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
  it ("register: Dos攻撃Request_3 はerrorHandlerを呼ぶ", () => {
    requestValidator("register")(authRequestMocks.register.invalidReq_3(), res!, next!);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
  it ("register: Dos攻撃Request_4 はerrorHandlerを呼ぶ", () => {
    requestValidator("register")(authRequestMocks.register.invalidReq_4(), res!, next!);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
})
