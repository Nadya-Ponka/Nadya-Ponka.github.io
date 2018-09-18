import { randomInteger } from './utils';
import { closeTask, closeAnswerWindow, wasYourAnswerWrong, wasYourAnswerRight } from './youAnswer';

export default function showTaskFigure(param, player1, player2) {
    document.querySelector('.task-figure').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    const countAngles = [3, 4, 5, 6, 7, 8, 40];
    const num = randomInteger(0, 6);
    document.querySelector('.figure').innerHTML = `<img src='../Images/img-figures/${num}.png' alt="">`;

    function taskFigure() {
        if (document.querySelector('.grate-figure')) {
            document.querySelector('.task-figure').removeChild(document.querySelector('.grate-figure'));
        }
        const answerForm = document.querySelector('.input-figure').value;
        const grate = document.createElement('div');
        if (answerForm.length === 0) {
            alert('Вы не ввели свое значение в форму!');
        } else {
            document.querySelector('.input-figure').value = '';
            closeAnswerWindow(grate, 'figure');
            closeTask('figure', taskFigure);

            if (+answerForm === countAngles[num]) {
                wasYourAnswerRight(grate, param, player2, player1);
            } else {
                wasYourAnswerWrong(grate, player2, player1);
            }
        }
    }
    document.querySelector('.button-figure').addEventListener('click', taskFigure);
}
