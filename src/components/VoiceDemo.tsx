import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Volume1, SkipBack, SkipForward, Headphones, Clock, AudioWaveform } from 'lucide-react';

const callRecordings = [
  {
    id: 1,
    title: "HVAC Service Call",
    audioUrl: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
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

  useEffect(() => {
    const generateWaveData = () => {
      const newWaveData = Array.from({ length: 40 }, () => 
        Math.random() * 0.8 + 0.2
      );
      setWaveData(newWaveData);
    };

    if (waveData.length === 0) {
      generateWaveData();
    }
  }, [waveData.length]);
  
  useEffect(() => {
    if (isPlayingAudio) {
      const updateWaves = () => {
        setWaveData(prevWaveData => {
          const newWaveData = [...prevWaveData];
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
  }, [isPlayingAudio]);

  useEffect(() => {
    if (audioRef.current && !audioLoaded) {
      audioRef.current.src = callRecordings[activeRecording].audioUrl;
      audioRef.current.load();
      setAudioLoaded(true);
    }

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
      audioRef.current.pause();
      setIsPlayingAudio(false);
      
      audioRef.current.src = callRecordings[index].audioUrl;
      audioRef.current.load();
      
      const playAudio = () => {
        audioRef.current.play()
          .then(() => {
            setIsPlayingAudio(true);
          })
          .catch(e => {
            console.error("Audio play failed: ", e);
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

      const handleError = (e) => {
        console.error("Audio error:", e);
        const fallbackDuration = parseDuration(callRecordings[activeRecording].duration);
        setAudioDuration(fallbackDuration);
        setDisplayDuration(callRecordings[activeRecording].duration);
      };

      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleEnded);
      audioRef.current.addEventListener('error', handleError);

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
        setVolume(prevVolume);
        audioRef.current.volume = prevVolume / 100;
      } else {
        setPrevVolume(volume);
        setVolume(0);
        audioRef.current.volume = 0;
      }
      setIsMuted(!isMuted);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <VolumeX className="h-4 w-4 text-muted-foreground" />;
    } else if (volume < 50) {
      return <Volume1 className="h-4 w-4 text-muted-foreground" />;
    } else {
      return <Volume2 className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPlaybackPercentage = () => {
    if (!audioDuration || audioDuration === 0) return 0;
    return (audioProgress / audioDuration) * 100;
  };

  const getColorForBar = (index, totalBars) => {
    const playbackPercentage = getPlaybackPercentage();
    const barPosition = (index / totalBars) * 100;
    
    if (barPosition <= playbackPercentage) {
      return {
        background: "bg-primary",
        opacity: "1"
      };
    } else if (barPosition <= playbackPercentage + 10) {
      return {
        background: "bg-primary/80", 
        opacity: "0.9"
      };
    } else {
      return {
        background: "bg-primary/20",
        opacity: "0.5"
      };
    }
  };

  const getIconForService = (iconType) => {
    switch (iconType) {
      case 'hvac':
        return (
          <div className="p-2 bg-primary/20 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.25 21V3h6.5v18M8 8h8M8 16h8" />
            </svg>
          </div>
        );
      case 'plumbing':
        return (
          <div className="p-2 bg-primary/20 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19V5M5 12h14" />
            </svg>
          </div>
        );
      case 'roofing':
        return (
          <div className="p-2 bg-primary/20 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9 9 9M5 10v10a2 2 0 002 2h10a2 2 0 002-2V10" />
            </svg>
          </div>
        );
      default:
        return <Headphones className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="bg-background py-10">
      <div className="text-center mb-8 md:mb-10 lg:mb-12 pt-8">
        <div className="inline-block px-3 py-1 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/30">
          Service Demo
        </div>
      </div>
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-foreground">
            AI Voice Agent Demos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Listen to our AI voice agents handling real customer calls
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-4">
          <div className="md:col-span-3 bg-card/70 rounded-xl border border-border overflow-hidden shadow-lg backdrop-blur-sm">
            <div className="p-5">
              <div className="mb-5">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {callRecordings[activeRecording].title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {callRecordings[activeRecording].description}
                </p>
              </div>
              
              <div className="mb-4 h-16 bg-card/30 rounded-lg overflow-hidden flex items-center justify-center relative">
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
                
                <div 
                  className="absolute top-0 bottom-0 left-0 border-r border-primary transition-all duration-100 z-10"
                  style={{ 
                    width: `${getPlaybackPercentage()}%`,
                    display: isPlayingAudio ? 'block' : 'none',
                    boxShadow: "0 0 8px var(--primary)"
                  }}
                ></div>
                
                {!isPlayingAudio && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/40">
                    <p className="text-xs text-muted-foreground">Press play to listen</p>
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <div className="relative h-2 w-full bg-muted rounded-lg appearance-none cursor-pointer">
                  <div 
                    className="absolute h-full bg-primary rounded-lg"
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
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{formatTime(audioProgress)}</span>
                  <span>{displayDuration}</span>
                </div>
              </div>
              
              <div className="flex items-center flex-col gap-4">
                <div className="flex items-center justify-center w-full gap-5">
                  <button 
                    onClick={previousTrack}
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent"
                  >
                    <SkipBack className="h-5 w-5" />
                  </button>

                  <button 
                    onClick={toggleAudio}
                    className="p-5 bg-primary rounded-full hover:bg-primary/90 transition-colors shadow-lg transform hover:scale-105 transition-transform"
                  >
                    {isPlayingAudio ? (
                      <Pause className="h-6 w-6 text-primary-foreground" />
                    ) : (
                      <Play className="h-6 w-6 text-primary-foreground ml-0.5" />
                    )}
                  </button>

                  <button 
                    onClick={nextTrack}
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-accent"
                  >
                    <SkipForward className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 bg-accent/20 px-2.5 py-1.5 rounded-full border border-border hover:bg-accent/30 transition-colors group">
                    <button onClick={toggleMute} className="text-muted-foreground hover:text-foreground transition-colors">
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
                        className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <span className="absolute right-0 top-4 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                        {volume}%
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground flex items-center bg-accent/20 px-2.5 py-1.5 rounded-full border border-border">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{displayDuration}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2 bg-card/70 rounded-xl border border-border overflow-hidden shadow-lg backdrop-blur-sm">
            <div className="p-3 border-b border-border flex items-center">
              <Headphones className="w-4 h-4 text-primary mr-1" />
              <h3 className="text-sm font-medium text-foreground">
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
                      ? 'bg-accent border border-border shadow-md' 
                      : 'hover:bg-accent/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {getIconForService(recording.icon)}
                    
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium text-sm truncate ${
                        activeRecording === index ? 'text-primary' : 'text-foreground'
                      }`}>
                        {recording.title}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground truncate">{recording.description}</p>
                        <p className="text-xs text-muted-foreground">{recording.date}</p>
                      </div>
                    </div>
                    
                    {activeRecording === index && isPlayingAudio && (
                      <AudioWaveform className="h-3 w-3 text-primary animate-pulse" />
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