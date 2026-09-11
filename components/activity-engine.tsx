"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Volume2 } from "lucide-react";
import type { ActivityDefinition, LearningItem } from "@/types/learning";
import { Celebration } from "@/components/celebration";

interface ActivityEngineProps {
  activity: ActivityDefinition;
  onBack: () => void;
  onComplete: (attempts: number) => void;
  speak: (text: string) => void;
}

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

export function ActivityEngine({ activity, onBack, onComplete, speak }: ActivityEngineProps) {
  const [complete, setComplete] = useState(false);
  const [attempts, setAttempts] = useState(1);

  const finish = () => {
    setComplete(true);
    speak("Wonderful! Great job!");
    onComplete(attempts);
  };

  useEffect(() => {
    const phrase = activity.type === "explore" ? "Let’s learn colors! Tap a color." : activity.prompt;
    const timer = window.setTimeout(() => speak(phrase), 500);
    return () => window.clearTimeout(timer);
  }, [activity.id, activity.prompt, activity.type, speak]);

  return (
    <main className="activity-shell">
      <header className="activity-header">
        <button className="round-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        <div className="activity-title-wrap"><span className="eyebrow">COLOR PLAY</span><h1>{activity.title}</h1></div>
        <button className="round-button" onClick={() => speak(activity.prompt)} aria-label="Hear instruction"><Volume2 /></button>
      </header>
      <div className="instruction-pill"><Volume2 size={22} aria-hidden /><span>{activity.prompt}</span></div>
      {activity.type === "explore" && <Explore items={activity.items} speak={speak} onComplete={finish} />}
      {activity.type === "find" && <Find items={activity.items} speak={speak} onComplete={finish} onAttempt={() => setAttempts((v) => v + 1)} />}
      {activity.type === "matching" && <Matching items={activity.items} speak={speak} onComplete={finish} />}
      {activity.type === "sorting" && <Sorting items={activity.items} speak={speak} onComplete={finish} onAttempt={() => setAttempts((v) => v + 1)} />}
      {activity.type === "memory" && <Memory items={activity.items} speak={speak} onComplete={finish} />}
      {complete && <Celebration onContinue={onBack} />}
    </main>
  );
}

function Explore({ items, speak, onComplete }: { items: LearningItem[]; speak: (text: string) => void; onComplete: () => void }) {
  const [seen, setSeen] = useState<string[]>([]);
  const tap = (item: LearningItem) => {
    speak(item.label);
    setSeen((current) => current.includes(item.id) ? current : [...current, item.id]);
  };
  return (
    <section className="color-grid" aria-label="Explore colors">
      {items.map((item) => (
        <motion.button key={item.id} className="color-orb" style={{ "--orb-color": item.value } as React.CSSProperties} onClick={() => tap(item)} whileTap={{ scale: 0.9 }} animate={seen.at(-1) === item.id ? { y: [0, -18, 0], rotate: [0, -4, 4, 0] } : {}}>
          <span className="orb-shine" /><strong>{item.label}</strong>
        </motion.button>
      ))}
      <button className="sunny-button wide-action" onClick={onComplete} disabled={seen.length < 4}>I explored {seen.length} colors <span>→</span></button>
    </section>
  );
}

function Find({ items, speak, onComplete, onAttempt }: { items: LearningItem[]; speak: (text: string) => void; onComplete: () => void; onAttempt: () => void }) {
  const [round, setRound] = useState(0);
  const [hint, setHint] = useState("");
  const targets = useMemo(() => items.slice(0, 3), [items]);
  const target = targets[round % targets.length];
  const options = useMemo(() => shuffle([...targets.slice(round % targets.length), ...targets.slice(0, round % targets.length)]), [round, targets]);
  const choose = (item: LearningItem) => {
    if (item.id !== target.id) {
      setHint("Almost! Look again."); speak("Almost! Can you find it?"); onAttempt(); return;
    }
    speak(`Yes! ${item.label}. Great job!`); setHint("You found it!");
    if (round === 2) window.setTimeout(onComplete, 550);
    else window.setTimeout(() => { setRound((value) => value + 1); setHint(""); }, 650);
  };
  return (
    <section className="find-game">
      <p className="big-prompt">Can you find <strong style={{ color: target.value }}>{target.label}</strong>?</p>
      <div className="find-options">
        {options.map((item) => <motion.button key={item.id} className="find-orb" style={{ background: item.value }} onClick={() => choose(item)} whileTap={{ scale: 0.88 }} aria-label={item.label}><span>{item.label}</span></motion.button>)}
      </div>
      <p className="gentle-feedback" aria-live="polite">{hint || `${round + 1} of 3`}</p>
    </section>
  );
}

