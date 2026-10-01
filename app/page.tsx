"use client";

import { useState } from "react";
import Flashcard from "../components/Flashcard";
import StorybookLesson from "../components/StorybookLesson";
import AlphabetGrid from "../components/AlphabetGrid";
import StoryPage1 from "../components/StoryPage1";
import vocab from "../data/vocabulary.json";
import storiesData from "../data/stories.json";
import alphabet from "../data/alphabet.json";

type Mode = "flashcard" | "storybook" | "alphabet";

export default function Home() {
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("flashcard");
  const [storyPage, setStoryPage] = useState(0);
  // storyPage 0 = StoryPage1
  // storyPage 1 = StorybookLesson activities

  function nextWord() {
    setIndex((prev) => (prev + 1) % vocab.length);
  }

  function prevWord() {
    setIndex((prev) => (prev - 1 + vocab.length) % vocab.length);
  }

  // Reset story to beginning when switching to storybook mode
  function switchMode(key: Mode) {
    if (key === "storybook") setStoryPage(0);
    setMode(key);
  }

  const modes: { key: Mode; label: string }[] = [
    { key: "flashcard", label: "Flashcards" },
    { key: "storybook", label: "Storybook" },
    { key: "alphabet",  label: "Alphabet" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-blue-100 gap-4 py-8">

      {/* App title */}
      <h1
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontSize: "1.6rem",
          fontWeight: 800,
          color: "#0C447C",
          letterSpacing: "0.02em",
        }}
      >
        اردو سیکھیں 🌟
      </h1>

      {/* Mode switcher */}
      <div style={{ display: "flex", gap: "10px" }}>
        {modes.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => switchMode(key)}
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              padding: "8px 20px",
              borderRadius: "999px",
              border: "1.5px solid",
              borderColor: mode === key ? "#185FA5" : "#D3D1C7",
              background: mode === key ? "#185FA5" : "#fff",
              color: mode === key ? "#fff" : "#444",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Content card */}
      <div
        className="bg-white rounded-2xl shadow-lg"
        style={{ width: "100%", maxWidth: "560px" }}
      >
        {mode === "flashcard" && (
          <Flashcard
            word={vocab[index]}
            index={index}
            total={vocab.length}
            onNext={nextWord}
            onPrev={prevWord}
          />
        )}

        {mode === "storybook" && storyPage === 0 && (
          <StoryPage1 onNext={() => setStoryPage(1)} />
        )}

        {mode === "storybook" && storyPage === 1 && (
          <StorybookLesson
            stories={storiesData as any}
            title="Around the House"
          />
        )}

        {mode === "alphabet" && (
          <AlphabetGrid alphabet={alphabet} />
        )}
      </div>

    </main>
  );
}
