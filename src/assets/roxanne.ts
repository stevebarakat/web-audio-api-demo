import { v4 as uuid } from "uuid";

export const roxanne = {
  id: "l34kj53lk5j35l3jk",
  title: "Roxanne",
  artist: "The Police",
  year: "1978",
  studio: "Surrey Sound Studios",
  location: "Leatherhead, Surrey, U.K.",
  slug: "roxanne",
  bpm: 92,
  start: 1,
  end: 180,
  tracks: [
    {
      id: uuid(),
      position: 1,
      name: "Drums",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Drums.mp3",
    },
    {
      id: uuid(),
      position: 2,
      name: "Bass",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Bass.mp3",
    },
    {
      id: uuid(),
      position: 3,
      name: "Guitar",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Guitar.mp3",
    },
    {
      id: uuid(),
      position: 4,
      name: "Vocals",
      path: "https://ioxpcmpvgermtfqxwykx.supabase.co/storage/v1/object/public/songs/roxanne/Roxanne_Vocal.mp3",
    },
  ],
};
