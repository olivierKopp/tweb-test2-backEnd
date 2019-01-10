const mongoose = require('mongoose');

const dbURI = 'mongodb://admin:admin@tweb-test-shard-00-00-vn3wy.mongodb.net:27017,tweb-test-shard-00-01-vn3wy.mongodb.net:27017,tweb-test-shard-00-02-vn3wy.mongodb.net:27017/test?ssl=true&replicaSet=TWEB-test-shard-0&authSource=admin&retryWrites=true';

const options = {
  useNewUrlParser: true,
  dbName: 'movie-time',
};

mongoose.connect(dbURI, options);

const { ObjectId } = mongoose.Types;

const movieSchema = new mongoose.Schema({
  vote_count: { type: Number, required: true, default : 0 },
  video: { type: Boolean, required: true, default : false},
  vote_average: { type: Number, required: true, default : 0},
  title: { type: String, required: true, default: "" },
  popularity: { type: Number, required: true, default: 0 },
  poster_path: { type: String, required: true, default: "" },
  original_language: { type: String, required: true, default: ""},
  original_title: { type: String, required: true, default: ""},
  backdrop_path: { type: String, required: true, default: ""},
  adult: { type: Boolean, required: true, default: false},
  overview: { type: String, required: true, default: ""},
  release_date: { type: String, required: true, default: ""},
  tmdb_id: { type: Number, required: true, default: 0},
  genres: { type: [String], required: true, default: [] },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  watchList: { type: [String], required: true, default: [] },
});

const MovieModel = mongoose.model('movie', movieSchema);
const UserModel = mongoose.model('user', userSchema);

module.exports = { MovieModel, UserModel, ObjectId };
