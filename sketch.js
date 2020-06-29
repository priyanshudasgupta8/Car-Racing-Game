var hypnoticBall, database;
var position;

function setup(){
    database = firebase.database();

    var canvas = createCanvas(500,500);
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "blue";

    var hypnoticBallPosition = database.ref("ball/position");
    hypnoticBallPosition.on("value", readPosition, showError);
}

function draw(){
    background("black");
    if(position !== undefined) {
        if(keyDown(LEFT_ARROW) || keyDown(65)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW) || keyDown(68)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW) || keyDown(87)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW) || keyDown(83)){
            writePosition(0,1);
        }
    }
    drawSprites();
}

function writePosition(x, y){
    database.ref("ball/position").set({
        "x": position.x + x,
        "y": position.y + y
    });
}

function readPosition(data){
    position = data.val(); 
    //console.log(position.x); 
    hypnoticBall.x = position.x; 
    hypnoticBall.y = position.y; 
}

function showError() {
    console.log(err);
}