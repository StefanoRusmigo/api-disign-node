module.exports = {
  // disbable logging for production
  logging: false,
  db: {
    url: process.evn.MONGODB_URI
  }
};
