import { useEffect, useRef, useState } from "react";
import "./App.css";
import { roxanne } from "./assets/roxanne";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtx = useRef<AudioContext | undefined>();
  const buffer = useRef<AudioBuffer | undefined>();
  const audioBufferSourceNode = useRef<AudioBufferSourceNode | null>(null);
  const startOffset = 3;
  let startTime = 0;

  console.log("roxanne.tracks[0].path", roxanne.tracks[0].path);

  roxanne.tracks.forEach((track) => {
    fetchAudio(track.path).then((buf) => {
      // executes when buffer has been decoded
      buffer.current = buf;
    });
  });

  async function fetchAudio(name: string) {
    try {
      const rsvp = await fetch(name);
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
    audioBufferSourceNode.current = audioCtx.current?.createBufferSource();
    // Connect graph
    audioBufferSourceNode.current.buffer = buffer.current;
    audioBufferSourceNode.current.connect(audioCtx.current?.destination);
    // Start playback, but make sure we stay in bound of the buffer.
    audioBufferSourceNode.current.start(
      0,
      startOffset % buffer.current.duration
    );
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

  function ff() {
    if (!audioBufferSourceNode) return;
    const currentTime = audioCtx.current?.currentTime;

    audioBufferSourceNode.current?.stop(currentTime);
    audioBufferSourceNode.current?.disconnect();

    audioBufferSourceNode.current = audioCtx.current?.createBufferSource();
    if (!audioBufferSourceNode.current) return;
    audioBufferSourceNode.current.buffer = buffer.current;
    audioBufferSourceNode.current.connect(audioCtx.current?.destination);
    audioBufferSourceNode.current.start(
      currentTime,
      currentTime - startTime + 10
    );
    startTime -= 10;
  }

  function rew() {
    if (!audioBufferSourceNode) return;
    const currentTime = audioCtx.current?.currentTime;

    audioBufferSourceNode.current?.stop(currentTime);
    audioBufferSourceNode.current?.disconnect();

    audioBufferSourceNode.current = audioCtx.current?.createBufferSource();
    if (!audioBufferSourceNode.current) return;
    audioBufferSourceNode.current.buffer = buffer.current;
    audioBufferSourceNode.current.connect(audioCtx.current?.destination);
    audioBufferSourceNode.current.start(
      currentTime,
      currentTime - startTime - 10
    );
    startTime += 10;
  }

  return (
    <>
      <button onClick={rew}>rew</button>
      <button onClick={audioCtx.current ? pause : play}>
        {isPlaying ? "pause" : "play"}
      </button>
      <button onClick={ff}>ff</button>
    </>
  );
}

export default App;
