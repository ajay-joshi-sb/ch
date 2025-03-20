import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Mic, PhoneCall, List, Calendar, FileText, CheckCircle } from 'lucide-react';
import CTAButton from './CTAButton';
import { toast } from "@/hooks/use-toast";

// Sample call recordings with actual audio files
const callRecordings = [
  {
    id: 1,
    title: "HVAC Service Call",
    audioUrl: "https://dl.sndup.net/d72p/hvac-demo-call.mp3", 
    description: "Inbound call for AC repair appointment",
    duration: "2:34"
  },
  {
    id: 2,
    title: "Plumbing Emergency",
    audioUrl: "https://dl.sndup.net/d72p/hvac-demo-call.mp3", 
    description: "After-hours call for water leak",
    duration: "3:12"
  },
  {
    id: 3,
    title: "Roofing Estimate",
    audioUrl: "https://dl.sndup.net/d72p/hvac-demo-call.mp3", 
    description: "New customer requesting quote",
    duration: "4:05"
  }
];

const VoiceDemo = () => {
  const [activeTab, setActiveTab] = useState<'demo' | 'recordings'>('demo');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [demoRequested, setDemoRequested] = useState(false);
  const [activeRecording, setActiveRecording] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and formatting characters
    const value = e.target.value.replace(/[^\d\s\-\(\)]/g, '');
    setPhoneNumber(value);
  };

  const startDemo = () => {
    if (!phoneNumber || phoneNumber.replace(/[\s\-\(\)]/g, '').length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setDemoRequested(true);
    // In a real app, this would connect to a voice API
    toast({
      title: "Demo Requested",
      description: `We'll be calling you at ${phoneNumber} shortly to demonstrate our AI voice agent.`,
      variant: "default"
    });
  };

  const resetDemo = () => {
    setDemoRequested(false);
    setPhoneNumber('');
  };

  const playCallRecording = (index: number) => {
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  // Update audio progress
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

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setAudioProgress(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="mt-8 max-w-5xl mx-auto reveal-on-scroll" style={{ transitionDelay: '500ms' }}>
    <div className="bg-gradient-to-b from-black/50 to-black/40 rounded-xl overflow-hidden relative border border-brand-900/60">
      {/* Tabs navigation */}
      <div className="flex border-b border-brand-900/60">
        <button 
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors focus:outline-none ${
            activeTab === 'demo' 
              ? 'bg-brand-600/20 text-white border-b-2 border-brand-600' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
          onClick={() => setActiveTab('demo')}
        >
          Try Voice Agent Demo
        </button>
        <button 
          className={`flex-1 py-4 px-6 text-center font-medium transition-colors focus:outline-none ${
            activeTab === 'recordings' 
              ? 'bg-brand-600/20 text-white border-b-2 border-brand-600' 
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
          onClick={() => setActiveTab('recordings')}
        >
          Listen to Call Recordings
        </button>
      </div>

      {/* Demo Tab Content */}
      {activeTab === 'demo' && (
        <div className="p-8">
          {!demoRequested ? (
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 bg-brand-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <PhoneCall className="h-10 w-10 text-brand-500" />
              </div>
              
              <h3 className="text-2xl font-medium text-white mb-4">Experience Our AI Voice Agent</h3>
              <p className="text-gray-300 mb-8">
                Enter your phone number below and our AI voice agent will call you for a live demonstration of how it handles service inquiries and scheduling.
              </p>
              
              <div className="mb-6">
                <label htmlFor="phoneNumber" className="block text-left text-sm font-medium text-gray-300 mb-2">
                  Your Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 bg-black/30 border border-brand-700/50 rounded-md text-white placeholder-gray-500 focus:border-brand-500 focus:ring focus:ring-brand-500/20 focus:outline-none transition-colors"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </div>
              
              <CTAButton 
                variant="primary" 
                size="lg" 
                className="w-full max-w-xs mx-auto"
                onClick={startDemo}
              >
                Start Demo Call
              </CTAButton>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/20 p-4 rounded-lg border border-brand-700/30">
                  <div className="text-brand-400 mb-2">
                    <Mic className="h-5 w-5 mx-auto mb-2" />
                    <h4 className="font-medium">Natural Conversation</h4>
                  </div>
                  <p className="text-sm text-gray-400">Our AI understands context and responds naturally</p>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-brand-700/30">
                  <div className="text-brand-400 mb-2">
                    <Calendar className="h-5 w-5 mx-auto mb-2" />
                    <h4 className="font-medium">Real-time Scheduling</h4>
                  </div>
                  <p className="text-sm text-gray-400">Book appointments directly in your calendar system</p>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-brand-700/30">
                  <div className="text-brand-400 mb-2">
                    <FileText className="h-5 w-5 mx-auto mb-2" />
                    <h4 className="font-medium">Detailed Call Summary</h4>
                  </div>
                  <p className="text-sm text-gray-400">Get full transcripts and action items</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-lg mx-auto text-center p-8">
              <div className="w-20 h-20 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <PhoneCall className="h-10 w-10 text-brand-500" />
              </div>
              
              <h3 className="text-2xl font-medium text-white mb-4">Demo Call Requested</h3>
              <p className="text-gray-300 mb-8">
                Thank you! Our AI voice agent will call you at {phoneNumber} shortly. 
                The demo will show you how our system handles service inquiries and schedules appointments.
              </p>
              
              <div className="bg-black/30 p-6 rounded-lg border border-brand-700/50 mb-8">
                <h4 className="text-white font-medium mb-2">What to expect on your demo call:</h4>
                <ul className="text-left space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-brand-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">Our AI will introduce itself as your PipelineGenerator assistant</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-brand-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">It will ask about your service needs and collect details</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-brand-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">It will offer appointment options and confirm scheduling</span>
                  </li>
                </ul>
              </div>
              
              <CTAButton 
                variant="subtle" 
                onClick={resetDemo}
                className="w-full max-w-xs mx-auto"
              >
                Reset Demo
              </CTAButton>
            </div>
          )}
        </div>
      )}

      {/* Recordings Tab Content */}
      {activeTab === 'recordings' && (
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-medium text-white mb-4">Listen to Real Call Recordings</h3>
            <p className="text-gray-300 text-sm mb-6">
              Hear how our AI voice agents handle real inquiries from home service customers
            </p>
            
            <div className="bg-black/20 p-5 rounded-lg border border-brand-700/50 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-4">
                <div className="bg-brand-600/20 p-3 rounded-full flex items-center justify-center">
                  <PhoneCall className="h-6 w-6 text-brand-400" />
                </div>
                
                <div className="flex-grow">
                  <h4 className="text-white font-medium mb-1">{callRecordings[activeRecording].title}</h4>
                  <p className="text-gray-400 text-sm">{callRecordings[activeRecording].description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 w-full">
                <button 
                  onClick={toggleAudio}
                  className="bg-brand-600 rounded-full p-3 hover:bg-brand-700 flex-shrink-0 transition-colors"
                >
                  {isPlayingAudio ? (
                    <Pause size={22} className="text-white" />
                  ) : (
                    <Play size={22} className="text-white ml-0.5" />
                  )}
                </button>
                
                <div className="w-full flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <input 
                      type="range"
                      min="0"
                      max={audioDuration || 100}
                      value={audioProgress}
                      onChange={handleProgressChange}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-600"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 px-1">
                    <span>{formatTime(audioProgress)}</span>
                    <span>{formatTime(audioDuration)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <audio ref={audioRef} preload="metadata" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {callRecordings.map((recording, index) => (
                <div 
                  key={recording.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all hover:bg-brand-600/10 ${
                    activeRecording === index 
                      ? 'bg-brand-600/30 border border-brand-500/70' 
                      : 'bg-black/30 border border-brand-700/30'
                  }`}
                  onClick={() => playCallRecording(index)}
                >
                  <div className="flex items-center">
                    <div className="mr-3">
                      {activeRecording === index && isPlayingAudio ? (
                        <div className="w-8 h-8 flex items-center justify-center">
                          <span className="animate-pulse text-brand-400">▶</span>
                        </div>
                      ) : (
                        <div className="w-8 h-8 flex items-center justify-center">
                          <Play size={16} className="text-brand-400" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{recording.title}</p>
                      <div className="flex text-xs text-gray-400">
                        <span>{recording.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Integrations Banner - Highlighted at the bottom */}
      <div className="bg-brand-600/30 border-t border-brand-500/40 p-5">
        <div className="text-center">
          <h4 className="text-lg font-medium text-white mb-4">Seamlessly Integrates With Your Tools</h4>
          
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <span className="px-3 py-2 bg-brand-900/50 rounded-lg text-sm text-white border border-brand-700/50">
              HouseCallPro
            </span>
            <span className="px-3 py-2 bg-brand-900/50 rounded-lg text-sm text-white border border-brand-700/50">
              ServiceTitan
            </span>
            <span className="px-3 py-2 bg-brand-900/50 rounded-lg text-sm text-white border border-brand-700/50">
              Jobber
            </span>
            <span className="px-3 py-2 bg-brand-900/50 rounded-lg text-sm text-white border border-brand-700/50">
              Acculynx
            </span>
            <span className="px-3 py-2 bg-brand-900/50 rounded-lg text-sm text-white border border-brand-700/50">
              Calendly
            </span>
            <span className="px-3 py-2 bg-brand-900/50 rounded-lg text-sm text-white border border-brand-700/50">
              Google Calendar
            </span>
          </div>
          
          <CTAButton 
            variant="primary"
            size="md"
            icon
            className="mt-2"
            onClick={() => window.location.href = '#features'}
          >
            See All Features
          </CTAButton>
        </div>
      </div>
    </div>
    </div>
  );
};

export default VoiceDemo;
