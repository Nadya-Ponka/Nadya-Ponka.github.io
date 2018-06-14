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

export default function showTaskCount(param, player1, player2) {
  
    
  document.querySelector('.task-count').style.display = 'block';
  document.querySelector('.field').style.display = 'none';
 
  
    
  let points = 0;
  let count = randomInteger(1, 90);

  

  for (let i=1; i<=count; i++) {
    let div = document.createElement('div');
    div.innerHTML = `<img src='../Images/ball.png' alt="">`;
    document.querySelector('.picture-count').appendChild(div);
  }



  

  
  
 
    
  function taskCount() {
    if (document.querySelector('.grate-count')) {
      document.querySelector('.task-count').removeChild(document.querySelector('.grate-count'));
    }

    let answerForm = document.querySelector('.input-count').value;
    let grate = document.createElement('div');
    if (answerForm.length == 0) {
      alert ('Вы не ввели свой перевод в форму!');
    } else if (answerForm==count) {
            
            document.querySelector('.task-window-count').style.display = 'none';
            document.querySelector('.task-count').appendChild(grate);
            grate.classList.add('grate-count');
            soundClickGreat();
            grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
            closeTask();
            points = getRandomArbitrary(10,20);
		
		        setTimeout(function() { 
		          makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
		        	makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
		        }, 1000);
           
          
        } else {
          
          document.querySelector('.task-window-count').style.display = 'none';
          document.querySelector('.task-count').appendChild(grate);
          grate.classList.add('grate-count');
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

  

  document.querySelector('.button-count').addEventListener('click', taskCount);

  function closeTask() {
    setTimeout(function() { 
      document.querySelector('.task-count').removeChild(document.querySelector('.grate-count'));
      document.querySelector('.task-count').style.display = 'none'; 
      closeScore();
      document.querySelector('.task-window-count').style.display = 'block';
      document.querySelector('.input-count').value='';
      document.querySelector('.button-count').removeEventListener('click', taskCount);
      document.querySelector('.field').style.display = 'grid';
    }, 2000);
  }
};