let el, paths;
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

  const starter = "M5.77,136.09c-1.87-1.2-3.64-2.24-5.35-3.37a1.36,1.36,0,0,1-.4-1.18c.09-.34.5-.89,1.05-.2.14.17.63.06,1,.07,6.76.17,13.52.35,20.28.5,2.11.05,4.22,0,6.32,0,4.32.13,8.66.08,12.94.55,8.7,1,17.41.14,26.11.47,1.78.06,3.57.32,5.35.49s3.3.34,5,.47c.67.06,1.34,0,2,0,6.41,0,12.82.05,19.23,0a84.88,84.88,0,0,1,12,.88c2.56-1.14,5,.45,7.62.2s5.22,0,7.84,0c3.37,0,6.74,0,10.12,0,1.94,0,1.92,0,2.16-1.83a6.92,6.92,0,0,1,.57-1.53,4.41,4.41,0,0,0,.41-1.09c.22-2.79,2.15-5.13,2.09-8,0-.61.85-1.21.92-1.86.37-3.25,2.63-6,2.57-9.32,1.72-1.84.76-4.7,2.51-6.56a2.17,2.17,0,0,0,.49-1.53c-.28-2.58,2.18-4.55,1.55-7.18,1.77-1.73,1-4.46,2.47-6.31a1.81,1.81,0,0,0,.52-1c-.21-2,1.16-3.52,1.41-5.2.36-2.42,1.75-4.45,2-6.8.24-2.56,2.08-4.7,1.77-7.4-.05-.48.84-1,.92-1.56.44-2.74,2.05-5.14,2.19-8,0-.75,1.16-1.74,1.13-2.72-.1-2.5,2-4.38,1.81-6.87,0-.33.42-.66.55-1,.34-1,.66-1.92.92-2.9.11-.4-.15-1,0-1.25,1.32-2,1.45-4.46,2.24-6.66.43-1.18.73-2.4,1.09-3.6.95-3.15,1.76-6.35,2.94-9.41.38-1-.5-2.6,1.29-3,.17-1.19,0-2.66.58-3.53,1.41-2,.77-4.53,2.27-6.43a4.13,4.13,0,0,0,.65-2.48c0-2.61,2.14-4.68,1.65-7.44-.12-.69.94-1.58,1.48-2.37a.42.42,0,0,1,.33-.07.7.7,0,0,1,.11.45c-.6,2.06.28,4,.47,6,.12,1.24,1.19,1.95,1.21,3.35,0,2.66,1.68,5,2,7.77.16,1.56,1.24,3,1.47,4.69.36,2.56,2.08,4.8,2,7.51,1.78,2,1.15,4.77,2.1,7,.82,1.88.88,3.95,1.61,5.65a14.5,14.5,0,0,1,1.39,5c0,.56.78,1,.94,1.62.29,1.07.37,2.2.57,3.31.15.85.17,2.33.56,2.45,1.39.4.78,1.44,1,2.17s.21,1.76.47,2.59c.18.59.79,1,.95,1.63.29,1.07.37,2.2.57,3.3.16.86.17,2.34.57,2.45,1.39.41.77,1.45,1,2.18s.21,1.76.47,2.59c.2.66.76,1.22,1,1.88.41,1.35.66,2.75,1,4.12A34.58,34.58,0,0,1,203,81.86c.24,1.6,1.28,3,1.42,4.46.31,3.29,2.6,6,2.44,9.4,0,.89,1.15,1.37,1.08,2.57a11.39,11.39,0,0,0,.91,3.63,11.18,11.18,0,0,0,1.21,3.52c.83,1.1-.72,3,1.32,3.48.17,1.37.33,2.73.5,4.09,0,.17,0,.4.06.48,2,1.77,1.4,4.33,2,6.53.23.9,1.16,1.37,1.12,2.56a11.92,11.92,0,0,0,.92,3.89c.37,1.18.87,2.33,1.32,3.5.05.14.21.32.16.42-.74,1.78,1.51,2.88,1.06,4.61,0,.09.42.41.66.44a14.91,14.91,0,0,0,1.77,0c9.61,0,19.24.29,28.83-.08,9-.35,18-.31,26.95-.49,1.64,0,3.26.11,4.89.07a17.6,17.6,0,0,0,3.78-.07c1.2-.29,2.26.19,3.39.08,12.65-1.14,25.33-.2,38-.55,2.18-.06,4.35-.49,6.53-.67.81-.06,1.63.18,2.45.18,6.16,0,12.31.06,18.47,0a37.1,37.1,0,0,0,4.79-.6,2.78,2.78,0,0,0,.54-.22c0,.23.11.57,0,.66a6.86,6.86,0,0,1-1.57,1.08,43.29,43.29,0,0,0-8.76,5.72c-1.52,1.16-3.15,2.17-4.73,3.24L329,154.16q-6.44,4.32-12.87,8.63c-2.91,1.94-5.74,4-8.72,5.84-4.06,2.5-7.74,5.53-11.86,8-3.77,2.23-7.15,5.12-10.78,7.6-3,2.06-6.13,3.93-9.18,5.93-1.46,1-2.86,2-4.31,3-2.23,1.53-4.47,3-6.71,4.55l-10.48,7.08q-4.14,2.79-8.32,5.56c-.12.09-.33.07-.43.17-.67.64-1.62,1.2-1.88,2-.2.61.66,1.49.73,2.27.28,3.27,2.68,5.94,2.6,9.32,0,.56.89.63,1.08,1.54a53,53,0,0,0,2.45,7.57,54.29,54.29,0,0,1,1.64,5.41,28.78,28.78,0,0,0,1.67,4.59,73.64,73.64,0,0,1,2.79,8c1.32,4.09,3.23,8,4,12.25,1.62,1.88,1.46,4.43,2.46,6.57a67.66,67.66,0,0,1,2.5,7.31c.88,2.59,1.8,5.16,2.68,7.75.79,2.29,1.57,4.58,2.32,6.87,1.1,3.35,2.32,6.65,3.28,10,.32,1.14,1.13,2.2,1.44,3.44s.66,2.26,1,3.38c.83,2.6,1.38,5.35,2.61,7.76,1.09,2.14,1.38,4.47,2.38,6.62a64.7,64.7,0,0,1,2.58,7.52c.61,1.87,1.08,3.84,1.72,5.63a23.54,23.54,0,0,0,2.14,5.17,3.66,3.66,0,0,1,.67,1.48,8.59,8.59,0,0,1-.17,1.94,6.09,6.09,0,0,0-.91-1.29c-2.3-1.94-4.61-3.87-7-5.74s-5-3.82-7.49-5.72c-2-1.56-4.14-3.07-6.16-4.66-2.67-2.1-5.25-4.32-7.94-6.39-3.12-2.39-6.35-4.64-9.47-7-2.65-2-5.19-4.17-7.81-6.21-3.44-2.67-6.92-5.28-10.36-8-2.62-2-5.21-4.13-7.81-6.19-1.59-1.25-3.17-2.51-4.77-3.75-2.17-1.68-4.34-3.36-6.53-5-3.27-2.46-6.6-4.85-9.85-7.35-2.64-2-5.19-4.17-7.79-6.24s-4.93-3.95-7.44-5.85c-2.36-1.79-4.81-3.47-7.18-5.26-1.31-1-2.11-1.17-3.45-.22-1.64,1.18-3.16,2.53-4.79,3.73-3.54,2.63-7.13,5.19-10.67,7.82-2.46,1.83-4.83,3.77-7.3,5.6-3.66,2.71-7.42,5.32-11.06,8.07-2.72,2.06-5.27,4.33-8,6.41-2.22,1.69-4.59,3.19-6.84,4.85-2.85,2.11-5.65,4.27-8.46,6.43-3.72,2.85-7.39,5.75-11.13,8.58-2.75,2.07-5.58,4-8.34,6.1-2.58,1.93-5.11,3.94-7.68,5.88-2.12,1.6-4.26,3.16-6.39,4.74-3.16,2.35-6.3,4.72-9.47,7.07-2.51,1.87-5,3.73-7.56,5.57a2,2,0,0,0-.81,1.93c0,.18-.17.38-.27.58-.17-.18-.5-.36-.51-.54a6.08,6.08,0,0,1,.18-2.54,75.11,75.11,0,0,0,3-7.61c.79-2.2,1.73-4.35,2.48-6.56,1.79-5.25,3.3-10.61,5.33-15.76,1.49-3.78,2.76-7.62,4.13-11.44,1.22-3.37,2.81-6.64,3.39-10.23,1.63-1.68,1.49-4.09,2.47-6.07a49.22,49.22,0,0,0,2.09-6.21c.55-1.62,1.15-3.23,1.74-4.84,1.1-3,2.22-6,3.31-9,1.23-3.37,2.57-6.71,3.62-10.13.77-2.47,2-4.77,2.51-7.33a48.29,48.29,0,0,1,2-5.25c.41-1.18.74-2.48,1.18-3.55.69-1.66,1.13-3.41,1.84-5.06a15.48,15.48,0,0,0,1.16-3.6c.3-1.78,1.39-3.44,2.13-5.16.12-.28.19-.59.29-.89,1-3,1.94-6.11,3.18-9.05.48-1.13.37-1.34-.59-2q-6.59-4.35-13-8.92c-5-3.58-9.92-7.35-15-10.87-4.88-3.4-10-6.53-14.86-9.89-3.24-2.21-6.32-4.67-9.53-6.94-3-2.15-6.38-3.95-9.24-6.32-4.7-3.92-10-6.89-14.86-10.63-3.7-2.87-7.78-5.23-11.62-7.92-4.53-3.16-9-6.45-13.47-9.65C9.09,138.34,7.48,137.3,5.77,136.09Z";
  path = new Path2D(starter);
  const ctx = el.getContext('2d');
  ctx.stroke(path);
  ctx.fill(path);
  paths = [path];

  const graphic = document.querySelector("#graphic");
  graphic.addEventListener("change", async event => {
    const file = graphic.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const ctx = el.getContext('2d');
      const parser = new DOMParser();
      const svg = parser.parseFromString(event.target.result, "image/svg+xml");
      const pathEls = svg.querySelectorAll("path");

      ctx.clearRect(0, 0, el.width, el.height);

      paths = [...pathEls].forEach(pathEl => {
        const d = pathEl.getAttribute("d");
        path = new Path2D(d);

        ctx.stroke(path);
        ctx.fill(path);
        return path;
      });
    };

    reader.readAsText(file);
  });
}

document.addEventListener("DOMContentLoaded", load);
