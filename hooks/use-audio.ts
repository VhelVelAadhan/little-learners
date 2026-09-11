"use client";

import { useCallback, useEffect, useState } from "react";

export function useAudio() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setMuted(localStorage.getItem("little-learners-muted") === "true"), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const speak = useCallback((text: string) => {
    if (muted || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.82;
    utterance.pitch = 1.08;
    utterance.volume = 0.8;
    window.speechSynthesis.speak(utterance);
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
