import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wifi, Monitor, Coffee, Printer, Camera, FileText, Car, Clock, Headphones } from "lucide-react";

const freeServices = [
  { icon: Wifi, label: "Wi-Fi / LAN", desc: "High-speed connection" },
  { icon: Monitor, label: "Projector / LCD TV", desc: "In every room" },
  { icon: FileText, label: "Flipchart", desc: "10 sheets for full-day" },
  { icon: Headphones, label: "Reception Services", desc: "Professional support" },
  { icon: Coffee, label: "Coffee, Tea & Water", desc: "Unlimited, 8:30–19:30" },
];

const paidServices = [
  { icon: Printer, label: "Printing & Copying" },
  { icon: FileText, label: "Document Binding" },
  { icon: Camera, label: "Photography" },
  { icon: Clock, label: "Scanning" },
  { icon: Car, label: "Nearby Parking" },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="services" className="py-24 px-6 md:px-12 lg:px-20 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="section-header"
        >
          <p className="section-label">Additional Services</p>
          <h2 className="section-title">Services</h2>
          <p className="section-desc">
            Filtered water, teas and coffees are available in unlimited quantities during opening hours, included in the rental price.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free services */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card glow-border p-8"
          >
            <h3 className="font-display text-base font-semibold text-primary mb-8 tracking-wide uppercase">
              Included in Price
            </h3>
            <div className="space-y-5">
              {freeServices.map((s) => (
                <div key={s.label} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <s.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Complementary */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8"
          >
            <h3 className="font-display text-base font-semibold text-accent mb-8 tracking-wide uppercase">
              Complementary
            </h3>
            <div className="space-y-5">
              {paidServices.map((s) => (
                <div key={s.label} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <s.icon className="w-4 h-4 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
