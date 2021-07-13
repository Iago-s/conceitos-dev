import React, { useState, useEffect } from 'react';

import api from './services/api';

import Header from './components/Header';
import ProductItem from './components/ProductItem';

import './App.css';

const App = () => {
  const [infos, setInfos] = useState({ title: '', owner: '' });
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    if (infos.title === '' || infos.owner === '') {
      return alert('Preencha os campos');
    }

    const data = {
      title: infos.title,
      owner: infos.owner,
    };

    const response = await api.post('projects', data);

    setProjects([...projects, response.data]);
    setInfos({ title: '', owner: '' });
  }

  return (
    <>
      <Header title="Projects" />
      <div className="container">
        <input
          type="text"
          placeholder="Title"
          value={infos.title}
          onChange={(e) => setInfos({ ...infos, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Owner"
          value={infos.owner}
          onChange={(e) => setInfos({ ...infos, owner: e.target.value })}
        />

        <button type="button" class="btn-add" onClick={handleAddProject}>
          Add project
        </button>

        {projects.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Colaborador</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <ProductItem
                  projects={projects}
                  setProjects={setProjects}
                  project={project}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default App;
