const mongoose = require('mongoose');

const dbURI = 'mongodb://admin:admin@tweb-test-shard-00-00-vn3wy.mongodb.net:27017,tweb-test-shard-00-01-vn3wy.mongodb.net:27017,tweb-test-shard-00-02-vn3wy.mongodb.net:27017/test?ssl=true&replicaSet=TWEB-test-shard-0&authSource=admin&retryWrites=true'

const options = {
    useNewUrlParser: true,
    dbName: 'tweb-test',
  };
  
  mongoose.connect(dbURI, options);
  
  const ObjectId = mongoose.Types.ObjectId;


  const messageSchema = new mongoose.Schema({
    authorId: {type: String, required: true},
    content: { type: String, required: true },
    like: { type: Array, required: true, default: [] },
    timestamp: { type: Date, required: true, default: Date.now }
  });

  const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    messages: { type: [String], required: true, default: [] },
    following: { type: [String], required: true, default: [] },
    followers: { type: [String], required: true, default: [] },
    image: {type: String, required: true, default: "https://www.shareicon.net/data/128x128/2016/05/29/772557_user_512x512.png"}
  });

const UserModel = mongoose.model('user', userSchema);
const MessageModel = mongoose.model('message', messageSchema);

module.exports = { UserModel, MessageModel, ObjectId };