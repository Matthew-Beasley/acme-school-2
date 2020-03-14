import React, { useState } from 'react';
import axios from 'axios';


const AddSchool = (props) => {
  const { schools, setSchools, setError } = props;
  const [school, setSchool] = useState('');

  const createSchool = async (ev) => {
    ev.preventDefault();
    try {
      const response = await axios.post('/api/schools', { name: school });
      setSchools([...schools, response.data]);
      setError('');
    } catch (err) {
      setError(err.response.data.message);
    }
    setSchool('')
  }


  return (
    <form id="create-school" onSubmit={ev => createSchool(ev)}>
      <h3>Create School</h3>
      <input
        type="text" placeholder="school name" value={school}
        onChange={ev => setSchool(ev.target.value)}
      />
      <input
        type="submit" value="Create" disabled={!school}
      />
    </form>
  )
}

export default AddSchool;
