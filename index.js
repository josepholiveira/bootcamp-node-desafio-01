const express = require("express");

const server = express();

server.use(express.json());

function checkIdProjectExists(req, res, next) {
  const { id } = req.params;
  const projectExist = projects.find(project => project.id === id);

  if (!projectExist) {
    return res.status(400).json({ error: "Project does not exist." });
  }

  return next();
}

server.use((req, res, next) => {
  amountOfRequests++;

  console.log(`Número de requisições feitas: ${amountOfRequests}`);

  return next();
});

const projects = [];
let amountOfRequests = 0;

server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.get("/projects/:id", checkIdProjectExists, (req, res) => {
  const { id } = req.params;

  const project = projects.find(project => project.id === id);

  return res.json(project);
});

server.post("/projects", (req, res) => {
  const { title, id } = req.body;

  projects.push({
    title,
    id,
    tasks: []
  });

  return res.json(projects);
});

server.put("/projects/:id", checkIdProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(project => project.id === id);

  project.title = title;

  return res.json(project);
});

server.delete("/projects/:id", checkIdProjectExists, (req, res) => {
  const { id } = req.params;

  const project = projects.find(project => project.id === id);

  projects.splice(project, 1);

  return res.send();
});

server.post("/projects/:id/tasks", (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const project = projects.find(project => project.id === id);

  project.tasks.push(title);

  return res.json(projects);
});

server.listen(3000);
