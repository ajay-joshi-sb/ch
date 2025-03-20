import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, SkipBack, SkipForward, Headphones, Clock, AudioWaveform } from 'lucide-react';

// Sample call recordings with actual audio files
const callRecordings = [
  {
    id: 1,
    title: "HVAC Service Call",
    audioUrl: "https://dl.sndup.net/d72p/hvac-demo-call.mp3",
    description: "Inbound call for AC repair appointment",
    date: "Oct 15, 2024",
    duration: "2:34",
    icon: "hvac"
  },
  {
    id: 2,
    title: "Plumbing Emergency",
    audioUrl: "https://dl.sndup.net/d72p/hvac-demo-call.mp3",
    description: "After-hours call for water leak",
    date: "Oct 12, 2024",
    duration: "3:12",
    icon: "plumbing"
  },
  {
    id: 3,
    title: "Roofing Estimate",
    audioUrl: "https://dl.sndup.net/d72p/hvac-demo-call.mp3",
    description: "New customer requesting quote",
    date: "Oct 8, 2024",
    duration: "4:05",
    icon: "roofing"
  }
];

const VoiceDemo = () => {
  const [activeRecording, setActiveRecording] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const audioRef = useRef(null);

  const playCallRecording = (index) => {
    setActiveRecording(index);
    if (audioRef.current) {
      audioRef.current.src = callRecordings[index].audioUrl;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed: ", e));
      setIsPlayingAudio(true);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed: ", e));
      }
      setIsPlayingAudio(!isPlayingAudio);
    }
  };

  const previousTrack = () => {
    const newIndex = activeRecording > 0 ? activeRecording - 1 : callRecordings.length - 1;
    playCallRecording(newIndex);
  };

  const nextTrack = () => {
    const newIndex = activeRecording < callRecordings.length - 1 ? activeRecording + 1 : 0;
    playCallRecording(newIndex);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      const handleTimeUpdate = () => {
        if (audioRef.current) {
          setAudioProgress(audioRef.current.currentTime);
        }
      };

      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          setAudioDuration(audioRef.current.duration);
        }
      };

      const handleEnded = () => {
        setIsPlayingAudio(false);
        setAudioProgress(0);
      };

      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, []);

  const handleProgressChange = (e) => {
    const newTime = parseFloat(e.target.value);
    setAudioProgress(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const getIconForService = (iconType) => {
    switch (iconType) {
      case 'hvac':
        return (
          <div className="p-2 bg-blue-500/20 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-blue-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.25 21V3h6.5v18M8 8h8M8 16h8" />
            </svg>
          </div>
        );
      case 'plumbing':
        return (
          <div className="p-2 bg-cyan-500/20 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-cyan-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19V5M5 12h14" />
            </svg>
          </div>
        );
      case 'roofing':
        return (
          <div className="p-2 bg-amber-500/20 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-amber-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9 9 9M5 10v10a2 2 0 002 2h10a2 2 0 002-2V10" />
            </svg>
          </div>
        );
      default:
        return <Headphones className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    
    <div className="bg-gradient-to-b from-[#0a1425] to-[#071018] py-10">
      <div className="text-center mb-8 md:mb-10 lg:mb-12 pt-8">
          <div className="inline-block px-3 py-1 mb-6 text-sm font-medium text-brand-300 bg-brand-900/40 rounded-full reveal-on-scroll border border-brand-700/50">
            Service Demo
          </div>
        </div>
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            AI Voice Agent Demos
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Listen to our AI voice agents handling real customer calls
          </p>
        </div>

        {/* Call Player Section */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-4">
          {/* Left side - Audio Player */}
          <div className="md:col-span-3 bg-[#0f1d30]/70 rounded-xl border border-blue-900/30 overflow-hidden shadow-lg">
            {/* Simplified player */}
            <div className="p-4">
              {/* Title and description */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white">
                  {callRecordings[activeRecording].title}
                </h3>
                <p className="text-sm text-gray-400">
                  {callRecordings[activeRecording].description}
                </p>
              </div>
              
              {/* Progress bar */}
              <div className="mb-3">
                <input 
                  type="range"
                  min="0"
                  max={audioDuration || 100}
                  value={audioProgress}
                  onChange={handleProgressChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{formatTime(audioProgress)}</span>
                  <span>{formatTime(audioDuration)}</span>
                </div>
              </div>
              
              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Volume2 className="h-4 w-4 text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={previousTrack}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <SkipBack className="h-4 w-4" />
                  </button>
                  
                  <button 
                    onClick={toggleAudio}
                    className="p-3 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors"
                  >
                    {isPlayingAudio ? (
                      <Pause className="h-5 w-5 text-white" />
                    ) : (
                      <Play className="h-5 w-5 text-white ml-0.5" />
                    )}
                  </button>
                  
                  <button 
                    onClick={nextTrack}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                  >
                    <SkipForward className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="text-xs text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{callRecordings[activeRecording].duration}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Playlist */}
          <div className="md:col-span-2 bg-[#0f1d30]/70 rounded-xl border border-blue-900/30 overflow-hidden shadow-lg">
            <div className="p-3 border-b border-blue-900/30 flex items-center">
              <Headphones className="w-4 h-4 text-blue-400 mr-1" />
              <h3 className="text-sm font-medium text-white">
                Demo Recordings
              </h3>
            </div>
            
            <div className="p-2">
              {callRecordings.map((recording, index) => (
                <button
                  key={recording.id}
                  onClick={() => playCallRecording(index)}
                  className={`w-full p-2 rounded-lg text-left transition-all mb-1 ${
                    activeRecording === index 
                      ? 'bg-blue-900/40 border border-blue-700/50' 
                      : 'hover:bg-blue-900/20 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {getIconForService(recording.icon)}
                    
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm truncate ${
                        activeRecording === index ? 'text-blue-400' : 'text-white'
                      }`}>
                        {recording.title}
                      </p>
                      <p className="text-xs text-gray-400 truncate">{recording.description}</p>
                    </div>
                    
                    {activeRecording === index && isPlayingAudio && (
                      <AudioWaveform className="h-3 w-3 text-blue-400 animate-pulse" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <audio ref={audioRef} preload="metadata" />
    </div>
  );
};

export default VoiceDemo;