"use strict";

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// ===== Define UserSchema & UserModel =====
const noteSchema = new mongoose.Schema({
  userId: { type: Number, required: true, ref: "User" }, // don't know what ref's are for
  dishId: { type: Number, required: true, ref: "Dish" }, 
  content: { type: String, required: true, ref: "Username" }, // don't know what ref's are for
});

noteSchema.set("timestamps", true);

noteSchema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id; // QUESTION WHAT IS RET?
    delete ret._id;
    delete ret.__v;
    delete ret.password; // why delete all of these? 
  }
});

noteSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

noteSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model("Note", noteSchema);
