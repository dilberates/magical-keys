async function Metronom(timerInSeconds) {
  tick.play();
  await sleep(timerInSeconds);
  Metronom(timerInSeconds);
}
