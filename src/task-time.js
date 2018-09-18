import { randomInteger } from './utils';
import { closeTask, closeAnswerWindow, wasYourAnswerWrong, wasYourAnswerRight } from './youAnswer';

export default function showTaskTime(param, player1, player2) {
    document.querySelector('.task-time').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    const num = randomInteger(1, 59);
    document.querySelector('.time').innerHTML = `Сколько секунд в ${num} минутах?`;

    function taskTime() {
        if (document.querySelector('.grate-time')) {
            document.querySelector('.task-time').removeChild(document.querySelector('.grate-time'));
        }
        const answerForm = document.querySelector('.input-time').value;
        const grate = document.createElement('div');
        if (answerForm.length === 0) {
            alert('Вы не ввели свой ответ в форму!');
        } else {
            document.querySelector('.input-time').value = '';
            closeAnswerWindow(grate, 'time');
            closeTask('time', taskTime);

            if (+answerForm === (num * 60)) {
                wasYourAnswerRight(grate, param, player2, player1);
            } else {
                wasYourAnswerWrong(grate, player2, player1);
            }
        }
    }
    document.querySelector('.button-time').addEventListener('click', taskTime);
}
