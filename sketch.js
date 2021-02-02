//Create variables here
var foodStock, dog, database, dogImage1, dogImage2, foodS; 
function preload()
{
  //load images here
  dogImage2 = loadImage("images/dogImg1.png");
  dogImage1 = loadImage("images/dogImg.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,350, 10, 10);
  dog.addImage("dog", dogImage1);
  dog.scale = 0.3;

  database=firebase.database()
  var foodref = database.ref("food")
  foodref.on("value", (data)=>{
    foodStock = data.val() 
    console.log(foodStock)
  })
}


function draw() {  
  background(46, 139, 87)
  drawSprites();
  //add styles here
  if(keyWentDown(UP_ARROW)){
    console.log("hi");
    writeStock(foodStock);
    dog.addImage("happy", dogImage2);
  }
  fill(255,255,254); 
  stroke("black"); 
  // if(foodStock !== undefined)
  text("Food remaining : "+foodStock,170,200); 
  textSize(13); 
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref("/").update({
    food: x
  })
}

