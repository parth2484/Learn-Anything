
import React from 'react';
import type { CourseModule } from '../types';
import VideoCard from './VideoCard';

interface CourseDisplayProps {
  course: CourseModule[];
  topic: string;
}

const CourseDisplay: React.FC<CourseDisplayProps> = ({ course, topic }) => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-12 space-y-12">
      <h2 className="text-3xl font-bold text-center text-white capitalize">
        Your Learning Path for <span className="text-sky-400">{topic}</span>
      </h2>
      
      {course.map((module, index) => (
        <div key={index} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700">
          <div className="mb-6 border-b border-slate-700 pb-4">
            <h3 className="text-2xl font-semibold text-sky-300">
              Module {index + 1}: {module.title}
            </h3>
            <p className="text-gray-300 mt-2">{module.description}</p>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-4">Recommended Videos:</h4>
            {module.videos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {module.videos.map(video => (
                    <VideoCard key={video.id} video={video} />
                ))}
                </div>
            ) : (
                <p className="text-gray-400">No videos found for this module.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseDisplay;
