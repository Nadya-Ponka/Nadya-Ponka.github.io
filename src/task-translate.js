import { randomInteger } from './utils';
import { closeTask, closeAnswerWindow, wasYourAnswerWrong, wasYourAnswerRight } from './youAnswer';

const myDictionary = require('./dictionary');

export default function showTaskTranslation(param, player1, player2) {
    const dictionary = myDictionary.dictionary;
    document.querySelector('.task-translation').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    const object = dictionary[randomInteger(0, 39)];
    const englishWord = object.name;
    const fields = Object.keys(object);
    document.querySelector('.english-word-translation').innerHTML = englishWord;
    function taskTranslate() {
        if (document.querySelector('.grate-translation')) {
            document.querySelector('.task-translation').removeChild(document.querySelector('.grate-translation'));
        }
        let coincidence = 0;
        const grate = document.createElement('div');
        const answerForm = document.querySelector('.input-translation').value.toLowerCase();
        if (answerForm.length === 0) {
            alert('Вы не ввели свой перевод в форму!');
        } else {
            document.querySelector('.input-translation').value = '';
            closeAnswerWindow(grate, 'translation');
            closeTask('translation', taskTranslate);

            for (let i = 1; i < fields.length; i += 1) {
                if (answerForm === object[Object.keys(object)[i]]) {
                    coincidence += 1;
                    wasYourAnswerRight(grate, param, player2, player1);
                    break;
                }
            }
            if (coincidence === 0) {
                wasYourAnswerWrong(grate, player2, player1);
            }
        }
    }
    document.querySelector('.button-translation').addEventListener('click', taskTranslate);
}
