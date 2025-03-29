const parseDuration = (duration: string) => {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) {
    return null;
  }

  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  return hours * 3600 + minutes * 60 + seconds;
};

export const getLatestYouTubeVideo = async () => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&channelId=${process.env.YOUTUBE_CHANNEL_ID}&part=snippet,id&order=date&maxResults=50`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  const videoIds = data.items.map((item: any) => item.id.videoId);
  const videoDataRes = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${process.env.YOUTUBE_API_KEY}&id=${videoIds.join(",")}&part=contentDetails,snippet`,
  );

  if (!videoDataRes.ok) {
    throw new Error("Failed to fetch video data");
  }
  const videoData = await videoDataRes.json();

  const latestVideo = videoData.items.find((item: any) => {
    const duration = item.contentDetails.duration;
    const parsedDuration = parseDuration(duration);

    // Match if the video is more than 15 minutes (900 seconds)
    if (parsedDuration && parsedDuration > 60 * 15) {
      return true;
    }
    return false;
  });

  return latestVideo;
};
