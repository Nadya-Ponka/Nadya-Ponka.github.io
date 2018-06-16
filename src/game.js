import Person from './personClass';
import showTask from './task-screen';
import {
    getRandomArbitrary,
    drawLife,
    createNode,
} from './utils';
import showTaskTranslation from './task-translate';
import showTaskPicture from './task-picture';
import showTaskAudio from './task-audio';
import showTaskCompare from './task-compare';
import showTaskСonsonants from './task-consonants';
import showTaskCount from './task-count';
import showTaskFigure from './task-figure';
import showTaskPoem from './task-poem';
import showTaskSequence from './task-sequence';
import showTaskSpace from './task-space';
import showTaskSyllable from './task-syllable';
import showTaskTime from './task-time';
import showTaskVowels from './task-vowels';
import showTaskWord from './task-word';

export let level = 0.75;

const nameAdjectiveMonster = ['Ужасный', 'Злобный', 'Сопливый'];
const whichMonster = ['Огр', 'Гном', 'Гоблин'];
const nameMonster = ['Том', 'Макс', 'Дима'];

export function Game() {
    level += 0.25;
    document.querySelector('#go').addEventListener('click', startGame, false);

    function startGame() {
        document.querySelector('.landing').style.display = 'none';
        document.querySelector('.gameOver').style.display = 'none';
        document.querySelector('.nextRaund').style.display = 'none';
        document.querySelector('.base-surfase').style.display = 'block';
    }

    const player = new Person('Крош', 1);
    drawLife('player', player.score);
    document.querySelector('#playerLife').style.width = `${`${player.score * 2.5}px`}`;

    const monster = new Person(String(nameAdjectiveMonster[getRandomArbitrary(0, 2)] + ' ' + whichMonster[getRandomArbitrary(0, 2)] + ' ' + nameMonster[getRandomArbitrary(0, 2)]), level);
    drawLife('monster', monster.score);
    document.querySelector('#monsterLife').style.width = `${`${monster.score * 2.5}px`}`;

    document.querySelector('#playerLife').title = player.score;
    document.querySelector('#monsterLife').title = monster.score;

    let boxScore = document.createElement('div');
    boxScore.innerHTML = player.score;
    document.querySelector('.aboutPlayer').appendChild(boxScore);

    boxScore = document.createElement('div');
    boxScore.innerHTML = monster.score;
    document.querySelector('.aboutMonster').appendChild(boxScore);

    const playerField = document.querySelector('.aboutPlayer');
    const monsterField = document.querySelector('.aboutMonster');

    playerField.firstElementChild.appendChild(createNode('span', {}, player.name));
    monsterField.firstElementChild.appendChild(createNode('span', {}, monster.name));
    monsterField.firstElementChild.style.width = '300px';
    playerField.firstElementChild.style.width = '300px';

    loadFight();
    document.querySelector('#start').addEventListener('click', () => {
        dialog();
        document.querySelector('.spell').addEventListener('click', selectMagic, false);
    }, false);

    function selectMagic(elem) {

        switch (elem.target.id) {
        case '1':
            showTask(1, player, monster);
            break;
        case '2':
            showTaskTranslation(2, player, monster);
            break;
        case '3':
            showTaskPicture(3, player, monster);
            break;
        case '4':
            showTaskAudio(4, player, monster);
            break;
        case '5':
            showTaskCompare(5, player, monster);
            break;
        case '6':
            showTaskWord(6, player, monster);
            break;
        case '7':
            showTaskСonsonants(7, player, monster);
            break;
        case '8':
            showTaskCount(8, player, monster);
            break;
        case '9':
            showTaskFigure(9, player, monster);
            break;
        case '10':
            showTaskPoem(10, player, monster);
            break;
        case '11':
            showTaskSequence(11, player, monster);
            break;
        case '12':
            showTaskSpace(12, player, monster);
            break;
        case '13':
            showTaskSyllable(13, player, monster);
            break;
        case '14':
            showTaskTime(14, player, monster);
            break;
        case '15':
            showTaskVowels(15, player, monster);
            break;
        default:
            break;
        }

        document.querySelector('.spell').removeEventListener('click', selectMagic);
    }

    function loadFight() {
        const mainField = document.querySelector('.field');
        const mainHero = document.createElement('div');
        mainHero.className = 'hero';
        buildPerson(mainHero, 1, 1, 1);

        const modalWindow = document.createElement('div');
        modalWindow.className = 'buttonMagic';
        modalWindow.style.alignSelf = 'end';
        modalWindow.style.justifySelf = 'center';
        modalWindow.innerHTML = '<div class="modal-dialog"><p class="close" onclick="closeScore()">&#215;</p>\
		<p>Выберите заклинание:</p><div class="spell">\
			<img id="1" src="../Images/Atack.png" alt=""><p>Магия воды</p>\
            <img id="2" src="../Images/Lightning.png" alt=""><p>Магия молнии</p>\
            <img id="3" src="../Images/Health.png" alt=""><p>Лечить себя</p>\
            <img id="4" src="../Images/Question.png" alt=""><p>Удар радуги</p>\
            <img id="5" src="../Images/Atack1.png" alt=""><p>Магия огня</p>\
            <img id="6" src="../Images/Lightning1.png" alt=""><p>Огненные шары</p>\
            <img id="7" src="../Images/Health1.png" alt=""><p>Лечить себя</p>\
            <img id="8" src="../Images/Question1.png" alt=""><p>Магия воды</p>\
            <img id="9" src="../Images/Atack2.png" alt=""><p>Магия воды</p>\
            <img id="10" src="../Images/Lightning2.png" alt=""><p>Магия молнии</p>\
            <img id="11" src="../Images/Health2.png" alt=""><p>Лечить себя</p>\
            <img id="12" src="../Images/Question2.png" alt=""><p>Магия огня</p>\
            <img id="13" src="../Images/Atack3.png" alt=""><p>Магия воды</p>\
            <img id="14" src="../Images/Health3.png" alt=""><p>Магия огня</p>\
            <img id="15" src="../Images/Question3.png" alt=""><p>Удар радуги</p>\
		</div></div><button class=\"buttonStart\" id=\"start\">Выберите магию</button>';
        mainField.appendChild(modalWindow);

        const mainMonster = document.createElement('div');
        mainMonster.className = 'monster';
        buildPerson(mainMonster, getRandomArbitrary(2, 4), getRandomArbitrary(2, 4), getRandomArbitrary(2, 4));

        const movement = document.querySelectorAll('.head');
        personMove(movement, 25);
        personMove(document.querySelectorAll('.weapon'), 75);


        function buildPerson(element, number1, number2, number3) {
            const frag = '<div class="weapon" id=""><img src="../Images/' + number3 + '-weapon.png" alt="" /></div><div class="head" id=""><img src="../Images/' + number1 + '-head.png" alt="" /></div><div class="body"><img src="../Images/' + number2 + '-foot.png" alt="" /></div>';
            element.innerHTML = frag;
            return mainField.appendChild(element);
        }

        function personMove(array, y0) {
            let pos = 5;
            const id = setInterval(frame, 300);

            function frame() {
                pos *= -1;
                array.forEach((elem) => {
                    elem.style.bottom = `${y0 + pos}px`;
                });
            }
        }
    }
}
