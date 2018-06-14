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

export default function showTaskWord(param, player1, player2) {
   
  document.querySelector('.task-word').style.display = 'block';
  document.querySelector('.field').style.display = 'none';
 
  
  
  let myDictionary = require('./dictionary');
  let dictionary = myDictionary.dictionary;
  let object = dictionary[randomInteger(0, 39)];
  let englishWord = object.name;
  let arrayWord = englishWord.split('');
  let length = arrayWord.length;
  let randWord = arrayWord.sort(compareRandom);
  let points = 0;

  for(let i=0; i<length; i++) {
    $('#sortable').append(`<li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>${randWord[length-i-1]}</li>`)

  }

  $( function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
  } );

  let answerWord ='';
        
  function taskWord() {
    if (document.querySelector('.grate-word')) {
      document.querySelector('.task-word').removeChild(document.querySelector('.grate-word'));
    }

    for (let i=0; i<length; i++) {
      answerWord+=$('.ui-state-default')[i].innerHTML.charAt(54);
    }
   
    let grate = document.createElement('div');
    if (englishWord==answerWord) {
      document.querySelector('.task-window-word').style.display = 'none';
      document.querySelector('.task-word').appendChild(grate);
      grate.classList.add('grate-word');
      soundClickGreat();
      grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
      closeTask();
      points = getRandomArbitrary(10,20);
		
		  setTimeout(function() { 
		    makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
		    makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
		  }, 1000);
    } else {
      document.querySelector('.task-window-word').style.display = 'none';
      document.querySelector('.task-word').appendChild(grate);
      grate.classList.add('grate-word');
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
  

  document.querySelector('.button-word').addEventListener('click', taskWord);

  function closeTask() {
    setTimeout(function() { 
      document.querySelector('.task-word').removeChild(document.querySelector('.grate-word'));
      document.querySelector('.task-word').style.display = 'none'; 
      closeScore();
      document.querySelector('.task-window-word').style.display = 'block';
      document.querySelector('.button-word').removeEventListener('click', taskWord);
      document.querySelector('.field').style.display = 'grid';
    }, 2000);
  }
};