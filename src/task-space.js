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

export default function showTaskSpace(param, player1, player2) {
  
    
  document.querySelector('.task-space').style.display = 'block';
  document.querySelector('.field').style.display = 'none';
 
  
   
  let points = 0;
  let num1 = randomInteger(1,20);
  let num2 = randomInteger(1,35);

  
  document.querySelector('.space').innerHTML = `У дедушки на даче имеется земельный участок размерами ${num1} на ${num2} метров. Какова площадь участка в кв.метрах?`
  
  
  function taskSpace() {
    if (document.querySelector('.grate-space')) {
      document.querySelector('.task-space').removeChild(document.querySelector('.grate-space'));
    }

    let answerForm = document.querySelector('.input-space').value;
    let grate = document.createElement('div');
    if (answerForm.length == 0) {
      alert ('Вы не ввели свое значение в форму!');
    } else if (answerForm == (num1*num2)) {
            
            document.querySelector('.task-window-space').style.display = 'none';
            document.querySelector('.task-space').appendChild(grate);
            grate.classList.add('grate-space');
            soundClickGreat();
            grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
            closeTask();
            points = getRandomArbitrary(10,20);
		
		        setTimeout(function() { 
		          makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
		        	makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
		        }, 1000);
           
          
        } else {
          
          document.querySelector('.task-window-space').style.display = 'none';
          document.querySelector('.task-space').appendChild(grate);
          grate.classList.add('grate-space');
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

  

  document.querySelector('.button-space').addEventListener('click', taskSpace);

  function closeTask() {
    setTimeout(function() { 
      document.querySelector('.task-space').removeChild(document.querySelector('.grate-space'));
      document.querySelector('.task-space').style.display = 'none'; 
      closeScore();
      document.querySelector('.task-window-space').style.display = 'block';
      document.querySelector('.input-space').value='';
      document.querySelector('.button-space').removeEventListener('click', taskSpace);
      document.querySelector('.field').style.display = 'grid';
    }, 2000);
  }
};