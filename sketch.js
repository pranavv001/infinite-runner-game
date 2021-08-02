var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score = 0
var flag = 0

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
 // ghostImg = loadAnimation("ghost-standing.png","ghost-jumping.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  ghost = createSprite(300, 300,110,20)
  ghost.shapeColor = "black"
  //ghost.addAnimation("ghostrunning",ghostImg)
 // ghost.scale = 0.4
  climberGroup = new Group()
  doorsGroup = new Group()
  invisibleBlockGroup = new Group()
  spookySound.loop()
}

function draw() {
  background(200);
if (gameState === "play") {
  drawSprites()
  strokeWeight(3)
  fill("white")
  textSize(20)
  text("score:" + score, 50, 50)
  

  setTimeout(()=>(
    flag=0
  ),15000)
console.log(flag)

  if (keyDown("left")) {
    ghost.x -= 3
  }

  if(tower.y > 400){
      tower.y = 300
    }
  if (keyDown("left")) {
      ghost.x -= 5
    }

  if (keyDown("right")) {
      ghost.x += 5
    }
  if (keyDown("up")) {
    ghost.velocityY = -10
  }

  ghost.velocityY += 0.5


  if (ghost.y>600) {
    ghost.destroy()
    gameState = "end"
  }
  
  if (doorsGroup.isTouching(ghost) && flag===0) {
    flag=1
    score++
    //ghost.destroy()
    //gameState = "end"
  }
  spawnDoors()
  }
  else if (gameState === "end") {
    background("blue")
    strokeWeight(3)
    stroke("black")
    fill("white")
    textSize(50)
    text("GAME OVER",150,300)
  }
}

function spawnDoors() {
  if (frameCount % 240 === 0 ) {
    var door = createSprite(Math.round(random(100,400)),-10)
   // door.addImage(doorImg)
    door.velocityY = 2
    //var climber = createSprite(door.x,door.y+55)
    //climber.addImage(climberImg)
    //climber.velocityY = 2
    door.lifetime = 325
    door.scale = 0.5
    //climber.lifetime = 325
    doorsGroup.add(door)
    //climberGroup.add(climber)
    //ghost.depth = climber.depth + 1
    //var invisibleBlock = createSprite(climber.x,climber.y+9,climber.width,2)
    //invisibleBlock.velocityY = 2
    //invisibleBlock.debug = true
    //invisibleBlock.lifetime = 325
    //invisibleBlockGroup.add(invisibleBlock)
  }
}


