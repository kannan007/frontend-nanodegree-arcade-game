// A global variable to avoid point issue
var pointproblem = true;
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 500) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.score = 0;
    this.points = 0;
};
Player.prototype.update = function(dt) {
    if (player.y <= 0) {
        this.score++;
        scoreboard();
        alert("You Won");
        this.reset();
    }
    this.collision();
};
Player.prototype.reset = function() {
    for (var i = 0; i < allgems.length; i++) {
        console.log("dude");
        allgems[i].showgem = true;
    }
    player.x = 200;
    player.y = 400;
};
Player.prototype.collision = function() {
    for (i = 0; i < allEnemies.length; i++) {
        if (player.x <= allEnemies[i].x + 50 && player.x >= allEnemies[i].x - 50) {
            if (player.y >= allEnemies[i].y - 50 && player.y <= allEnemies[i].y + 50) {
                this.score--;
                this.points = 0;
                scoreboard();
                pointsboard();
                this.reset();
            }
        }
    }
    for (i = 0; i < allgems.length; i++) {
        if ((player.x <= allgems[i].x + 45 && player.x >= allgems[i].x - 45) || (player.x == allgems[i].x)) {
            if ((player.y <= allgems[i].y + 45 && allgems[i].y >= allgems[i].y - 45) || (player.y == allgems[i].y)) {
                if (allgems[i].showgem) {
                    pointproblem = true;
                }
                allgems[i].showgem = false;
                if (pointproblem) {
                    this.points += 5;
                    console.log(pointproblem);
                    pointproblem = false;
                }
                pointsboard();
            }
        }
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(e) {
    switch (e) {
        case "left":
            this.x -= 50;
            if (this.x <= 0) {
                this.x = 0;
            }
            break;
        case "right":
            this.x += 50;
            if (this.x >= 425) {
                this.x = 420;
            }
            break;
        case "up":
            this.y -= 50;
            break;
        case "down":
            this.y += 50;
            if (this.y >= 401) {
                this.y = 400;
            }
            break;
    }
};
var Gem = function(x, y, gemsimage) {
    this.x = x;
    this.y = y;
    this.gemimage = gemsimage;
    this.showgem = true;
};
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.gemimage), this.x, this.y, 80, 80);
};
var scoreboard = function() {
    var displayscore = document.getElementById('score');
    displayscore.innerHTML = player.score;
};
var pointsboard = function() {
    var displaypoints = document.getElementById('point');
    displaypoints.innerHTML = player.points;
};

// Now instantiate your objects.
var firstenemy = new Enemy(1, 60, 50);
var secondenemy = new Enemy(1, 140, 120);
var thirdenemy = new Enemy(180, 60, 50);
// Place all enemy objects in an array called allEnemies
var allEnemies = [firstenemy, secondenemy, thirdenemy];
// Place the player object in a variable called player
var player = new Player();
var bluegem = new Gem(200, 200, 'images/Gem-Blue.png');
var greengem = new Gem(100, 120, 'images/Gem-Green.png');
var orangegem = new Gem(300, 120, 'images/Gem-Orange.png');
var allgems = [bluegem, greengem, orangegem];
scoreboard();
pointsboard();
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