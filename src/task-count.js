import { getRandomArbitrary } from './utils';
import { level } from './game';
import { makeMagic, makeTurn } from './youTurn';
import { randomInteger, soundClickGreat, soundClickLosing } from './functions-task';

export default function showTaskCount(param, player1, player2) {
    document.querySelector('.task-count').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
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
        } else if (+answerForm === count) {
            document.querySelector('.task-window-count').style.display = 'none';
            document.querySelector('.task-count').appendChild(grate);
            grate.classList.add('grate-count');
            soundClickGreat();
            grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
            closeTask();
            points = getRandomArbitrary(10, 20);
            setTimeout(() => {
                makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
            }, 1000);
        } else {
            document.querySelector('.task-window-count').style.display = 'none';
            document.querySelector('.task-count').appendChild(grate);
            grate.classList.add('grate-count');
            soundClickLosing();
            grate.innerHTML = '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>';
            closeTask();
            points = Math.floor(getRandomArbitrary(10, 20) * level);
            param = getRandomArbitrary(1, 6);
            setTimeout(() => {
                makeMagic(param, '.player-container .magic', 'player-magic', '.monsters-container .magic', '.monsters-container .health');
                makeTurn(param, points, player2, player1, '.aboutMonster', '#monsterLife', '.aboutPlayer', '#playerLife', 'Противник');
            }, 1000);
        }
    }
    document.querySelector('.button-count').addEventListener('click', taskCount);

    function closeTask() {
        setTimeout(() => {
            document.querySelector('.picture-count').innerHTML = '';
            document.querySelector('.task-count').removeChild(document.querySelector('.grate-count'));
            document.querySelector('.task-count').style.display = 'none';
            document.querySelector('.modal-dialog').style.display = 'none';
            document.querySelector('.task-window-count').style.display = 'block';
            document.querySelector('.input-count').value = '';
            document.querySelector('.button-count').removeEventListener('click', taskCount);
            document.querySelector('.field').style.display = 'grid';
        }, 2000);
    }
}
