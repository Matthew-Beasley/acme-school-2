import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddStudent from './AddStudent';
import AddSchool from './AddSchool';


const MainView = ({ students, setStudents, schools, setSchools, setError }) => {

  const updateDbEnrollment = async (pupil) => {
    try {
      await axios.put(`/api/students/${pupil.id}`,
        { name: pupil.name, school: pupil.school });
      setError('');
    } catch (err) {
      setError(err)
    }
  }


  const unEnroll = (student) => {
    setStudents(students.map(pupil => {
      if (pupil.id === student.id) {
        pupil.school = null;
      }
      return pupil;
    }));
    updateDbEnrollment(student)
  }


  const enrollStudent = (studentid, school) => {
    let pupilObj = null;
    setStudents(students.map(pupil => {
      if (pupil.id === studentid) {
        pupil.school = school.name;
        pupilObj = pupil;
      }
      return pupil;
    }));
    updateDbEnrollment(pupilObj)
  }


  return (
    <div id="main-view">
      <div id="mainview-forms">
        <AddStudent
          students={students} setStudents={setStudents}
          schools={schools} setError={setError}
        />
        <AddSchool
          schools={schools} setSchools={setSchools} setError={setError}
        />
      </div>
      <div className="main-div">
        <h3>Not Enrolled</h3>
        <ul>
          {students.filter(student => !student.school).map(pupil => {
            return (
              <li key={pupil.id}><Link to={`/student/${pupil.id}`}>{pupil.name}</Link></li>
            )
          })}
        </ul>
      </div>

      {schools.map(institute => {
        return (
          <div className="main-div" key={institute.id}>
            <h3><Link to={`/school/${institute.id}`}>{institute.name}</Link></h3>
            <select onChange={ev => enrollStudent(ev.target.value, institute)}>
              <option value="">enroll</option>
              {students.map(student => {
                return (
                  <option key={student.id} value={student.id}>{student.name}</option>
                )
              })}

            </select>
            <ul>
              {students.filter(student => student.school === institute.name).map(filteredStudent => {
                return (
                  <li key={filteredStudent.id}>
                    <Link to={`/student/${filteredStudent.id}`}>{filteredStudent.name}</Link>
                    <button
                      className="unenroll-button" type="button"
                      onClick={() => unEnroll(filteredStudent)}>UnEnroll
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default MainView;
