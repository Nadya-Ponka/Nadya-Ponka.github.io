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

export default function showTaskСonsonants(param, player1, player2) {
 
   
  document.querySelector('.task-consonants').style.display = 'block';
  document.querySelector('.field').style.display = 'none';
 
    
  let points = 0;

 
  let myDictionary = require('./dictionary');
  let words = myDictionary.words;
  let num = randomInteger(0,9);
  let length = words[num].length;
  let count = 0;

  let consonants = ['б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'н', 'п', 'р', 'с', 'т', 'ф', 'х', 'ц', 'ч', 'ш', 'щ'];

  for (let i = 0; i < length; i++) {
    if (consonants.indexOf(words[num].charAt(i)) != -1) 
      count++;
  }
  
  
    
  document.querySelector('.consonants').innerHTML = `${words[num]}`
    


  function taskСonsonants() {
    if (document.querySelector('.grate-consonants')) {
      document.querySelector('.task-consonants').removeChild(document.querySelector('.grate-consonants'));
    }

    let answerForm = document.querySelector('.input-consonants').value;
    // let coincidence = 0;
    let grate = document.createElement('div');
    // let answerForm = document.querySelector('.input-translation').value.toLowerCase();
    if (answerForm.length == 0) {
      alert ('Вы не ввели свое значение в форму!');
    } else if (answerForm == count) {
            
            document.querySelector('.task-window-consonants').style.display = 'none';
            document.querySelector('.task-consonants').appendChild(grate);
            grate.classList.add('grate-consonants');
            soundClickGreat();
            grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
            closeTask();
            points = getRandomArbitrary(10,20);
		
		        setTimeout(function() { 
		          makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
		        	makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
		        }, 1000);
           
          
        } else {
          
          document.querySelector('.task-window-consonants').style.display = 'none';
          document.querySelector('.task-consonants').appendChild(grate);
          grate.classList.add('grate-consonants');
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

  

  document.querySelector('.button-consonants').addEventListener('click', taskСonsonants);

  function closeTask() {
    setTimeout(function() { 
      document.querySelector('.task-consonants').removeChild(document.querySelector('.grate-consonants'));
      document.querySelector('.task-consonants').style.display = 'none'; 
      closeScore();
      document.querySelector('.task-window-consonants').style.display = 'block';
      document.querySelector('.input-consonants').value='';
      document.querySelector('.button-consonants').removeEventListener('click', taskСonsonants);
      document.querySelector('.field').style.display = 'grid';
    }, 2000);
  }
};