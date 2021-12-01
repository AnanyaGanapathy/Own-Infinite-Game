var PLAY = 1
var END = 0
var gameState = PLAY
var rocket;
var score=0;
var asteroid;
var bg;
var gameover;

function preload(){
rocketImg = loadImage("rocket.png")
bgImg = loadAnimation("bg.png")
asteroidImg = loadImage("asteroid.png")
}

function setup() {
createCanvas (400, 400)

bg = createSprite(200, 200, 400, 400)
bg.addAnimation("bg", bgImg)
bg.y = 200

rocket = createSprite(20, 250, 20, 50)
rocket.addImage("rocket", rocketImg)
rocket.scale = 0.15
rocket.x = 50
restart = createSprite(200, 200, 20, 10)

rocket.setCollider("circle", 0, 0, 40)
rocket.debug = true

edges = createEdgeSprites();
asteroidgroup=new Group()
}


function draw() {
 background(0)
 drawSprites();
 fill("magenta")
 textSize(20)
 text("Score = " + score, 250, 50)

 rocket.collide(edges[3])
 if(gameState === PLAY){
    bg.velocityY = -4
 if (bg.y <0){
    bg.y = bg.height/2;
  }

  if(keyDown("UP_ARROW"))
{
    rocket.velocityX = 2
    rocket.velocityY = -5
}
//rocket.velocityY = rocket.velocityY + 0.5
rocket.collide(edges[3])
  spawnAsteroids ()

  if(rocket.y<0){
      text("Rocket reached space Safely",50,170)
      text("YOU OWN",100,200)
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