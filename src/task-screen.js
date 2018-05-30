//import {closeScore, dialog} from './modalDialog';
//export let temp;
import createWaterfall from './waterfall';
import canvasLightning from './lightning';
import health from './health-animation';
import {getRandomArbitrary, drawLife} from './utils';

export default function showTask(param, player1, player2) {
  
  document.querySelector('.task').style.display = 'block';
  document.querySelector('.field').style.display = 'none';

  let arrayOperators = ['+', '-', ':', '*'];

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
  
  let argumentOne, argumentTwo, result;
  let numOperator = randomInteger(0, 3);
  let operator = arrayOperators[numOperator];
  if (operator == ":") {
    while ( (argumentOne % argumentTwo) !== 0) {
      argumentOne = randomInteger(10, 100);
      argumentTwo = randomInteger(2, 50);
    }
  } else {
    argumentOne = randomInteger(1, 100);
    argumentTwo = randomInteger(1, 100);
  }

  document.querySelector('.argument-one').innerHTML = argumentOne;
  document.querySelector('.argument-two').innerHTML = argumentTwo;
  document.querySelector('.operator').innerHTML = operator;
  
  switch (operator) {
    case '+':
      result = argumentOne + argumentTwo;
      break;
    case '-':
      result = argumentOne - argumentTwo;
      break;  
    case ':':
      result = argumentOne / argumentTwo;
      break;
    case '*':
      result = argumentOne * argumentTwo;
      break;
  }

  function Task() {

    if(document.querySelector('.grate')) {
      //document.querySelector('.task').removeChild(document.querySelector('.grate'));
	  document.querySelector('.grate').style.display = 'none';
    }

    let grate = document.createElement('div');
    let resultForm = document.querySelector('input').value;

    if(resultForm.length == 0) {
      alert ('Вы не ввели свое решение в форму!')
    }
     else if(resultForm != result) {
      document.querySelector('.task-window').style.display = 'none';
      document.querySelector('.task').appendChild(grate);
      grate.classList.add('grate');
      soundClickLosing();
      grate.innerHTML = '<p>Результат не верен - магия не применилась!</p>';     
      closeTask();
    } 
    else  if(resultForm == result) {
        document.querySelector('.task-window').style.display = 'none';
        document.querySelector('.task').appendChild(grate);
        grate.classList.add('grate');
        soundClickGreat();
        grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
		//temp = true;
		closeTask();
		//console.log("End "+temp);
		points = getRandomArbitrary(10,20);
		console.log(player2.score);
		setTimeout(function() { 
			makeMagic(param);
			setTimeout(function() { 
				let temp = document.querySelector('.points');
				temp.className = 'points';
				
				if(param == 1 || param == 2) {
					player2['score'] = player2['score'] - points;
					document.querySelector('.aboutMonster').lastChild.innerHTML = player2.score;
					temp.innerHTML = 'Ты нанес противнику<br />сокрушительный урон<br />в '+points+' пунктов!'; 
					temp.className += ' appear';
					//drawLife('monsterLife',player2['score']);
					document.querySelector('#monsterLife').style.width = `${player2.score*3+'px'}`;
					document.querySelector('#monsterLife').style.justifySelf = 'end';

					document.querySelector('#monsterLife').title = player2.score;
					setTimeout(function() {temp.className += ' animated fadeOutDown'}, 5000);
				} else {
					player1['score'] = player1['score'] + points;
					document.querySelector('.aboutPlayer').lastChild.innerHTML = player1.score;
					temp.innerHTML = 'Ты прибавил<br />к своему здоровью<br />'+points+' пунктов!'; 
					temp.className += ' appear';
					document.querySelector('#playerLife').style.width = `${player1.score*3+'px'}`;
					document.querySelector('#playerLife').style.transition = `width 0.3s ease-in-out`;
					document.querySelector('#playerLife').title = player1.score;
					setTimeout(function() {temp.className += ' animated fadeOutDown'}, 5000);
				}
				
			}, 2000);
			
			
		}, 1000);
		

		
    } 
  }
	
  document.querySelector('.button').addEventListener('click', Task);

  function closeTask() {
    setTimeout(function() { 
      document.querySelector('.task').removeChild(document.querySelector('.grate'));
      document.querySelector('.task').style.display = 'none'; 
      closeScore();
      document.querySelector('.task-window').style.display = 'block';
      document.querySelector('input').value='';
      document.querySelector('.button').removeEventListener('click', Task);
      document.querySelector('.field').style.display = 'grid';

    }, 1000);
  }

};

function makeMagic(n) {
		
		//alert('We are here');
		switch (n) {
			case 1:
			  createWaterfall();
			  //document.querySelector('.monsters-container .magic').style.display = 'block';
			  break;
			case 2:
			  canvasLightning();
			  break;  
			case 3:
			  health();
			  break;
	}
}
