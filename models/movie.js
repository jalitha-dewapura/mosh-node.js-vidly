const { genreSchema } = require('./genre');
const Joi = require('joi');
const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        minlength: 5,
        maxlength: 100
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        default: 0,
        min:0,
        max: 100
    },
    dailyRentalRate: {
        type: Number,
        default: 0,
        min:0,
        max: 100
    }
});

const Movie = mongoose.model('Movie', movieSchema);


function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(100).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).max(100),
        dailyRentalRate: Joi.number().min(0).max(100)
    });
    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;