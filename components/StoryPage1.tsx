"use client";

type StoryPage1Props = {
  onNext: () => void;
};

export default function StoryPage1({ onNext }: StoryPage1Props) {

  function playAudio() {
    const audio = new Audio("/audio/urdu-story-p1.mp3");
    audio.play().catch((e) => console.error("Audio failed:", e));
  }

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", padding: "1.5rem 1rem" }}>

      {/* Title */}
      <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#888780" }}>
        Around the House
      </span>

      {/* Scene */}
      <div style={{ width: "320px", height: "220px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <svg width="100%" height="100%" viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg">
          <rect width="320" height="220" fill="#d4eaf7"/>
          {/* Sun */}
          <circle cx="275" cy="35" r="20" fill="#FFD700" opacity="0.9"/>
          <line x1="275" y1="10" x2="275" y2="4" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="255" y1="16" x2="251" y2="11" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="245" y1="35" x2="239" y2="35" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="255" y1="54" x2="251" y2="59" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="295" y1="16" x2="299" y2="11" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="305" y1="35" x2="311" y2="35" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="295" y1="54" x2="299" y2="59" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Ground */}
          <rect x="0" y="175" width="320" height="45" fill="#7ec87e"/>
          <ellipse cx="25" cy="175" rx="22" ry="9" fill="#5aaa5a"/>
          <ellipse cx="295" cy="175" rx="22" ry="9" fill="#5aaa5a"/>
          <ellipse cx="155" cy="177" rx="18" ry="7" fill="#5aaa5a"/>
          {/* House */}
          <text x="242" y="178" fontSize="85" textAnchor="middle">🏠</text>
          {/* Sarah */}
          <rect x="52" y="135" width="22" height="30" rx="4" fill="#e8a0c0"/>
          <polygon points="46,155 78,155 82,178 42,178" fill="#e8a0c0"/>
          <rect x="60" y="128" width="8" height="10" rx="2" fill="#f5c5a3"/>
          <line x1="52" y1="140" x2="40" y2="158" stroke="#f5c5a3" strokeWidth="6" strokeLinecap="round"/>
          <line x1="74" y1="138" x2="90" y2="115" stroke="#f5c5a3" strokeWidth="6" strokeLinecap="round"/>
          <circle cx="91" cy="113" r="4" fill="#f5c5a3"/>
          <text x="63" y="132" fontSize="28" textAnchor="middle">👧</text>
          {/* Butterfly */}
          <text x="105" y="102" fontSize="28" textAnchor="middle">🦋</text>
          {/* Ahmed */}
          <rect x="152" y="135" width="22" height="30" rx="4" fill="#a0c4e8"/>
          <rect x="152" y="152" width="10" height="26" rx="3" fill="#5a7abf"/>
          <rect x="164" y="152" width="10" height="26" rx="3" fill="#5a7abf"/>
          <rect x="160" y="128" width="8" height="10" rx="2" fill="#f5c5a3"/>
          <line x1="152" y1="140" x2="140" y2="158" stroke="#f5c5a3" strokeWidth="6" strokeLinecap="round"/>
          <line x1="174" y1="138" x2="188" y2="118" stroke="#f5c5a3" strokeWidth="6" strokeLinecap="round"/>
          <circle cx="189" cy="116" r="4" fill="#f5c5a3"/>
          <text x="200" y="112" fontSize="26" textAnchor="middle">🍎</text>
          <text x="163" y="132" fontSize="28" textAnchor="middle">👦</text>
        </svg>
      </div>

      {/* English text */}
      <p style={{ fontSize: "1rem", fontWeight: 600, color: "#2C2C2A", lineHeight: 1.8, textAlign: "center", padding: "0 0.5rem" }}>
        The <strong style={{ color: "#185FA5" }}>👦 boy</strong> and <strong style={{ color: "#185FA5" }}>👧 girl</strong> are playing outside by their <strong style={{ color: "#185FA5" }}>🏠 house</strong>.<br/>
        The girl's name is Sarah and the boy's name is Ahmed.<br/>
        Sarah is playing with a <strong style={{ color: "#185FA5" }}>🦋 butterfly</strong> and Ahmed is eating an <strong style={{ color: "#185FA5" }}>🍎 apple</strong>.<br/>
        Today, <strong style={{ color: "#185FA5" }}>👩 Ummy</strong> will take them to the <strong style={{ color: "#185FA5" }}>⛲ fountain</strong>.
      </p>

      {/* Urdu text */}
      <p style={{ fontFamily: "'Noto Nastaliq Urdu', serif", fontSize: "1.2rem", color: "#0C447C", lineHeight: 2.2, textAlign: "right", direction: "rtl", padding: "0 0.5rem", width: "100%" }}>
        یہ <strong style={{ color: "#d95f3b" }}>👦 لڑکا</strong> اور <strong style={{ color: "#d95f3b" }}>👧 لڑکی</strong> انکے <strong style={{ color: "#d95f3b" }}>🏠 گھر</strong> کے پاس باہر کھیل رہے ہیں۔<br/>
        لڑکی کا نام سارہ ہے اور لڑکے کا نام احمد ہے۔<br/>
        سارہ <strong style={{ color: "#d95f3b" }}>🦋 تتلی</strong> سے کھیل رہی ہے اور احمد <strong style={{ color: "#d95f3b" }}>🍎 سیب</strong> کھا رہا ہے۔<br/>
        آج <strong style={{ color: "#d95f3b" }}>👩 امّی</strong> انکو <strong style={{ color: "#d95f3b" }}>⛲ فوّارے</strong> کے پاس لے جائیں گی۔
      </p>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <button
          onClick={playAudio}
          style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: 700, padding: "10px 24px", borderRadius: "12px", border: "none", background: "#185FA5", color: "#fff", cursor: "pointer" }}
        >
          🔊 Hear Urdu
        </button>
        <button
          onClick={onNext}
          style={{ fontFamily: "'Nunito', sans-serif", fontSize: "14px", fontWeight: 700, padding: "10px 28px", borderRadius: "12px", border: "none", background: "#1D9E75", color: "#fff", cursor: "pointer" }}
        >
          Next page 📖
        </button>
      </div>

      {/* Progress */}
      <span style={{ fontSize: "13px", color: "#888780", fontWeight: 600 }}>
        Page 1
      </span>

    </div>
  );
}
