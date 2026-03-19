import { motion } from "framer-motion";
import { UtensilsCrossed, Clock, Mail, ArrowRight } from "lucide-react";

const CateringSection = () => {
  return (
    <section id="catering" className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <p className="section-label">Catering</p>
          <h2 className="section-title">Fresh & Delicious</h2>
          <p className="section-desc">
            Order catering with your reservation or later by email, at least 48 hours before your event.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="rounded-xl overflow-hidden aspect-[3/4]">
              <img src="/placeholder.svg" alt="Catering" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[3/4] mt-8">
              <img src="/placeholder.svg" alt="Catering" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <UtensilsCrossed className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Minimum order</p>
                  <p className="text-xs text-muted-foreground">6 portions, from $1.75/piece</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Advance booking</p>
                  <p className="text-xs text-muted-foreground">At least 48 hours before the event</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Catering contact</p>
                  <a href="mailto:catering@example.com" className="text-xs text-accent hover:underline">
                    catering@example.com
                  </a>
                </div>
              </div>
            </div>

            <a href="mailto:catering@example.com" className="inline-flex items-center gap-2 text-primary text-sm hover:gap-3 transition-all duration-300">
              Order catering <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CateringSection;
