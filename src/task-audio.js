import { randomInteger } from './utils';
import { closeTask, closeAnswerWindow, wasYourAnswerWrong, wasYourAnswerRight } from './youAnswer';

const myDictionary = require('./dictionary');

export default function showTaskAudio(param, player1, player2) {
    const dictionary = myDictionary.dictionary;
    document.querySelector('.task-audio').style.display = 'block';
    document.querySelector('.field').style.display = 'none';
    const object = dictionary[randomInteger(0, 39)];
    const englishWord = object.name;

    function speak(message) {
        const msg = new SpeechSynthesisUtterance(message);
        const voices = window.speechSynthesis.getVoices();
        msg.voice = voices[6];
        window.speechSynthesis.speak(msg);
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
        } else {
            document.querySelector('.input-audio').value = '';
            closeAnswerWindow(grate, 'audio');
            closeTask('audio', taskAudio);

            if (answerForm === englishWord) {
                wasYourAnswerRight(grate, param, player2, player1);
            } else {
                wasYourAnswerWrong(grate, player2, player1);
            }
        }
    }
    document.querySelector('.button-audio').addEventListener('click', taskAudio);
}
