var trex,trexCorrendo,trexColide;
var bordas;
var solo,imagemSolo,soloInvisivel
var nuvem,imagemNuvem;
var cacto,cactoImage1,cactoImage2,cactoImage3,cactoImage4,cactoImage5,cactoImage6
var pontos = 0
var play = 1
var end = 0
var estadoDeJogo = play
var nuvemGp,cactoGp
var gameOver, gameOverImg
var restart, restartImg
var pulo, hip, checkpoint
var recorde=0
function preload(){
 trexCorrendo = loadAnimation("trex1.png","trex2.png","trex3.png")
 imagemSolo = loadImage("ground2.png")
 imagemNuvem = loadImage("cloud.png")
 cactoImage1 = loadImage("obstacle1.png")
 cactoImage2 = loadImage("obstacle2.png")
 cactoImage3 = loadImage("obstacle3.png")
 cactoImage4 = loadImage("obstacle4.png")
 cactoImage5 = loadImage("obstacle5.png")
 cactoImage6 = loadImage("obstacle6.png") 
 trexColide=loadAnimation("trex_collided.png")
 gameOverImg = loadImage("gameOver.png")
 restartImg = loadImage("restart.png")
 pulo = loadSound("jump.mp3")
 hip = loadSound("die.mp3")
 checkpoint = loadSound("checkpoint.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight);
 trex = createSprite(50,height-30,20,50);
 trex.addAnimation("correndo",trexCorrendo);
 trex.scale = 0.5
 trex.addAnimation("colide",trexColide)
 trex.debug = false

gameOver = createSprite(width/2,heigth-120,100,10)
gameOver.addImage(gameOverImg)
gameOver.scale = 0.5
gameOver.visible = false   


restart = createSprite(width/2,heigth-90,100,10)
restart.addImage(restartImg)
restart.scale = 0.5
restart.visible = false






 //Opções de Raio Colisor//
 
 trex.setCollider("rectangle",0,0,50,50,60)
 //trex.setCollider("circle",0,0,30) 
  //criando o trex
 bordas = createEdgeSprites () 
 solo = createSprite(width/2,height-30,width,2); 
 solo.addImage("solo",imagemSolo)
 soloInvisivel = createSprite(width/2,height-20,width,2);
 soloInvisivel.visible = false
 nuvemGp = new Group ()
 cactoGp = new Group ()

}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
 if (trex.isTouching(cactoGp)) {
  estadoDeJogo = end
 // hip.play() 
 }
 if (estadoDeJogo == play) {
  pontos += Math.round(getFrameRate()/60) 
  if (pontos%100===0 && pontos>0) {
 checkpoint.play()   
  }
   //pular quando tecla de espaço for pressionada
 if (touches.length>0||keyDown("space")&& trex.y>height-46){
  trex.velocityY =-10
  pulo.play() 
  touches=[] 
  }
 //console.log(trex.y)
 solo.velocityX =-(15+pontos/100) 
 //registrando a posição y do trex
 if (solo.x <400){
 solo.x = solo.width/2;
 }
 createCactos()
 createNuvem();
 }

 if (estadoDeJogo == end) {
  trex.changeAnimation("colide",trexColide)
  solo.velocityX = 0
  nuvemGp.setVelocityXEach(0)
  cactoGp.setVelocityXEach(0)
  nuvemGp.setLifetimeEach(-1)
  cactoGp.setLifetimeEach(-1)   
  gameOver.visible = true
  restart.visible = true
  if (recorde<pontos) {
   recorde=pontos 
  }
 if (mousePressedOver(restart)) {
   estadoDeJogo = play;
   gameOver.visible = false
   restart.visible = false 
   cactoGp.destroyEach()
   nuvemGp.destroyEach()
  trex.changeAnimation("correndo",trexCorrendo)
  pontos=0

 }

}
  
  
gravidade();

trex.collide(soloInvisivel);

fill  ("black")
textSize(18)
textAlign(CENTER,TOP)

text("Pontos "+pontos,width-74,height-180)
text("Recorde "+recorde,width-545,height-180)


text("X: "+mouseX+" / Y: "+mouseY,mouseX,mouseY);

  drawSprites();
}
function gravidade() {
  trex.velocityY = trex.velocityY +0.5;
}
function createNuvem() {
  if (frameCount%80==0) {
 nuvem = createSprite(width,random(height-180,heigth-110),10,40)
 nuvem.velocityX =-(6+pontos/100) 
 nuvem.addImage(imagemNuvem)
 nuvem.scale = random(0.7,1.6)
 nuvem.depth = trex.depth -1
 nuvem.lifetime=210 
 nuvemGp.add(nuvem)
  }
  
}
function createCactos() {
  if (frameCount%80==0) {
 cacto = createSprite(width,height-40,10,40)
 cacto.velocityX =-(8+pontos/100) 
 cacto.scale = 0.5
 cacto.depth = trex.depth 
 cacto.lifetime=210 
 cactoGp.add(cacto)
 var sorteio = Math.round(random(1,6))
 switch (sorteio) {
   case 1:cacto.addImage(cactoImage1)  
     break;
     case 2:cacto.addImage(cactoImage2)  
     break;
     case 3:cacto.addImage(cactoImage3)  
     break;
     case 4:cacto.addImage(cactoImage4)  
     break;
    case 5:cacto.addImage(cactoImage5)
    break;
     case 6:cacto.addImage(cactoImage6)
     break;
 } 
  }
  
}