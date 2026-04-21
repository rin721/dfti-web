import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Shield, ChevronLeft, ExternalLink, History, User, Trash2, Clock, Calendar } from 'lucide-react';
import { TacticalCard } from '../components/TacticalCard';
import characters from '../data/characters.json';
import factions from '../data/factions.json';
import { Character, QuizResult } from '../types';
import { getResultHistory, clearResultHistory } from '../utils/storage';

interface Props {
  onBack: () => void;
  onSelectHistory?: (result: QuizResult) => void;
}

export const Gallery = ({ onBack, onSelectHistory }: Props) => {
  const [activeTab, setActiveTab] = useState<'personnel' | 'history'>('personnel');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedPersonnel, setSelectedPersonnel] = useState<Character | null>(null);

  const history = useMemo(() => getResultHistory(), [activeTab, selectedPersonnel]);

  const filtered = (characters as Character[]).filter(c => {
    const matchesFilter = filter === 'all' || c.faction === filter;
    const matchesSearch = c.display_name.toLowerCase().includes(search.toLowerCase()) || 
                          c.codename.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button onClick={onBack} className="mono-label text-zinc-500 hover:text-orange-500 transition-colors flex items-center gap-2 mb-2">
            <ChevronLeft className="w-4 h-4" /> RE-ENTER_COMMAND
          </button>
          <h1 className="text-3xl font-black text-white tracking-tighter italic uppercase">人员原型图鉴 <span className="text-orange-500/40 font-mono text-sm ml-2">ARCHIVE.DATABASE</span></h1>
        </div>
        
        <div className="flex bg-white/5 border border-white/10 p-1 rounded-xl backdrop-blur-md">
           <button 
              onClick={() => setActiveTab('personnel')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${activeTab === 'personnel' ? 'bg-orange-500 text-black italic' : 'text-zinc-500 hover:text-zinc-300'}`}
           >
              <User className="w-3 h-3" /> PERSONNEL
           </button>
           <button 
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${activeTab === 'history' ? 'bg-orange-500 text-black italic' : 'text-zinc-500 hover:text-zinc-300'}`}
           >
              <History className="w-3 h-3" /> MY_ARCHIVE
           </button>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                 type="text" 
                 placeholder="SEARCH PERSONNEL..."
                 className="bg-white/5 border border-white/10 py-2.5 pl-10 pr-4 text-sm focus:border-orange-500 outline-none transition-colors w-full md:w-64 rounded-xl backdrop-blur-md"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
              />
           </div>
           <div className="flex border border-white/5 p-1 bg-white/5 rounded-xl backdrop-blur-md overflow-x-auto no-scrollbar max-w-[280px] sm:max-w-none">
              <button
                 onClick={() => setFilter('all')}
                 className={`shrink-0 px-4 py-1.5 text-[10px] font-black tracking-widest uppercase transition-all rounded-lg ${filter === 'all' ? 'bg-orange-500 text-black italic' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                 ALL
              </button>
              {factions.map(f => (
                 <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className={`shrink-0 px-4 py-1.5 text-[10px] font-black tracking-widest uppercase transition-all rounded-lg ${filter === f.id ? 'bg-orange-500 text-black italic' : 'text-zinc-500 hover:text-zinc-300'}`}
                 >
                    {f.name}
                 </button>
              ))}
           </div>
        </div>
      </header>

       <AnimatePresence mode="wait">
        {activeTab === 'personnel' ? (
          <motion.div 
            key="personnel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((char) => (
                <TacticalCard 
                  key={char.id} 
                  title={char.display_name} 
                  subtitle={`${char.faction} / ${char.archetype_type.toUpperCase()}`}
                  className="hover:bg-white/10 transition-colors group cursor-pointer"
                  onClick={() => setSelectedPersonnel(char)}
                >
                  <div className="space-y-4">
                     <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed font-medium">
                        {char.short_intro}
                     </p>
                     
                     <div className="flex flex-wrap gap-2">
                        {char.personality_tags.slice(0, 3).map(t => (
                           <span key={t} className="text-[9px] font-black px-2 py-1 bg-white/5 border border-white/10 text-zinc-500 uppercase rounded-sm">{t}</span>
                        ))}
                     </div>

                     <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <Shield className={`w-3 h-3 ${char.source_type === 'official' ? 'text-blue-500' : 'text-orange-500'}`} />
                           <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{char.source_type}</span>
                        </div>
                        <button className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-orange-500 flex items-center gap-1 transition-colors italic">
                           FULL_PROFILE <ExternalLink className="w-3 h-3" />
                        </button>
                     </div>
                  </div>
                </TacticalCard>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/5 backdrop-blur-md">
                 <p className="text-zinc-500 font-mono uppercase tracking-[0.2em] font-bold">No matching personnel found in local database</p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            key="history"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
               <h2 className="mono-label text-zinc-500 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> RECENT_CALIBRATIONS
               </h2>
               {history.length > 0 && (
                  <button 
                    onClick={() => { if(confirm('Clear all history?')) { clearResultHistory(); window.location.reload(); } }}
                    className="text-[9px] font-black text-red-500/50 hover:text-red-500 flex items-center gap-1 uppercase tracking-widest transition-colors"
                  >
                    <Trash2 className="w-3 h-3" /> CLEAR_ARCHIVE
                  </button>
               )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {history.map((res, i) => (
                  <TacticalCard 
                     key={i} 
                     title={res.character.display_name} 
                     subtitle={res.mbti}
                     className="hover:border-orange-500/30 transition-colors cursor-pointer group"
                  >
                     <div className="flex justify-between items-end">
                        <div className="space-y-3">
                           <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                              {res.character.personality_tags.slice(0, 2).map(t => (
                                 <span key={t} className="text-[8px] font-bold px-1.5 py-0.5 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded uppercase">
                                    {t}
                                 </span>
                              ))}
                           </div>
                           <p className="text-xs text-zinc-500 italic max-w-[200px] truncate">{res.character.result_subtitle}</p>
                        </div>
                        <div className="text-right space-y-1">
                           <div className="text-[8px] font-mono text-zinc-600 flex items-center justify-end gap-1">
                              <Calendar className="w-2 h-2" /> 2026-04-21
                           </div>
                           <button 
                              onClick={() => onSelectHistory?.(res)}
                              className="bg-white/5 border border-white/10 px-3 py-1 rounded text-[9px] font-black text-zinc-400 group-hover:bg-orange-500 group-hover:text-black group-hover:italic transition-all"
                           >
                              VIEW_REPORT
                           </button>
                        </div>
                     </div>
                  </TacticalCard>
               ))}
            </div>

            {history.length === 0 && (
               <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/5 backdrop-blur-md">
                  <p className="text-zinc-500 font-mono uppercase tracking-[0.2em] font-bold">No historical data found in local storage</p>
                  <p className="text-[10px] text-zinc-600 mt-2 italic px-6">Complete a diagnostic test to generate your first personnel archetype report.</p>
               </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPersonnel && (
           <PersonnelDetailModal 
              personnel={selectedPersonnel} 
              userResult={history[0] || null}
              onClose={() => setSelectedPersonnel(null)} 
           />
        )}
      </AnimatePresence>
    </div>
  );
};

const PersonnelDetailModal = ({ personnel, userResult, onClose }: { personnel: Character, userResult: QuizResult | null, onClose: () => void }) => {
   const [viewMode, setViewMode] = useState<'profile' | 'compatibility'>( 'profile');

   const compatibility = useMemo(() => {
      if (!userResult) return null;
      
      const pWeights = personnel.mbti_axis_weights;
      const uWeights = userResult.scores;
      
      // Calculate diffs
      const axes = ['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'] as const;
      let totalDiff = 0;
      axes.forEach(axis => {
         totalDiff += Math.abs(pWeights[axis] - uWeights[axis]);
      });
      
      const score = Math.max(0, Math.min(100, Math.round(100 - (totalDiff / 8) * 100)));
      
      let level = 'NEUTRAL';
      let desc = '';
      
      if (score > 85) { level = 'GOLDEN_DUO'; desc = '战场上的绝对默契。你们的思维步调高度一致，即使不说话也能完美补位。'; }
      else if (score > 70) { level = 'TACTICAL_SYNC'; desc = '可靠的搭档。虽然性格有细微差别，但这种互补让你们在复杂战场上更加全能。'; }
      else if (score > 50) { level = 'DISCIPLINED_COOP'; desc = '职业化的合作关系。你们更多依赖战术条令而非直觉进行协作，虽无惊喜但足够稳定。'; }
      else if (score > 30) { level = 'TACTICAL_FRICTION'; desc = '存在认知冲突。由于战术选择逻辑殊异，你们在压力环境下容易产生分歧。'; }
      else { level = 'CHAOS_ENGINE'; desc = '混乱的源头。你们的作战风格完全相反，共事时往往像是在两个不同的战场。'; }

      return { score, level, desc };
   }, [personnel, userResult]);

   return (
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      >
         <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-2xl bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden relative"
         >
            <div className="absolute top-4 right-4 z-10 flex gap-2">
               {userResult && (
                  <button 
                     onClick={() => setViewMode(viewMode === 'profile' ? 'compatibility' : 'profile')}
                     className={`px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest transition-all italic border ${viewMode === 'compatibility' ? 'bg-orange-500 text-black border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.4)]' : 'bg-white/5 text-zinc-500 border-white/10 hover:text-white'}`}
                  >
                     {viewMode === 'profile' ? 'CHECK_COMPATIBILITY' : 'BACK_TO_PROFILE'}
                  </button>
               )}
               <button 
                  onClick={onClose}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-zinc-500 hover:text-white transition-colors border border-white/10"
               >
                  <ChevronLeft className="w-6 h-6 rotate-180" />
               </button>
            </div>

            <div className="h-32 bg-gradient-to-r from-orange-600/20 to-zinc-900/40 relative">
               <div className="absolute bottom-0 left-0 p-6 space-y-1">
                  <div className="text-[10px] font-black text-orange-500 tracking-[0.3em] uppercase">
                     {viewMode === 'profile' ? 'Personnel_Profile' : 'Compatibility_Analysis'}
                  </div>
                  <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">
                     {viewMode === 'profile' ? personnel.display_name : `${personnel.codename} x YOU`}
                  </h2>
               </div>
            </div>

            <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh] no-scrollbar">
               {viewMode === 'profile' ? (
                  <>
                     <div className="grid md:grid-cols-[1fr_180px] gap-8">
                        <div className="space-y-6">
                           <section className="space-y-2">
                              <h4 className="mono-label text-zinc-600 font-bold text-[10px]">Background_Intel / 背景资料</h4>
                              <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                                 {personnel.detailed_bio || personnel.official_background}
                              </p>
                           </section>

                           <section className="space-y-2">
                              <h4 className="mono-label text-zinc-600 font-bold text-[10px]">Community_Impression / 社区印象</h4>
                              <p className="text-sm text-zinc-400 italic font-medium">
                                 {personnel.community_interpretation || "该干员在玩家社区中保持着极为专业的形象，相关二创较少。"}
                              </p>
                           </section>
                        </div>

                        <div className="space-y-6 bg-white/5 p-5 border border-white/5 rounded-2xl">
                           <section className="space-y-3">
                              <h4 className="mono-label text-zinc-600 font-bold text-[9px] uppercase tracking-widest text-center">Dimension_Metrics</h4>
                              <div className="space-y-2">
                                 {Object.entries(personnel.mbti_axis_weights).filter(([k]) => ['E','S','T','J'].includes(k)).map(([key, val]) => (
                                    <div key={key} className="space-y-1">
                                       <div className="flex justify-between text-[8px] font-black text-zinc-500 uppercase italic">
                                          <span>{key}</span>
                                          <span>{Math.round(val * 100)}%</span>
                                       </div>
                                       <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                          <motion.div 
                                             initial={{ width: 0 }}
                                             animate={{ width: `${val * 100}%` }}
                                             className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                                          />
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </section>
                        </div>
                     </div>

                     <section className="pt-6 border-t border-white/5">
                        <h4 className="mono-label text-zinc-600 font-bold text-[10px] mb-4">Profiling_Suggestion / 鉴定建议</h4>
                        <div className="p-5 bg-orange-500/5 border border-orange-500/20 rounded-2xl flex items-start gap-4">
                           <Shield className="w-5 h-5 text-orange-500 shrink-0 mt-1" />
                           <p className="text-sm text-orange-100 leading-relaxed font-medium">
                              {personnel.profiling_suggestion || "暂无深度匹配数据。建议根据战场表现进行实时校准。"}
                           </p>
                        </div>
                     </section>
                  </>
               ) : (
                  <div className="space-y-8 py-4">
                     {compatibility && (
                        <>
                           <div className="flex flex-col items-center text-center space-y-4">
                              <div className="relative w-32 h-32 flex items-center justify-center">
                                 <svg className="absolute inset-0 w-full h-full -rotate-90">
                                    <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-white/5" />
                                    <motion.circle 
                                       cx="64" cy="64" r="58" 
                                       fill="transparent" 
                                       stroke="currentColor" 
                                       strokeWidth="4" 
                                       strokeDasharray={2 * Math.PI * 58}
                                       initial={{ strokeDashoffset: 2 * Math.PI * 58 }}
                                       animate={{ strokeDashoffset: (2 * Math.PI * 58) * (1 - compatibility.score / 100) }}
                                       transition={{ duration: 1, ease: "easeOut" }}
                                       className="text-orange-500"
                                    />
                                 </svg>
                                 <div className="flex flex-col items-center">
                                    <span className="text-4xl font-black italic text-white">{compatibility.score}%</span>
                                    <span className="text-[8px] font-black text-zinc-500 tracking-widest uppercase italic">Sync_Rate</span>
                                 </div>
                              </div>
                              <div className="px-4 py-1.5 bg-orange-500/10 border border-orange-500/30 rounded-full">
                                 <span className="text-xs font-black italic text-orange-500 tracking-[0.2em]">{compatibility.level}</span>
                              </div>
                           </div>

                           <div className="bg-white/5 border border-white/5 p-6 rounded-2xl space-y-4">
                              <h4 className="mono-label text-zinc-500 text-[10px] italic">TACTICAL_COHESION_REPORT // 战术凝聚力报告</h4>
                              <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                                 {compatibility.desc}
                              </p>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-3">
                                 <h5 className="text-[9px] font-black text-zinc-600 uppercase italic tracking-widest">YOU</h5>
                                 <div className="text-lg font-black italic text-white">{userResult?.mbti}</div>
                                 <div className="text-[8px] font-medium text-zinc-500">{userResult?.character.display_name}</div>
                              </div>
                              <div className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-3">
                                 <h5 className="text-[9px] font-black text-zinc-600 uppercase italic tracking-widest">THEM</h5>
                                 <div className="text-lg font-black italic text-white">{personnel.code}</div>
                                 <div className="text-[8px] font-medium text-zinc-500">{personnel.display_name}</div>
                              </div>
                           </div>

                           <p className="text-[9px] text-zinc-700 italic text-center uppercase tracking-tighter">
                              * 此分析基于 MBTI 坐标轴重合度算法生成的战术模拟数据 *
                           </p>
                        </>
                     )}
                  </div>
               )}
            </div>

            <div className="p-6 bg-zinc-900/50 border-t border-white/5 flex items-center justify-between">
               <div className="flex gap-2">
                  {personnel.meme_tags.map(tag => (
                     <span key={tag} className="text-[9px] font-black px-2 py-1 bg-white/5 border border-white/10 text-zinc-500 uppercase rounded">#{tag}</span>
                  ))}
               </div>
               <div className="text-[8px] font-mono text-zinc-700 font-black italic tracking-widest">
                  ACCESS_GRANTED // P-LEVEL: {personnel.confidence.toUpperCase()}
               </div>
            </div>
         </motion.div>
      </motion.div>
   );
}
