import { Apple, BookOpen, Brain, Car, Cat, Globe2, Hash, Leaf, Music2, Palette, Pencil, Puzzle, Repeat2, Shapes, Smile, Sparkles, UserRound, Volume2 } from "lucide-react";

export function LearningIcon({ name, className = "" }: { name: string; className?: string }) {
  if (name === "palette") return <Palette className={className} />;
  if (name === "shapes") return <Shapes className={className} />;
  if (name === "paw") return <Cat className={className} />;
  if (name === "numbers") return <Hash className={className} />;
  if (name === "sound") return <Volume2 className={className} />;
  if (name === "smile") return <Smile className={className} />;
  if (name === "leaf") return <Leaf className={className} />;
  if (name === "sparkles") return <Sparkles className={className} />;
  if (name === "music") return <Music2 className={className} />;
  if (name === "apple") return <Apple className={className} />;
  if (name === "car") return <Car className={className} />;
  if (name === "person") return <UserRound className={className} />;
  if (name === "puzzle") return <Puzzle className={className} />;
  if (name === "brain") return <Brain className={className} />;
  if (name === "pattern") return <Repeat2 className={className} />;
  if (name === "book") return <BookOpen className={className} />;
  if (name === "pencil") return <Pencil className={className} />;
  if (name === "globe") return <Globe2 className={className} />;
  return <span className={`font-black ${className}`}>Aa</span>;
}
