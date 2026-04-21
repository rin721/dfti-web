import { motion } from 'motion/react';
import { Target, Shield, Zap, Info } from 'lucide-react';
import { TacticalButton } from '../components/TacticalButton';
import { TacticalCard } from '../components/TacticalCard';
import config from '../data/config.json';

interface Props {
  onStart: () => void;
  onViewGallery: () => void;
}

const TacticalBackground = () => {
   return (
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.1)_0%,transparent_70%)]" />
         <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
         <motion.div 
            animate={{ 
               backgroundPosition: ['0px 0px', '40px 40px'],
            }}
            transition={{ 
               duration: 2, 
               repeat: Infinity, 
               ease: "linear" 
            }}
            className="absolute inset-0" 
            style={{ 
               backgroundImage: 'linear-gradient(rgba(249,115,22,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.05) 1px, transparent 1px)', 
               backgroundSize: '80px 80px' 
            }} 
         />
         <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-transparent to-[#09090b]" />
      </div>
   );
};

export const Home = ({ onStart, onViewGallery }: Props) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090b]">
      {/* Tactical Background Overlay */}
      <TacticalBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-4">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black tracking-widest uppercase mb-4"
        >
          Project: {config.project_name}
        </motion.div>
        
        <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter text-white">
          DFTI <span className="text-orange-500">PROTOTYPE</span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl font-medium tracking-tight max-w-2xl mx-auto">
          {config.subtitle} 
          <br />
          <span className="text-sm opacity-60 font-mono uppercase tracking-widest">Delta Force Type Indicator • Ver 1.0.4</span>
        </p>
      </header>


      <div className="grid md:grid-cols-3 gap-6 w-full">
        <TacticalCard title="角色映射" subtitle="IDENTITY">
          <p className="text-zinc-500 text-sm leading-relaxed">
            从 G.T.I. 干员到阿萨拉卫队，寻找与你灵魂共鸣的战场原型。
          </p>
        </TacticalCard>
        <TacticalCard title="阵营气质" subtitle="FACTION">
          <p className="text-zinc-500 text-sm leading-relaxed">
            你是属于正规军的战术核心，还是草根守卫的嘴硬战神？
          </p>
        </TacticalCard>
        <TacticalCard title="社区风味" subtitle="MEME">
          <p className="text-zinc-500 text-sm leading-relaxed">
            融合抖音、B站等玩家社区梗文化，测测你的“抽象”与“可靠”指数。
          </p>
        </TacticalCard>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full">
        <TacticalButton onClick={onStart} className="flex-1 py-6 text-lg">
          <Target className="w-5 h-5 mr-2" />
          初始化测试程序
        </TacticalButton>
        <TacticalButton onClick={onViewGallery} variant="secondary" className="flex-1 py-6 text-lg">
          <Shield className="w-5 h-5 mr-2" />
          全档案图鉴浏览
        </TacticalButton>
      </div>

      <footer className="w-full pt-12 border-t border-zinc-800 flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-6 text-zinc-600">
           <div className="flex items-center gap-1"><Zap className="w-4 h-4" /> <span>TACTICAL_UI v1.0.0</span></div>
           <div className="flex items-center gap-1"><Info className="w-4 h-4" /> <span>仅供娱乐，非专业性格分析</span></div>
        </div>
        <p className="text-[10px] text-zinc-700 uppercase tracking-widest leading-relaxed max-w-lg">
           SYSTEM DISCLAIMER: {config.disclaimer}
           <br />
           DATA SOURCE: OFFICIAL LORE + COMMUNITY CANON + PLAYER IMPRESSION
        </p>
      </footer>
      </div>
    </div>
  );
};
