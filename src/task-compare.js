import { randomInteger } from './utils';
import { closeTask, closeAnswerWindow, wasYourAnswerWrong, wasYourAnswerRight } from './youAnswer';

export default function showTaskCompare(param, player1, player2) {
    document.querySelector('.task-compare').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
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
        closeAnswerWindow(grate, 'compare');
        closeTask('compare', taskCompare);

        if ((answerArray[0] < answerArray[1])
           && (answerArray[1] < answerArray[2])
           && (answerArray[2] < answerArray[3])
           && (answerArray[3] < answerArray[4])
           && (answerArray[4] < answerArray[5])
           && (answerArray[5] < answerArray[6])) {
            wasYourAnswerRight(grate, param, player2, player1);
        } else {
            wasYourAnswerWrong(grate, player2, player1);
        }
    }
    document.querySelector('.button-compare').addEventListener('click', taskCompare);
}
