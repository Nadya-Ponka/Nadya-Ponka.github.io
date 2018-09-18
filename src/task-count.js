import { randomInteger } from './utils';
import { closeTask, closeAnswerWindow, wasYourAnswerWrong, wasYourAnswerRight } from './youAnswer';

export default function showTaskCount(param, player1, player2) {
    document.querySelector('.task-count').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    const count = randomInteger(1, 84);
    for (let i = 1; i <= count; i += 1) {
        const div = document.createElement('div');
        div.innerHTML = '<img src="../Images/ball.png" alt="">';
        document.querySelector('.picture-count').appendChild(div);
    }

    function taskCount() {
        if (document.querySelector('.grate-count')) {
            document.querySelector('.task-count').removeChild(document.querySelector('.grate-count'));
        }

        const answerForm = document.querySelector('.input-count').value;
        const grate = document.createElement('div');
        if (answerForm.length === 0) {
            alert('Вы не ввели свой перевод в форму!');
        } else {
            document.querySelector('.picture-count').innerHTML = '';
            document.querySelector('.input-count').value = '';
            closeAnswerWindow(grate, 'count');
            closeTask('count', taskCount);

            if (+answerForm === count) {
                wasYourAnswerRight(grate, param, player2, player1);
            } else {
                wasYourAnswerWrong(grate, player2, player1);
            }
        }
    }
    document.querySelector('.button-count').addEventListener('click', taskCount);
}
