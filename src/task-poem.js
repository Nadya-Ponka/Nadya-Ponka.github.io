import createWaterfall from './waterfall';
import canvasLightning from './lightning';
import explosion from './explosion';
import health from './health-animation';
import {getRandomArbitrary, drawLife, createNode} from './utils';
import {saveInLocalStorage, leaderBoard} from './leaderBoard';
import {level, Game} from './game';
import {makeMagic, makeTurn} from './youTurn';
import {randomInteger, soundClickGreat, soundClickLosing, compareRandom} from './functions-task';

export let totalScore;

export default function showTaskPoem(param, player1, player2) {
  
    
  document.querySelector('.task-poem').style.display = 'block';
  document.querySelector('.field').style.display = 'none';
 
  
   
  let points = 0;
  let myDictionary = require('./dictionary');
  let poems = myDictionary.poems;

  let solutions = [7, 10, 8, 4, 8, 7, 2, 5, 3, 4];
  let num = randomInteger(0,9);
  document.querySelector('.poem').innerHTML=`${poems[num]}`;
    
  function taskPoem() {
    if (document.querySelector('.grate-poem')) {
      document.querySelector('.task-poem').removeChild(document.querySelector('.grate-poem'));
    }

    let answerForm = document.querySelector('.input-poem').value;
    let grate = document.createElement('div');
    if (answerForm.length == 0) {
      alert ('Вы не ввели свой ответ в форму!');
    } else if (answerForm == solutions[num]) {
            
            document.querySelector('.task-window-poem').style.display = 'none';
            document.querySelector('.task-poem').appendChild(grate);
            grate.classList.add('grate-poem');
            soundClickGreat();
            grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
            closeTask();
            points = getRandomArbitrary(10,20);
		
		        setTimeout(function() { 
		          makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
		        	makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
		        }, 1000);
           
          
        } else {
          
          document.querySelector('.task-window-poem').style.display = 'none';
          document.querySelector('.task-poem').appendChild(grate);
          grate.classList.add('grate-poem');
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

  

  document.querySelector('.button-poem').addEventListener('click', taskPoem);

  function closeTask() {
    setTimeout(function() { 
      document.querySelector('.task-poem').removeChild(document.querySelector('.grate-poem'));
      document.querySelector('.task-poem').style.display = 'none'; 
      closeScore();
      document.querySelector('.task-window-poem').style.display = 'block';
      document.querySelector('.input-poem').value='';
      document.querySelector('.button-poem').removeEventListener('click', taskPoem);
      document.querySelector('.field').style.display = 'grid';
    }, 2000);
  }
};