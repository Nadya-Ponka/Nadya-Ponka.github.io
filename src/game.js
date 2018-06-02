import Person from './personClass';
//import canvasLightning from './lightning';
import showTask from './task-screen';
//import {closeScore, dialog} from './modalDialog';
import {getRandomArbitrary, drawLife} from './utils';
import showTaskTranslation from './task-translate';
import showTaskPicture from './task-picture';
import showTaskAudio from './task-audio';

export default function Game() {
	
	let nameAdjectiveMonster = ["Ужасный", "Злобный", "Сопливый"];
	let whichMonster = ["Огр", "Гном", "Гоблин"];
	let nameMonster = ["Том", "Макс", "Дима"];

	let player = new Person("Крош", drawLife("player", 100));
	document.querySelector('#playerLife').style.width = `${player.score*2.5+'px'}`;

	let monster = new Person(String(nameAdjectiveMonster[getRandomArbitrary(0, 2)] + ' ' + whichMonster[getRandomArbitrary(0, 2)] + ' ' + nameMonster[getRandomArbitrary(0, 2)]), drawLife("monster", 100));
	document.querySelector('#monsterLife').style.width = `${monster.score*2.5+'px'}`;

	document.querySelector('#playerLife').title = player.score;
	document.querySelector('#monsterLife').title = monster.score;

	let boxScore = document.createElement('div');
	boxScore.innerHTML = player.score;
	document.querySelector('.aboutPlayer').appendChild(boxScore);

	boxScore = document.createElement('div');
	boxScore.innerHTML = monster.score;
	document.querySelector('.aboutMonster').appendChild(boxScore);
	
	console.log(player);
	console.log(monster);

	
	let playerField = document.querySelector('.aboutPlayer');
	let monsterField = document.querySelector('.aboutMonster');

	let magicChoice;
	
	playerField.firstElementChild.appendChild(createNode('span', {}, player.name));
	monsterField.firstElementChild.appendChild(createNode('span', {}, monster.name));

	loadFight();
	document.querySelector('.buttonStart').addEventListener('click', function() {
		dialog();
		document.querySelector('.spell').addEventListener('click', selectMagic, false);
	},false);

		
	function selectMagic(elem) {

		switch (elem.target.id) {
			case '1':
				showTask(1, player, monster);
				break;
			case '2':
			  showTaskTranslation(2, player, monster);
				break;  
			case '3' :
			  showTaskPicture(3, player, monster);
				break;
			case '4' :
				showTaskAudio(4, player, monster);
				break;
		}
			
		document.querySelector('.spell').removeEventListener('click', selectMagic);
    }
	
	
	function loadFight() {

		let mainField = document.querySelector('.field');
		console.log(mainField);
		
		let mainHero = document.createElement('div');
		mainHero.className = 'hero';
		buildPerson(mainHero, 1, 1, 1);

		let modalWindow = document.createElement('div');
		modalWindow.style.alignSelf = 'end';
		modalWindow.style.justifySelf = 'center';
		modalWindow.innerHTML = '<div class="modal-dialog"><p class=\"close\" onclick=\"closeScore()\">&#215;</p>\
		<p>Выберите заклинание:</p>\
		<div class=\"spell\">\
			<img id=\"1\" src=\"../Images/Atack.png\" alt=\"\">\
			<p>Магия воды</p>\
			<img id=\"2\" src=\"../Images/Lightning.png\" alt=\"\">\
			<p>Магия молнии</p>\
			<img id=\"3\" src=\"../Images/Health.png\" alt=\"\">\
			<p>Лечить себя</p>\
			<img id=\"4\" src=\"../Images/Question.png\" alt=\"\">\
			<p>Комбо атака</p>\
		</div>\
	</div>\
	<button class=\"buttonStart\" >Выберите магию</button>';
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

};
