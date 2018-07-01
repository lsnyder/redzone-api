const dev ={
  db: {
    host: 'free-dev-01-gwb63.mongodb.net/teams',
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD
  }
}

module.exports = dev