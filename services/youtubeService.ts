
import type { YouTubeVideo } from '../types';

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

export const searchVideos = async (searchTerm: string, apiKey: string): Promise<YouTubeVideo[]> => {
  if (!apiKey) {
    throw new Error("YouTube API Key is required.");
  }

  const query = `${searchTerm} tutorial for beginners`;
  const url = `${YOUTUBE_API_URL}?part=snippet&q=${encodeURIComponent(query)}&key=${apiKey}&type=video&maxResults=3&videoEmbeddable=true`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      console.error('YouTube API Error:', errorData);
      throw new Error(`YouTube API error: ${errorData.error.message || 'Failed to fetch videos.'}`);
    }
    const data = await response.json();

    return data.items.map((item: any): YouTubeVideo => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails.high.url,
      channelTitle: item.snippet.channelTitle,
    }));
  } catch (error) {
    console.error("Error searching YouTube videos:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to search YouTube videos. ${error.message}`);
    }
    throw new Error("An unknown error occurred while searching for YouTube videos.");
  }
};
