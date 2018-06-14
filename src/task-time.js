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

export default function showTaskTime(param, player1, player2) {
  
  document.querySelector('.task-time').style.display = 'block';
  document.querySelector('.field').style.display = 'none';
 
    
  
  let points = 0;
  let num = randomInteger(1,59);
    
  document.querySelector('.time').innerHTML = `Сколько секунд в ${num} минутах?`
    
  function taskTime() {
    if (document.querySelector('.grate-time')) {
      document.querySelector('.task-time').removeChild(document.querySelector('.grate-time'));
    }

    let answerForm = document.querySelector('.input-time').value;
    let grate = document.createElement('div');
    if (answerForm.length == 0) {
      alert ('Вы не ввели свой ответ в форму!');
    } else if (answerForm == (num*60)) {
            
            document.querySelector('.task-window-time').style.display = 'none';
            document.querySelector('.task-time').appendChild(grate);
            grate.classList.add('grate-time');
            soundClickGreat();
            grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
            closeTask();
            points = getRandomArbitrary(10,20);
		
		        setTimeout(function() { 
		          makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
		        	makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
		        }, 1000);
           
          
        } else {
          
          document.querySelector('.task-window-time').style.display = 'none';
          document.querySelector('.task-time').appendChild(grate);
          grate.classList.add('grate-time');
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

  

  document.querySelector('.button-time').addEventListener('click', taskTime);

  function closeTask() {
    setTimeout(function() { 
      document.querySelector('.task-time').removeChild(document.querySelector('.grate-time'));
      document.querySelector('.task-time').style.display = 'none'; 
      closeScore();
      document.querySelector('.task-window-time').style.display = 'block';
      document.querySelector('.input-time').value='';
      document.querySelector('.button-time').removeEventListener('click', taskTime);
      document.querySelector('.field').style.display = 'grid';
    }, 2000);
  }
};