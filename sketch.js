const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];


function preload() {
  backgroundImg = loadImage("./assets/background.jpg");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
}

function setup() {
  canvas = createCanvas(windowWidth-20, windowHeight-20);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(190, height-170, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(playerBase.position.x +50, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player)

  playerArcher = new PlayerArcher(playerBase.position.x + 130, playerBase.position.y - 100, 90, 100);
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)

  playerArcher.display();

    for (var i= 0; i < playerArrows.length; i++) {
      showArrows(playerArrows[i]);
    }


   // Title
   fill("#FFFF");
   textFont("Courier New")
   textAlign("center");
   textSize(100);
   text("EPIC ARCHERY", width / 2, 100)

}


function keyReleased() {
  if (keyCode === 32) {
      playerArrows[playerArrows.length - 1].shoot(playerArcher.body.angle);
  }
}

function keyPressed() {
  if (keyCode === 32) {
    var arrow = new PlayerArrow(playerArcher.body.position.x, playerArcher.body.position.y, 100, 10, playerArcher.body.angle);
    Matter.Body.setAngle(arrow.body, playerArcher.body.angle);
    playerArrows.push(arrow);
  }
} 

function showArrows(a) {
  
  if(a){
    a.display();
  }

}