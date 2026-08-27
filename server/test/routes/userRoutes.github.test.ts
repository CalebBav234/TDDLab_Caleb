import request from "supertest";
jest.mock("../../src/config/server", () => ({
  __esModule: true,
  default: jest.fn(),
}));
import app from "../../src/app";

describe("POST /api/user/github", () => {
  it("should return 404 because GitHub login endpoint is removed", async () => {
    const response = await request(app)
      .post("/api/user/github")
      .send({ idToken: "fake-token" });

    expect(response.status).toBe(404);
  });
});
