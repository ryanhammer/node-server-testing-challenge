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

const testStudents = [ 
  { name: 'harry p', house: 'Gryffindor' },
  { name: 'luna l', house: 'Ravenclaw' }
];

describe('Students', () => {

  describe('sanity', () => {

    test('Students is defined', () => {
      expect(Students).toBeDefined();
    });
    test('Environment is correct', () => {
      expect(process.env.DB_ENV).toBe('testing');
    });

  });

  describe('getaAll()', () => {
    
    it('resolves to list of students', async () => {
      let students = await Students.getAll();
      expect(students).toHaveLength(0);
      await db('students').insert(testStudents[0]);
      students = await Students.getAll();
      expect(students).toHaveLength(1);
      await db('students').insert(testStudents[1]);
      students = await Students.getAll();
      expect(students).toHaveLength(2);
    });
    it('resolves to students of the correct shape', async () => {
      await db('students').insert(testStudents);
      const students = await Students.getAll();
      expect(students).toMatchObject(testStudents);
    });

  });

  describe('getById()', () => {
    
    it('resolves to a single student object', async () => {
      let student = await Students.getById(1);
      expect(student).not.toBeDefined;
      await db('students').insert(testStudents[0]);
      student = await Students.getById(1);
      expect(student).toMatchObject(testStudents[0]);
    });
    it('resolves to the correct student object', async () => {
      await db('students').insert(testStudents);
      let student = await Students.getById(1);
      expect(student).toMatchObject(testStudents[0]);
      student = await Students.getById(2);
      expect(student).toMatchObject(testStudents[1]);
    });
  
  });

});