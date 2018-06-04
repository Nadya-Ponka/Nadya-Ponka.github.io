import createWaterfall from './waterfall';
import canvasLightning from './lightning';
import explosion from './explosion';
import health from './health-animation';
import {getRandomArbitrary, drawLife, createNode} from './utils';
import {saveInLocalStorage, leaderBoard} from './leaderBoard';
import {level, Game} from './game';
import {makeMagic, makeTurn} from './youTurn';


export let totalScore;

export default function showTaskTranslation(param, player1, player2) {
  
  let myDictionary = require('./dictionary');
  let dictionary = myDictionary.dictionary;

  document.querySelector('.task-translation').style.display = 'block';
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

  let object = dictionary[randomInteger(0, 39)];
  let englishWord = object.name;
  let fields = Object.keys(object);
  

  document.querySelector('.english-word-translation').innerHTML = englishWord;
    
  function taskTranslate() {
    if (document.querySelector('.grate-translation')) {
      document.querySelector('.task-translation').removeChild(document.querySelector('.grate-translation'));
    }

    let points = 0;
    let coincidence = 0;
    let grate = document.createElement('div');
    let answerForm = document.querySelector('.input-translation').value.toLowerCase();
    console.log(answerForm);
    if (answerForm.length == 0) {
      alert ('Вы не ввели свой перевод в форму!');
    } else {
        for(let i = 1; i < fields.length; i++ ) {
          console.log(object[Object.keys(object)[i]]);
          if (answerForm == object[Object.keys(object)[i]]) {
            
            document.querySelector('.task-window-translation').style.display = 'none';
            document.querySelector('.task-translation').appendChild(grate);
            grate.classList.add('grate-translation');
            soundClickGreat();
            grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
            closeTask();
            coincidence++;
            points = getRandomArbitrary(10,20);
		
		        setTimeout(function() { 
		          makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
		        	makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
		        }, 1000);
            break;
          } 
        }
        if (coincidence==0) {
          console.log('Нет');
          document.querySelector('.task-window-translation').style.display = 'none';
          document.querySelector('.task-translation').appendChild(grate);
          grate.classList.add('grate-translation');
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
  }

  document.querySelector('.button-translation').addEventListener('click', taskTranslate);

  function closeTask() {
    setTimeout(function() { 
      document.querySelector('.task-translation').removeChild(document.querySelector('.grate-translation'));
      document.querySelector('.task-translation').style.display = 'none'; 
      closeScore();
      document.querySelector('.task-window-translation').style.display = 'block';
      document.querySelector('.input-translation').value='';
      document.querySelector('.button-translation').removeEventListener('click', taskTranslate);
      document.querySelector('.field').style.display = 'grid';
    }, 2000);
  }
};