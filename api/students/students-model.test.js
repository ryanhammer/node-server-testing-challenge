const Students = require('./students-model');
const db = require('../../data/db-config');

beforeAll( async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach( async () => {
  await db('students').truncate();
});

afterAll( async () => {
  await db.destroy();
});

describe('students', () => {

  describe('sanity', () => {

    test('student is defined', () => {
      expect(Students).toBeDefined();
    });
    test('Environment is correct', () => {
      expect(process.env.DB_ENV).toBe('testing');
    });

  });

});