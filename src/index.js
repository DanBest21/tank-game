import { startCapturingInput, stopCapturingInput, startEventLoop } from './input.js';
import { startRendering, stopRendering } from './render.js';

// const playMenu = document.getElementById('play-menu');
const playButton = document.getElementById('play-button');
// const usernameInput = document.getElementById('username-input');

playButton.onclick = () => {
  // todo - initialize state somehow 
  startCapturingInput();
  startEventLoop(); // state updates
  startRendering(); // canvas updates
};