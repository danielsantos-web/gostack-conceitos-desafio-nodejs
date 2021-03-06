const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

//---------------------------------------------------------GET
app.get("/repositories", (request, response) => {
  
  return response.json(repositories);

});

//---------------------------------------------------------POST
app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;

  const repository = {
    id:  uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository);
});

//---------------------------------------------------------PUT
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const findRepositoryId = repositories.findIndex(repository => 
    repository.id == id
  );

  if(findRepositoryId == -1){
    return response.status(400).json({error: 'Repository not found.'})
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[findRepositoryId].likes,
  }

  repositories[findRepositoryId] = repository;

  return response.json(repository);

});

//---------------------------------------------------------DELETE
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const findRepositoryId = repositories.findIndex(repository => 
    repository.id == id
  );

  if(findRepositoryId >= 0){
    repositories.splice(findRepositoryId, 1);
  } else {
    return response.status(400).json({error: 'Repo not exists'})
  }

  return response.status(204).send();
});

//---------------------------------------------------------POST LIKE
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRepositoryId = repositories.findIndex(repository => 
    repository.id == id
  );

  if(findRepositoryId == -1){
    return response.status(400).json({error: "repo not found"})
  }

  repositories[findRepositoryId].likes += 1;

  return response.json(repositories[findRepositoryId]);


});

module.exports = app;
