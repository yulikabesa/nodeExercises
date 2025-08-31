const axios = require('axios');

const getMeaning = (word, callback) => {
    const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'+ encodeURIComponent(word);
    axios.get(url)
        .then(({data}) => {
            if(data.length === 0){
                callback('no word provided', undefined);
            } else{
                callback(undefined, {
                    definition: data[0].meanings[0].definitions[0].definition ,
                    synonyms: data[0].meanings[0].synonyms,
                    example: data[0].meanings[0].definitions[0].example
                });
            }
        })
        .catch(error => {
            if (error.status === 400){
                callback('unable to connect to services', undefined);
            } else if (error.status === 404){
                callback('we couldnt find a meaning for this word', undefined);
            } else{ //no wifi
                callback("unable to connect to dictionary service!!" , undefined);
            }
        });
}

module.exports = getMeaning;