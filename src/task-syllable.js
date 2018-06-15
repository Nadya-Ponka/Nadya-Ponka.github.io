import { getRandomArbitrary } from './utils';
import { level } from './game';
import { makeMagic, makeTurn } from './youTurn';
import { randomInteger, soundClickGreat, soundClickLosing } from './functions-task';

const myDictionary = require('./dictionary');

export default function showTaskSyllable(param, player1, player2) {
    document.querySelector('.task-syllable').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    const words = myDictionary.words;
    const solutions = myDictionary.solutions;
    const num = randomInteger(0, 9);
    document.querySelector('.syllable').innerHTML = `${words[num]}`;
    function taskSyllable() {
        if (document.querySelector('.grate-syllable')) {
            document.querySelector('.task-syllable').removeChild(document.querySelector('.grate-syllable'));
        }
        const answerForm = document.querySelector('.input-syllable').value.toLowerCase();
        const grate = document.createElement('div');
        if (answerForm.length === 0) {
            alert('Вы не ввели свое решение в форму!');
        } else if (answerForm === solutions[num]) {
            document.querySelector('.task-window-syllable').style.display = 'none';
            document.querySelector('.task-syllable').appendChild(grate);
            grate.classList.add('grate-syllable');
            soundClickGreat();
            grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
            closeTask();
            points = getRandomArbitrary(10, 20);
            setTimeout(() => {
                makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
            }, 1000);
        } else {
            document.querySelector('.task-window-syllable').style.display = 'none';
            document.querySelector('.task-syllable').appendChild(grate);
            grate.classList.add('grate-syllable');
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
    document.querySelector('.button-syllable').addEventListener('click', taskSyllable);

    function closeTask() {
        setTimeout(() => {
            document.querySelector('.task-syllable').removeChild(document.querySelector('.grate-syllable'));
            document.querySelector('.task-syllable').style.display = 'none';
            document.querySelector('.modal-dialog').style.display = 'none';
            document.querySelector('.task-window-syllable').style.display = 'block';
            document.querySelector('.input-syllable').value = '';
            document.querySelector('.button-syllable').removeEventListener('click', taskSyllable);
            document.querySelector('.field').style.display = 'grid';
        }, 2000);
    }
}
