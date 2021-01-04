var PLAY=1
var END=0
var gameState= PLAY
var cloudImg,gameOverImg,groundImg, restartImg, trex_walk, collidedImg, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5,obstacle6, trex,obstacle, obstacleGroup, cloud, cloudGroup, ground,invisibleGnd

var score=0

function preload()
{cloudImg=loadImage("cloud.png")
 gameOverImg=loadImage("gameOver.png")
 groundImg=loadImage("ground2.png")
 restartImg=loadImage("restart.png")
 trex_walk=loadAnimation("trex1.png", "trex3.png", "trex4.png")
 collidedImg=loadAnimation("trex_collided.png")
 obstacle1=loadImage("obstacle1.png")
 obstacle2=loadImage("obstacle2.png")
obstacle3=loadImage("obstacle3.png")
 obstacle4=loadImage("obstacle4.png")
 obstacle5=loadImage("obstacle5.png")
obstacle6=loadImage("obstacle6.png")
 jumpsound=loadSound("hello.m4a")
}
function setup()
{
  createCanvas(600,200)
  trex=createSprite(50,150)
  trex.addAnimation("walking", trex_walk)
  trex.addAnimation("stop",collidedImg)
  trex.scale=0.6
  ground=createSprite(300,180)
  ground.addImage("ground",groundImg)
  ground.velocityX=-5
  invisibleGround=createSprite(300,185,600,2)
  invisibleGround.visible=false
  obstacleGroup= new Group()
  cloudGroup = new Group()
}

function draw()
{  trex.collide(invisibleGround )
 

  background("purple")
  text("score-"+ score, 500,50)
        if (gameState===PLAY)
          {
            score=score+(Math.round(frameCount/10))
           
            if(keyDown("space")  && trex.y> 140 )
            {
            trex.velocityY=-10
                 
            }
            trex.velocityY=trex.velocityY+0.5 
            if (ground.x<0)
            {
            ground.x=ground.width/2
            }
            spawnClouds()
            spawnObstacles()
            if (trex.isTouching(obstacleGroup))
              {
              gameState=END
              }
          
  
   }
    
  else if (gameState===END)
    {
      trex.changeAnimation("stop",collidedImg)
      ground.velocityX=0
      obstacleGroup.setVelocityXEach(0);
      cloudGroup.setVelocityXEach(0)
      cloudGroup.setLifetimeEach(-1)
      obstacleGroup.setLifetimeEach(-1)
    }
      
      
      
  
  
  drawSprites();
    
  } 
function spawnClouds()
{rand= Math.round(random(0,100))
   console.log(frameCount)
  if (frameCount%60===0)
    {cloud=createSprite(600,rand,10,10)
    cloud.velocityX=-5
    cloud.addImage(cloudImg)
     cloud.scale=0.5 
     cloud.depth= trex.depth
  trex.depth= trex.depth+1    
     cloud.lifetime=120
     cloudGroup.add(cloud)
    }
}

function spawnObstacles()
{
  if (frameCount%50 === 0)
    {
      obstacle=createSprite(600,160,10,10)
      obstacle.velocityX=-5
      var rand=Math.round(random(1,6))
      switch(rand)
        {
          case 1: obstacle.addImage(obstacle1)
            break;
          case 2: obstacle.addImage(obstacle2)
            break;
           case 3: obstacle.addImage(obstacle3)
            break;
         case 4: obstacle.addImage(obstacle4)
            break;
          case 5: obstacle.addImage(obstacle5)
            break;
          case 6: obstacle.addImage(obstacle6)
            break;
            default: break;
            
        }
      obstacle.scale=0.5
      obstacle.lifetime=120
      obstacleGroup.add(obstacle)
    }
}
