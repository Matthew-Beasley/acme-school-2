import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const ManageStudent = (props) => {
  const { students, setStudents, schools, history, setError } = props;
  const { studentid } = props.match.params;
  const [student, setStudent] = useState('');
  const [school, setSchool] = useState('');


  useEffect(() => {
    if (studentid) {
      setStudent(students.reduce((acc, pupil) => {
        if (pupil.id === studentid) {
          acc = pupil.name;
        }
        return acc;
      }, ''))
    }
  }, []);


  const updateStudent = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.put(`/api/students/${studentid}`, { name: student, school });
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
    history.push('/');
  }


  const deleteStudent = async () => {
    try {
      await axios.delete(`/api/students/${studentid}`);
      setStudents(students.filter(filteredStudent => filteredStudent.id !== studentid));
    } catch (err) {
      setError(err);
    }
    history.push('/');
  }


  return (
    <div className="form-container">
      {!studentid && <h3> Create Student</h3>}
      {!!studentid && <h3>Managing {student}</h3>}
      <form onSubmit={ev => updateStudent(ev)}>
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
          className="delete-button" type="button" disabled={studentid === undefined}
          onClick={() => deleteStudent()}>
          Delete
        </button>
      </form>
      <Link to="/"><h3>Back to Main View</h3></Link>
    </div>
  )
}


export default ManageStudent;
