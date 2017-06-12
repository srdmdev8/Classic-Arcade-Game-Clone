//Invoking strict mode for entire script.
function strict() {
    "use strict";
}

// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    //Randomly generates enemy speed.
    this.speed = Math.floor(Math.random() * 200);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 600) {
        this.x = -100;
    }
};

Enemy.prototype.reset = function() {
    this.speed = Math.floor(Math.random() * 200);
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

//This function handles player movement, collision detection, and when the player
//wins by reaching the water blocks by calling the necessary functions.
Player.prototype.update = function(dt) {
    this.handleInput();
    this.checkCollisions();
    this.win();
};

//This function draws the player image on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//This function handles the input by the user using the arrow keys.
Player.prototype.handleInput = function(move) {
    switch (move) {
        case 'left':
            if (this.x - 100 >= 0) {
                this.x -= 100;
            }
            break;

        case 'up':
            if (this.y - 75 >= -80) {
                this.y -= 80;
            }
            break;

        case 'right':
            if (this.x + 100 < 500) {
                this.x += 100;
            }
            break;

        case 'down':
            if (this.y + 75 <= 385) {
                this.y += 80;
            }
            break;
    }
};

//This function detects collisions with the player and the enemies(bugs) as well
//as tracks the lives the user has and game over when lives are depleted.
Player.prototype.checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.x + 50 >= allEnemies[i].x &&
            this.x < allEnemies[i].x + 60 &&
            this.y + 50 >= allEnemies[i].y &&
            this.y < allEnemies[i].y + 40) {
            this.resetPlayer();
            console.log("You got hit!");
            if (lives > 0) {
                lives -= 1;
                console.log("Lives " + lives);
                var livesUpdate = document.getElementById("lives");
                livesUpdate.textContent = livesIndicator.replace("%data%", lives);
            } else if (lives <= 0) {
                alert('You lost....\n\nGame Over!!');
                console.log("Game Over");
                this.resetGame();
            }
        }
    }
};


//This function resets the player's position
Player.prototype.resetPlayer = function() {
    this.x = 200;
    this.y = 385;
};

//This function resets the game. It resets the player, all enemies, player lives
//and score, and displays the modal so that the user can choose another character
//for the next game.
Player.prototype.resetGame = function() {
    this.resetPlayer();
    allEnemies.forEach(function(enemy) {
        enemy.reset();
        enemy.x = -300;
    });
    lives = 3;
    score = 0;
    var livesReset = document.getElementById("lives");
    livesReset.textContent = livesIndicator.replace("%data%", lives);
    var scoreReset = document.getElementById("score");
    scoreReset.textContent = scoreIndicator.replace("%data%", score);
    $('#charModal').modal('show');
};

//This function will alert the user that they have won when they reach the water
//blocks and then reset the user's position and update the score by calling the
//necessary functions. If the user reaches wins 10 times, they will be alerted that
//they have won the game and then the game will reset.
Player.prototype.win = function() {
    if (this.y <= -15) {
        alert("You reached the water!!");
        this.resetPlayer();
        score += 1;
        //player.score();
        console.log("You reached the water!!");
        console.log("Score: " + score);
        var scoreUpdate = document.getElementById("score");
        scoreUpdate.textContent = scoreIndicator.replace("%data%", score);
    }

    if (score >= 10) {
        alert("YOU WON!!!\n\nYOU BEAT THE BUGS!!!");
        this.resetGame();
    }
};

//Initialize player lives and display on the scoreboard.
var lives = 3,
    livesIndicator = "Lives: %data%",
    livesDisplay = document.getElementById("lives");
livesDisplay.textContent = livesIndicator.replace('%data%', lives);

//Initialize player score and display on the scoreboard.
var score = 0,
    scoreIndicator = "Score: %data%",
    scoreDisplay = document.getElementById("score");
scoreDisplay.textContent = scoreIndicator.replace("%data%", score);


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [],
    player = new Player(200, 385);

var bug = new Enemy(-100, 60),
    bug1 = new Enemy(-200, 145),
    bug2 = new Enemy(-400, 225),
    bug3 = new Enemy(-300, 225),
    bug4 = new Enemy(-600, 60);

allEnemies.push(bug, bug1, bug2, bug3, bug4);

// Get the modal
var modal = document.getElementById('charModal');

// When the window loads, open the modal
$(window).on('load', function() {
    $('#charModal').modal('show');
});

//event listeners to select specific sprite
$(document).on("click", "#boy", function() {
    player.sprite = "images/char-boy.png";
    $("#charModal").modal("hide");
});

$(document).on("click", "#cat", function() {
    player.sprite = "images/char-cat-girl.png";
    $("#charModal").modal("hide");
});

$(document).on("click", "#horn", function() {
    player.sprite = "images/char-horn-girl.png";
    $("#charModal").modal("hide");
});

$(document).on("click", "#pink", function() {
    player.sprite = "images/char-pink-girl.png";
    $("#charModal").modal("hide");
});

$(document).on("click", "#princess", function() {
    player.sprite = "images/char-princess-girl.png";
    $("#charModal").modal("hide");
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
