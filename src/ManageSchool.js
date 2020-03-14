import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const ManageSchool = (props) => {
  const { schools, setSchools, students, setStudents, setError } = props;
  const { id } = props.match.params;
  const [school, setSchool] = useState('')
  const [schoolId, setSchoolId] = useState(id);


  useEffect(() => {
    setError('');
    if (schoolId) {
      console.log('schoolId = ', schoolId)
      setSchool(schools.reduce((acc, campus) => {
        if (campus.id === schoolId) {
          acc = campus.name;
        }
        return acc;
      }, ''));
    }
  }, [schoolId]);


  const createSchool = async () => {
    try {
      const response = await axios.post('/api/schools', { name: school });
      setSchools([...schools, response.data]);
    } catch (err) {
      setError(err);
    }
  }


  const updateSchool = async () => {
    try {
      const response = await axios.put(`/api/schools/${schoolId}`, { name: school });
      setSchools(schools.map(campus => {
        if (campus.id === response.data.id) {
          campus.name = response.data.name;
        }
        return campus;
      }));
    } catch (err) {
      setError(err);
    }
    setSchool('');
  }


  const deleteSchool = () => {
    const updatedStudents = students.map(pupil => {
      if (pupil.school === school) {
        pupil.school = null;
      }
      return pupil;
    });
    Promise.all([
      axios.put(`/api/schools/bulkResetStudents/${school}`), //this should be part of delete in the db (whene I figure out how)
      axios.delete(`/api/schools/${schoolId}`)
    ]);
    setStudents(updatedStudents);
    setSchools(schools.filter(item => item.id !== schoolId));
    setSchool('');
    setSchoolId('');
  }


  const handleSchool = (ev) => {
    ev.preventDefault();
    if (!schoolId) {
      createSchool();
    } else {
      updateSchool();
    }
    setSchoolId('');
  }


  return (
    <div className="form-container">
      {!schoolId && <h3>Create School</h3>}
      {!!schoolId && <h3>Managing {school}</h3>}
      <form onSubmit={ev => handleSchool(ev)}>
        <input
          type="text" value={school} placeholder="school name"
          onChange={ev => setSchool(ev.target.value)}
        />
        <input type="submit" value="Submit" />
        <button
          className="delete-button" type="button" disabled={schoolId === undefined}
          onClick={() => deleteSchool()}>
          Delete
        </button>
      </form>
      <Link to="/"><h3>Back to Main View</h3></Link>
      <h3>Click to Manage a School</h3>
      <ul>
        {schools.map(campus => {
          return (
            <li key={campus.id} onClick={() => setSchoolId(campus.id)}>{campus.name}</li>
          )
        })}
      </ul>
    </div>
  )
}


export default ManageSchool;
