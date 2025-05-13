// Import required modules
const express = require('express');
const OpenAI = require('openai'); // OpenAI SDK 
const Joi = require('joi'); // Input validation library

// Load environment variables
require('dotenv').config();

const router = express.Router();

// Intialize OpenAI client with API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// POST /story - Generate a creative Pokemon story using OpenAI
router.post('/', async (req,res) => {
    // Validation Schema
    const schema = Joi.object({
        pokemon: Joi.string()
        .pattern(/^[a-z0-9\-]+$/)
        .required()
        .messages({
            'string.pattern.base': 'Invalid Pokemon name Format',
        }),
        theme: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.min': 'Theme must be atleast 3 characters in length',
            'string.max': 'Theme must be within 100 characters in length'
        })
    });

    const {error} = schema.validate(req.body);
    if (error) return res.status(400).json({error: error.details[0].message});
    const {pokemon,theme} = req.body;

    try{
        // Create a prompt and send request to OpenAI's Chat Completion API
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a creative story writer.'},
                {role: 'user', content: `Write a fun story about the Pokémon ${pokemon} with the theme "${theme}". `}
            ],
            max_tokens:300,
        });

        // Extract story content 
        const story = response.choices[0].message.content.trim();
        res.json({story});

    } catch (err){
        res.status(500).json({error:'Failed to generate story'});
    }
    });

// Export the router to be used in index.js
module.exports = router;