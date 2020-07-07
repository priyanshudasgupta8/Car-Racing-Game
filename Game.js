class Game {
  constructor(){

  }

  getState(){
    // References and uses the Game state stored in the DB
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    // Updates the game state in the DB whenever called
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    // Creates players and the form when the game has'nt started yet
    if(gameState === 0){

      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");

      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }

      form = new Form()
      form.display();
    }

    // Creates several cars, gives them corresponding images, and adds them to a cars array
    car1 = createSprite(100,200);
    car1.addImage("car1", car1_img);

    car2 = createSprite(300,200);
    car2.addImage("car2", car2_img);

    car3 = createSprite(500,200);
    car3.addImage("car3", car3_img);

    car4 = createSprite(700,200);
    car4.addImage("car4", car4_img);

    cars = [car1, car2, car3, car4];

  }

  play(){
    form.hide();

    // Gets player's info
    Player.getPlayerInfo();
    
    // After all players are in, create the background and positions all players
    if(allPlayers !== undefined){
      background("#434343");
      image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
      //var display_position = 100;
      
      // index of the array
      var index = 0;

      // x and y position of the cars
      var x = 150;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        // position the cars a little away from each other in x direction
        x += 250;

        // use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          //cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth / 2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }
    
    // Makes the cars move if that key is pressed
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    // Makes the game end when it ends
    if (player.distance > 3860) {
      gameState = 2;
      console.log("Game Over");
    }

    drawSprites();
  }

  // Does nothing
  end(){
    //console.log("Game Over");
    //gameState.update(2);
  }
}
