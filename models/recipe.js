"use strict";

const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true/* , unique: true */ },
  category: { type: String, required: true },
  servings: { type: Number, required: true },
  image: [{ type: String, ref: "Image" }], // IS THIS PROPER WAY TO ADD IMAGE
  ingredients: [{ type: Array, ref: "Ingredients" }],
  directions: [{ type: Array, ref: "Directions" }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  
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
