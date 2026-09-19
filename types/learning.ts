export type AgeGroup = "0-1" | "1-2" | "2-3" | "3-4" | "4-5";

export type CategoryId =
  | "colors" | "shapes" | "animals" | "sounds" | "faces" | "nature" | "explore" | "music"
  | "fruits" | "vehicles" | "body" | "numbers" | "songs" | "alphabet" | "phonics"
  | "puzzles" | "memory" | "patterns" | "stories" | "rhymes" | "reading" | "math"
  | "logic" | "prewriting" | "world" | "creativity";

export type ActivityType =
  | "explore" | "find" | "matching" | "sorting" | "memory" | "peekaboo"
  | "choice" | "sequence" | "pattern" | "tracing";

export type Difficulty = 1 | 2 | 3 | 4;
export type Skill = string;

export interface LearningObjective {
  skill: Skill;
  description: string;
}

export interface LearningItem {
  id: string;
  label: string;
  value: string;
  secondary?: string;
  visual?: string;
  correct?: boolean;
}

export interface ActivityDefinition {
  id: string;
  title: string;
  category: CategoryId;
  ageGroups: AgeGroup[];
  type: ActivityType;
  difficulty: Difficulty;
  prompt: string;
  items: LearningItem[];
  objective?: LearningObjective;
  completionThreshold?: number;
  celebration?: boolean;
}

export interface CategoryDefinition {
  id: CategoryId;
  label: string;
  icon: string;
  tone: "coral" | "blue" | "green" | "yellow" | "purple";
}

export interface AgeGroupDefinition {
  id: AgeGroup;
  title: string;
  dashboardName: string;
  concept: string;
  eyebrow: string;
  welcome: string;
  welcomeAccent: string;
  instruction: string;
  accent: string;
  world: "sensory" | "discovery" | "learning" | "thinking" | "adventure";
  categories: CategoryDefinition[];
  activities: ActivityDefinition[];
}

export interface ProgressRecord {
  activityId: string;
  category: CategoryId;
  ageGroup: AgeGroup;
  completed: boolean;
  attempts: number;
  duration: number;
  completedAt: string;
}

export type Activity = ActivityDefinition;
export type Category = CategoryDefinition;
