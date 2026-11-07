"use client";

import { useEffect, useRef, useState } from "react";
import { Eraser } from "lucide-react";
import type { LearningItem } from "@/types/learning";

const CANVAS_SIZE = 600;
const PEN_WIDTH = 42;
/** Scoring uses a wider pen, so any stroke that stays inside a stem still reaches its centre line. */
const SCORING_PEN_WIDTH = 64;
/** How far outside the letter ink can stray before it counts as off the letter. */
const OUTSIDE_TOLERANCE = 76;
const GRID_SIZE = 120;
/** Longest stretch of a letter's centre line that may be missed, in grid cells. Stroke ends are forgiven; a crossbar is not. */
const MAX_MISSED_STRETCH = 8;
const MAX_OUTSIDE_INK = 0.3;

type Masks = { centreLine: number[]; allowed: boolean[] };
type Point = { x: number; y: number };

function drawLetter(context: CanvasRenderingContext2D, text: string, draw: (x: number, y: number) => void) {
  const fontFamily = getComputedStyle(document.body).fontFamily;
  let fontSize = CANVAS_SIZE * 0.8;
  context.font = `900 ${fontSize}px ${fontFamily}`;
  const widest = CANVAS_SIZE * 0.84;
  const measuredWidth = context.measureText(text).width;
  if (measuredWidth > widest) {
    fontSize *= widest / measuredWidth;
    context.font = `900 ${fontSize}px ${fontFamily}`;
  }
  context.textAlign = "center";
  context.textBaseline = "alphabetic";
  const metrics = context.measureText(text);
  draw(CANVAS_SIZE / 2, CANVAS_SIZE / 2 + (metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2);
}

function createGridCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = GRID_SIZE;
  canvas.height = GRID_SIZE;
  return canvas.getContext("2d", { willReadFrequently: true });
}

const readCells = (context: CanvasRenderingContext2D) => {
  const { data } = context.getImageData(0, 0, GRID_SIZE, GRID_SIZE);
  return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => data[index * 4 + 3] > 96);
};

const NEIGHBOUR_OFFSETS = [-GRID_SIZE, -GRID_SIZE + 1, 1, GRID_SIZE + 1, GRID_SIZE, GRID_SIZE - 1, -1, -GRID_SIZE - 1];

/** Zhang-Suen thinning: peels a filled letter down to the one-cell line through its middle. */
function thinToCentreLine(cells: boolean[]) {
  const thinned = [...cells];
  let changed = true;
  while (changed) {
    changed = false;
    for (const pass of [0, 1]) {
      const removable: number[] = [];
      for (let row = 1; row < GRID_SIZE - 1; row += 1) {
        for (let column = 1; column < GRID_SIZE - 1; column += 1) {
          const index = row * GRID_SIZE + column;
          if (!thinned[index]) continue;
          const [n, ne, e, se, s, sw, w, nw] = NEIGHBOUR_OFFSETS.map((offset) => thinned[index + offset]);
          const ring = [n, ne, e, se, s, sw, w, nw];
          const filled = ring.filter(Boolean).length;
          const transitions = ring.filter((cell, position) => !cell && ring[(position + 1) % 8]).length;
          if (filled < 2 || filled > 6 || transitions !== 1) continue;
          const blocked = pass === 0 ? (n && e && s) || (e && s && w) : (n && e && w) || (n && s && w);
          if (!blocked) removable.push(index);
        }
      }
      if (removable.length) changed = true;
      removable.forEach((index) => { thinned[index] = false; });
    }
  }
  return thinned.flatMap((cell, index) => (cell ? [index] : []));
}

function buildMasks(text: string): Masks | null {
  const context = createGridCanvas();
  if (!context) return null;
  context.scale(GRID_SIZE / CANVAS_SIZE, GRID_SIZE / CANVAS_SIZE);
  drawLetter(context, text, (x, y) => context.fillText(text, x, y));
  const centreLine = thinToCentreLine(readCells(context));
  context.lineJoin = "round";
  context.lineWidth = OUTSIDE_TOLERANCE * 2;
  drawLetter(context, text, (x, y) => context.strokeText(text, x, y));
  return { centreLine, allowed: readCells(context) };
}

/** The size of the biggest connected group of centre-line cells that has not been drawn over. */
function longestMissedStretch(missed: number[]) {
  const unvisited = new Set(missed);
  let longest = 0;
  for (const start of missed) {
    if (!unvisited.delete(start)) continue;
    const stack = [start];
    let size = 0;
    while (stack.length) {
      const cell = stack.pop() as number;
      size += 1;
      NEIGHBOUR_OFFSETS.forEach((offset) => { if (unvisited.delete(cell + offset)) stack.push(cell + offset); });
    }
    longest = Math.max(longest, size);
  }
  return longest;
}

