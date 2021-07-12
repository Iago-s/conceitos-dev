import React, { useState, useEffect } from 'react';

import api from './services/api';

import Header from './components/Header';

import './App.css';

const App = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Web project ${Date.now()}`,
      owner: 'Iago web',
    });

    setProjects([...projects, response.data]);
  }

  return (
    <>
      <Header title="Props" />
      {projects.map((project) => (
        <div key={project.id}>
          <li>{project.title}</li>
          <li>{project.owner}</li>
          <br />
        </div>
      ))}

      <button type="button" onClick={handleAddProject}>
        Add project
      </button>
    </>
  );
};

export default App;
