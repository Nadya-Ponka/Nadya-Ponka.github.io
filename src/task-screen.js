function showTask() {
  document.querySelector('.task').style.display = 'block';
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
    if (document.querySelector('.grate')) {
      document.querySelector('.task').removeChild(document.querySelector('.grate'));
    }

    let grate = document.createElement('div');
    let resultForm = document.querySelector('input').value;

    if (resultForm.length == 0) {
      alert ('Вы не ввели свое решение в форму!')
    }
     else if (resultForm != result) {
      document.querySelector('.task-window').style.display = 'none';
      document.querySelector('.task').appendChild(grate);
      grate.classList.add('grate');
      soundClickLosing();
      grate.innerHTML = '<p>Результат не верен - магия не применилась!</p>';     
      closeTask();
    } 
    else  if (resultForm == result) {
        document.querySelector('.task-window').style.display = 'none';
        document.querySelector('.task').appendChild(grate);
        grate.classList.add('grate');
        soundClickGreat();
        grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
        closeTask();
    } 
  }

  document.querySelector('.button').addEventListener('click', Task);

  function closeTask() {
    setTimeout(function() { 
      document.querySelector('.task').removeChild(document.querySelector('.grate'));
      document.querySelector('.task').style.display = 'none'; 
      closeScore();
      document.querySelector('.battle').style.display = 'block';
      document.querySelector('.task-window').style.display = 'block';
      document.querySelector('input').value='';
      document.querySelector('.button').removeEventListener('click', Task);
    }, 1000);
  }
}