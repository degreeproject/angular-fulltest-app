const mongodb = require('mongodb');
const config = require('../config');

const DUPL_USER = 11000;

class UserService {
   /**
   * Loads the user collection from MongoDB
   */
  static async loadUserCollection() {
    const client = await mongodb.MongoClient.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    return client.db('kex-test-app').collection('users');
  }
  static async getUsers() {
    try {
      const usersCollection = await this.loadUserCollection();
      const users = await usersCollection.find().toArray()
      if (users.length === 0 || !users)
        console.log("No users found in getUsers")
      return users;
    } catch (err) {
      console.log(err)
    }
  }
  static async submitUser(newUser) {
    try {
      const userCollection = await this.loadUserCollection();
      await userCollection.insertOne(newUser);
    } catch (err) {
      if (err.code === DUPL_USER)
        throw new Error('A user with that username already exists');

      throw new Error('Database error');
    }
  }
  static async authenticateUser(username, password) {
    try {
      const userCollection = await this.loadUserCollection();
      const foundUser = await userCollection.findOne({
        username
      }, {
        projection: {
          _id: 0,
          password: 1
        }
      });
      if (!foundUser) {
        console.log('Error in authenticateUser, no user found')
        throw new Error('No such user');
      }
      return (password === foundUser.password);
    } catch (err) {
      if (err instanceof MyError)
        throw err;
      console.log('Error in authenticateUser: ', err);
      throw new Error('Database error');
    }
  }
}

module.exports = UserService;
