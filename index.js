const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvasSizes); //para que dibuje el canvas recien cuando termina de cargar el html
window.addEventListener('resize', setCanvasSizes); // cada vez que se hace resize los elementos del canvas se borran

let canvasSize;
let elementSize;

function setCanvasSizes() {
  // entire board
  if (window.innerWidth < window.innerHeight) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  // board element
  elementSize = canvasSize * 0.1;

  startGame();
}

function startGame() {
  game.font = elementSize + 'px Verdana'; //necesita tanto el px como la fuente
  game.textAlign = 'end'; // el vertice final se va a ubicar en la posicion dada

  const map = maps[1];
  const mapRow = map.trim().split('\n');
  const mapColsInRow = mapRow.map((x) => x.trim().split(''));

  mapColsInRow.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      const emoji = emojis[col];
      const xPosition = elementSize * (colIndex + 1);
      const yPosition = elementSize * (rowIndex + 1);
      game.fillText(emoji, xPosition, yPosition);
    });
  });
}
