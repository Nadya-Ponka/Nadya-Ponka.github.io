export default function health() {
	//console.log(document.querySelector('.monsters-container .health'));
	document.querySelector('.player-container .magic').style.display = 'none';
	document.querySelector('.player-container .health').style.display = 'block';
	setTimeout(function() { 
		document.querySelector('.player-container .health').style.display = 'none';},
		//document.querySelector('.monsters-container .magic').style.display = 'block';
	2000);
}