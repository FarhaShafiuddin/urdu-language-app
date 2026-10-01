"use client";

import { useState } from "react";

type VocabWord = {
  emoji?: string;
  translations: {
    en: string;
    ur: string;
  };
  roman?: {
    ur?: string;
  };
  audio?: {
    ur?: string;
  };
};

type FlashcardProps = {
  word: VocabWord;
  index: number;
  total: number;
  onNext: () => void;
  onPrev: () => void; // 1. Added onPrev here to TypeScript definitions
};
// 2. Added onPrev to the destructured props here
export default function Flashcard({ word, index, total, onNext, onPrev }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  function flipCard() {
    setFlipped((prev) => !prev);
  }

  function handleNext() {
    setFlipped(false);
    onNext();
  }

  function speak() {
    if (word.audio?.ur) {
      const audio = new Audio(word.audio.ur);
      audio.load();
      audio.oncanplaythrough = () => {
        audio.play().catch((err) => console.error("Play failed:", err));
      };
      audio.onerror = (e) => console.error("Audio load error:", e);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(word.translations.ur);
    utterance.lang = "ur-PK";
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }

  const faceBase: React.CSSProperties = {
    position: "absolute", inset: 0, borderRadius: "20px",
    backfaceVisibility: "hidden", display: "flex",
    flexDirection: "column", alignItems: "center",
    justifyContent: "center", gap: "8px", padding: "1.2rem",
  };

  const hintStyle: React.CSSProperties = {
    fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em",
    textTransform: "uppercase", color: "#888780",
  };

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", padding: "2rem 1rem" }}>

      {/* Flip card */}
      <div onClick={flipCard} style={{ width: "320px", height: "280px", perspective: "900px", cursor: "pointer" }}>
        <div style={{
          width: "100%", height: "100%", position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.55s cubic-bezier(.4,0,.2,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}>

          {/* Front — English */}
          <div style={{ ...faceBase, background: "#fff8f0", border: "1.5px solid #f0d9be" }}>
            <span style={hintStyle}>English</span>
            {word.emoji && (
              <span style={{ fontSize: "5rem", lineHeight: 1 }}>{word.emoji}</span>
            )}
            <span style={{ fontSize: "2rem", fontWeight: 800, color: "#2C2C2A" }}>
              {word.translations.en}
            </span>
          </div>

          {/* Back — Urdu */}
          <div style={{ ...faceBase, background: "#f0f7ff", border: "1.5px solid #b5d4f4", transform: "rotateY(180deg)" }}>
            <span style={hintStyle}>Urdu</span>
            {word.emoji && (
              <span style={{ fontSize: "5rem", lineHeight: 1 }}>{word.emoji}</span>
            )}
            <span style={{ fontFamily: "'Noto Nastaliq Urdu', serif", fontSize: "2rem", color: "#0C447C", direction: "rtl", lineHeight: 1.6 }}>
              {word.translations.ur}
            </span>
            {word.roman?.ur && (
              <span style={{ fontSize: "0.9rem", color: "#5F5E5A", fontWeight: 600 }}>
                {word.roman.ur}
              </span>
            )}
          </div>
        </div>
      </div>

      <p style={{ fontSize: "12px", color: "#B4B2A9", fontWeight: 600, marginTop: "-8px" }}>
        tap card to flip
      </p>

{/* Buttons */}
<div style={{ display: "flex", gap: "10px" }}>
  <button
    onClick={() => {
      setFlipped(false);
      onPrev();
    }}
    style={{
      fontFamily: "'Nunito', sans-serif",
      fontSize: "14px",
      fontWeight: 700,
      padding: "10px 22px",
      borderRadius: "12px",
      border: "none",
      background: "#1D9E75",
      color: "#fff",
      cursor: "pointer",
    }}
  >
    ← Back
  </button>
  <button onClick={speak} style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: 700, padding: "10px 22px", borderRadius: "12px", border: "none", background: "#185FA5", color: "#fff", cursor: "pointer" }}>
    🔊 Hear Urdu
  </button>
  <button
    onClick={handleNext}
    style={{
      fontFamily: "'Nunito', sans-serif",
      fontSize: "14px",
      fontWeight: 700,
      padding: "10px 22px",
      borderRadius: "12px",
      border: "none",
      background: "#1D9E75",
      color: "#fff",
      cursor: "pointer",
    }}
  >
    Next →
  </button>
</div>

      {/* Progress */}
      <span style={{ fontSize: "13px", color: "#888780", fontWeight: 600 }}>
        {index + 1} / {total}
      </span>
    </div>
  );
}
