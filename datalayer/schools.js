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


const updateSchools = async (name, id) => {
  //I need to do student update in the same statement as school update but postgress
  //only lets me do one query per prepared statement. Need to learn sql better :-)
  const studentSql = `
  UPDATE students
  SET school = $1,
      "schoolId" = $2
  WHERE "schoolId" = $2;`;
  
  const schoolSql = `
  UPDATE schools
  SET name = $1
  WHERE id = $2
  RETURNING *;`;

  let response;

  Promise.all([
    await client.query(studentSql, [name, id]),
    response = await client.query(schoolSql, [name, id])
  ]);
  return response.rows[0];
}


const deleteSchools = async (id) => {
  const studentSql = `
  UPDATE students
  SET school = NULL,
      "schoolId" = NULL
  WHERE "schoolId" = $1;`;

  const schoolSql = `
  DELETE FROM schools
  WHERE id = $1;`;

  Promise.all([
    await client.query(studentSql, [id]),
    await client.query(schoolSql, [id])
  ]);
}

module.exports = {
  createSchools,
  readSchools,
  updateSchools,
  deleteSchools
};
