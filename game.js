const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

const player = {
  x: canvas.width/2 - 15,
  y: canvas.height - 30,
  width: 30,
  height: 30,
  velocity: 5,
  dx: 0,
}

function draw() {
  ctx.fillStyle = "#00f";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function movePlayer() {
  player.x += player.dx;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movePlayer();
  draw();
  requestAnimationFrame(animate);
}

window.addEventListener('keydown', (e) => {
  switch(e.key) {
    case 'ArrowLeft':
      player.dx = -player.velocity
      break;
    case 'ArrowRight':
      player.dx = player.velocity
      break;
  }
});

window.addEventListener('keyup', (e) => {
  switch(e.key) {
    case 'ArrowLeft':
      player.dx = 0
      break;
    case 'ArrowRight':
      player.dx = 0
      break;
  }
});

animate()