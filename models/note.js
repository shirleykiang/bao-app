"use strict";

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true }, 
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

module.exports = mongoose.model("Note", noteSchema);
