vi.stubEnv("NODE_JWT_SECRET", "secret");

import { Response } from "express";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { requestMocks, serviceMock } from "../__mock__/index.js";
import { register } from "../controller/index.js";

describe("auth.controller", () => {
  let res: Response | null;

  beforeEach(async () => {
    res = {
      status: vi.fn().mockReturnThis(),
      cookie: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis()
    } as unknown as Response;
  });
  afterEach(() => {
    res = null
  });

  it("バリデーション済みのdto値に対し、正常に登録が完了する", async () => {
    await register(requestMocks.register.validRegisterHttpReq(), res!, serviceMock.register());

    expect(res?.status).toHaveBeenCalledWith(201);
    expect(res?.cookie).toHaveBeenCalledWith(
      "token",
      expect.anything(),
      expect.objectContaining({ httpOnly: true, secure: true })
    );

    expect(res?.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });
});