function canvasCells(source: HTMLCanvasElement) {
  const context = createGridCanvas();
  if (!context) return [];
  context.drawImage(source, 0, 0, GRID_SIZE, GRID_SIZE);
  return readCells(context);
}

export function TracePad({ item, speak, onComplete }: { item: LearningItem; speak: (text: string) => void; onComplete: () => void }) {
  const text = item.visual ?? item.label;
  const guideCanvas = useRef<HTMLCanvasElement>(null);
  const inkCanvas = useRef<HTMLCanvasElement>(null);
  const scoringCanvas = useRef<HTMLCanvasElement>(null);
  const masks = useRef<Masks | null>(null);
  const activePointer = useRef<number | null>(null);
  const lastPoint = useRef<Point | null>(null);
  const finished = useRef(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Draw on the letter with your finger or mouse.");

  useEffect(() => {
    const context = guideCanvas.current?.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    context.fillStyle = "#e4e0f5";
    context.strokeStyle = "#8f86d8";
    context.lineWidth = 4;
    context.setLineDash([14, 12]);
    drawLetter(context, text, (x, y) => { context.fillText(text, x, y); context.strokeText(text, x, y); });
    masks.current = buildMasks(text);
  }, [text]);

  const toCanvasPoint = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
    const box = event.currentTarget.getBoundingClientRect();
    return { x: ((event.clientX - box.left) / box.width) * CANVAS_SIZE, y: ((event.clientY - box.top) / box.height) * CANVAS_SIZE };
  };

  const drawSegment = (from: Point, to: Point) => {
    const pens: Array<[HTMLCanvasElement | null, number, string]> = [
      [inkCanvas.current, PEN_WIDTH, item.value],
      [scoringCanvas.current, SCORING_PEN_WIDTH, "#000"],
    ];
    pens.forEach(([canvas, width, color]) => {
      const context = canvas?.getContext("2d");
      if (!context) return;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = width;
      context.strokeStyle = color;
      context.beginPath();
      context.moveTo(from.x, from.y);
      context.lineTo(to.x, to.y);
      context.stroke();
    });
  };

  const scoreDrawing = () => {
    if (!masks.current || !inkCanvas.current || !scoringCanvas.current || finished.current) return;
    const { centreLine, allowed } = masks.current;
    const scored = canvasCells(scoringCanvas.current);
    const ink = canvasCells(inkCanvas.current);
    const missed = centreLine.filter((index) => !scored[index]);
    const inkCells = ink.filter(Boolean).length;
    const outsideCells = ink.filter((isInk, index) => isInk && !allowed[index]).length;

    setProgress(centreLine.length ? 1 - missed.length / centreLine.length : 0);
    if (inkCells && outsideCells / inkCells > MAX_OUTSIDE_INK) {
      setMessage("Oops, that went off the letter. Stay on the shape, or tap Clear.");
      speak("Try to stay on the letter.");
      return;
    }
    if (longestMissedStretch(missed) > MAX_MISSED_STRETCH) { setMessage("Good! Keep going until the whole letter is drawn."); return; }
    setProgress(1);
    finished.current = true;
    setMessage("You drew it!");
    speak(`${item.label}!`);
    window.setTimeout(onComplete, 700);
  };

  const startStroke = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (finished.current || activePointer.current !== null) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    activePointer.current = event.pointerId;
    const point = toCanvasPoint(event);
    lastPoint.current = point;
    drawSegment(point, point);
  };

  const continueStroke = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.pointerId !== activePointer.current || !lastPoint.current) return;
    const point = toCanvasPoint(event);
    drawSegment(lastPoint.current, point);
    lastPoint.current = point;
  };

  const endStroke = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.pointerId !== activePointer.current) return;
    activePointer.current = null;
    lastPoint.current = null;
    scoreDrawing();
  };

  const clearDrawing = () => {
    if (finished.current) return;
    [inkCanvas.current, scoringCanvas.current].forEach((canvas) => canvas?.getContext("2d")?.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE));
    setProgress(0);
    setMessage("Draw on the letter with your finger or mouse.");
  };

  return <section className="trace-game">
    <div className="trace-pad">
      <canvas ref={guideCanvas} width={CANVAS_SIZE} height={CANVAS_SIZE} aria-hidden />
      <canvas ref={inkCanvas} className="trace-ink" width={CANVAS_SIZE} height={CANVAS_SIZE} role="img" aria-label={`Drawing area for ${item.label}`} onPointerDown={startStroke} onPointerMove={continueStroke} onPointerUp={endStroke} onPointerCancel={endStroke} />
      <canvas ref={scoringCanvas} className="trace-scoring" width={CANVAS_SIZE} height={CANVAS_SIZE} aria-hidden />
    </div>
    <div className="trace-meter" aria-hidden><span style={{ width: `${Math.round(progress * 100)}%` }} /></div>
    <p aria-live="polite">{message}</p>
    <button className="trace-clear" onClick={clearDrawing}><Eraser size={18} /> Clear</button>
  </section>;
}
