// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y;
    this.xspeed=100+Math.random()*250;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x=this.x+dt*this.xspeed;
    if(this.x>505){
        this.x=-101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player=function(x,y) {
    this.x=x;
    this.y=y;
    this.playerimage = 'images/char-boy.png';
}

Player.prototype.update=function() {
    this.handleInput();
    if(this.y==0){
        setTimeout(reset,1000);
    }
}

Player.prototype.handleInput=function(keyword) {
    if((this.x==0 && keyword==='left')||(this.x==404 && keyword=='right')||(this.y==415 && keyword=='down')||(this.y==0 && keyword=='up')){
       //noop
    }
    else{
     switch(keyword)
     {
       case 'left': this.x=this.x-101;break;
       case 'right': this.x=this.x+101;break;
       case 'up': this.y=this.y-83;break;
       case 'down': this.y=this.y+83;break;
       default: this.x=this.x,this.y=this.y;         
     }
    }
}

Player.prototype.render=function() {
    ctx.drawImage(Resources.get(this.playerimage), this.x, this.y);
    if(this.y==0){
        ctx.font='100px serif';
        ctx.fillText('WIN',190,285);
    }
}

// if the player reach water ,score+1
Player.prototype.scoreNumber=function(keyword){
    if(this.y==0 && keyword=='up'){
        score+=1;
    }
}

//checkcollisions.
function checkCollisions() {
    allEnemies.forEach(function(enemy){
        if(player.x<=enemy.x+59 && player.x>=enemy.x-70 && player.y<=enemy.y+50 && player.y>=enemy.y-50){
            reset();
            score=score-1;
        }
    })
}

//let player go homeposition
function reset() {
    player.x=202;
    player.y=415;
}
    

// 
var score=0;
var scoreElement= document.getElementById('score')

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1=new Enemy(-101,144);
var enemy2=new Enemy(101,62);
var enemy3=new Enemy(50,228);
var enemy4=new Enemy(202,144);
var allEnemies=[enemy1,enemy2,enemy3,enemy4];
var player=new Player(202,415);


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
    player.scoreNumber(allowedKeys[e.keyCode]);
});