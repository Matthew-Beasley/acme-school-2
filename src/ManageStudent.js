import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const ManageStudent = (props) => {
  const { students, setStudents, schools, setError } = props;
  const { id } = props.match.params;
  const [student, setStudent] = useState('');
  const [school, setSchool] = useState('');
  const [studentId, setStudentId] = useState(id);


  useEffect(() => {
    setError('');
    if (studentId) {
      setStudent(students.reduce((acc, pupil) => {
        if (pupil.id === studentId) {
          acc = pupil.name;
        }
        return acc;
      }, ''))
    }
  }, [studentId]);


  const createStudent = async () => {
    try {
      const response = await axios.post('/api/students', { name: student, school });
      setStudents([...students, response.data]);
    } catch (err) {
      setError(err.message)
    }
    setStudent('');
  }


  const updateStudent = async () => {
    try {
      const response = await axios.put(`/api/students/${id}`, { name: student, school });
      setStudents(students.map(pupil => {
        if (pupil.id === response.data.id) {
          pupil.name = response.data.name;
          pupil.school = response.data.school;
        }
        return pupil;
      }));
    } catch (err) {
      setError(err.message);
    }
    setStudent('');
  }


  const deleteStudent = async () => {
    try {
      await axios.delete(`/api/students/${studentId}`);
      setStudents(students.filter(filteredStudent => filteredStudent.id !== studentId));
      setStudent('');
    } catch (err) {
      setError(err);
    }
    setStudentId('');
  }


  const handleStudent = (ev) => {
    ev.preventDefault();
    if (!studentId) {
      createStudent();
    } else {
      updateStudent();
    }
    setStudentId('')
  }


  return (
    <div className="form-container">
      {console.log('studentId = ', studentId)}
      {!studentId && <h3> Create Student</h3>}
      {!!studentId && <h3>Managing {student}</h3>}
      <form onSubmit={ev => handleStudent(ev)}>
        <input
          type="text" placeholder="student name" value={student}
          onChange={ev => setStudent(ev.target.value)}
        />
        <select onChange={ev => setSchool(ev.target.value)}>
          <option key="default" value="">choose school</option>
          {schools.map(campus => {
            return (
              <option key={campus.id} value={campus.name}>{campus.name}</option>
            )
          })}
        </select>
        <input type="submit" value="Submit" />
        <button
          className="delete-button" type="button" disabled={studentId === undefined}
          onClick={() => deleteStudent()}>
          Delete
        </button>
      </form>
      <Link to="/"><h3>Back to Main View</h3></Link>
      <h3>Click to Manage a Student</h3>
      <ul>
        {students.map(pupil => {
          return (
            <li key={pupil.id} onClick={() => setStudentId(pupil.id)}>{pupil.name}</li>
          )
        })}
      </ul>
    </div>
  )
}


export default ManageStudent;
