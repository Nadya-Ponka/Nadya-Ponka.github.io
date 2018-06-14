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

export default function showTaskFigure(param, player1, player2) {
  
  
  document.querySelector('.task-figure').style.display = 'block';
  document.querySelector('.field').style.display = 'none';
  
  
  let points = 0;
  let countAngles = [3, 4, 5, 6, 7, 8, 40];
  let num = randomInteger(0,6);


  document.querySelector('.figure').innerHTML = `<img src='../Images/img-figures/${num}.png' alt="">`;
  
  

  function taskFigure() {
    if (document.querySelector('.grate-figure')) {
      document.querySelector('.task-figure').removeChild(document.querySelector('.grate-figure'));
    }

    let answerForm = document.querySelector('.input-figure').value;
    let grate = document.createElement('div');
    if (answerForm.length == 0) {
      alert ('Вы не ввели свое значение в форму!');
    } else if (answerForm == countAngles[num]) {
            
            document.querySelector('.task-window-figure').style.display = 'none';
            document.querySelector('.task-figure').appendChild(grate);
            grate.classList.add('grate-figure');
            soundClickGreat();
            grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
            closeTask();
            points = getRandomArbitrary(10,20);
		
		        setTimeout(function() { 
		          makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
		        	makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
		        }, 1000);
           
          
        } else {
          
          document.querySelector('.task-window-figure').style.display = 'none';
          document.querySelector('.task-figure').appendChild(grate);
          grate.classList.add('grate-figure');
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

  

  document.querySelector('.button-figure').addEventListener('click', taskFigure);

  function closeTask() {
    setTimeout(function() { 
      document.querySelector('.task-figure').removeChild(document.querySelector('.grate-figure'));
      document.querySelector('.task-figure').style.display = 'none'; 
      closeScore();
      document.querySelector('.task-window-figure').style.display = 'block';
      document.querySelector('.input-figure').value='';
      document.querySelector('.button-figure').removeEventListener('click', taskFigure);
      document.querySelector('.field').style.display = 'grid';
    }, 2000);
  }
};