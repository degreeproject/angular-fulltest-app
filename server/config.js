module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8080,
  URL: process.env.BASE_URL || 'http://localhost:8080',
  SECRET: process.env.SECRET || 'hemlighet',
  MONGODB_URI: process.env.MONGODB_URI || `mongodb://${process.env.DBUSER}:${process.env.DBPW}@ds139614.mlab.com:39614/kex-test-app`,
}
