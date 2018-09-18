import { randomInteger } from './utils';
import { closeTask, closeAnswerWindow, wasYourAnswerWrong, wasYourAnswerRight } from './youAnswer';

const myDictionary = require('./dictionary');

export default function showTaskSyllable(param, player1, player2) {
    document.querySelector('.task-syllable').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    const words = myDictionary.words;
    const solutions = myDictionary.solutions;
    const num = randomInteger(0, 9);
    document.querySelector('.syllable').innerHTML = `${words[num]}`;

    function taskSyllable() {
        if (document.querySelector('.grate-syllable')) {
            document.querySelector('.task-syllable').removeChild(document.querySelector('.grate-syllable'));
        }
        const answerForm = document.querySelector('.input-syllable').value.toLowerCase();
        const grate = document.createElement('div');
        if (answerForm.length === 0) {
            alert('Вы не ввели свое решение в форму!');
        } else {
            document.querySelector('.input-syllable').value = '';
            closeAnswerWindow(grate, 'syllable');
            closeTask('syllable', taskSyllable);

            if (answerForm === solutions[num]) {
                wasYourAnswerRight(grate, param, player2, player1);
            } else {
                wasYourAnswerWrong(grate, player2, player1);
            }
        }
    }
    document.querySelector('.button-syllable').addEventListener('click', taskSyllable);
}
