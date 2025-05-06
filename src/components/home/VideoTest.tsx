'use client';

import React, { useState } from 'react';

const VideoTest = () => {
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const target = e.target as HTMLVideoElement;
    setError(target.error?.message || 'Unknown error');
    console.error('Video error:', target.error);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Video Test</h1>
      
      <div className="mb-4">
        <p className="mb-2">Test with controls:</p>
        <video 
          controls 
          width="100%" 
          height="auto"
          className="max-w-3xl mx-auto border border-gray-300"
          onError={handleError}
          onCanPlay={() => {
            console.log('Video can play');
            setLoaded(true);
          }}
        >
          <source src="/videos/drn-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {loaded && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded mb-4">
          <p>Video loaded successfully!</p>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Troubleshooting:</h2>
        <ul className="list-disc pl-5">
          <li>Make sure the video file exists at public/videos/drn-video.mp4</li>
          <li>Check that the video format is compatible with your browser</li>
          <li>Try converting the video to a different format if needed</li>
          <li>Try reducing the video file size if it's too large</li>
        </ul>
      </div>
    </div>
  );
};

export default VideoTest; 