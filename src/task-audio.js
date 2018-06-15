import { getRandomArbitrary } from './utils';
import { level } from './game';
import { makeMagic, makeTurn } from './youTurn';
import { randomInteger, soundClickGreat, soundClickLosing } from './functions-task';

const myDictionary = require('./dictionary');

export default function showTaskAudio(param, player1, player2) {
    const dictionary = myDictionary.dictionary;
    document.querySelector('.task-audio').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    const object = dictionary[randomInteger(0, 39)];
    const englishWord = object.name;
    function speak(message) {
        const msg = new SpeechSynthesisUtterance(message);
        const voices = window.speechSynthesis.getVoices();
        msg.voice = voices[6];
        window.speechSynthesis.speak(msg);
    }
    function closeTask() {
        setTimeout(() => {
            document.querySelector('.task-audio').removeChild(document.querySelector('.grate-audio'));
            document.querySelector('.task-audio').style.display = 'none';
            document.querySelector('.modal-dialog').style.display = 'none';
            document.querySelector('.task-window-audio').style.display = 'block';
            document.querySelector('.input-audio').value = '';
            document.querySelector('.button-audio').removeEventListener('click', taskAudio);
            document.querySelector('.field').style.display = 'grid';
        }, 2000);
    }
    document.querySelector('.audio').onclick = function funk() {
        speak(`${englishWord}`);
    };
    function taskAudio() {
        if (document.querySelector('.grate-audio')) {
            document.querySelector('.task-audio').removeChild(document.querySelector('.grate-audio'));
        }
        const grate = document.createElement('div');
        const answerForm = document.querySelector('.input-audio').value.toLowerCase();
        if (answerForm.length === 0) {
            alert('Вы не ввели свое слово в форму!');
        } else if (answerForm === englishWord) {
            document.querySelector('.task-window-audio').style.display = 'none';
            document.querySelector('.task-audio').appendChild(grate);
            grate.classList.add('grate-audio');
            soundClickGreat();
            grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
            closeTask();
            points = getRandomArbitrary(10, 20);
            setTimeout(() => {
                makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
            }, 1000);
        } else {
            document.querySelector('.task-window-audio').style.display = 'none';
            document.querySelector('.task-audio').appendChild(grate);
            grate.classList.add('grate-audio');
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
    document.querySelector('.button-audio').addEventListener('click', taskAudio);
}
