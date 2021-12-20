// Connect mongo
const mongoose = require('mongoose');

const MONGODB_URL = 'mongodb+srv://root:vnpt@cluster0.wabrb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => console.log('MongoDB --  database connection established successfully!'));
connection.on('error', (err) => {
	console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
	process.exit();
});

module.exports = mongoose;


//conect Redis
const Redisdb = require('./redis/redisdb');

var db = Redisdb.create({		
    host: "10.70.123.66",
    port: "6379"
});

global.db = db;

db.client.on('error', function () {
	console.log((new Date()) + " Redis: disconnected");
	process.exit();
});