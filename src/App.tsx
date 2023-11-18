import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtx = useRef<AudioContext | undefined>();
  const buffer = useRef<AudioBuffer | undefined>();
  var startOffset = 3;
  var startTime = 0;

  fetchAudio("nelly").then((buf) => {
    // executes when buffer has been decoded
    buffer.current = buf;
  });

  async function fetchAudio(name: string) {
    try {
      let rsvp = await fetch(`${name}.mp3`);
      return audioCtx.current?.decodeAudioData(await rsvp.arrayBuffer()); // returns a Promise, buffer is arg for .then((arg) => {})
    } catch (err) {
      console.log(
        `Unable to fetch the audio file: ${name} Error: ${err.message}`
      );
    }
  }

  useEffect(() => {
    audioCtx.current = new AudioContext();
  }, []);

  function play() {
    if (!buffer.current || !audioCtx.current) return;
    startTime = audioCtx.current?.currentTime;
    var source = audioCtx.current?.createBufferSource();
    // Connect graph
    source.buffer = buffer.current;
    source.connect(audioCtx.current?.destination);
    // Start playback, but make sure we stay in bound of the buffer.
    source.start(0, startOffset % buffer.current.duration);
    setIsPlaying(true);
  }

  function pause() {
    if (isPlaying) {
      audioCtx.current?.suspend();
      setIsPlaying(false);
    } else {
      audioCtx.current?.resume();
      setIsPlaying(true);
    }
  }

  return (
    <>
      <button onClick={audioCtx.current ? pause : play}>
        {isPlaying ? "pause" : "play"}
      </button>
    </>
  );
}

export default App;
