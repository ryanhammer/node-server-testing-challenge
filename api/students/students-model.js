const db = require('../../data/db-config.js');

const getAll = () => {
  return db('students');
}

const getById = async (id) => {
  const student = await db('students').where({ id }).first();
  return student;
}

const insert = async (student) => {
  const [id] = await db('students').insert(student, ['id', 'name', 'house']);
  return getById(id);
}

const update = async (id, student) => {
  await db('students').where('id', id).update(student);
  return getById(id);
}

const remove = async (id) => {
  const deletedStudent = await getById(id);
  await db('students').where('id', id).del();
  return deletedStudent;
}

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove
}