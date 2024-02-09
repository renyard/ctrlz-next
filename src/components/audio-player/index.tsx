"use client";

import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";

export default function AudioPlayer({ src }: { src: string }) {
  return <H5AudioPlayer src={src} />;
}
