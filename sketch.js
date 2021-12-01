var PLAY = 1
var END = 0
var gameState = PLAY
var rocket;
var score=0;
var asteroid;
var bg;
var gameover;

function preload(){
rocketImg = loadImage("rockets_PNG.png")
bgImg = loadAnimation("new_bg.jpeg")
asteroidImg = loadImage("asteroid.png")
}

function setup() {
createCanvas (400, 400)

bg = createSprite(200, 200, 400, 400)
bg.addAnimation("bg", bgImg)
bg.y = 200

rocket = createSprite(20, 400, 20, 50)
rocket.addImage("rocket", rocketImg)
rocket.scale = 0.15
rocket.x = 50

rocket.setCollider("rectangle", 0, 0, 100, 300)
rocket.debug = false

edges = createEdgeSprites();
asteroidgroup=new Group()
}


function draw() {
 background(0)
 drawSprites();
 textSize(20)
 fill("magenta")
 text("Score = " + score, 250, 50)

 rocket.collide(edges[3])
 if(gameState === PLAY){
    bg.velocityY = -4
 if (bg.y <0){
    bg.y = bg.height/2;
  }

  if(keyDown("UP_ARROW"))
{
    rocket.y = rocket.y - 5
}

if(keyDown("RIGHT_ARROW"))
{
    rocket.x = rocket.x + 2
}

rocket.collide(edges[3])
  spawnAsteroids ()

  if(rocket.y<0){
      text("Rocket reached space Safely",50,170)
      text("YOU WON",100,200)
  }
 }
  if (asteroidgroup.isTouching(rocket)){
      
      gameState = END
      
  }
  else if(gameState === END) {
      asteroidgroup.setVelocityXEach(0);
      asteroidgroup.setVelocityYEach(0);
       rocket.velocityY=0
       rocket.velocityX=0
       bg.velocityY=0;
       asteroidgroup.setLifetimeEach(-1);
       text("Game Over",100,200)
 }


}

function spawnAsteroids () {
if(frameCount % 50 === 0) {
    asteroid = createSprite(200, 0, 40, 10)
    asteroid.addImage(asteroidImg)
    asteroid.x = Math.round(random(0, 400))
    asteroid.scale = 0.025
    asteroid.velocityX = -0.8;
    asteroid.velocityY = 3;
    asteroid.depth = rocket.depth
    rocket.depth = rocket.depth + 1
    asteroid.lifetime = 400
    asteroidgroup.add(asteroid)
}
}