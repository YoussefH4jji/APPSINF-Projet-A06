const request = require("supertest");
const app = require("../server.js");
const Incident = require("../server.js").models?.Incident || require("mongoose").model("Incident");

test("GET / doit répondre 200", async () => {
  // On remplace Incident.find() par une version qui renvoie un tableau vide
  Incident.find = jest.fn().mockResolvedValue([]);

  const res = await request(app).get("/");
  expect(res.status).toBe(200);
});

test("GET /login doit répondre 200", async () => {
  const res = await request(app).get("/login");
  expect(res.status).toBe(200);
});

test("GET /signup doit répondre 200", async () => {
  const res = await request(app).get("/signup");
  expect(res.status).toBe(200);
});

test("GET /incident doit répondre 200", async () => {
  const res = await request(app).get("/incident");
  expect(res.status).toBe(200);
});
