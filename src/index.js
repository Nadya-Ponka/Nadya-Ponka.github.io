import Person from './personClass';
import waterfallCanvas from './waterfall';
//import canvasLightning from './lightning';

(function load() {
	
	let nameAdjectiveMonster = ["Ужасный", "Злобный", "Сопливый"];
	let whichMonster = ["Огр", "Гном", "Гоблин"];
	let nameMonster = ["Том", "Макс", "Дима"];

	let player = new Person("Крош", String(drawLife("player", 100)));
	let monster = new Person(String(nameAdjectiveMonster[getRandomArbitrary(0, 2)] + ' ' + whichMonster[getRandomArbitrary(0, 2)] + ' ' + nameMonster[getRandomArbitrary(0, 2)]), String(drawLife("monster", 100)));

	let playerField = document.querySelector('.aboutPlayer');
	let monsterField = document.querySelector('.aboutMonster');

	playerField.firstElementChild.appendChild(createNode('span', {}, player.name));
	monsterField.firstElementChild.appendChild(createNode('span', {}, monster.name));

	/*playerField.lastElementChild.appendChild(createNode('span', {}, player.score));
	monsterField.lastElementChild.appendChild(createNode('span', {}, monster.score));*/
	
	loadFight();
	
	function loadFight() {

		let mainField = document.querySelector('.field');
		console.log(mainField);
		
		let mainHero = document.createElement('div');
		mainHero.className = 'hero';
		buildPerson(mainHero, 1, 1, 1);

		let modalWindow = document.createElement('div');
		modalWindow.style.alignSelf = 'end';
		modalWindow.style.justifySelf = 'center';
		//modalWindow.className = 'modal-dialog';
		modalWindow.innerHTML = '<div class="modal-dialog"><p class=\"close\" onclick=\"closeScore()\">&#215;</p>\
					<p>Выберите заклинание:</p>\
					<div class=\"spell\">\
						<img src=\"../Images/Atack.png\" alt=\"\" onclick=\"showTask()\">\
						<p>Атаковать соперника</p>\
						<img src=\"../Images/Health.png\" alt=\"\" onclick=\"showTask()\">\
						<p>Лечить себя</p>\
					</div>\
				</div>\
				<button class=\"buttonStart\" onclick=\"dialog()\">Выберите магию</button>';
		mainField.appendChild(modalWindow);
		
		let mainMonster = document.createElement('div');
		mainMonster.className = 'monster';
		buildPerson(mainMonster, getRandomArbitrary(2, 4), getRandomArbitrary(2, 4), getRandomArbitrary(2, 4));

		let movement = document.querySelectorAll(".head");
		personMove(movement, 25);
		personMove(document.querySelectorAll(".weapon"), 75);
		

		function buildPerson(element, number1, number2, number3) {
			var frag = '<div class="weapon" id=""><img src="../Images/' + number3 + '-weapon.png" alt="" /></div><div class="head" id=""><img src="../Images/' + number1 + '-head.png" alt="" /></div><div class="body"><img src="../Images/' + number2 + '-foot.png" alt="" /></div>';
			element.innerHTML = frag;
			return mainField.appendChild(element);
		}

		function personMove(array, y0) {
			var pos = 5;
			var id = setInterval(frame, 300);

			function frame() {
				pos *= -1;
				array.forEach(elem => {
					elem.style.bottom = y0 + pos + 'px';
				});
			}
		}
	}

	function createNode(tag, props, ...children) {
		const element = document.createElement(tag);

		Object.keys(props).forEach(key => element[key] = props[key]);

		children.forEach(child => {
			if (typeof child === 'string') {
				child = document.createTextNode(child);
			}

			element.appendChild(child);
		});

		return element;
	}

	function getRandomArbitrary(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}

	function drawLife(personId, n) {
		document.querySelector(`#${personId}`).style.width = `${n*3+'px'}`;
		return n;
	}
	

         

})();