const {Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();




router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);

    if(!genre) return res.status(404).send('The genre with the given id is not found.');

    res.send(genre);
});

router.post('/', async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const genre = await new Genre({
        name: req.body.name
    });

    try {
        await genre.save();
        res.send(genre);
    }
    catch(ex) {
        for (let field in ex.errors)
            res.send(ex.errors[field].message);
    }
    
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.name
        }    
    }, {new: true});    
    if(!genre) return res.status(404).send('The genre with the given id is not found.');

    res.send(genre);

});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(404).send('The genre with the given id is not found.');

    res.send(genre);
});


module.exports = router;