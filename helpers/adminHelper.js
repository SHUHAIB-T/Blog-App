const { ObjectId } = require("mongodb");
const db = require("../config/connection");
const bcrypt = require("bcrypt");

module.exports = {
  doLogin: (user) => {
    return new Promise(async (resolve, reject) => {
      let admin = await db
        .get()
        .collection("admin")
        .findOne({ email: user.Email });
      if (admin) {
        if (admin.password === user.Password) {
          delete admin.password;
          resolve(admin);
        } else {
          reject("password does not match");
        }
      } else {
        reject("admin not found");
      }
    });
  },
  getAllusers: () => {
    return new Promise(async (resolve, reject) => {
      let userData = await db.get().collection("users").find().toArray();
      resolve(userData);
    });
  },
  deleteUser: (user_id) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection("users")
        .deleteOne({ _id: new ObjectId(user_id) });
      resolve();
    });
  },
  getUser: (user_id) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection("users")
        .findOne({ _id: new ObjectId(user_id) })
        .then((result) => {
          resolve(result);
        });
    });
  },
  updateUser: (user_id, userData) => {
    return new Promise(async (resolve, reject) => {
      delete userData._id;
      if (userData.password === "") {
        delete userData.password;
      } else {
        userData.password = await bcrypt.hash(userData.password, 10);
      }
      let existUser = await db
        .get()
        .collection("users")
        .find({ _id: { $ne: new ObjectId(user_id) }, email: userData.email })
        .toArray();
      if (existUser.length > 0) {
        reject("the email is already used");
      } else {
        await db
          .get()
          .collection("users")
          .updateOne({ _id: new ObjectId(user_id) }, { $set: userData });
        resolve();
      }
    });
  },
  searchUser: (userName) => {
    return new Promise(async (resolve, reject) => {
      let user = await db
        .get()
        .collection("users")
        .find({ userName: { $regex: userName, $options: "i" } })
        .toArray();
      resolve(user);
    });
  },
};
