const { MongoClient } = require('mongodb');

// Connection URI from MongoDB Atlas
const uri = 'mongodb+srv://jareeri:J@far246761@cluster0.40fwpsc.mongodb.net/';

// // Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// // Connect to the MongoDB server
client.connect().then(() => {
  console.log('Connected to MongoDB Atlas');

  // Now you can perform CRUD operations here

}).catch(err => {
  console.error('Error connecting to MongoDB Atlas:', err);
});