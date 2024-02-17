"use client";

import H5AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/src/styles.scss";

import "./audio-player.scss";

export default function AudioPlayer({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return <H5AudioPlayer src={src} className={className} />;
}
