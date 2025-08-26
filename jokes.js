const fs = require('fs');
const {Joke} = require("bee-jokes");
const Chance = require('chance').Chance();


const saveJokes = (jokes) => {
    const dataJSON = JSON.stringify(jokes);
    fs.writeFileSync('jokes.json', dataJSON);
}

const loadJokes = () => {
    try {
        const dataBuffer = fs.readFileSync('jokes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const addRandomJoke = () => {
    const joke = new Joke();
    const my_joke = joke.getJoke({});
    console.log(my_joke);

    const jokes = loadJokes();
    const duplicateJokes = jokes.find((joke) => joke.joke === my_joke.joke);

    if(!duplicateJokes){
        //we didnt find any duplicates
        jokes.push({
            joke: my_joke.joke,
            name: Chance.name(),
            age: Chance.age()
        });
        saveJokes(jokes);
        console.log("new joke added");
    } else {
        console.log("joke author taken");
    }
}

const showJokes = () => {
    const jokes = loadJokes();
    console.log('Your jokes:');
    jokes.forEach((joke) => {
        console.log("joke: " + joke.joke);
    });
}

const getJoke = (author) => {
    const jokes = loadJokes();
    const joke = jokes.find((joke) => joke.name === author);

    if (joke){
        console.log(joke.name);
        console.log(joke.joke);
    } else {
        console.log('joke not found');
    }
}

const removeJoke = (author) => {
    const jokes = loadJokes();
    const jokesToKeep = jokes.filter((joke) => joke.name !== author); // if false (note is not duplicate) then not keeping it in list

    if (jokes.length > jokesToKeep){
        console.log('joke removed');
    } else {
        console.log('no joke found');
    }

    saveJokes(jokesToKeep);
}

const addInTheLanguage = (language) => {
    const joke = new Joke();
    const randomJoke = joke.getRandomJoke(language);
    if(randomJoke === null){
        console.log("no jokes in this language");
    } else{
        const jokes = loadJokes();
        const duplicateJokes = jokes.find((joke) => joke.joke === randomJoke.joke);

        if(!duplicateJokes){
            //we didnt find any duplicates
            jokes.push({
                joke: randomJoke.joke,
                name: Chance.name(),
                age: Chance.age()
            });
            saveJokes(jokes);
            console.log("new joke added");
        } else {
            console.log("joke already used");
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