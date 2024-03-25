/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/
let character;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  character = new MrTickles(width / 2, height / 2);
}

function draw() {
    background(0);
  drawFloor(); // for reference only
  character.update();
  character.draw();
}
class MrTickles {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.armLength = 60;
    this.numSegments = 50;
    this.noiseOffsetArmL = 0;
    this.noiseOffsetArmR = 5000; 
    this.noiseScale = 0.1;
    this.legPhase = 0;
    this.legSpeed = 0.2;
    this.movementRange = 50;
    this.movementSpeed = 0.02;
  }

  update() {
    this.x = width / 2 + sin(frameCount * this.movementSpeed) * this.movementRange;
    this.noiseOffsetArmL += 0.05;
    this.noiseOffsetArmR += 0.05;
    this.legPhase += this.legSpeed;
  }
  
    // ******** //
    // ⬇️ draw your dancer from here ⬇️
  draw() {
    push();
    translate(this.x, this.y);
    this.drawLegs();
    this.drawBody();
    this.drawArms();
    // Uncomment the next line to draw reference shapes
    this.drawReferenceShapes();
    pop();
  }
  
  drawLegs() {
    this.drawLeg(25, 50, this.legPhase); // Right leg
    this.drawLeg(-25, 50, this.legPhase + PI); // Left leg
  }
 
  drawBody() {
    noStroke();
    fill(255, 204, 0); // Body color
    ellipse(0, 0, 100, 100); // Body
    fill(0); // Features color
    arc(0, 20, 50, 20, 0, 110); // Smile
    ellipse(-20, -10, 10, 10); // Left Eye
    ellipse(20, -10, 10, 10); // Right Eye
    this.drawHat();
  }

  drawArms() {
    this.drawWigglyArm(40, -10, this.noiseOffsetArmR, true); // Right arm
    this.drawWigglyArm(-40, -10, this.noiseOffsetArmL, false); // Left arm
  }


  drawWigglyArm(startX, startY, noiseOffset, isRightArm) {
    stroke(255, 204, 0);
    strokeWeight(10);
    let segmentLength = this.armLength / this.numSegments;

    beginShape();
    for (let i = 0; i <= this.numSegments; i++) {
      let x;
      if (isRightArm) {
        x = startX + i * segmentLength;
      } else {
        x = startX - i * segmentLength;
      }
      let y = startY + noise(noiseOffset + i * this.noiseScale) * 20 - 10;
      curveVertex(x, y);
    }
    endShape();
  }

  drawLeg(x, startY, phase) {
    stroke(255, 204, 0);
    strokeWeight(10);
    let legLength = sin(phase) * 10 + 40;
    line(x, startY -10, x, startY + legLength);
    noStroke();
    fill(255);
    ellipse(x, startY + legLength, 20, 10);
  }

  drawHat() {
    fill(0, 0, 255); // Hat color
    rect(-30,-50,60,10); // Hat shape
    rect(-20,-60, 40, 20);
  }

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0); // Reference crosshairs
    line(-5, 0, 5, 0); // Horizontal line
    line(0, -5, 0, 5); // Vertical line
  }
}

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too, 
    // is a part if your Dancer object.
    // comment it out or delete it eventually.




/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/