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

describe('server.js', () => {

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
    });
  });

  describe('[GET] /api/students/:id', () => {
    beforeEach( async () => {
      await db('students').insert(testStudents);
    });
    it('responds with a 200 OK', async () => {
      const res = await request(server).get('/api/students/1');
      expect(res.status).toBe(200);
    });
    it('gets the correct student', async () => {
      let res = await request(server).get('/api/students/1');
      expect(res.body).toMatchObject(testStudents[0]);
      res = await request(server).get('/api/students/2');
      expect(res.body).toMatchObject(testStudents[1]);
    });
  });

  describe('[POST] /api/students', () => {
    
    it('creates a student in the database', async () => {
      await request(server).post('/api/students').send(testStudents[0]);
      await request(server).post('/api/students').send(testStudents[1]);
      const students = await db('students');
      expect(students[0]).toMatchObject(testStudents[0]);
      expect(students[1]).toMatchObject(testStudents[1]);
    });
    it('responds with the newly created student', async () => {
      const res1 = await request(server).post('/api/students').send(testStudents[0]);
      const res2 = await request(server).post('/api/students').send(testStudents[1]);
      expect(res1.body).toMatchObject({ id: 1, ...testStudents[0] });
      expect(res2.body).toMatchObject({ id: 2, ...testStudents[1] });
    });

  });

  describe('[PUT] /api/students/id', () => {
    beforeEach( async () => {
      await db('students').insert(testStudents);
    });
    it('updates a student in the database', async () => {
      await request(server).put('/api/students/1').send(updatedStudents[0]);
      await request(server).put('/api/students/2').send(updatedStudents[1]);
      const students = await db('students');
      expect(students[0]).toMatchObject(updatedStudents[0]);
      expect(students[1]).toMatchObject(updatedStudents[1]);
    });
    it('responds with the newly updated student', async () => {
      const res1 = await request(server).put('/api/students/1').send(updatedStudents[0]);
      const res2 = await request(server).put('/api/students/2').send(updatedStudents[1]);
      expect(res1.body).toMatchObject({ id: 1, ...updatedStudents[0] });
      expect(res2.body).toMatchObject({ id: 2, ...updatedStudents[1] });
    });
    
  });

});