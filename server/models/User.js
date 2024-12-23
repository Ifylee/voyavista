const { Schema, model } = require("mongoose");

const bcyrpt = require("bcrypt");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  purchased: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
  wishList: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
});

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcyrpt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await bcyrpt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
