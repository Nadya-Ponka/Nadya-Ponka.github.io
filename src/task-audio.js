import createWaterfall from './waterfall';
import canvasLightning from './lightning';
import explosion from './explosion';
import health from './health-animation';
import {getRandomArbitrary, drawLife, createNode} from './utils';
import {saveInLocalStorage, leaderBoard} from './leaderBoard';
import {level, Game} from './game';
import {makeMagic, makeTurn} from './youTurn';


export let totalScore;
export default function showTaskAudio(param, player1, player2) {

 
  let myDictionary = require('./dictionary');
  let dictionary = myDictionary.dictionary;
  
  document.querySelector('.task-audio').style.display = 'block';
  document.querySelector('.field').style.display = 'none';
 
  function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }

  function soundClickGreat() {
    let audio = new Audio(); // Создаём новый элемент Audio
    audio.src = '../sound/great.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }
  
  function soundClickLosing() {
    let audio = new Audio(); // Создаём новый элемент Audio
    audio.src = '../sound/losing.mp3'; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }

  let points = 0;
  
  let object = dictionary[randomInteger(0, 39)];
  let englishWord = object.name;
  console.log(englishWord);

  document.querySelector('.audio').onclick = function () {
    speak(`${englishWord}`);
  };

  function speak (message) {
    var msg = new SpeechSynthesisUtterance(message)
    var voices = window.speechSynthesis.getVoices()
    msg.voice = voices[6]
    window.speechSynthesis.speak(msg)
  }
  
    
  function taskAudio() {
    if (document.querySelector('.grate-audio')) {
      document.querySelector('.task-audio').removeChild(document.querySelector('.grate-audio'));
    }
    
   
    let grate = document.createElement('div');
    let answerForm = document.querySelector('.input-audio').value.toLowerCase();
    console.log(answerForm);
    if (answerForm.length == 0) {
      alert ('Вы не ввели свое слово в форму!');
    } else if (answerForm==englishWord) {
       
            document.querySelector('.task-window-audio').style.display = 'none';
            document.querySelector('.task-audio').appendChild(grate);
            grate.classList.add('grate-audio');
            soundClickGreat();
            grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
            closeTask();
            points = getRandomArbitrary(10,20);
		
		        setTimeout(function() { 
			        makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
			        makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
		        }, 1000);
            
        } else {
          document.querySelector('.task-window-audio').style.display = 'none';
          document.querySelector('.task-audio').appendChild(grate);
          grate.classList.add('grate-audio');
          soundClickLosing();
          grate.innerHTML = '<p>Результат не верен - магия не применилась!</p>\
          <p>Теперь ходит противник.</p>';    
          closeTask();
          points = Math.floor(getRandomArbitrary(10,20)*level);
	        param = getRandomArbitrary(1, 3);
		      setTimeout(function() { 
		      	makeMagic(param, '.player-container .magic', 'player-magic', '.monsters-container .magic', '.monsters-container .health');
		      	makeTurn(param, points, player2, player1, '.aboutMonster', '#monsterLife', '.aboutPlayer', '#playerLife', 'Противник');
		      }, 1000);
        }
      
    }

  
  document.querySelector('.button-audio').addEventListener('click', taskAudio);

  function closeTask() {
    setTimeout(function() { 
      document.querySelector('.task-audio').removeChild(document.querySelector('.grate-audio'));
      document.querySelector('.task-audio').style.display = 'none'; 
      closeScore();
      document.querySelector('.task-window-audio').style.display = 'block';
      document.querySelector('.input-audio').value='';
      document.querySelector('.button-audio').removeEventListener('click', taskAudio);
      document.querySelector('.field').style.display = 'grid';
    }, 2000);
  }
};