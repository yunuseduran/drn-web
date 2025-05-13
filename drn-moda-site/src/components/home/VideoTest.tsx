'use client';

import React, { useState, useRef, useEffect } from 'react';

const VideoTest = () => {
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [videoInfo, setVideoInfo] = useState<{[key: string]: string}>({});
  const [selectedVideo, setSelectedVideo] = useState('/videos/drn-video-2.mp4');
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const handleError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const target = e.target as HTMLVideoElement;
    setError(target.error?.message || 'Unknown error');
    console.error('Video error:', target.error);
    
    // Try to get more detailed information about the error
    if (target.error) {
      const errorDetails: {[key: string]: string} = {
        'Error Code': target.error.code.toString(),
        'Error Message': target.error.message,
      };
      setVideoInfo({...videoInfo, ...errorDetails});
    }
  };
  
  // Gather detailed information about the video element
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Basic video properties
      setVideoInfo({
        'readyState': video.readyState.toString(),
        'networkState': video.networkState.toString(),
        'preload': video.preload,
        'currentSrc': video.currentSrc || 'None',
        'src attribute': video.getAttribute('src') || 'None (using source tags)',
        'Browser': navigator.userAgent,
        'Selected Video': selectedVideo,
      });
      
      // Check if file exists via fetch for the default smaller video
      fetch('/videos/drn-video-2.mp4', { method: 'HEAD' })
        .then(response => {
          if (response.ok) {
            setVideoInfo(info => ({
              ...info,
              'Small MP4 File': 'Exists (server returned 200 OK)',
              'Small MP4 Content-Type': response.headers.get('content-type') || 'unknown',
              'Small MP4 Content-Length': response.headers.get('content-length') || 'unknown'
            }));
          } else {
            setVideoInfo(info => ({
              ...info,
              'Small MP4 File': `Not found (server returned ${response.status})`,
            }));
          }
        })
        .catch(err => {
          setVideoInfo(info => ({
            ...info,
            'Small MP4 File': `Error checking file: ${err.message}`,
          }));
        });
      
      // Check if file exists via fetch for the larger video
      fetch('/videos/drn-video.mp4', { method: 'HEAD' })
        .then(response => {
          if (response.ok) {
            setVideoInfo(info => ({
              ...info,
              'Large MP4 File': 'Exists (server returned 200 OK)',
              'Large MP4 Content-Type': response.headers.get('content-type') || 'unknown',
              'Large MP4 Content-Length': response.headers.get('content-length') || 'unknown'
            }));
          } else {
            setVideoInfo(info => ({
              ...info,
              'Large MP4 File': `Not found (server returned ${response.status})`,
            }));
          }
        })
        .catch(err => {
          setVideoInfo(info => ({
            ...info,
            'Large MP4 File': `Error checking file: ${err.message}`,
          }));
        });
    }
  }, [selectedVideo]);

  const switchVideo = (src: string) => {
    setSelectedVideo(src);
    setLoaded(false);
    setError(null);
    
    if (videoRef.current) {
      // Kaynak etiketlerini güncellemek için
      const videoElement = videoRef.current;
      const sourceElements = videoElement.getElementsByTagName('source');
      
      if (sourceElements.length > 0) {
        sourceElements[0].src = src;
        sourceElements[0].type = src.endsWith('.webm') ? 'video/webm' : 'video/mp4';
      }
      
      videoElement.load();
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Video Test</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Select Video Source:</h2>
        <div className="flex space-x-4 mb-4">
          <button 
            onClick={() => switchVideo('/videos/drn-video-2.webm')}
            className={`px-4 py-2 rounded ${selectedVideo === '/videos/drn-video-2.webm' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Small Video (WebM - 4.1MB)
          </button>
          <button 
            onClick={() => switchVideo('/sample-video.mp4')}
            className={`px-4 py-2 rounded ${selectedVideo === '/sample-video.mp4' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            Sample MP4 Video
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="mb-2">Testing: <strong>{selectedVideo}</strong></p>
        <div className="max-w-3xl mx-auto border border-gray-300">
          <video 
            ref={videoRef}
            controls 
            width="100%" 
            height="auto"
            className="w-full"
            onError={handleError}
            onCanPlay={() => {
              console.log('Video can play');
              setLoaded(true);
              
              // Update video information after it can play
              if (videoRef.current) {
                const video = videoRef.current;
                setVideoInfo(info => ({
                  ...info,
                  'Video Width': `${video.videoWidth}px`,
                  'Video Height': `${video.videoHeight}px`,
                  'Video Duration': `${video.duration.toFixed(2)} seconds`,
                  'Can Play': 'Yes',
                }));
              }
            }}
          >
            <source src={selectedVideo} type={selectedVideo.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
            Tarayıcınız video etiketini desteklemiyor.
          </video>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded mb-4">
          <p className="font-bold">Error Loading {selectedVideo}:</p>
          <p>{error}</p>
        </div>
      )}

      {loaded && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded mb-4">
          <p><strong>{selectedVideo}</strong> loaded successfully!</p>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Video Information:</h2>
        <div className="bg-white p-4 rounded border border-gray-200">
          <table className="w-full">
            <tbody>
              {Object.entries(videoInfo).map(([key, value]) => (
                <tr key={key} className="border-b border-gray-100">
                  <td className="font-semibold py-2 pr-4">{key}:</td>
                  <td className="py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Troubleshooting:</h2>
        <ul className="list-disc pl-5">
          <li>Try using the smaller video file (drn-video-2.mp4) for faster loading</li>
          <li>Make sure your server correctly serves video files with proper MIME types</li>
          <li>Check if your browser supports the video format (MP4/WebM)</li>
          <li>The large video file (90MB) may timeout on slower connections</li>
          <li>If experiencing AbortError, it could be due to promise handling when playing/pausing</li>
          <li>Try disabling browser extensions that might be blocking video content</li>
          <li>Clear browser cache if videos worked previously but don't now</li>
        </ul>
      </div>
    </div>
  );
};

export default VideoTest; 