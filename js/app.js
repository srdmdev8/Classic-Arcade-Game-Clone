// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;

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
    var distance = 100 * dt;
    Enemy += distance;
    if (bug.x < 550) {
      bug.x++;
    }
    else {
      bug.x = -100;
    }

    if (bug1.x < 1500){
      bug1.x += 2;
    }
    else {
      bug1.x = -200;
    }

    if (bug2.x <700) {
      bug2.x += 1.8;
    }
    else {
      bug2.x = -100;
    }

    if (bug3.x < 650) {
      bug3.x++;
    }
    else {
      bug3.x = -100;
    }

    if (bug4.x < 600) {
      bug4.x += 1.5;
    }
    else {
      bug4.x = -600;
    }

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

Player.prototype.update = function(dt) {
    player.handleInput();
    player.collision();

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(move) {
    switch (move) {
      case 'left': if (this.x - 100 >= 0) {
        this.x -= 100;
      }
      break;

      case 'up': if (this.y - 75 >= -80) {
        this.y -= 80;
      }
      break;

      case 'right': if (this.x + 100 < 500) {
        this.x += 100;
      }
      break;

      case 'down': if (this.y + 75 <= 385) {
        this.y += 80;
      }
      break;
    }
    console.log(move);
};

Player.prototype.collision = function() {
  for (var i = 0; i < allEnemies.length; i++) {
      if (this.x + 50 >= allEnemies[i].x &&
          this.x < allEnemies[i].x + 60 &&
          this.y + 50 >= allEnemies[i].y &&
          this.y < allEnemies[i].y + 40) {
                player.reset();
                console.log("You got hit!");
        }
    }
};

Player.prototype.reset = function() {
  this.x = 200;
  this.y = 385;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [],
    player = new Player(200, 385);

var bug = new Enemy(-100, 60);
    bug1 = new Enemy(-200, 145);
    bug2 = new Enemy(-400, 225);
    bug3 = new Enemy(-300, 225);
    bug4 = new Enemy(-600, 60);

allEnemies.push(bug, bug1, bug2, bug3, bug4);

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
