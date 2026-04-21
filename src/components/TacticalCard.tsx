import { motion } from 'motion/react';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const TacticalCard: FC<Props> = ({ children, className = "", title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/5 backdrop-blur-xl border border-white/10 p-6 relative rounded-xl ${className}`}
    >
      {title && (
        <div className="mb-6 flex flex-col gap-1 border-b border-white/5 pb-4">
          <span className="mono-label text-orange-500 font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
            {subtitle || "System Entry"}
          </span>
          <h3 className="text-xl font-black italic tracking-tighter text-white uppercase">{title}</h3>
        </div>
      )}

      {children}
      
      {/* Technical accents */}
      <div className="absolute top-2 right-2 flex gap-1">
        <div className="w-1 h-1 bg-zinc-700 rounded-full" />
        <div className="w-1 h-1 bg-zinc-700 rounded-full" />
      </div>
      <div className="absolute bottom-2 left-2 flex gap-2 overflow-hidden">
         <div className="w-8 h-px bg-zinc-800" />
         <div className="w-4 h-px bg-zinc-800" />
      </div>
    </motion.div>
  );
};
