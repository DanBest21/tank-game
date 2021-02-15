import { startCapturingInput, stopCapturingInput, startEventLoop, stopEventLoop } from './input.js';
import { startRendering, stopRendering } from './render.js';

// const playMenu = document.getElementById('play-menu');
const playButton = document.getElementById('play-button');
const stopButton = document.getElementById('stop-button');
// const usernameInput = document.getElementById('username-input');

playButton.onclick = () => {
  // todo - initialize state somehow 
  startCapturingInput();
  startEventLoop(); // state updates
  startRendering(); // canvas updates
};

stopButton.onclick = () => {
  // todo - initialize state somehow 
  stopCapturingInput();
  stopEventLoop(); // state updates
  stopRendering(); // canvas updates
};