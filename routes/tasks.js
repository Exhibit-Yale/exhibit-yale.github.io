var express = require('express');
var router = express.Router();

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const taskModels = require('../models/tasks.js');

/* POST create task. */
router.post('/create', (req, res) => {
  console.log(req.url);
  const { creator, taskName, taskDescription, collaborators } = req.body;
  const db = req.app.get('db');
  console.log(creator, taskName, taskDescription, collaborators);

  if (taskName === '' || taskDescription === '') {
    res.status(400).json({
      error: 'Name and description cannot be empty'
    });
  }
  else if (taskName.length > 500) {
    res.status(400).json({
      error: 'Task name cannot be longer than 500 letters'
    });
  }
  else if (collaborators.some(email => !email.match(emailRegex))) {
    res.status(400).json({
      error: 'Invalid email format for a collaborator used'
    });
  }
  else {
    taskModels.createTask(db, creator, taskName, taskDescription, collaborators)
    .then(taskId => res.status(200).send({ id: taskId }))
    .catch(err => res.status(400).send({ error: err }));
  }
})

/* GET delete task */
router.get('/delete', (req, res) => {
  const { id } = req.query;
  const db = req.app.get('db');

  taskModels.deleteTask(db, id)
  .then(resp => res.status(200).send({}))
  .catch(err => res.status(400).send({ error: err }));
})

/* GET toggle task completion status */
router.get('/toggle', (req, res) => {
  const { id, completed } = req.query;
  const db = req.app.get('db');

  taskModels.toggleTaskStatus(db, id, completed === 'true' ? true : false)
  .then(resp => res.status(200).send({}))
  .catch(err => res.status(400).send({ error: err }));
})

/* GET get user's tasks */
router.get('/', (req, res) => {
  const { email } = req.query;
  const db = req.app.get('db');

  taskModels.getTasks(db, email)
  .then(tasks => {
    console.log(tasks);
    res.json({ tasks: tasks });
  })
  .catch(err => res.status(400).send({ error: err }));
})

module.exports = router;
