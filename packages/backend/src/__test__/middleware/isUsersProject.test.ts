vi.stubEnv("NODE_JWT_SECRET", "secret");

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { authRequestMocks, createRequestMock, createResponseMock, projectRequestMocks } from "../../__mock__/index.js";
import { NextFunction, Request, Response } from "express";
import { Database } from "sqlite3";
import { createProject, register } from "../../controller/index.js";
import { authorize } from "../../middleware/index.js";
import { isUsersProject } from "../../middleware/isUsersProject.js";
import { ProjectUndefinedError } from "../../error/ProjectError.js";
import { prisma } from "../../lib/prisma.js";
import { PostProjectRequest } from "@pkg/shared";

describe("isUsersProject", () => {
  let res: Response | null = null;
  let next: NextFunction | null = null;
  let db: Database | null = null;

  beforeEach(async () => {
    res = createResponseMock();
    next = vi.fn();
    res = createResponseMock();
    await prisma.project.deleteMany();
    await prisma.user.deleteMany();
  }, 50000);
  afterEach(() => {
    res = null;
    next = null;
    db = null;
    vi.restoreAllMocks();
  });

  it("ユーザーが所持するprojectであれば次へ進む", async () => {
    await register()(authRequestMocks.register.validReq(), res!);

    const [name, value] = vi.mocked(res!.cookie).mock.calls[0]!;
    const cookies: Request["cookies"] = { [name]: value };

    const body: PostProjectRequest = projectRequestMocks.postProject.validReq_1().body;
    await authorize()(createRequestMock.withCookies(cookies), res!, next!);
    createProject()(createRequestMock.withBody({ body }), res!);

    const req = createRequestMock.withParams({ id: "1" });
    await isUsersProject()(req, res!, next!);

    expect(next).toHaveBeenCalledWith();
  });

  it("ユーザーが所持していないprojectに対して、ErrorHandlerを呼ぶ", async () => {
    await register()(authRequestMocks.register.validReq(), res!);

    const [name, value] = vi.mocked(res!.cookie).mock.calls[0]!;
    const cookies: Request["cookies"] = { [name]: value };

    await authorize()(createRequestMock.withCookies(cookies), res!, next!);
    createProject()(createRequestMock.withBody({ title: "Title" }), res!);

    const req = createRequestMock.withParams({ id: "5656564" });
    await isUsersProject()(req, res!, next!);

    expect(next).toHaveBeenCalledWith(expect.any(ProjectUndefinedError));
  });
});
