"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, BarChart3, GraduationCap, Home, LayoutGrid, LockKeyhole, Play, Settings2, ShieldCheck, Sparkles, Star, Volume2, VolumeX } from "lucide-react";
import { Hero } from "@/components/hero/hero";
import { ActivityEngine } from "@/components/activity-engine";
import { LearningIcon } from "@/components/learning-icons";
import { classConfigs, classes } from "@/data/classes";
import { useAudio } from "@/hooks/use-audio";
import { useLearningTools } from "@/hooks/use-webmcp";
import { progressStore } from "@/lib/progress-store";
import type { ActivityDefinition, ClassDefinition, ClassLevel, ProgressRecord, SubjectId } from "@/types/learning";

type View = "home" | "dashboard" | "hub" | "activity" | "parent";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function HomePage() {
  const [view, setView] = useState<View>("home");
  const [selectedClass, setSelectedClass] = useState<ClassLevel>("pre-kg");
  const [selectedSubject, setSelectedSubject] = useState<SubjectId | null>(null);
  const [activity, setActivity] = useState<ActivityDefinition | null>(null);
  const [progress, setProgress] = useState<ProgressRecord[]>([]);
  const { muted, speak, toggleMute } = useAudio();
  const startedAt = useRef(0);
  const config = classConfigs[selectedClass];
  const classProgress = progress.filter((item) => item.classLevel === selectedClass);

  const openHub = useCallback((subject: SubjectId | null = null) => { setSelectedSubject(subject); setView("hub"); }, []);
  const toolNavigate = useCallback((classLevel: ClassLevel) => { setSelectedClass(classLevel); setSelectedSubject(null); setView("dashboard"); }, []);

  useLearningTools(progress, toolNavigate);
  useEffect(() => { const timer = window.setTimeout(() => setProgress(progressStore.read()), 0); return () => window.clearTimeout(timer); }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [view]);

  const openActivity = (definition: ActivityDefinition) => { startedAt.current = Date.now(); setActivity(definition); setView("activity"); };
  const completeActivity = (attempts: number) => {
    if (!activity) return;
    setProgress(progressStore.save({ activityId: activity.id, subject: activity.subject, classLevel: selectedClass, completed: true, attempts, duration: Math.max(10, Math.round((Date.now() - startedAt.current) / 1000)), completedAt: new Date().toISOString() }));
  };
  const chooseClass = (classLevel: ClassLevel) => { setSelectedClass(classLevel); setSelectedSubject(null); setView("dashboard"); speak(classConfigs[classLevel].title); };

  if (view === "activity" && activity) {
    const subjectLabel = config.subjects.find((item) => item.id === activity.subject)?.label ?? "";
    return <ActivityEngine activity={activity} subjectLabel={subjectLabel} speak={speak} onBack={() => setView("hub")} onComplete={completeActivity} />;
  }

  return <div className={`app-shell stage-${config.world}`}>
    <TopBar muted={muted} toggleMute={toggleMute} onHome={() => setView("home")} onParent={() => setView("parent")} />
    <AnimatePresence mode="wait">
      {view === "home" && <Landing key="landing" chooseClass={chooseClass} onStart={() => chooseClass(selectedClass)} onInteraction={speak} />}
      {view === "dashboard" && <ClassDashboard key={`dashboard-${selectedClass}`} config={config} progress={classProgress} onContinue={openActivity} onSubject={openHub} />}
      {view === "hub" && <ActivityHub key={`hub-${selectedClass}-${selectedSubject ?? "all"}`} config={config} subjectId={selectedSubject} progress={classProgress} onBack={() => setView("dashboard")} openActivity={openActivity} />}
      {view === "parent" && <ParentDashboard key="parent" progress={progress} onBack={() => setView("home")} />}
    </AnimatePresence>
    {(view === "dashboard" || view === "hub") && <ChildNav active={view === "dashboard" ? "subjects" : selectedSubject ? "subjects" : "all"} onSubjects={() => setView("dashboard")} onAll={() => openHub(null)} onClasses={() => setView("home")} />}
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

function Landing({ chooseClass, onStart, onInteraction }: { chooseClass: (classLevel: ClassLevel) => void; onStart: () => void; onInteraction: (text: string) => void }) {
  return <motion.main className="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <Hero onStart={onStart} onInteraction={onInteraction} />
    <section className="age-section" id="classes"><div className="section-heading"><span>Pick a path</span><h2>Choose your class</h2><p>Every little learner grows in their own wonderful way.</p></div><div className="age-grid">{classes.map((item, index) => <motion.button key={item.id} className="age-card" style={{ "--age-accent": item.accent } as React.CSSProperties} whileHover={{ y: -7 }} whileTap={{ scale: .97 }} onClick={() => chooseClass(item.id)} aria-label={item.title}><span className="age-icon">{["●", "▲", "★", "◆", "✦"][index]}</span><strong>{item.title}</strong></motion.button>)}</div></section>
  </motion.main>;
}

function ClassDashboard({ config, progress, onContinue, onSubject }: { config: ClassDefinition; progress: ProgressRecord[]; onContinue: (activity: ActivityDefinition) => void; onSubject: (id: SubjectId) => void }) {
  const done = new Set(progress.map((item) => item.activityId));
  const next = config.activities.find((item) => !done.has(item.id)) ?? config.activities[0];
  const nextSubject = config.subjects.find((item) => item.id === next.subject);
  return <motion.main className={`dashboard age-dashboard ${config.world}`} style={{ "--stage-accent": config.accent } as React.CSSProperties} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
    <section className="welcome-panel"><div><span className="eyebrow">{config.eyebrow}</span><h1>{config.welcome}<br /><em>{config.welcomeAccent}</em></h1><p>{config.instruction}</p></div><Image src={`${basePath}/mascot.png`} alt="Bibi the elephant" width={640} height={640} priority /><div className="progress-bubble"><Star fill="currentColor" /><strong>{progress.length}</strong><span>activities<br />done</span></div></section>
    <section className="continue-card" onClick={() => onContinue(next)} role="button" tabIndex={0} aria-label={`Start ${next.title}`} onKeyDown={(event) => (event.key === "Enter" || event.key === " ") && onContinue(next)}><div className="continue-icon"><LearningIcon name={nextSubject?.icon ?? "sparkles"} /></div><div><span>{progress.length ? "KEEP LEARNING" : "START HERE"}</span><h2>{next.title}</h2><p>{nextSubject?.label}</p></div><span className="continue-play" aria-hidden><Play fill="currentColor" /></span></section>
    <div className="dashboard-heading"><div><span>{config.title.toUpperCase()} SUBJECTS</span><h2>Pick a subject</h2></div><p>Tap any card to begin</p></div>
    <section className={`category-grid category-count-${config.subjects.length}`}>{config.subjects.map((subject) => { const count = config.activities.filter((item) => item.subject === subject.id).length; return <motion.button key={subject.id} className={`category-card ${subject.tone} ready`} whileHover={{ y: -5 }} whileTap={{ scale: .97 }} onClick={() => onSubject(subject.id)} aria-label={`${subject.label}. ${count} activities`}><span className="category-icon"><LearningIcon name={subject.icon} /></span><strong>{subject.label}</strong><small>{count} {count === 1 ? "activity" : "activities"}</small><span className="card-arrow">→</span></motion.button>; })}</section>
  </motion.main>;
}

function ActivityHub({ config, subjectId, progress, onBack, openActivity }: { config: ClassDefinition; subjectId: SubjectId | null; progress: ProgressRecord[]; onBack: () => void; openActivity: (activity: ActivityDefinition) => void }) {
  const activities = subjectId ? config.activities.filter((item) => item.subject === subjectId) : config.activities;
  const [page, setPage] = useState(0);
  const pageSize = 5;
  const pageCount = Math.max(1, Math.ceil(activities.length / pageSize));
  const visibleActivities = activities.slice(page * pageSize, (page + 1) * pageSize);
  const subject = config.subjects.find((item) => item.id === subjectId);
  const title = subject?.label ?? "all subjects";
  return <motion.main className="colors-hub activity-hub" style={{ "--stage-accent": config.accent } as React.CSSProperties} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}><button className="back-link" onClick={onBack}><ArrowLeft /> Back to subjects</button><section className="hub-title"><div className="hub-palette"><LearningIcon name={subject?.icon ?? "sparkles"} /></div><div><span className="eyebrow">{config.dashboardName.toUpperCase()} · {activities.length} ACTIVITIES</span><h1><em>{title}</em></h1><p>{config.instruction}</p></div></section><section className={`activity-list ${activities.length === 1 ? "single" : ""}`}>{visibleActivities.map((item, index) => { const number = page * pageSize + index + 1; const done = progress.some((record) => record.activityId === item.id); return <motion.button key={item.id} className={`activity-card activity-${(index % 5) + 1}`} onClick={() => openActivity(item)} whileHover={{ y: -6 }} whileTap={{ scale: .98 }}><span className="activity-number">{number}</span><span className="activity-visual">{item.items[0]?.visual ?? item.questions?.[0]?.visual ?? "?"}</span><span className="activity-copy"><small>{activityTypeLabel(item.type)}</small><strong>{item.title}</strong><em>{item.prompt}</em></span><span className="activity-play">{done ? "✓" : <Play fill="currentColor" />}</span></motion.button>; })}</section>{pageCount > 1 && <nav className="activity-pages" aria-label="Activity pages"><button onClick={() => setPage((value) => Math.max(0, value - 1))} disabled={page === 0}>← Previous</button><span>{page + 1} of {pageCount}</span><button onClick={() => setPage((value) => Math.min(pageCount - 1, value + 1))} disabled={page === pageCount - 1}>Next →</button></nav>}</motion.main>;
}

