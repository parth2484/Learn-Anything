
import React from 'react';
import RobotIcon from './icons/RobotIcon';

interface CourseInputProps {
  topic: string;
  setTopic: (topic: string) => void;
  youtubeApiKey: string;
  setYoutubeApiKey: (key: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const CourseInput: React.FC<CourseInputProps> = ({ topic, setTopic, youtubeApiKey, setYoutubeApiKey, onGenerate, isLoading }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-2xl">
      <div className="space-y-6">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-sky-300 mb-2">
            What do you want to learn?
          </label>
          <input
            type="text"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Quantum Computing"
            className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="youtube-api-key" className="block text-sm font-medium text-sky-300 mb-2">
            YouTube API Key
          </label>
          <input
            type="password"
            id="youtube-api-key"
            value={youtubeApiKey}
            onChange={(e) => setYoutubeApiKey(e.target.value)}
            placeholder="Enter your YouTube Data API v3 key"
            className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-300"
            disabled={isLoading}
          />
           <p className="text-xs text-gray-400 mt-2">Your key is used only for this session and is not stored.</p>
        </div>
        <button
          onClick={onGenerate}
          disabled={isLoading || !topic || !youtubeApiKey}
          className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-75 shadow-lg"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <RobotIcon className="mr-2 h-5 w-5" />
              Generate Course
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CourseInput;
