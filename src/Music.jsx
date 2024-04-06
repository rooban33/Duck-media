import React, { useRef } from 'react';
import './music.css'; // Import your CSS file

function MusicPlayer() {
  const audioRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const audio = audioRef.current;

    if (file) {
      audio.src = URL.createObjectURL(file);
      audio.load();
      audio.play();

      const context = new (window.AudioContext || window.webkitAudioContext)();
      const src = context.createMediaElementSource(audio);
      const analyser = context.createAnalyser();

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      src.connect(analyser);
      analyser.connect(context.destination);

      analyser.fftSize = 256;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;
      const barWidth = (WIDTH / bufferLength) * 2.5;
      let x = 0;

      function renderFrame() {
        requestAnimationFrame(renderFrame);

        x = 0;

        analyser.getByteFrequencyData(dataArray);

        ctx.fillStyle = '#522B5B';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        for (let i = 0; i < bufferLength; i++) {
          const barHeight = dataArray[i];
          const r = barHeight + 25 * (i / bufferLength);
          const g = 100 + 25 * (i / bufferLength);
          const b = 225 - 25 * (i / bufferLength);

          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

          x += barWidth + 1;
        }
      }

      audio.play();
      renderFrame();
    }
  };

  return (
    <div id="music-player">
      <h2>MUSIC PLAYER</h2>
      <canvas ref={canvasRef} className="canvas"></canvas>
      <audio ref={audioRef} controls></audio>
      <br />
      <input className="input" type="file" onChange={handleFileChange} accept="audio/*" />
    </div>
  );
}

export default MusicPlayer;
