var Play = 1 
var END = 0
var gameState = Play

var trex ,trex_running;
function preload(){
  trex_running = loadAnimation("trex_1.png","trex_2.png","trex_3.png");
groundImage = loadImage("ground.png");
cloudImage = loadImage("cloud.png")
obstacle1 = loadImage("obstacle1.png")
obstacle2 = loadImage("obstacle2.png")
obstacle3 = loadImage("obstacle3.png")
obstacle4 = loadImage("obstacle4.png")
game1 =loadImage("gameOver.png")
rs =loadImage("restart.png")
sound1 =loadSound("jump.wav")
bg =loadImage("backgroundImg.png")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  trex =createSprite(80,30,20,10);
  trex.addAnimation("running",trex_running);
  ground =createSprite(200,700,width,30);
  restart =createSprite(width/2,height/2,1,1)
  ground.addImage("ground",groundImage);
trex.scale =0.1;
trex.x =50;
  //create a trex sprite
ground.velocityX =-4;
obstacleGroup = createGroup();
game=createSprite(width/2,height/2,20,20)
game.addImage("gameOver",game1)
restart.addImage("restart",rs)
restart.scale =0.1
}

function draw(){
  background(bg);
  if(gameState===Play){
    game.visible = false;
    restart.visible = false;
  if(touches.length>0 || keyDown("space")&& trex.y>=166){
   // console.log(trex.Y)
    trex.velocityY =-5
    touches =[];
    sound1.play()
  }
trex.velocityY = trex.velocityY+0.2;
trex.collide(ground);
if(ground.x<0){
  ground.x = 200;
}
spawncloud();
createObstacle();
if(obstacleGroup.isTouching(trex)){
  gameState = END
  
}
  }
else if(gameState===END){
  ground.velocityX = 0
trex.velocity = 0
obstacleGroup.setVelocityXEach(0)
game.visible =true
restart.visible =true

if(mousePressedOver(restart)){
  reset()
}
}

drawSprites()
}

function spawncloud(){
//console.log(frameCount)
if(frameCount % 60 === 0){
  cloud = createSprite(400,10,40,10)
cloud.addImage(cloudImage)
cloud.y = Math.round(random(10,60))
cloud.scale =0.4
cloud.velocityX= -4
cloud.lifetime = 150
}
}

function createObstacle(){
  //console.log(frameCount)
if(frameCount % 60 === 0 ){
obstacle = createSprite(400,600,40,10)
//obstacle.addImage(obstacle)
//obstacle.x = Math.round(random(200,350))
obstacle.scale =0.4
obstacle.velocityX = -4
obstacle.lifetime = 150
obstacleGroup.add(obstacle)
var rn = Math.round(random(1,4))
switch(rn){
  case 1: obstacle.addImage(obstacle1)
  break;
  case 2: obstacle.addImage(obstacle2)
  break;
  case 3: obstacle.addImage(obstacle3)
  break;
  case 4: obstacle.addImage(obstacle4)
  default:break;
}
}
}

function reset(){
  gamestate=Play
  restart.visible=false
gameover.visible =false
obstacleGroup.destroyEach()
}
