"use client"

import { StaticImageData } from "next/image"
import H5AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/src/styles.scss"

import "./audio-player.scss"

export default function AudioPlayer({
  src,
  image,
  className,
}: {
  src: string
  image?: StaticImageData
  className?: string
}) {
  return (
    <div>
      <H5AudioPlayer src={src} className={className} autoPlay={false} />
    </div>
  )
}
