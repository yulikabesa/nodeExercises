const fs = require('fs');
const { Joke } = require("bee-jokes");
const Chance = require('chance').Chance();
const joke_file = 'jokes.json';
const joke_bank = new Joke();

const saveJokes = (jokes) => {
    const dataJSON = JSON.stringify(jokes);
    fs.writeFileSync(joke_file, dataJSON);
}

const loadJokes = () => {
    try {
        const dataBuffer = fs.readFileSync(joke_file);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const addRandomJoke = () => {
    const my_joke = joke_bank.getJoke({});
    const jokes = loadJokes();
    const name = Chance.name();
    const duplicateJokes = jokes.find((joke) => joke.name.toLowerCase() === name.toLowerCase());

    while(duplicateJokes){
        name = Chance.name();
        duplicateJokes = jokes.find((joke) => joke.name.toLowerCase() === name.toLowerCase());
    }
    //we didnt find any duplicates
    jokes.push({
        joke: my_joke.joke,
        name: name,
        age: Chance.age()
    });
    saveJokes(jokes);
    console.log("new joke added");
    console.log('joke: ' + my_joke.joke);
    console.log('author: ' + name);
}

const showJokes = () => {
    const jokes = loadJokes();
    console.log('Your jokes:');
    jokes.forEach((joke) => {
        console.log("joke: " + joke.joke);
        console.log("joke author: " + joke.name);
    });
}

const getJoke = (author) => {
    const jokes = loadJokes();
    const joke = jokes.find((joke) => joke.name.toLowerCase() === author.toLowerCase());

    if (joke){
        console.log(joke.name);
        console.log(joke.joke);
    } else {
        console.log('joke not found');
    }
}

const removeJoke = (author) => {
    const jokes = loadJokes();
    const jokesToKeep = jokes.filter((joke) => joke.name.toLowerCase() !== author.toLowerCase());

    if (jokes.length > jokesToKeep.length){
        console.log('joke removed');
        saveJokes(jokesToKeep);
    } else {
        console.log('no joke found');
    }

}

const addInTheLanguage = (language) => {
    const randomJoke = joke_bank.getRandomJoke(language);
    if(randomJoke === null){
        console.log("no jokes in this language");
    } else{
        const jokes = loadJokes();
        const name = Chance.name();
        const duplicateJokes = jokes.find((joke) => joke.name.toLowerCase() === name.toLowerCase());

        if(!duplicateJokes){
            //we didnt find any duplicates
            jokes.push({
                joke: randomJoke.joke,
                name: name,
                age: Chance.age()
            });
            saveJokes(jokes);
            console.log("new joke added");
        } else {
            console.log("joke author already made a joke, try again");
        }
    }

}

module.exports = {
    addRandomJoke: addRandomJoke,
    removeJoke: removeJoke,
    getJoke: getJoke,
    showJokes: showJokes,
    addInTheLanguage: addInTheLanguage
};