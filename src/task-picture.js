import { getRandomArbitrary } from './utils';
import { level } from './game';
import { makeMagic, makeTurn } from './youTurn';
import { randomInteger, soundClickGreat, soundClickLosing } from './functions-task';

const myDictionary = require('./dictionary');

export default function showTaskPicture(param, player1, player2) {
    const dictionary = myDictionary.dictionary;
    document.querySelector('.task-picture').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    const object = dictionary[randomInteger(0, 39)];
    const englishWord = object.name;
    document.querySelector('.animal-picture').innerHTML = `<img src='../Images/img-animals/${englishWord}.jpg' alt="">`;
    function taskPicture() {
        if (document.querySelector('.grate-picture')) {
            document.querySelector('.task-picture').removeChild(document.querySelector('.grate-picture'));
        }
        const grate = document.createElement('div');
        const answerForm = document.querySelector('.input-picture').value.toLowerCase();
        if (answerForm.length === 0) {
            alert('Вы не ввели свое название в форму!');
        } else if (answerForm === englishWord) {
            document.querySelector('.task-window-picture').style.display = 'none';
            document.querySelector('.task-picture').appendChild(grate);
            grate.classList.add('grate-picture');
            soundClickGreat();
            grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
            closeTask();
            points = getRandomArbitrary(10, 20);
            setTimeout(() => {
                makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
            }, 1000);
        } else {
            document.querySelector('.task-window-picture').style.display = 'none';
            document.querySelector('.task-picture').appendChild(grate);
            grate.classList.add('grate-picture');
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
    document.querySelector('.button-picture').addEventListener('click', taskPicture);

    function closeTask() {
        setTimeout(() => {
            document.querySelector('.task-picture').removeChild(document.querySelector('.grate-picture'));
            document.querySelector('.task-picture').style.display = 'none';
            document.querySelector('.modal-dialog').style.display = 'none';
            document.querySelector('.task-window-picture').style.display = 'block';
            document.querySelector('.input-picture').value = '';
            document.querySelector('.button-picture').removeEventListener('click', taskPicture);
            document.querySelector('.field').style.display = 'grid';
        }, 2000);
    }
}
