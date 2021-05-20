const db = require('../data/db-config');
const request = require('supertest');
const server = require('./server');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach( async () => {
  await db('students').truncate();
});

afterAll( async () => {
  await db.destroy();
});

const testStudents = [ 
  { name: 'harry p', house: 'Gryffindor' },
  { name: 'luna l', house: 'Ravenclaw' }
];

const updatedStudents = [ 
  { name: 'Harry Potter', house: 'Gryffindor' },
  { name: 'Luna Lovegood', house: 'Ravenclaw' }
];

describe('server', () => {

  describe('[GET] /api/students', () => {
    beforeEach( async () => {
      await db('students').insert(testStudents);
    });
    it('responds with a 200 OK', async () => {
      const res = await request(server).get('/api/students');
      expect(res.status).toBe(200);
    })
    it('returns a list of students', async () => {
      const res = await request(server).get('/api/students');
      expect(res.body).toMatchObject(testStudents);
      // const res = reqest(server).post('/students').send({ name: 'pippin'});
    });
  });

});