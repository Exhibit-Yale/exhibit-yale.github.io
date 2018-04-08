const uuid = require('uuid/v1');

createTask = (db, creator, taskName, taskDescription, collaborators ) => {
  return new Promise((resolve, reject) => {
    const taskId = uuid();
    db.query('BEGIN')
    .then(db.query(
      'INSERT INTO tasks (id, name, description, creator, completed) VALUES ($1, $2, $3, $4, $5)',
      [taskId, taskName, taskDescription, creator, false]
    ))
    .then(resp => {
      return Promise.all([...collaborators, creator].map(email =>
        db.query(
          'INSERT INTO collaborates (email, task_id) VALUES ($1, $2)',
          [email, taskId]
        )
      ));
    })
    .then(db.query('COMMIT'))
    .then(resp => resolve(taskId))
    .catch(err => {
      console.log(err);
      db.query('ROLLBACK');
      reject('Sequence of queries to create task failed');
    })
  })
}

deleteTask = (db, taskId) => {
  return new Promise((resolve, reject) => {
    db.query('BEGIN')
    .then(db.query('DELETE FROM tasks WHERE id = $1', [taskId]))
    .then(db.query('DELETE FROM collaborates WHERE task_id = $1', [taskId]))
    .then(db.query('COMMIT'))
    .then(resp => resolve('Task deleted'))
    .catch(err => {
      db.query('ROLLBACK');
      reject('Sequence of queries to delete task failed');
    })
  })
}

toggleTaskStatus = (db, taskId, taskStatus) => {
  return new Promise((resolve, reject) => {
    db.query('BEGIN')
    .then(db.query('UPDATE tasks SET completed = $1 WHERE id = $2', [taskStatus, taskId]))
    .then(db.query('COMMIT'))
    .then(resp => resolve('Task status toggled'))
    .catch(err => {
      console.log(err);
      db.query('ROLLBACK');
      reject('Sequence of queries to toggle task status failed');
    })
  })
}

getTasks = (db, email) => {
  console.log(email);
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT id, name, completed, creator FROM collaborates INNER JOIN tasks ON collaborates.task_id = tasks.id WHERE email = $1',
      [email]
    ).then(resp => {
      resolve(resp.rows.map(row => ({
        id: row.id,
        name: row.name,
        completed: row.completed,
        isCreator: row.creator === email ? true : false
      })));
    })
    .catch(err => reject('Query to get tasks failed'));
  })
}

module.exports = {
  createTask,
  deleteTask,
  getTasks,
  toggleTaskStatus
}
