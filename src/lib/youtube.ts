// Latest-videos lookup via the channel's public RSS feed (no API key).
// Runs at build time, so the homepage updates on every deploy.

export const CHANNEL_ID = 'UCEjCsipUYL_KG2xeGpWfq_A';
export const CHANNEL_URL = 'https://www.youtube.com/@whyteguh';

export interface LatestVideo {
  title: string;
  url: string;
  thumb: string;
  published: Date;
}

const decode = (s: string) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

export async function fetchLatestVideos(count = 3): Promise<LatestVideo[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`);
    if (!res.ok) return [];
    const xml = await res.text();

    const videos: LatestVideo[] = [];
    for (const [, entry] of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
      const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
      const url = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1];
      const thumb = entry.match(/<media:thumbnail url="([^"]+)"/)?.[1];
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
      if (!title || !url || !thumb) continue;
      videos.push({ title: decode(title), url, thumb, published: new Date(published ?? Date.now()) });
      if (videos.length >= count) break;
    }
    return videos;
  } catch {
    return [];
  }
}
