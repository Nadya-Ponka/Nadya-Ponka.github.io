import { randomInteger } from './utils';
import { closeTask, closeAnswerWindow, wasYourAnswerWrong, wasYourAnswerRight } from './youAnswer';

const myDictionary = require('./dictionary');

export default function showTaskСonsonants(param, player1, player2) {
    document.querySelector('.task-consonants').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    const words = myDictionary.words;
    const num = randomInteger(0, 9);
    const length = words[num].length;
    let count = 0;
    const consonants = ['б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'н', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч', 'ш', 'щ'];

    for (let i = 0; i < length; i += 1) {
        if (consonants.indexOf(words[num].charAt(i)) !== -1) {
            count += 1;
        }
    }
    document.querySelector('.consonants').innerHTML = `${words[num]}`;

    function taskСonsonants() {
        if (document.querySelector('.grate-consonants')) {
            document.querySelector('.task-consonants').removeChild(document.querySelector('.grate-consonants'));
        }

        const answerForm = document.querySelector('.input-consonants').value;
        const grate = document.createElement('div');
        if (answerForm.length === 0) {
            alert('Вы не ввели свое значение в форму!');
        } else {
            document.querySelector('.input-consonants').value = '';
            closeAnswerWindow(grate, 'consonants');
            closeTask('consonants', taskСonsonants);

            if (+answerForm === count) {
                wasYourAnswerRight(grate, param, player2, player1);
            } else {
                wasYourAnswerWrong(grate, player2, player1);
            }
        }
    }
    document.querySelector('.button-consonants').addEventListener('click', taskСonsonants);
}