function activityTypeLabel(type: ActivityDefinition["type"]) {
  const labels: Record<ActivityDefinition["type"], string> = { explore: "learn", find: "find", matching: "match", sorting: "sort", memory: "memory", peekaboo: "peekaboo", sequence: "put in order", tracing: "trace", quiz: "quiz", music: "sing along", story: "story", steps: "do it" };
  return labels[type];
}

function ParentDashboard({ progress, onBack }: { progress: ProgressRecord[]; onBack: () => void }) {
  const minutes = Math.max(0, Math.round(progress.reduce((sum, item) => sum + item.duration, 0) / 60));
  const classesVisited = new Set(progress.map((item) => item.classLevel));
  return <motion.main className="parent-dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><button className="back-link" onClick={onBack}><ArrowLeft /> Back to learning</button><div className="parent-heading"><div><span>PARENT SPACE</span><h1>Little Learners’ journey</h1><p>A gentle look at what has been explored on this device.</p></div><Settings2 /></div><section className="stat-grid"><div><BarChart3 /><strong>{progress.length}</strong><span>activities done</span></div><div><Star /><strong>{minutes}</strong><span>minutes of learning</span></div><div><Sparkles /><strong>{classesVisited.size}</strong><span>classes visited</span></div></section><section className="skills-panel"><div><span className="eyebrow">CLASSES</span><h2>Growing through play</h2></div>{classes.map((item) => { const done = progress.filter((record) => record.classLevel === item.id).length; return <div className="skill-row" key={item.id}><LearningIcon name={item.subjects[0].icon} /><span><strong>{item.dashboardName}</strong><small>{item.concept}</small></span><em className={done ? "explored" : ""}>{done} of {item.activities.length}</em></div>; })}</section><p className="privacy-note"><ShieldCheck /> Progress stays on this device. No ads, profiles, or child data collection.</p></motion.main>;
}

function ChildNav({ active, onSubjects, onAll, onClasses }: { active: "subjects" | "all"; onSubjects: () => void; onAll: () => void; onClasses: () => void }) {
  return <nav className="child-nav" aria-label="Learning sections"><button className={active === "subjects" ? "active" : ""} onClick={onSubjects}><Home />Subjects</button><button className={active === "all" ? "active" : ""} onClick={onAll}><LayoutGrid />All activities</button><button onClick={onClasses}><GraduationCap />Change class</button></nav>;
}
