"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, BarChart3, BookOpen, Gamepad2, Heart, Home, LockKeyhole, Music2, Play, Settings2, ShieldCheck, Sparkles, Star, Volume2, VolumeX } from "lucide-react";
import { ActivityEngine } from "@/components/activity-engine";
import { LearningIcon } from "@/components/learning-icons";
import { ageGroups, categories, colorActivities } from "@/data/content";
import { useAudio } from "@/hooks/use-audio";
import { useLearningTools } from "@/hooks/use-webmcp";
import { progressStore } from "@/lib/progress-store";
import type { ActivityDefinition, ProgressRecord } from "@/types/learning";

type View = "home" | "dashboard" | "colors" | "activity" | "parent";

export default function HomePage() {
  const [view, setView] = useState<View>("home");
  const [activity, setActivity] = useState<ActivityDefinition | null>(null);
  const [progress, setProgress] = useState<ProgressRecord[]>([]);
  const [ageNotice, setAgeNotice] = useState("");
  const { muted, speak, toggleMute } = useAudio();
  const startedAt = useRef(0);
  const toolNavigate = useCallback((destination: "dashboard" | "colors") => setView(destination), []);
  useLearningTools(progress, toolNavigate);
  useEffect(() => { const timer = window.setTimeout(() => setProgress(progressStore.read()), 0); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [view]);
  const openActivity = (definition: ActivityDefinition) => { startedAt.current = Date.now(); setActivity(definition); setView("activity"); };
  const completeActivity = (attempts: number) => {
    if (!activity) return;
    setProgress(progressStore.save({ activityId: activity.id, category: activity.category, ageGroup: "2-3", completed: true, attempts, duration: Math.max(10, Math.round((Date.now() - startedAt.current) / 1000)), completedAt: new Date().toISOString() }));
  };
  const chooseAge = (age: string) => {
    if (age === "2-3") { setView("dashboard"); setAgeNotice(""); speak("Let’s play and learn!"); }
    else setAgeNotice("This world is growing! Ages 2–3 is ready to play now.");
  };
  if (view === "activity" && activity) return <ActivityEngine activity={activity} speak={speak} onBack={() => setView("colors")} onComplete={completeActivity} />;
  return (
    <div className="app-shell">
      <TopBar muted={muted} toggleMute={toggleMute} onHome={() => setView("home")} onParent={() => setView("parent")} />
      <AnimatePresence mode="wait">
        {view === "home" && <Landing key="landing" chooseAge={chooseAge} onStart={() => document.getElementById("ages")?.scrollIntoView({ behavior: "smooth" })} notice={ageNotice} />}
        {view === "dashboard" && <Dashboard key="dashboard" progress={progress} onColors={() => setView("colors")} />}
        {view === "colors" && <ColorsHub key="colors" progress={progress} onBack={() => setView("dashboard")} openActivity={openActivity} />}
        {view === "parent" && <ParentDashboard key="parent" progress={progress} onBack={() => setView("home")} />}
      </AnimatePresence>
      {view === "dashboard" && <ChildNav onHome={() => setView("dashboard")} onColors={() => setView("colors")} />}
    </div>
  );
}

function TopBar({ muted, toggleMute, onHome, onParent }: { muted: boolean; toggleMute: () => void; onHome: () => void; onParent: () => void }) {
  return <header className="topbar"><button className="brand" onClick={onHome} aria-label="Little Learners home"><span className="brand-mark">L</span><span>Little<br /><strong>Learners</strong></span></button><nav className="parent-actions" aria-label="Settings"><button className="icon-control" onClick={toggleMute} aria-label={muted ? "Turn sound on" : "Mute sound"}>{muted ? <VolumeX /> : <Volume2 />}</button><ParentGate onOpen={onParent} /></nav></header>;
}

function ParentGate({ onOpen }: { onOpen: () => void }) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const start = () => { timer.current = setTimeout(onOpen, 1100); };
  const stop = () => { if (timer.current) clearTimeout(timer.current); timer.current = null; };
  return <button className="parent-link" onPointerDown={start} onPointerUp={stop} onPointerLeave={stop}><LockKeyhole size={18} /><span>Parents</span><small>hold</small></button>;
}

function Landing({ chooseAge, onStart, notice }: { chooseAge: (age: string) => void; onStart: () => void; notice: string }) {
  return <motion.main className="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <section className="hero"><div className="hero-copy"><span className="hello-pill"><Sparkles size={17} /> A happy place to grow</span><h1>Let’s learn<br />&amp; <em>play!</em></h1><p>Explore <i /> Play <i /> Discover</p><button className="primary-play" onClick={onStart}><span><Play fill="currentColor" /></span>Start Learning</button><div className="trust-row"><span><ShieldCheck /> Safe &amp; ad-free</span><span><Heart /> Made for little hands</span></div></div>
      <div className="hero-art" aria-label="Bibi the elephant mascot"><div className="rainbow" aria-hidden><span /><span /><span /></div><div className="sparkle s1">✦</div><div className="sparkle s2">★</div><motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3.5 }}><Image src="/mascot.png" alt="Bibi, a friendly blue elephant waving" width={640} height={640} priority /></motion.div><div className="speech-bubble">Hi, friend! <strong>Let’s play!</strong></div></div></section>
    <section className="age-section" id="ages"><div className="section-heading"><span>Pick a path</span><h2>Choose your age</h2><p>Every little learner grows in their own wonderful way.</p></div><div className="age-grid">{ageGroups.map((age, index) => <motion.button key={age.id} className={`age-card ${age.id === "2-3" ? "featured" : ""}`} style={{ "--age-accent": age.accent } as React.CSSProperties} whileHover={{ y: -7 }} whileTap={{ scale: .97 }} onClick={() => chooseAge(age.id)}>{age.id === "2-3" && <span className="ready-badge">READY TO PLAY</span>}<span className="age-icon">{["●", "▲", "★", "◆", "✦"][index]}</span><strong>{age.id}</strong><h3>{age.title}</h3><p>{age.subtitle}</p></motion.button>)}</div>{notice && <p className="age-notice" role="status">{notice}</p>}</section>
  </motion.main>;
}

