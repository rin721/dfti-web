import { useState } from 'react';
import { Book, ChevronLeft, AlertCircle, Info } from 'lucide-react';
import { TacticalCard } from '../components/TacticalCard';
import memes from '../data/memes.json';
import { Meme } from '../types';

interface Props {
  onBack: () => void;
}

export const MemeArchive = ({ onBack }: Props) => {
  const [activeTab, setActiveTab] = useState('all');

  const memeTypes = ['all', ...new Set((memes as Meme[]).map(m => m.meme_type))];

  const filtered = (memes as Meme[]).filter(m => activeTab === 'all' || m.meme_type === activeTab);

  return (
    <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-8">
      <header className="space-y-4">
        <button onClick={onBack} className="mono-label text-zinc-500 hover:text-orange-500 transition-colors flex items-center gap-2 leading-none">
          <ChevronLeft className="w-4 h-4" /> RETRUN_TO_CORE
        </button>
        <div className="flex items-center gap-6">
           <div className="w-12 h-12 bg-orange-500 rounded-sm flex items-center justify-center font-black text-black text-2xl italic">Δ</div>
           <div>
              <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">梗文化档案库 <span className="text-orange-500/40 font-mono text-sm block md:inline">MEME_REPOSITORY.INDEX</span></h1>
              <p className="text-zinc-500 text-sm max-w-2xl mt-1 font-medium">
                 记录《三角洲行动》玩家社区高频二创梗、谐音梗与战术黑话。
              </p>
           </div>
        </div>
      </header>

      <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl py-4 border-b border-white/5">
         <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
            {memeTypes.map(type => (
               <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={`shrink-0 px-5 py-2.5 border text-[10px] font-black uppercase tracking-widest transition-all rounded-xl ${
                     activeTab === type 
                     ? 'bg-orange-500 border-orange-500 text-black italic shadow-[0_0_20px_rgba(249,115,22,0.3)]' 
                     : 'border-white/10 text-zinc-500 hover:border-white/20 hover:text-zinc-300'
                  }`}
               >
                  {type}
               </button>
            ))}
         </div>
      </div>

      <div className="space-y-6">
        {filtered.map((meme) => (
          <TacticalCard key={meme.id} className="border-l-4 border-l-orange-500/50 hover:bg-white/10 transition-colors">
             <div className="grid md:grid-cols-[200px_1fr] gap-8">
                <div className="space-y-4">
                   <div>
                      <div className="text-[10px] font-black text-orange-600 mb-1 tracking-widest uppercase">MEME_TITLE</div>
                      <h3 className="text-2xl font-black text-white italic uppercase">{meme.title}</h3>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full ${meme.confidence === 'high' ? 'bg-emerald-500' : 'bg-orange-500'} animate-pulse`} />
                      <span className="text-[10px] font-black tracking-widest text-zinc-500 uppercase">CONFIDENCE: {meme.confidence.toUpperCase()}</span>
                   </div>
                   <div className="bg-black/40 p-4 border border-white/5 rounded-xl">
                      <div className="text-[9px] font-black text-zinc-500 mb-2 uppercase tracking-widest">Tone Tags</div>
                      <div className="flex flex-wrap gap-2">
                         {meme.tone_tags.map(t => (
                            <span key={t} className="text-[10px] font-bold text-zinc-400 bg-white/5 px-2 py-0.5 rounded">/{t}</span>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                      <div>
                         <div className="text-[10px] font-black text-zinc-500 mb-2 tracking-widest uppercase">ORIGIN_PHRASE</div>
                         <code className="text-sm font-black text-orange-500 bg-orange-500/10 px-3 py-1.5 border border-orange-500/20 rounded italic">{meme.raw_phrase}</code>
                      </div>
                      <div>
                         <div className="text-[10px] font-black text-zinc-500 mb-2 tracking-widest uppercase">CATEGORY</div>
                         <span className="text-sm text-zinc-300 font-bold uppercase tracking-tight">{meme.meme_type}</span>
                      </div>
                   </div>

                   <div>
                      <div className="text-[10px] font-black text-zinc-500 mb-2 tracking-widest uppercase">INTEL_EXPLANATION</div>
                      <p className="text-sm text-zinc-400 leading-relaxed italic border-l-2 border-white/10 pl-5 font-medium">
                        {meme.explanation}
                      </p>
                   </div>

                   <div className="pt-4 flex items-start gap-4 bg-white/5 p-5 border border-white/10 rounded-2xl backdrop-blur-md">
                      <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                      <div>
                         <div className="text-[10px] font-black text-zinc-500 mb-2 tracking-widest uppercase">USAGE_GUIDE</div>
                         <p className="text-xs text-zinc-300 font-medium leading-relaxed">{meme.usage_context}</p>
                      </div>
                   </div>
                </div>
             </div>
          </TacticalCard>
        ))}
      </div>

    </div>
  );
};
