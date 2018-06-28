"use strict";

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// ===== Define UserSchema & UserModel =====
const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, 
  dishId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
  content: { type: String, required: true }, 
});

noteSchema.set("timestamps", true);

noteSchema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id; 
    delete ret._id;
    delete ret.__v;
    delete ret.password; 
  }
});

noteSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

noteSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model("Note", noteSchema);
