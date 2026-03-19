import { Github } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/30 py-12 px-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <p className="font-display font-bold text-lg text-gradient-main mb-1">AI Hackathon Template</p>
        <p className="text-xs text-muted-foreground">From zero to deployed AI prototype.</p>
      </div>

      <a href="https://github.com" target="_blank" rel="noopener noreferrer"
        className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300">
        <Github className="w-4 h-4" />
      </a>

      <p className="text-xs text-muted-foreground">
        MIT License · © {new Date().getFullYear()}
      </p>
    </div>
  </footer>
);

export default Footer;
