let el;
let paths = [];
sources = [];

function handleMove(event) {
  event.preventDefault();
  const ctx = el.getContext('2d');
  const touches = event.changedTouches;

  [...touches].forEach(touch => {
    sources.forEach(({ path, audioCtx }) => {
      if (ctx.isPointInPath(path, touch.pageX, touch.pageY)) {
        if (audioCtx.state === "running") {
           audioCtx.suspend();
        }
      } else {
        if (audioCtx.state === "suspended") {
          audioCtx.resume();
        }
      }
    });
  });
}

function load() {
  el = document.querySelector("#canvas");
  audio = document.querySelector("audio");

  el.height = 1000;
  el.width = 1000;

  el.onclick = (event) => {
    event.preventDefault();
    el.onclick = null;

    sources = paths.map(path => {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContext();
      const bufferSize = audioCtx.sampleRate * 1000;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      let data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      noise.connect(audioCtx.destination);
      noise.start();

      return { path, audioCtx };
    });
  };

  el.addEventListener("touchmove", handleMove, false);
  el.style.opacity = 0.8;

  const graphic = document.querySelector("#graphic");
  graphic.addEventListener("change", async event => {
    const file = graphic.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const parser = new DOMParser();
      const svg = parser.parseFromString(event.target.result, "image/svg+xml");
      const pathEls = svg.querySelectorAll("path");

      [...pathEls].forEach(pathEl => {
        const d = pathEl.getAttribute("d");
        path = new Path2D(d);
        paths.push(path);

        const ctx = el.getContext('2d');
        ctx.stroke(path);
        ctx.fill(path);
      });
    };

    reader.readAsText(file);
  });
}

document.addEventListener("DOMContentLoaded", load);
