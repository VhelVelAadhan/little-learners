export type ClassLevel = "pre-kg" | "lkg" | "ukg" | "class-1" | "class-2";

export type SubjectId =
  | "english" | "maths" | "hindi" | "tamil" | "general-awareness" | "evs" | "gk" | "computer"
  | "rhymes" | "stories" | "rhymes-stories" | "art-craft" | "music" | "physical" | "moral" | "vocabulary";

export type ActivityType =
  | "explore" | "find" | "matching" | "sorting" | "memory" | "peekaboo"
  | "sequence" | "tracing" | "quiz" | "music" | "story" | "steps";

export interface LearningItem {
  id: string;
  label: string;
  value: string;
  /** Spoken text for flashcards, visible words for read-along cards, position for sequences. */
  secondary?: string;
  visual?: string;
  /** The basket this item belongs in, for sorting activities. */
  group?: string;
}

export interface QuizQuestion {
  question: string;
  answer: string;
  wrong: string[];
  visual?: string;
}

export interface ActivityDefinition {
  id: string;
  title: string;
  subject: SubjectId;
  type: ActivityType;
  prompt: string;
  items: LearningItem[];
  questions?: QuizQuestion[];
  completionThreshold?: number;
}

export interface SubjectDefinition {
  id: SubjectId;
  label: string;
  icon: string;
  tone: "coral" | "blue" | "green" | "yellow" | "purple";
}

export interface ClassDefinition {
  id: ClassLevel;
  title: string;
  dashboardName: string;
  concept: string;
  eyebrow: string;
  welcome: string;
  welcomeAccent: string;
  instruction: string;
  accent: string;
  world: "sensory" | "discovery" | "learning" | "thinking" | "adventure";
  subjects: SubjectDefinition[];
  activities: ActivityDefinition[];
}

export interface ProgressRecord {
  activityId: string;
  subject: SubjectId;
  classLevel: ClassLevel;
  completed: boolean;
  attempts: number;
  duration: number;
  completedAt: string;
}
