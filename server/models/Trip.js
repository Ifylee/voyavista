const { Schema, model } = require("mongoose");

const tripSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  img: {
    type: String,
  },
  additionalImages: [String],
  groupSize: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

const Trip = model("Trip", tripSchema);

module.exports = Trip;
