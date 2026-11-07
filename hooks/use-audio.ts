"use client";

import { useCallback, useEffect, useState } from "react";

const SCRIPT_LANGUAGES = [
  { script: /[ऀ-ॿ]/, lang: "hi-IN" },
  { script: /[஀-௿]/, lang: "ta-IN" },
];
const EMOJI = /[\p{Extended_Pictographic}️‍]/gu;

type SpeechRun = { lang?: string; words: string[] };

/** Splits mixed-language text so Hindi and Tamil go to a voice that can read them. */
function splitByLanguage(text: string): SpeechRun[] {
  const words = text.replace(EMOJI, "").replace(/_+/g, " blank ").split(/\s+/).filter(Boolean);
  return words.reduce<SpeechRun[]>((runs, word) => {
    const hasLetters = /\p{L}/u.test(word);
    const lang = SCRIPT_LANGUAGES.find(({ script }) => script.test(word))?.lang;
    const last = runs.at(-1);
    if (last && (!hasLetters || last.lang === lang)) last.words.push(word);
    else runs.push({ lang, words: [word] });
    return runs;
  }, []);
}

function findVoice(lang: string) {
  const prefix = lang.slice(0, 2).toLowerCase();
  return window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith(prefix));
}

export function useAudio() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMuted(localStorage.getItem("little-learners-muted") === "true"), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const speak = useCallback((text: string) => {
    if (muted || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    splitByLanguage(text).forEach(({ lang, words }) => {
      const utterance = new SpeechSynthesisUtterance(words.join(" "));
      if (lang) {
        utterance.lang = lang;
        const voice = findVoice(lang);
        if (voice) utterance.voice = voice;
      }
      utterance.rate = 0.82;
      utterance.pitch = 1.08;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    });
  }, [muted]);

  const toggleMute = useCallback(() => {
    setMuted((value) => {
      const next = !value;
      localStorage.setItem("little-learners-muted", String(next));
      if (next) window.speechSynthesis?.cancel();
      return next;
    });
  }, []);

  return { muted, speak, toggleMute };
}
