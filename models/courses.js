const mongoose = require("mongoose");
// import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    course_id: { type: Number },
    course_name: { type: String },
    course_link: { type: String},
    completion_status: { type: Number},
});

// const courseCollectionSchema = new mongoose.Schema({
//     courseList: { type: [courseSchema], default: [] }
// });

// const CourseCollection = mongoose.model('CourseCollection', courseCollectionSchema);

module.exports = courseSchema;
