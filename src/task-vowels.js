import { getRandomArbitrary } from './utils';
import { level } from './game';
import { makeMagic, makeTurn } from './youTurn';
import { randomInteger, soundClickGreat, soundClickLosing } from './functions-task';

const myDictionary = require('./dictionary');

export default function showTaskVowels(param, player1, player2) {
    document.querySelector('.task-vowels').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    const words = myDictionary.words;
    const num = randomInteger(0, 9);
    const length = words[num].length;
    let count = 0;
    const vowels = ['а', 'у', 'о', 'ы', 'и', 'э', 'я', 'ю', 'ё', 'е'];
    for (let i = 0; i < length; i += 1) {
        if (vowels.indexOf(words[num].charAt(i)) !== -1) {
            count += 1;
        }
    }
    document.querySelector('.vowels').innerHTML = `${words[num]}`;
    function taskVowels() {
        if (document.querySelector('.grate-vowels')) {
            document.querySelector('.task-vowels').removeChild(document.querySelector('.grate-vowels'));
        }
        const answerForm = +document.querySelector('.input-vowels').value;
        const grate = document.createElement('div');
        if (answerForm.length === 0) {
            alert('Вы не ввели свое значение в форму!');
        } else if (answerForm === count) {
            document.querySelector('.task-window-vowels').style.display = 'none';
            document.querySelector('.task-vowels').appendChild(grate);
            grate.classList.add('grate-vowels');
            soundClickGreat();
            grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
            closeTask();
            points = getRandomArbitrary(10, 20);
            setTimeout(() => {
                makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
            }, 1000);
        } else {
            document.querySelector('.task-window-vowels').style.display = 'none';
            document.querySelector('.task-vowels').appendChild(grate);
            grate.classList.add('grate-vowels');
            soundClickLosing();
            grate.innerHTML = '<p>Результат не верен - магия не применилась!</p><p>Теперь ходит противник.</p>';
            closeTask();
            points = Math.floor(getRandomArbitrary(10, 20) * level);
            param = getRandomArbitrary(1, 5);
            setTimeout(() => {
                makeMagic(param, '.player-container .magic', 'player-magic', '.monsters-container .magic', '.monsters-container .health');
                makeTurn(param, points, player2, player1, '.aboutMonster', '#monsterLife', '.aboutPlayer', '#playerLife', 'Противник');
            }, 1000);
        }
    }
    document.querySelector('.button-vowels').addEventListener('click', taskVowels);
    function closeTask() {
        setTimeout(() => {
            document.querySelector('.task-vowels').removeChild(document.querySelector('.grate-vowels'));
            document.querySelector('.task-vowels').style.display = 'none';
            document.querySelector('.modal-dialog').style.display = 'none';
            document.querySelector('.task-window-vowels').style.display = 'block';
            document.querySelector('.input-vowels').value = '';
            document.querySelector('.button-vowels').removeEventListener('click', taskVowels);
            document.querySelector('.field').style.display = 'grid';
        }, 2000);
    }
}
