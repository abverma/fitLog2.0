let DB = require('../mongoDb').DB;
let bcrypt = require('bcryptjs');
const COLLECTION_NAME = 'users';

function User(properties) {
  this.properties = properties;
  this.collection = COLLECTION_NAME;
}

User.prototype.find = function(options) {
  let _this = this;
  let database = new DB();

  return new Promise(function(resolve, reject) {
    database
      .connect()
      .then(function() {
        return database.find(_this.collection, options);
      })
      .then(function(data) {
        database.close();
        resolve(data);
      })
      .catch(function(err) {
        console.log(err);
        if (database) {
          database.close();
        }
        reject(err);
      });
  });
};

User.prototype.count = function(options) {
  let _this = this;
  let database = new DB();

  return new Promise(function(resolve, reject) {
    database
      .connect()
      .then(function() {
        return database.countDocuments(_this.collection, options);
      })
      .then(function(data) {
        database.close();
        resolve(data);
      })
      .catch(function(err) {
        console.log(err);
        if (database) {
          database.close();
        }
        reject(err);
      });
  });
};

User.prototype.create = function(payload) {
  let _this = this;
  let database = new DB();

  return new Promise(function(resolve, reject) {
    if (!payload) {
      reject('Empty payload for create not allowed.');
    } else {
      database
        .connect()
        .then(function() {
          return createHash(payload);
        })
        .then(function(newUser) {
          return database.insert(_this.collection, newUser);
        })
        .then(function(data) {
          let insertedIds = data.insertedIds;
          let tempArray = [];

          if (insertedIds && Object.keys(insertedIds).length) {
            Object.keys(insertedIds).forEach(function(key) {
              tempArray.push(insertedIds[key]);
            });

            return database.find(_this.collection, {
              query: {
                _id: {
                  $in: tempArray
                }
              }
            });
          } else {
            resolve();
          }
        })
        .then(function(data) {
          database.close();
          resolve(data);
        })
        .catch(function(err) {
          if (database) {
            database.close();
          }
          console.log(err);
          reject(err);
        });
    }
  });
};

User.prototype.update = function(query, setObj) {
  let _this = this;
  let database = new DB();

  return new Promise(function(resolve, reject) {
    database
      .connect()
      .then(function() {
        return database.update(_this.collection, query, setObj);
      })
      .then(function() {
        return database.find(_this.collection, {
          query: query
        });
      })
      .then(function(data) {
        database.close();
        resolve(data);
      })
      .catch(function(err) {
        if (database) {
          database.close();
        }
        reject(err);
      });
  });
};

User.prototype.remove = function(query) {
  let _this = this;
  let database = new DB();

  return new Promise(function(resolve, reject) {
    database
      .connect()
      .then(function() {
        return database.delete(_this.collection, query);
      })
      .then(function(data) {
        database.close();
        resolve(data);
      })
      .catch(function(err) {
        if (database) {
          database.close();
        }
        console.log(err);
        reject(err);
      });
  });
};

let createHash = function(newUser) {
  return new Promise(function(resolve, reject) {
    if (!newUser.password) {
      reject('Empty password');
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          bcrypt.hash(newUser.password, salt, function(err, hash) {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              newUser.password = hash;
              resolve(newUser);
            }
          });
        }
      });
    }
  });
};

User.prototype.verifyPassword = function(candidatePassword, hash) {
  //console.log('verifying password');
  return bcrypt.compare(candidatePassword, hash);
};

exports.User = User;
