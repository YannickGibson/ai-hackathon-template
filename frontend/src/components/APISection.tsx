import { motion } from "framer-motion";
import { Send, Image, Palette, Layers } from "lucide-react";

const endpoints = [
  {
    method: "POST",
    path: "/predict",
    icon: Send,
    desc: "Run model inference on an uploaded image",
    body: 'file: UploadFile',
    response: '{ prediction, verdict }',
  },
  {
    method: "POST",
    path: "/analyze",
    icon: Image,
    desc: "Return image metadata (format, mode, size)",
    body: 'file: UploadFile',
    response: '{ format, mode, width, height }',
  },
  {
    method: "POST",
    path: "/invert",
    icon: Palette,
    desc: "Invert the colors of an uploaded image",
    body: 'file: UploadFile',
    response: 'image/png',
  },
  {
    method: "POST",
    path: "/blend",
    icon: Layers,
    desc: "Average-blend multiple images together",
    body: 'files: UploadFile[]',
    response: 'image/png',
  },
];

const APISection = () => (
  <section id="api" className="py-24 px-6 md:px-12 lg:px-20 bg-secondary/20">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="section-header"
      >
        <p className="section-label">Backend</p>
        <h2 className="section-title">API Endpoints</h2>
        <p className="section-desc">
          The FastAPI server ships with example endpoints.
          Replace them with your own model and logic.
        </p>
      </motion.div>

      <div className="space-y-4">
        {endpoints.map((ep, i) => (
          <motion.div
            key={ep.path}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-6 flex items-start gap-5 hover:border-primary/30 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <ep.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-[10px] font-bold tracking-wider text-accent uppercase">{ep.method}</span>
                <code className="text-sm font-semibold text-foreground">{ep.path}</code>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{ep.desc}</p>
              <div className="flex flex-wrap gap-4 text-[11px] text-muted-foreground/70">
                <span>Body: <code className="text-primary/70">{ep.body}</code></span>
                <span>Response: <code className="text-primary/70">{ep.response}</code></span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-10 text-xs text-muted-foreground"
      >
        Interactive docs available at{" "}
        <code className="text-primary">http://localhost:8000/docs</code>{" "}
        when the backend is running.
      </motion.p>
    </div>
  </section>
);

export default APISection;
