import { getRandomArbitrary } from './utils';
import { level } from './game';
import { makeMagic, makeTurn } from './youTurn';
import { randomInteger, soundClickGreat, soundClickLosing } from './functions-task';

const myDictionary = require('./dictionary');

export default function showTaskPoem(param, player1, player2) {
    document.querySelector('.task-poem').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    const poems = myDictionary.poems;
    const solutions = [7, 10, 8, 4, 8, 7, 2, 5, 3, 4];
    const num = randomInteger(0, 9);
    document.querySelector('.poem').innerHTML = `${poems[num]}`;
    function taskPoem() {
        if (document.querySelector('.grate-poem')) {
            document.querySelector('.task-poem').removeChild(document.querySelector('.grate-poem'));
        }
        const answerForm = +document.querySelector('.input-poem').value;
        const grate = document.createElement('div');
        if (answerForm.length === 0) {
            alert('Вы не ввели свой ответ в форму!');
        } else if (answerForm === solutions[num]) {
            document.querySelector('.task-window-poem').style.display = 'none';
            document.querySelector('.task-poem').appendChild(grate);
            grate.classList.add('grate-poem');
            soundClickGreat();
            grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
            closeTask();
            points = getRandomArbitrary(10, 20);
            setTimeout(() => {
                makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
            }, 1000);
        } else {
            document.querySelector('.task-window-poem').style.display = 'none';
            document.querySelector('.task-poem').appendChild(grate);
            grate.classList.add('grate-poem');
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
    document.querySelector('.button-poem').addEventListener('click', taskPoem);

    function closeTask() {
        setTimeout(() => {
            document.querySelector('.task-poem').removeChild(document.querySelector('.grate-poem'));
            document.querySelector('.task-poem').style.display = 'none';
            document.querySelector('.modal-dialog').style.display = 'none';
            document.querySelector('.task-window-poem').style.display = 'block';
            document.querySelector('.input-poem').value = '';
            document.querySelector('.button-poem').removeEventListener('click', taskPoem);
            document.querySelector('.field').style.display = 'grid';
        }, 2000);
    }
}
