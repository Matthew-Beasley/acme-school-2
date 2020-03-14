const { client } = require('./client');

const createStudents = async (name, school) => {
  const schoolHack = school; //This fixes a known postgres bug (inconsistent types deduced for parameter)
  const sql = `              
  INSERT INTO students (name, school, "schoolId")
  VALUES ($1, $2, (SELECT id FROM schools WHERE name = $3))
  RETURNING *`;
  return (await client.query(sql, [name, school, schoolHack])).rows[0];
}


const readStudents = async () => {
  return (await client.query('SELECT * FROM students')).rows;
}


const updateStudents = async (name, school, id) => {
  const schoolHack = school;
  const sql = `
  UPDATE students
  SET name = $1, school = $2, "schoolId" = (SELECT id FROM schools WHERE name = $3)
  WHERE id = $4
  RETURNING *`;
  return (await client.query(sql, [name, school, schoolHack, id])).rows[0];
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
  deleteStudents
};
