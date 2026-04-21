import { motion } from 'motion/react';
import { Download, RefreshCcw, LayoutGrid, Share2, AlertTriangle, ShieldCheck, Loader2 } from 'lucide-react';
import { TacticalButton } from '../components/TacticalButton';
import { TacticalCard } from '../components/TacticalCard';
import { QuizResult } from '../types';
import { useRef, useState, useMemo, useEffect } from 'react';
import html2canvas from 'html2canvas';

interface Props {
  result: QuizResult;
  onReset: () => void;
  onViewGallery: () => void;
}

export const Result = ({ result, onReset, onViewGallery }: Props) => {
  const { character, archetype, mbti, scores, faction_affinity, meme_tags } = result;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const stableHash = useMemo(() => Math.random().toString(16).slice(2, 10).toUpperCase(), []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#09090b',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `DFTI-Report-${character.display_name}-${mbti}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to export image:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = async () => {
    if (!cardRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#09090b',
        scale: 2,
        useCORS: true,
      });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'dfti-result.png', { type: 'image/png' });
        if (navigator.share) {
          await navigator.share({
            files: [file],
            title: 'DFTI Personnel Report',
            text: `My Delta Force personality type is ${mbti} - ${character.display_name}!`,
          });
        } else {
          // Fallback to download if share not supported
          handleDownload();
        }
      });
    } catch (err) {
      console.error('Failed to share:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-8 pb-20">
      <div ref={cardRef} className="space-y-8 p-4 bg-[#09090b]">
        <header className="text-center space-y-2">
           <div className="mono-label text-orange-500 font-bold border border-orange-500/20 px-3 py-1 inline-block bg-orange-500/5 rounded-full">
              Personnel Report: ID-{character.id.toUpperCase()}
           </div>
           <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase">
              {character.result_title}
           </h1>
           <p className="text-zinc-500 text-lg font-medium">{character.result_subtitle}</p>
        </header>

        {/* Main Result Card */}
        <TacticalCard className="overflow-hidden p-0 rounded-2xl border-white/10 bg-white/5 backdrop-blur-2xl">
           <div className="grid md:grid-cols-2">
              {/* Visual Section */}
              <div className="bg-black/20 flex flex-col items-center justify-center p-12 relative min-h-[350px] border-r border-white/5">
                 <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-widest ${character.source_type === 'official' ? 'bg-blue-600' : 'bg-orange-600'} text-white rounded-sm`}>
                       {character.source_type}
                    </div>
                    <div className="text-[10px] font-mono text-zinc-500 tracking-widest uppercase">{character.faction}</div>
                 </div>
                 
                 <TargetVisual characterName={character.display_name} />
                 
                 <div className="text-center mt-8">
                    <div className="text-8xl font-black text-white/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none tracking-tighter italic">
                       {mbti}
                    </div>
                    <h2 className="text-4xl font-black text-white relative z-10 italic uppercase tracking-tighter">{character.display_name}</h2>
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                       {character.personality_tags.map(tag => (
                          <span key={tag} className="text-[9px] font-black px-2 py-1 bg-white/5 text-zinc-400 border border-white/10 uppercase tracking-widest rounded-full">
                             #{tag}
                          </span>
                       ))}
                    </div>
                 </div>
              </div>

              {/* Analysis Section */}
              <div className="p-10 space-y-8">
                 <section>
                    <h3 className="mono-label text-orange-500 font-bold mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                      Psychological Profile / MBTI: {mbti}
                    </h3>
                    <p className="text-zinc-300 text-sm leading-relaxed font-medium">
                       {character.result_copy}
                    </p>
                 </section>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <section className="p-4 bg-white/5 border border-white/5 rounded-xl">
                       <h4 className="mono-label text-zinc-500 text-[9px] mb-2 font-bold uppercase tracking-wider">Battlefield Style</h4>
                       <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {character.gameplay_style_tags.map(t => (
                             <span key={t} className="text-xs text-zinc-300 font-semibold tracking-tight">/ {t}</span>
                          ))}
                       </div>
                    </section>
                    <section className="p-4 bg-white/5 border border-white/5 rounded-xl">
                       <h4 className="mono-label text-zinc-500 text-[9px] mb-2 font-bold uppercase tracking-wider">Faction Affinity</h4>
                       <span className="text-sm text-orange-500 font-black italic uppercase tracking-tight">{faction_affinity}</span>
                    </section>
                 </div>

                 <section>
                    <h3 className="mono-label text-zinc-500 mb-3 font-bold text-[9px]">Meme Synergy / 社区气质</h3>
                    <div className="flex flex-wrap gap-2">
                       {meme_tags.length > 0 ? meme_tags.map(tag => (
                          <div key={tag} className="px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-black uppercase tracking-widest rounded-full">
                             {tag}
                          </div>
                       )) : <span className="text-zinc-600 text-xs italic">尚未检测到显著社区梗倾向</span>}
                    </div>
                 </section>

                 {archetype && (
                    <section className="pt-6 border-t border-white/5">
                       <h3 className="mono-label text-zinc-500 mb-1 font-bold text-[9px]">Archetype / 原型归类</h3>
                       <p className="text-base font-black text-white italic uppercase tracking-tighter">{archetype.name}</p>
                       <p className="text-xs text-zinc-500 font-medium mt-1 leading-relaxed">{archetype.description}</p>
                    </section>
                 )}
              </div>
           </div>
        </TacticalCard>

        <div className="grid md:grid-cols-2 gap-6">
           <TacticalCard title="数据可信度报告" subtitle="TRUST_AUDIT">
              <div className="space-y-4">
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-bold uppercase tracking-widest text-[9px]">Source Type</span>
                    <span className="text-zinc-300 uppercase font-bold">{character.source_type}</span>
                 </div>
                 <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-bold uppercase tracking-widest text-[9px]">Confidence Level</span>
                    <div className="flex gap-1.5">
                       <div className={`w-3 h-3 rounded-sm ${character.confidence === 'high' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                       <div className={`w-3 h-3 rounded-sm ${character.confidence === 'high' ? 'bg-emerald-500' : 'bg-white/10'}`} />
                       <div className={`w-3 h-3 rounded-sm ${character.confidence === 'high' ? 'bg-emerald-500' : 'bg-white/10'}`} />
                    </div>
                 </div>
                 <div className="p-4 bg-black/40 border border-white/5 flex gap-3 items-start rounded-xl">
                    <AlertTriangle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-zinc-400 leading-normal font-medium italic">
                       审计提示: {character.source_note}
                    </p>
                 </div>
              </div>
           </TacticalCard>

           <TacticalCard title="社区二创解读" subtitle="FANON_ANALYSIS">
               <p className="text-xs text-zinc-400 italic mb-4 font-medium">
                  "除官方设定外，玩家社区对您的战场气质有如下衍生解读..."
               </p>
               <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                  {character.community_interpretation || "该原型在当前社区样本中表现极为稳健，尚无大幅偏离官方设定的抽象倾向。"}
               </p>
           </TacticalCard>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl p-8 border border-white/10 rounded-2xl text-center space-y-6">
         <div className="space-y-1">
            <h4 className="mono-label text-zinc-500 font-bold text-[10px]">Generated for Security Clearance</h4>
            <div className="text-[10px] text-zinc-600 font-mono">HASH: {stableHash} // NODE: PROTOTYPE_EPSILON</div>
         </div>
         <div className="flex flex-col sm:flex-row justify-center gap-4">
            <TacticalButton variant="outline" className="flex-1" onClick={handleShare} disabled={isExporting}>
               {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Share2 className="w-4 h-4 mr-2" />} 
               分享结果
            </TacticalButton>
            <TacticalButton variant="outline" className="flex-1" onClick={handleDownload} disabled={isExporting}>
               {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />} 
               保存卡片
            </TacticalButton>
         </div>
      </div>


      <div className="flex flex-col md:flex-row gap-4">
        <TacticalButton onClick={onReset} variant="secondary" className="flex-1">
          <RefreshCcw className="w-4 h-4 mr-2" /> 重置生命体征测算
        </TacticalButton>
        <TacticalButton onClick={onViewGallery} variant="secondary" className="flex-1">
          <LayoutGrid className="w-4 h-4 mr-2" /> 查看全员图库
        </TacticalButton>
      </div>
    </div>
  );
};

const TargetVisual = ({ characterName }: { characterName: string }) => {
   return (
      <div className="relative w-56 h-56">
         {/* Animated rings */}
         <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border border-dashed border-orange-500/20 rounded-full"
         />
         <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-6 border border-white/5 rounded-full"
         />
         
         <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-orange-600/20 to-transparent flex items-center justify-center border border-orange-500/30 backdrop-blur-3xl overflow-hidden shadow-[0_0_50px_rgba(249,115,22,0.1)]">
            <div className="text-orange-500 opacity-20">
               <ShieldCheck className="w-28 h-28 stroke-[1]" />
            </div>
            
            {/* Holographic text effect */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="text-5xl font-black text-orange-500/10 blur-[1px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 italic">TARGET</div>
               <div className="text-[10px] font-black uppercase tracking-widest text-orange-500/80 absolute bottom-6 bg-black/40 px-2 py-0.5 rounded">LOADED</div>
            </div>
         </div>

         {/* Corner dots */}
         <div className="absolute top-0 left-0 w-2 h-2 bg-orange-500 rounded-sm" />
         <div className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-sm" />
         <div className="absolute bottom-0 left-0 w-2 h-2 bg-orange-500 rounded-sm" />
         <div className="absolute bottom-0 right-0 w-2 h-2 bg-orange-500 rounded-sm" />
      </div>
   );
}
