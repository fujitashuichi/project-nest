import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { authRequestMocks, createRequestMock, createResponseMock, projectRequestMocks } from "../../__mock__/index.js";
import { NextFunction, Request, Response } from "express";
import { createProject, getProjects, register } from "../../controller/index.js";
import { PostProjectRequest } from "@pkg/shared";
import { authorize } from "../../middleware/index.js";
import { mockReq } from "sinon-express-mock";
import { isUsersProject } from "../../middleware/isUsersProject.js";
import { deleteProject, updateProject } from "../../controller/project.controller.js";
import { prisma } from "../../lib/prisma.js";


describe("project.controller", () => {
  let res: Response | null;
  let next: NextFunction | null;

  beforeEach(async () => {
    res = createResponseMock();
    next = vi.fn();
    res = createResponseMock();

    await prisma.project.deleteMany();
    await prisma.user.deleteMany();
    let userCount = await prisma.user.count();
    let projectCount = await prisma.project.count();
    console.log("userCount:", userCount, "projectCount:", projectCount);
    while (userCount > 0 || projectCount > 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
      userCount = await prisma.user.count();
      projectCount = await prisma.project.count();
    }
  });
  afterEach(() => {
    res = null;
    next = null;
    vi.restoreAllMocks();
  });


  const getCreatedData = (res: Response) => {
    const body = vi.mocked(res.json).mock.calls[0]![0];
    console.log("TEST_LOG>>> created data:", body);
    return body;
  };

  const registerResult = async (res: Response) => {
    await register()(authRequestMocks.register.validReq(), res);

    const [name, value] = vi.mocked(res.cookie).mock.calls[0]!;
    const cookies: Request["cookies"] = { [name]: value };

    const user = getCreatedData(res);

    return { cookies, res, user };
  }

  const createProjectResult = async (body: PostProjectRequest, cookies: Request["cookies"], res: Response) => {
    await authorize()(createRequestMock.withCookies(cookies), res, next!);
    await createProject()(mockReq({ body: body, cookies: cookies }), res);

    const project = getCreatedData(res);

    return { res, project };
  }


  it("createProject: 正常成功する", async () => {
    const { cookies } = await registerResult(res!);

    await authorize()(createRequestMock.withCookies(cookies), res!, next!);

    const body: PostProjectRequest = projectRequestMocks.postProject.validReq_1().body;
    await createProject()(mockReq({ body, cookies }), res!);

    expect(res!.status).toHaveBeenCalledWith(201);
  });

  it("getProjects: 正常に成功する", async () => {
    const { cookies } = await registerResult(res!);

    const body: PostProjectRequest = projectRequestMocks.postProject.validReq_1().body;

    await createProjectResult(body, cookies, res!);

    // authorizeして、getProjectを実行
    res = createResponseMock();
    await authorize()(createRequestMock.withCookies(cookies), res!, next!);
    await getProjects()(createRequestMock.withoutData(), res!);

    expect(res!.status).toHaveBeenCalledWith(200);
    expect(res!.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.arrayContaining([ expect.objectContaining(body) ])
      })
    );
  });

  it("updateProject: 正常に成功する", async () => {
    const { cookies } = await registerResult(res!);

    // authorizeして、Project作成
    const body: PostProjectRequest = projectRequestMocks.postProject.validReq_1().body;
    const { project } = await createProjectResult(body, cookies, res!);

    res = createResponseMock();
    await authorize()(createRequestMock.withCookies(cookies), res!, next!);
    await isUsersProject()(createRequestMock.withParams({ id: project.id }), res!, next!);

    const updateBody = projectRequestMocks.updateProject.validReq_1().body;
    console.log("DEBUG: req.params ->", project.id);
    console.log("DEBUG: req.body ->", updateBody);

    await updateProject()(
      mockReq({
        body: updateBody,
        params: { id: project.id },
        cookies
      }),
      res!
    );

    expect(res!.status).toHaveBeenCalledWith(201);
    expect(res!.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: expect.objectContaining(body)
      })
    );
  });

  it("deleteProjects: 正常に完了する", async () => {
    const { cookies } = await registerResult(res!);

    const body = projectRequestMocks.postProject.validReq_1().body;
    const { project } = await createProjectResult(body, cookies, res!);

    // authorizeして、isUsersProjectを通した後に、deleteProjectを実行
    res = createResponseMock();
    await authorize()(createRequestMock.withCookies(cookies), res!, next!);
    await isUsersProject()(createRequestMock.withParams({ id: project.id }), res!, next!);
    await deleteProject()(createRequestMock.withParams({ id: project.id }), res!);

    expect(res!.status).toHaveBeenCalledWith(200);
    expect(res!.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        data: {}
      })
    );
  });
});
