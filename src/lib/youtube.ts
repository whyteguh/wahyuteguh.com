// Latest-videos lookup. Primary: the channel's public RSS feed (has publish
// dates). Fallback: parse the channel /videos page when YouTube's RSS
// endpoint bot-detects the request (it answers 500/404 from shared cloud
// IPs like Vercel's, while the normal channel page 200s to any client).
// Runs at build time, so the homepage updates on every deploy.

export const CHANNEL_ID = 'UCEjCsipUYL_KG2xeGpWfq_A';
export const CHANNEL_URL = 'https://www.youtube.com/@whyteguh';

export interface LatestVideo {
  title: string;
  url: string;
  thumb: string;
  /** Publish date; absent on the /videos fallback, which doesn't expose it. */
  published?: Date;
}

const decode = (s: string) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const VIDEOS_URL = 'https://www.youtube.com/@whyteguh/videos';

async function fetchText(url: string): Promise<string> {
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Go-http-client/2.0' },
        signal: AbortSignal.timeout(12000),
      });
      const text = await res.text();
      if (res.ok) return text;
    } catch (e) {
      /* keep trying */
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  return '';
}

async function fromFeed(count: number): Promise<LatestVideo[]> {
  const xml = await fetchText(FEED_URL);
  if (!xml.trim().startsWith('<?xml')) return [];

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
}

function walk(node: unknown, fn: (v: Record<string, unknown>) => void): void {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    for (const item of node) walk(item, fn);
    return;
  }
  const obj = node as Record<string, unknown>;
  fn(obj);
  for (const value of Object.values(obj)) walk(value, fn);
}

// Fallback: the /videos page embeds ytInitialData with a shorts shelf. Each
// shortsLockupViewModel carries videoId, title and a thumbnail.
async function fromChannelPage(count: number): Promise<LatestVideo[]> {
  const html = await fetchText(VIDEOS_URL);
  const m = html.match(/var ytInitialData = (\{.*?\});<\/script>/s);
  if (!m) return [];
  let data: unknown;
  try {
    data = JSON.parse(m[1]);
  } catch {
    return [];
  }

  const videos: LatestVideo[] = [];
  const seen = new Set<string>();
  walk(data, (obj) => {
    if (videos.length >= count) return;
    const s = obj.shortsLockupViewModel as
      | Record<string, unknown>
      | undefined;
    if (!s) return;
    const endpoint = (s.onTap as Record<string, unknown> | undefined)
      ?.innertubeCommand as Record<string, unknown> | undefined;
    const reel = endpoint?.reelWatchEndpoint as
      | Record<string, unknown>
      | undefined;
    const videoId = typeof reel?.videoId === 'string' ? reel.videoId : '';
    const title = (
      (s.overlayMetadata as Record<string, unknown> | undefined)
        ?.primaryText as Record<string, unknown> | undefined
    )?.content;
    if (!videoId || typeof title !== 'string' || seen.has(videoId)) return;
    seen.add(videoId);
    videos.push({
      title,
      url: `https://www.youtube.com/shorts/${videoId}`,
      thumb: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    });
  });
  return videos;
}

export async function fetchLatestVideos(count = 3): Promise<LatestVideo[]> {
  const fromRss = await fromFeed(count);
  if (fromRss.length > 0) return fromRss;
  return fromChannelPage(count);
}
