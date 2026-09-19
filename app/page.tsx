"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, BarChart3, BookOpen, Gamepad2, Home, LockKeyhole, Music2, Play, Settings2, ShieldCheck, Sparkles, Star, Volume2, VolumeX } from "lucide-react";
import { Hero } from "@/components/hero/hero";
import { ActivityEngine } from "@/components/activity-engine";
import { LearningIcon } from "@/components/learning-icons";
import { ageGroupConfigs, ageGroups } from "@/data/age-groups";
import { useAudio } from "@/hooks/use-audio";
import { useLearningTools } from "@/hooks/use-webmcp";
import { progressStore } from "@/lib/progress-store";
import type { ActivityDefinition, AgeGroup, AgeGroupDefinition, CategoryId, ProgressRecord } from "@/types/learning";

type View = "home" | "dashboard" | "hub" | "activity" | "parent";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function HomePage() {
  const [view, setView] = useState<View>("home");
  const [selectedAge, setSelectedAge] = useState<AgeGroup>("2-3");
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>("colors");
  const [activity, setActivity] = useState<ActivityDefinition | null>(null);
  const [progress, setProgress] = useState<ProgressRecord[]>([]);
  const { muted, speak, toggleMute } = useAudio();
  const startedAt = useRef(0);
  const config = ageGroupConfigs[selectedAge];
  const ageProgress = progress.filter((item) => item.ageGroup === selectedAge);

  const openHub = useCallback((category: CategoryId | null = null) => { setSelectedCategory(category); setView("hub"); }, []);
  const toolNavigate = useCallback((destination: "dashboard" | "colors") => {
    setSelectedAge("2-3");
    if (destination === "colors") openHub("colors"); else setView("dashboard");
  }, [openHub]);

  useLearningTools(progress, toolNavigate);
  useEffect(() => { const timer = window.setTimeout(() => setProgress(progressStore.read()), 0); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [view]);

  const openActivity = (definition: ActivityDefinition) => { startedAt.current = Date.now(); setActivity(definition); setView("activity"); };
  const completeActivity = (attempts: number) => {
    if (!activity) return;
    setProgress(progressStore.save({ activityId: activity.id, category: activity.category, ageGroup: selectedAge, completed: true, attempts, duration: Math.max(10, Math.round((Date.now() - startedAt.current) / 1000)), completedAt: new Date().toISOString() }));
  };
  const chooseAge = (age: AgeGroup) => { setSelectedAge(age); setSelectedCategory(age === "2-3" ? "colors" : null); setView("dashboard"); speak(ageGroupConfigs[age].concept); };
  const openCategory = (category: CategoryId) => {
    if (!config.activities.some((item) => item.category === category)) { speak("This learning world is growing."); return; }
    openHub(category);
  };
  const continueLearning = () => {
    if (selectedAge === "2-3") openHub("colors");
    else if (config.activities[0]) openActivity(config.activities[0]);
  };

  if (view === "activity" && activity) return <ActivityEngine activity={activity} speak={speak} onBack={() => setView("hub")} onComplete={completeActivity} />;

  return <div className={`app-shell stage-${config.world}`}>
    <TopBar muted={muted} toggleMute={toggleMute} onHome={() => setView("home")} onParent={() => setView("parent")} />
    <AnimatePresence mode="wait">
      {view === "home" && <Landing key="landing" chooseAge={chooseAge} onStart={() => chooseAge("2-3")} onInteraction={speak} />}
      {view === "dashboard" && <AgeDashboard key={`dashboard-${selectedAge}`} config={config} progress={ageProgress} onContinue={continueLearning} onCategory={openCategory} />}
      {view === "hub" && <ActivityHub key={`hub-${selectedAge}-${selectedCategory ?? "all"}`} config={config} categoryId={selectedCategory} progress={ageProgress} onBack={() => setView("dashboard")} openActivity={openActivity} />}
      {view === "parent" && <ParentDashboard key="parent" progress={progress} onBack={() => setView("home")} />}
    </AnimatePresence>
    {(view === "dashboard" || view === "hub") && <ChildNav active={view === "dashboard" ? "home" : selectedCategory === "music" ? "music" : "explore"} onHome={() => setView("dashboard")} onExplore={() => openHub(null)} onMusic={() => openHub("music")} />}
  </div>;
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

function Landing({ chooseAge, onStart, onInteraction }: { chooseAge: (age: AgeGroup) => void; onStart: () => void; onInteraction: (text: string) => void }) {
  return <motion.main className="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <Hero onStart={onStart} onInteraction={onInteraction} />
    <section className="age-section" id="ages"><div className="section-heading"><span>Pick a path</span><h2>Choose your age</h2><p>Every little learner grows in their own wonderful way.</p></div><div className="age-grid">{ageGroups.map((age, index) => <motion.button key={age.id} className="age-card" style={{ "--age-accent": age.accent } as React.CSSProperties} whileHover={{ y: -7 }} whileTap={{ scale: .97 }} onClick={() => chooseAge(age.id)}><span className="age-icon">{["●", "▲", "★", "◆", "✦"][index]}</span><strong>{age.id}</strong><h3>{age.title}</h3></motion.button>)}</div></section>
  </motion.main>;
}

function AgeDashboard({ config, progress, onContinue, onCategory }: { config: AgeGroupDefinition; progress: ProgressRecord[]; onContinue: () => void; onCategory: (id: CategoryId) => void }) {
  const available = new Set(config.activities.map((item) => item.category));
  return <motion.main className={`dashboard age-dashboard ${config.world}`} style={{ "--stage-accent": config.accent } as React.CSSProperties} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
    <section className="welcome-panel"><div><span className="eyebrow">{config.eyebrow}</span><h1>{config.welcome}<br /><em>{config.welcomeAccent}</em></h1><p>{config.instruction}</p></div><Image src={`${basePath}/mascot.png`} alt="Bibi the elephant" width={640} height={640} priority /><div className="progress-bubble"><Star fill="currentColor" /><strong>{progress.length}</strong><span>{config.id === "0-1" ? "things" : "activities"}<br />explored</span></div></section>
    <section className="continue-card" onClick={onContinue} role="button" tabIndex={0} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onContinue()}><div className="continue-icon">{config.id === "2-3" ? <PaletteDots /> : <LearningIcon name={config.categories[0].icon} />}</div><div><span>{progress.length ? "KEEP EXPLORING" : "START HERE"}</span><h2>{config.id === "2-3" ? "Colors are everywhere!" : config.activities[0]?.title}</h2><p>{config.id === "2-3" ? "Explore bright and happy colors" : config.concept}</p></div><button aria-label={`Start ${config.activities[0]?.title}`}><Play fill="currentColor" /></button></section>
    <div className="dashboard-heading"><div><span>{config.world.toUpperCase()} WORLD</span><h2>Pick a learning world</h2></div><p>Tap any glowing card to begin</p></div>
    <section className={`category-grid category-count-${config.categories.length}`}>{config.categories.map((category) => { const ready = available.has(category.id); const count = config.activities.filter((item) => item.category === category.id).length; return <motion.button key={category.id} className={`category-card ${category.tone} ${ready ? "ready" : "coming"}`} whileHover={ready ? { y: -5 } : undefined} whileTap={ready ? { scale: .97 } : undefined} onClick={() => onCategory(category.id)} aria-label={`${category.label}. ${ready ? `${count} activities` : "Coming soon"}`}><span className="category-icon"><LearningIcon name={category.icon} /></span><strong>{category.label}</strong><small>{ready ? `${count} ${count === 1 ? "activity" : "activities"}` : "Coming soon"}</small>{ready && <span className="card-arrow">→</span>}</motion.button>; })}</section>
  </motion.main>;
}

function ActivityHub({ config, categoryId, progress, onBack, openActivity }: { config: AgeGroupDefinition; categoryId: CategoryId | null; progress: ProgressRecord[]; onBack: () => void; openActivity: (activity: ActivityDefinition) => void }) {
  const activities = categoryId ? config.activities.filter((item) => item.category === categoryId) : config.activities;
  const [page, setPage] = useState(0);
  const pageSize = 5;
  const pageCount = Math.max(1, Math.ceil(activities.length / pageSize));
  const visibleActivities = activities.slice(page * pageSize, (page + 1) * pageSize);
  const category = config.categories.find((item) => item.id === categoryId);
  const title = category?.label ?? `${config.dashboardName} activities`;
  const visuals = ["● ▲ ■", "?", "↔", "1 2 3", "★"];
  return <motion.main className="colors-hub activity-hub" style={{ "--stage-accent": config.accent } as React.CSSProperties} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}><button className="back-link" onClick={onBack}><ArrowLeft /> Back to explore</button><section className="hub-title"><div className="hub-palette"><LearningIcon name={category?.icon ?? "sparkles"} /></div><div><span className="eyebrow">{config.dashboardName.toUpperCase()} · {activities.length} ACTIVITIES</span><h1>Play with <em>{title.toLowerCase()}!</em></h1><p>{config.instruction}</p></div></section><section className={`activity-list ${activities.length === 1 ? "single" : ""}`}>{visibleActivities.map((item, index) => { const number = page * pageSize + index + 1; const done = progress.some((record) => record.activityId === item.id); return <motion.button key={item.id} className={`activity-card activity-${(index % 5) + 1}`} onClick={() => openActivity(item)} whileHover={{ y: -6 }} whileTap={{ scale: .98 }}><span className="activity-number">{number}</span><span className="activity-visual">{item.items[0]?.visual ?? visuals[index % visuals.length]}</span><span className="activity-copy"><small>{activityTypeLabel(item.type)}</small><strong>{item.title}</strong><em>{item.prompt}</em></span><span className="activity-play">{done ? "✓" : <Play fill="currentColor" />}</span></motion.button>; })}</section>{pageCount > 1 && <nav className="activity-pages" aria-label="Activity pages"><button onClick={() => setPage((value) => Math.max(0, value - 1))} disabled={page === 0}>← Previous</button><span>{page + 1} of {pageCount}</span><button onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))} disabled={page === pageCount - 1}>Next →</button></nav>}</motion.main>;
}

