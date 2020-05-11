const toggle = document.getElementById("toggle");
const start = document.getElementById("start");
const strict = document.getElementById("strict");
const display = document.getElementById('display');
const led = document.getElementById('led');
const audios = document.querySelectorAll('audio');
const quarters = document.querySelectorAll('.quarter');

let isOn = false;
let isStrict = false;
let hasStarted = false;
let isWaiting = false;
let counter = 0;
let sequence = [];
let timerIDs = [];
let timerID;
let error = false;
const MAX_SQUARES = 4;

toggle.addEventListener("change", function (e) {
  if(this.checked) {
    isOn = true;
    display.classList.add('isDisplay');
  }
  else {
    led.classList.remove('isStrict');
    display.classList.remove('isDisplay');
    reset();
  }
});

function reset() {
  sequence.length = 0;
  isStrict = false;
  hasStarted = false;
  isOn = false;
  timerIDs.forEach(timer => clearTimeout(timer));
  clearTimeout(timerID);
  display.innerText = '--';
}

strict.addEventListener("click", function (e) {
  if(!isStrict && isOn) {
    led.classList.add('isStrict');
    isStrict = true;
  } else if(isStrict) {
    led.classList.remove('isStrict');
    isStrict = false;
  }
});

start.addEventListener('click', init);

function init() {
  if(hasStarted) return;
  hasStarted = true;
  nextRound();
}

function nextRound() {
  if(!error || isStrict) addToSequence();
  display.innerText = String(sequence.length).padStart(2, '0');
  playSequence();
}

function addToSequence() {
  let next = Math.round(Math.random() * (MAX_SQUARES - 1));
  sequence.push(next);
}

function playSequence() {
  for(let i = 0; i < sequence.length; i++) {
    timerIDs[i] = setTimeout(() => {
      play(sequence[i])
      if(i === sequence.length - 1) waitForClicks();
    }, i * 1000)
  }
}

function play(squareIndex) {
  audios[squareIndex].play();
  if(squareIndex < MAX_SQUARES) {
    lightOn(squareIndex);
    lightOff(squareIndex);
  }
}

function waitForClicks() {
  isWaiting = true;
  clearTimeout(timerID);
  timerID = setTimeout(() => {
    if(isWaiting) {
      play(MAX_SQUARES);
      startOver();
    }
  }, 2500);
}

function startOver() {
  display.innerText = '!!';
  if(isStrict) sequence.length = 0;
  error = true;
  counter = 0;
  clearTimeout(timerID);
  setTimeout(nextRound, 2500);
}

quarters.forEach((quarter, index) => {
  quarter.addEventListener('mousedown', function() {
    if(!hasStarted) return;
    if(index !== sequence[counter]) {
      play(MAX_SQUARES);
      startOver();
      return;
    }

    counter++;
    audios[index].play();
    isWaiting = false;
    error = false;

    if(counter < sequence.length) waitForClicks();
    if(counter === sequence.length) counter = 0;
    if(isOn && !isWaiting) setTimeout(nextRound, 2500);
  });
});

function lightOn(squareIndex) {
  quarters[squareIndex].classList.add(`quarter--active-${squareIndex}`);
}

function lightOff(squareIndex) {
  setTimeout(() => {
    quarters[squareIndex].classList.remove(`quarter--active-${squareIndex}`);
  }, 500)
}