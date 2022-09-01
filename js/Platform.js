class Platform {

  constructor(xpos, ypos) {
    
    this.x = xpos;
    this.y = ypos;

    this.bounciness = null;
    this.texture = null;
    
  }

  draw(ctx, camYpos) {
    ctx.drawImage(this.texture, this.x, this.y - camYpos);
  }
  
}