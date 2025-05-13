// Import required modules
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

// Import route handlers
const pokemonRoute = require('../routes/pokemon');
const storyRoute = require('../routes/story');

const app = express();

// Rate Limiting Middleware
const limiter = rateLimit({
    windowsMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {message:'Too many requests, please try again later.'}
});

app.use(bodyParser.json());
app.use(limiter);
app.use('/pokemon',pokemonRoute);
app.use('/story',storyRoute);

// Integration Test : Backend
describe('API Integration Tests', () => {
    // Test: Successful Pokemon Fetch
    it('GET /pokemon/pikachu should return Pokemon data', async () =>{
        const res = await request(app).get('/pokemon/pikachu');
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe('pikachu');
    });
    it('POST /story should return a generated story', async () =>{
        // Test: Successful Story Generation
        const res = await request(app).post('/story').send({
            pokemon: 'charmeleon',
            theme: 'snowball cave'
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.story).toBeDefined();
    });
    it('GET /pokemon/@@ should return validation error', async () =>{
        // Test: Invalid Pokemon Name Format
        const res = await request(app).get('/pokemon/@@');
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error','Invalid Pokemon name Format');
    });
    it('POST /story with missing theme should return validation error', async () =>{
        // Test: Missing Theme
        const res = await request(app).post('/story').send({
            pokemon: 'bulbasaur',
            theme: ''
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toMatch(/theme/i);
    });
    it('Rate Limiting should trigger after 10 requests', async ()=>{
        //Test: Rate Limiting blocking 11th request
        const promises = [];

        for (let i = 0; i< 11; i++){
            promises.push(
                request(app)
                .get('/pokemon/pikachu')
                .then(res => res)
            );
        }
        const responses = await Promise.all(promises);
        const lastResponse = responses[responses.length -1];

        expect(lastResponse.statusCode).toBe(429);
        expect(lastResponse.body.message).toMatch(/please try again later/i);
    });

});