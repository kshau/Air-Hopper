class BoosterPlatform extends Platform {

  constructor(xpos, ypos) {
    
    super(xpos, ypos);

    this.bounciness = 45;
    
    this.texture = new Image(); 
    this.texture.src =  "assets/png/platform/booster_platform.png";
    
  }
  
}