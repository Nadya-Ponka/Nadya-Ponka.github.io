import { randomInteger } from './utils';
import { closeTask, closeAnswerWindow, wasYourAnswerWrong, wasYourAnswerRight } from './youAnswer';

const myDictionary = require('./dictionary');

export default function showTaskPicture(param, player1, player2) {
    const dictionary = myDictionary.dictionary;
    document.querySelector('.task-picture').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
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
        } else {
            document.querySelector('.input-picture').value = '';
            closeAnswerWindow(grate, 'picture');
            closeTask('picture', taskPicture);

            if (answerForm === englishWord) {
                wasYourAnswerRight(grate, param, player2, player1);
            } else {
                wasYourAnswerWrong(grate, player2, player1);
            }
        }
    }
    document.querySelector('.button-picture').addEventListener('click', taskPicture);
}
