"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Music2, RefreshCw, Volume2 } from "lucide-react";
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
    speak(activity.celebration === false ? "Lovely!" : "Wonderful! Great job!");
    onComplete(attempts);
  };

  useEffect(() => {
    const phrase = activity.prompt;
    const timer = window.setTimeout(() => speak(phrase), 500);
    return () => window.clearTimeout(timer);
  }, [activity.id, activity.prompt, activity.type, speak]);

  return (
    <main className="activity-shell">
      <header className="activity-header">
        <button className="round-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        <div className="activity-title-wrap"><span className="eyebrow">{activity.category.replace("prewriting", "PRE-WRITING").toUpperCase()} PLAY</span><h1>{activity.title}</h1></div>
        <button className="round-button" onClick={() => speak(activity.prompt)} aria-label="Hear instruction"><Volume2 /></button>
      </header>
      <div className="instruction-pill"><Volume2 size={22} aria-hidden /><span>{activity.prompt}</span></div>
      {activity.type === "explore" && <Explore items={activity.items} speak={speak} onComplete={finish} threshold={activity.completionThreshold} />}
      {activity.type === "find" && <Find items={activity.items} speak={speak} onComplete={finish} onAttempt={() => setAttempts((v) => v + 1)} />}
      {activity.type === "matching" && <Matching items={activity.items} speak={speak} onComplete={finish} />}
      {activity.type === "sorting" && <Sorting items={activity.items} speak={speak} onComplete={finish} onAttempt={() => setAttempts((v) => v + 1)} />}
      {activity.type === "memory" && <Memory items={activity.items} speak={speak} onComplete={finish} />}
      {activity.type === "peekaboo" && <Peekaboo items={activity.items} speak={speak} onComplete={finish} />}
      {(activity.type === "choice" || activity.type === "pattern") && <Choice items={activity.items} speak={speak} onComplete={finish} />}
      {activity.type === "sequence" && <Sequence items={activity.items} speak={speak} onComplete={finish} />}
      {activity.type === "tracing" && <Tracing item={activity.items[0]} speak={speak} onComplete={finish} />}
      {activity.type === "music" && <MusicActivity items={activity.items} speak={speak} onComplete={finish} />}
      {complete && (activity.celebration === false ? <GentleFinish onContinue={onBack} /> : <Celebration onContinue={onBack} />)}
    </main>
  );
}

function Explore({ items, speak, onComplete, threshold }: { items: LearningItem[]; speak: (text: string) => void; onComplete: () => void; threshold?: number }) {
  const [seen, setSeen] = useState<string[]>([]);
  const tap = (item: LearningItem) => {
    speak(item.secondary ?? item.label);
    setSeen((current) => current.includes(item.id) ? current : [...current, item.id]);
  };
  return (
    <section className="color-grid" aria-label="Explore colors">
      {items.map((item) => (
        <motion.button key={item.id} className={`color-orb ${item.visual ? "visual-orb" : ""}`} style={{ "--orb-color": item.value } as React.CSSProperties} onClick={() => tap(item)} whileTap={{ scale: 0.9 }} animate={seen.at(-1) === item.id ? { y: [0, -12, 0], rotate: [0, -3, 3, 0] } : {}}>
          <span className="orb-shine" />{item.visual && <b>{item.visual}</b>}<strong>{item.label}</strong>
        </motion.button>
      ))}
      <button className="sunny-button wide-action" onClick={onComplete} disabled={seen.length < Math.min(threshold ?? 4, items.length)}>I explored {seen.length} {seen.length === 1 ? "thing" : "things"} <span>→</span></button>
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
        {options.map((item) => <motion.button key={item.id} className="find-orb" style={{ background: item.value }} onClick={() => choose(item)} whileTap={{ scale: 0.88 }} aria-label={item.label}>{item.visual && <b>{item.visual}</b>}<span>{item.label}</span></motion.button>)}
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
      <div className="match-column">{items.map((item) => <button key={item.id} disabled={matched.includes(item.id)} className={`match-tile ${selected?.id === item.id ? "selected" : ""}`} onClick={() => match(item)}><span style={{ background: item.value }}>{item.visual}</span>{item.label}</button>)}</div>
      <div className="match-lines">{items.map((_, i) => <span key={i}>•••</span>)}</div>
      <div className="match-column">{targets.map((item) => <button key={item.id} disabled={matched.includes(item.id)} className="match-target" onClick={() => match(item)} aria-label={`Match ${item.label}`}><span style={{ background: item.value }}>{item.visual}</span></button>)}</div>
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
    <section className="memory-grid">{cards.map((card) => { const faceUp = open.includes(card.key) || matched.includes(card.id); return <button key={card.key} className={`memory-card ${faceUp ? "face-up" : ""}`} onClick={() => flip(card)} aria-label={faceUp ? card.label : "Hidden learning card"}><span className="memory-front">★</span><span className="memory-back" style={{ background: card.value }}>{card.visual && <b>{card.visual}</b>}<small>{card.label}</small></span></button>; })}<button className="reset-memory" onClick={() => { setOpen([]); setMatched([]); }}><RefreshCw size={18} /> Start over</button></section>
  );
}

