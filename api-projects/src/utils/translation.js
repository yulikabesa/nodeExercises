const axios = require('axios');

const translation = (meaning, callback) => {
    const url = 'https://api.funtranslations.com/translate/pirate.json?text='+ encodeURIComponent(meaning);
    axios.get(url)
        .then(({data}) => {
            if(data.length === 0){
                callback('no sentence provided to translate', undefined);
            } else{
                callback(undefined, {
                    definition: data.contents.translated
                });
            }
        })
        .catch(error => {
            if (error.status === 400){
                callback('unable to connect to services', undefined);
            } else if (error.status === 429){
                callback('Too Many Requests: Rate limit of 10 requests per hour exceeded.', undefined);
            } else{ //no wifi
                callback("unable to connect to dictionary service!!" + error.status, undefined);
            }
        });
}

module.exports = translation;