import createWaterfall from './waterfall';
import canvasLightning from './lightning';
import explosion from './explosion';
import health from './health-animation';
import {getRandomArbitrary, drawLife, createNode} from './utils';
import {saveInLocalStorage, leaderBoard} from './leaderBoard';
import {level, Game} from './game';
import {makeMagic, makeTurn} from './youTurn';


export let totalScore;


export default function showTaskPicture(param, player1, player2) {

  
  let myDictionary = require('./dictionary');
  let dictionary = myDictionary.dictionary;

  document.querySelector('.task-picture').style.display = 'block';
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
  
  
  
  document.querySelector('.animal-picture').innerHTML = `<img src='../Images/img-animals/${englishWord}.jpg' alt="">`;
    
  function taskPicture() {
    if (document.querySelector('.grate-picture')) {
      document.querySelector('.task-picture').removeChild(document.querySelector('.grate-picture'));
    }
    
   
    let grate = document.createElement('div');
    let answerForm = document.querySelector('.input-picture').value.toLowerCase();
    console.log(answerForm);
    if (answerForm.length == 0) {
      alert ('Вы не ввели свое название в форму!');
    } else if (answerForm==englishWord) {
       
            document.querySelector('.task-window-picture').style.display = 'none';
            document.querySelector('.task-picture').appendChild(grate);
            grate.classList.add('grate-picture');
            soundClickGreat();
            grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
            closeTask();
            points = getRandomArbitrary(10,20);
		
		        setTimeout(function() { 
		        	makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
		         	makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
		        }, 1000);
            
        } else {
          document.querySelector('.task-window-picture').style.display = 'none';
          document.querySelector('.task-picture').appendChild(grate);
          grate.classList.add('grate-picture');
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

  document.querySelector('.button-picture').addEventListener('click', taskPicture);

  function closeTask() {
    setTimeout(function() { 
      document.querySelector('.task-picture').removeChild(document.querySelector('.grate-picture'));
      document.querySelector('.task-picture').style.display = 'none'; 
      closeScore();
      document.querySelector('.task-window-picture').style.display = 'block';
      document.querySelector('.input-picture').value='';
      document.querySelector('.button-picture').removeEventListener('click', taskPicture);
      document.querySelector('.field').style.display = 'grid';
    }, 2000);
  }
};