// Hightlight element function
const toggleKey = (key) => {
  key.classList.toggle('playing');

  // Remove animation class when it ends
  key.addEventListener('transitionend', () => {
    key.classList.remove('playing');
  });
}

// Play the song for determined key
const executeSong = (dataKey) => {
  const soundElement = document.querySelector("audio[data-key='"+ dataKey +"']");

  // Pause and reset de song before playing in case user hit same key
  soundElement.pause();
  soundElement.currentTime = 0;
  soundElement.play();
}

// Add keyboard event to run the logic in the key pressed
window.addEventListener('keydown', (e) => {
  const dataKey = e.keyCode;
  const key = document.querySelector(`.keys [data-key='${dataKey}'`);

  if(!key) {return;} // Quit case clicks outside of keys

  // Execunting helper functions to toogle the animation and play the song.
  toggleKey(key);
  executeSong(dataKey);
});