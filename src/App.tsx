import { useState, useMemo, useEffect } from 'react';
import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';
import { Result } from './pages/Result';
import { Gallery } from './pages/Gallery';
import { MemeArchive } from './pages/MemeArchive';
import { Option, QuizResult } from './types';
import { getResult } from './utils/mbti';
import { saveResultToHistory } from './utils/storage';
import characters from './data/characters.json';
import archetypes from './data/archetypes.json';
import { Character, Archetype } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Lock, Eye } from 'lucide-react';

type Screen = 'home' | 'quiz' | 'result' | 'gallery' | 'memes' | 'boot';

export default function App() {
  const [screen, setScreen] = useState<Screen>('boot');
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    if (screen === 'boot') {
      const timer = setTimeout(() => setScreen('home'), 2800);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const handleQuizComplete = (answers: Option[]) => {
    const finalResult = getResult(
      answers, 
      characters as Character[], 
      archetypes as Archetype[]
    );
    saveResultToHistory(finalResult);
    setResult(finalResult);
    setScreen('result');
  };

  const handleReset = () => {
    setResult(null);
    setScreen('home');
  };

  return (
    <div className="selection:bg-orange-500/30 selection:text-white pb-20">
      <AnimatePresence mode="wait">
        {screen === 'boot' && <BootSequence key="boot" />}
      </AnimatePresence>

      {screen === 'home' && (
        <Home 
          onStart={() => setScreen('quiz')} 
          onViewGallery={() => setScreen('gallery')} 
        />
      )}

      {screen === 'quiz' && (
        <Quiz 
          onComplete={handleQuizComplete} 
          onExit={handleReset} 
        />
      )}

      {screen === 'result' && result && (
        <Result 
          result={result} 
          onReset={handleReset} 
          onViewGallery={() => setScreen('gallery')}
        />
      )}

      {screen === 'gallery' && (
        <Gallery 
          onBack={() => setScreen('home')} 
          onSelectHistory={(res) => {
            setResult(res);
            setScreen('result');
          }}
        />
      )}

      {screen === 'memes' && (
        <MemeArchive onBack={() => setScreen('home')} />
      )}

      {/* Persistent Navigation for Prototype */}
      {screen !== 'quiz' && screen !== 'boot' && (
         <nav className="fixed bottom-0 left-0 right-0 bg-zinc-950/80 border-t border-white/5 p-2 flex justify-center gap-6 z-[100] backdrop-blur-xl">
            <button onClick={() => setScreen('home')} className={`px-4 py-2 font-mono text-[10px] tracking-tighter transition-colors ${screen === 'home' ? 'text-orange-500' : 'text-zinc-600'}`}>HOME</button>
            <button onClick={() => setScreen('gallery')} className={`px-4 py-2 font-mono text-[10px] tracking-tighter transition-colors ${screen === 'gallery' ? 'text-orange-500' : 'text-zinc-600'}`}>PERSONNEL_DATABASE</button>
            <button onClick={() => setScreen('memes')} className={`px-4 py-2 font-mono text-[10px] tracking-tighter transition-colors ${screen === 'memes' ? 'text-orange-500' : 'text-zinc-600'}`}>MEME_REPOSITORY</button>
         </nav>
      )}
    </div>
  );
}

const BootSequence = () => {
  const [lines, setLines] = useState<string[]>([]);
  const logData = [
    "INITIALIZING_DFTI_KERNEL_v4.5...",
    "ESTABLISHING_ENCRYPTED_UPLINK...",
    "DECRYPTING_SECURE_PROTOCOLS...",
    "LOADING_PSYCH_PROFILES...",
    "SCANNING_FACIAL_METRICS [OK]",
    "ANALYZING_BATTLEFIELD_DATA [OK]",
    "ACCESS_GRANTED_LEVEL_5",
  ];

  useEffect(() => {
    logData.forEach((line, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, i * 300);
    });
  }, []);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
      className="fixed inset-0 z-[1000] bg-[#09090b] flex flex-col items-center justify-center p-6 font-mono"
    >
      <div className="w-full max-w-sm space-y-6">
        <div className="flex justify-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-orange-500/10 border border-orange-500/30 rounded-2xl flex items-center justify-center relative overflow-hidden"
          >
            <Shield className="w-10 h-10 text-orange-500" />
            <motion.div 
               animate={{ top: ['0%', '100%'] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
               className="absolute inset-x-0 h-px bg-orange-500 shadow-[0_0_10px_white]"
            />
          </motion.div>
        </div>

        <div className="space-y-1.5 min-h-[180px]">
          {lines.map((line, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[10px] text-orange-500/80 tracking-wider flex items-center gap-2"
            >
              <span className="text-[8px] opacity-30">{">"}</span>
              {line}
            </motion.div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex items-center justify-between text-zinc-700 text-[8px] uppercase tracking-widest font-black italic">
          <div className="flex items-center gap-1.5"><Lock className="w-2 h-2" /> Encrypted</div>
          <div className="flex items-center gap-1.5"><Eye className="w-2 h-2" /> Stealth</div>
          <div className="flex items-center gap-1.5"><Terminal className="w-2 h-2" /> Kernel_4.12</div>
        </div>
      </div>
    </motion.div>
  );
}


