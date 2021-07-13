import React, { useState } from 'react';

import api from '../services/api';

import './Header.css';

const ProductItem = (props) => {
  const [editable, setEditable] = useState(false);

  const [title, setTitle] = useState(props.project.title);
  const [owner, setOwner] = useState(props.project.owner);

  async function handleDeleteProject(projectId) {
    const confirmation = confirm('Deseja realmente apagar?');

    if (confirmation) {
      await api.delete(`projects/${projectId}`);

      const newProjects = props.projects.filter(
        (project) => project.id !== projectId
      );

      props.setProjects(newProjects);
    }

    return;
  }

  async function handleUpdateProject(projectId) {
    if (title === props.project.title && owner === props.project.owner) {
      setEditable(false);
      return;
    }

    const data = { title: title, owner: owner };

    await api.put(`projects/${projectId}`, data);

    const newProjects = props.projects.map((project) => {
      if (project.id === projectId) {
        project.title = title;
        project.owner = owner;
      }

      return project;
    });

    props.setProjects(newProjects);

    setEditable(false);
  }

  return (
    <tr key={props.project.id}>
      {editable ? (
        <>
          <td>
            <input
              type="text"
              placeholder={props.project.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              placeholder={props.project.owner}
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
          </td>
          <td>
            <button className="btn-danger" onClick={() => setEditable(false)}>
              Cancelar
            </button>
            <button
              className="btn-edit"
              onClick={() => handleUpdateProject(props.project.id)}
            >
              Atualizar
            </button>
          </td>
        </>
      ) : (
        <>
          <td>{props.project.title}</td>
          <td>{props.project.owner}</td>
        </>
      )}

      {!editable && (
        <>
          <td>
            <button
              className="btn-danger"
              onClick={() => handleDeleteProject(props.project.id)}
            >
              Apagar
            </button>
            <button className="btn-edit" onClick={() => setEditable(true)}>
              Editar
            </button>
          </td>
        </>
      )}
    </tr>
  );
};

export default ProductItem;
