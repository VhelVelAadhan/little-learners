"use client";

import { useEffect } from "react";
import type { ClassLevel, ProgressRecord } from "@/types/learning";

const CLASS_LEVELS: ClassLevel[] = ["pre-kg", "lkg", "ukg", "class-1", "class-2"];
const isClassLevel = (value: unknown): value is ClassLevel => CLASS_LEVELS.includes(value as ClassLevel);

export function useLearningTools(progress: ProgressRecord[], navigate: (classLevel: ClassLevel) => void) {
  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const report = (error: unknown) => console.warn("Learning tool registration failed", error);

    void Promise.resolve(context.registerTool({
      name: "open_learning_area",
      title: "Open learning area",
      description: "Open the subject dashboard for a class in the visible app.",
      inputSchema: { type: "object", properties: { destination: { type: "string", enum: CLASS_LEVELS } }, required: ["destination"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const destination = (input as { destination?: unknown })?.destination;
        if (!isClassLevel(destination)) throw new Error(`destination must be one of ${CLASS_LEVELS.join(", ")}`);
        navigate(destination);
        return { opened: destination };
      },
    }, { signal: lifecycle.signal })).catch(report);

    void Promise.resolve(context.registerTool({
      name: "get_learning_progress",
      title: "Get learning progress",
      description: "Read the device-local Little Learners activity completion summary.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute() {
        return { completedActivities: progress.length, subjectsExplored: [...new Set(progress.map((item) => item.subject))], records: progress };
      },
    }, { signal: lifecycle.signal })).catch(report);

    return () => lifecycle.abort();
  }, [navigate, progress]);
}
