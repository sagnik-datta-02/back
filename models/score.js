const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    confidence : {type : Number, default : 0},
    eye_contact : {type : Number, default : 0},
    clarity : {type : Number, default : 0},
    boldness : {type : Number, default : 0},
    overall : {type : Number, default : 0}
  });
  const scoreCollectionSchema = new mongoose.Schema({
    // overall_score : {type : Number, default : 0},
    scoreList : { type : [scoreSchema], default : []}
  });


  // const scoreCollection = mongoose.model('scoreCollection',scoreCollectionSchema);
  module.exports = scoreCollectionSchema;

  // new scoreCollectionSchema.sav