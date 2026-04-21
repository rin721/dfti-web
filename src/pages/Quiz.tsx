import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { TacticalButton } from '../components/TacticalButton';
import { TacticalCard } from '../components/TacticalCard';
import { Question, Option } from '../types';
import questions from '../data/questions.json';

interface Props {
  onComplete: (answers: Option[]) => void;
  onExit: () => void;
}

export const Quiz = ({ onComplete, onExit }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Option[]>([]);

  const currentQuestion = (questions as Question[])[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (option: Option) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentIndex] = option;
    setSelectedAnswers(newAnswers);

    // Auto next
    if (currentIndex < questions.length - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    }
  };

  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="min-h-screen flex flex-col p-6 max-w-2xl mx-auto">
      <header className="mb-8 flex items-center justify-between">
        <button onClick={onExit} className="mono-label text-zinc-500 hover:text-orange-500 transition-colors flex items-center gap-2">
           <ChevronLeft className="w-4 h-4" /> TERMINATE_UPLOAD
        </button>
        <div className="text-right">
           <div className="mono-label text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Progress</div>
           <div className="text-xl font-black italic text-orange-500">{currentIndex + 1} / {questions.length}</div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="w-full h-1 bg-white/5 mb-12 relative overflow-hidden rounded-full">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="absolute top-0 left-0 h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
           key={currentIndex}
           initial={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
           animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
           exit={{ opacity: 0, scale: 1.02, filter: 'blur(5px)' }}
           transition={{ duration: 0.3, ease: "easeOut" }}
           className="flex-1 relative"
        >
          {/* Tactical scanning line overlay during entry */}
          <motion.div 
            initial={{ top: '-10%' }}
            animate={{ top: '110%' }}
            transition={{ duration: 0.5, ease: "linear" }}
            className="absolute inset-x-0 h-px bg-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.8)] z-50 pointer-events-none"
          />

          <TacticalCard title={currentQuestion.title} subtitle={`SCENARIO_0${currentIndex + 1}`}>
             <div className="space-y-6">
                <blockquote className="border-l-2 border-orange-500/50 bg-white/5 px-4 py-3 italic text-zinc-400 rounded-r-lg text-sm">
                  {currentQuestion.scenario}
                </blockquote>
                <h4 className="text-xl font-bold tracking-tight text-white leading-snug">
                  {currentQuestion.question}
                </h4>

                <div className="grid gap-3 pt-6">
                  {currentQuestion.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt)}
                      className={`w-full text-left p-5 border transition-all relative group overflow-hidden rounded-xl ${
                         selectedAnswers[currentIndex]?.id === opt.id 
                         ? 'bg-orange-500/10 border-orange-500 text-white' 
                         : 'bg-white/5 border-white/10 text-zinc-400 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-mono text-xs ${
                             selectedAnswers[currentIndex]?.id === opt.id ? 'bg-orange-500 border-orange-500 text-black font-black' : 'border-white/10 bg-black/20'
                        }`}>
                          {opt.id.split('-')[1].toUpperCase()}
                        </div>
                        <span className="text-sm font-medium">{opt.text}</span>
                      </div>
                    </button>
                  ))}
                </div>
             </div>
          </TacticalCard>
        </motion.div>
      </AnimatePresence>


      <footer className="mt-12 flex justify-between gap-4">
        <TacticalButton 
           variant="secondary" 
           onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
           disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-4 h-4" /> PREV
        </TacticalButton>

        {isLast ? (
          <TacticalButton 
            onClick={() => onComplete(selectedAnswers)}
            disabled={selectedAnswers.length < questions.length}
            className="flex-1"
          >
            <Send className="w-4 h-4 mr-2" /> GENERATE_REPORT
          </TacticalButton>
        ) : (
          <TacticalButton 
            variant="secondary"
            onClick={() => setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1))}
            disabled={!selectedAnswers[currentIndex]}
          >
            NEXT <ChevronRight className="w-4 h-4" />
          </TacticalButton>
        )}
      </footer>
    </div>
  );
};
