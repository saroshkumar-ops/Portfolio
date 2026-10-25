"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/ScrollProvider";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  id: string;
  title: string;
  year: string;
  desc: string;
  tags: string[];
  link?: string;
  cover: string;
  images: string[];
}

const PROJECTS_MAP: Record<string, ProjectItem> = {
  "voice-integrity": {
    id: "voice-integrity",
    title: "Voice Integrity",
    year: "03 2026",
    desc: "Real-time deepfake voice detection engine. Engineered 7,000 Hz low-pass parity gate to eliminate resampler spectral bias. Ensembled LFCC-LCNN and WavLM Base+ logits via Platt scaling and EMA smoothing, achieving 91.5% zero-day recall at 1.7% false alarm rate across 25 unseen generators. Sub-250ms streaming FastAPI WebSocket pipeline with RMS Voice Activity Detection.",
    tags: ["PyTorch", "WavLM", "LFCC-LCNN", "FastAPI", "WebSockets", "Hugging Face"],
    link: "https://voicenow.vercel.app/",
    cover: "/About/img_00001.jpg",
    images: ["/About/img_00001.jpg", "/About/img_00002.jpg", "/About/img_00003.jpg"],
  },
  "exoterra": {
    id: "exoterra",
    title: "ExoTerra",
    year: "01 2026",
    desc: "NASA exoplanet characterization and discovery engine. Ingested and cached 5,800+ confirmed exoplanets via NASA's TAP API with Chen & Kipping empirical mass-radius relations and Stefan-Boltzmann flux modeling. Implemented Kopparapu Habitable Zone polynomial boundaries and Earth Similarity Index. 3D PCA capturing 89.2% cosmological variance.",
    tags: ["Python", "Scikit-Learn", "NASA TAP API", "Streamlit", "NumPy", "Pandas"],
    link: "https://github.com/saroshkumar-ops/NASA-Exoplanet-Engine",
    cover: "/About/img_00010.jpg",
    images: ["/About/img_00010.jpg", "/About/img_00011.jpg", "/About/img_00012.jpg"],
  },
  "aqi-forecaster": {
    id: "aqi-forecaster",
    title: "Air Quality Forecasting",
    year: "11 2025",
    desc: "Autoregressive 24-hour AQI predictive and heuristic source attribution engine using recursive XGBoost on 3-year OpenAQ data benchmarked against Prophet. Computes dynamic emission breakdown (Traffic, Industry, Construction) using PM10/PM2.5 ratios, chemical markers (NO2, SO2), and wind vectors.",
    tags: ["Python", "XGBoost", "Prophet", "FastAPI", "OpenAQ", "Groq API"],
    link: "https://github.com/saroshkumar-ops",
    cover: "/About/img_00020.jpg",
    images: ["/About/img_00020.jpg", "/About/img_00021.jpg", "/About/img_00022.jpg"],
  },
  "brainglobe": {
    id: "brainglobe",
    title: "BrainGlobe (cellfinder)",
    year: "08 2025",
    desc: "Core contribution to computational neuroscience initiative. Enhanced production 3D image processing and classification pipelines in Python/PyTorch, optimizing tensor operations and multi-dimensional array evaluation for high-throughput brain slice analysis.",
    tags: ["Python", "PyTorch", "Computer Vision", "Neuroscience"],
    link: "https://github.com/brainglobe/cellfinder",
    cover: "/About/img_00030.jpg",
    images: ["/About/img_00030.jpg", "/About/img_00031.jpg", "/About/img_00032.jpg"],
  },
  "neural-lam": {
    id: "neural-lam",
    title: "ML-LAM (neural-lam)",
    year: "06 2025",
    desc: "Graph neural weather prediction framework. Worked on Graph Neural Network (GNN) architectures, message-passing layers, and distributed training utilities in PyTorch for high-resolution limited-area atmospheric modeling.",
    tags: ["PyTorch", "GNNs", "PyG", "Weather AI"],
    link: "https://github.com/saroshkumar-ops",
    cover: "/About/img_00040.jpg",
    images: ["/About/img_00040.jpg", "/About/img_00041.jpg", "/About/img_00042.jpg"],
  },
  "deeplense": {
    id: "deeplense",
    title: "ML4SCI (DeepLense)",
    year: "04 2025",
    desc: "Deep learning for gravitational lensing and dark matter detection. Modernized Apple Silicon MPS device detection, resolved micro-AUROC metric calculations in transformer classification pipelines, and cleaned deprecated scheduler parameters.",
    tags: ["PyTorch", "Transformers", "MPS Acceleration", "Astrophysics"],
    link: "https://github.com/saroshkumar-ops",
    cover: "/About/img_00050.jpg",
    images: ["/About/img_00050.jpg", "/About/img_00051.jpg", "/About/img_00052.jpg"],
  },
};

interface SkillGroupItem {
  id: string;
  idx: string;
  title: string;
  count: number;
  rows: string[][];
}

const SKILL_GROUPS: SkillGroupItem[] = [
  {
    id: "all",
    idx: "00",
    title: "All Technologies",
    count: 49,
    rows: [
      [
        "PyTorch",
        "WavLM Base+",
        "Torchaudio",
        "Transformers",
        "LFCC-LCNN",
        "librosa",
        "Faster-Whisper",
        "PyG (GNNs)",
        "Platt Scaling",
        "Voice Activity Detection",
        "Spectral Filtering",
        "FastAPI",
        "WebSockets",
        "Docker",
        "Linux",
        "Groq API",
      ],
      [
        "Python",
        "C++",
        "Java",
        "C",
        "SQL",
        "JavaScript",
        "TypeScript",
        "Scikit-Learn",
        "XGBoost",
        "Prophet",
        "NumPy",
        "Pandas",
        "SciPy",
        "Streamlit",
        "Plotly",
        "OpenAQ API",
        "NASA TAP API",
      ],
      [
        "Data Structures & Algorithms",
        "Operating Systems",
        "DBMS",
        "Concurrency & Multi-threading",
        "System Design",
        "Computer Networks",
        "Object-Oriented Design",
        "Git & GitHub",
        "Hugging Face",
        "PyAutoGUI",
        "Postman",
        "3D PCA",
        "Parquet",
      ],
    ],
  },
  {
    id: "dl",
    idx: "01",
    title: "Deep Learning & Audio AI",
    count: 11,
    rows: [
      ["PyTorch", "WavLM Base+", "Torchaudio", "Transformers", "LFCC-LCNN", "Faster-Whisper"],
      ["librosa", "PyG (GNNs)", "Platt Scaling", "Voice Activity Detection", "Spectral Filtering"],
    ],
  },
  {
    id: "ml",
    idx: "02",
    title: "Machine Learning & Data",
    count: 12,
    rows: [
      ["Scikit-Learn", "XGBoost", "Prophet", "NumPy", "Pandas", "SciPy"],
      ["Streamlit", "Plotly", "Parquet", "OpenAQ API", "NASA TAP API", "3D PCA"],
    ],
  },
  {
    id: "lang",
    idx: "03",
    title: "Languages",
    count: 9,
    rows: [
      ["Python", "C++", "Java", "C", "SQL"],
      ["JavaScript", "TypeScript", "Bash / Shell", "HTML / CSS"],
    ],
  },
  {
    id: "sys",
    idx: "04",
    title: "Systems & Tools",
    count: 10,
    rows: [
      ["FastAPI", "WebSockets", "RESTful APIs", "Docker", "Linux"],
      ["Git & GitHub", "Groq API", "Hugging Face", "PyAutoGUI", "Postman"],
    ],
  },
  {
    id: "cs",
    idx: "05",
    title: "Core CS Fundamentals",
    count: 7,
    rows: [
      ["Data Structures & Algorithms", "Operating Systems", "DBMS", "System Design"],
      ["Concurrency & Multi-threading", "Computer Networks", "Object-Oriented Design"],
    ],
  },
];

function getSegmentItems(items: string[]): string[] {
  let res: string[] = [];
  while (res.length < 12) {
    res = res.concat(items);
  }
  return res;
}

