const boxes = document.querySelectorAll('.box');
const buttons = document.querySelectorAll('.btn');
const alert = document.getElementById('alert');
const message = document.getElementById('message');
const reset = document.getElementById('reset');

// Global variables
const win = [
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
let gameOver = false;
let playerType;
let playerSymbol;
let enemyType;
let enemySymbol;
let whoseTurn;
let grid = []

buttons.forEach(btn => btn.addEventListener('click', init));
function init(btn) {
  let symbol = this.getAttribute('data-player-symbol');
  let type = this.getAttribute('data-player-type');
  
  if(type) {
    document.getElementById('player-type').style.display = 'none';
    playerType = type;
  }

  if(symbol) {
    document.getElementById('player-symbol').style.display = 'none';
    if(symbol === 'X') {
      playerSymbol = symbol;
      enemySymbol = 'O';
    } else {
      playerSymbol = symbol;
      enemySymbol = 'X';
    }
    whoseTurn = playerSymbol;
  }
}

boxes.forEach(box => {
  box.addEventListener('click', function(e) {
    const idx = parseInt(this.getAttribute('data-idx'));

    if(!grid.includes(idx) && !isLocked) {
      if(whoseTurn ==="X") {
        this.innerHTML = 'X';
        player.push(idx);
        grid.push(idx);
        checkWinner(player, whoseTurn);
        whoseTurn = "O"
      } else {
        this.innerHTML = 'O';
        enemy.push(idx);
        grid.push(idx);
        checkWinner(enemy, whoseTurn);
        whoseTurn = "X"
      }
    }
  });
});

function checkWinner(player, whosTurn) {
  if(grid.length === 9) {
    isLocked = true;
    alert.style.display = 'initial';
    message.innerText = "It's a tie!";
  }

  win.forEach(el => {
    if(
      player.includes(el[0])
      && player.includes(el[1])
      && player.includes(el[2])
      ) {
      isLocked = true;
      alert.style.display = 'initial';
      message.innerText = whoseTurn + ' wins!';
    }
  })
}

reset.addEventListener('click', function(e) {
  player = [];
  enemy = [];
  grid = [];
  isLocked = false;
  alert.style.display = 'none';
  boxes.forEach(box => box.innerText = '');
});