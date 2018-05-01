addTransaction = (db, artId, email, phone, venmo, price) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO transactions (art_id, price, is_complete, buyer_email, buyer_phone, is_scheduled, venmo) VALUES ($1, $2, $3, $4, $5, $6, $7)', [artId, price, false, email, phone, false, venmo])
    .then(resp => {
      console.log(resp);
      resolve(resp);
    })
    .catch(err => {
      console.log(err);
      reject('Sequence of queries to toggle task status failed');
    })
  })
}

module.exports = {
  addTransaction
}