export default function LukeBaffaitPortfolio() {
  const { lenis, scrollTo } = useLenis();
  const [openGroups, setOpenGroups] = useState<string[]>(["all"]);

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);
    return () => clearTimeout(t);
  }, [openGroups]);

  useEffect(() => {
    // =========================================================================
    // 1. Character Roll Effect (.chr-hover)
    // =========================================================================
    const hoverEls = document.querySelectorAll<HTMLElement>(
      ".chr-hover[data-chr], .chr-hover[data-chr-contact], .chr-hover[data-chr-footer]"
    );
    hoverEls.forEach((target) => {
      if (target.querySelector(".ch-wrap")) return;
      const text =
        target.dataset.chr ||
        target.getAttribute("data-chr-contact") ||
        target.getAttribute("data-chr-footer") ||
        "";
      target.innerHTML = "";
      [...text].forEach((ch, i) => {
        if (ch === " ") {
          const sp = document.createElement("span");
          sp.style.cssText = "width:0.35em;display:inline-block;";
          sp.innerHTML = "&nbsp;";
          target.appendChild(sp);
          return;
        }
        const wrap = document.createElement("span");
        wrap.className = "ch-wrap";
        wrap.style.setProperty("--i", String(i));

        const top = document.createElement("span");
        top.className = "ch-top";
        top.textContent = ch;

        const bot = document.createElement("span");
        bot.className = "ch-bot";
        bot.textContent = ch;

        wrap.appendChild(top);
        wrap.appendChild(bot);
        target.appendChild(wrap);
      });
    });

    // =========================================================================
    // 2. Preloader & Name Split Helpers
    // =========================================================================
    const pContent = document.getElementById("preloader-content");
    const pLogo = document.getElementById("preloader-logo");
    const pLuke = document.getElementById("preloader-luke");
    const pBaffait = document.getElementById("preloader-baffait");
    const pDot = document.getElementById("preloader-dot");
    const tPanelRed = document.getElementById("t-panel-red");
    const tPanelDark = document.getElementById("t-panel-dark");
    const introBg = document.getElementById("intro-bg");
    const hero = document.getElementById("hero");
    const nameLayer = document.getElementById("name-layer");

    function splitIntoChars(el: HTMLElement | null): HTMLElement[] {
      if (!el) return [];
      const raw = el.textContent || "";
      el.innerHTML = "";
      const inners: HTMLElement[] = [];
      raw.split("").forEach((ch) => {
        const outer = document.createElement("span");
        outer.style.cssText =
          "display:inline-block;overflow:hidden;vertical-align:top;padding:0.15em 0.3em;margin:-0.15em -0.3em;";
        const inner = document.createElement("span");
        inner.className = "char";
        inner.style.display = "inline-block";
        inner.textContent = ch === " " ? "\u00A0" : ch;
        outer.appendChild(inner);
        el.appendChild(outer);
        inners.push(inner);
      });
      return inners;
    }

    const logoChar = splitIntoChars(pLogo);
    const lukeChars = splitIntoChars(pLuke);
    const baffaitChars = splitIntoChars(pBaffait);
    const allRevealEls = [...logoChar, ...lukeChars, ...baffaitChars];

    function getCharGap() {
      if (!pBaffait) return 16;
      return (parseFloat(getComputedStyle(pBaffait).fontSize) || 16) * 0.55;
    }

    function layoutNames() {
      if (!pBaffait || !pLuke || !pDot) return;
      const fs = parseFloat(getComputedStyle(pBaffait).fontSize);
      if (!fs) return;
      const baselineOffset = -0.06;

      const lukeLeft = pLuke.offsetLeft;
      const lukeWidth = pLuke.offsetWidth;
      const gapPx = fs * 0.55;

      const baffaitLeftPx = lukeLeft + lukeWidth + gapPx;
      pBaffait.style.left = baffaitLeftPx / fs + "em";
      pBaffait.style.top = baselineOffset + "em";

      const dotLeftPx = baffaitLeftPx + pBaffait.offsetWidth;
      pDot.style.left = dotLeftPx / fs + "em";
      pDot.style.top = baselineOffset + "em";
    }

    function getTotalWidth() {
      if (!pLogo || !pLuke || !pBaffait || !pDot) return 0;
      return (
        pLogo.offsetWidth +
        pLuke.offsetWidth +
        getCharGap() +
        pBaffait.offsetWidth +
        pDot.offsetWidth
      );
    }

    function placeIntroNameAtBottom() {
      if (!pContent || !pLogo) return;
      layoutNames();
      const totalW = getTotalWidth();
      const offsetX = -(totalW / 2 - pLogo.offsetWidth / 2);
      const vw = window.innerWidth;
      const offsetX_vw = (offsetX / vw) * 100;
      const newH = pContent.offsetHeight;
      const vh = window.innerHeight;
      const bottomPad = vw <= 768 ? Math.max(vh * 0.12, 80) : 80;
      const targetBottom = vh - bottomPad;
      const offsetY = targetBottom - newH / 2 - vh / 2;
      gsap.set(pContent, {
        x: `${offsetX_vw}vw`,
        y: offsetY,
        transformOrigin: "50% 50%",
      });
    }

    layoutNames();
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        layoutNames();
        placeIntroNameAtBottom();
      });
    }

    gsap.set([pLogo, pLuke, pBaffait], { opacity: 1 });
    gsap.set(allRevealEls, { yPercent: 110 });
    gsap.set(pDot, { opacity: 0 });
    gsap.set([pContent, tPanelRed, tPanelDark], { willChange: "transform" });

    // Handle responsive resize re-anchoring
    const onWindowResize = () => {
      layoutNames();
      placeIntroNameAtBottom();
    };
    window.addEventListener("resize", onWindowResize);

    // =========================================================================
    // 3. Master Intro Sequence Timeline
    // =========================================================================
    const master = gsap.timeline({ delay: 0.2 });

    master
      .add(() => {
        layoutNames();
        if (pContent && pLogo) {
          gsap.set(pContent, {
            x: -(getTotalWidth() / 2 - pLogo.offsetWidth / 2),
          });
        }
        if (pLuke) gsap.set(pLuke, { x: 0 });
      })
      .to(allRevealEls, {
        yPercent: 0,
        duration: 0.45,
        ease: "power3.out",
        stagger: { each: 0.025, from: "center" },
      })
      .add(() => layoutNames())
      .to(pDot, {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      })
      .to({}, { duration: 0.25 })
      .add(() => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const mobile = vw <= 768;
        const pad = mobile ? 20 : 48;
        const currentW = getTotalWidth();
        const targetW = vw - pad * 2;
        const scale = currentW > 0 ? targetW / currentW : 1;

        if (pContent && pLogo) {
          const visualCenterX = getTotalWidth() / 2;
          const visualCenterY = pContent.offsetHeight / 2;
          gsap.set(pContent, {
            transformOrigin: `${visualCenterX}px ${visualCenterY}px`,
          });

          const bottomPad = mobile ? Math.max(vh * 0.18, 110) : 80;
          const targetBottom = vh - bottomPad;
          const contentRect = pContent.getBoundingClientRect();
          const curVisualCenterY = contentRect.top + visualCenterY;
          const targetVisualCenterY =
            targetBottom - (pContent.offsetHeight * scale) / 2;
          const deltaY = targetVisualCenterY - curVisualCenterY;

          const baseFontSize = parseFloat(getComputedStyle(pLogo).fontSize) || 40;
          const newFontSize = baseFontSize * scale;

          const applyFinalState = () => {
            pContent.style.visibility = "hidden";
            gsap.set(pContent, { scale: 1, x: 0, y: 0 });
            if (nameLayer) gsap.set(nameLayer, { mixBlendMode: "difference" });
            const vwSize = (newFontSize / vw) * 100;
            [pLogo, pLuke, pBaffait, pDot].forEach((el) => {
              if (el) el.style.fontSize = `${vwSize}vw`;
            });
            void pContent.offsetWidth;
            placeIntroNameAtBottom();
            pContent.style.visibility = "visible";
          };

          gsap.to(pContent, {
            scale: scale,
            y: `+=${deltaY}`,
            duration: 0.75,
            ease: "power3.inOut",
            onComplete: () => {
              requestAnimationFrame(applyFinalState);
            },
          });
        }
      })
      .to(
        tPanelDark,
        {
          y: "0%",
          duration: 0.45,
          ease: "power3.inOut",
        },
        "<+=0.05"
      )
      .to(
        tPanelRed,
        {
          y: "0%",
          duration: 0.45,
          ease: "power3.inOut",
        },
        "-=0.3"
      )
      .set(introBg, { display: "none" })
      .set(hero, { opacity: 1 })
      .to(
        tPanelRed,
        {
          y: "-100%",
          duration: 0.55,
          ease: "power3.inOut",
        },
        "+=0.05"
      )
      .to(
        tPanelDark,
        {
          y: "-100%",
          duration: 0.55,
          ease: "power3.inOut",
        },
        "-=0.4"
      )
      .to(
        "#hero-tagline",
        {
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.1,
          ease: "power3.inOut",
        },
        "-=0.2"
      )
      .to(
        "#hero-bar",
        {
          opacity: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 1.0,
          ease: "power3.inOut",
        },
        "-=0.8"
      )
      .fromTo(
        "#hero-line",
        { opacity: 1, scaleX: 0 },
        { scaleX: 1, duration: 1.0, ease: "power3.inOut" },
        "<"
      );

    // =========================================================================
    // 4. Hero Neural Particles Canvas (Subtle ambient AI architecture)
    // =========================================================================
    const heroCanvas = document.getElementById("hero-canvas") as HTMLCanvasElement | null;
    let heroRaf = 0;
    if (heroCanvas) {
      const hCtx = heroCanvas.getContext("2d");
      let hW = (heroCanvas.width = window.innerWidth);
      let hH = (heroCanvas.height = window.innerHeight);

      const resizeHC = () => {
        if (!heroCanvas) return;
        hW = heroCanvas.width = window.innerWidth;
        hH = heroCanvas.height = window.innerHeight;
      };
      window.addEventListener("resize", resizeHC);

      const numNodes = Math.min(Math.round(window.innerWidth * 0.04), 45);
      const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
      for (let n = 0; n < numNodes; n++) {
        nodes.push({
          x: Math.random() * hW,
          y: Math.random() * hH,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.5 + 1,
        });
      }

      let hMouseX = -1000, hMouseY = -1000;
      window.addEventListener("mousemove", (e) => {
        hMouseX = e.clientX;
        hMouseY = e.clientY;
      });

      const drawHeroCanvas = () => {
        if (!hCtx || !heroCanvas) return;
        if (window.scrollY > window.innerHeight) {
          heroRaf = requestAnimationFrame(drawHeroCanvas);
          return;
        }
        hCtx.clearRect(0, 0, hW, hH);

        for (let i = 0; i < nodes.length; i++) {
          const nd = nodes[i];
          nd.x += nd.vx;
          nd.y += nd.vy;
          if (nd.x < 0) nd.x = hW;
          else if (nd.x > hW) nd.x = 0;
          if (nd.y < 0) nd.y = hH;
          else if (nd.y > hH) nd.y = 0;

          const dmx = nd.x - hMouseX;
          const dmy = nd.y - hMouseY;
          const distM = Math.sqrt(dmx * dmx + dmy * dmy);
          if (distM < 120 && distM > 0) {
            nd.x += (dmx / distM) * 1.5;
            nd.y += (dmy / distM) * 1.5;
          }

          hCtx.fillStyle = "rgba(240, 240, 240, 0.25)";
          hCtx.beginPath();
          hCtx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
          hCtx.fill();

          for (let j = i + 1; j < nodes.length; j++) {
            const nd2 = nodes[j];
            const dx = nd.x - nd2.x;
            const dy = nd.y - nd2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              const alpha = (1 - dist / 110) * 0.12;
              hCtx.strokeStyle = `rgba(240, 240, 240, ${alpha})`;
              hCtx.lineWidth = 0.8;
              hCtx.beginPath();
              hCtx.moveTo(nd.x, nd.y);
              hCtx.lineTo(nd2.x, nd2.y);
              hCtx.stroke();
            }
          }
        }
        heroRaf = requestAnimationFrame(drawHeroCanvas);
      };
      heroRaf = requestAnimationFrame(drawHeroCanvas);
    }

    // =========================================================================
    // 5. Hero Sequence Scrubber Canvas
    // =========================================================================
    const canvas = document.getElementById("reveal-canvas") as HTMLCanvasElement | null;
    const revealWrap = document.getElementById("reveal-image-wrap");
    const revealSeq = document.querySelectorAll(".reveal-seq");
    const phraseEl = document.getElementById("reveal-phrase");

    const TOTAL_FRAMES = 200;
    const frames: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let drawnIdx = -1;

    function drawFrameToCanvas(
      ctx: CanvasRenderingContext2D,
      cvs: HTMLCanvasElement,
      img: HTMLImageElement
    ) {
      if (!img.complete || img.naturalWidth === 0) return;
      const cw = cvs.width;
      const ch = cvs.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const s = Math.max(cw / iw, ch / ih);
      const dw = iw * s;
      const dh = ih * s;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) * 0.5, (ch - dh) * 0.5, dw, dh);
    }

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const pad = String(i).padStart(3, "0");
      img.src = `/Landing/ezgif-frame-${pad}.jpg`;
      img.onload = () => {
        frames[i - 1] = img;
        if (i === 1 && canvas && drawnIdx === -1) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            drawFrameToCanvas(ctx, canvas, img);
            drawnIdx = 0;
          }
        }
      };
      if (i % 2 === 1) frames[i - 1] = img;
    }

    if (canvas) {
      const ctx = canvas.getContext("2d");

      const resizeCanvas = () => {
        if (!canvas || !ctx) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(window.innerWidth * dpr);
        canvas.height = Math.round(window.innerHeight * dpr);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        if (drawnIdx >= 0 && frames[drawnIdx]) {
          drawFrameToCanvas(ctx, canvas, frames[drawnIdx]);
        }
      };

      const drawFrame = (idx: number) => {
        if (!ctx || !canvas) return;
        let img = frames[idx];
        if (!img || !img.complete) {
          for (let d = 1; d < 20; d++) {
            if (frames[idx - d]?.complete) {
              img = frames[idx - d];
              break;
            }
            if (frames[idx + d]?.complete) {
              img = frames[idx + d];
              break;
            }
          }
        }
        if (img) {
          drawFrameToCanvas(ctx, canvas, img);
          drawnIdx = idx;
        }
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      let phraseChars: HTMLElement[] = [];
      if (phraseEl) {
        const text = phraseEl.textContent || "";
        phraseEl.innerHTML = "";
        [...text].forEach((ch) => {
          const span = document.createElement("span");
          span.className = "rp-char";
          span.style.display = "inline-block";
          span.textContent = ch === " " ? "\u00A0" : ch;
          phraseEl.appendChild(span);
          phraseChars.push(span);
        });
        gsap.set(phraseChars, { opacity: 0, filter: "blur(10px)" });
      }

      const scrollTl = gsap.timeline({ paused: true });

      scrollTl.fromTo(
        "#hero-tagline",
        { opacity: 1 },
        { opacity: 0, duration: 0.15, ease: "none" },
        0
      );
      scrollTl.fromTo(
        "#hero-bar",
        { opacity: 1 },
        { opacity: 0, duration: 0.15, ease: "none" },
        0
      );
      scrollTl.fromTo(
        "#hero-line",
        { opacity: 1 },
        { opacity: 0, duration: 0.15, ease: "none" },
        0
      );

      scrollTl.fromTo(
        revealWrap,
        { opacity: 0 },
        { opacity: 1, duration: 0.01 },
        0.3
      );
      scrollTl.fromTo(
        revealSeq,
        { scale: 0 },
        { scale: 1, duration: 0.7, ease: "none" },
        0.3
      );

      scrollTl.fromTo(
        [pLogo, pLuke],
        { x: "0vw", opacity: 1 },
        { x: "-55vw", opacity: 0, duration: 0.7, ease: "none" },
        0.3
      );
      scrollTl.fromTo(
        [pBaffait, pDot],
        { x: "0vw", opacity: 1 },
        { x: "55vw", opacity: 0, duration: 0.7, ease: "none" },
        0.3
      );
      scrollTl.set(nameLayer, { autoAlpha: 0 }, 0.98);

      if (phraseChars.length) {
        scrollTl.to(
          phraseChars,
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.06,
            ease: "none",
            stagger: { each: 0.007, from: "start" },
          },
          0.62
        );
      }

      ScrollTrigger.create({
        trigger: "#scroll-wrap",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        animation: scrollTl,
        onUpdate: (self) => {
          const p = self.progress;
          const frameIdx = Math.max(
            0,
            Math.min(TOTAL_FRAMES - 1, Math.round(p * (TOTAL_FRAMES - 1)))
          );
          drawFrame(frameIdx);
        },
      });
    }

    // =========================================================================
    // 6. About Section: Word Unblur & Photo Parallax
    // =========================================================================
    function wrapWords(el: HTMLElement | null) {
      if (!el) return;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const textNodes: Node[] = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode);

      textNodes.forEach((node) => {
        const words = (node.textContent || "").split(/(\s+)/);
        const frag = document.createDocumentFragment();
        words.forEach((w) => {
          if (/^\s+$/.test(w)) {
            frag.appendChild(document.createTextNode(w));
          } else if (w) {
            const span = document.createElement("span");
            span.className = "word";
            span.textContent = w;
            frag.appendChild(span);
          }
        });
        node.parentNode?.replaceChild(frag, node);
      });
    }

    const aboutText = document.getElementById("about-text");
    const aboutSub = document.getElementById("about-sub");
    const aboutVersion = document.querySelector(".about-version") as HTMLElement | null;
    const photoWrap = document.getElementById("about-photo-wrap");
    const photo = document.querySelector(".about-photo") as HTMLImageElement | null;

    wrapWords(aboutText);
    wrapWords(aboutVersion);

    if (aboutText) {
      aboutText.querySelectorAll(".word").forEach((word) => {
        gsap.to(word, {
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: word,
            start: "top 75%",
            end: "top 60%",
            scrub: true,
          },
        });
      });
    }

    if (aboutVersion) {
      aboutVersion.querySelectorAll(".word").forEach((word) => {
        gsap.to(word, {
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: word,
            start: "top 85%",
            end: "top 70%",
            scrub: true,
          },
        });
      });
    }

    if (aboutSub) {
      gsap.fromTo(
        aboutSub,
        { opacity: 0, filter: "blur(12px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: aboutSub,
            start: "top 80%",
            end: "top 60%",
            scrub: true,
          },
        }
      );
    }

    if (photo && photoWrap) {
      const initPhotoScroll = () => {
        const pTl = gsap.timeline({
          scrollTrigger: {
            trigger: photoWrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        pTl.fromTo(photo, { y: "-40%" }, { y: "40%", ease: "none" }, 0);
        pTl.fromTo(
          photo,
          { opacity: 0, filter: "blur(20px)" },
          { opacity: 1, filter: "blur(0px)", ease: "none", duration: 0.35 },
          0
        );
      };
      if (photo.complete) initPhotoScroll();
      else photo.onload = initPhotoScroll;
    }

    // =========================================================================
    // 7. Projects Section: Drawing Red Fluid Line & Fixed Card Preview
    // =========================================================================
    const linePath = document.getElementById("fluid-line") as SVGPathElement | null;
    if (linePath && linePath.getTotalLength) {
      const lineLen = linePath.getTotalLength() || 3000;
      gsap.set(linePath, { strokeDasharray: lineLen, strokeDashoffset: lineLen });
      gsap.to(linePath, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "#projects",
          start: "top 70%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    }

    const items = document.querySelectorAll(".proj-item");
    const card = document.getElementById("proj-card");
    const cover = document.getElementById("proj-cover") as HTMLImageElement | null;
    const dateEl = document.getElementById("proj-date");
    const preview = document.getElementById("proj-preview");
    const projCursor = document.getElementById("proj-cursor");
    const projectsEl = document.getElementById("projects");

    let currentIdx = -1;
    let projectsVisible = false;
    if (card) gsap.set(card, { opacity: 0 });

    const itemQuickX = Array.from(items).map((item) =>
      gsap.quickTo(item, "x", { duration: 0.6, ease: "power2.out" })
    );

    if (projectsEl && preview) {
      ScrollTrigger.create({
        trigger: projectsEl,
        start: "top 35%",
        end: "bottom 65%",
        onEnter: () => {
          preview.classList.add("visible");
          projectsVisible = true;
          onProjectsScroll();
        },
        onLeave: () => {
          preview.classList.remove("visible");
          projectsVisible = false;
          deactivateAll();
        },
        onEnterBack: () => {
          preview.classList.add("visible");
          projectsVisible = true;
          onProjectsScroll();
        },
        onLeaveBack: () => {
          preview.classList.remove("visible");
          projectsVisible = false;
          deactivateAll();
        },
      });
    }

    function deactivateAll() {
      if (currentIdx >= 0 && items[currentIdx]) {
        items[currentIdx].classList.remove("active");
      }
      currentIdx = -1;
      if (card) gsap.to(card, { opacity: 0, duration: 0.25, ease: "power2.in" });
    }

    function activateProject(i: number) {
      if (i === currentIdx) return;
      if (currentIdx >= 0 && items[currentIdx]) {
        items[currentIdx].classList.remove("active");
      }
      if (items[i]) items[i].classList.add("active");

      const itemEl = items[i] as HTMLElement;
      const imgSrc = itemEl.dataset.img || "/About/img_00001.jpg";
      const dateText = itemEl.dataset.date || "";

      if (currentIdx === -1) {
        if (cover) cover.src = imgSrc;
        if (dateEl) dateEl.textContent = dateText;
        if (card) gsap.to(card, { opacity: 1, duration: 0.4, ease: "power2.out" });
      } else {
        if (card) {
          gsap.to(card, {
            opacity: 0,
            duration: 0.18,
            ease: "power2.in",
            onComplete: () => {
              if (cover) cover.src = imgSrc;
              if (dateEl) dateEl.textContent = dateText;
              gsap.to(card, { opacity: 1, duration: 0.3, ease: "power2.out" });
            },
          });
        }
      }
      currentIdx = i;
    }

    function onProjectsScroll() {
      if (!projectsVisible) {
        if (currentIdx >= 0) deactivateAll();
        return;
      }
      const cy = window.innerHeight / 2;
      const halfH = window.innerHeight / 2;
      let closestIdx = -1;
      let closestDist = Infinity;

      items.forEach((item, i) => {
        const rect = item.getBoundingClientRect();
        const itemCy = rect.top + rect.height / 2;
        const dist = Math.abs(itemCy - cy);

        itemQuickX[i](Math.min(dist / halfH, 1) * 80);

        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      });

      if (closestIdx >= 0 && closestDist < window.innerHeight * 0.38) {
        activateProject(closestIdx);
      } else {
        deactivateAll();
      }
    }

    window.addEventListener("scroll", onProjectsScroll, { passive: true });
    onProjectsScroll();

    // Mouse Tracking: Tilt for Preview Card & Follower for projCursor
    const qCursorX = projCursor
      ? gsap.quickTo(projCursor, "left", { duration: 0.35, ease: "power3.out" })
      : null;
    const qCursorY = projCursor
      ? gsap.quickTo(projCursor, "top", { duration: 0.35, ease: "power3.out" })
      : null;

    let tiltTargetRY = 0;
    let tiltTargetRX = 0;
    let tiltRY = 0;
    let tiltRX = 0;
    let detTiltTargetRY = 0;
    let detTiltTargetRX = 0;
    let detTiltRY = 0;
    let detTiltRX = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (projectsVisible) {
        if (qCursorX) qCursorX(e.clientX);
        if (qCursorY) qCursorY(e.clientY);
        if (card) {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const ry = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)));
          const rx = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
          tiltTargetRY = ry * 6;
          tiltTargetRX = -rx * 5;
        }
      }
      if (projectOpen && cachedSelImg) {
        const sr = cachedSelImg.getBoundingClientRect();
        const scx = sr.left + sr.width / 2;
        const scy = sr.top + sr.height / 2;
        const sry = Math.max(-1, Math.min(1, (e.clientX - scx) / (sr.width / 2)));
        const srx = Math.max(-1, Math.min(1, (e.clientY - scy) / (sr.height / 2)));
        detTiltTargetRY = sry * 5;
        detTiltTargetRX = -srx * 4;
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    let rafTilt = 0;
    const tickTilt = () => {
      tiltRY += (tiltTargetRY - tiltRY) * 0.1;
      tiltRX += (tiltTargetRX - tiltRX) * 0.1;
      if (card && projectsVisible) {
        card.style.transform = `rotateX(${tiltRX.toFixed(2)}deg) rotateY(${tiltRY.toFixed(2)}deg)`;
      }
      if (cachedSelImg && projectOpen) {
        detTiltRY += (detTiltTargetRY - detTiltRY) * 0.1;
        detTiltRX += (detTiltTargetRX - detTiltRX) * 0.1;
        cachedSelImg.style.transform = `rotateX(${detTiltRX.toFixed(2)}deg) rotateY(${detTiltRY.toFixed(2)}deg)`;
      }
      rafTilt = requestAnimationFrame(tickTilt);
    };
    rafTilt = requestAnimationFrame(tickTilt);

    if (cover && projCursor) {
      cover.addEventListener("mouseenter", () => projCursor.classList.add("active"));
      cover.addEventListener("mouseleave", () => projCursor.classList.remove("active"));
    }

    // =========================================================================
    // 8. Full Project Detail Modal Overlay & Transition
    // =========================================================================
    const pageFade = document.getElementById("page-fade");
    const flyingTitle = document.getElementById("flying-title");
    const detailEl = document.getElementById("project-detail");
    const detailBack = document.getElementById("detail-back");
    const detailTitleWrap = document.getElementById("detail-title-wrap");
    const detailTitle = document.getElementById("detail-title");
    const detailYear = document.getElementById("detail-year");
    const detailDesc = document.getElementById("detail-desc");
    const detailTags = document.getElementById("detail-tags");
    const detailVisit = document.getElementById("detail-visit") as HTMLAnchorElement | null;
    const detailGalleryWrap = document.getElementById("detail-gallery-wrap");
    const detailThumbs = document.getElementById("detail-thumbs");
    const detailThumbsInner = document.getElementById("detail-thumbs-inner");
    const detailSelected = document.getElementById("detail-selected");

    let projectOpen = false;
    let flyingSourceItem: HTMLElement | null = null;
    let galleryY = 0;
    let galleryMaxScroll = 0;
    let qGalleryY: ((v: number) => void) | null = null;
    let cachedSelImg: HTMLImageElement | null = null;

    function openProject(id: string, clickedItem: HTMLElement) {
      const proj = PROJECTS_MAP[id];
      if (!proj || projectOpen) return;
      projectOpen = true;
      flyingSourceItem = clickedItem;

      if (lenis) lenis.stop();

      const stTimeline = document.getElementById("scroll-timeline");
      const pctEl = document.getElementById("scroll-pct");
      if (stTimeline) stTimeline.style.display = "none";
      if (pctEl) pctEl.style.display = "none";

      const rect = clickedItem.getBoundingClientRect();
      const cs = getComputedStyle(clickedItem);
      if (flyingTitle) {
        flyingTitle.textContent = clickedItem.textContent;
        flyingTitle.style.fontSize = cs.fontSize;
        flyingTitle.style.lineHeight = cs.lineHeight;
        flyingTitle.style.letterSpacing = cs.letterSpacing;
        gsap.set(flyingTitle, {
          left: rect.left,
          top: rect.top,
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
          transformOrigin: "left top",
        });
      }

      clickedItem.style.visibility = "hidden";

      if (detailTitle) detailTitle.textContent = clickedItem.textContent;
      if (detailYear) detailYear.textContent = proj.year;
      if (detailDesc) detailDesc.textContent = proj.desc;
      if (detailTags) {
        detailTags.innerHTML = proj.tags
          .map((t) => `<span class="detail-tag">${t}</span>`)
          .join("");
      }

      if (detailVisit) {
        if (proj.link) {
          detailVisit.href = proj.link;
          detailVisit.classList.add("has-link");
        } else {
          detailVisit.removeAttribute("href");
          detailVisit.classList.remove("has-link");
        }
      }

      const allImages = [clickedItem.dataset.img || proj.cover, ...proj.images];
      if (detailThumbsInner) {
        detailThumbsInner.innerHTML = allImages
          .map((src) => `<img src="${src}" alt="" decoding="async">`)
          .join("");
        const thumbImgs = detailThumbsInner.querySelectorAll("img");
        thumbImgs.forEach((tImg, idx) => {
          tImg.addEventListener("click", () => {
            thumbImgs.forEach((img) => img.classList.remove("active"));
            tImg.classList.add("active");
            if (cachedSelImg) cachedSelImg.src = tImg.src;
          });
        });
        if (thumbImgs[0]) thumbImgs[0].classList.add("active");
        gsap.set(detailThumbsInner, { y: 0 });
      }

      if (detailSelected) {
        detailSelected.innerHTML = `<img src="${allImages[0]}" alt="" decoding="async">`;
        cachedSelImg = detailSelected.querySelector("img");
      }

      galleryY = 0;

      const remPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const targetTop = window.innerHeight * 0.22;
      const targetLeft = remPx * 4;
      const targetFontSize = Math.min(
        Math.max(window.innerWidth * 0.05, remPx * 3),
        remPx * 5
      );

      const tl = gsap.timeline();
      tl.to(pageFade, { opacity: 1, duration: 0.8, ease: "power2.inOut" }, 0);
      tl.to(
        flyingTitle,
        {
          top: targetTop,
          left: targetLeft,
          fontSize: targetFontSize,
          duration: 1,
          ease: "power3.inOut",
        },
        0.3
      );
      tl.to(
        detailEl,
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          onStart: () => detailEl?.classList.add("active"),
        },
        1.0
      );
      tl.set(flyingTitle, { opacity: 0 }, 1.1);
      tl.set(detailTitleWrap, { opacity: 1 }, 1.1);
      tl.to(detailDesc, { opacity: 1, duration: 0.6, ease: "power2.out" }, 1.2);
      tl.to(detailTags, { opacity: 1, duration: 0.5, ease: "power2.out" }, 1.3);
      tl.to(detailVisit, { opacity: 1, duration: 0.5, ease: "power2.out" }, 1.4);
      tl.to(detailBack, { opacity: 1, duration: 0.5, ease: "power2.out" }, 1.3);
      tl.fromTo(
        detailGalleryWrap,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power3.out" },
        1.2
      );
      tl.add(() => {
        if (detailThumbsInner && detailThumbs) {
          galleryMaxScroll = Math.max(
            0,
            detailThumbsInner.scrollHeight - detailThumbs.clientHeight
          );
          qGalleryY = gsap.quickTo(detailThumbsInner, "y", {
            duration: 0.8,
            ease: "power2.out",
          });
        }
      });
    }

    function closeProject() {
      if (!projectOpen) return;
      projectOpen = false;
      qGalleryY = null;

      const stTimeline = document.getElementById("scroll-timeline");
      const pctEl = document.getElementById("scroll-pct");
      if (stTimeline) stTimeline.style.display = "";
      if (pctEl) pctEl.style.display = "";

      const tl = gsap.timeline();
      tl.to([detailDesc, detailTags, detailVisit, detailBack], {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      }, 0);
      tl.to(detailGalleryWrap, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0);

      if (detailTitle && flyingTitle) {
        const dtRect = detailTitle.getBoundingClientRect();
        const dtCs = getComputedStyle(detailTitle);
        flyingTitle.textContent = detailTitle.textContent;
        flyingTitle.style.fontSize = dtCs.fontSize;
        gsap.set(flyingTitle, { left: dtRect.left, top: dtRect.top, opacity: 1, x: 0, y: 0 });
        gsap.set(detailTitleWrap, { opacity: 0 });
      }

      tl.to(detailEl, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0.2);

      if (flyingSourceItem && flyingTitle) {
        const itemRect = flyingSourceItem.getBoundingClientRect();
        const itemCs = getComputedStyle(flyingSourceItem);
        tl.to(
          flyingTitle,
          {
            left: itemRect.left,
            top: itemRect.top,
            fontSize: parseFloat(itemCs.fontSize),
            duration: 0.9,
            ease: "power3.inOut",
          },
          0.3
        );
      }

      tl.to(pageFade, { opacity: 0, duration: 0.6, ease: "power2.out" }, 0.5);

      tl.add(() => {
        detailEl?.classList.remove("active");
        gsap.set(
          [detailTitleWrap, detailDesc, detailTags, detailVisit, detailBack, detailGalleryWrap],
          { opacity: 0 }
        );
        gsap.set(flyingTitle, { opacity: 0 });
        if (flyingSourceItem) {
          flyingSourceItem.style.visibility = "";
          flyingSourceItem = null;
        }
        if (lenis) lenis.start();
        ScrollTrigger.refresh();
      });
    }

    items.forEach((item, i) => {
      item.addEventListener("click", () => {
        const itemEl = item as HTMLElement;
        if (itemEl.classList.contains("active")) {
          const id = itemEl.dataset.id;
          if (id) openProject(id, itemEl);
        } else {
          activateProject(i);
          let docTop = 0;
          let el: HTMLElement | null = itemEl;
          while (el) {
            docTop += el.offsetTop;
            el = el.offsetParent as HTMLElement | null;
          }
          if (scrollTo) {
            scrollTo(docTop - window.innerHeight / 2 + itemEl.offsetHeight / 2, {
              duration: 1.2,
            });
          }
        }
      });
    });

    if (cover) {
      cover.addEventListener("click", () => {
        if (currentIdx >= 0 && items[currentIdx]) {
          const itemEl = items[currentIdx] as HTMLElement;
          const id = itemEl.dataset.id;
          if (id) openProject(id, itemEl);
        }
      });
    }

    if (detailBack) detailBack.addEventListener("click", closeProject);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && projectOpen) closeProject();
    };
    window.addEventListener("keydown", onKeyDown);

    if (detailEl) {
      detailEl.addEventListener(
        "wheel",
        (e) => {
          if (!projectOpen) return;
          e.preventDefault();
          const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
          galleryY = Math.max(-galleryMaxScroll, Math.min(0, galleryY - delta));
          if (qGalleryY) qGalleryY(galleryY);
        },
        { passive: false }
      );
    }

    // =========================================================================
    // 9. 3D Elliptical Orbit Gallery & Curved Slices
    // =========================================================================
    const cgPhrase = document.getElementById("cg-phrase");
    const vw = window.innerWidth;

    if (vw > 768) {
      function buildSlices() {
        const SLICES = 10;
        const imgW = Math.min(Math.max(120, vw * 0.14), 210);
        const imgH = (imgW * 2) / 3;
        const orbitR = (vw * 0.34 + 500) / 2;
        const bendRad = imgW / orbitR;
        const cylR = orbitR;
        const sliceW = imgW / SLICES;
        const totalBendDeg = (bendRad * 180) / Math.PI;
        const stepDeg = totalBendDeg / SLICES;

        document.querySelectorAll(".cg-img").forEach((img) => {
          if (img.tagName.toLowerCase() !== "img") return;
          const src = img.getAttribute("src") || "";
          const wrapper = document.createElement("div");
          wrapper.className = "cg-img";

          for (let s = 0; s < SLICES; s++) {
            const sl = document.createElement("div");
            sl.className = "cg-slice";
            const displayW = sliceW + 1.5;
            sl.style.width = displayW.toFixed(1) + "px";
            sl.style.left = "50%";
            sl.style.marginLeft = (-displayW / 2).toFixed(1) + "px";
            sl.style.backgroundImage = "url(" + src + ")";
            sl.style.backgroundSize = imgW.toFixed(1) + "px " + imgH.toFixed(1) + "px";
            sl.style.backgroundPosition = (-s * sliceW).toFixed(1) + "px 0";
            sl.style.transformOrigin = "50% 50% " + (-cylR).toFixed(1) + "px";
            const angle = (s - (SLICES - 1) / 2) * stepDeg;
            sl.style.transform = "rotateY(" + angle.toFixed(2) + "deg)";
            wrapper.appendChild(sl);
          }
          img.parentNode?.replaceChild(wrapper, img);
        });
      }

      buildSlices();

      const cgImgs = Array.from(document.querySelectorAll<HTMLElement>(".cg-img"));
      const count = cgImgs.length;

      wrapWords(cgPhrase);
      const cgPhraseWords = Array.from(
        document.querySelectorAll<HTMLElement>("#cg-phrase .word")
      );

      const rx = vw * 0.34;
      const rz = 500;
      const tiltY = 180;
      const entryAngle = Math.PI / 2;
      const offX = vw * 0.85;

      function getPos(t: number) {
        if (t <= 0.12) {
          const p = t / 0.12;
          return {
            x: -offX * (1 - p),
            y: tiltY,
            z: rz * p,
            rotY: 0,
          };
        }
        if (t <= 0.88) {
          const p = (t - 0.12) / 0.76;
          const angle = entryAngle - p * Math.PI * 2;
          const x = Math.cos(angle) * rx;
          const z = Math.sin(angle) * rz;
          const ry = p * Math.PI * 2;
          return {
            x,
            y: (z / rz) * tiltY,
            z,
            rotY: ry,
          };
        }
        const p = (t - 0.88) / 0.12;
        return {
          x: offX * p,
          y: tiltY,
          z: rz * (1 - p),
          rotY: Math.PI * 2,
        };
      }

      const stagger = 0.09;
      const totalRange = 1 + stagger * (count - 1);

      cgImgs.forEach((img) => {
        img.style.opacity = "0";
      });

      ScrollTrigger.create({
        trigger: "#circle-gallery",
        start: "top top",
        end: "bottom bottom",
        pin: "#circle-gallery-pin",
        onUpdate: (self) => {
          const progress = self.progress;

          cgImgs.forEach((img, i) => {
            const imgT = progress * totalRange - i * stagger;
            if (imgT <= 0 || imgT >= 1) {
              img.style.opacity = "0";
              return;
            }
            let alpha = 1;
            if (imgT < 0.06) alpha = imgT / 0.06;
            else if (imgT > 0.94) alpha = (1 - imgT) / 0.06;

            const pos = getPos(imgT);
            const rotDeg = ((pos.rotY * 180) / Math.PI).toFixed(1);

            img.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, ${pos.z.toFixed(1)}px) rotateY(${rotDeg}deg)`;
            img.style.opacity = String(alpha);
            img.style.zIndex = String(Math.round(pos.z + 600));
          });

          const phraseStart = 0.25;
          const phraseEnd = 0.75;
          const travelY = 200;

          if (cgPhrase) {
            if (progress < phraseStart || progress > phraseEnd) {
              cgPhrase.style.opacity = "0";
            } else {
              const globalP = (progress - phraseStart) / (phraseEnd - phraseStart);
              const yOffset = travelY * (0.5 - globalP);
              cgPhrase.style.transform = `translateY(${yOffset.toFixed(1)}px)`;

              const revealEnd = 0.4;
              cgPhraseWords.forEach((w, wi) => {
                if (globalP < revealEnd) {
                  const revealP = globalP / revealEnd;
                  const wordT = revealP * (cgPhraseWords.length + 4) - wi;
                  const wP = Math.max(0, Math.min(1, wordT / 3));
                  w.style.opacity = String(wP);
                  w.style.filter = `blur(${(8 * (1 - wP)).toFixed(1)}px)`;
                } else {
                  w.style.opacity = "1";
                  w.style.filter = "blur(0px)";
                }
              });

              let alpha = 1;
              if (globalP < 0.1) alpha = globalP / 0.1;
              else if (globalP > 0.75) alpha = (1 - globalP) / 0.25;
              cgPhrase.style.opacity = String(alpha);
            }
          }
        },
      });
    }

    // =========================================================================
    // 10. Awards Radar Scanner
    // =========================================================================
    const awardItems = document.querySelectorAll(".award-item");
    awardItems.forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top center+=15%",
        end: "bottom center-=15%",
        toggleClass: { targets: item, className: "active-award" },
      });
    });

    // =========================================================================
    // 11. Contact Section: White Blob, Title Slide, & Dual Parallax Frames
    // =========================================================================
    const blobWrap = document.getElementById("contact-blob-wrap");
    const blob = document.getElementById("contact-blob");
    const contactBg = document.getElementById("contact-bg");
    const contactSection = document.getElementById("contact");
    const contactPin = document.getElementById("contact-pin");
    const ctTitle = document.getElementById("contact-title");
    const ctSocials = document.getElementById("contact-socials");
    const ctMail = document.getElementById("contact-mail");
    const dispo = document.getElementById("contact-dispo");
    const frame = document.getElementById("contact-frame");
    const frameImg = document.getElementById("contact-frame-img");
    const dispo2 = document.getElementById("contact-dispo-2");
    const frame2 = document.getElementById("contact-frame-2");
    const frameImg2 = document.getElementById("contact-frame-img-2");

    if (blobWrap && blob && ctTitle) {
      ScrollTrigger.create({
        trigger: "#contact",
        start: "top bottom",
        endTrigger: "#footer-transition",
        end: "bottom bottom",
        onEnter: () => {
          blobWrap.style.visibility = "visible";
          if (contactBg) contactBg.style.display = "block";
        },
        onLeave: () => {
          blobWrap.style.visibility = "hidden";
          if (contactBg) contactBg.style.display = "none";
        },
        onLeaveBack: () => {
          blobWrap.style.visibility = "hidden";
          if (contactBg) contactBg.style.display = "none";
        },
        onEnterBack: () => {
          blobWrap.style.visibility = "visible";
          if (contactBg) contactBg.style.display = "block";
        },
      });
      blobWrap.style.visibility = "hidden";

      const cTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#contact",
          start: "top bottom",
          end: "bottom bottom",
          scrub: true,
        },
      });

      cTl.fromTo(blob, { scale: 0 }, { scale: 1, duration: 0.6, ease: "none" }, 0);

      const isMobile = window.innerWidth <= 768;
      if (!isMobile) {
        gsap.set(ctTitle, { yPercent: 0, x: () => window.innerWidth * 1.1 });
        cTl.to(ctTitle, { x: 0, duration: 0.3, ease: "power3.out" }, 0.18);
      } else {
        gsap.set(ctTitle, { opacity: 0, y: 30 });
        cTl.to(ctTitle, { opacity: 1, y: 0, duration: 0.3, ease: "power3.out" }, 0.18);
      }

      cTl.fromTo(
        ctSocials,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.2, ease: "none" },
        0.28
      );

      cTl.fromTo(
        ctMail,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.2, ease: "none" },
        0.36
      );

      const pairStart = 0.22;
      const frameDur = 0.65;
      const frameY = () => window.innerHeight * 1.1;
      const frameYEnd = () => -window.innerHeight * 1.4;
      const dispoY = () => window.innerHeight * 1.1;
      const dispoYEnd = () => -window.innerHeight * 1.65;

      if (frame && frameImg) {
        gsap.set(frame, { yPercent: -50, y: frameY });
        gsap.set(frameImg, { yPercent: -30 });
        cTl.to(frame, { y: frameYEnd, duration: frameDur, ease: "none" }, pairStart);
        cTl.to(frameImg, { yPercent: 30, duration: frameDur, ease: "none" }, pairStart);
      }

      if (dispo) {
        gsap.set(dispo, { yPercent: -50, y: dispoY, opacity: 1, clipPath: "inset(0% 0 0% 0)" });
        cTl.to(dispo, { y: dispoYEnd, duration: frameDur, ease: "none" }, pairStart);
        cTl.to(
          dispo,
          { opacity: 0, clipPath: "inset(100% 0 0% 0)", duration: 0.15, ease: "power2.in" },
          pairStart + 0.45
        );
      }

      if (frame2 && frameImg2) {
        gsap.set(frame2, { yPercent: -50, y: () => window.innerHeight * 1.3 });
        gsap.set(frameImg2, { yPercent: -30 });
        cTl.to(frame2, { y: frameYEnd, duration: frameDur, ease: "none" }, pairStart + 0.07);
        cTl.to(frameImg2, { yPercent: 30, duration: frameDur, ease: "none" }, pairStart + 0.07);
      }

      if (dispo2) {
        gsap.set(dispo2, { yPercent: -50, y: frameY, opacity: 1, clipPath: "inset(0% 0 0% 0)" });
        cTl.to(dispo2, { y: frameYEnd, duration: frameDur, ease: "none" }, pairStart);
        cTl.to(
          dispo2,
          { opacity: 0, clipPath: "inset(100% 0 0% 0)", duration: 0.15, ease: "power2.in" },
          pairStart + 0.45
        );
      }
    }

    // =========================================================================
    // 12. Curtain Footer Lift & Interactive Hover ASCII Art
    // =========================================================================
    const footerEl = document.getElementById("footer");
    if (footerEl) {
      ScrollTrigger.create({
        trigger: "#footer-transition",
        start: "top bottom+=500",
        end: "bottom bottom",
        onEnter: () => {
          footerEl.style.visibility = "visible";
        },
        onLeaveBack: () => {
          footerEl.style.visibility = "hidden";
        },
      });
    }

    if (blobWrap && contactPin && contactSection) {
      const ftl = gsap.timeline({
        scrollTrigger: {
          trigger: "#footer-transition",
          start: "top bottom+=550",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            if (p > 0.2) {
              if (contactBg) contactBg.style.display = "none";
              contactSection.style.pointerEvents = "none";
            } else {
              if (contactBg) contactBg.style.display = "block";
              contactSection.style.pointerEvents = "";
            }
          },
        },
      });

      ftl.set(blobWrap, { height: "110vh", overflow: "hidden", borderRadius: "0 0 0px 0px" }, 0);
      ftl.to(blobWrap, { borderRadius: "0 0 50px 50px", duration: 0.15, ease: "power2.out" }, 0);
      ftl.to(
        blobWrap,
        {
          y: () => -(window.innerHeight * 1.8 + 400),
          immediateRender: false,
          duration: 1.0,
          ease: "none",
        },
        0
      );
      ftl.to(
        contactPin,
        {
          y: "-40vh",
          pointerEvents: "none",
          immediateRender: false,
          duration: 1.0,
          ease: "none",
        },
        0
      );
      ftl.fromTo(
        [ctSocials, ctMail],
        { clipPath: "inset(0 0 0% 0)" },
        { clipPath: "inset(0 0 100% 0)", duration: 0.2, ease: "none" },
        0
      );
    }

    // ASCII Art Generator for Left & Right Panels
    const ASCII_POOLS = [
      " ",
      "·.,",
      ":;`-~^",
      "=+<>?!:;",
      "|/\\()[]{}«»",
      "÷×±≈≠≤≥∞∑∏√∫",
      "¤†‡§¶©®™°¬",
      "%&#$@¥€£¢",
    ];

    let asciiSeed = 42;
    function asciiRand() {
      asciiSeed = (asciiSeed * 16807 + 0) % 2147483647;
      return asciiSeed / 2147483647;
    }

    function esc(s: string) {
      return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function imageToAscii(img: HTMLImageElement, cols: number) {
      asciiSeed = 42;
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d");
      if (!ctx) return { text: "", poolGrid: [] };
      const aspect = img.height / img.width;
      const rows = Math.round(cols * aspect);
      c.width = cols;
      c.height = rows;
      ctx.drawImage(img, 0, 0, cols, rows);
      const data = ctx.getImageData(0, 0, cols, rows).data;
      const lines: string[] = [];
      const poolGrid: number[][] = [];

      for (let y = 0; y < rows; y++) {
        let line = "";
        const poolRow: number[] = [];
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          if (a < 15) {
            line += " ";
            poolRow.push(-1);
            continue;
          }
          let brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          brightness *= a / 255;
          let pi = Math.floor(brightness * (ASCII_POOLS.length - 1) * 0.8);
          pi = Math.min(pi, ASCII_POOLS.length - 1);
          const pool = ASCII_POOLS[pi];
          line += pool[Math.floor(asciiRand() * pool.length)];
          poolRow.push(pi);
        }
        lines.push(line);
        poolGrid.push(poolRow);
      }
      return { text: lines.join("\n"), poolGrid };
    }

    let asciiHoverRaf = 0;
    function setupAsciiHover(preEl: HTMLElement, poolGrid: number[][]) {
      let origLines: string[] | null = null;
      let origGrid: string[][] | null = null;
      let mxC = -1000;
      let myC = -1000;
      const radius = 2.5;
      const cols = poolGrid[0] ? poolGrid[0].length : 1;
      const rows = poolGrid.length;
      const noise: number[][] = [];
      const hitTime: number[][] = [];
      const cellDuration: number[][] = [];
      let animating = false;

      for (let ny = 0; ny < rows; ny++) {
        const nr: number[] = [];
        const ht: number[] = [];
        const cd: number[] = [];
        for (let nx = 0; nx < cols; nx++) {
          const h = (Math.sin(nx * 12.9898 + ny * 78.233) * 43758.5453 % 1 + 1) % 1;
          nr.push(h * 5 - 2.5);
          ht.push(0);
          cd.push(h > 0.5 ? 200 : 100);
        }
        noise.push(nr);
        hitTime.push(ht);
        cellDuration.push(cd);
      }

      function initOrig() {
        origLines = (preEl.textContent || "").split("\n");
        origGrid = origLines.map((l) => l.split(""));
      }

      function tick() {
        const now = performance.now();
        let anyActive = false;
        let html = "";
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const pi = poolGrid[y] ? poolGrid[y][x] : -1;
            if (pi <= 0) {
              html += " ";
              continue;
            }
            const elapsed = now - (hitTime[y] ? hitTime[y][x] : 0);
            if (hitTime[y] && hitTime[y][x] > 0 && elapsed < (cellDuration[y] ? cellDuration[y][x] : 150)) {
              anyActive = true;
              const idx = ASCII_POOLS.length - 1 - pi;
              const pool = ASCII_POOLS[Math.max(0, idx)];
              const ch = pool[Math.floor(Math.random() * pool.length)];
              html += `<span style="color:#0a0a0a;background:#ff3b14">${esc(ch)}</span>`;
            } else {
              html += esc(origGrid && origGrid[y] ? origGrid[y][x] : " ");
            }
          }
          html += "\n";
        }
        preEl.innerHTML = html;
        if (anyActive) {
          asciiHoverRaf = requestAnimationFrame(tick);
        } else {
          animating = false;
          if (origLines) preEl.textContent = origLines.join("\n");
        }
      }

      preEl.addEventListener("mousemove", (e) => {
        if (!origGrid) initOrig();
        const rect = preEl.getBoundingClientRect();
        const charW = rect.width / cols;
        const charH = rect.height / rows;
        mxC = (e.clientX - rect.left) / charW;
        myC = (e.clientY - rect.top) / charH;

        const now = performance.now();
        const maxR = radius + 3;
        const yMin = Math.max(0, Math.floor(myC - maxR));
        const yMax = Math.min(rows - 1, Math.ceil(myC + maxR));
        const xMin = Math.max(0, Math.floor(mxC - maxR));
        const xMax = Math.min(cols - 1, Math.ceil(mxC + maxR));

        for (let y = yMin; y <= yMax; y++) {
          for (let x = xMin; x <= xMax; x++) {
            const dx = x - mxC;
            const dy = y - myC;
            const rN = radius + (noise[y] ? noise[y][x] : 0);
            if (dx * dx + dy * dy < rN * rN && poolGrid[y] && poolGrid[y][x] >= 0) {
              if (hitTime[y]) hitTime[y][x] = now;
            }
          }
        }
        if (!animating) {
          animating = true;
          tick();
        }
      });

      preEl.addEventListener("mouseleave", () => {
        mxC = -1000;
        myC = -1000;
      });
    }

    function loadAndRenderAscii(src: string, targetId: string, cols: number) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const el = document.getElementById(targetId);
        if (el) {
          const res = imageToAscii(img, cols);
          el.textContent = res.text;
          setupAsciiHover(el, res.poolGrid);
        }
      };
      img.src = src;
    }

    loadAndRenderAscii("/footer/left.png", "ascii-left", 80);
    loadAndRenderAscii("/footer/right.png", "ascii-right", 80);

    const asciiLeftWrap = document.querySelector(".footer-ascii.left");
    const asciiRightWrap = document.querySelector(".footer-ascii.right");
    if (asciiLeftWrap && asciiRightWrap) {
      gsap.fromTo(
        asciiLeftWrap,
        { xPercent: -100 },
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#footer-transition",
            start: "top bottom+=500",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
      gsap.fromTo(
        asciiRightWrap,
        { xPercent: 100 },
        {
          xPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#footer-transition",
            start: "top bottom+=500",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }

    // =========================================================================
    // 13. Scroll Timeline HUD & Percentage Indicator
    // =========================================================================
    const timeline = document.getElementById("scroll-timeline");
    const bar = document.getElementById("st-bar");
    const label = document.getElementById("st-label");
    const pctEl = document.getElementById("scroll-pct");

    const sections = [
      { id: "about", name: "About" },
      { id: "projects", name: "Projects" },
      { id: "circle-gallery", name: "Gallery" },
      { id: "skills", name: "Skills" },
      { id: "awards", name: "Awards" },
      { id: "contact", name: "Contact" },
    ].filter((sec) => {
      if (sec.id === "circle-gallery" && window.innerWidth <= 768) return false;
      return true;
    });

    if (bar && bar.children.length === 0) {
      sections.forEach((sec) => {
        const seg = document.createElement("div");
        seg.className = "st-seg";
        seg.style.flex = "1";
        seg.title = sec.name;
        const fill = document.createElement("div");
        fill.className = "st-seg-fill";
        seg.appendChild(fill);
        bar.appendChild(seg);

        seg.addEventListener("click", () => {
          const target = document.getElementById(sec.id);
          if (!target) return;
          if (scrollTo) scrollTo(target, { offset: 0, duration: 1.2 });
          else target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }

    const onScrollHUD = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const p = maxScroll > 0 ? scrollY / maxScroll : 0;
      const pct = Math.round(p * 100);

      if (pctEl) {
        pctEl.textContent = `(${pct})`;
        pctEl.style.opacity = scrollY > 200 ? "1" : "0";
      }

      if (timeline) {
        timeline.style.opacity = scrollY > 200 ? "1" : "0";
      }

      const focalY = scrollY + window.innerHeight * 0.45;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i].id);
        if (sec && sec.offsetTop <= focalY) {
          if (label) label.textContent = sections[i].name;
          break;
        }
      }
    };

    window.addEventListener("scroll", onScrollHUD, { passive: true });

    // Smooth Anchor Scroll Interception for in-page navigation links
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const el = document.getElementById(href.slice(1));
        if (el) {
          e.preventDefault();
          if (scrollTo) scrollTo(el, { offset: 0, duration: 1.2 });
          else el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    document.addEventListener("click", onAnchorClick);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onProjectsScroll);
      window.removeEventListener("scroll", onScrollHUD);
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onAnchorClick);
      cancelAnimationFrame(rafTilt);
      cancelAnimationFrame(heroRaf);
      cancelAnimationFrame(asciiHoverRaf);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [lenis, scrollTo]);

  return (
    <>
      {/* Intro Background & Preloader */}
      <div className="intro-bg" id="intro-bg" />

      <div className="name-layer" id="name-layer">
        <div className="preloader-content" id="preloader-content">
          <div id="preloader-logo">S</div>
          <span id="preloader-luke">arosh</span>
          <span id="preloader-baffait">Kumar</span>
          <span id="preloader-dot">.</span>
        </div>
      </div>

      <div className="transition-panel" id="transition-panel">
        <div className="t-panel-dark" id="t-panel-dark" />
        <div className="t-panel-red" id="t-panel-red" />
      </div>

      {/* Main Scroll Wrap: Hero Section with Canvas Scrubbing */}
      <div className="scroll-wrap" id="scroll-wrap">
        <section className="hero" id="hero">
          <h1 className="sr-only">
            Sarosh Kumar — AI Systems Engineer, deep learning, audio AI, and low-latency backends.
          </h1>
          <canvas className="hero-canvas" id="hero-canvas" />

          <div className="hero-content">
            <div className="hero-tagline" id="hero-tagline">
              Computer Science undergrad, <span className="other-accent">architecting neural systems</span>,<br />
              between deep learning, audio AI, and low-latency streaming inference pipelines.
            </div>

            <div className="hero-line" id="hero-line" />
            <div className="hero-bar" id="hero-bar">
              <div className="hero-bar-left">
                <span className="chr-hover" data-chr="🡺V3.0" />
              </div>
              <nav className="hero-bar-center" aria-label="Socials">
                <a
                  className="chr-hover"
                  data-chr="GitHub"
                  href={PORTFOLIO_DATA.personal.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                />
                <span className="sep">/</span>
                <a
                  className="chr-hover"
                  data-chr="LinkedIn"
                  href={PORTFOLIO_DATA.personal.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                />
                <span className="sep">/</span>
                <a
                  className="chr-hover"
                  data-chr="HuggingFace"
                  href={PORTFOLIO_DATA.personal.links.huggingface}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </nav>
              <nav className="hero-bar-right" aria-label="Main Navigation">
                <a className="chr-hover" data-chr="Work" href="#projects" />
                <a className="chr-hover" data-chr="Info" href="#about" />
                <a className="chr-hover" data-chr="Contact" href="#contact" />
                <a
                  className="chr-hover"
                  data-chr="Resume"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </nav>
            </div>
          </div>
        </section>
      </div>

      {/* Pinned Image Scrubber Frame with Corner Brackets & Blur Phrase */}
      <div className="reveal-image-wrap" id="reveal-image-wrap">
        <canvas className="reveal-image reveal-seq" id="reveal-canvas" />
        <div className="reveal-frame reveal-seq">
          <span className="reveal-corner tl" />
          <span className="reveal-corner tr" />
          <span className="reveal-corner bl" />
          <span className="reveal-corner br" />
        </div>
        <div className="reveal-overlay" id="reveal-overlay" />
        <p className="reveal-phrase" id="reveal-phrase">
          Basically, I train neural models and build fast backends.
        </p>
      </div>

      {/* Section After: About & Projects */}
      <section className="section-after" id="section-after">
        {/* About */}
        <div className="about" id="about">
          <div className="about-text" id="about-text">
            As an <span className="other-accent">AI systems engineer</span>, I build production deep learning architectures and low-latency streaming inference pipelines, blending technical precision with <span className="other-accent">scientific discovery</span>.
          </div>
          <div className="about-sub" id="about-sub">
            My name is Sarosh. Computer Science undergrad at KLE Technological University (CGPA 8.06/10), Lead of the Data Science Club (500+ members), and open-source contributor across research organizations (BrainGlobe, ML-LAM, ML4SCI).
          </div>
          <div className="about-btn">
            <a className="chr-hover" data-chr="Skills" href="#skills" />
          </div>
          <div className="about-version">
            <svg style={{ width: "1.25em", height: "1.25em", verticalAlign: "-0.25em" }} viewBox="0 0 84 85" fill="currentColor">
              <path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z" />
            </svg>
            V3.0
          </div>
          <div className="about-photo-wrap" id="about-photo-wrap">
            <img
              className="about-photo"
              src="/sarosh.png"
              alt="Sarosh Kumar"
              width={2500}
              height={3001}
            />
          </div>
        </div>

        {/* Projects Section with Drawing S-Line & Fixed Preview Card */}
        <div className="projects" id="projects">
          <svg className="fluid-line-svg" id="fluid-line-svg" viewBox="0 0 1400 1400" preserveAspectRatio="xMidYMid slice">
            <path
              className="fluid-line"
              id="fluid-line"
              d="
                M -80,0
                C 300,-20  600,150  540,400
                C 490,650   0,655    300,1050
                C 600,1385 650,1250 850,1200
                C 1050,1150 1350,1250 1540,1300
              "
            />
          </svg>
          <div className="projects-inner">
            <div className="projects-list" id="projects-list">
              <div
                className="proj-item"
                data-id="voice-integrity"
                data-img="/About/img_00001.jpg"
                data-date="03 2026"
              >
                Voice Integrity
              </div>
              <div
                className="proj-item"
                data-id="exoterra"
                data-img="/About/img_00010.jpg"
                data-date="01 2026"
              >
                ExoTerra NASA Engine
              </div>
              <div
                className="proj-item"
                data-id="aqi-forecaster"
                data-img="/About/img_00020.jpg"
                data-date="11 2025"
              >
                Air Quality Forecasting
              </div>
              <div
                className="proj-item"
                data-id="brainglobe"
                data-img="/About/img_00030.jpg"
                data-date="08 2025"
              >
                BrainGlobe Initiative
              </div>
              <div
                className="proj-item"
                data-id="neural-lam"
                data-img="/About/img_00040.jpg"
                data-date="06 2025"
              >
                ML-LAM Weather Modeling
              </div>
              <div
                className="proj-item"
                data-id="deeplense"
                data-img="/About/img_00050.jpg"
                data-date="04 2025"
              >
                ML4SCI DeepLense
              </div>
            </div>

            {/* Project Preview Card — strictly bounded within .projects-inner */}
            <div className="proj-preview" id="proj-preview">
              <div className="proj-card" id="proj-card">
                <div className="proj-meta">
                  <span className="proj-date" id="proj-date">03 2026</span>
                  <span className="proj-label">Preview</span>
                </div>
                <img id="proj-cover" src="/About/img_00001.jpg" alt="Project Preview" width={1333} height={1000} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Circular Orbit Gallery with Slices */}
      <section className="circle-gallery" id="circle-gallery">
        <div className="circle-gallery-pin" id="circle-gallery-pin">
          <img className="cg-img" src="/Projects/img_00001.jpg" alt="Voice Integrity" width={3000} height={2250} />
          <img className="cg-img" src="/Projects/img_00010.jpg" alt="ExoTerra" width={4000} height={3000} />
          <img className="cg-img" src="/Projects/img_00020.jpg" alt="AQI Engine" width={3000} height={2250} />
          <img className="cg-img" src="/Projects/img_00030.jpg" alt="BrainGlobe" width={3000} height={2250} />
          <img className="cg-img" src="/Projects/img_00040.jpg" alt="ML-LAM" width={2667} height={2000} />
          <img className="cg-img" src="/Projects/img_00050.jpg" alt="ML4SCI" width={2667} height={2000} />
          <p className="cg-phrase" id="cg-phrase">
            Every project is an opportunity to <span className="other-accent">learn</span>, <span className="other-accent">experiment</span>, and push boundaries.
          </p>
        </div>
      </section>

      {/* Skills Section with Accordions */}
      <section className="skills" id="skills">
        <div className="skills-inner">
          <div className="skills-left">
            <div className="skills-subtitle">Compétences</div>
            <div className="skills-text">
              B.E. in Computer Science & Engineering at KLE Technological University (CGPA 8.06/10), specializing in deep learning, audio AI, and low-latency backend systems.
            </div>
            <div className="skills-separator" />
            <div>
              <a className="skills-contact chr-hover" data-chr="Contact me🞣" href="#contact" />
            </div>
            <div className="skills-arrow" id="skills-arrow">
              <svg style={{ width: "1.25em", height: "1.25em", verticalAlign: "-0.25em" }} viewBox="0 0 84 85" fill="currentColor">
                <path d="M11 38H54L37 21H51L73 43L51 65H37L54 48H11Z" />
              </svg>
            </div>
          </div>

          <div className="skills-right" id="skills-right">
            {SKILL_GROUPS.map((grp) => {
              const isOpen = openGroups.includes(grp.id);
              return (
                <div key={grp.id} className={`skill-group ${isOpen ? "open" : ""}`}>
                  <div className="skill-header" onClick={() => toggleGroup(grp.id)}>
                    <div className="skill-header-left">
                      <span className="skill-header-idx">{grp.idx} //</span>
                      <span className="skill-header-title">
                        {grp.title}
                        <span className="skill-header-count">[{String(grp.count).padStart(2, "0")}]</span>
                      </span>
                    </div>
                    <span className="skill-header-icon" />
                  </div>
                  <div className="skill-body">
                    <div className="skill-body-wrapper">
                      <div className="skill-flow-container">
                        {grp.rows.map((rowItems, rIdx) => {
                          const segItems = getSegmentItems(rowItems);
                          const isLeft = rIdx % 2 === 0;
                          const animClass =
                            rIdx === 2
                              ? "scroll-left-fast"
                              : isLeft
                              ? "scroll-left"
                              : "scroll-right";
                          return (
                            <div key={rIdx} className="skill-flow-row">
                              <div className={`skill-flow-track ${animClass}`}>
                                <div className="skill-flow-segment">
                                  {segItems.map((tech, i) => (
                                    <div key={`seg1-${i}`} className="skill-flow-pill">
                                      <span className="skill-pill-num">
                                        {String((i % rowItems.length) + 1).padStart(2, "0")}
                                      </span>
                                      <span className="skill-pill-sep">//</span>
                                      <span className="skill-pill-name">{tech}</span>
                                      <span className="skill-pill-dot" />
                                    </div>
                                  ))}
                                </div>
                                <div className="skill-flow-segment" aria-hidden="true">
                                  {segItems.map((tech, i) => (
                                    <div key={`seg2-${i}`} className="skill-flow-pill">
                                      <span className="skill-pill-num">
                                        {String((i % rowItems.length) + 1).padStart(2, "0")}
                                      </span>
                                      <span className="skill-pill-sep">//</span>
                                      <span className="skill-pill-name">{tech}</span>
                                      <span className="skill-pill-dot" />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Awards Section with Active Focal-Line Scanners */}
      <section className="awards" id="awards">
        <div className="awards-inner">
          <div className="skills-subtitle awards-title">Awards & Misc</div>
          <div className="awards-list" id="awards-list">
            <div className="award-item">
              <div className="award-org">HackTU 7.0</div>
              <div className="award-site">MLH / Thapar</div>
              <div className="award-prize">Top Finalist (out of 6,000+ teams)</div>
              <div className="award-date">2026</div>
            </div>
            <div className="award-item">
              <div className="award-org">HACK4SOC 3.0</div>
              <div className="award-site">RVCE Bengaluru</div>
              <div className="award-prize">4th Place Finalist</div>
              <div className="award-date">2025</div>
            </div>
            <div className="award-item">
              <div className="award-org">IGNITRIX</div>
              <div className="award-site">Agentic AI Hackathon</div>
              <div className="award-prize">Consolation Prize (Agent System)</div>
              <div className="award-date">2025</div>
            </div>
            <div className="award-item">
              <div className="award-org">Hack-Nocturne 2.0</div>
              <div className="award-site">SMVIT Bengaluru</div>
              <div className="award-prize">Premier Finalist</div>
              <div className="award-date">2025</div>
            </div>
            <div className="award-item">
              <div className="award-org">Anvil Hackathon</div>
              <div className="award-site">Scaler Bengaluru</div>
              <div className="award-prize">Premier Finalist</div>
              <div className="award-date">2025</div>
            </div>
            <div className="award-item">
              <div className="award-org">Data Science Club</div>
              <div className="award-site">KLE Tech Hubli</div>
              <div className="award-prize">Lead (500+ student community)</div>
              <div className="award-date">2024–Present</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section with Pinned Blob & Dual Framed Brackets */}
      <div className="contact-bg" id="contact-bg" />
      <div className="contact-blob-wrap" id="contact-blob-wrap">
        <div className="contact-blob" id="contact-blob" />
      </div>

      <section className="contact" id="contact">
        <div className="contact-pin" id="contact-pin">
          <div className="contact-title" id="contact-title">Contact</div>

          <div className="contact-dispo" id="contact-dispo">
            <p>
              Available for <span className="other-accent">AI Systems & Backend Engineering roles</span> starting 2026. Motivated to join innovative teams and contribute to high-impact systems.
            </p>
          </div>

          <div className="contact-frame" id="contact-frame">
            <img className="contact-frame-img" id="contact-frame-img" src="/art/Untitled2.png" alt="" />
            <span className="frame-corner tl" />
            <span className="frame-corner tr" />
            <span className="frame-corner bl" />
            <span className="frame-corner br" />
          </div>

          <div className="contact-dispo" id="contact-dispo-2">
            <p>
              Also open for <span className="other-accent">scientific ML research collaborations & open-source projects</span> worldwide.
            </p>
          </div>

          <div className="contact-frame" id="contact-frame-2">
            <img className="contact-frame-img" id="contact-frame-img-2" src="/art/Untitled1.png" alt="" />
            <span className="frame-corner tl" />
            <span className="frame-corner tr" />
            <span className="frame-corner bl" />
            <span className="frame-corner br" />
          </div>

          <div className="contact-bottom" id="contact-bottom">
            <nav className="contact-socials" id="contact-socials" aria-label="Socials">
              <a
                className="chr-hover"
                data-chr-contact="GitHub"
                href={PORTFOLIO_DATA.personal.links.github}
                target="_blank"
                rel="noopener noreferrer"
              />
              <a
                className="chr-hover"
                data-chr-contact="LinkedIn"
                href={PORTFOLIO_DATA.personal.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              />
              <a
                className="chr-hover"
                data-chr-contact="HuggingFace"
                href={PORTFOLIO_DATA.personal.links.huggingface}
                target="_blank"
                rel="noopener noreferrer"
              />
            </nav>
            <a className="contact-mail" id="contact-mail" href={`mailto:${PORTFOLIO_DATA.personal.email}`}>
              {PORTFOLIO_DATA.personal.email}
            </a>
          </div>
        </div>
      </section>

      {/* Parallax Footer Curtain */}
      <div className="footer-transition" id="footer-transition" />
      <footer className="footer" id="footer">
        <div className="footer-content" id="footer-content">
          <div className="footer-top">
            <div className="footer-top-col">
              <a
                className="chr-hover footer-mail"
                data-chr-footer={PORTFOLIO_DATA.personal.email}
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              />
              <span className="chr-hover footer-date" data-chr-footer="© 2026" />
            </div>
            <nav className="footer-top-col" aria-label="Socials">
              <a
                className="chr-hover"
                data-chr-footer="GitHub"
                href={PORTFOLIO_DATA.personal.links.github}
                target="_blank"
                rel="noopener noreferrer"
              />
              <a
                className="chr-hover"
                data-chr-footer="LinkedIn"
                href={PORTFOLIO_DATA.personal.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              />
              <a
                className="chr-hover"
                data-chr-footer="HuggingFace"
                href={PORTFOLIO_DATA.personal.links.huggingface}
                target="_blank"
                rel="noopener noreferrer"
              />
            </nav>
            <nav className="footer-top-col" aria-label="Page Nav">
              <a className="chr-hover" data-chr-footer="Work" href="#projects" />
              <a className="chr-hover" data-chr-footer="Info" href="#about" />
              <a className="chr-hover" data-chr-footer="Contact" href="#contact" />
              <a
                className="chr-hover"
                data-chr-footer="Resume"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              />
            </nav>
          </div>

          <div className="footer-ascii-wrap">
            <div className="footer-ascii left">
              <pre id="ascii-left" />
            </div>
            <div className="footer-ascii right">
              <pre id="ascii-right" />
            </div>
          </div>

          <div className="footer-name">
            <span className="footer-name-luke">
              <span className="first-letter">S</span>arosh
            </span>
            <span className="footer-name-baffait-wrap">
              <span className="footer-name-baffait">Kumar</span>
              <span className="footer-name-dot">.</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Floating Cursor Follower */}
      <div className="proj-cursor" id="proj-cursor">See project</div>

      {/* Project Detail Modal Overlay */}
      <div className="page-fade" id="page-fade" />
      <div className="flying-title" id="flying-title" />
      <div className="work-transition-overlay" id="work-transition-overlay" />
      <div className="work-flying-text" id="work-flying-text">Work</div>

      <section className="project-detail" id="project-detail">
        <div
          className="detail-back chr-hover"
          id="detail-back"
          data-chr="🡼RETOUR"
        >
          🡼 RETOUR
        </div>
        <div className="detail-info">
          <div className="detail-title-wrap" id="detail-title-wrap">
            <h1 className="detail-title" id="detail-title" />
            <span className="detail-year" id="detail-year" />
          </div>
          <p className="detail-desc" id="detail-desc" />
          <div className="detail-tags" id="detail-tags" />
          <a
            className="detail-visit chr-hover"
            id="detail-visit"
            target="_blank"
            rel="noopener noreferrer"
            data-chr="VISITER 🡲"
          >
            VISITER 🡲
          </a>
        </div>
        <div className="detail-gallery-wrap" id="detail-gallery-wrap">
          <div className="detail-thumbs" id="detail-thumbs">
            <div className="detail-thumbs-inner" id="detail-thumbs-inner" />
          </div>
          <div className="detail-selected" id="detail-selected" />
        </div>
      </section>

      {/* Fixed HUD Timeline & Scroll Percentage */}
      <div className="scroll-pct" id="scroll-pct">(0)</div>
      <div className="scroll-timeline" id="scroll-timeline">
        <span className="st-label" id="st-label" />
        <div className="st-bar" id="st-bar" />
      </div>
    </>
  );
}
