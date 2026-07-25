export interface ProjectDetail {
  command: string;
  lines: string[];
  stack: string;
  summary: string;
}

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  "Victor — AI Desktop Copilot": {
    command: "cat victor/README.md",
    lines: [
      "Local-first AI desktop co-pilot — not a chatbot, a control plane",
      "Voice in (faster-whisper) + TTS out (espeak-ng), real-time WS chat",
      "Drives mouse, keyboard, media playback, and app/website launching",
      "Drafts WhatsApp/email/messages — sends only after explicit approval",
      "Jarvis-style personality modes, reminders, and persistent memory",
      "Watches VS Code/Copilot logs and surfaces permission alerts",
    ],
    stack: "FastAPI · Ollama (phi3:mini) · faster-whisper · React + Vite · Electron",
    summary: "A local AI control plane with a personality — routing, deciding, drafting, and acting.",
  },
  GestureScroll: {
    command: "cat gesture_scroll/README.md",
    lines: [
      "Scrolls a background window with hand gestures via webcam",
      "Fullscreen apps (games, etc.) on monitor 1 keep focus — no alt-tab",
      "Async PostMessage/XSendEvent — never touches focus or global input",
      "Cross-platform: Windows (PostMessage) and Linux X11 (XSendEvent)",
      "Universal mode extends support to Chrome/YouTube/Electron apps",
      "MediaPipe Hands @ complexity 0 — 4-7% CPU, no GPU needed",
    ],
    stack: "Python · MediaPipe · OpenCV · Win32 API · Xlib",
    summary: "Anti-cheat-conscious by design — no focus hijack, no global input hooks.",
  },
  BharatAuto: {
    command: "cat bharatauto/README.md",
    lines: [
      "Smart-manufacturing ops dashboard for a 12-machine CNC plant",
      "Live sensor telemetry feeds 3 ML risk models every 5 seconds",
      "5 LLM agents (maintenance, production, supply chain, orchestrator, supervisor)",
      "Critical incidents escalate to the supervisor via a real Twilio voice call",
      "4 cooperating services: Next.js console, Spring Boot gateway, ML API, simulator",
    ],
    stack: "Next.js · Spring Boot · FastAPI · PostgreSQL · Groq LLaMA-3.3-70B · Twilio",
    summary: "From sensor drift to a phone ringing on the plant floor — fully automated.",
  },
  Listny: {
    command: "cat listny/README.md",
    lines: [
      "Listens to whatever's playing on your Linux desktop, identifies it",
      "Shazam-style acoustic fingerprinting via shazamio — no API key needed",
      "Auto-opens exact lyrics on Genius the moment a new song is recognized",
      "De-dupes so the same song never reopens a tab while it keeps playing",
      "Local Ollama model (gemma) gives quick insights on the current track",
    ],
    stack: "Python · PySide6/QtWebEngine · shazamio · Genius API · Ollama",
    summary: "Shazam for your speakers — lyrics open before the chorus hits.",
  },
  "Persistent Context Engine": {
    command: "cat context-engine/README.md",
    lines: [
      "Context engine for autonomous SRE incident response",
      "MinHash + LSH-based retrieval over historical incidents",
      "FastAPI backend paired with a React dashboard",
      "~124ms p95 latency at scale",
      "100% recall@5 across large-scale benchmarks",
    ],
    stack: "FastAPI · React · MinHash/LSH",
    summary: "Finds the incident that already happened before, in milliseconds.",
  },
};
