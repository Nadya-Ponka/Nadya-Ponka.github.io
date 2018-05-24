let arrayOperators = ['+', '-', ':', '*'];

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

function soundClickGreat() {
  var audio = new Audio(); // Создаём новый элемент Audio
  audio.src = '../sound/great.mp3'; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}

window.onload = function () {
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
  
  document.querySelector('.button').addEventListener('click', function() {
    let grate = document.createElement('div');
    let resultForm = document.querySelector('input').value;

    if (resultForm.length == 0) {
      alert ('Вы не ввели свое решение в форму!')
    } else {
      document.querySelector('section').style.display = 'none';
      document.body.appendChild(grate);
      grate.classList.add('grate');
    } 
    
    if (resultForm != result) {
      grate.innerHTML = '<p>Результат не верен - магия не применилась!</p>'
    } else {
      grate.innerHTML = '<p>Ура! Вы правильно решили - магия применилась!</p>';
      soundClickGreat();
    }
  })
}