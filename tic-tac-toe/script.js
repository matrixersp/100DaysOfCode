const boxes = document.querySelectorAll('.box');
const typeBtns = document.querySelectorAll('.btn-type');
const symbolBtns = document.querySelectorAll('.btn-symbol');
const alert = document.getElementById('alert');
const message = document.getElementById('message');
const playAgain = document.getElementById('play-again');

// Global variables
const rows = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let player = [];
let enemy = [];
let isLocked = false;
let playerType;
let playerSymbol;
let enemyType;
let enemySymbol;
let whoseTurn;
let grid = []

typeBtns.forEach(btn => btn.addEventListener('click', setPlayerType));
symbolBtns.forEach(btn => btn.addEventListener('click', setPlayerSymbol));

function setPlayerType(e) {
  let type = e.target.getAttribute('data-player-type');
  
  if(type) {
    document.getElementById('player-type').style.display = 'none';
    playerType = type;
  }
  if(playerType === 'Human')
    boxes.forEach(box => box.addEventListener('click', playWithHuman));
  else 
    boxes.forEach(box => box.addEventListener('click', playWithCPU));
}

function setPlayerSymbol(e) {
  let symbol = e.target.getAttribute('data-player-symbol');
  if(symbol) {
    document.getElementById('player-symbol').style.display = 'none';
    if(symbol === 'X') {
      playerSymbol = symbol;
      enemySymbol = 'O';
    } else if(symbol === 'O') {
      playerSymbol = symbol;
      enemySymbol = 'X';
    }
    whoseTurn = playerSymbol;
  }
}

function playWithHuman(e) {
    const idx = parseInt(this.getAttribute('data-idx'));

    if(!grid.includes(idx) && !isLocked) {
      if(whoseTurn === playerSymbol) playHuman(this, idx, player, enemySymbol);
      else playHuman(this, idx, enemy, playerSymbol);
    }
}

function playWithCPU(e) {
  const idx = parseInt(this.getAttribute('data-idx'));

  if(!grid.includes(idx) && !isLocked) {
    playHuman(this, idx, player, enemySymbol);

    // Check if player is not blocking the way
    if(isLocked) return;
    let index;
    for(let i = 0; i < rows.length; i++) {
      if(
        !player.includes(rows[i][0])
        && !player.includes(rows[i][1])
        && !player.includes(rows[i][2])
      ) {
        if(!enemy.includes(rows[i][0]))
          index = rows[i][0];
        else if(!enemy.includes(rows[i][1]))
          index = rows[i][1];
        else if(!enemy.includes(rows[i][2]))
          index = rows[i][2];
        break;
      } else {
        for(let j = 0; j < grid.length; j++) {
          if(!grid.includes(j)) {
            index = j;
            break;
          }
        }
      }
    }
    setTimeout(() => playCPU(index), 200);
  }
}

function playCPU(index) {
  boxes[index].innerHTML = enemySymbol;
  enemy.push(index);
  grid.push(index);
  checkWinner(enemy, enemySymbol);
  whoseTurn = playerSymbol; 
}

function playHuman(target, idx, player, symbol) {
  target.innerHTML = whoseTurn;
  player.push(idx);
  grid.push(idx);
  checkWinner(player, whoseTurn);
  whoseTurn = symbol; 
}

function checkWinner(player, whosTurn) {
  if(grid.length === 9) {
    isLocked = true;
    message.innerText = "It's a tie!";
    setTimeout(() => {
      alert.style.display = 'initial';
    }, 300);
  }

  rows.forEach(el => {
    if(
      player.includes(el[0])
      && player.includes(el[1])
      && player.includes(el[2])
      ) {
      isLocked = true;
      message.innerText = whoseTurn + ' wins!';
      setTimeout(() => {
        alert.style.display = 'initial';
      }, 300);
    }
  })
}

playAgain.addEventListener('click', function(e) {
  player = [];
  enemy = [];
  grid = [];
  isLocked = false;
  alert.style.display = 'none';
  boxes.forEach(box => box.innerText = '');
  whoseTurn = playerSymbol;
});