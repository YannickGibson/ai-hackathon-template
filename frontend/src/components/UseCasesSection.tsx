import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const images = ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"];

const UseCasesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const useCases = [
    "Courses & Seminars",
    "Lectures & Workshops",
    "Networking Events",
    "Business Appointments",
    "Training Sessions",
    "Corporate Events",
    "Conferences",
    "Coaching",
  ];

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-header"
        >
          <p className="section-label">Use Cases</p>
          <h2 className="section-title">Perfect For</h2>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {useCases.map((uc, i) => (
            <motion.span
              key={uc}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="px-5 py-2.5 glass-card text-xs text-muted-foreground font-medium tracking-wide hover:text-primary hover:border-primary/30 transition-colors duration-300 cursor-default"
            >
              {uc}
            </motion.span>
          ))}
        </motion.div>

        {/* Gallery strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl overflow-hidden aspect-[4/3]"
            >
              <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
