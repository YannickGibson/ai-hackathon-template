import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Maximize, ArrowRight } from "lucide-react";

const rooms = [
  { name: "Fireplace", image: "/placeholder.svg", capacity: 25, area: 37, priceHour: 24.5, priceDay: 165, floor: "1st floor", desc: "Theatre or circular seating available" },
  { name: "Banana", image: "/placeholder.svg", capacity: 20, area: 31, priceHour: 24.5, priceDay: 165, floor: "1st floor", desc: "Theatre or circular seating available" },
  { name: "Olive", image: "/placeholder.svg", capacity: 10, area: 28, priceHour: 17.5, priceDay: 140, floor: "Ground floor", desc: "Fixed table and chairs layout" },
  { name: "Salmon", image: "/placeholder.svg", capacity: 10, area: 20, priceHour: 17.5, priceDay: 140, floor: "Ground floor", desc: "Fixed table and chairs layout" },
  { name: "Mango", image: "/placeholder.svg", capacity: 6, area: 14, priceHour: 9, priceDay: 110, floor: "Ground floor", desc: "Small circular seating available" },
  { name: "Lemon", image: "/placeholder.svg", capacity: 6, area: 17, priceHour: 9, priceDay: 110, floor: "Ground floor", desc: "Fixed table and chairs layout" },
  { name: "Kiwi", image: "/placeholder.svg", capacity: 4, area: 12, priceHour: 11, priceDay: 115, floor: "Ground floor", desc: "Ideal for coaches & therapists" },
];

const RoomCard = ({ room, index }: { room: typeof rooms[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group glass-card overflow-hidden hover:border-primary/30 transition-all duration-500"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/2]">
        <img
          src={room.image}
          alt={`Room ${room.name}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
        
        {/* Floor badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 bg-background/80 backdrop-blur-sm rounded-md text-[10px] text-muted-foreground font-medium tracking-wide uppercase">
          {room.floor}
        </div>

        {/* Name overlay */}
        <div className="absolute bottom-3 left-4">
          <h3 className="font-display text-xl font-bold text-foreground">{room.name}</h3>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-primary" />
            up to {room.capacity}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="w-3.5 h-3.5 text-primary" />
            {room.area} m²
          </span>
        </div>

        <p className="text-xs text-muted-foreground/70">{room.desc}</p>

        <div className="flex items-center justify-between pt-3 border-t border-border/30">
          <div>
            <span className="text-lg font-display font-bold text-gradient-warm">${room.priceHour}</span>
            <span className="text-xs text-muted-foreground ml-1">/hr</span>
          </div>
          <div className="text-xs text-muted-foreground">
            ${room.priceDay}/day
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const RoomsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="rooms" className="py-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-label">Rooms</p>
          <h2 className="section-title">7 Rooms for Rent</h2>
          <p className="section-desc">
            Rooms for 2 to 25 people with free Wi-Fi, projector, flipchart and reception services included in the price.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room, i) => (
            <RoomCard key={room.name} room={room} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary text-sm hover:gap-3 transition-all duration-300"
          >
            Request full price list <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default RoomsSection;
