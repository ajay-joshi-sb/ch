import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Volume1, SkipBack, SkipForward, Headphones, Clock, AudioWaveform } from 'lucide-react';

// Sample call recordings with actual audio files
const callRecordings = [
  {
    id: 1,
    title: "Trash Pickup Scheduling",
    audioUrl: "https://storage.googleapis.com/pipeline-generator-website-data/adfghjkl.wav",
    description: "Customer scheduling a large trash pickup",
    // date: "Mar 18, 2025",
    duration: "4:10",
    icon: "junk-removal"
  },
  {
    id: 2,
    title: "Insulation Service Appointment",
    audioUrl: "https://storage.googleapis.com/pipeline-generator-website-data/zxcvbnm.wav",
    description: "Booking professional insulation services",
    // date: "Mar 20, 2025",
    duration: "3:30",
    icon: "insulation"
  },
  {
    id: 3,
    title: "Junk Removal Inquiry",
    audioUrl: "https://storage.googleapis.com/pipeline-generator-website-data/qwertyuiop.wav",
    description: "Customer requesting junk removal service",
    // date: "Mar 25, 2025",
    duration: "2:45",
    icon: "junk-removal"
  },
  
  
];


const VoiceDemo = () => {
  const [activeRecording, setActiveRecording] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [displayDuration, setDisplayDuration] = useState("0:00");
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(80);
  const [waveData, setWaveData] = useState([]);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef(null);
  const volumeSliderRef = useRef(null);
  const animationRef = useRef(null);
  const waveAnimationRef = useRef(null);

  // Generate random wave data once on component mount
  useEffect(() => {
    const generateWaveData = () => {
      // Create 40 bars with random heights for wave visualization
      const newWaveData = Array.from({ length: 40 }, () => 
        Math.random() * 0.8 + 0.2  // Values between 0.2 and 1.0
      );
      setWaveData(newWaveData);
    };

    if (waveData.length === 0) {
      generateWaveData();
    }
  }, [waveData.length]);
  
  // Separate effect for animating the waves - Fix for infinite loop
  useEffect(() => {
    if (isPlayingAudio) {
      const updateWaves = () => {
        setWaveData(prevWaveData => {
          const newWaveData = [...prevWaveData];
          // Update some random bars to create movement
          for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(Math.random() * prevWaveData.length);
            newWaveData[randomIndex] = Math.random() * 0.8 + 0.2;
          }
          return newWaveData;
        });
        waveAnimationRef.current = requestAnimationFrame(updateWaves);
      };
      
      waveAnimationRef.current = requestAnimationFrame(updateWaves);
      
      return () => {
        if (waveAnimationRef.current) {
          cancelAnimationFrame(waveAnimationRef.current);
        }
      };
    }
  }, [isPlayingAudio]); // Only depends on isPlayingAudio

  // Initialize audio on component mount
  useEffect(() => {
    // Initialize audio player with the first recording
    if (audioRef.current && !audioLoaded) {
      audioRef.current.src = callRecordings[activeRecording].audioUrl;
      audioRef.current.load();
      setAudioLoaded(true);
    }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (waveAnimationRef.current) {
        cancelAnimationFrame(waveAnimationRef.current);
      }
    };
  }, [activeRecording, audioLoaded]);

  const playCallRecording = (index) => {
    setActiveRecording(index);
    if (audioRef.current) {
      // Stop current playback
      audioRef.current.pause();
      setIsPlayingAudio(false);
      
      // Load the new audio file
      audioRef.current.src = callRecordings[index].audioUrl;
      audioRef.current.load();
      
      // Set up a listener for when the audio is ready to play
      const playAudio = () => {
        audioRef.current.play()
          .then(() => {
            setIsPlayingAudio(true);
          })
          .catch(e => {
            console.error("Audio play failed: ", e);
            // Fall back to showing mock UI without actual audio
            setIsPlayingAudio(true);
          });
        audioRef.current.removeEventListener('canplaythrough', playAudio);
      };
      
      audioRef.current.addEventListener('canplaythrough', playAudio);
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlayingAudio(true);
        })
        .catch(e => {
          console.error("Audio play failed: ", e);
          // Even if audio fails, toggle the UI state to simulate playback
          setIsPlayingAudio(true);
        });
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
    if (isNaN(seconds) || !isFinite(seconds)) return "0:00";
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
          const duration = audioRef.current.duration;
          setAudioDuration(duration);
          setDisplayDuration(formatTime(duration));
        }
      };

      const handleEnded = () => {
        setIsPlayingAudio(false);
        setAudioProgress(0);
      };

      // Error handling
      const handleError = (e) => {
        console.error("Audio error:", e);
        // Fall back to the duration from the data if loading fails
        const fallbackDuration = parseDuration(callRecordings[activeRecording].duration);
        setAudioDuration(fallbackDuration);
        setDisplayDuration(callRecordings[activeRecording].duration);
      };

      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('error', handleError);

      // Set initial volume
      audioRef.current.volume = volume / 100;

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
          audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
          audioRef.current.removeEventListener('ended', handleEnded);
          audioRef.current.removeEventListener('error', handleError);
        }
      };
    }
  }, [activeRecording]);

  // Parse duration string like "2:34" into seconds
  const parseDuration = (durationStr) => {
    if (!durationStr) return 0;
    const parts = durationStr.split(':');
    if (parts.length === 2) {
      const minutes = parseInt(parts[0], 10);
      const seconds = parseInt(parts[1], 10);
      return minutes * 60 + seconds;
    }
    return 0;
  };

  // Fall back to the recording's duration if audioDuration is not available
  useEffect(() => {
    if (!audioDuration || audioDuration === 0 || isNaN(audioDuration)) {
      const fallbackDuration = parseDuration(callRecordings[activeRecording].duration);
      setAudioDuration(fallbackDuration);
      setDisplayDuration(callRecordings[activeRecording].duration);
    }
  }, [activeRecording, audioDuration]);

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
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        // Unmute - restore previous volume
        setVolume(prevVolume);
        audioRef.current.volume = prevVolume / 100;
      } else {
        // Mute - save current volume first
        setPrevVolume(volume);
        setVolume(0);
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX className="h-4 w-4 text-gray-400" />;
    } else if (volume < 50) {
      return <Volume1 className="h-4 w-4 text-gray-400" />;
    } else {
      return <Volume2 className="h-4 w-4 text-gray-400" />;
    }
  };

  // Calculate completed percentage for color transitions
  const getPlaybackPercentage = () => {
    if (!audioDuration || audioDuration === 0) return 0;
    return (audioProgress / audioDuration) * 100;
  };

  // Function to get color based on playback position
  const getColorForBar = (index, totalBars) => {
    const playbackPercentage = getPlaybackPercentage();
    const barPosition = (index / totalBars) * 100;
    
    // If this bar is before the current playback position, use played color
    if (barPosition <= playbackPercentage) {
      return {
        background: "bg-gradient-to-t from-blue-500 to-cyan-300",
        opacity: "1"
      };
    } else if (barPosition <= playbackPercentage + 10) {
      // Transition zone - currently playing
      return {
        background: "bg-gradient-to-t from-blue-400 to-blue-300", 
        opacity: "0.9"
      };
    } else {
      // Not played yet
      return {
        background: "bg-gradient-to-t from-blue-400/40 to-blue-300/40",
        opacity: "0.5"
      };
    }
  };

  const getIconForService = (iconType) => {
    switch (iconType) {
      case 'junk-removal':
        return (
          <div className="p-2 bg-blue-500/20 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-blue-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.25 21V3h6.5v18M8 8h8M8 16h8" />
            </svg>
          </div>
        );
      case 'insulation':
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
    <div className="w-full bg-gradient-to-b from-[#141428] to-[#1e1e3c] text-white py-20 relative overflow-hidden">
      <div className="text-center mb-8 md:mb-10 lg:mb-12 pt-8">
        <div className="inline-block px-3 py-1 mb-6 text-sm font-medium text-brand-300 bg-brand-900/40 rounded-full border border-brand-700/50">
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
          <div className="md:col-span-3 bg-[#0f1d30]/70 rounded-xl border border-blue-900/30 overflow-hidden shadow-lg backdrop-blur-sm">
            {/* Improved player */}
            <div className="p-5">
              {/* Title and description */}
              <div className="mb-5">
                <h3 className="text-xl font-bold text-white mb-1">
                  {callRecordings[activeRecording].title}
                </h3>
                <p className="text-sm text-gray-400">
                  {callRecordings[activeRecording].description}
                </p>
              </div>
              
              {/* Enhanced Waveform visualization with color-based progress indicator */}
              <div className="mb-4 h-16 bg-blue-900/30 rounded-lg overflow-hidden flex items-center justify-center relative">
                <div className="flex items-center justify-center space-x-0.5 w-full px-4 h-full">
                  {waveData.map((height, i) => {
                    const colorInfo = getColorForBar(i, waveData.length);
                    return (
                      <div 
                        key={i} 
                        className={`w-1 ${colorInfo.background} rounded-full transition-all duration-300`}
                        style={{
                          height: `${isPlayingAudio ? height * 40 : (Math.sin(i/5) * 15 + 5)}px`,
                          opacity: isPlayingAudio ? colorInfo.opacity : 0.5,
                          transform: `scaleY(${isPlayingAudio ? (0.7 + (audioProgress / audioDuration) * 0.3) : 0.7})`,
                        }}
                      ></div>
                    );
                  })}
                </div>
                
                {/* Playback indicator */}
                <div 
                  className="absolute top-0 bottom-0 left-0 border-r border-cyan-400 transition-all duration-100 z-10"
                  style={{ 
                    width: `${getPlaybackPercentage()}%`,
                    display: isPlayingAudio ? 'block' : 'none',
                    boxShadow: "0 0 8px rgba(6, 182, 212, 0.5)"
                  }}
                ></div>
                
                {!isPlayingAudio && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <p className="text-xs text-gray-400">Press play to listen</p>
                  </div>
                )}
              </div>
              
              {/* Progress bar */}
              <div className="mb-4">
                {/* Custom progress bar with color gradient */}
                <div className="relative h-2 w-full bg-gray-700 rounded-lg appearance-none cursor-pointer">
                  <div 
                    className="absolute h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-lg"
                    style={{ width: `${getPlaybackPercentage()}%` }}
                  ></div>
                  <input 
                    type="range"
                    min="0"
                    max={audioDuration || 100}
                    value={audioProgress}
                    onChange={handleProgressChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>{formatTime(audioProgress)}</span>
                  <span>{displayDuration}</span>
                </div>
              </div>
              
              {/* Controls */}
              <div className="flex items-center flex-col gap-4">
                {/* Centered Playback Controls */}
                <div className="flex items-center justify-center w-full gap-5">
                  <button 
                    onClick={previousTrack}
                    className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-blue-900/30"
                  >
                    <SkipBack className="h-5 w-5" />
                  </button>

                  <button 
                    onClick={toggleAudio}
                    className="p-5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full hover:from-blue-500 hover:to-blue-600 transition-colors shadow-lg shadow-blue-900/30 transform hover:scale-105 transition-transform"
                  >
                    {isPlayingAudio ? (
                      <Pause className="h-6 w-6 text-white" />
                    ) : (
                      <Play className="h-6 w-6 text-white ml-0.5" />
                    )}
                  </button>

                  <button 
                    onClick={nextTrack}
                    className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-blue-900/30"
                  >
                    <SkipForward className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Volume and duration section */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 bg-blue-900/20 px-2.5 py-1.5 rounded-full border border-blue-900/40 hover:bg-blue-900/30 transition-colors group">
                    <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
                      {getVolumeIcon()}
                    </button>
                    <div className="relative w-20 h-4 flex items-center group-hover:w-24 transition-all">
                      <input
                        ref={volumeSliderRef}
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      <span className="absolute right-0 top-4 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        {volume}%
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-400 flex items-center bg-blue-900/20 px-2.5 py-1.5 rounded-full border border-blue-900/40">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{displayDuration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Playlist */}
          <div className="md:col-span-2 bg-[#0f1d30]/70 rounded-xl border border-blue-900/30 overflow-hidden shadow-lg backdrop-blur-sm">
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
                  className={`w-full p-2.5 rounded-lg text-left transition-all mb-1.5 ${
                    activeRecording === index 
                      ? 'bg-blue-900/40 border border-blue-700/50 shadow-md' 
                      : 'hover:bg-blue-900/20 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {getIconForService(recording.icon)}
                    
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm truncate ${
                        activeRecording === index ? 'text-blue-400' : 'text-white'
                      }`}>
                        {recording.title}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400 truncate">{recording.description}</p>
                        {/* <p className="text-xs text-gray-500">{recording.date}</p> */}
                      </div>
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