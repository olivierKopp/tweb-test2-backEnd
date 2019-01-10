const { buildSchema } = require('graphql');
const { MovieModel, UserModel } = require('../database/database');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
type movie {
  id: String!,
  vote_count: Int!,
  video: Boolean!,
  vote_average: Float!,
  title: String!,
  popularity: Float!,
  poster_path: String!,
  original_language: String!,
  original_title: String!,
  backdrop_path: String!,
  adult: Boolean!,
  overview: String!,
  release_date: String!,
  tmdb_id: Int!,
  genres: [String]!,
}

type User {
  id: String!,
  username: String!,
  password: String!,
  watchList: [String]!
}

  type Query {
    getMovies(offset : Int!): [movie],
    getWatchList(username : String!) : [String]
  }

  type Mutation {
    register(username : String!, password : String!) : User,
    addInWatchList(username : String!, moviesId : [String]!) : Boolean,
    removeFromWatchList(username : String!, moviesId : [String]!) : Boolean
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  getMovies({ offset }) {
    return new Promise((resolve) => {
      MovieModel.find()
        .then((data) => {
          const begin = (offset * 100) + offset;
          const end = (offset + 1) * 100;
          const finalData = data.slice(begin, end);
          resolve(finalData);
        })
        .catch((err) => {
          resolve(err);
        });
    });
  },
  register({ username, password }) {
    return new Promise((resolve) => {
      const newUser = new UserModel({ username, password });
      UserModel.findOne({ username }, { password: 0 }).then((data) => {
        if (data === null) {
          newUser.save()
            .then((savedUser) => {
              const userCreated = savedUser;
              userCreated.password = '';
              resolve(userCreated);
            });
        } else {
          resolve(null);
        }
      });
    });
  },
  addInWatchList({ username, moviesId }) {
    return new Promise((resolve) => {
      const promises = [];
      // check if the user exist
      UserModel.findOne({ username })
        .then((userFound) => {
          if (userFound === null) {
            resolve(false);
          } else {
            moviesId.forEach(
              (element) => {
                promises.push(UserModel.updateOne(
                  { username },
                  { $addToSet: { watchList: element } },
                ));
              },
            );
            Promise.all(promises)
              .then(() => {
                resolve(true);
              })
              .catch(() => {
                resolve(false);
              });
          }
        });
    });
  },
  removeFromWatchList({ username, moviesId }) {
    return new Promise((resolve) => {
      const promises = [];
      // check if the user exist
      UserModel.findOne({ username })
        .then((userFound) => {
          if (userFound === null) {
            resolve(false);
          } else {
            moviesId.forEach((element) => {
              promises.push(UserModel.updateOne({ username }, { $pull: { watchList: element } }));
            });
            Promise.all(promises)
              .then(() => {
                resolve(true);
              })
              .catch(() => {
                resolve(false);
              });
          }
        });
    });
  },
  getWatchList({ username }) {
    return new Promise((resolve) => {
      // check if the user exist
      UserModel.findOne({ username })
        .then((userFound) => {
          if (userFound === null) {
            resolve(null);
          } else {
            resolve(userFound.watchList);
          }
        });
    });
  },
};

module.exports = { schema, root };
