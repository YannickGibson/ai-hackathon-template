import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github } from "lucide-react";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Demo", href: "#demo" },
  { label: "API", href: "#api" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/30" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#hero" className="font-display font-bold text-xl">
            <span className="text-gradient-main">AI Hackathon</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}
                className="text-xs tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300 uppercase">
                {item.label}
              </a>
            ))}
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300">
              <Github className="w-4 h-4" />
            </a>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-foreground p-1">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border/30 px-6 py-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
