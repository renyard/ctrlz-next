"use client";

import type { episode } from "@/lib/podcast";

export default function PodcastResults({ items }: { items: episode[] }) {
  console.log({ items });
  return (
    <ul>
      {items.map((item) => (
        <li key={item.episode}>{item.title}</li>
      ))}
    </ul>
  );
}
