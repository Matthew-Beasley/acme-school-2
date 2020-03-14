const {
  createSchools,
  readSchools,
  updateSchools,
  bulkSetSchoolNull,
  deleteSchools
} = require('./schools');

const {
  createStudents,
  readStudents,
  updateStudents,
  deleteStudents
} = require('./students');


module.exports = {
  createSchools,
  readSchools,
  updateSchools,
  bulkSetSchoolNull,
  deleteSchools,

  createStudents,
  readStudents,
  updateStudents,
  deleteStudents
};
