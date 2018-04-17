getAllArtists = (db) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT id, name, picture_link as pfp, FROM artist'
    ).then(resp => {
      resolve(resp.rows.map(row => ({
        id: row.id,
        artistName: row.name,
        pfp: row.pfp
      })));
    })
    .catch(err => reject('Query to get tasks failed'));
  })
}

module.exports = {
  getArtists
}
