import { randomInteger } from './utils';
import { closeTask, closeAnswerWindow, wasYourAnswerWrong, wasYourAnswerRight } from './youAnswer';

export default function showTaskSpace(param, player1, player2) {
    document.querySelector('.task-space').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    const num1 = randomInteger(1, 20);
    const num2 = randomInteger(1, 35);
    document.querySelector('.space').innerHTML = `У дедушки на даче имеется земельный участок размерами ${num1} на ${num2} метров. Какова площадь участка в кв.метрах?`;

    function taskSpace() {
        if (document.querySelector('.grate-space')) {
            document.querySelector('.task-space').removeChild(document.querySelector('.grate-space'));
        }

        const answerForm = document.querySelector('.input-space').value;
        const grate = document.createElement('div');
        if (answerForm.length === 0) {
            alert('Вы не ввели свое значение в форму!');
        } else {
            document.querySelector('.input-space').value = '';
            closeAnswerWindow(grate, 'space');
            closeTask('space', taskSpace);

            if (+answerForm === (num1 * num2)) {
                wasYourAnswerRight(grate, param, player2, player1);
            } else {
                wasYourAnswerWrong(grate, player2, player1);
            }
        }
    }
    document.querySelector('.button-space').addEventListener('click', taskSpace);
}
