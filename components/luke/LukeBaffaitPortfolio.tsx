"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "@/components/ScrollProvider";
import { PORTFOLIO_DATA } from "@/lib/portfolio-data";

gsap.registerPlugin(ScrollTrigger);

// Project dossiers mapped to Luke Baffait's project detail modal schema
const PROJECTS_DATA: Record<
  string,
  {
    title: string;
    year: string;
    desc: string;
    tags: string[];
    link: string;
    cover: string;
  }
> = {
  "voice-integrity": {
    title: "Voice Integrity",
    year: "03 2026",
    desc: "Real-time deepfake voice detection engine. Engineered 7,000 Hz low-pass parity gate to eliminate resampler spectral bias. Ensembled LFCC-LCNN and WavLM Base+ logits via Platt scaling and EMA smoothing, achieving 91.5% zero-day recall at 1.7% false alarm rate across 25 unseen generators. Sub-250ms streaming FastAPI WebSocket pipeline with RMS Voice Activity Detection.",
    tags: ["PyTorch", "WavLM", "LFCC-LCNN", "FastAPI", "WebSockets", "Hugging Face"],
    link: "https://voicenow.vercel.app/",
    cover: "/About/img_00001.jpg",
  },
  "exoterra": {
    title: "ExoTerra",
    year: "01 2026",
    desc: "NASA exoplanet characterization and discovery engine. Ingested and cached 5,800+ confirmed exoplanets via NASA's TAP API with Chen & Kipping empirical mass-radius relations and Stefan-Boltzmann flux modeling. Implemented Kopparapu Habitable Zone polynomial boundaries and Earth Similarity Index. 3D PCA capturing 89.2% cosmological variance.",
    tags: ["Python", "Scikit-Learn", "NASA TAP API", "Streamlit", "NumPy", "Pandas"],
    link: "https://github.com/saroshkumar-ops/NASA-Exoplanet-Engine",
    cover: "/About/img_00010.jpg",
  },
  "aqi-forecaster": {
    title: "Air Quality Forecasting",
    year: "11 2025",
    desc: "Autoregressive 24-hour AQI predictive and heuristic source attribution engine using recursive XGBoost on 3-year OpenAQ data benchmarked against Prophet. Computes dynamic emission breakdown (Traffic, Industry, Construction) using PM10/PM2.5 ratios, chemical markers (NO2, SO2), and wind vectors.",
    tags: ["Python", "XGBoost", "Prophet", "FastAPI", "OpenAQ", "Groq API"],
    link: "https://github.com/saroshkumar-ops",
    cover: "/About/img_00020.jpg",
  },
  "brainglobe": {
    title: "BrainGlobe (cellfinder)",
    year: "08 2025",
    desc: "Core contribution to computational neuroscience initiative. Enhanced production 3D image processing and classification pipelines in Python/PyTorch, optimizing tensor operations and multi-dimensional array evaluation for high-throughput brain slice analysis.",
    tags: ["Python", "PyTorch", "Computer Vision", "Neuroscience"],
    link: "https://github.com/brainglobe/cellfinder",
    cover: "/About/img_00030.jpg",
  },
  "neural-lam": {
    title: "ML-LAM (neural-lam)",
    year: "06 2025",
    desc: "Graph neural weather prediction framework. Worked on Graph Neural Network (GNN) architectures, message-passing layers, and distributed training utilities in PyTorch for high-resolution limited-area atmospheric modeling.",
    tags: ["PyTorch", "GNNs", "PyG", "Weather AI"],
    link: "https://github.com/saroshkumar-ops",
    cover: "/About/img_00040.jpg",
  },
  "deeplense": {
    title: "ML4SCI (DeepLense)",
    year: "04 2025",
    desc: "Deep learning for gravitational lensing and dark matter detection. Modernized Apple Silicon MPS device detection, resolved micro-AUROC metric calculations in transformer classification pipelines, and modernized scheduler parameters.",
    tags: ["PyTorch", "Transformers", "MPS Acceleration", "Astrophysics"],
    link: "https://github.com/saroshkumar-ops",
    cover: "/About/img_00050.jpg",
  },
};

