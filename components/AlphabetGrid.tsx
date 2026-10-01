"use client";

import { useState } from "react";

type AlphabetLetter = {
  letter: string;
  name: string;
  emoji: string;
  word: string;
  roman: string; 
  meaning: string;
  image?: string | null;
};

type AlphabetGridProps = {
  alphabet: AlphabetLetter[];
};

export default function AlphabetGrid({ alphabet }: AlphabetGridProps) {
  const [active, setActive] = useState<number | null>(null);

  function speak(text: string) {
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "ur-PK";
    speechSynthesis.cancel();
    speechSynthesis.speak(utt);
  }

  function selectLetter(i: number) {
    setActive(i);
    speak(alphabet[i].word);
  }

  const selected = active !== null ? alphabet[active] : null;

  const imgEl = (letter: AlphabetLetter, size: "small" | "large") => {
    const dim = size === "large" ? "3.5rem" : "1.4rem";
    if (letter.image) {
      return (
        <img
          src={letter.image}
          alt={letter.meaning}
          style={{
            width: size === "large" ? "80px" : "32px",
            height: size === "large" ? "80px" : "32px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
      );
    }
    return <span style={{ fontSize: dim, lineHeight: 1 }}>{letter.emoji}</span>;
  };

  return (
    <div
      style={{
        fontFamily: "'Nunito', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.2rem",
        padding: "1.5rem 1rem",
      }}
    >
      {/* Title */}
      <span
        style={{
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#888780",
        }}
      >
        Urdu Alphabet — حروفِ تہجی
      </span>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px",
          width: "100%",
          maxWidth: "520px",
        }}
      >
        {alphabet.map((a, i) => (
          <div
            key={a.letter}
            onClick={() => selectLetter(i)}
            style={{
              background: active === i ? "#e6f0ff" : "#fff8f0",
              border: `1.5px solid ${active === i ? "#185FA5" : "#f0d9be"}`,
              borderRadius: "14px",
              padding: "8px 4px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            {imgEl(a, "small")}
            <span
              style={{
                fontFamily: "'Noto Nastaliq Urdu', serif",
                fontSize: "1.6rem",
                color: "#0C447C",
                lineHeight: 1.3,
                direction: "rtl",
              }}
            >
              {a.letter}
            </span>
            <span style={{ fontSize: "10px", fontWeight: 700, color: "#5F5E5A" }}>
              {a.name}
            </span>
          </div>
        ))}
      </div>

      {/* Expanded panel */}
      <div
        style={{
          background: "#f0f7ff",
          border: "1.5px solid #b5d4f4",
          borderRadius: "16px",
          padding: "1.2rem 1.5rem",
          width: "100%",
          maxWidth: "520px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          minHeight: "100px",
          justifyContent: "center",
        }}
      >
        {selected ? (
          <>
            {imgEl(selected, "large")}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  fontFamily: "'Noto Nastaliq Urdu', serif",
                  fontSize: "3rem",
                  color: "#0C447C",
                  direction: "rtl",
                  lineHeight: 1.4,
                }}
              >
                {selected.letter}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "1rem", fontWeight: 700, color: "#2C2C2A" }}>
                  {selected.name}
                </span>
                <span
                  style={{
                    fontFamily: "'Noto Nastaliq Urdu', serif",
                    fontSize: "1.3rem",
                    color: "#185FA5",
                    direction: "rtl",
                  }}
                >
                  {selected.word}
                </span>
                <span style={{ fontSize: "0.85rem", color: "#5F5E5A", fontWeight: 600 }}>
                  {selected.roman}{" "}
                  <span style={{ color: "#888780", fontWeight: 400 }}>
                    — {selected.meaning}
                  </span>
                </span>
              </div>
            </div>
            <button
              onClick={() => speak(selected.word)}
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                padding: "8px 18px",
                borderRadius: "10px",
                border: "none",
                background: "#185FA5",
                color: "#fff",
                cursor: "pointer",
                marginTop: "2px",
              }}
            >
              🔊 Hear "{selected.word}"
            </button>
          </>
        ) : (
          <span style={{ fontSize: "12px", color: "#B4B2A9", fontWeight: 600 }}>
            Tap any letter to explore
          </span>
        )}
      </div>
    </div>
  );
}
