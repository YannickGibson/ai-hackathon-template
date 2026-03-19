import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, ImageIcon, Loader2, RotateCcw } from "lucide-react";
import bgImg from "@/assets/demo.jpg";

const API_BASE = "http://localhost:8000";

const DemoSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeEndpoint, setActiveEndpoint] = useState<"predict" | "analyze" | "invert">("analyze");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setResult(null);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE}/${activeEndpoint}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Server returned ${res.status}`);

      if (activeEndpoint === "invert") {
        const blob = await res.blob();
        setResult({ image: URL.createObjectURL(blob) });
      } else {
        const data = await res.json();
        setResult(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed. Is the backend running on port 8000?");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <section id="demo" className="relative py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* BG Image */}
      <div className="absolute inset-0">
        <img src={bgImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
        {/* Edge blending gradients */}
        <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <p className="section-label">Try It</p>
          <h2 className="section-title">Live Demo</h2>
          <p className="section-desc">
            Upload an image and call the backend API. This demonstrates the frontend ↔ backend integration pattern.
          </p>
        </motion.div>

        {/* Endpoint selector */}
        <div className="flex justify-center gap-3 mb-10">
          {(["analyze", "predict", "invert"] as const).map((ep) => (
            <button
              key={ep}
              onClick={() => { setActiveEndpoint(ep); setResult(null); setError(null); }}
              className={`px-5 py-2.5 rounded-lg text-xs font-display font-medium tracking-wide uppercase transition-all duration-300 ${
                activeEndpoint === ep
                  ? "bg-primary text-primary-foreground"
                  : "glass-card text-muted-foreground hover:text-primary hover:border-primary/30"
              }`}
            >
              /{ep}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload area */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card glow-border p-8 flex flex-col items-center justify-center min-h-[320px]"
          >
            {preview ? (
              <div className="text-center space-y-4">
                <img src={preview} alt="Upload preview" className="max-h-48 mx-auto rounded-lg" />
                <p className="text-xs text-muted-foreground">{file?.name}</p>
                <div className="flex gap-3 justify-center">
                  <button onClick={handleSubmit} disabled={loading}
                    className="btn-primary text-xs px-5 py-2.5 disabled:opacity-50">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send"}
                  </button>
                  <button onClick={reset}
                    className="px-4 py-2.5 border border-border/60 rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <label className="cursor-pointer text-center space-y-4 w-full">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Upload className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Drop an image or click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP</p>
                </div>
              </label>
            )}
          </motion.div>

          {/* Result area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 min-h-[320px] flex items-center justify-center"
          >
            {error ? (
              <div className="text-center space-y-2">
                <p className="text-sm text-destructive">{error}</p>
                <p className="text-xs text-muted-foreground">
                  Start the backend: <code className="text-primary">make backend</code>
                </p>
              </div>
            ) : result ? (
              <div className="w-full space-y-4">
                <p className="text-xs text-primary font-display uppercase tracking-wide">
                  Response from /{activeEndpoint}
                </p>
                {result.image ? (
                  <img src={result.image as string} alt="Result" className="max-h-48 mx-auto rounded-lg" />
                ) : (
                  <pre className="text-sm text-foreground bg-background/50 rounded-lg p-4 overflow-auto max-h-56">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                )}
              </div>
            ) : (
              <div className="text-center space-y-3">
                <ImageIcon className="w-10 h-10 text-muted-foreground/30 mx-auto" />
                <p className="text-sm text-muted-foreground">Results will appear here</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
