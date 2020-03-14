const { client } = require('./client');

const build = async () => {
  const sql = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS students;
  DROP TABLE IF EXISTS schools;
  
  CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL CHECK(char_length(name) > 0)
  );
  
  CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL CHECK(char_length(name) > 0),
    school VARCHAR(100)
  );`;
  await client.query(sql);
}

build();
