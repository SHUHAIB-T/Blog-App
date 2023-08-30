const db = require("../config/connection");
const bcrypt = require("bcrypt");
module.exports = {
  createUser: (user) => {
    return new Promise(async (resolve, reject) => {
      let data = await db
        .get()
        .collection("users")
        .findOne({ email: user.email });
      if (data === null) {
        user.createdOn = new Date();
        user.password = await bcrypt.hash(user.password, 10);
        await db.get().collection("users").insertOne(user);
        resolve();
      } else {
        reject();
      }
    });
  },
  doLogin: (data) => {
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection("users")
        .findOne({ email: data.Email });
      if (user) {
        await bcrypt.compare(data.Password, user.password).then((states) => {
          console.log(states);
          if (states) {
            delete user.password;
            resolve(user);
          } else {
            reject("password does not match");
          }
        });
      } else {
        reject("user not found");
      }
    });
  },
  creteBlog: (blogData) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection("blogs")
        .insertOne(blogData)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  getBlog: (userID) => {
    return new Promise(async (resolve, reject) => {
      let blogs = await db
        .get()
        .collection("blogs")
        .find({ userID: userID })
        .toArray();
      resolve(blogs);
    });
  },
};
