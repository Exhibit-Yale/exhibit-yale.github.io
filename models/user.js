checkCredentials = (db, email, password) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM users WHERE email = $1 AND password_hash = $2',
      [email, hash(password)]
    ).then(resp => {
      if (resp.rows.length > 0) {
        resolve('User found');
      }
      else {
        reject('User either does not exist, or user exists and password is wrong');
      }
    })
    .catch(err => reject(err));
  });
}

registerUser = (db, name, email, password) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE email = $1', [email])
    .then(resp => resp.rows.length > 0 ? true : false)
    .then(doesUserExist => {
      if (doesUserExist) {
        reject('An account with this email already exists');
      }
      else {
        db.query('BEGIN')
        .then(db.query(
          'INSERT INTO users (email, password_hash) VALUES ($1, $2)',
          [email, hash(password)]
        ))
        .then(db.query('COMMIT'))
        .then(resp => resolve('User registered'))
        .catch(err => {
          console.log(err);
          db.query('ROLLBACK');
          reject('Query failed');
        });
      }
    })
  })
}

hash = (password) => {
  return require('crypto').createHash('md5').update(password).digest("hex");
}



module.exports = {
  checkCredentials,
  registerUser
}
