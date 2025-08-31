console.log('client side js file is loaded!');

const wordrForm = document.querySelector('form');
const input = document.querySelector('input');
const meaning = document.querySelector('#meaning');
const synonyms = document.querySelector('#synonyms');
const example = document.querySelector('#example');
const translateBtn = document.querySelector('#translateBtn');
const randomizeBtn = document.querySelector('#randomizeBtn');

randomizeBtn.addEventListener('click', (e) => {
    e.preventDefault(); //prevents refresh

    const url = 'http://localhost:4000/random';
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                console.log(data.randomWord);
                input.value =  data.randomWord;
            }
        });
    });
});

wordrForm.addEventListener('submit', (e) => {
    e.preventDefault(); //prevents refresh

    const word = input.value;
    meaning.textContent = 'Loading...';
    synonyms.textContent = '';
    example.textContent = '';

    const url = 'http://localhost:4000/word?word=' + word;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                meaning.textContent = data.error;
            }
            else {
                meaning.textContent = 'meaning: ' + data.definition;
                synonyms.textContent = 'synonyms: ' + data.synonyms;
                example.textContent = 'example: ' + data.example;
            }
        });
    });
});

translateBtn.addEventListener('click', (e) => {
    e.preventDefault(); //prevents refresh

    // const word = input.value;
    const textToTranslate = meaning.textContent;

    const url = 'http://localhost:4000/translate?info=' + textToTranslate;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                document.querySelector('#meaningTranslation').textContent = data.error;
            }
            else {
                document.querySelector('#meaningTranslation').textContent += data.definition;
            }
        });
    });
});
