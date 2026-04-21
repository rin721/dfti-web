import { motion } from 'motion/react';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

export const TacticalButton: FC<Props> = ({ children, onClick, className = "", variant = "primary", disabled }) => {
  const variants = {
    primary: "bg-orange-500 text-black font-black italic hover:bg-orange-400 active:scale-95 rounded-xl",
    secondary: "bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/20 active:scale-95 rounded-xl",
    outline: "border border-white/20 text-zinc-400 backdrop-blur-sm hover:border-orange-500 hover:text-orange-500 rounded-xl"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled}
      onClick={onClick}
      className={`px-6 py-3 font-mono text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 relative overflow-hidden group ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <span className="relative z-10">{children}</span>
      
      {/* Decorative corner */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current opacity-50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current opacity-50" />
      
      {/* Hover effect highlight */}
      <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out pointer-events-none" />
    </motion.button>
  );
};
