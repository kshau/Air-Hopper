function main() {
  
  GAME_SCR = document.getElementById("gameScr");
  GAME_SCR_CTX = GAME_SCR.getContext("2d");
  
  var camY;
  
  var playerX;
  var playerY;
  
  var playerXv;
  var playerYv;
  
  var score;
  
  var platforms;
  
  var keysDown;
  
  var gameOver;
  
  function setup() {
  
    newGame();
  
    window.addEventListener("keydown", keydownEvent);
    window.addEventListener("keyup", keyupEvent);
    GAME_SCR.addEventListener("click", clickEvent);
    
  }
  
  function gameOver_() {
    
    GAME_SCR_CTX.font = "40px sans-serif";
    GAME_SCR_CTX.fillStyle = "red";
    GAME_SCR_CTX.textAlign = "center";
    GAME_SCR_CTX.fillText("Game Over", 200, 300);
    GAME_SCR_CTX.font = "30px sans-serif";
    GAME_SCR_CTX.fillStyle = "blue";
    GAME_SCR_CTX.fillText("Score: " + score.toLocaleString("en-US"), 200, 340);
    GAME_SCR_CTX.font = "15px sans-serif";
    GAME_SCR_CTX.fillText("(tap to restart)", 200, 375);
  
    gameOver = true;
    
  }
  
  function newGame() {
  
    camY = 0;
    
    playerX = 150;
    playerY = 100;
  
    playerXv = 0;
    playerYv = 0;
  
    score = 0;
  
    platforms = [];
  
    keysDown = {
      rightArrow: false, 
      leftArrow: false
    }
  
    gameOver = false;
    
    platforms.push(new RegularPlatform(150, 200));
    
  }
  
  function drawPlayer() {
  
    GAME_SCR_CTX.fillStyle = "rgb(201, 42, 79)";
    GAME_SCR_CTX.fillRect(playerX, playerY - camY, 30, 60);
    
  }
  
  function updatePlayer() {
  
    playerYv += 0.5;
    playerY += playerYv;
  
    if (keysDown.rightArrow) {
      playerXv += 1;
    }
  
    if (keysDown.leftArrow) {
      playerXv -= 1;
    }
  
    platforms.forEach(p => {
      if (playerY + 60 > p.y && playerY < p.y + 10 && playerX + 30 > p.x && playerX < p.x + 50 && playerYv > 0) {
        playerYv = -p.bounciness;
      }
    })
  
    if (playerX < 0) {
      playerX = 0;
      playerXv = 0;
    }
  
    if (playerX + 30 > 400) {
      playerX = 370;
      playerXv = 0;
    }
  
    if (playerY - camY > 600) {
      gameOver_();
    }
  
    playerX += playerXv;
    playerXv *= 0.9;
    
  }
  
  function updateCam() {
  
    if (playerY - camY < 125) {
      camY += playerYv;
    }
    
  }
  
  function drawPlatforms() {
  
    platforms.forEach(p => {
      p.draw(GAME_SCR_CTX, camY);
    })
    
  }
  
  function createPlatforms() {
  
    if (camY < (platforms[platforms.length - 1].y) - 200) {
      
      createX = Math.round(Math.random() * 370);
  
      random = Math.round(Math.random() * 10);
      
      if (random > 8) {
        platforms.push(new BoosterPlatform(createX, camY));
      }
      else {
        platforms.push(new RegularPlatform(createX, camY));
      }
      
    }
    
  }
  
  function destroyPlatforms() {
  
    platforms.forEach(p => {
  
      if (p.y > camY + 500) {
        platforms.splice(platforms.indexOf(p), 1);
      }
      
    })
    
  }
  
  function drawScore() {
  
    GAME_SCR_CTX.font = "25px sans-serif";
    GAME_SCR_CTX.fillStyle = "blue";
    GAME_SCR_CTX.textAlign = "left";
    GAME_SCR_CTX.fillText(score.toLocaleString("en-US"), 20, 580);
    
  }
  
  function loop() {
  
    if (!gameOver) {
      
      GAME_SCR_CTX.fillStyle = "rgb(52, 186, 235)";
      GAME_SCR_CTX.fillRect(0, 0, GAME_SCR.width, GAME_SCR.height);
    
      updateCam();
      
      updatePlayer();
      drawPlayer();
    
      createPlatforms();
      destroyPlatforms();
      drawPlatforms();
    
      if (-Math.round(camY / 15) > score) {
        score = -Math.round(camY / 15);
      }
    
      drawScore();
      
    }
  
    window.requestAnimationFrame(loop);
    
  }
  
  function keydownEvent(e) {
  
    switch (e.keyCode) {
      case 39:
        keysDown.rightArrow = true;
        break;
      case 37:
        keysDown.leftArrow = true;
        break;
    }
    
  }
  
  function keyupEvent(e) {
  
    switch (e.keyCode) {
      case 39:
        keysDown.rightArrow = false;
        break;
      case 37:
        keysDown.leftArrow = false;
        break;
    }
    
  }
  
  function clickEvent(e) {
  
    if (gameOver) {
      newGame();
    }
    
  }
  
  setup();
  loop();
  
}

main();
