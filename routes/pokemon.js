// Import required modules
const express = require('express');
const axios = require('axios'); // Used to fetch data : PokeAPI
const NodeCache = require('node-cache'); // In-memory cache

const router = express.Router();
// Setting TTL
const cache = new NodeCache({ stdTTL : 600});

// GET /pokemon/:name : Fetch Pokemon details by name
router.get('/:name', async(req,res) => {
    const name = req.params.name.toLowerCase();
    // Input validation: allowing only lowercase letters, numbers and hypens
    if (!/^[a-z0-9\-]+$/.test(name)){
        return res.status(400).json({error: 'Invalid Pokemon name Format'});
    }
    if (cache.has(name)) return res.json(cache.get(name));

    try{
        // Fetch Pokemon data 
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = response.data;

        // Extract relevant fields
        const result = {
            name: data.name,
            types: data.types.map(t => t.type.name),
            abilities: data.abilities.map(a => a.ability.name),
            image: data.sprites.front_default
        };

        cache.set(name, result);

        // Send result to client
        res.json(result);
    } catch(error){
        res.status(404).json({error: 'Pokemon not found'});
    }
});

// Export the router to be used in index.js
module.exports = router;