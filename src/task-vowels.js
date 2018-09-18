import { randomInteger } from './utils';
import { closeTask, closeAnswerWindow, wasYourAnswerWrong, wasYourAnswerRight } from './youAnswer';

const myDictionary = require('./dictionary');

export default function showTaskVowels(param, player1, player2) {
    document.querySelector('.task-vowels').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    const words = myDictionary.words;
    const num = randomInteger(0, 9);
    const length = words[num].length;
    let count = 0;
    const vowels = ['а', 'у', 'о', 'ы', 'и', 'э', 'я', 'ю', 'ё', 'е'];
    for (let i = 0; i < length; i += 1) {
        if (vowels.indexOf(words[num].charAt(i)) !== -1) {
            count += 1;
        }
    }
    document.querySelector('.vowels').innerHTML = `${words[num]}`;

    function taskVowels() {
        if (document.querySelector('.grate-vowels')) {
            document.querySelector('.task-vowels').removeChild(document.querySelector('.grate-vowels'));
        }
        const answerForm = document.querySelector('.input-vowels').value;
        const grate = document.createElement('div');
        if (answerForm.length === 0) {
            alert('Вы не ввели свое значение в форму!');
        } else {
            document.querySelector('.input-vowels').value = '';
            closeAnswerWindow(grate, 'vowels');
            closeTask('vowels', taskVowels);

            if (+answerForm === count) {
                wasYourAnswerRight(grate, param, player2, player1);
            } else {
                wasYourAnswerWrong(grate, player2, player1);
            }
        }
    }
    document.querySelector('.button-vowels').addEventListener('click', taskVowels);
}
