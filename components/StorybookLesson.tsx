"use client";

import { useState, useEffect } from "react";

type StoryScene = {
  sentence: string;
  answer: {
    ur: string;
    roman: string;
    en?: string;
  };
  choices: string[];
  scene: "house" | "book" | "apple" | "water";
};

type StorybookLessonProps = {
  stories: StoryScene[];
  title: string;
};

const scenes: Record<string, React.ReactNode> = {
  house: (
    <svg width="100%" height="100%" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="180" fill="#d4eaf7"/>
      <rect x="0" y="130" width="320" height="50" fill="#7ec87e"/>
      <ellipse cx="50" cy="130" rx="40" ry="25" fill="#5aaa5a"/>
      <ellipse cx="270" cy="130" rx="35" ry="22" fill="#5aaa5a"/>
      <rect x="90" y="85" width="140" height="70" fill="#f5c88a"/>
      <polygon points="85,85 160,35 235,85" fill="#d95f3b"/>
      <rect x="130" y="110" width="30" height="45" fill="#8b5e3c"/>
      <rect x="100" y="95" width="28" height="25" rx="3" fill="#aed6f5"/>
      <rect x="192" y="95" width="28" height="25" rx="3" fill="#aed6f5"/>
      <circle cx="158" cy="133" r="3" fill="#c0a080"/>
    </svg>
  ),
  book: (
    <svg width="100%" height="100%" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="180" fill="#fef9f0"/>
      <rect x="90" y="30" width="60" height="120" rx="4" fill="#185FA5"/>
      <rect x="150" y="30" width="80" height="120" rx="4" fill="#f6e0be"/>
      <rect x="148" y="30" width="6" height="120" fill="#0C447C"/>
      <line x1="160" y1="50" x2="200" y2="50" stroke="#b8b6b6" strokeWidth="2"/>
      <line x1="160" y1="62" x2="200" y2="62" stroke="#b8b6b6" strokeWidth="2"/>
      <line x1="160" y1="74" x2="200" y2="74" stroke="#b8b6b6" strokeWidth="2"/>
      <line x1="160" y1="86" x2="195" y2="86" stroke="#b8b6b6" strokeWidth="2"/>
      <line x1="160" y1="98" x2="200" y2="98" stroke="#b8b6b6" strokeWidth="2"/>
    </svg>
  ),
  apple: (
    <svg width="100%" height="100%" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="180" fill="#fdf6ee"/>
      <path d="M160 45 Q163 30 175 28" stroke="#5aaa5a" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <ellipse cx="176" cy="27" rx="10" ry="7" fill="#5aaa5a" transform="rotate(-20,176,27)"/>
      <path d="M160 55 Q120 55 110 90 Q100 125 130 145 Q145 155 160 150 Q175 155 190 145 Q220 125 210 90 Q200 55 160 55Z" fill="#e8342a"/>
      <path d="M160 55 Q145 80 145 120 Q145 138 160 150" stroke="#c0251e" strokeWidth="1.5" fill="none"/>
      <ellipse cx="138" cy="85" rx="10" ry="14" fill="#f05045" opacity=".5"/>
    </svg>
  ),
  water: (
    <svg width="100%" height="100%" viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="180" fill="#e8f4fd"/>
      <path d="M110 35 L130 155 L190 155 L210 35 Z" fill="#aed6f5" opacity="0.35"/>
      <path d="M110 35 L130 155 L190 155 L210 35 Z" fill="none" stroke="#7ab8e0" strokeWidth="3" strokeLinejoin="round"/>
      <path d="M122 100 L130 155 L190 155 L198 100 Z" fill="#3a9ad9" opacity="0.45"/>
      <line x1="110" y1="35" x2="210" y2="35" stroke="#7ab8e0" strokeWidth="3" strokeLinecap="round"/>
      <line x1="138" y1="115" x2="153" y2="115" stroke="#fff" strokeWidth="2" opacity="0.8" strokeLinecap="round"/>
      <line x1="155" y1="130" x2="175" y2="130" stroke="#fff" strokeWidth="2" opacity="0.7" strokeLinecap="round"/>
    </svg>
  ),
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function playPageTurn() {
  const audio = new Audio("/audio/page-turn.wav");
  audio.play().catch((err) => console.error("Audio play failed:", err));
}

function launchConfetti() {
  const colors = ["#185FA5","#1D9E75","#f5c88a","#d95f3b","#e8342a","#aed6f5","#ffd700"];
  const wrap = document.createElement("div");
  wrap.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:999;overflow:hidden";
  document.body.appendChild(wrap);
  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    const size = 8 + Math.random() * 8;
    const delay = Math.random() * 0.5;
    const duration = 1.5 + Math.random() * 2;
    el.style.cssText = `position:absolute;left:${Math.random()*100}vw;top:-20px;width:${size}px;height:${size}px;border-radius:2px;background:${colors[Math.floor(Math.random()*colors.length)]};animation:confettiFall ${duration}s ${delay}s linear forwards;`;
    wrap.appendChild(el);
  }
  const style = document.createElement("style");
  style.textContent = `@keyframes confettiFall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}`;
  document.head.appendChild(style);
  setTimeout(() => { wrap.remove(); style.remove(); }, 4000);
}

