vi.stubEnv("NODE_JWT_SECRET", "secret");

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { authRequestMocks, createResponseMock, projectRequestMocks } from "../__mock__/index.js";
import { Database } from "sqlite3";
import { Response } from "express";
import { createAppDb } from "../db/index.js";
import { createProject, register } from "../controller/index.js";
import { PostProjectRequest } from "@pkg/shared";

describe("project.controller", () => {
  let res: Response | null;
  let db: Database | null;

  beforeEach(async () => {
    res = createResponseMock();
    db = await createAppDb(":memory:");
  });
  afterEach(() => {
    res = null;
    db = null;
    vi.restoreAllMocks();
  });

  // register
  it("createProject: 正常に作成が完了する", async () => {
    await register(authRequestMocks.register.validReq(), res!, db!);
    res = createResponseMock();
    // userId=1で返ることが明確なため、冗長な処理を避けてuserIdをそのまま書く
    const reqBody: PostProjectRequest = { title: "Title", userId: 1 }
    await createProject(projectRequestMocks.createRequest(reqBody), res!, db!);

    expect(res!.status).toHaveBeenCalledWith(201);
    expect(res!.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
  });
});
