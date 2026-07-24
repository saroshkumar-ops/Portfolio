function posterSvg(lines: { text: string; size: number; weight: number; color: string; y: number }[]) {
  const width = 640;
  const height = 880;
  const textEls = lines
    .map(
      (l) =>
        `<text x="48" y="${l.y}" font-family="Georgia, 'Times New Roman', serif" font-size="${l.size}" font-weight="${l.weight}" fill="${l.color}">${l.text}</text>`
    )
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="#05070c" />
    <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="#e8452c" stroke-width="10" />
    <line x1="48" y1="120" x2="${width - 48}" y2="120" stroke="#f5a623" stroke-width="2" />
    ${textEls}
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export const ABOUT_POSTERS = [
  posterSvg([
    { text: "ABOUT", size: 28, weight: 700, color: "#f5a623", y: 80 },
    { text: "Sarosh Kumar", size: 56, weight: 700, color: "#f4efe6", y: 200 },
    { text: "Software Engineer", size: 30, weight: 400, color: "#e8452c", y: 250 },
    { text: "Focus", size: 20, weight: 700, color: "#f5a623", y: 340 },
    { text: "AI & Backend Systems", size: 26, weight: 400, color: "#f4efe6", y: 378 },
    { text: "Based in", size: 20, weight: 700, color: "#f5a623", y: 450 },
    { text: "Hubli, India", size: 26, weight: 400, color: "#f4efe6", y: 488 },
    { text: "Status", size: 20, weight: 700, color: "#f5a623", y: 560 },
    { text: "Open to opportunities", size: 26, weight: 400, color: "#f4efe6", y: 598 },
  ]),
  posterSvg([
    { text: "STACK", size: 28, weight: 700, color: "#f5a623", y: 80 },
    { text: "Python · C · C++", size: 34, weight: 700, color: "#f4efe6", y: 190 },
    { text: "JavaScript · React", size: 34, weight: 700, color: "#f4efe6", y: 250 },
    { text: "Next.js · FastAPI", size: 34, weight: 700, color: "#f4efe6", y: 310 },
    { text: "Electron", size: 34, weight: 700, color: "#f4efe6", y: 370 },
    { text: "MySQL · PostgreSQL", size: 34, weight: 700, color: "#f4efe6", y: 430 },
    { text: "SQLite · Ollama", size: 34, weight: 700, color: "#f4efe6", y: 490 },
    { text: "Git · GitHub · Linux", size: 34, weight: 700, color: "#e8452c", y: 550 },
  ]),
  posterSvg([
    { text: "BUILDING", size: 28, weight: 700, color: "#f5a623", y: 80 },
    { text: "Victor", size: 44, weight: 700, color: "#f4efe6", y: 190 },
    { text: "AI Desktop Copilot", size: 24, weight: 400, color: "#e8452c", y: 224 },
    { text: "Persistent Context", size: 44, weight: 700, color: "#f4efe6", y: 300 },
    { text: "Engine", size: 44, weight: 700, color: "#f4efe6", y: 350 },
    { text: "GestureScroll", size: 44, weight: 700, color: "#f4efe6", y: 430 },
    { text: "BharatAuto · Listny", size: 30, weight: 400, color: "#e8452c", y: 490 },
  ]),
];
