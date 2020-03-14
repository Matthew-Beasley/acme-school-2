const { client } = require('./client');

const createStudents = async (name, school) => {
  const sql = `
  INSERT INTO students (name, school)
  VALUES ($1, $2)
  RETURNING *`;
  return (await client.query(sql, [name, school])).rows[0];
}


const readStudents = async () => {
  return (await client.query('SELECT * FROM students')).rows;
}


const updateStudents = async (name, school, id) => {
  const sql = `
  UPDATE students
  SET name = $1, school = $2
  WHERE id = $3
  RETURNING *`;
  return (await client.query(sql, [name, school, id])).rows[0];
}


const bulkSetSchoolNull = async (school) => {
  const sql = `
  UPDATE students
  SET school = NULL
  WHERE school = $1;`;
  return (await client.query(sql, [school])).rows;
}


const deleteStudents = async (id) => {
  const sql = `
  DELETE FROM students
  WHERE id = $1`;
  await client.query(sql, [id]);
}


module.exports = {
  createStudents,
  readStudents,
  updateStudents,
  bulkSetSchoolNull,
  deleteStudents
};
