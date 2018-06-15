import { getRandomArbitrary } from './utils';
import { level } from './game';
import { makeMagic, makeTurn } from './youTurn';
import { randomInteger, soundClickGreat, soundClickLosing } from './functions-task';

export default function showTaskSequence(param, player1, player2) {
    document.querySelector('.task-sequence').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
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

        const answerForm = +document.querySelector('.input-sequence').value;
        const grate = document.createElement('div');
        if (answerForm.length === 0) {
            alert('Вы не ввели свое значение в форму!');
        } else if (answerForm === num6) {
            document.querySelector('.task-window-sequence').style.display = 'none';
            document.querySelector('.task-sequence').appendChild(grate);
            grate.classList.add('grate-sequence');
            soundClickGreat();
            grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
            closeTask();
            points = getRandomArbitrary(10, 20);
            setTimeout(() => {
                makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
            }, 1000);
        } else {
            document.querySelector('.task-window-sequence').style.display = 'none';
            document.querySelector('.task-sequence').appendChild(grate);
            grate.classList.add('grate-sequence');
            soundClickLosing();
            grate.innerHTML = '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>';
            closeTask();
            points = Math.floor(getRandomArbitrary(10, 20) * level);
            param = getRandomArbitrary(1, 3);
            setTimeout(() => {
                makeMagic(param, '.player-container .magic', 'player-magic', '.monsters-container .magic', '.monsters-container .health');
                makeTurn(param, points, player2, player1, '.aboutMonster', '#monsterLife', '.aboutPlayer', '#playerLife', 'Противник');
            }, 1000);
        }
    }
    document.querySelector('.button-sequence').addEventListener('click', taskSequence);

    function closeTask() {
        setTimeout(() => {
            document.querySelector('.task-sequence').removeChild(document.querySelector('.grate-sequence'));
            document.querySelector('.task-sequence').style.display = 'none';
            document.querySelector('.modal-dialog').style.display = 'none';
            document.querySelector('.task-window-sequence').style.display = 'block';
            document.querySelector('.input-sequence').value = '';
            document.querySelector('.button-sequence').removeEventListener('click', taskSequence);
            document.querySelector('.field').style.display = 'grid';
        }, 2000);
    }
}
