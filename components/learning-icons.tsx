import { Activity, BookOpen, Calculator, Globe2, HeartHandshake, Languages, Leaf, Lightbulb, Mic, Monitor, Music2, Paintbrush, Sparkles, Type } from "lucide-react";

const icons = {
  book: BookOpen,
  calculator: Calculator,
  globe: Globe2,
  heart: HeartHandshake,
  languages: Languages,
  leaf: Leaf,
  lightbulb: Lightbulb,
  mic: Mic,
  monitor: Monitor,
  move: Activity,
  music: Music2,
  paint: Paintbrush,
  sparkles: Sparkles,
  type: Type,
};

export function LearningIcon({ name, className = "" }: { name: string; className?: string }) {
  const Icon = icons[name as keyof typeof icons] ?? Sparkles;
  return <Icon className={className} />;
}
