import { randomInteger, soundClickGreat, soundClickLosing } from './utils';
import { level } from './game';
import { makeMagic, makeTurn } from './youTurn';

export function wasYourAnswerRight(elem, param, player1, player2) {
    soundClickGreat();
    elem.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
    const points = randomInteger(10, 20);
    setTimeout(() => {
        makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
        makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
    }, 1000);
}

export function wasYourAnswerWrong(elem, player1, player2) {
    soundClickLosing();
    elem.innerHTML = '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>';
    const points = Math.floor(randomInteger(10, 20) * level);
    const param = randomInteger(1, 6);
    setTimeout(() => {
        makeMagic(param, '.player-container .magic', 'player-magic', '.monsters-container .magic', '.monsters-container .health');
        makeTurn(param, points, player2, player1, '.aboutMonster', '#monsterLife', '.aboutPlayer', '#playerLife', 'Противник');
    }, 1000);
}

export function closeAnswerWindow(elem, taskName) {
    document.querySelector(`.task-window-${taskName}`).style.display = 'none';
    document.querySelector(`.task-${taskName}`).appendChild(elem);
    elem.classList.add(`grate-${taskName}`);
}

export function closeTask(taskName, taskFunction) {
    setTimeout(() => {
        document.querySelector(`.task-${taskName}`).removeChild(document.querySelector(`.grate-${taskName}`));
        document.querySelector(`.task-${taskName}`).style.display = 'none';
        document.querySelector('.modal-dialog').style.display = 'none';
        document.querySelector(`.task-window-${taskName}`).style.display = 'block';
        document.querySelector(`.button-${taskName}`).removeEventListener('click', taskFunction);
        document.querySelector('.field').style.display = 'grid';
    }, 2500);
}
