const axios = require('axios');

const random = (meaning, callback) => {
    const url = 'https://random-words-api.kushcreates.com/api?language=en&words=1';
    axios.get(url)
        .then(({data}) => {
            callback(undefined, {
                randomWord: data[0].word
            });
        })
        .catch(error => {
            if (error.status === 400){
                callback('unable to connect to services', undefined);
            } else{ //no wifi
                callback("unable to connect to dictionary service!!!", undefined);
            }
        });
}

module.exports = random;