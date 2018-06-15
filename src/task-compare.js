import { getRandomArbitrary } from './utils';
import { level } from './game';
import { makeMagic, makeTurn } from './youTurn';
import { randomInteger, soundClickGreat, soundClickLosing } from './functions-task';

export default function showTaskCompare(param, player1, player2) {
    document.querySelector('.task-compare').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    let points = 0;
    const array = [];
    while (array.length !== 7) {
        const result = randomInteger(10, 99);
        if (array.indexOf(result) === -1) {
            array.push(result);
        }
    }

    for (let i = 0; i < 7; i += 1) {
        $('#sortable-compare').append(`<li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>${array[i]}</li>`);
    }

    $(() => {
        $('#sortable-compare').sortable();
        $('#sortable-compare').disableSelection();
    });
    function taskCompare() {
        if (document.querySelector('.grate-compare')) {
            document.querySelector('.task-compare').removeChild(document.querySelector('.grate-compare'));
        }
        const answerArray = [];
        for (let i = 0; i < 7; i += 1) {
            answerArray.push(+$('.ui-state-default')[i].innerHTML.match(/\d{2}/)[0]);
        }
        document.querySelector('#sortable-compare').innerHTML = '';
        const grate = document.createElement('div');
        if ((answerArray[0] < answerArray[1])
           && (answerArray[1] < answerArray[2])
           && (answerArray[2] < answerArray[3])
           && (answerArray[3] < answerArray[4])
           && (answerArray[4] < answerArray[5])
           && (answerArray[5] < answerArray[6])) {
            document.querySelector('.task-window-compare').style.display = 'none';
            document.querySelector('.task-compare').appendChild(grate);
            grate.classList.add('grate-compare');
            soundClickGreat();
            grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
            closeTask();
            points = getRandomArbitrary(10, 20);
            setTimeout(() => {
                makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
                makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
            }, 1000);
        } else {
            document.querySelector('.task-window-compare').style.display = 'none';
            document.querySelector('.task-compare').appendChild(grate);
            grate.classList.add('grate-compare');
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
    document.querySelector('.button-compare').addEventListener('click', taskCompare);

    function closeTask() {
        setTimeout(() => {
            document.querySelector('.task-compare').removeChild(document.querySelector('.grate-compare'));
            document.querySelector('.task-compare').style.display = 'none';
            document.querySelector('.modal-dialog').style.display = 'none';
            document.querySelector('.task-window-compare').style.display = 'block';
            document.querySelector('.button-compare').removeEventListener('click', taskCompare);
            document.querySelector('.field').style.display = 'grid';
        }, 2000);
    }
}
