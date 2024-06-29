const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  timestamp : {type : Date},
  confidence: { type: Number },
  eye_contact: { type: Number },
  clarity: { type: Number },
  boldness: { type: Number },
  overall: { type: Number }
});

const courseSchema = new mongoose.Schema({
  course_id: { type: Number },
  course_name: { type: String },
  course_link: { type: String },
  completion_status: { type: Number },
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  username: {
    type: String,
    default: function () {
      return this.email.substring(0, this.email.indexOf('@')) || '';
    },
    unique: true,
  },
  subscription: { type: Number, default: 0 },
  overall_score: { type: Number, default: 0 },
  course: {
    type: [courseSchema], // Change to an array of courseSchema
    default: []
  },
  score: {
    type: [scoreSchema], // Change to an array of scoreSchema
    default: []
  },
  coins: { type: Number, default: 0 },
  level: { type: Number, default: 0 },
  rank: {type: Number,default: 0}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
