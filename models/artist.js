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
  console.log(artId);
  // TODO fix this for 1 row
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT name, email, insta, picture_link as pfp, bio FROM artist WHERE artist.id = $1'
      [artistId]
    ).then(resp => {
      resolve(resp.rows.map(row => ({
        id: row.id,
        artName: row.art_name,
        picture: row.art_picture,
        is_available: row.is_available,
        artistName: row.artist_name,
        pfp: row.pfp
      })));
    })
    .catch(err => reject('Query to get tasks failed'));
  })
}

module.exports = {
  getArtists
}
