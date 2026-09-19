"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, MotionConfig, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Heart, Play, ShieldCheck, Sparkles } from "lucide-react";
import { heroMotion as timing } from "./motion";
import "./hero.css";

interface HeroProps { onStart: () => void; onInteraction?: (message: string) => void }
type MascotState = "welcome" | "idle" | "happy";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function Hero({ onStart, onInteraction }: HeroProps) {
  const reduced = useReducedMotion();
  const x = useSpring(0, timing.parallax);
  const y = useSpring(0, timing.parallax);
  const [leaving, setLeaving] = useState(false);
  const [happy, setHappy] = useState(false);
  const restore = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (restore.current) clearTimeout(restore.current); }, []);
  useEffect(() => { if (reduced) { x.set(0); y.set(0); } }, [reduced, x, y]);
  const react = () => {
    if (restore.current) clearTimeout(restore.current);
    setHappy(true);
    onInteraction?.("Yay! Let’s learn!");
    restore.current = setTimeout(() => setHappy(false), timing.messageDuration);
  };
  const move = (event: PointerEvent<HTMLElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - bounds.left) / bounds.width * 2 - 1);
    y.set((event.clientY - bounds.top) / bounds.height * 2 - 1);
  };
  return <MotionConfig reducedMotion="user"><motion.section className="hero living-hero" aria-label="Welcome to Little Learners"
    onPointerMove={move} onPointerLeave={() => { x.set(0); y.set(0); }}
    animate={{ opacity: leaving ? 0 : 1, y: leaving && !reduced ? -10 : 0 }}
    transition={{ duration: timing.departure }} onAnimationComplete={() => { if (leaving) onStart(); }}>
    <motion.div className="hero-copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: timing.entrance }}>
      <span className="hello-pill"><Sparkles size={17} /> A happy place to grow</span>
      <h1><motion.span className="hero-line" initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: timing.entrance, ease: timing.ease }}>Let’s learn</motion.span><motion.span className="hero-line" initial={{ opacity: 0, y: reduced ? 0 : 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: timing.entrance, delay: .18, ease: timing.ease }}>&amp; <em>play!</em></motion.span></h1>
      <p>Explore <i /> Play <i /> Discover</p>
      <motion.button className="primary-play hero-cta" onClick={() => setLeaving(true)} disabled={leaving} whileHover={{ scale: reduced ? 1 : 1.02 }} whileTap={{ scale: reduced ? 1 : .97 }}><span><Play fill="currentColor" /></span>Start Learning</motion.button>
      <div className="trust-row"><span><ShieldCheck /> Safe &amp; ad-free</span><span><Heart /> Made for little hands</span></div>
    </motion.div>
    <div className="hero-world">
      <Depth x={x} y={y} amount={2} className="world-backdrop"><div className="world-halo" /></Depth>
      <Depth x={x} y={y} amount={4} className="world-rainbow"><HeroRainbow reduced={!!reduced} /></Depth>
      <Depth x={x} y={y} amount={6} className="world-mascot"><HeroMascot happy={happy} reduced={!!reduced} onReact={react} /></Depth>
      <Depth x={x} y={y} amount={8} className="world-decorations"><HeroDecorations /></Depth>
      <motion.div className="hero-speech" role="status" aria-live="polite" initial={{ opacity: 0, scale: reduced ? 1 : .94, y: reduced ? 0 : 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: timing.bubbleDelay, duration: timing.entrance, ease: timing.ease }}>
        <div className="speech-inner"><span>{happy ? "Yay!" : "Hi, friend!"}</span><strong>{happy ? "Let’s learn!" : "Let’s play!"}</strong></div>
      </motion.div>
    </div>
  </motion.section></MotionConfig>;
}

function Depth({ x, y, amount, className, children }: { x: MotionValue<number>; y: MotionValue<number>; amount: number; className: string; children: React.ReactNode }) {
  const dx = useTransform(x, value => value * amount);
  const dy = useTransform(y, value => value * amount);
  return <motion.div className={className} style={{ x: dx, y: dy }}>{children}</motion.div>;
}

export function HeroMascot({ happy, reduced, onReact }: { happy: boolean; reduced: boolean; onReact: () => void }) {
  const [arrived, setArrived] = useState(false);
  const state: MascotState = !arrived ? "welcome" : happy ? "happy" : "idle";
  return <motion.div className="mascot-entrance" initial={{ opacity: 0, y: reduced ? 0 : 25, scale: reduced ? 1 : .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: timing.entrance, delay: timing.mascotDelay, ease: timing.ease }} onAnimationComplete={() => setArrived(true)}>
    <motion.button type="button" className="mascot-touch" data-state={state} aria-label="Play with the elephant" onClick={onReact}
      animate={reduced ? { y: 0, rotate: 0 } : happy ? { y: [0, -5, 0], rotate: [0, -1.5, 1, 0] } : { y: [0, -3, 0], rotate: [0, .35, 0] }}
      transition={{ duration: happy ? timing.reactionDuration : timing.idleDuration, repeat: happy || reduced ? 0 : Infinity, ease: "easeInOut" }} whileHover={reduced ? {} : { scale: 1.012 }} whileTap={reduced ? {} : { scale: .99 }}>
      <Image src={`${basePath}/mascot.png`} alt="" width={1280} height={1280} sizes="(max-width: 700px) 55vw, 390px" priority draggable={false} />
    </motion.button>
  </motion.div>;
}

function HeroRainbow({ reduced }: { reduced: boolean }) {
  return <svg className="living-rainbow" viewBox="0 0 360 230" fill="none" aria-hidden="true">{[0, 1, 2].map(index => <motion.path key={index} d={`M ${30 + index * 24} 214 V 160 A ${150 - index * 24} ${130 - index * 20} 0 0 1 ${330 - index * 24} 160 V 214`} className={`rainbow-arc arc-${index}`} strokeWidth="16" strokeLinecap="round" initial={{ pathLength: reduced ? 1 : 0, opacity: 0 }} animate={{ pathLength: 1, opacity: .7 }} transition={{ delay: timing.rainbowDelay + index * .16, duration: timing.entrance + .3, ease: timing.ease }} />)}</svg>;
}

function HeroDecorations() {
  return <div className="hero-decor" aria-hidden="true"><span className="world-star star-one">✦</span><span className="world-star star-two">★</span><span className="world-star star-three">✧</span><span className="world-bubble bubble-one" /><span className="world-bubble bubble-two" /></div>;
}
