const jokes = require('./jokes.js');
const yargs = require('yargs');


// create add command
yargs.command({
    command: 'add',
    describe: 'Add a random new joke',
    handler() {
        jokes.addRandomJoke();
    }
});

// create show command
yargs.command({
    command: 'show',
    describe: 'show all jokes',
    handler() {
        jokes.showJokes();
    }
});

// create get joke command
yargs.command({
    command: 'get',
    describe: 'get a joke by author',
    builder: {
        author: {
            describe: 'autor name',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        jokes.getJoke(argv.author);
    }
});

// create remove command
yargs.command({
    command: 'remove',
    describe: 'remove a joke',
    builder: {
        author: {
            describe: 'joke author',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        jokes.removeJoke(argv.author);
    }
});

// create joke in specific language command
yargs.command({
    command: 'add-by-language',
    describe: 'adds joke in specific language',
    builder: {
        language: {
            describe: 'language',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        jokes.addInTheLanguage(argv.language);
    }
});

yargs.parse();