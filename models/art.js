getAllArt = (db) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT art.id as artid, artist.name as artistName, artist.picture_link as artistPicture, art.name as artName, art.is_available, art.picture_link as artPicture FROM artist INNER JOIN art ON artist.id = art.artist_id'
    ).then(resp => {
      resolve(resp.rows.map(row => ({
        id: row.id,
        artistname: row.artistName,
        artname: row.artName,
        pfp: row.artistPicture,
        picture: row.artPicture,
        is_available: row.is_available
      })));
    })
    .catch(err => reject('Query to get tasks failed'));
  })
}

module.exports = {
  getAllArt
}