function Dashboard({ progress, onColors }: { progress: ProgressRecord[]; onColors: () => void }) {
  return <motion.main className="dashboard" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><section className="welcome-panel"><div><span className="eyebrow">HELLO, LITTLE EXPLORER!</span><h1>What shall we<br /><em>discover today?</em></h1><p>Pick something fun and let’s play.</p></div><Image src="/mascot.png" alt="Bibi the elephant" width={640} height={640} /><div className="progress-bubble"><Star fill="currentColor" /><strong>{progress.length}</strong><span>activities<br />explored</span></div></section><section className="continue-card" onClick={onColors} role="button" tabIndex={0} onKeyDown={(event) => event.key === "Enter" && onColors()}><div className="continue-icon"><PaletteDots /></div><div><span>CONTINUE PLAYING</span><h2>Colors are everywhere!</h2><p>Explore bright and happy colors</p></div><button aria-label="Continue colors"><Play fill="currentColor" /></button></section><div className="dashboard-heading"><div><span>EXPLORE</span><h2>Pick a learning world</h2></div><p>Tap any card to begin</p></div><section className="category-grid">{categories.map((category) => <motion.button key={category.id} className={`category-card ${category.tone}`} whileHover={{ y: -6 }} whileTap={{ scale: .97 }} onClick={category.id === "colors" ? onColors : undefined}><span className="category-icon"><LearningIcon name={category.icon} /></span><strong>{category.label}</strong><small>{category.id === "colors" ? "5 fun games" : "Coming soon"}</small><span className="card-arrow">→</span></motion.button>)}</section></motion.main>;
}

function ColorsHub({ progress, onBack, openActivity }: { progress: ProgressRecord[]; onBack: () => void; openActivity: (activity: ActivityDefinition) => void }) {
  return <motion.main className="colors-hub" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}><button className="back-link" onClick={onBack}><ArrowLeft /> Back to explore</button><section className="hub-title"><div className="hub-palette"><PaletteDots /></div><div><span className="eyebrow">LEARNING WORLD</span><h1>Play with <em>colors!</em></h1><p>Tap a game. Listen, look, and have fun.</p></div></section><section className="activity-list">{colorActivities.map((item, index) => { const done = progress.some((record) => record.activityId === item.id); return <motion.button key={item.id} className={`activity-card activity-${index + 1}`} onClick={() => openActivity(item)} whileHover={{ y: -6 }} whileTap={{ scale: .98 }}><span className="activity-number">{index + 1}</span><span className="activity-visual">{["● ▲ ■", "?", "↔", "↓", "▣"][index]}</span><span className="activity-copy"><small>{item.type.replace("sorting", "drag & drop")}</small><strong>{item.title}</strong><em>{item.prompt}</em></span><span className="activity-play">{done ? "✓" : <Play fill="currentColor" />}</span></motion.button>; })}</section></motion.main>;
}

function ParentDashboard({ progress, onBack }: { progress: ProgressRecord[]; onBack: () => void }) {
  const minutes = Math.max(0, Math.round(progress.reduce((sum, item) => sum + item.duration, 0) / 60));
  return <motion.main className="parent-dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><button className="back-link" onClick={onBack}><ArrowLeft /> Back to learning</button><div className="parent-heading"><div><span>PARENT SPACE</span><h1>Little Explorer’s journey</h1><p>A gentle look at what your child has explored.</p></div><Settings2 /></div><section className="stat-grid"><div><BarChart3 /><strong>{progress.length}</strong><span>activities explored</span></div><div><Star /><strong>{minutes}</strong><span>minutes of play</span></div><div><Sparkles /><strong>{progress.length ? 1 : 0}</strong><span>skills practiced</span></div></section><section className="skills-panel"><div><span className="eyebrow">SKILLS</span><h2>Growing through play</h2></div>{categories.map((item) => { const explored = progress.some((record) => record.category === item.id); return <div className="skill-row" key={item.id}><LearningIcon name={item.icon} /><span><strong>{item.label}</strong><small>{explored ? "Explored and practiced" : "Ready when they are"}</small></span><em className={explored ? "explored" : ""}>{explored ? "Explored" : "Not yet"}</em></div>; })}</section><p className="privacy-note"><ShieldCheck /> Progress stays on this device. No ads, profiles, or child data collection.</p></motion.main>;
}

function ChildNav({ onHome, onColors }: { onHome: () => void; onColors: () => void }) { return <nav className="child-nav" aria-label="Learning sections"><button className="active" onClick={onHome}><Home />Home</button><button onClick={onColors}><Sparkles />Explore</button><button><Gamepad2 />Games</button><button><BookOpen />Stories</button><button><Music2 />Music</button></nav>; }
function PaletteDots() { return <span className="palette-dots" aria-hidden><i /><i /><i /><i /></span>; }
