import { randomInteger } from './utils';
import { closeTask, closeAnswerWindow, wasYourAnswerWrong, wasYourAnswerRight } from './youAnswer';

export default function showTask(param, player1, player2) {
    document.querySelector('.task-arithmetic').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    const arrayOperators = ['+', '-', ':', '*'];
    //let points = 0;
    let argumentOne;
    let argumentTwo;
    let result;
    const numOperator = randomInteger(0, 3);
    const operator = arrayOperators[numOperator];
    if (operator === ':') {
        while ((argumentOne % argumentTwo) !== 0) {
            argumentOne = randomInteger(10, 100);
            argumentTwo = randomInteger(2, 50);
        }
    } else if (operator === '-') {
        argumentOne = randomInteger(1, 100);
        argumentTwo = randomInteger(1, argumentOne);
    } else if (operator === '*') {
        argumentOne = randomInteger(1, 10);
        argumentTwo = randomInteger(1, 10);
    } else {
        argumentOne = randomInteger(1, 100);
        argumentTwo = randomInteger(1, 100);
    }

    document.querySelector('.argument-one').innerHTML = argumentOne;
    document.querySelector('.argument-two').innerHTML = argumentTwo;
    document.querySelector('.operator').innerHTML = operator;
    switch (operator) {
    case '+':
        result = argumentOne + argumentTwo;
        break;
    case '-':
        result = argumentOne - argumentTwo;
        break;
    case ':':
        result = argumentOne / argumentTwo;
        break;
    case '*':
        result = argumentOne * argumentTwo;
        break;
    default:
        break;
    }

    function Task() {
        if (document.querySelector('.grate-arithmetic')) {
            document.querySelector('.task-arithmetic').removeChild(document.querySelector('.grate-arithmetic'));
        }
        const grate = document.createElement('div');
        const resultForm = document.querySelector('#input-arithmetic').value;
        if (resultForm.length === 0) {
            alert('Вы не ввели свое решение в форму!');
        } else {
            document.querySelector('#input-arithmetic').value = '';
            closeAnswerWindow(grate, 'arithmetic');
            closeTask('arithmetic', Task);

            if (+resultForm !== result) {
                wasYourAnswerWrong(grate, player2, player1);
            } else {
                wasYourAnswerRight(grate, param, player2, player1);
            }
        }
    }
    document.querySelector('.button-arithmetic').addEventListener('click', Task);
}
