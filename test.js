const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

// Create Schema
const PhotoSchema = new Schema({
    title: String,
    description: String
});

const Photo = mongoose.model('Photo', PhotoSchema);

// Create a photo
// Photo.create({
//     title: "Photo Title 2",
//     description: "Photo Description 2",
// });

// Read Photo
// Photo.find({}, (err, data) => {
//     console.log(data);
// });

// Update Photo
// const id = '61944879fc260bdcf49e980b';
// Photo.findByIdAndUpdate(
//     id, {
//         title: "Photo Title 1 Updated",
//         description: "Photo description 1 updated",
//     }, {
//         new: true
//     },
//     (err, data) => {
//         console.log(data)
//     }
// );

// Delete Photo
const id = '619449b3c4439f2dc0d3cde5';
Photo.findByIdAndDelete(id, (err, data) => {
    console.log('Photo removed...');
});