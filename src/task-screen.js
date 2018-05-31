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
      document.querySelector('.task').removeChild(document.querySelector('.grate'));
	  //document.querySelector('.grate').style.display = 'none';
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
      grate.innerHTML = '<p>Результат не верен - магия не применилась!</p>\
	  <p>Теперь ходит противник.</p>';     
      closeTask();
	  points = getRandomArbitrary(10,20);
	  param = getRandomArbitrary(1, 3);
		setTimeout(function() { 
			makeMagic(param, '.player-container .magic', 'player-magic', '.monsters-container .magic', '.monsters-container .health');
			makeTurn(param, points, player2, player1, '.aboutMonster', '#monsterLife', '.aboutPlayer', '#playerLife', 'Противник');
		}, 1000);
    } 
    else  if(resultForm == result) {
        document.querySelector('.task-window').style.display = 'none';
        document.querySelector('.task').appendChild(grate);
        grate.classList.add('grate');
        soundClickGreat();
        grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
		closeTask();
		//console.log("End "+temp);
		points = getRandomArbitrary(10,20);
		
		setTimeout(function() { 
			makeMagic(param, '.monsters-container .magic', 'monsters-magic', '.player-container .magic', '.player-container .health');
			makeTurn(param, points, player1, player2, '.aboutPlayer', '#playerLife', '.aboutMonster', '#monsterLife', 'Ты');
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

    }, 2000);
  }

};

function makeMagic(n, div1, div2, div3, div4) {	
	switch (n) {
		case 1:
			createWaterfall(div1, div2);
			break;
		case 2:
			canvasLightning(div1, div2);
			break;  
		case 3:
			health(div3, div4);
			break;
	}
}

function makeTurn(magic, points, player1, player2, classAboutPlayer, idPlayerLife, classAboutMonster, idMonsterLife, whoMakeTurn) {
	let temp = document.querySelector('.points');

			setTimeout(function() { 
				temp.className = 'points';
				
				if(magic == 3) {
					player1['score'] = player1['score'] + points;
					if(player1['score'] > 130) player1['score'] = 130;
					document.querySelector(`${classAboutPlayer}`).lastChild.innerHTML = player1.score;
					temp.innerHTML = `${whoMakeTurn}`+' прибавил<br />к своему здоровью<br />'+points+' пунктов!'; 
					temp.className += ' appear';
					document.querySelector(`${idPlayerLife}`).style.width = `${player1.score*2.5+'px'}`;
					document.querySelector(`${idPlayerLife}`).style.transition = `width 0.7s ease-in-out`; 
					document.querySelector(`${idPlayerLife}`).title = player1.score;
					setTimeout(function() {temp.className += ' animated fadeOutDown'}, 5000);
				} else {			
					player2['score'] = player2['score'] - points;
					document.querySelector(`${classAboutMonster}`).lastChild.innerHTML = player2.score;
					temp.innerHTML = `${whoMakeTurn}`+' нанес <br />сокрушительный урон<br />в '+points+' пунктов!'; 
					temp.className += ' appear';
					document.querySelector(`${idMonsterLife}`).style.width = `${player2.score*2.5+'px'}`;
					document.querySelector(`${idMonsterLife}`).style.transition = `width 0.7s ease-in-out`;
					//document.querySelector(`${idMonsterLife}`).style.justifySelf = 'end';
					document.querySelector(`${idMonsterLife}`).title = player2.score;
					setTimeout(function() {temp.className += ' animated fadeOutDown'}, 5000);
				}
			}, 2000);
			
			temp.innerHTML = '';
}