"use strict";

const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true/* , unique: true */ },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  servings: { type: Number, required: true },
  image: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }], // IS THIS PROPER WAY TO ADD IMAGE
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredients" }],
  directions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Directions" }],
  author: { type: String, required: true }
});

recipeSchema.set("timestamps", true);

recipeSchema.set("toObject", { //what does this code do? 
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model("Recipe", recipeSchema);
