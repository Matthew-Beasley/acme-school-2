const { client } = require('./client');

const createSchools = async (name) => {
  const sql = `
  INSERT INTO schools (name)
  VALUES ($1)
  RETURNING *;`;
  return (await client.query(sql, [name])).rows[0];
}


const readSchools = async () => {
  return (await client.query('SELECT * FROM schools')).rows;
}


const bulkSetSchoolNull = async (school) => {
  const sql = `
  UPDATE students
  SET school = NULL
  WHERE school = $1;`;
  return (await client.query(sql, [school])).rows;
}


const updateSchools = async (name, id) => {
  const sql = `
  UPDATE schools
  SET name = $1
  WHERE id = $2
  RETURNING *;`;
  return (await client.query(sql, [name, id])).rows[0];
}


const deleteSchools = async (id) => {
  const sql = `
  DELETE FROM schools
  WHERE id = $1;`;
  await client.query(sql, [id]);
}

module.exports = {
  createSchools,
  readSchools,
  updateSchools,
  bulkSetSchoolNull,
  deleteSchools
};