const MAX_ATTEMPTS = 3;

export default function StorybookLesson({ stories, title }: StorybookLessonProps) {
  const [index, setIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [correct, setCorrect] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [nextSceneIndex, setNextSceneIndex] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [shuffledChoices, setShuffledChoices] = useState(() => shuffle(stories[0].choices));
  const [autoCountdown, setAutoCountdown] = useState<number | null>(null);

  const story = stories[index];
  const isLastPage = index === stories.length - 1;
  const outOfAttempts = attempts >= MAX_ATTEMPTS;
  const answered = correct || outOfAttempts;

  // Auto turn page 2 seconds after correct answer
  useEffect(() => {
    if (correct) {
      setAutoCountdown(2);
      const interval = setInterval(() => {
        setAutoCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            doNextScene();
            return null;
          }
          return prev !== null ? prev - 1 : null;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [correct]);

  function checkAnswer(choice: string) {
    if (answered) return;

    if (choice === story.answer.ur) {
      setCorrect(true);
      setAttempts((a) => a + 1);

      //new Audio("/audio/ur/shaabaash.mp3").play().catch(() => {});
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setWrongGuesses((prev) => [...prev, choice]);
      if (newAttempts >= MAX_ATTEMPTS) {
        // Out of attempts — show correct answer, wait for Next
        setShowNext(true);
      }
    }
  }

  function doNextScene() {
    if (isLastPage) {
      launchConfetti();
      setFinished(true);
      return;
    }
    const next = index + 1;
    setNextSceneIndex(next);
    playPageTurn();
    setFlipping(true);
    setTimeout(() => {
      setIndex(next);
      setFlipping(false);
      setNextSceneIndex(null);
      setAttempts(0);
      setWrongGuesses([]);
      setCorrect(false);
      setShowNext(false);
      setAutoCountdown(null);
      setShuffledChoices(shuffle(stories[next].choices));
    }, 650);
  }

  function restart() {
    setIndex(0);
    setFinished(false);
    setAttempts(0);
    setWrongGuesses([]);
    setCorrect(false);
    setShowNext(false);
    setAutoCountdown(null);
    setShuffledChoices(shuffle(stories[0].choices));
  }

  const btnStyle = (choice: string): React.CSSProperties => {
    let background = "#fff";
    let borderColor = "#D3D1C7";
    let color = "#2C2C2A";
    const isWrong = wrongGuesses.includes(choice);
    const isCorrectChoice = choice === story.answer.ur;

    if (isCorrectChoice && (correct || outOfAttempts)) {
      background = "#e6f7ef"; borderColor = "#1D9E75"; color = "#0F6E56";
    } else if (isWrong) {
      background = "#fdf0f0"; borderColor = "#E24B4A"; color = "#A32D2D";
    }

    return {
      fontFamily: "'Noto Nastaliq Urdu', serif",
      fontSize: "1.8rem",
      direction: "rtl",
      padding: "12px 16px",
      borderRadius: "12px",
      border: `1.5px solid ${borderColor}`,
      background,
      color,
      cursor: answered ? "default" : "pointer",
      textAlign: "center",
      opacity: isWrong && !outOfAttempts ? 0.45 : 1,
    };
  };

  const attemptsLeft = MAX_ATTEMPTS - attempts;

  // End screen
  if (finished) {
    return (
      <div style={{ fontFamily: "'Nunito', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "2.5rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem" }}>🌟⭐🌟</div>
        <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0C447C" }}>The End!</div>
        <div style={{ fontFamily: "'Noto Nastaliq Urdu', serif", fontSize: "2rem", color: "#185FA5", direction: "rtl" }}>ختم</div>
        <div style={{ fontSize: "1rem", color: "#5F5E5A", fontWeight: 600 }}>شاباش! Great job finishing the story!</div>
        <button onClick={restart} style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: 700, padding: "12px 32px", borderRadius: "12px", border: "none", background: "#1D9E75", color: "#fff", cursor: "pointer", marginTop: "0.5rem" }}>
          📖 Read Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem", padding: "1.5rem 1rem" }}>

      {/* Title */}
      <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#888780" }}>
        {title}
      </span>

      {/* Scene with flip animation */}
      <div style={{ position: "relative", width: "320px", height: "180px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.12)" }}>
        {nextSceneIndex !== null && (
          <div style={{ position: "absolute", inset: 0, borderRadius: "16px" }}>
            {scenes[stories[nextSceneIndex].scene]}
          </div>
        )}
        <div style={{ position: "absolute", inset: 0, borderRadius: "16px", transformOrigin: "left center", animation: flipping ? "pageFlip 0.65s cubic-bezier(.4,0,.2,1) forwards" : "none" }}>
          {scenes[story.scene]}
        </div>
      </div>

      <style>{`@keyframes pageFlip{0%{transform:perspective(1200px) rotateY(0deg);opacity:1}60%{transform:perspective(1200px) rotateY(-90deg);opacity:0.3}100%{transform:perspective(1200px) rotateY(-180deg);opacity:0}}`}</style>

      {/* Sentence */}
      <p style={{ fontSize: "1.2rem", fontWeight: 700, color: "#2C2C2A", textAlign: "center", padding: "0 1rem" }}>
        {story.sentence.replace("___", "")}
        <span style={{ display: "inline-block", minWidth: "70px", borderBottom: "3px solid #185FA5", padding: "0 6px", textAlign: "center", color: "#185FA5", fontFamily: "'Noto Nastaliq Urdu', serif", fontSize: "1.6rem", direction: "rtl", verticalAlign: "middle" }}>
          {answered ? story.answer.ur : "___"}
        </span>
      </p>

      {/* Attempts indicator */}
      {!answered && (
        <p style={{ fontSize: "12px", color: "#888780", fontWeight: 600 }}>
          {attempts === 0
            ? "Pick the correct Urdu word"
            : `${attemptsLeft} attempt${attemptsLeft !== 1 ? "s" : ""} left`}
        </p>
      )}

      {/* Choices */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", width: "320px" }}>
        {shuffledChoices.map((choice) => (
          <button
            key={choice}
            onClick={() => checkAnswer(choice)}
            disabled={answered || wrongGuesses.includes(choice)}
            style={btnStyle(choice)}
          >
            {choice}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {attempts > 0 && (
        <p style={{ fontSize: "1rem", fontWeight: 700, textAlign: "center", color: correct ? "#1D9E75" : outOfAttempts ? "#E24B4A" : "#E24B4A" }}>
          {correct
            ? `✅ شاباش! That's correct — ${story.answer.roman}`
            : outOfAttempts
            ? `The answer is ${story.answer.roman} (${story.answer.ur})`
            : `❌ Not quite! Try again`}
        </p>
      )}

      {/* Auto countdown */}
      {correct && autoCountdown !== null && (
        <p style={{ fontSize: "12px", color: "#888780", fontWeight: 600 }}>
          Next page in {autoCountdown}...
        </p>
      )}

      {/* Next button — only shown when out of attempts (wrong) */}
      {(showNext || outOfAttempts) && !correct && (
        <button
          onClick={doNextScene}
          style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: 700, padding: "10px 28px", borderRadius: "12px", border: "none", background: "#185FA5", color: "#fff", cursor: "pointer" }}
        >
          {isLastPage ? "🌟 Finish!" : "Next page 📖"}
        </button>
      )}

      {/* Progress */}
      <span style={{ fontSize: "13px", color: "#888780", fontWeight: 600 }}>
        {index + 1} / {stories.length}
      </span>
    </div>
  );
}
