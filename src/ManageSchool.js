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


  const updateSchool = async (ev) => {
    ev.preventDefault();
    let campusId, campusName;
    try {
      const response = await axios.put(`/api/schools/${schoolid}`, { name: school });
      setSchools(schools.map(campus => {
        if (campus.id === response.data.id) {
          campus.name = response.data.name;
          campusId = response.data.id;
          campusName = response.data.name;
        }
        return campus;
      }));
      setError('');
    } catch (err) {
      setError(err.response.data.message);
    }
    const updated = students.map(pupil => {
      if (pupil.schoolId === schoolid) {
        pupil.schoolid = campusId;
        pupil.school = campusName;
      }
      return pupil;
    });
    setStudents(updated);
    history.push('/');
  }


  const deleteSchool = () => {
    const updatedStudents = students.map(pupil => {
      if (pupil.school === school) {
        pupil.school = null;
        pupil.schoolId = null;
      }
      return pupil;
    });
    try {
      Promise.all([
        axios.delete(`/api/schools/${schoolid}`)
      ]);
    } catch (err) {
      setError(err.response.data.message);
    }
    setStudents(updatedStudents);
    setSchools(schools.filter(item => item.id !== schoolid));
    history.push('/');
  }


  return (
    <div className="form-container">
      {!!schoolid && <h2>Managing {school}</h2>}
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
