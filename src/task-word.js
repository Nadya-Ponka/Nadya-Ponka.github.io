import { randomInteger, compareRandom } from './utils';
import { closeTask, closeAnswerWindow, wasYourAnswerWrong, wasYourAnswerRight } from './youAnswer';

const myDictionary = require('./dictionary');

export default function showTaskWord(param, player1, player2) {
    document.querySelector('.task-word').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    const dictionary = myDictionary.dictionary;
    const object = dictionary[randomInteger(0, 39)];
    const englishWord = object.name;
    const arrayWord = englishWord.split('');
    const length = arrayWord.length;
    const randWord = arrayWord.sort(compareRandom);

    for (let i = 0; i < length; i += 1) {
        $('#sortable').append(`<li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>${randWord[length - i - 1]}</li>`);
    }

    $(() => {
        $('#sortable').sortable();
        $('#sortable').disableSelection();
    });

    let answerWord = '';
    function taskWord() {
        if (document.querySelector('.grate-word')) {
            document.querySelector('.task-word').removeChild(document.querySelector('.grate-word'));
        }

        for (let i = 0; i < length; i += 1) {
            answerWord += $('.ui-state-default')[i].innerHTML.charAt(54);
        }
        document.querySelector('#sortable').innerHTML = '';
        const grate = document.createElement('div');
        closeAnswerWindow(grate, 'word');
        closeTask('word', taskWord);

        if (englishWord === answerWord) {
            wasYourAnswerRight(grate, param, player2, player1);
        } else {
            wasYourAnswerWrong(grate, player2, player1);
        }
    }
    document.querySelector('.button-word').addEventListener('click', taskWord);
}
