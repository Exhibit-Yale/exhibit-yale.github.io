addConsumer = (db, email) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO consumer (email) VALUES ($1)', [email])
    .then(resp => {
      resolve(resp);
    })
    .catch(err => {
      console.log(err);
      reject('Sequence of queries to toggle task status failed');
    })
  })
}

module.exports = {
  addConsumer
}
