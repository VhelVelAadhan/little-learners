"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Music2, RefreshCw, Volume2 } from "lucide-react";
import type { ActivityDefinition, LearningItem, QuizQuestion } from "@/types/learning";
import { Celebration } from "@/components/celebration";
import { TracePad } from "@/components/trace-pad";

interface ActivityEngineProps {
  activity: ActivityDefinition;
  subjectLabel: string;
  onBack: () => void;
  onComplete: (attempts: number) => void;
  speak: (text: string) => void;
}

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

const FINISH_LABELS: Partial<Record<ActivityDefinition["type"], string>> = {
  music: "We sang together",
  story: "I heard the story",
  steps: "We did it!",
};

export function ActivityEngine({ activity, subjectLabel, onBack, onComplete, speak }: ActivityEngineProps) {
  const [complete, setComplete] = useState(false);
  const [attempts, setAttempts] = useState(1);

  const finish = () => {
    setComplete(true);
    speak("Wonderful! Great job!");
    onComplete(attempts);
  };

  useEffect(() => {
    if (activity.type === "quiz") return;
    const phrase = activity.prompt;
    const timer = window.setTimeout(() => speak(phrase), 500);
    return () => window.clearTimeout(timer);
  }, [activity.id, activity.prompt, activity.type, speak]);

  return (
    <main className="activity-shell">
      <header className="activity-header">
        <button className="round-button" onClick={onBack} aria-label="Go back"><ArrowLeft /></button>
        <div className="activity-title-wrap"><span className="eyebrow">{subjectLabel.toUpperCase()}</span><h1>{activity.title}</h1></div>
        <button className="round-button" onClick={() => speak(activity.prompt)} aria-label="Hear instruction"><Volume2 /></button>
      </header>
      <div className="instruction-pill"><Volume2 size={22} aria-hidden /><span>{activity.prompt}</span></div>
      {activity.type === "explore" && <Explore items={activity.items} speak={speak} onComplete={finish} threshold={activity.completionThreshold} />}
      {activity.type === "find" && <Find items={activity.items} speak={speak} onComplete={finish} onAttempt={() => setAttempts((v) => v + 1)} />}
      {activity.type === "matching" && <Matching items={activity.items} speak={speak} onComplete={finish} />}
      {activity.type === "sorting" && <Sorting items={activity.items} speak={speak} onComplete={finish} onAttempt={() => setAttempts((v) => v + 1)} />}
      {activity.type === "memory" && <Memory items={activity.items} speak={speak} onComplete={finish} />}
      {activity.type === "peekaboo" && <Peekaboo items={activity.items} speak={speak} onComplete={finish} />}
      {activity.type === "quiz" && <Quiz questions={activity.questions ?? []} speak={speak} onComplete={finish} onAttempt={() => setAttempts((v) => v + 1)} />}
      {activity.type === "sequence" && <Sequence items={activity.items} speak={speak} onComplete={finish} />}
      {activity.type === "tracing" && <TracePad item={activity.items[0]} speak={speak} onComplete={finish} />}
      {(activity.type === "music" || activity.type === "story" || activity.type === "steps") && <ReadAlong items={activity.items} finishLabel={FINISH_LABELS[activity.type] ?? "Done"} speak={speak} onComplete={finish} />}
      {complete && <Celebration onContinue={onBack} />}
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
    <section className={`color-grid ${items.length > 12 ? "dense" : ""}`} aria-label="Learning cards">
      {items.map((item) => (
        <motion.button key={item.id} className={`color-orb ${item.visual ? "visual-orb" : ""}`} style={{ "--orb-color": item.value } as React.CSSProperties} onClick={() => tap(item)} whileTap={{ scale: 0.9 }} animate={seen.at(-1) === item.id ? { y: [0, -12, 0], rotate: [0, -3, 3, 0] } : {}}>
          <span className="orb-shine" />{item.visual && <b className={[...item.visual].length > 2 ? "long" : ""}>{item.visual}</b>}<strong>{item.label}</strong>
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
  const pick = (item: LearningItem) => { setSelected(item); speak(item.label); };
  const match = (item: LearningItem) => {
    if (!selected) { speak("Tap a word first."); return; }
    if (selected.id === item.id) {
      const next = [...matched, item.id]; setMatched(next); setSelected(null); speak("A perfect match!");
      if (next.length === items.length) window.setTimeout(onComplete, 500);
    } else { setSelected(null); speak("Almost! Let’s try again."); }
  };
  return (
    <section className="match-board">
      <div className="match-column">{items.map((item) => <button key={item.id} disabled={matched.includes(item.id)} className={`match-tile ${selected?.id === item.id ? "selected" : ""}`} onClick={() => pick(item)}>{item.label}</button>)}</div>
      <div className="match-lines">{items.map((_, i) => <span key={i}>•••</span>)}</div>
      <div className="match-column">{targets.map((item) => <button key={item.id} disabled={matched.includes(item.id)} className="match-target" onClick={() => match(item)} aria-label={item.visual}><span style={{ background: item.value }}>{item.visual}</span></button>)}</div>
    </section>
  );
}

const BASKET_COLORS = ["#4f9fdc", "#ef6f72", "#55ad72"];

function Sorting({ items, speak, onComplete, onAttempt }: { items: LearningItem[]; speak: (text: string) => void; onComplete: () => void; onAttempt: () => void }) {
  const [selected, setSelected] = useState<LearningItem | null>(null);
  const [sorted, setSorted] = useState<string[]>([]);
  const baskets = useMemo(() => [...new Set(items.map((item) => item.group ?? ""))], [items]);
  const drop = (basket: string) => {
    if (!selected) { speak("Choose a card first."); return; }
    if (selected.group === basket) {
      const next = [...sorted, selected.id]; setSorted(next); setSelected(null); speak("In it goes!");
      if (next.length === items.length) window.setTimeout(onComplete, 500);
    } else { setSelected(null); onAttempt(); speak("Almost! Try another basket."); }
  };
  return (
    <section className="sort-board">
      <div className="sort-items">{items.filter((item) => !sorted.includes(item.id)).map((item) => <motion.button key={item.id} className={`sort-dot ${selected?.id === item.id ? "selected" : ""}`} style={{ background: item.value }} onClick={() => { setSelected(item); speak(`${item.label}. Find its basket.`); }} whileTap={{ scale: .9 }}>{item.visual && <b>{item.visual}</b>}<span>{item.label}</span></motion.button>)}</div>
      <div className="baskets">{baskets.map((basket, index) => <button key={basket} className="basket" style={{ "--basket": BASKET_COLORS[index % BASKET_COLORS.length] } as React.CSSProperties} onClick={() => drop(basket)}><span className="basket-handle" /><strong>{basket}</strong></button>)}</div>
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
  return <section className={`peekaboo-grid ${items.length > 4 ? "many" : ""} ${items.length > 8 ? "twelve" : ""}`}>{items.map((item) => <motion.button key={item.id} className={`peekaboo-card ${open.includes(item.id) ? "revealed" : ""}`} style={{ "--peek-color": item.value } as React.CSSProperties} onClick={() => reveal(item)} whileTap={{ scale: .94 }} aria-label={`Reveal ${item.label}`}><span className="peek-cover">☁️</span><span className="peek-face">{item.visual}</span><strong>{open.includes(item.id) ? item.label : "Tap!"}</strong></motion.button>)}</section>;
}

function Quiz({ questions, speak, onComplete, onAttempt }: { questions: QuizQuestion[]; speak: (text: string) => void; onComplete: () => void; onAttempt: () => void }) {
  const [index, setIndex] = useState(0);
  const [wrong, setWrong] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const current = questions[index];
  const options = useMemo(() => shuffle([current.answer, ...current.wrong]), [current]);

  useEffect(() => {
    const timer = window.setTimeout(() => speak(current.question), 500);
    return () => window.clearTimeout(timer);
  }, [current, speak]);

  const choose = (option: string) => {
    if (solved) return;
    if (option !== current.answer) {
      setWrong((value) => [...value, option]); onAttempt(); speak("Good try. Look again!"); return;
    }
    setSolved(true); speak(`Yes! ${option}!`);
    window.setTimeout(() => {
      if (index === questions.length - 1) { onComplete(); return; }
      setIndex((value) => value + 1); setWrong([]); setSolved(false);
    }, 1100);
  };

  return <section className="quiz-game">
    <p className="quiz-progress" aria-live="polite">Question {index + 1} of {questions.length}</p>
    {current.visual && <div className="quiz-visual" aria-hidden>{current.visual}</div>}
    <button className="quiz-question" onClick={() => speak(current.question)}>{current.question} <Volume2 size={20} aria-label="Hear question" /></button>
    <div className="quiz-options">{options.map((option) => <motion.button key={option} className={solved && option === current.answer ? "correct" : wrong.includes(option) ? "wrong" : ""} disabled={wrong.includes(option)} onClick={() => choose(option)} whileTap={{ scale: .96 }}>{option}</motion.button>)}</div>
  </section>;
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

function ReadAlong({ items, finishLabel, speak, onComplete }: { items: LearningItem[]; finishLabel: string; speak: (text: string) => void; onComplete: () => void }) {
  const [heard, setHeard] = useState<string[]>([]);
  const play = (item: LearningItem) => {
    speak(item.secondary ?? item.label);
    setHeard((current) => current.includes(item.id) ? current : [...current, item.id]);
  };
  const playAll = () => {
    speak(items.map((item) => item.secondary ?? item.label).join(" "));
    setHeard(items.map((item) => item.id));
  };
  return <section className="music-stage"><div className="music-cards">{items.map((item) => <motion.button key={item.id} className={heard.includes(item.id) ? "heard" : ""} style={{ "--music-color": item.value } as React.CSSProperties} onClick={() => play(item)} whileTap={{ scale: .96 }}><span>{item.visual ?? "🎵"}</span><strong>{item.label}</strong><small>{item.secondary}</small><em><Volume2 /> Listen</em></motion.button>)}</div><div className="music-actions"><button className="sing-all" onClick={playAll}><Music2 /> Play all</button><button className="sunny-button" onClick={onComplete} disabled={heard.length < items.length}>{finishLabel} <span>→</span></button></div></section>;
}
