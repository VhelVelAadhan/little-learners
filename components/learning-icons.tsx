import { Cat, Hash, Palette, Shapes } from "lucide-react";

export function LearningIcon({ name, className = "" }: { name: string; className?: string }) {
  if (name === "palette") return <Palette className={className} />;
  if (name === "shapes") return <Shapes className={className} />;
  if (name === "paw") return <Cat className={className} />;
  if (name === "numbers") return <Hash className={className} />;
  return <span className={`font-black ${className}`}>Aa</span>;
}
