var trex,trexCorrendo;
var bordas;
var solo,imagemSolo,soloInvisivel
var nuvem,imagemNuvem;
function preload(){
 trexCorrendo = loadAnimation("trex1.png","trex3.png","trex4.png")
 imagemSolo = loadImage("ground2.png") 
}

function setup(){
  createCanvas(600,200);
 trex = createSprite(50,170,20,50);
 trex.addAnimation("correndo",trexCorrendo);
 trex.scale = 0.5 
  //criando o trex
 bordas = createEdgeSprites () 
 solo = createSprite(300,170,600,2); 
 solo.addImage("solo",imagemSolo)
 soloInvisivel = createSprite(300,180,600,2);
 soloInvisivel.visible = false
}


function draw(){
  //definir a cor do plano de fundo 
  background("#2d3133");
 //console.log(trex.y)
 solo.velocityX =-12 
  //registrando a posição y do trex
 if (solo.x <0){
   solo.x = solo.width/2;
 } 
  //pular quando tecla de espaço for pressionada
 if (keyDown("space")&& trex.y>154){
 trex.velocityY =-12  
 } 
gravidade();


trex.collide(soloInvisivel);





  drawSprites();
}
function gravidade() {
  trex.velocityY = trex.velocityY +0.5;
}