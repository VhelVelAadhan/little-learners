"use client";

import { motion } from "framer-motion";

export function Celebration({ message = "Wonderful!", onContinue }: { message?: string; onContinue: () => void }) {
  return (
    <motion.div className="celebration" initial={{ opacity: 0 }} animate={{ opacity: 1 }} aria-live="polite">
      {[...Array(14)].map((_, index) => (
        <motion.span
          className="confetti"
          key={index}
          style={{ left: `${5 + index * 7}%`, background: ["#f46f72", "#f6c84c", "#68b885", "#6f9fe9"][index % 4] }}
          initial={{ y: -80, rotate: 0 }}
          animate={{ y: "85vh", rotate: 360 }}
          transition={{ duration: 1.8, delay: index * 0.04 }}
        />
      ))}
      <motion.div className="celebration-card" initial={{ scale: 0.55, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", bounce: 0.55 }}>
        <span className="celebration-star">★</span>
        <h2>{message}</h2>
        <p>You found it!</p>
        <button className="sunny-button celebration-next" onClick={onContinue}>Play another <span>→</span></button>
      </motion.div>
    </motion.div>
  );
}
