import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const ManageSchool = (props) => {
  const { schools, setSchools, students, setStudents, history, setError } = props;
  const { schoolid } = props.match.params;
  const [school, setSchool] = useState('')

  useEffect(() => {
    if (schoolid) {
      setSchool(schools.reduce((acc, campus) => {
        if (campus.id === schoolid) {
          acc = campus.name;
        }
        return acc;
      }, ''));
    }
  }, []);

  useEffect(() => {
    setError('');
  }, [])

  const updateSchool = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.put(`/api/schools/${schoolid}`, { name: school });
      setSchools(schools.map(campus => {
        if (campus.id === response.data.id) {
          campus.name = response.data.name;
        }
        return campus;
      }));
    } catch (err) {
      setError(err);
    }
    history.push('/');
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
      axios.delete(`/api/schools/${schoolid}`)
    ]);
    setStudents(updatedStudents);
    setSchools(schools.filter(item => item.id !== schoolid));
    history.push('/');
  }


  return (
    <div className="form-container">
      {!!schoolid && <h3>Managing {school}</h3>}
      <form onSubmit={ev => updateSchool(ev)}>
        <input
          type="text" value={school} placeholder="school name"
          onChange={ev => setSchool(ev.target.value)}
        />
        <input type="submit" value="Submit" disabled={!school} />
        <button
          className="delete-button" type="button" disabled={!school}
          onClick={() => deleteSchool()}>
          Delete
        </button>
      </form>
      <Link to="/"><h3>Back to Main View</h3></Link>
    </div>
  )
}


export default ManageSchool;