function activityTypeLabel(type: ActivityDefinition["type"]) {
  const labels: Record<ActivityDefinition["type"], string> = { explore: "explore", find: "find", matching: "match", sorting: "sort", memory: "memory", peekaboo: "peekaboo", choice: "choose", sequence: "put in order", pattern: "pattern", tracing: "trace", music: "sing & rhyme" };
  return labels[type];
}

function ParentDashboard({ progress, onBack }: { progress: ProgressRecord[]; onBack: () => void }) {
  const minutes = Math.max(0, Math.round(progress.reduce((sum, item) => sum + item.duration, 0) / 60));
  const exploredAges = new Set(progress.map((item) => item.ageGroup));
  return <motion.main className="parent-dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><button className="back-link" onClick={onBack}><ArrowLeft /> Back to learning</button><div className="parent-heading"><div><span>PARENT SPACE</span><h1>Little Learners’ journey</h1><p>A gentle look at what has been explored on this device.</p></div><Settings2 /></div><section className="stat-grid"><div><BarChart3 /><strong>{progress.length}</strong><span>activities explored</span></div><div><Star /><strong>{minutes}</strong><span>minutes of play</span></div><div><Sparkles /><strong>{exploredAges.size}</strong><span>age worlds visited</span></div></section><section className="skills-panel"><div><span className="eyebrow">AGE WORLDS</span><h2>Growing through play</h2></div>{ageGroups.map((item) => { const explored = exploredAges.has(item.id); return <div className="skill-row" key={item.id}><LearningIcon name={item.categories[0].icon} /><span><strong>{item.dashboardName}</strong><small>{item.concept}</small></span><em className={explored ? "explored" : ""}>{explored ? "Explored" : "Ready"}</em></div>; })}</section><p className="privacy-note"><ShieldCheck /> Progress stays on this device. No ads, profiles, or child data collection.</p></motion.main>;
}

function ChildNav({ active, onHome, onExplore, onMusic }: { active: "home" | "explore" | "music"; onHome: () => void; onExplore: () => void; onMusic: () => void }) {
  return <nav className="child-nav" aria-label="Learning sections"><button className={active === "home" ? "active" : ""} onClick={onHome}><Home />Home</button><button className={active === "explore" ? "active" : ""} onClick={onExplore}><Sparkles />Explore</button><button onClick={onExplore}><Gamepad2 />Games</button><button onClick={onExplore}><BookOpen />Stories</button><button className={active === "music" ? "active" : ""} onClick={onMusic}><Music2 />Music</button></nav>;
}

function PaletteDots() { return <span className="palette-dots" aria-hidden><i /><i /><i /><i /></span>; }