function Matching({ items, speak, onComplete }: { items: LearningItem[]; speak: (text: string) => void; onComplete: () => void }) {
  const [selected, setSelected] = useState<LearningItem | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const targets = useMemo(() => shuffle(items), [items]);
  const match = (item: LearningItem) => {
    if (!selected) { setSelected(item); speak(item.label); return; }
    if (selected.id === item.id) {
      const next = [...matched, item.id]; setMatched(next); setSelected(null); speak("A perfect match!");
      if (next.length === items.length) window.setTimeout(onComplete, 500);
    } else { setSelected(null); speak("Almost! Let’s try again."); }
  };
  return (
    <section className="match-board">
      <div className="match-column">{items.map((item) => <button key={item.id} disabled={matched.includes(item.id)} className={`match-tile ${selected?.id === item.id ? "selected" : ""}`} onClick={() => match(item)}><span style={{ background: item.value }} />{item.label}</button>)}</div>
      <div className="match-lines">{items.map((_, i) => <span key={i}>•••</span>)}</div>
      <div className="match-column">{targets.map((item) => <button key={item.id} disabled={matched.includes(item.id)} className="match-target" onClick={() => match(item)} aria-label={`Match ${item.label}`}><span style={{ background: item.value }} /></button>)}</div>
    </section>
  );
}

function Sorting({ items, speak, onComplete, onAttempt }: { items: LearningItem[]; speak: (text: string) => void; onComplete: () => void; onAttempt: () => void }) {
  const [selected, setSelected] = useState<LearningItem | null>(null);
  const [sorted, setSorted] = useState<string[]>([]);
  const drop = (basket: LearningItem) => {
    if (!selected) { speak("Choose a color first"); return; }
    if (selected.id === basket.id) {
      const next = [...sorted, selected.id]; setSorted(next); setSelected(null); speak("In it goes!");
      if (next.length === items.length) window.setTimeout(onComplete, 500);
    } else { setSelected(null); onAttempt(); speak("Almost! Find the same color basket."); }
  };
  return (
    <section className="sort-board">
      <div className="sort-items">{items.filter((item) => !sorted.includes(item.id)).map((item) => <motion.button key={item.id} className={`sort-dot ${selected?.id === item.id ? "selected" : ""}`} style={{ background: item.value }} onClick={() => { setSelected(item); speak(`${item.label}. Find its basket.`); }} whileTap={{ scale: .9 }}><span>{item.label}</span></motion.button>)}</div>
      <div className="baskets">{items.map((item) => <button key={item.id} className="basket" style={{ "--basket": item.value } as React.CSSProperties} onClick={() => drop(item)}><span className="basket-handle" /><strong>{item.label}</strong></button>)}</div>
    </section>
  );
}

function Memory({ items, speak, onComplete }: { items: LearningItem[]; speak: (text: string) => void; onComplete: () => void }) {
  const cards = useMemo(() => shuffle([...items, ...items].map((item, index) => ({ ...item, key: `${item.id}-${index}` }))), [items]);
  const [open, setOpen] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const flip = (card: (typeof cards)[number]) => {
    if (open.length === 2 || open.includes(card.key) || matched.includes(card.id)) return;
    const next = [...open, card.key]; setOpen(next); speak(card.label);
    if (next.length === 2) {
      const pair = next.map((key) => cards.find((item) => item.key === key)!);
      if (pair[0].id === pair[1].id) {
        const nextMatched = [...matched, card.id]; setMatched(nextMatched); window.setTimeout(() => setOpen([]), 500);
        if (nextMatched.length === items.length) window.setTimeout(onComplete, 750);
      } else window.setTimeout(() => { setOpen([]); speak("Let’s look again!"); }, 800);
    }
  };
  return (
    <section className="memory-grid">{cards.map((card) => { const faceUp = open.includes(card.key) || matched.includes(card.id); return <button key={card.key} className={`memory-card ${faceUp ? "face-up" : ""}`} onClick={() => flip(card)} aria-label={faceUp ? card.label : "Hidden color card"}><span className="memory-front">★</span><span className="memory-back" style={{ background: card.value }}>{card.label}</span></button>; })}<button className="reset-memory" onClick={() => { setOpen([]); setMatched([]); }}><RefreshCw size={18} /> Start over</button></section>
  );
}
