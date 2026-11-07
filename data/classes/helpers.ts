import type { ActivityDefinition, ActivityType, ClassDefinition, LearningItem, QuizQuestion, SubjectDefinition, SubjectId } from "@/types/learning";

/** [label, visual, spoken or visible words] */
export type Row = [label: string, visual: string, words?: string];
type ActivitySeed = Omit<ActivityDefinition, "id" | "subject">;
export type SubjectContent = SubjectDefinition & { activities: ActivitySeed[] };

const palette = ["#ef6f72", "#4f9fdc", "#e9a820", "#55ad72", "#8a7ed6", "#ef9056", "#e77fa6", "#2fa899", "#6a85d6", "#b98655", "#78a845", "#d65f9a"];

const toItems = (rows: Row[]): LearningItem[] => rows.map(([label, visual, words], index) => ({
  id: String(index), label, visual, secondary: words, value: palette[index % palette.length],
}));

const seed = (type: ActivityType, title: string, prompt: string, rows: Row[]): ActivitySeed => ({ type, title, prompt, items: toItems(rows) });

/** Flashcards: tap to hear. More than 12 cards switch to a smaller grid, up to 26. */
export const explore = (title: string, prompt: string, rows: Row[], threshold = 4): ActivitySeed => ({ ...seed("explore", title, prompt, rows), completionThreshold: threshold });

/** Color flashcards: [name, hex]. */
export const swatches = (title: string, prompt: string, rows: Array<[label: string, value: string, words?: string]>): ActivitySeed => ({
  type: "explore", title, prompt, completionThreshold: 4,
  items: rows.map(([label, value, words], index) => ({ id: String(index), label, value, secondary: words })),
});

/** Exactly three rows: the child finds each in turn. */
export const find = (title: string, prompt: string, rows: [Row, Row, Row]) => seed("find", title, prompt, rows);
/** Word on the left, its picture on the right. Up to 4 pairs. */
export const match = (title: string, prompt: string, rows: Row[]) => seed("matching", title, prompt, rows);
/** Up to 4 pairs. */
export const memory = (title: string, prompt: string, rows: Row[]) => seed("memory", title, prompt, rows);
export const peekaboo = (title: string, prompt: string, rows: Row[]) => seed("peekaboo", title, prompt, rows);
/** Rows are given in their correct order. Up to 6. */
export const order = (title: string, prompt: string, rows: Row[]): ActivitySeed => ({
  type: "sequence", title, prompt,
  items: toItems(rows).map((item, index) => ({ ...item, secondary: String(index) })),
});
/** Put each item in its named basket. Up to 3 baskets and 6 items. */
export const sort = (title: string, prompt: string, groups: Record<string, Row[]>): ActivitySeed => ({
  type: "sorting", title, prompt,
  items: toItems(Object.values(groups).flat()).map((item, index) => ({
    ...item,
    group: Object.entries(groups).flatMap(([group, rows]) => rows.map(() => group))[index],
  })),
});
export const trace = (title: string, label: string, visual: string) => seed("tracing", title, "Draw on it with your finger or mouse.", [[label, visual]]);
export const quiz = (title: string, prompt: string, questions: QuizQuestion[]): ActivitySeed => ({ type: "quiz", title, prompt, items: [], questions });
/** Question with the right answer first; options are shuffled when shown. */
export const q = (question: string, answer: string, wrong: string[], visual?: string): QuizQuestion => ({ question, answer, wrong, visual });

/** Read-along cards, up to 6: [heading, picture, words]. */
export const rhyme = (title: string, rows: Row[]) => seed("music", title, "Tap each card and sing along!", rows);
export const story = (title: string, rows: Row[]) => seed("story", title, "Tap each card to hear the story.", rows);
export const steps = (title: string, prompt: string, rows: Row[]) => seed("steps", title, prompt, rows);

export const subject = (id: SubjectId, label: string, icon: string, tone: SubjectDefinition["tone"], activities: ActivitySeed[]): SubjectContent => ({ id, label, icon, tone, activities });

export const defineClass = (meta: Omit<ClassDefinition, "subjects" | "activities">, content: SubjectContent[]): ClassDefinition => ({
  ...meta,
  subjects: content.map(({ id, label, icon, tone }) => ({ id, label, icon, tone })),
  activities: content.flatMap(({ id: subjectId, activities }) => activities.map((activity, index) => ({
    ...activity, id: `${meta.id}-${subjectId}-${index + 1}`, subject: subjectId,
  }))),
});
