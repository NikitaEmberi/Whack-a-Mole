const holes=document.querySelectorAll('.hole');
const scoreBoard=document.querySelector('.score');
const moles=document.querySelectorAll('.mole');
const countdownBoard=document.querySelector('.countdown');
const startButton = document.querySelector('.startButton');

let lastHole;
let timeUp=false;
let timeLimit=20000;
let score=0;
let countdown;

function pickRandomHole(holes){
    const randomHole=Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if(hole === lastHole){
        return pickRandomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function popOut(){
    const time=Math.random()*1300 + 400; //between 400 and 1700
    const hole = pickRandomHole(holes);
    //pick random hole div element and class to it
    hole.classList.add('up');
    setTimeout(function(){//settimeout after how many secs cllback function should run
        hole.classList.remove('up');
        if(!timeUp){
            popOut();
        }
    },time);
}

function startGame(){
    countdown=timeLimit/1000;
    scoreBoard.textContent=0;
    scoreBoard.style.display='block';
    countdown.textContent=countdown;
    timeUp=false;
    score=0;
    popOut();
    setTimeout(function(){//setTimeOut: how often the callback function should run
        timeUp=true;
    },timeLimit);

    let startCountdown = setInterval(function(){
        countdown -=1;
        countdownBoard.textContent=countdown;
        if(countdown<0){
            countdown=0;
            clearInterval(startCountdown); // you need to pass the interval in clearInterval u want to clear
            countdownBoard.textContent="Time's Up! Thank you for protecting our planet! This is the way!";
        }
    },1000)
}

startButton.addEventListener('click',startGame);

function whack(e){
    score++;
    this.style.backgroundImage= 'url("yoda2.png")';
    this.style.pointerEvents='none';
    setTimeout(() => {
        this.style.backgroundImage= 'url("yoda1.png")';
        this.style.pointerEvents='all';
    },800);
    scoreBoard.textContent=score;
}

moles.forEach(mole => mole.addEventListener('click',whack));


/*bind: bind a reference and force to js what this keyword stand for but in es6 arrow
function automatically binds the reference no need to call bind() if u do with arrow function*/ 