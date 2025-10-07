
import React from 'react';
import type { YouTubeVideo } from '../types';
import YoutubeIcon from './icons/YoutubeIcon';

interface VideoCardProps {
  video: YouTubeVideo;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-slate-800 rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:shadow-sky-500/20 hover:-translate-y-1"
    >
      <div className="relative">
        <img src={video.thumbnailUrl} alt={video.title} className="w-full h-40 object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <YoutubeIcon className="w-12 h-12 text-red-500" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-100 leading-tight group-hover:text-sky-400 transition-colors duration-300" title={video.title}>
          {video.title.length > 60 ? `${video.title.substring(0, 57)}...` : video.title}
        </h3>
        <p className="text-xs text-gray-400 mt-2">{video.channelTitle}</p>
      </div>
    </a>
  );
};

export default VideoCard;
