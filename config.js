// All configuration that could vary by deployment
// should go in here: port, database url, etc.
module.exports = {
    port: process.env.PORT || 3000,
    databaseURL: process.env.DATABASE_URL,
};
