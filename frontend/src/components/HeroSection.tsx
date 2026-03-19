import { motion } from "framer-motion";
import { Cpu, Zap, Server, Code, ArrowDown } from "lucide-react";
import heroImg from "@/assets/hero.jpg";

const stack = [
  { icon: Cpu, text: "PyTorch", desc: "ML" },
  { icon: Server, text: "FastAPI", desc: "Backend" },
  { icon: Code, text: "React + Vite", desc: "Frontend" },
  { icon: Zap, text: "One-click Deploy", desc: "Fly.io + Vercel" },
];

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* BG Image */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="AI Hackathon Template" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(170 80% 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(170 80% 45%) 1px, transparent 1px)`,
        backgroundSize: '80px 80px'
      }} />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="section-label mb-6"
        >
          Full-Stack · AI/ML · Ready to Ship
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-display font-bold tracking-tight leading-[1.05] mb-4"
        >
          <span className="text-foreground">AI Hackathon</span>
          <br />
          <span className="text-gradient-main">Template</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base md:text-lg text-secondary-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Go from zero to a deployed AI prototype as fast as possible.
          Train a model, expose an API, connect a frontend — all wired up and ready.
        </motion.p>

        {/* Stack chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {stack.map((s, i) => (
            <div key={i} className="glass-card glow-border px-5 py-3 flex items-center gap-3">
              <s.icon className="w-4 h-4 text-primary" />
              <div className="text-left">
                <p className="text-xs font-semibold text-foreground">{s.text}</p>
                <p className="text-[10px] text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a href="#demo" className="btn-primary">
            Try the Demo
          </a>
          <a href="#api" className="inline-flex items-center justify-center px-7 py-3.5 border border-border/60 text-foreground font-display font-medium text-sm tracking-wide rounded-lg hover:border-primary/40 hover:bg-primary/5 transition-all duration-300">
            View API
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 text-primary/60" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
