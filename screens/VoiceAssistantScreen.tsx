import React, { useState, useEffect, useRef } from 'react';
import { AppScreen } from '../types';
import { useToast } from '../components/Toast';

interface VoiceAssistantScreenProps {
  onBack: () => void;
  onNavigate: (screen: AppScreen) => void;
}

const VoiceAssistantScreen: React.FC<VoiceAssistantScreenProps> = ({ onBack, onNavigate }) => {
  const { showToast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("I'm listening. Try saying 'Send 10 SUI to Bob'");
  const [vibeScale, setVibeScale] = useState([1, 1, 1, 1, 1]);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize Speech Recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTranscript("Listening for command...");
      };

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const resultTranscript = event.results[current][0].transcript;
        setTranscript(resultTranscript);

        // Dynamic bar animation based on confidence/speech
        setVibeScale(vibeScale.map(() => 0.5 + Math.random() * 2));
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
        showToast(`Speech Error: ${event.error}`, 'error');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        processCommand(transcript);
      };
    } else {
      showToast("Speech recognition not supported in this browser.", "warning");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [showToast]);

  const processCommand = (text: string) => {
    const lowerText = text.toLowerCase();

    // Simple command parsing logic
    if (lowerText.includes('send') || lowerText.includes('pay')) {
      showToast(`Recognized: ${text}`, 'success');
      setTimeout(() => onNavigate(AppScreen.SEND), 1000);
    } else if (lowerText.includes('balance') || lowerText.includes('portfolio')) {
      showToast(`Redirecting to Dashboard`, 'info');
      setTimeout(() => onNavigate(AppScreen.DASHBOARD), 1000);
    } else if (lowerText.includes('fiat') || lowerText.includes('bank')) {
      showToast(`Opening Fiat Dashboard`, 'info');
      setTimeout(() => onNavigate(AppScreen.FIAT_DASHBOARD), 1000);
    } else if (lowerText.includes('setting')) {
      showToast(`Opening Settings`, 'info');
      setTimeout(() => onNavigate(AppScreen.SETTINGS), 1000);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.warn("Recognition already started or error", e);
      }
    }
  };

  useEffect(() => {
    let interval: any;
    if (isListening) {
      interval = setInterval(() => {
        setVibeScale(prev => prev.map(() => 0.5 + Math.random() * 1.5));
      }, 100);
    } else {
      setVibeScale([1, 1, 1, 1, 1]);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  return (
    <div className="bg-background-dark text-white font-display min-h-screen flex flex-col overflow-x-hidden animate-fade-in">
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/5">
        <button onClick={onBack} className="flex items-center justify-center size-11 rounded-2xl bg-white/5 hover:bg-white/10 transition-all active:scale-90 shadow-lg">
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
        <h1 className="text-xl font-black leading-tight tracking-tight uppercase tracking-widest text-primary-light">Voice Core</h1>
        <button onClick={() => showToast('Voice settings', 'info')} className="flex items-center justify-center size-11 rounded-2xl bg-white/5 hover:bg-white/10 transition-all active:scale-90 text-gray-400 shadow-lg">
          <span className="material-symbols-outlined text-2xl font-bold">settings</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8 gap-12">
        <section className="text-center max-w-sm">
          <h2 className={`text-2xl font-black text-white tracking-tight mb-4 transition-all duration-500 ${isListening ? 'scale-110' : ''}`}>AI Financial Assistant</h2>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest leading-relaxed min-h-[4rem]">
            {transcript}
          </p>
        </section>

        <section className="relative flex items-center justify-center h-64 w-full">
          <div className={`absolute inset-0 bg-primary/10 rounded-full blur-3xl transition-opacity duration-1000 ${isListening ? 'opacity-100' : 'opacity-0'}`}></div>

          <div className="flex items-center gap-3 relative z-10">
            {vibeScale.map((scale, i) => (
              <div
                key={i}
                className="w-2 rounded-full bg-gradient-to-t from-blue-600 via-primary to-cyan-400 transition-all duration-100 ease-out"
                style={{ height: `${scale * 60}px` }}
              ></div>
            ))}
          </div>

          <div className={`absolute size-[280px] border border-primary/20 rounded-full transition-all duration-1000 ${isListening ? 'animate-ping opacity-20' : 'opacity-0'}`}></div>
        </section>

        <section className="flex flex-col items-center gap-6 mt-10">
          <button
            onClick={toggleListening}
            className={`size-24 rounded-full flex items-center justify-center shadow-2xl transition-all active:scale-90 relative group ${isListening ? 'bg-red-500 shadow-red-500/30' : 'bg-primary shadow-primary/30'}`}
          >
            <div className={`absolute inset-0 rounded-full bg-white/20 animate-ping ${isListening ? 'block' : 'hidden'}`}></div>
            <span className="material-symbols-outlined text-white text-5xl font-bold relative z-10 transition-transform group-hover:scale-110">
              {isListening ? 'stop' : 'mic'}
            </span>
          </button>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-600 animate-pulse">
            {isListening ? 'Tap to process' : 'Tap to speak'}
          </p>
        </section>
      </main>

      <footer className="p-10 pb-16">
        <div className="bg-surface-dark/40 border border-white/5 rounded-[2rem] p-6 shadow-xl">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">Try Commands</h4>
          <div className="flex flex-wrap gap-2">
            {["Pay Bob 50 SUI", "What's my balance?", "Stake 20 SUI"].map((cmd, i) => (
              <div
                key={i}
                onClick={() => {
                  setTranscript(cmd);
                  processCommand(cmd);
                }}
                className="bg-white/5 hover:bg-white/10 border border-white/5 px-4 py-2 rounded-xl text-[10px] font-bold text-gray-300 cursor-pointer transition-all active:scale-95"
              >
                {cmd}
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VoiceAssistantScreen;
