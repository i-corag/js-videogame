const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');

window.addEventListener('load', setCanvasSizes); //para que dibuje el canvas recien cuando termina de cargar el html
window.addEventListener('resize', setCanvasSizes); // cada vez que se hace resize los elementos del canvas se borran

let canvasSize;
let elementSize;

const playerPosition = {
  x: undefined,
  y: undefined,
};

function setCanvasSizes() {
  // entire board
  if (window.innerWidth < window.innerHeight) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  console.log('canvas size', canvasSize);
  // board element
  elementSize = canvasSize * 0.1;

  console.log('element sizes', elementSize);
  startGame();
}

function startGame() {
  game.font = elementSize + 'px Verdana'; //necesita tanto el px como la fuente
  game.textAlign = 'end'; // el vertice final se va a ubicar en la posicion dada

  const map = maps[0];
  const mapRow = map.trim().split('\n');
  const mapColsInRow = mapRow.map((x) => x.trim().split(''));

  game.clearRect(0, 0, canvasSize, canvasSize);

  mapColsInRow.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const xPosition = elementSize * (colIndex + 1);
      const yPosition = elementSize * (rowIndex + 1);

      if (col === 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = xPosition / elementSize;
          playerPosition.y = yPosition / elementSize;
        }
      }

      game.fillText(emoji, xPosition, yPosition);
    });
  });

  movePlayer();
}

function movePlayer() {
  game.fillText(
    emojis['PLAYER'],
    playerPosition.x * elementSize,
    playerPosition.y * elementSize
  );
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

function moveByKeys(event) {
  if (event.key == 'ArrowUp') moveUp();
  if (event.key == 'ArrowDown') moveDown();
  if (event.key == 'ArrowLeft') moveLeft();
  if (event.key == 'ArrowRight') moveRight();
}

function moveUp() {
  console.log('moving UP');
  if (playerPosition.y > 1) {
    playerPosition.y -= 1;
  }
  startGame();
}

function moveDown() {
  console.log('moving DOWN');
  if (playerPosition.y < 10) {
    playerPosition.y += 1;
  }
  startGame();
}

function moveLeft() {
  console.log('moving LEFT');
  if (playerPosition.x > 1) {
    playerPosition.x -= 1;
  }
  startGame();
}

function moveRight() {
  console.log('moving RIGHT');
  if (playerPosition.x < 10) {
    playerPosition.x += 1;
  }
  startGame();
}
