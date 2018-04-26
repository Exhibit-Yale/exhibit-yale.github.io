getAllArt = (db) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT art.id as id, artist.name as artist_name, artist.picture_link as pfp, art.name as art_name, art.is_available, art.picture_link as art_picture FROM artist INNER JOIN art ON artist.id = art.artist_id'
    ).then(resp => {
      // console.log(resp);
      resolve(resp.rows.map(row => ({
        id: row.id,
        artistName: row.artist_name,
        artName: row.art_name,
        pfp: row.pfp,
        picture: row.art_picture,
        is_available: row.is_available
      })));
    })
    .catch(err => reject('Query to get tasks failed'));
  })
}

getArtByArtist = (db, artistId) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT id, name, picture_link, price, is_available FROM art WHERE artist_id = $1 ORDER BY id',
      [artistId]
    ).then(resp => {
      resolve(resp.rows);
    })
    .catch(console.log);
    // .catch(err => reject('Query to get tasks failed'));
  })
}


getArtDetails = (db, artId) => {
  console.log('getArtDetails')
  console.log(artId);
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT id, artist_id, name, description, is_available, picture_link, price FROM art WHERE id = $1',
      [artId] 
    ).then(resp => {
      resolve(resp.rows[0]);
    })
    .catch(err => reject('Query to get tasks failed'));
  })
}

module.exports = {
  getAllArt,
  getArtByArtist,
  getArtDetails
}
