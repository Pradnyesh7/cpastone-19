var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");



}

function spawnDoor(){
if(frameCount%240 === 0){
  door = createSprite(200,-50)
  door.addImage(doorImg)
  door.x = Math.round(random(120,400))
  door.velocityY = 1
  door.lifetime = 750
  doorsGroup.add(door)


  climber = createSprite(200,10)
  climber.addImage(climberImg)
  climber.x = door.x
  climber.velocityY = 1
  climber.lifetime = 750
  climbersGroup.add(climber)

  invisibleBlock = createSprite(200,15)
  invisibleBlock.addImage(climberImg)
  invisibleBlock.x = door.x
  invisibleBlock.width = climber.width;
  invisibleBlock.velocityY = 1
  invisibleBlock.lifetime = 750
  invisibleBlock.debug = true


  invisibleBlockGroup.add(invisibleBlock)


  


  ghost.depth = door.depth 
  ghost.depth = ghost.depth + 1

}







}


function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 2;

 //spookySound.loop()

  ghost = createSprite(200,200,50,50)
  ghost.addImage(ghostImg)
  ghost.scale = 0.3



invisibleBlockGroup = createGroup()
doorsGroup = createGroup()
climbersGroup = createGroup()

  
}

function draw() {
  background(200);

  if(gameState==="play"){
    
    if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("d")){
    ghost.x = ghost.x + 5
  }
  if(keyDown("a")){
    ghost.x = ghost.x - 5
  }
  if(keyDown("space")){
    ghost.velocityY = -12
  }
  ghost.velocityY = ghost.velocityY + 0.9

  spawnDoor()
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0


  }
    drawSprites()
   
  if(ghost.y>600 || invisibleBlockGroup.isTouching(ghost)){
    ghost.destroy()
    gameState = "end"
  }




  }

  if (gameState==="end"){
  stroke("yellow")
  fill("yellow")
  textSize(30)
  text("Game Over",230,250)



 }


  
 
}
