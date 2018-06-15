import { getRandomArbitrary } from './utils';
import { level } from './game';
import { makeMagic, makeTurn } from './youTurn';
import { randomInteger, soundClickGreat, soundClickLosing } from './functions-task';

const myDictionary = require('./dictionary');

export default function showTaskTranslation(param, player1, player2) {
    const dictionary = myDictionary.dictionary;
    document.querySelector('.task-translation').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    const object = dictionary[randomInteger(0, 39)];
    const englishWord = object.name;
    const fields = Object.keys(object);
    document.querySelector('.english-word-translation').innerHTML = englishWord;
    function taskTranslate() {
        if (document.querySelector('.grate-translation')) {
            document.querySelector('.task-translation').removeChild(document.querySelector('.grate-translation'));
        }
        let points = 0;
        let coincidence = 0;
        const grate = document.createElement('div');
        const answerForm = document.querySelector('.input-translation').value.toLowerCase();
        if (answerForm.length === 0) {
            alert('Вы не ввели свой перевод в форму!');
        } else {
            const time = () => {
                setTimeout(() => {
                    makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                    makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
                }, 1000);
            };
            for (let i = 1; i < fields.length; i += 1) {
                if (answerForm === object[Object.keys(object)[i]]) {
                    document.querySelector('.task-window-translation').style.display = 'none';
                    document.querySelector('.task-translation').appendChild(grate);
                    grate.classList.add('grate-translation');
                    soundClickGreat();
                    grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
                    closeTask();
                    coincidence += 1;
                    points = getRandomArbitrary(10, 20);
                    time();
                    break;
                }
            }
            if (coincidence === 0) {
                document.querySelector('.task-window-translation').style.display = 'none';
                document.querySelector('.task-translation').appendChild(grate);
                grate.classList.add('grate-translation');
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
    }
    document.querySelector('.button-translation').addEventListener('click', taskTranslate);

    function closeTask() {
        setTimeout(() => {
            document.querySelector('.task-translation').removeChild(document.querySelector('.grate-translation'));
            document.querySelector('.task-translation').style.display = 'none';
            document.querySelector('.modal-dialog').style.display = 'none';
            document.querySelector('.task-window-translation').style.display = 'block';
            document.querySelector('.input-translation').value = '';
            document.querySelector('.button-translation').removeEventListener('click', taskTranslate);
            document.querySelector('.field').style.display = 'grid';
        }, 2000);
    }
}
