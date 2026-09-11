export type AgeGroup = "0-1" | "1-2" | "2-3" | "3-4" | "4-5";
export type CategoryId = "colors" | "shapes" | "animals" | "numbers" | "alphabet";
export type ActivityType = "explore" | "find" | "matching" | "sorting" | "memory";

export interface LearningItem {
  id: string;
  label: string;
  value: string;
  secondary?: string;
}

export interface ActivityDefinition {
  id: string;
  title: string;
  category: CategoryId;
  ageGroups: AgeGroup[];
  type: ActivityType;
  difficulty: number;
  prompt: string;
  items: LearningItem[];
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
