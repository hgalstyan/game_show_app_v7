const overlay = document.getElementById('overlay');
const btnStart = document.getElementsByClassName('btn__reset')[0];
const btnLetter = document.getElementsByTagName('button');
const ulPhrase = document.getElementById('phrase').getElementsByTagName('ul')[0];
const letters = document.getElementsByClassName('letter');
const img = document.getElementsByTagName('img');

var missed = 0;
const phrases = ['Get the element',
			   'This function should randomly choose a',
			   'Keep in mind that you',
			   'and to use the function',
			   ' write this function so that it is reusable'];



function getRandomPhraseArray(arr) {
	const i = Math.floor(Math.random() * phrases.length);
	return arr[i];	
}

function addPhraseToDisplay(arr) {
	for (let i = 0; i < arr.length; i++) {
		var li = document.createElement('li');
		li.innerHTML = arr[i].toLowerCase();
		if(arr[i] !== ' ') {
			li.className = 'letter';			
		} else li.className = 'space';
		ulPhrase.appendChild(li);
	}

	console.log(ulPhrase);
}

function letterCheck(letter) {
	let check = 0;
	for (let i = 0; i < letters.length; i++) {
		if(letters[i].innerHTML === letter) {
			letters[i].className += " show";
			check++;
		} 
	}
	if (check > 0) return letter;
	else return null;
}

function checkWin() {
	const show = document.getElementsByClassName('show');
	const letter = document.getElementsByClassName('letter');
	let result;
	if(show.length === letter.length){
		result = 'win';
		decision(result);
	}
	else if(missed >= 5){
		result = 'lose';
		decision(result);
	}
}

function decision(result) {
		overlay.className = result;
		overlay.style.display = 'flex';
		overlay.children[0].innerHTML = 'You ' +result+'!';	
		btnStart.innerHTML = 'Restart game';
}

btnStart.addEventListener('click', (e)=>{
	overlay.style.display = 'none';
	restart();
});

for(let i = 0; i < btnLetter.length; i++ ){
	btnLetter[i].addEventListener('click', (e)=>{
		
		var btn = e.target.innerHTML;
		var letterFound = letterCheck(btn);
	
		btnLetter[i].className = 'chosen';
		btnLetter[i].disabled = true;
		
		if (letterFound === null && missed < 5) {
			img[4-missed].src ="images/lostHeart.png";
			missed++;
		}
		checkWin();
	});
}

function restart() {
	missed = 0;
	ulPhrase.innerHTML = '';
	for (let i = 0; i <img.length; i++) {
	 	img[i].src = "images/liveHeart.png";
	}
	for (let i = 0; i < btnLetter.length; i++) {
		btnLetter[i].classList.remove('chosen');
		btnLetter[i].disabled = false;
	}
	let phrase = getRandomPhraseArray(phrases);
	addPhraseToDisplay(phrase);
}