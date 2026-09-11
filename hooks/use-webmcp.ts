"use client";

import { useEffect } from "react";
import type { ProgressRecord } from "@/types/learning";

export function useLearningTools(progress: ProgressRecord[], navigate: (destination: "dashboard" | "colors") => void) {
  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const report = (error: unknown) => console.warn("Learning tool registration failed", error);

    void Promise.resolve(context.registerTool({
      name: "open_learning_area",
      title: "Open learning area",
      description: "Open the ages 2–3 child dashboard or the available Colors learning world in the visible app.",
      inputSchema: { type: "object", properties: { destination: { type: "string", enum: ["dashboard", "colors"] } }, required: ["destination"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input) {
        const destination = (input as { destination?: unknown })?.destination;
        if (destination !== "dashboard" && destination !== "colors") throw new Error("destination must be dashboard or colors");
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
        return { completedActivities: progress.length, categoriesExplored: [...new Set(progress.map((item) => item.category))], records: progress };
      },
    }, { signal: lifecycle.signal })).catch(report);

    return () => lifecycle.abort();
  }, [navigate, progress]);
}
