"use strict";

const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true/* , unique: true */ },
  category: { type: String, required: true },
  servings: { type: Number, required: true },
  image: { type: String }, // IS THIS PROPER WAY TO ADD IMAGE
  ingredients: [{ type: Array, required: true}],
  directions: [{ type: Array, required: true }],
  author: { type: mongoose.Schema.Types.ObjectId, required: true }
// reimplement when local storage gets integrated and can access 
  
});

recipeSchema.set("timestamps", true);

recipeSchema.set("toObject", { 
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model("Recipe", recipeSchema);
