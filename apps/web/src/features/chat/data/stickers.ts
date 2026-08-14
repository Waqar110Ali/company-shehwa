import laugh from "@/assets/stickers/laugh.webp";
import love from "@/assets/stickers/love.webp";
import thumbsup from "@/assets/stickers/thumbsup.webp";
import wow from "@/assets/stickers/wow.webp";
import cry from "@/assets/stickers/cry.webp";
import clap from "@/assets/stickers/clap.webp";
import fire from "@/assets/stickers/fire.webp";
import ok from "@/assets/stickers/ok.webp";
import angry from "@/assets/stickers/angry.webp";
import smile from "@/assets/stickers/smile.webp";

export interface Sticker {
  id: string;
  name: string;
  url: string;
}

export const stickers: Sticker[] = [
  {
    id: "laugh",
    name: "Laugh",
    url: laugh,
  },
  {
    id: "love",
    name: "Love",
    url: love,
  },
  {
    id: "thumbsup",
    name: "Thumbs Up",
    url: thumbsup,
  },
  {
    id: "wow",
    name: "Wow",
    url: wow,
  },
  {
    id: "cry",
    name: "Cry",
    url: cry,
  },
  {
    id: "clap",
    name: "Clap",
    url: clap,
  },
  {
    id: "fire",
    name: "Fire",
    url: fire,
  },
  {
    id: "ok",
    name: "OK",
    url: ok,
  },
  {
    id: "angry",
    name: "Angry",
    url: angry,
  },
  {
    id: "smile",
    name: "Smile",
    url: smile,
  },
];