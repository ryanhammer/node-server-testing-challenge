const db = require('../../data/db-config.js');

const getAll = () => {
  return db('students');
}

const getById = async (id) => {
  const student = await db('students').where({ id }).first();
  return student;
}

const insert = async (student) => {
  return null;
}

const update = async (id, student) => {
  return null;
}

const remove = (id) => {
  return null;
}

module.exports = {
  getAll,
  getById,
  insert,
  update,
  remove
}