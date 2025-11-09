"use client"

import fetchJsonp from "fetch-jsonp"
import Image from "next/image"
import { useEffect, useState } from "react"

import defaultImage from "../../images/ctrlz-logo-small.png"
import AudioPlayer from "../audio-player"

import styles from "./live-stream.module.scss"

export default function LiveStream({
  src,
  className,
}: {
  src: string
  className?: string
}) {
  const [image, setImage] = useState(defaultImage)
  const [imageLoading, setImageLoading] = useState(true)
  useEffect(() => {
    const updateThumbnail = async () => {
      const response = await fetch(
        "https://public.radio.co/stations/s738c40d83/status",
      )
      const {
        current_track: { artwork_url_large: thumb },
      } = await response.json()

      setImageLoading(false)
      setImage(thumb || defaultImage)
    }

    updateThumbnail()

    const timer = setInterval(updateThumbnail, 10000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`${styles["stream-container"]} ${className}`}>
      <Image
        src={image}
        alt=""
        width={640}
        height={640}
        loading="eager"
        className={`${styles["now-playing-image"]} ${imageLoading ? styles["image-loading"] : ""}`}
      />
      <AudioPlayer src={src} />
    </div>
  )
}
