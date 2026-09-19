import type { CategoryDefinition, LearningItem } from "@/types/learning";

export const colors: LearningItem[] = [
  { id: "red", label: "Red", value: "#f45b69" },
  { id: "blue", label: "Blue", value: "#4d8ee8" },
  { id: "yellow", label: "Yellow", value: "#f6c84c" },
  { id: "green", label: "Green", value: "#62b87c" },
  { id: "orange", label: "Orange", value: "#f39a4b" },
  { id: "purple", label: "Purple", value: "#8b6fd6" },
  { id: "pink", label: "Pink", value: "#ef8eb5" },
  { id: "brown", label: "Brown", value: "#a66f4f" },
  { id: "black", label: "Black", value: "#343a46" },
  { id: "gray", label: "Gray", value: "#8793a1" },
  { id: "teal", label: "Teal", value: "#2fb5a3" },
  { id: "navy", label: "Navy", value: "#3f5f95" },
];

export const category = (
  id: CategoryDefinition["id"], label: string, icon: string, tone: CategoryDefinition["tone"],
): CategoryDefinition => ({ id, label, icon, tone });
