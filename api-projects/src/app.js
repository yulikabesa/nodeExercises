// express server
const express = require('express');
const path = require('path');
const hbs = require('hbs');

const translation = require('./utils/translation');
const getMeaning = require('./utils/meaning');
const random = require('./utils/random');

const app = express();

// define paths for express config
const publicDirectoryPath  = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');


// Set up handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// root page
app.get('', (req, res) => {
    res.render('index', {
        name: 'yuli :)'
    });
});

app.get('/word', (req, res) => {
    if (!req.query.word){
        return res.send({
            error: "you must provide a word"
        });
    }
    getMeaning(req.query.word, (error, data) => {
        if (error) {
            return res.send({ error });
        }
        if (data.synonyms.length === 0){
            data.synonyms = "no synonyms available for this word";
        }
        if (data.example === undefined){
            data.example = "no example available for this word";
        }
        res.send({
            definition: data.definition,
            synonyms: data.synonyms,
            example: data.example,
            word: req.query.word
        });
        console.log(data);
    });
});

app.get('/translate', (req, res) => {
    if (!req.query.info){
        return res.send({
            error: "error"
        });
    }
    translation(req.query.info, (error, data) => {
        if (error) {
            return res.send({ error });
        }
        res.send({
            definition: data.definition
        });
        console.log(data);
    });
});

app.get('/random', (req, res) => {
    random('h', (error, data) => {
        if (error) {
            return res.send({ error });
        }
        res.send({
            randomWord: data.randomWord
        });
        console.log(data);
    });
});

// for all others
app.get('*', (req, res) => {
    res.render('index', {
        name: 'yuli :)',
        errorMessage: 'Page not found.'
    });
});

// starts the server
app.listen(4000, () => {
    console.log('server is up on port 4000.');
}); 