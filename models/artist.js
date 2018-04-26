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

getArtistDetails = (db, artistId) => {
  console.log('getArtistDetails')
  console.log(artistId);
  // TODO fix this for 1 row
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT name, email, insta, picture_link as pfp, bio FROM artist WHERE artist.id = $1',
      [artistId]
    ).then(resp => {
      resolve(resp.rows[0]);
    })
    .catch(err => reject('Query to get tasks failed'));
  })
}

module.exports = {
  getAllArtists,
  getArtistDetails
}
