addTransaction = (db, artId, email, phone, price) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO transaction (art_id, price, is_complete, buyer_email, buyer_phone, is_scheduled) VALUES ($1)', [artId, price, false, email, phone, false])
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
  addTransaction
}
