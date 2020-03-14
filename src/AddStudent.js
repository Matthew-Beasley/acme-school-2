import React, { useState } from 'react';
import axios from 'axios';


const AddStudent = (props) => {
  const { students, setStudents, schools, setError } = props;
  const [student, setStudent] = useState('');
  const [school, setSchool] = useState('');

  const createStudent = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post('/api/students', { name: student, school });
      setStudents([...students, response.data]);
      setError('');
    } catch (err) {
      setError(err.response.data.message)
    }
    setStudent('');
  }


  return (
    <form id="create-student" onSubmit={ev => createStudent(ev)}>
      <h3>Create Student</h3>
      <input
        type="text" placeholder="student name" value={student}
        onChange={ev => setStudent(ev.target.value)}
      />
      <select onChange={ev => setSchool(ev.target.value)}>
        <option value="">choose school</option>
        {schools.map(campus => {
          return (
            <option
              key={campus.id} value={campus.id}>{campus.name}
            </option>
          )
        })}
      </select>
      <input type="submit" value="Create" disabled={!student} />
    </form>
  )
}

export default AddStudent;
