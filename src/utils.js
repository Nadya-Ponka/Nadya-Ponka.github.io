export function getRandomArbitrary(min, max) {
		return Math.round(Math.random() * (max - min) + min);
};

export function drawLife(personId, n) {
		document.querySelector(`#${personId}`).style.width = `${n*3+'px'}`;
		return n;
};