export default function LukeBaffaitPortfolio() {
  const { lenis } = useLenis();
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [openSkillsGroup, setOpenSkillsGroup] = useState<string>("dl");

  useEffect(() => {
    // 1. Build .chr-hover character split roll spans
    document.querySelectorAll(".chr-hover[data-chr]").forEach((el) => {
      const target = el as HTMLElement;
      if (target.querySelector(".ch-wrap")) return;
      const text = target.dataset.chr || "";
      target.innerHTML = "";
      [...text].forEach((ch, i) => {
        const wrap = document.createElement("span");
        wrap.className = "ch-wrap";
        wrap.style.setProperty("--i", String(i));

        const top = document.createElement("span");
        top.className = "ch-top";
        top.textContent = ch === " " ? "\u00A0" : ch;

        const bot = document.createElement("span");
        bot.className = "ch-bot";
        bot.textContent = ch === " " ? "\u00A0" : ch;

        wrap.appendChild(top);
        wrap.appendChild(bot);
        target.appendChild(wrap);
      });
    });

    // 2. Preloader & Name Layer Animation
    const preloaderLogo = document.getElementById("preloader-logo");
    const preloaderLuke = document.getElementById("preloader-luke");
    const preloaderBaffait = document.getElementById("preloader-baffait");
    const preloaderDot = document.getElementById("preloader-dot");
    const transitionPanelDark = document.getElementById("t-panel-dark");
    const transitionPanelRed = document.getElementById("t-panel-red");
    const introBg = document.getElementById("intro-bg");
    const nameLayer = document.getElementById("name-layer");
    const hero = document.getElementById("hero");
    const heroTagline = document.getElementById("hero-tagline");
    const heroBar = document.getElementById("hero-bar");

    const introTl = gsap.timeline({ delay: 0.1 });

    introTl
      .fromTo(
        preloaderLogo,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" }
      )
      .fromTo(
        [preloaderLuke, preloaderBaffait, preloaderDot],
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" },
        "-=0.2"
      )
      .to(
        transitionPanelDark,
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power3.inOut",
        },
        "+=0.4"
      )
      .to(
        transitionPanelRed,
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power3.inOut",
        },
        "-=0.75"
      )
      .to(
        introBg,
        { opacity: 0, pointerEvents: "none", duration: 0.3 },
        "-=0.5"
      )
      .to(
        nameLayer,
        { opacity: 0, pointerEvents: "none", duration: 0.4 },
        "-=0.5"
      )
      .to(
        hero,
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .to(
        [heroTagline, heroBar],
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.2"
      );

    // 3. Reveal Canvas Image Sequence Scrubbing
    const revealCanvas = document.getElementById("reveal-canvas") as HTMLCanvasElement | null;
    const revealWrap = document.getElementById("reveal-image-wrap");
    const revealPhrase = document.getElementById("reveal-phrase");
    const TOTAL_FRAMES = 200;
    const frames: HTMLImageElement[] = [];

    // Preload keyframes
    for (let i = 1; i <= TOTAL_FRAMES; i += 2) {
      const img = new Image();
      const padded = String(i).padStart(3, "0");
      img.src = `/Landing/ezgif-frame-${padded}.jpg`;
      frames[i] = img;
    }

    if (revealCanvas) {
      const ctx = revealCanvas.getContext("2d");

      const resizeCanvas = () => {
        if (!revealCanvas || !ctx) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = window.innerWidth;
        const h = window.innerHeight;
        revealCanvas.width = w * dpr;
        revealCanvas.height = h * dpr;
        revealCanvas.style.width = `${w}px`;
        revealCanvas.style.height = `${h}px`;
        ctx.scale(dpr, dpr);
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      const drawFrame = (index: number) => {
        if (!ctx || !revealCanvas) return;
        const w = window.innerWidth;
        const h = window.innerHeight;
        let img = frames[index];
        if (!img || !img.complete) {
          for (let d = 1; d < 20; d++) {
            if (frames[index - d]?.complete) {
              img = frames[index - d];
              break;
            }
            if (frames[index + d]?.complete) {
              img = frames[index + d];
              break;
            }
          }
        }
        if (img && img.complete && img.naturalWidth > 0) {
          const imgAspect = img.naturalWidth / img.naturalHeight;
          const screenAspect = w / h;
          let dw = w, dh = h, ox = 0, oy = 0;
          if (screenAspect > imgAspect) {
            dw = w;
            dh = w / imgAspect;
            oy = (h - dh) / 2;
          } else {
            dh = h;
            dw = h * imgAspect;
            ox = (w - dw) / 2;
          }
          ctx.drawImage(img, ox, oy, dw, dh);
        }
      };

      // ScrollTrigger for Hero sequence scrub
      ScrollTrigger.create({
        trigger: "#scroll-wrap",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          const frameIndex = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(p * (TOTAL_FRAMES - 1)) + 1));
          drawFrame(frameIndex);

          if (revealWrap) {
            if (p > 0.08 && p < 0.95) {
              revealWrap.style.opacity = "1";
              revealWrap.style.pointerEvents = "auto";
            } else {
              revealWrap.style.opacity = "0";
              revealWrap.style.pointerEvents = "none";
            }
          }

          if (revealPhrase) {
            const phraseP = Math.min(Math.max((p - 0.25) / 0.5, 0), 1);
            revealPhrase.style.opacity = String(phraseP);
            revealPhrase.style.transform = `translateY(${(1 - phraseP) * 30}px)`;
          }
        },
      });
    }

    // 4. About Photo Scroll Parallax
    const photoWrap = document.getElementById("about-photo-wrap");
    if (photoWrap) {
      gsap.fromTo(
        photoWrap,
        { y: -60 },
        {
          y: 60,
          scrollTrigger: {
            trigger: photoWrap,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    // 5. Projects Interactive Floating Preview Card
    const projItems = document.querySelectorAll(".proj-item");
    const projPreview = document.getElementById("proj-preview");
    const projCard = document.getElementById("proj-card");
    const projCover = document.getElementById("proj-cover") as HTMLImageElement | null;
    const projDate = document.getElementById("proj-date");
    const projCursor = document.getElementById("proj-cursor");

    let mouseX = 0, mouseY = 0, cardX = 0, cardY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (projCursor) {
        projCursor.style.left = `${mouseX}px`;
        projCursor.style.top = `${mouseY}px`;
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const lerpCard = () => {
      cardX += (mouseX - cardX) * 0.12;
      cardY += (mouseY - cardY) * 0.12;
      if (projPreview) {
        projPreview.style.transform = `translate3d(${cardX + 24}px, ${cardY - 120}px, 0)`;
      }
      requestAnimationFrame(lerpCard);
    };
    requestAnimationFrame(lerpCard);

    projItems.forEach((item) => {
      const el = item as HTMLElement;
      const imgUrl = el.dataset.img || "/About/img_00001.jpg";
      const dateText = el.dataset.date || "2026";

      // Dynamic Lenis lerp braking (tactile drag over projects from Luke Baffait)
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 45%",
        onEnter: () => {
          if (lenis && (lenis as any).options) (lenis as any).options.lerp = 0.04;
        },
        onLeave: () => {
          if (lenis && (lenis as any).options) (lenis as any).options.lerp = 0.06;
        },
        onEnterBack: () => {
          if (lenis && (lenis as any).options) (lenis as any).options.lerp = 0.04;
        },
        onLeaveBack: () => {
          if (lenis && (lenis as any).options) (lenis as any).options.lerp = 0.06;
        },
      });

      el.addEventListener("mouseenter", () => {
        if (projCover) projCover.src = imgUrl;
        if (projDate) projDate.textContent = dateText;
        if (projPreview) projPreview.classList.add("visible");
        if (projCursor) projCursor.classList.add("visible");
      });

      el.addEventListener("mouseleave", () => {
        if (projPreview) projPreview.classList.remove("visible");
        if (projCursor) projCursor.classList.remove("visible");
      });

      el.addEventListener("click", () => {
        const id = el.dataset.id;
        if (id) setActiveProject(id);
      });
    });

    // 6. Circle Gallery 3D Elliptical Orbit
    const cgPin = document.getElementById("circle-gallery-pin");
    const cgImgs = document.querySelectorAll(".cg-img");

    if (cgPin && cgImgs.length) {
      const rx = 420;
      const rz = 400;
      const tiltY = -25;
      const offX = 950;
      const entryAngle = Math.PI * 0.5;

      const getPos = (t: number) => {
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
      };

      const stagger = 0.11;
      const totalRange = 1 + (cgImgs.length - 1) * stagger;

      ScrollTrigger.create({
        trigger: "#circle-gallery",
        start: "top top",
        end: "bottom bottom",
        pin: "#circle-gallery-pin",
        onUpdate: (self) => {
          const progress = self.progress;
          cgImgs.forEach((img, i) => {
            const el = img as HTMLElement;
            const imgT = progress * totalRange - i * stagger;
            if (imgT <= 0 || imgT >= 1) {
              el.style.opacity = "0";
              return;
            }
            let alpha = 1;
            if (imgT < 0.08) alpha = imgT / 0.08;
            else if (imgT > 0.92) alpha = (1 - imgT) / 0.08;

            const pos = getPos(imgT);
            const rotDeg = ((pos.rotY * 180) / Math.PI).toFixed(1);

            el.style.opacity = String(alpha);
            el.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, ${pos.z.toFixed(1)}px) rotateY(${rotDeg}deg)`;
          });
        },
      });
    }

    // 7. Awards Focal-Line Highlight
    const awardItems = document.querySelectorAll(".award-item");
    awardItems.forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        start: "top center+=15%",
        end: "bottom center-=15%",
        toggleClass: { targets: item, className: "active-award" },
      });
    });

    // 8. Contact Section Pinned Blob Animation
    const contactSection = document.getElementById("contact");
    const contactBlob = document.getElementById("contact-blob");
    const contactBlobWrap = document.getElementById("contact-blob-wrap");
    const contactBg = document.getElementById("contact-bg");

    if (contactSection && contactBlob) {
      ScrollTrigger.create({
        trigger: "#contact",
        start: "top bottom",
        endTrigger: "#footer-transition",
        end: "bottom bottom",
        onEnter: () => {
          if (contactBlobWrap) contactBlobWrap.style.visibility = "visible";
          if (contactBg) contactBg.style.display = "block";
        },
        onLeave: () => {
          if (contactBlobWrap) contactBlobWrap.style.visibility = "hidden";
          if (contactBg) contactBg.style.display = "none";
        },
        onEnterBack: () => {
          if (contactBlobWrap) contactBlobWrap.style.visibility = "visible";
          if (contactBg) contactBg.style.display = "block";
        },
        onLeaveBack: () => {
          if (contactBlobWrap) contactBlobWrap.style.visibility = "hidden";
          if (contactBg) contactBg.style.display = "none";
        },
      });

      gsap.fromTo(
        contactBlob,
        { scale: 0.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: "#contact",
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }

    // 9. Parallax Footer Loop
    const footerEl = document.getElementById("footer");
    if (footerEl) {
      ScrollTrigger.create({
        trigger: "#footer-transition",
        start: "top bottom+=400",
        end: "bottom bottom",
        onEnter: () => {
          footerEl.style.visibility = "visible";
        },
        onLeaveBack: () => {
          footerEl.style.visibility = "hidden";
        },
      });
    }

    // 10. Scroll Percentage & Timeline HUD Tracker
    const pctEl = document.getElementById("scroll-pct");
    const stLabel = document.getElementById("st-label");
    const stBar = document.getElementById("st-bar");

    const sections = [
      { id: "about", name: "About" },
      { id: "projects", name: "Projects" },
      { id: "circle-gallery", name: "Gallery" },
      { id: "skills", name: "Skills" },
      { id: "awards", name: "Awards" },
      { id: "contact", name: "Contact" },
    ];

    const updateHUD = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? Math.round((scrollY / maxScroll) * 100) : 0;
      if (pctEl) {
        pctEl.textContent = `(${pct})`;
        pctEl.style.opacity = scrollY > 200 ? "1" : "0";
      }

      const stTimeline = document.getElementById("scroll-timeline");
      if (stTimeline) {
        stTimeline.style.opacity = scrollY > 200 ? "1" : "0";
      }

      if (stBar) {
        stBar.style.transform = `scaleY(${pct / 100})`;
      }

      // Check current section
      const focalY = scrollY + window.innerHeight * 0.45;
      for (let i = sections.length - 1; i >= 0; i--) {
        const secEl = document.getElementById(sections[i].id);
        if (secEl && secEl.offsetTop <= focalY) {
          if (stLabel) stLabel.textContent = sections[i].name;
          break;
        }
      }
    };

    window.addEventListener("scroll", updateHUD, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", updateHUD);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [lenis]);

  return (
    <>
      {/* Intro Background & Preloader */}
      <div className="intro-bg" id="intro-bg" />

      <div className="name-layer" id="name-layer">
        <div className="preloader-content" id="preloader-content">
          <div id="preloader-logo">S</div>
          <span id="preloader-luke">arosh</span>
          <span id="preloader-baffait"> Kumar</span>
          <span id="preloader-dot">.</span>
        </div>
      </div>

      <div className="transition-panel" id="transition-panel">
        <div className="t-panel-dark" id="t-panel-dark" />
        <div className="t-panel-red" id="t-panel-red" />
      </div>

      {/* Main Scroll Wrap: Hero Section with Canvas Scrubbing */}
      <div className="scroll-wrap" id="scroll-wrap" style={{ height: "350vh" }}>
        <section className="hero" id="hero">
          <h1 className="sr-only">
            Sarosh Kumar — AI Systems Engineer, deep learning, audio AI, and low-latency backends.
          </h1>
          <canvas className="hero-canvas" id="hero-canvas" />

          <div className="hero-content">
            <div className="hero-tagline" id="hero-tagline">
              Computer Science undergrad, <span className="other-accent">architecting neural systems</span>,<br />
              between deep learning, audio AI, and low-latency backends.
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
            As an <span className="other-accent">AI systems engineer</span>, I build production deep learning architectures and low-latency streaming inference pipelines, blending technical rigor with <span className="other-accent">scientific discovery</span>.
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

        {/* Projects with Drawing S-Line & Floating Cursor Preview */}
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
                AQI Forecasting & Attribution
              </div>
              <div
                className="proj-item"
                data-id="brainglobe"
                data-img="/About/img_00030.jpg"
                data-date="08 2025"
              >
                BrainGlobe Initiative (cellfinder)
              </div>
              <div
                className="proj-item"
                data-id="neural-lam"
                data-img="/About/img_00040.jpg"
                data-date="06 2025"
              >
                ML-LAM (neural-lam GNNs)
              </div>
              <div
                className="proj-item"
                data-id="deeplense"
                data-img="/About/img_00050.jpg"
                data-date="04 2025"
              >
                ML4SCI (DeepLense Transformers)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pinned 3D Circular Orbit Gallery */}
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
            {/* Group 1: Deep Learning */}
            <div className={`skill-group ${openSkillsGroup === "dl" ? "open" : ""}`}>
              <div
                className="skill-header"
                onClick={() => setOpenSkillsGroup(openSkillsGroup === "dl" ? "" : "dl")}
              >
                <span className="skill-header-title">Deep Learning & Audio AI</span>
                <span className="skill-header-icon" />
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  <li>PyTorch</li>
                  <li>Torchaudio</li>
                  <li>Transformers</li>
                  <li>WavLM</li>
                  <li>LFCC-LCNN</li>
                  <li>librosa</li>
                  <li>Faster-Whisper</li>
                  <li>PyG (GNNs)</li>
                </ul>
              </div>
            </div>

            {/* Group 2: ML & Data */}
            <div className={`skill-group ${openSkillsGroup === "ml" ? "open" : ""}`}>
              <div
                className="skill-header"
                onClick={() => setOpenSkillsGroup(openSkillsGroup === "ml" ? "" : "ml")}
              >
                <span className="skill-header-title">Machine Learning & Data</span>
                <span className="skill-header-icon" />
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  <li>Scikit-Learn</li>
                  <li>XGBoost</li>
                  <li>Prophet</li>
                  <li>NumPy</li>
                  <li>Pandas</li>
                  <li>SciPy</li>
                  <li>Streamlit</li>
                  <li>Plotly</li>
                  <li>Parquet</li>
                </ul>
              </div>
            </div>

            {/* Group 3: Languages */}
            <div className={`skill-group ${openSkillsGroup === "lang" ? "open" : ""}`}>
              <div
                className="skill-header"
                onClick={() => setOpenSkillsGroup(openSkillsGroup === "lang" ? "" : "lang")}
              >
                <span className="skill-header-title">Languages</span>
                <span className="skill-header-icon" />
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  <li>Python</li>
                  <li>C++</li>
                  <li>Java</li>
                  <li>C</li>
                  <li>SQL</li>
                  <li>JavaScript</li>
                  <li>HTML/CSS</li>
                </ul>
              </div>
            </div>

            {/* Group 4: Systems & Tools */}
            <div className={`skill-group ${openSkillsGroup === "sys" ? "open" : ""}`}>
              <div
                className="skill-header"
                onClick={() => setOpenSkillsGroup(openSkillsGroup === "sys" ? "" : "sys")}
              >
                <span className="skill-header-title">Systems & Tools</span>
                <span className="skill-header-icon" />
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  <li>FastAPI</li>
                  <li>WebSockets</li>
                  <li>RESTful APIs</li>
                  <li>Docker</li>
                  <li>Linux</li>
                  <li>Git</li>
                  <li>GitHub</li>
                  <li>Groq API</li>
                  <li>PyAutoGUI</li>
                </ul>
              </div>
            </div>

            {/* Group 5: Core CS Fundamentals */}
            <div className={`skill-group ${openSkillsGroup === "cs" ? "open" : ""}`}>
              <div
                className="skill-header"
                onClick={() => setOpenSkillsGroup(openSkillsGroup === "cs" ? "" : "cs")}
              >
                <span className="skill-header-title">Core CS Fundamentals</span>
                <span className="skill-header-icon" />
              </div>
              <div className="skill-body">
                <ul className="skill-body-inner">
                  <li>Data Structures & Algorithms</li>
                  <li>Operating Systems</li>
                  <li>DBMS</li>
                  <li>Concurrency</li>
                  <li>System Design</li>
                </ul>
              </div>
            </div>
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

      {/* Contact Section with Pinned Blob & Framed Brackets */}
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
            <img className="contact-frame-img" id="contact-frame-img" src="/About/img_00010.jpg" alt="" />
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
            <img className="contact-frame-img" id="contact-frame-img-2" src="/About/img_00030.jpg" alt="" />
            <span className="frame-corner tl" />
            <span className="frame-corner tr" />
            <span className="frame-corner bl" />
            <span className="frame-corner br" />
          </div>

          <div className="contact-bottom" id="contact-bottom">
            <nav className="contact-socials" id="contact-socials" aria-label="Socials">
              <a
                className="chr-hover"
                data-chr="GitHub"
                href={PORTFOLIO_DATA.personal.links.github}
                target="_blank"
                rel="noopener noreferrer"
              />
              <a
                className="chr-hover"
                data-chr="LinkedIn"
                href={PORTFOLIO_DATA.personal.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              />
              <a
                className="chr-hover"
                data-chr="HuggingFace"
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
                data-chr={PORTFOLIO_DATA.personal.email}
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              />
              <span className="chr-hover footer-date" data-chr="© 2026" />
            </div>
            <nav className="footer-top-col" aria-label="Socials">
              <a
                className="chr-hover"
                data-chr="GitHub"
                href={PORTFOLIO_DATA.personal.links.github}
                target="_blank"
                rel="noopener noreferrer"
              />
              <a
                className="chr-hover"
                data-chr="LinkedIn"
                href={PORTFOLIO_DATA.personal.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              />
              <a
                className="chr-hover"
                data-chr="HuggingFace"
                href={PORTFOLIO_DATA.personal.links.huggingface}
                target="_blank"
                rel="noopener noreferrer"
              />
            </nav>
            <nav className="footer-top-col" aria-label="Page Nav">
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

      {/* Floating Hover Project Preview Card */}
      <div className="proj-preview" id="proj-preview">
        <div className="proj-card" id="proj-card">
          <div className="proj-meta">
            <span className="proj-date" id="proj-date">03 2026</span>
            <span className="proj-label">Preview</span>
          </div>
          <img id="proj-cover" src="/About/img_00001.jpg" alt="" width={1333} height={1000} />
        </div>
      </div>
      <div className="proj-cursor" id="proj-cursor">See project</div>

      {/* Project Detail Modal Overlay */}
      {activeProject && PROJECTS_DATA[activeProject] && (
        <section className="project-detail" id="project-detail" style={{ opacity: 1, pointerEvents: "auto" }}>
          <div
            className="detail-back chr-hover"
            id="detail-back"
            data-chr="🡼RETOUR"
            onClick={() => setActiveProject(null)}
          >
            🡼 RETOUR
          </div>
          <div className="detail-info">
            <div className="detail-title-wrap">
              <h1 className="detail-title">{PROJECTS_DATA[activeProject].title}</h1>
              <span className="detail-year">{PROJECTS_DATA[activeProject].year}</span>
            </div>
            <p className="detail-desc">{PROJECTS_DATA[activeProject].desc}</p>
            <div className="detail-tags">
              {PROJECTS_DATA[activeProject].tags.map((t) => (
                <span key={t} className="px-2 py-1 rounded bg-white/10 text-xs font-mono">
                  {t}
                </span>
              ))}
            </div>
            <a
              className="detail-visit chr-hover"
              href={PROJECTS_DATA[activeProject].link}
              target="_blank"
              rel="noopener noreferrer"
              data-chr="VISITER 🡲"
            >
              VISITER 🡲
            </a>
          </div>
        </section>
      )}

      {/* Fixed HUD Timeline & Scroll Percentage */}
      <div className="scroll-pct" id="scroll-pct">(0)</div>
      <div className="scroll-timeline" id="scroll-timeline">
        <span className="st-label" id="st-label" />
        <div className="st-bar" id="st-bar" />
      </div>
    </>
  );
}
