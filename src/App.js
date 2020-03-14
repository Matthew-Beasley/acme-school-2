import React, { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import axios from 'axios';
import MainView from './MainView';
import ManageStudent from './ManageStudent';
import ManageSchool from './ManageSchool';


const App = () => {
  const [students, setStudents] = useState([]);
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    Promise.all([
      axios.get('/api/students'),
      axios.get('/api/schools')
    ])
      .then(values => {
        setStudents(values[0].data);
        setSchools(values[1].data);
      })
  }, []);

  return (
    <div id="app-container">
      <h1>Acme Schools</h1>
      {!!error && <div className="error-display">{error}</div>}

      <Route
        exact path="/" render={() => (<MainView
          schools={schools} students={students} setError={setError}
          setStudents={setStudents} setSchools={setSchools} />)}
      />

      <Route
        path={['/student/:studentid', '/student']} render={(props) => (<ManageStudent
          students={students} setStudents={setStudents} schools={schools}
          history={history} setError={setError} {...props} />)}
      />

      <Route
        path={['/school/:schoolid', '/school']} render={(props) => (<ManageSchool
          schools={schools} setSchools={setSchools} setStudents={setStudents}
          history={history} students={students} setError={setError} {...props} />)}
      />
    </div>
  )
}

export default App;
