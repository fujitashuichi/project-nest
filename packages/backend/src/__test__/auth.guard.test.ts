import { describe, expect, it, vi } from "vitest"
import { registerValidation } from "../middleware/index.js"
import { requestMocks } from "../__mock__/index.js"
import { Response } from "express"

describe("auth.guard", () => {
  it("正しいリクエストデータは通される", () => {
    const res = {} as unknown as Response;
    const next = vi.fn();

    registerValidation(requestMocks.register.validRegisterHttpReq(), res, next);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("不正なリクエストデータその1はエラーレスポンスを返し、次の関数を呼ばない", () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis()
    } as unknown as Response;
    const next = vi.fn();

    registerValidation(requestMocks.register.invalidRegisterHttpReq_1(), res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });

  it("不正なリクエストデータその2はエラーレスポンスを返し、次の関数を呼ばない", () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis()
    } as unknown as Response;
    const next = vi.fn();

    registerValidation(requestMocks.register.invalidRegisterHttpReq_2(), res, next);
    expect(next).toHaveBeenCalledTimes(0);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({ success: false })
    );
  });
})