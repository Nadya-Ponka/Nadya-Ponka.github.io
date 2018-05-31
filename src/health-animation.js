export default function health(div3, div4) {
	//console.log(document.querySelector('.monsters-container .health'));
	document.querySelector(`${div3}`).style.display = 'none';
	document.querySelector(`${div4}`).style.display = 'block';
	
	setTimeout(function() { 
		document.querySelector(`${div4}`).style.display = 'none';},
		//document.querySelector('.monsters-container .magic').style.display = 'block';
	2000);
}