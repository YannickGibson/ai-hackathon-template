import { motion } from "framer-motion";
import { MapPin, Clock, Train, TrainFront, Phone, Mail, ExternalLink } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 lg:px-20 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <p className="section-label">Contact</p>
          <h2 className="section-title">Contact & Directions</h2>
          <p className="section-desc">
            A modern, centrally located venue in an easily accessible part of the city.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="glass-card p-6 space-y-5"
          >
            <h3 className="font-display text-sm font-semibold text-primary tracking-wide uppercase">Location</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-secondary-foreground">Central city location, detailed address on request.</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-secondary-foreground">Mon–Thu: 8:30–19:30</p>
                  <p className="text-sm text-secondary-foreground">Fri: 8:30–16:00</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Transport */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 space-y-5"
          >
            <h3 className="font-display text-sm font-semibold text-primary tracking-wide uppercase">Getting Here</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Train className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-foreground">Tram</p>
                  <p className="text-xs text-muted-foreground">3 min from White Swan stop (3, 8, 14, 24)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <TrainFront className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-foreground">Metro</p>
                  <p className="text-xs text-muted-foreground">5 min from Florenc (B, C lines)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ExternalLink className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="text-xs text-primary">
                  Parking options available nearby.
                </span>
              </div>
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card glow-border p-6 space-y-5"
          >
            <h3 className="font-display text-sm font-semibold text-accent tracking-wide uppercase">Reach Out</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-foreground">Phone</p>
                  <a href="tel:+000000000000" className="text-sm text-accent hover:underline">+00 000 000 000</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-foreground">Catering</p>
                  <a href="mailto:catering@example.com" className="text-xs text-accent hover:underline">catering@example.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs font-medium text-foreground">Events</p>
                  <a href="mailto:events@example.com" className="text-xs text-accent hover:underline">events@example.com</a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
