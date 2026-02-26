vi.stubEnv("NODE_JWT_SECRET", "secret");

import { Response } from "express";
import { describe, expect, it, vi } from "vitest";
import { register } from "../controller/index.js";
import { requestMocks } from "../__mock__/index.js";

describe("auth.controller", () => {
  it("バリデーション済みのdto値に対し、正常に登録が完了する", async () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      cookie: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis()
    } as unknown as Response;

    await register(requestMocks.register.validRegisterHttpReq(), res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.cookie).toHaveBeenCalledWith(
      "token",
      expect.anything(),
      expect.objectContaining({ httpOnly: true, secure: true })
    );
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });

  it("異常なデータは例外を投げ、ここではレスポンスしない", async () => {
    const res = {
      status: vi.fn().mockReturnThis(),
      cookie: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis()
    } as unknown as Response;

    const invalidReq = requestMocks.register.invalidRegisterHttpReq_1();
    await expect(register(invalidReq, res)).rejects.toThrow();

    expect(res.status).not.toHaveBeenCalled();
    expect(res.cookie).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
  });
});