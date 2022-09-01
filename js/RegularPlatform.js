class RegularPlatform extends Platform {

  constructor(xpos, ypos) {
    
    super(xpos, ypos);

    this.bounciness = 15;

    this.texture = new Image(); 
    this.texture.src =  "assets/png/platform/regular_platform.png";
    
  }
  
}