function Peekaboo({ items, speak, onComplete }: { items: LearningItem[]; speak: (text: string) => void; onComplete: () => void }) {
  const [open, setOpen] = useState<string[]>([]);
  const reveal = (item: LearningItem) => {
    if (open.includes(item.id)) return;
    const next = [...open, item.id]; setOpen(next); speak(`Peekaboo! ${item.label}`);
    if (next.length === items.length) window.setTimeout(onComplete, 700);
  };
  return <section className="peekaboo-grid">{items.map((item) => <motion.button key={item.id} className={`peekaboo-card ${open.includes(item.id) ? "revealed" : ""}`} style={{ "--peek-color": item.value } as React.CSSProperties} onClick={() => reveal(item)} whileTap={{ scale: .94 }} aria-label={`Reveal ${item.label}`}><span className="peek-cover">☁️</span><span className="peek-face">{item.visual}</span><strong>{open.includes(item.id) ? item.label : "Tap!"}</strong></motion.button>)}</section>;
}

function Choice({ items, speak, onComplete }: { items: LearningItem[]; speak: (text: string) => void; onComplete: () => void }) {
  const [hint, setHint] = useState("");
  const choose = (item: LearningItem) => {
    if (!item.correct) { setHint("Good try — look again!"); speak("Good try. Look again!"); return; }
    setHint(`Yes! ${item.label}!`); speak(`Yes! ${item.label}!`); window.setTimeout(onComplete, 650);
  };
  return <section className="choice-game"><div className="choice-options">{items.map((item) => <motion.button key={item.id} style={{ "--choice-color": item.value } as React.CSSProperties} onClick={() => choose(item)} whileTap={{ scale: .92 }}><b>{item.visual ?? item.label}</b><strong>{item.label}</strong></motion.button>)}</div><p className="gentle-feedback" aria-live="polite">{hint}</p></section>;
}

function Sequence({ items, speak, onComplete }: { items: LearningItem[]; speak: (text: string) => void; onComplete: () => void }) {
  const ordered = useMemo(() => [...items].sort((a, b) => Number(a.secondary) - Number(b.secondary)), [items]);
  const options = useMemo(() => shuffle(items), [items]);
  const [placed, setPlaced] = useState<LearningItem[]>([]);
  const choose = (item: LearningItem) => {
    if (item.id !== ordered[placed.length]?.id) { speak("Try another one."); return; }
    const next = [...placed, item]; setPlaced(next); speak(item.label);
    if (next.length === ordered.length) window.setTimeout(onComplete, 650);
  };
  return <section className="sequence-game"><div className="sequence-slots">{ordered.map((_, index) => <span key={index}>{placed[index]?.visual ?? "?"}</span>)}</div><div className="choice-options">{options.map((item) => <motion.button key={item.id} disabled={placed.some((entry) => entry.id === item.id)} style={{ "--choice-color": item.value } as React.CSSProperties} onClick={() => choose(item)} whileTap={{ scale: .92 }}><b>{item.visual}</b></motion.button>)}</div></section>;
}

function Tracing({ item, speak, onComplete }: { item: LearningItem; speak: (text: string) => void; onComplete: () => void }) {
  const dots = ["top", "left", "middle", "right"];
  const [step, setStep] = useState(0);
  const trace = (index: number) => {
    if (index !== step) { speak("Follow the next glowing dot."); return; }
    const next = step + 1; setStep(next); speak(next === dots.length ? `${item.label}!` : String(next));
    if (next === dots.length) window.setTimeout(onComplete, 650);
  };
  return <section className="trace-game"><div className="trace-letter" aria-label={`Trace ${item.label}`}><span>{item.visual}</span>{dots.map((name, index) => <button key={name} className={`trace-dot trace-${name} ${index < step ? "done" : index === step ? "next" : ""}`} onClick={() => trace(index)} aria-label={`Trace point ${index + 1}`}>{index < step ? <Check /> : index + 1}</button>)}</div><p>Follow the glowing dots.</p></section>;
}

function MusicActivity({ items, speak, onComplete }: { items: LearningItem[]; speak: (text: string) => void; onComplete: () => void }) {
  const [heard, setHeard] = useState<string[]>([]);
  const play = (item: LearningItem) => {
    speak(item.secondary ?? item.label);
    setHeard((current) => current.includes(item.id) ? current : [...current, item.id]);
  };
  const playAll = () => {
    speak(items.map((item) => item.secondary ?? item.label).join(" "));
    setHeard(items.map((item) => item.id));
  };
  return <section className="music-stage"><div className="music-cards">{items.map((item) => <motion.button key={item.id} className={heard.includes(item.id) ? "heard" : ""} style={{ "--music-color": item.value } as React.CSSProperties} onClick={() => play(item)} whileTap={{ scale: .96 }}><span>{item.visual ?? "🎵"}</span><strong>{item.label}</strong><small>{item.secondary}</small><em><Volume2 /> Listen</em></motion.button>)}</div><div className="music-actions"><button className="sing-all" onClick={playAll}><Music2 /> Play all</button><button className="sunny-button" onClick={onComplete} disabled={heard.length < items.length}>We sang together <span>→</span></button></div></section>;
}

function GentleFinish({ onContinue }: { onContinue: () => void }) {
  return <div className="gentle-finish"><div><span>⭐</span><h2>Lovely!</h2><p>You discovered something new.</p><button className="sunny-button" onClick={onContinue}>Keep exploring</button></div></div>;
}
