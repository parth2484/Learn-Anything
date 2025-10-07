
export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
}

export interface CourseModule {
  title: string;
  description: string;
  videos: YouTubeVideo[];
}
