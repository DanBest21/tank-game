import { startCapturingInput, stopCapturingInput } from './input.js';
import { startRendering, stopRendering } from './render.js';


// Learn more about this file at:
// https://victorzhou.com/blog/build-an-io-game-part-1/#3-client-entrypoints
// import { connect, play } from './networking';
// import { downloadAssets } from './assets';
// import { initState } from './state';
// import { setLeaderboardHidden } from './leaderboard';

// I'm using a tiny subset of Bootstrap here for convenience - there's some wasted CSS,
// but not much. In general, you should be careful using Bootstrap because it makes it
// easy to unnecessarily bloat your site.
// import './css/bootstrap-reboot.css';
// import './css/main.css';

// window.onload()

// const playMenu = document.getElementById('play-menu');
const playButton = document.getElementById('play-button');
// const usernameInput = document.getElementById('username-input');

playButton.onclick = () => {
  // play(usernameInput.value);
  // playMenu.classList.add('hidden');
  // initState();
  // console.log("alksjd");
  startCapturingInput();
  startRendering();
  // setLeaderboardHidden(false);
};



// function onGameOver() {
//   stopCapturingInput();
//   stopRendering();
//   playMenu.classList.remove('hidden');
//   setLeaderboardHidden(true);
// }
