import { randomInteger } from './utils';
import { closeTask, closeAnswerWindow, wasYourAnswerWrong, wasYourAnswerRight } from './youAnswer';

const myDictionary = require('./dictionary');

export default function showTaskPoem(param, player1, player2) {
    document.querySelector('.task-poem').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    const poems = myDictionary.poems;
    const solutions = [7, 10, 8, 4, 8, 7, 2, 5, 3, 4];
    const num = randomInteger(0, 9);
    document.querySelector('.poem').innerHTML = `${poems[num]}`;

    function taskPoem() {
        if (document.querySelector('.grate-poem')) {
            document.querySelector('.task-poem').removeChild(document.querySelector('.grate-poem'));
        }
        const answerForm = document.querySelector('.input-poem').value;
        const grate = document.createElement('div');
        if (answerForm.length === 0) {
            alert('Вы не ввели свой ответ в форму!');
        } else {
            document.querySelector('.input-poem').value = '';
            closeAnswerWindow(grate, 'poem');
            closeTask('poem', taskPoem);

            if (+answerForm === solutions[num]) {
                wasYourAnswerRight(grate, param, player2, player1);
            } else {
                wasYourAnswerWrong(grate, player2, player1);
            }
        }
    }
    document.querySelector('.button-poem').addEventListener('click', taskPoem);
}
