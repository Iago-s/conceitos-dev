const { request } = require('express');
const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

const PORT = 3333;
app.use(express.json());

const projects = [];

function logRequests(req, res, next) {
  const { method, url } = req;

  const logLabel = `${method.toUpperCase()}: ${url}`;

  console.time();
  console.log(logLabel);

  next();

  console.timeEnd();
}

function validateProjectId(req, res, next) {
  const { id } = req.params;

  if (!isUuid(id)) {
    return res.status(400).json({ error: true, message: 'Invalid ID' });
  }

  return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (req, res) => {
  const { title } = req.query;

  if (title) {
    const filteredProjects = projects.filter((project) =>
      project.title.includes(title)
    );

    return res.json(filteredProjects);
  }

  return res.json(projects);
});

app.post('/projects', (req, res) => {
  const { title, owner } = req.body;

  const project = {
    id: uuid(),
    title,
    owner,
  };

  projects.push(project);

  return res.status(201).json(project);
});

app.put('/projects/:id', (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({ error: true, message: 'Project not found' });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return res.json(project);
});

app.delete('/projects/:id', (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({ error: true, message: 'Project not found' });
  }

  projects.splice(projectIndex, 1);

  return res.status(204).send();
});

app.listen(PORT, () =>
  console.log(`Server started in http://localhost:${PORT}`)
);
