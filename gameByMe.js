/**
 * Initialisation du jeu
 * Définir les variables de base
 */
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scoreDisplay = document.querySelector('.score span');
let gameEnded = false; // Variable pour vérifier si le jeu est terminé (amélioration perso)

// Définir les dimensions du canvas
canvas.width = 800;
canvas.height = 600;

// Définir les éléments du jeu (joueur, balles, ennemis, score)
const player = {
    x: canvas.width / 2 - 15, // Centrer le joueur
    y: canvas.height - 30,
    width: 30,
    height: 30,
    velocity: 5, // Ajouter la vitesse du joueur
    dx: 0, // Initialiser dx pour le mouvement
    score: 0
};
const bullets = [];
const enemies = [];

/**
 * Créer les ennemis avec des boucles pour les placer en grille
 * @param {number} rows - Le nombre de lignes d'ennemis
 */
function createEnemies(rows) {
    const cols = Math.floor(canvas.width / 53); // Calculer le nombre de colonnes en fonction de la largeur du canvas
    const padding = 10; // Espace entre les ennemis et les bords du canvas
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            enemies.push({
                x: col * (53) + padding, // Ajouter de l'espace à gauche
                y: row * (50) + padding, // Ajouter de l'espace en haut
                width: 40,
                height: 40
            });
        }
    }
};

/**
 * Dessiner le joueur sur le canvas
 */
function drawPlayer() {
    ctx.fillStyle = "#00f";
    ctx.fillRect(player.x, player.y, player.width, player.height);
};

/**
 * Dessiner les balles sur le canvas
 */
function drawBullets() {
    ctx.fillStyle = "#f00";
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
};

/**
 * Fonction pour tirer une balle
 */
function shootBullet() {
    const bullet = {
        x: player.x + player.width / 2 - 2, // Centrer la balle par rapport au joueur
        y: player.y,
        width: 4,
        height: 10,
        velocity: 4 // Vitesse de la balle
    };
    bullets.push(bullet); // Ajouter la balle au tableau
};

/**
 * Dessiner les ennemis sur le canvas
 */
function drawEnemies() {
    ctx.fillStyle = "#0f0";
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
};

/**
 * Déplacer le joueur en fonction des touches pressées
 */
function movePlayer() {
    player.x += player.dx; // Mettre à jour la position du joueur
    // Empêcher le joueur de sortir du canvas
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
};

/**
 * Déplacer les balles vers le haut et les supprimer si elles sortent du canvas
 */
function moveBullets() {
    bullets.forEach((bullet, bulletIndex) => {
        bullet.y -= bullet.velocity; // Correction de 'bullet.speed' à 'bullet.velocity'
        if (bullet.y < 0) {
            bullets.splice(bulletIndex, 1);
        }
    });
};

/**
 * Détecter les collisions entre les balles et les ennemis
 */
function detectCollisions() {
    bullets.forEach((bullet, bulletIndex) => {
        enemies.forEach((enemy, enemyIndex) => {
            if (bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y) {
                // Supprimer la balle et l'ennemi
                bullets.splice(bulletIndex, 1);
                enemies.splice(enemyIndex, 1);
                player.score++; // Incrémenter le score
                scoreDisplay.textContent = player.score; // Afficher le score

                // Vérifier si tous les ennemis sont détruits
                if (enemies.length === 0 && !gameEnded) {
                    gameEnded = true; // Marquer le jeu comme terminé
                };
            };
        });
    });
};

/**
 * Effacer le canvas et mettre à jour l'affichage
 */
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBullets();
    drawEnemies();
    moveBullets();
    movePlayer();
    detectCollisions();
    requestAnimationFrame(update);
};

// Ajouter des écouteurs d'événements pour les touches de direction et la barre d'espace
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
            player.dx = -player.velocity;
            break;
        case 'ArrowRight':
            player.dx = player.velocity;
            break;
        case ' ':
            shootBullet();
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
            player.dx = 0;
            break;
    }
});

// Appeler la fonction update pour démarrer la boucle de jeu
createEnemies(5);
update();