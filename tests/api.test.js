const request = require('supertest');
const app = require('../app');
const seed = require('../db/seed');
const testData = require('../db/data/test-data');
const db = require('../db');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe.only('GET /api/treasures', () => {
  test.only('status: 200, responds with all treasures, including the shop name and details', () => {
    return request(app)
      .get('/api/treasures')
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
              cost_at_auction: expect.any(String),
              shop_name: expect.any(String),
            })
          );
        });