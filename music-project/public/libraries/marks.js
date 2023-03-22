let waitTime = 0.5;
let drawingCheckMark = false;
let drawingCross = false;

async function drawCheck() {
    drawingCheckMark = true;
    const useless = await sleep(waitTime);
    drawingCheckMark = false;
}

async function drawCross() {
    drawingCross = true;
    const useless = await sleep(waitTime);
    drawingCross = false;
}