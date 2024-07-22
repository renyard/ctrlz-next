"use client";

import fetchJsonp from "fetch-jsonp";
import Image from "next/image";
import { useEffect, useState } from "react";

import defaultImage from "../../images/Radio Artwork.png";
import AudioPlayer from "../audio-player";

import styles from "./live-stream.module.scss";

export default function LiveStream({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  const [image, setImage] = useState(defaultImage);

  useEffect(() => {
    const updateThumbnail = async () => {
      const nowPlaying = fetchJsonp(
        "https://proxy.radiojar.com/api/stations/y25dd250wp3vv/now_playing/",
      ).then(async (res) => {
        const { thumb } = await res.json();

        setImage(thumb || null);
      });
    };

    updateThumbnail();

    const timer = setInterval(updateThumbnail, 10000);
    return () => clearInterval(timer);
  }, []);

  console.log({ image });

  return (
    <div className={styles["stream-container"]}>
      <Image
        src={image}
        alt=""
        width={640}
        height={640}
        loading="eager"
        className={styles["now-playing-image"]}
      />
      <AudioPlayer src={src} />
    </div>
  );
}
