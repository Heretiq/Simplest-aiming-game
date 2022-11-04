const startBtn=document.querySelector('#start-btn');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const difficultyList = document.querySelector('#difficulty');
const timeTable = document.querySelector('#time-table');
const board = document.querySelector('.board');
let difficulty='';
let timeSelected = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
	event.preventDefault();
	screens[0].classList.add('up');
	console.log(event.target);
	console.log('start button pressed'); 
});
timeList.addEventListener('click', (event)=>{
	if (event.target.classList.contains('time-btn')){
		screens[1].classList.add('up');
		timeSelected = parseInt(event.target.getAttribute('time-data')); 
	}
});
difficultyList.addEventListener('click', (event)=>{
	if (event.target.classList.contains('difficulty-btn')){
		difficulty = event.target.innerHTML; 
		screens[2].classList.add('up');
		startGame();
	}
});
board.addEventListener('click', (event) =>{
	if (event.target.classList.contains('circle')){
		score++;
		event.target.remove();
		createRandomCircle();
	}
});

function startGame(){
	setInterval(lapseTime, 1000);
	createRandomCircle();
}
function lapseTime(){
	if (timeSelected < 0) finishGame();
	else{
		let current = timeSelected--;
		if (current<10) current =  `0${current}`;
		timeTable.innerHTML=`00:${current}`;
	}
}

function finishGame(){
	board.innerHTML = `<h1>Your score: <span class="primary">${score}</span></h1>`;
	timeTable.parentNode.classList.add('hide');
}
function createRandomCircle(){
	const circle = document.createElement('div');
	let size;
	switch(difficulty){
		case 'Easy': 	size = getRandomNumber(21, 30); break;
		case 'Normal': 	size = getRandomNumber(11, 20); break;
		case 'Hard': 	size = getRandomNumber(5, 10); break;
	}
	 
	const {width, height} = board.getBoundingClientRect();
	const x = getRandomNumber(0, width - size);
	const y = getRandomNumber(0, height - size);
	
	circle.classList.add('circle');
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	circle.style.backgroundColor = `rgb(${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)}, ${getRandomNumber(0, 255)})`;
	board.append(circle);
}
 
function getRandomNumber(min, max){
	return Math.round(Math.random() * (max - min) + min);
} 