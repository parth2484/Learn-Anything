
import React, { useState, useCallback } from 'react';
import type { CourseModule } from './types';
import CourseInput from './components/CourseInput';
import CourseDisplay from './components/CourseDisplay';
import Loader from './components/Loader';
import { generateCourseOutline } from './services/geminiService';
import { searchVideos } from './services/youtubeService';
import RobotIcon from './components/icons/RobotIcon';

const App: React.FC = () => {
  const [topic, setTopic] = useState<string>('');
  const [youtubeApiKey, setYoutubeApiKey] = useState<string>('');
  const [course, setCourse] = useState<CourseModule[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialState, setInitialState] = useState<boolean>(true);
  
  const handleGenerateCourse = useCallback(async () => {
    if (!topic || !youtubeApiKey) {
      setError("Please provide a topic and a YouTube API key.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setCourse(null);
    setInitialState(false);

    try {
      const courseOutline = await generateCourseOutline(topic);
      if (!courseOutline || courseOutline.length === 0) {
        throw new Error("AI could not generate a course outline. Try a different topic.");
      }
      
      const videoSearchPromises = courseOutline.map(module => 
        searchVideos(module.title, youtubeApiKey)
      );
      
      const videoResults = await Promise.all(videoSearchPromises);

      const fullCourse: CourseModule[] = courseOutline.map((module, index) => ({
        ...module,
        videos: videoResults[index],
      }));

      setCourse(fullCourse);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [topic, youtubeApiKey]);

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans p-4 sm:p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl mx-auto">
        <header className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 py-2">
                AI Course Builder
            </h1>
            <p className="text-gray-300 mt-2 max-w-2xl mx-auto">
                Enter any topic, and our AI will generate a structured learning path with curated YouTube videos just for you.
            </p>
        </header>

        <main className="flex flex-col items-center">
            <CourseInput
                topic={topic}
                setTopic={setTopic}
                youtubeApiKey={youtubeApiKey}
                setYoutubeApiKey={setYoutubeApiKey}
                onGenerate={handleGenerateCourse}
                isLoading={isLoading}
            />

            <div className="w-full mt-10">
                {initialState && (
                    <div className="text-center text-slate-500 py-16 flex flex-col items-center">
                        <RobotIcon className="w-16 h-16 mb-4 text-slate-600"/>
                        <p>Your AI-powered learning journey starts here.</p>
                        <p>Enter a topic above to begin.</p>
                    </div>
                )}
                {isLoading && <Loader message="Building your personalized course..." />}
                {error && (
                    <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}
                {course && <CourseDisplay course={course} topic={topic} />}
            </div>
        </main>
      </div>
    </div>
  );
};

export default App;
