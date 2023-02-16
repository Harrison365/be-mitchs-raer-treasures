const request = require("supertest");
const app = require("../app");
const seed = require("../db/seed");
const testData = require("../db/data/test-data");
const db = require("../db");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/treasures", () => {
  test("status: 200, responds with all treasures, including the shop name and details", () => {
    return request(app)
      .get("/api/treasures")
      .expect(200)
      .then(({ body }) => {
        expect(body.treasures).toBeInstanceOf(Array);
        expect(body.treasures.length).toBeGreaterThan(1);
        body.treasures.forEach((treasure) => {
          expect(treasure).toEqual(
            expect.objectContaining({
              treasure_id: expect.any(Number),
              treasure_name: expect.any(String),
              colour: expect.any(String),
              age: expect.any(Number),
              cost_at_auction: expect.any(Number),
              shop_name: expect.any(String),
            })
          );
        });
      });
  });
  test("default sort order is age, ascending", () => {
    return request(app)
      .get("/api/treasures")
      .expect(200)
      .then(({ body }) => {
        expect(body.treasures).toBeSortedBy("age", { descending: false });
      });
  });
  test("accepts a sort_by query", () => {
    return request(app)
      .get("/api/treasures?sort_by=cost_at_auction")
      .expect(200)
      .then(({ body }) => {
        expect(body.treasures).toBeSortedBy("cost_at_auction", {
          descending: false,
          coerce: true,
        });
      });
  });
  test("accepts an order query", () => {
    return request(app)
      .get("/api/treasures?sort_by=cost_at_auction&order=desc")
      .expect(200)
      .then(({ body }) => {
        expect(body.treasures).toBeSortedBy("cost_at_auction", {
          descending: true,
          coerce: true,
        });
      });
  });
  test("accepts a colour query", () => {
    return request(app)
      .get("/api/treasures?colour=gold")
      .expect(200)
      .then(({ body }) => {
        expect(body.treasures).toHaveLength(2);
        body.treasures.forEach((treasure) => {
          expect(treasure.colour).toBe("gold");
        });
      });
  });
  test("status: 400, only accepts specific sort_by values", () => {
    return request(app)
      .get("/api/treasures?sort_by=not_a_column")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid sort value");
      });
  });
  test("status: 400, only accepts asc/desc order values", () => {
    return request(app)
      .get("/api/treasures?order=not_asc_or_desc")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid order value :)");
      });
  });
});
