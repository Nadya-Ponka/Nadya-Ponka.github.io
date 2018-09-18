import { randomInteger } from './utils';
import { closeTask, closeAnswerWindow, wasYourAnswerWrong, wasYourAnswerRight } from './youAnswer';

export default function showTaskSequence(param, player1, player2) {
    document.querySelector('.task-sequence').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let num2;
    let num3;
    let num4;
    let num5;
    let num6;
    const sequence = randomInteger(1, 2);
    const num1 = randomInteger(1, 10);
    if (sequence === 1) {
        num2 = (num1 * 2) + 1;
        num3 = (num2 * 2) + 1;
        num4 = (num3 * 2) + 1;
        num5 = (num4 * 2) + 1;
        num6 = (num5 * 2) + 1;
    } else {
        num2 = (num1 + 1) * 2;
        num3 = (num2 + 1) * 2;
        num4 = (num3 + 1) * 2;
        num5 = (num4 + 1) * 2;
        num6 = (num5 + 1) * 2;
    }
    document.querySelector('.number').innerHTML = `${num1}, ${num2}, ${num3}, ${num4}, ${num5}, ... `;

    function taskSequence() {
        if (document.querySelector('.grate-sequence')) {
            document.querySelector('.task-sequence').removeChild(document.querySelector('.grate-sequence'));
        }

        const answerForm = document.querySelector('.input-sequence').value;
        const grate = document.createElement('div');
        if (answerForm.length === 0) {
            alert('Вы не ввели свое значение в форму!');
        } else {
            document.querySelector('.input-sequence').value = '';
            closeAnswerWindow(grate, 'sequence');
            closeTask('sequence', taskSequence);

            if (+answerForm === num6) {
                wasYourAnswerRight(grate, param, player2, player1);
            } else {
                wasYourAnswerWrong(grate, player2, player1);
            }
        }
    }
    document.querySelector('.button-sequence').addEventListener('click', taskSequence);
}
