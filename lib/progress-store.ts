import type { ProgressRecord } from "@/types/learning";

const STORAGE_KEY = "little-learners-progress-v1";

export const progressStore = {
  read(): ProgressRecord[] {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as ProgressRecord[];
    } catch {
      return [];
    }
  },
  save(record: ProgressRecord): ProgressRecord[] {
    const current = this.read().filter((item) => item.activityId !== record.activityId);
    const next = [...current, record];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  },
};
