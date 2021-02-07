var PLAY=1;
var END=0;
var gameState=1;

var path,boy,cash,diamond,jwellery,sword;
var pathImg,boyImg,cashImg,diamondImg,jwelleryImg,swordImg;
var treasureCollection=0;
var cashG,diamondG,jwelleryG,swordG;

function preload(){
  pathImg=loadImage("Road.png");
  boyImg=loadAnimation("runner1.png","runner2.png");
  cashImg=loadImage("cash.png");
  diamondImg=loadImage("diamonds.png");
  jwelleryImg=loadImage("jwell.png");
  swordImg=loadImage("sword.png");
  endImg=loadAnimation("gameOver.png");
}


function setup() {
  createCanvas(400, 600);
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY=4;
  
  boy=createSprite(70,580,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
  
  cashG=new Group();
  diamondG=new Group();
  jwelleryG=new Group();
  swordG=new Group();
}

function draw() {
  if(gameState===PLAY){
    background(0);
    boy.x=World.mouseX;
    edges=createEdgeSprites();
    boy.collide(edges);
    if(path.y>400){
      path.y=height/2;
    }
    createCash();
    createDiamond();
    createJwellery();
    createSword();
    if(cashG.isTouching(boy)){
      cashG.destroyEach()
      treasureCollection=treasureCollection+50;
    }else if(diamondG.isTouching(boy)){
      diamondG.destroyEach()
      treasureCollection=treasureCollection+200;
    }else if(jwelleryG.isTouching(boy)){
      jwelleryG.destroyEach()
      treasureCollection=treasureCollection+100;
    }else{
      if(swordG.isTouching(boy)){
        gameState=END;
        
        boy.addAnimation("SahilRunning",endImg);
        boy.x=200;
        boy.y=300;
        boy.scale=0.6;
        
        cashG.destroyEach();
        diamondG.destroyEach();
        jwelleryG.destroyEach();
        swordG.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
         swordG.setVelocityYEach(0);


      }
    }
    drawSprites();
    textSize(20);
    fill(255);
    text("Treasure: "+treasureCollection,150,30);
    
  }
  
  
}
function createCash(){
  if(World.frameCount%200==0){
    var cash=createSprite(Math.round(random(50,350),40,10,10));
    cash.addImage(cashImg);
    cash.scale=0.12;
    cash.velocityY=3;
    cash.lifetime=150;
    cashG.add(cash)
  }
}
function createDiamond(){
  if(World.frameCount%320==0){
    var diamonds=createSprite(Math.round(random(50,350),40,10,10));
    diamonds.addImage(diamondImg);
    diamonds.scale=0.03;
    diamonds.velocityY=3;
    diamonds.lifetime=150;
    diamondG.add(diamonds)
  }
}
function createJwellery(){
  if(World.frameCount%410==0){
    var jwellery=createSprite(Math.round(random(50,350),40,10,10));
     jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
    jwellery.velocityY=3;
    jwellery.lifetime=150;
    jwelleryG.add(jwellery)
  }
}
function createSword(){
  if(World.frameCount%530==0){
    var sword=createSprite(Math.round(random(50,350),40,10,10));
     sword.addImage(swordImg);
  sword.scale=0.1;
    sword.velocityY=3;
    sword.lifetime=150;
    swordG.add(sword)
  }
}