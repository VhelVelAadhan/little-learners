/**
 * Checks the class content: subjects match the syllabus, activities fit on one screen,
 * every quiz can be answered, and all arithmetic answers are right.
 * Run with: npx tsx --tsconfig tsconfig.json scripts/validate-content.ts
 */
import { classes } from "../data/classes";
import type { ActivityType, ClassLevel } from "../types/learning";

const SYLLABUS: Record<ClassLevel, string[]> = {
  "pre-kg": ["English", "Mathematics / Numeracy", "General Awareness", "Rhymes", "Stories", "Art & Craft", "Physical Activities"],
  lkg: ["English", "Mathematics", "General Awareness", "Hindi", "Rhymes", "Storytelling", "Art & Craft", "Music & Dance", "Physical Education"],
  ukg: ["English", "Vocabulary", "Mathematics", "Hindi", "Environmental Awareness (EVS)", "General Knowledge (GK)", "Computer Awareness", "Rhymes & Stories", "Art & Craft", "Music & Dance", "Physical Education"],
  "class-1": ["English", "Hindi", "Tamil / Second Language", "Mathematics", "Environmental Studies (EVS)", "Computer Science", "General Knowledge (GK)", "Art & Craft", "Music", "Physical Education", "Moral Science / Value Education"],
  "class-2": ["English", "Hindi", "Tamil / Second Language", "Mathematics", "Environmental Studies (EVS)", "Computer Science", "General Knowledge (GK)", "Art & Craft", "Music", "Physical Education", "Moral Science / Value Education"],
};

const MAX_ITEMS: Partial<Record<ActivityType, number>> = { explore: 26, matching: 4, memory: 4, peekaboo: 8, sequence: 6, sorting: 6, music: 6, story: 6, steps: 6 };

// Emoji added after Unicode 12 do not display on Windows 10.
const isTooNewEmoji = (code: number) =>
  code === 0x1f6d6 || code === 0x1f6d7 || (code >= 0x1f6dc && code <= 0x1f6df) || (code >= 0x1fa75 && code <= 0x1fa77)
  || (code >= 0x1fa7b && code <= 0x1fa7f) || (code >= 0x1fa83 && code <= 0x1fa8f) || (code >= 0x1fa96 && code <= 0x1faff);

const problems: string[] = [];
const ids = new Set<string>();

const checkEmoji = (where: string, text = "") => {
  for (const char of text) if (isTooNewEmoji(char.codePointAt(0) ?? 0)) problems.push(`${where}: emoji ${char} is not on Windows 10`);
};

const checkArithmetic = (where: string, question: string, answer: string) => {
  const sum = question.match(/(\d+) ([+\-×]) (\d+)/);
  if (!sum) return;
  const [a, b] = [Number(sum[1]), Number(sum[3])];
  const expected = sum[2] === "+" ? a + b : sum[2] === "-" ? a - b : a * b;
  if (answer.replace("₹", "") !== String(expected)) problems.push(`${where}: "${question}" answered ${answer}, expected ${expected}`);
};

for (const level of classes) {
  const labels = level.subjects.map((subject) => subject.label);
  if (labels.join("|") !== SYLLABUS[level.id].join("|")) problems.push(`${level.id}: subjects differ from syllabus: ${labels.join(", ")}`);

  for (const subject of level.subjects) {
    const count = level.activities.filter((activity) => activity.subject === subject.id).length;
    if (count < 3) problems.push(`${level.id}/${subject.id}: only ${count} activities`);
  }

  for (const activity of level.activities) {
    const where = `${activity.id} "${activity.title}"`;
    if (ids.has(activity.id)) problems.push(`${where}: duplicate id`);
    ids.add(activity.id);
    checkEmoji(where, activity.title + activity.prompt);

    const max = MAX_ITEMS[activity.type];
    if (max && activity.items.length > max) problems.push(`${where}: ${activity.items.length} items, limit ${max}`);
    if (activity.type === "find" && activity.items.length !== 3) problems.push(`${where}: find needs exactly 3 items`);
    if (activity.type === "tracing" && activity.items.length !== 1) problems.push(`${where}: tracing needs 1 item`);
    if (activity.type === "explore" && (activity.completionThreshold ?? 4) > activity.items.length) problems.push(`${where}: threshold above item count`);
    if (activity.type === "sorting" && new Set(activity.items.map((item) => item.group)).size < 2) problems.push(`${where}: needs 2+ baskets`);
    if ((activity.type === "matching" || activity.type === "sequence") && new Set(activity.items.map((item) => item.visual)).size !== activity.items.length) problems.push(`${where}: duplicate visuals make it unsolvable`);
    if (activity.type === "quiz" && !activity.questions?.length) problems.push(`${where}: no questions`);

    for (const item of activity.items) { checkEmoji(where, item.visual); checkEmoji(where, item.label); }
    for (const question of activity.questions ?? []) {
      const options = [question.answer, ...question.wrong];
      if (question.wrong.length < 1) problems.push(`${where}: "${question.question}" has no wrong options`);
      if (new Set(options).size !== options.length) problems.push(`${where}: "${question.question}" has duplicate options`);
      checkEmoji(where, question.visual);
      checkArithmetic(where, question.question, question.answer);
    }
  }
  console.log(`${level.title.padEnd(8)} ${String(level.subjects.length).padStart(2)} subjects  ${String(level.activities.length).padStart(3)} activities  ${String(level.activities.flatMap((activity) => activity.questions ?? []).length).padStart(3)} quiz questions`);
}

console.log(problems.length ? `\n${problems.length} problem(s):\n${problems.join("\n")}` : "\nAll content checks passed.");
process.exitCode = problems.length ? 1 : 0;
