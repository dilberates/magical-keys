let clef;

let sheetGap = 10;
let perdeGap = 200;

function drawDashedLine(x1, y1, x2, y2, dashLength) {
    xLength = abs(x1 - x2);
    yLength = abs(y1 - y2);

    lineLength = Math.sqrt(xLength ** 2 + yLength ** 2);

    sinus = yLength / lineLength;
    cosinus = xLength / lineLength;

    yGap = dashLength * sinus;
    xGap = dashLength * cosinus;

    for (i = 1; (i * dashLength) < lineLength; i += 2) {
        line(
            (x1 + (xGap * (i - 1))),
            (y1 + (yGap * (i - 1))),
            (x1 + (xGap * i)),
            (y1 + (yGap * i)))
    }

}

function drawMusicSheet(locationX, locationY, sheetWidth = 1920) {
    gap = sheetGap;

    let yOffset = 2 * gap

    lx = locationX;
    ly = locationY - 2 + yOffset;

    
    clef.resize(100, 100);
    image(clef, locationX - 20, locationY - 60 + yOffset);

    push();
    translate(lx, ly);

    line(0, 0, sheetWidth, 0);
    line(0, gap, sheetWidth, 0 + gap);
    drawDashedLine(0, (2 * gap), sheetWidth, (2 * gap), 10);
    drawDashedLine(0, (3 * gap), sheetWidth, (3 * gap), 10);
    drawDashedLine(0, (4 * gap), sheetWidth, (4 * gap), 10);
    line(0, -gap, sheetWidth, -gap);
    line(0, -(2 * gap), sheetWidth, -(2 * gap));
    line(0, -(3 * gap), sheetWidth, -(3 * gap));
    drawDashedLine(0, -(4 * gap), sheetWidth, -(4 * gap), 10);
    drawDashedLine(0, -(5 * gap), sheetWidth, -(5 * gap), 10);
    drawDashedLine(0, -(6 * gap), sheetWidth, -(6 * gap), 10);


    // sheet lowest point
    slp = (6 * gap) + (2 * gap);
    for (let i = 70; i < sheetWidth; i += perdeGap) {
        line(i, -slp - gap, i, slp - gap);
    }

    pop();
}




function drawFullNote(x, y) {

    push();
    translate(x, y);
    scale(0.4);
    fill(0);
    ellipse(0, 0, 40, 28);
    noFill();
    pop();

    fill(255);
    push();
    translate(x, y);
    scale(0.4);
    rotate(PI * (2 / 6));
    ellipse(0, 0, 25, 17.5);
    noFill();
    pop()
}

function sideDot(x, y) {
    push();
    translate(x, y);
    fill(0);
    rotate(-PI * (2 / 18))
    ellipse(0, 0, 40, 25);

    rotate(PI * (2 / 18))

    fill(255);
    rotate(PI * (5 / 6))
    ellipse(0, 0, 35, 10);
    noFill();
    pop();
}

function drawHalfNote(x, y) {

    push();
    fill(0);
    translate(x, y);
    scale(0.4);


    sideDot(0, 0);
    let height = gap*5
    rect(17.5, -36, 3, 17.5 + height);

    noFill();
    pop();
}

function notePart(x, y) {
    push();
    fill(0);

    translate(x, y);
    fill(0);
    rotate(-PI * (2 / 18))
    ellipse(0, 0, 40, 25);

    rotate(PI * (2 / 18))

    
    let height = gap*5
    rect(17.5, -36, 3, 17.5 + height);

    noFill();
    pop();
}

function drawQuarterNote(x, y) {
    push();
    translate(x, y);
    scale(0.4);
    notePart(0, 0);
    pop();
}

function drawSquiggle(x, y) {
    push();
    fill(0);

    translate(x, y);

    beginShape();
    vertex(0, 5);
    vertex(0, -5);
    vertex(20, 15);
    vertex(17.5, 20);
    endShape(CLOSE);

    beginShape();
    vertex(20, 15);
    vertex(17.5, 20);
    vertex(18.25, 35);
    endShape(CLOSE);

    noFill();
    pop();
}

function draw8thNote(x, y) {
    push();
    translate(x, y);
    scale(0.4);
    notePart(0, 0);
    drawSquiggle(20, 65);
    pop();
}

function draw16thNote(x, y) {
    push();
    translate(x, y);
    scale(0.4);
    notePart(0, 0);
    drawSquiggle(20, 65);
    drawSquiggle(20, 50);
    pop();
}

function draw32ndNote(x, y) {
    push();
    translate(x, y);
    scale(0.4);
    notePart(0, 0);
    drawSquiggle(20, 65);
    drawSquiggle(20, 50);
    drawSquiggle(20, 35);
    pop();
}


function drawCheckMark(x, y) {
    push();
    translate(x, y);
    fill("green");
    noStroke();
    beginShape();
    vertex(-30, 0);
    vertex(-15, -15);
    vertex(0, 0);
    vertex(30, -30);
    vertex(45, -15);
    vertex(45, -15);
    vertex(0, 30);
    endShape(CLOSE);
    pop();
}

function drawRedCross(x, y) {
    push();
    translate(x, y);
    fill("red");
    noStroke();
    beginShape();
    vertex(-30, 0);
    vertex(-15, -15);
    vertex(0, 0);
    vertex(15, -15);
    vertex(30, 0);
    vertex(15, 15);
    vertex(30, 30);
    vertex(15, 45);
    vertex(0, 30);
    vertex(-15, 45);
    vertex(-30, 30);
    vertex(-15, 15);
    endShape(CLOSE);
    pop();
}
