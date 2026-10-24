export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  bulletPoints: string[];
  links: {
    live?: string;
    github?: string;
    huggingface?: string;
  };
  featured: boolean;
}

export interface OpenSourceContribution {
  organization: string;
  project: string;
  role: string;
  description: string;
  tags: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface HackathonAward {
  event: string;
  organizer: string;
  achievement: string;
  highlight?: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Sarosh Kumar",
    role: "AI Systems & Backend Engineer",
    headline: "Architecting Scientific ML, Deep Learning & Low-Latency Streaming Systems",
    bio: "Computer Science undergraduate (2024–2028) at KLE Technological University with hands-on experience in scientific machine learning, deep learning, audio AI, and low-latency backend systems. Proven track record in training and deploying neural architectures, streaming inference pipelines, and physics-informed discovery engines. Active open-source contributor across research organizations (BrainGlobe, ML-LAM, ML4SCI).",
    location: "Hubli, Karnataka, India",
    email: "saroshkumar00@gmail.com",
    phone: "+91-7619562240",
    links: {
      github: "https://github.com/saroshkumar-ops",
      linkedin: "https://www.linkedin.com/in/sarosh-kumar-132111297/",
      huggingface: "https://huggingface.co/sarosh22",
      portfolio: "https://saroshkumar.vercel.app/",
      resume: "/resume.pdf",
    },
    education: {
      institution: "KLE Technological University",
      location: "Hubli, India",
      degree: "B.E. in Computer Science & Engineering",
      timeline: "2024 — 2028",
      cgpa: "8.06 / 10",
    },
  },

  metrics: [
    { label: "Zero-Day Recall", value: "91.5%", note: "at 1.7% FAR across 25 unseen generators" },
    { label: "Exoplanets Modeled", value: "5,800+", note: "with Stefan-Boltzmann & Habitable Zone boundaries" },
    { label: "Pipeline Streaming", value: "< 250ms", note: "FastAPI WebSocket pipeline with RMS VAD" },
    { label: "Engineers Mentored", value: "500+", note: "as Lead of Data Science Club, KLE Tech" },
  ],

  projects: [
    {
      id: "voice-integrity",
      title: "Voice Integrity",
      subtitle: "Real-Time Deepfake Voice Detection Engine",
      description:
        "Open-sourced anti-spoofing models on Hugging Face (LFCC-LCNN & WavLM Base+), engineering a 7,000 Hz low-pass parity gate to eliminate resampler spectral bias. Ensembled spectral and transformer logits via Platt scaling and EMA smoothing, achieving 91.5% zero-day recall at 1.7% false alarm rate across 25 unseen generators. Built sub-250 ms streaming FastAPI WebSocket pipeline with RMS VAD.",
      tags: ["PyTorch", "WavLM", "LFCC-LCNN", "FastAPI", "WebSockets", "Hugging Face"],
      metrics: [
        { label: "Zero-Day Recall", value: "91.5%" },
        { label: "False Alarm Rate", value: "1.7%" },
        { label: "Latency", value: "< 250ms" },
        { label: "Low-Pass Gate", value: "7,000 Hz" },
      ],
      bulletPoints: [
        "Open-sourced anti-spoofing models on Hugging Face (LFCC-LCNN & WavLM Base+), engineering a 7,000 Hz low-pass parity gate to eliminate resampler spectral bias.",
        "Ensembled spectral and transformer logits via Platt scaling and EMA smoothing, achieving 91.5% zero-day recall at 1.7% false alarm rate across 25 unseen generators.",
        "Engineered sub-250 ms streaming FastAPI WebSocket pipeline with RMS Voice Activity Detection (VAD).",
      ],
      links: {
        live: "https://voicenow.vercel.app/",
        huggingface: "https://huggingface.co/sarosh22",
        github: "https://github.com/saroshkumar-ops",
      },
      featured: true,
    },
    {
      id: "exoterra",
      title: "ExoTerra",
      subtitle: "NASA Exoplanet Characterization & Discovery Engine",
      description:
        "Ingested and cached 5,800+ confirmed exoplanets via NASA's TAP API with Chen & Kipping empirical mass-radius relations and Stefan-Boltzmann flux modeling. Implemented Kopparapu Habitable Zone polynomial boundaries and Earth Similarity Index (ESI). Deployed an unsupervised ML suite: Silhouette-optimized K-Means (k=4), GMM boundary transition entropy, 3D PCA capturing 89.2% cosmological variance, and Isolation Forest detecting extreme celestial anomalies.",
      tags: ["Python", "Scikit-Learn", "NASA TAP API", "Streamlit", "NumPy", "Pandas"],
      metrics: [
        { label: "Planets Modeled", value: "5,800+" },
        { label: "Cosmological Variance", value: "89.2%" },
        { label: "Optimal Clusters", value: "k = 4" },
        { label: "Methodology", value: "Kopparapu HZ & ESI" },
      ],
      bulletPoints: [
        "Ingested and cached 5,800+ confirmed exoplanets via NASA's TAP API with Chen & Kipping empirical mass-radius relations and Stefan-Boltzmann flux modeling.",
        "Implemented Kopparapu Habitable Zone polynomial boundaries and Earth Similarity Index (ESI).",
        "Deployed an unsupervised ML suite: Silhouette-optimized K-Means (k=4), GMM boundary transition entropy, 3D PCA capturing 89.2% cosmological variance, and Isolation Forest celestial anomaly detection.",
      ],
      links: {
        github: "https://github.com/saroshkumar-ops/NASA-Exoplanet-Engine",
      },
      featured: true,
    },
    {
      id: "aqi-forecasting",
      title: "Air Quality Forecasting & Source Attribution",
      subtitle: "Autoregressive Predictive & Heuristic Attribution Engine",
      description:
        "Engineered an autoregressive 24-hour AQI forecasting pipeline using recursive XGBoost on 3-year OpenAQ data, benchmarked against Prophet and persistence baselines. Developed a heuristic attribution engine computing emission breakdown (Traffic, Industry, Construction) using PM10/PM2.5 ratios, chemical markers (NO₂, SO₂), and wind vectors with dynamic station retraining endpoints in FastAPI.",
      tags: ["Python", "XGBoost", "Prophet", "FastAPI", "OpenAQ", "Groq API"],
      metrics: [
        { label: "Forecast Horizon", value: "24 Hours" },
        { label: "Historical Data", value: "3 Years" },
        { label: "Attribution", value: "PM10/PM2.5 + NO₂/SO₂" },
        { label: "Retraining", value: "Dynamic Endpoints" },
      ],
      bulletPoints: [
        "Engineered an autoregressive 24-hour AQI forecasting pipeline using recursive XGBoost on 3-year OpenAQ data, benchmarked against Prophet and persistence baselines.",
        "Developed a heuristic attribution engine computing emission breakdown (Traffic, Industry, Construction) using PM10/PM2.5 ratios, chemical markers (NO₂, SO₂), and wind vectors.",
        "Built dynamic station retraining endpoints and fast inference APIs with FastAPI and Groq API.",
      ],
      links: {},
      featured: true,
    },
  ],

  openSource: [
    {
      organization: "BrainGlobe Initiative",
      project: "cellfinder",
      role: "Core Contributor",
      description:
        "Enhanced production 3D image processing and classification pipelines in Python/PyTorch, optimizing tensor operations and multi-dimensional array evaluation for computational neuroscience workflows.",
      tags: ["Python", "PyTorch", "Computer Vision", "Neuroscience"],
    },
    {
      organization: "ML-LAM Collaboration",
      project: "neural-lam",
      role: "Contributor",
      description:
        "Contributed to graph neural weather prediction framework, working with Graph Neural Network (GNN) architectures and training utilities in PyTorch.",
      tags: ["PyTorch", "GNNs", "PyG", "Weather AI"],
    },
    {
      organization: "ML4SCI",
      project: "DeepLense",
      role: "Contributor",
      description:
        "Modernized MPS device detection for Apple Silicon acceleration, resolved micro-AUROC metric issues in transformer classification pipelines, and cleaned deprecated scheduler parameters.",
      tags: ["PyTorch", "Transformers", "MPS / Apple Silicon", "Deep Learning"],
    },
  ],

  skillCategories: [
    {
      category: "Languages",
      skills: ["Python", "C++", "Java", "C", "SQL", "JavaScript", "HTML/CSS"],
    },
    {
      category: "Deep Learning & Audio AI",
      skills: [
        "PyTorch",
        "Torchaudio",
        "Transformers",
        "WavLM",
        "LCNN",
        "LFCC",
        "librosa",
        "Faster-Whisper",
        "PyG (GNNs)",
      ],
    },
    {
      category: "Machine Learning & Data",
      skills: [
        "Scikit-Learn",
        "XGBoost",
        "Prophet",
        "NumPy",
        "Pandas",
        "SciPy",
        "Streamlit",
        "Plotly",
        "Parquet",
      ],
    },
    {
      category: "Systems & Tools",
      skills: [
        "FastAPI",
        "WebSockets",
        "RESTful APIs",
        "Docker",
        "Linux",
        "Git",
        "GitHub",
        "Groq API",
        "PyAutoGUI",
      ],
    },
    {
      category: "Core CS Fundamentals",
      skills: [
        "Data Structures & Algorithms",
        "Operating Systems",
        "DBMS",
        "Concurrency",
        "System Design",
      ],
    },
  ],

  leadership: [
    {
      role: "Lead",
      organization: "Data Science Club, KLE Technological University",
      timeline: "2024 — Present",
      location: "Hubli, India",
      bullets: [
        "Spearheaded hands-on learning initiatives, technical workshops, and masterclasses in ML/data science, mentoring a community of 500+ students.",
        "Directed the planning and execution of club hackathons and tech talks, boosting cross-batch peer learning and engagement in emerging technologies.",
      ],
    },
  ],

  hackathons: [
    {
      event: "HackTU 7.0",
      organizer: "Thapar Institute / Major League Hacking (MLH)",
      achievement: "Top Finalist",
      highlight: "Top finalist out of 6,000+ competing teams across the nation",
    },
    {
      event: "HACK4SOC 3.0",
      organizer: "RVCE Bengaluru",
      achievement: "4th Place Finalist",
      highlight: "State-level inter-college hackathon competing on social innovation",
    },
    {
      event: "Hack-Nocturne 2.0",
      organizer: "SMVIT Bengaluru",
      achievement: "Top Finalist",
      highlight: "Overnight competitive hackathon",
    },
    {
      event: "Anvil Hackathon",
      organizer: "Scaler Bengaluru",
      achievement: "Top Finalist",
      highlight: "Industry-grade prototype evaluation",
    },
    {
      event: "IGNITRIX Agentic AI Hackathon",
      organizer: "IGNITRIX",
      achievement: "Consolation Prize",
      highlight: "Autonomous agentic system design and multi-agent coordination",
    },
    {
      event: "Word Whizzle",
      organizer: "KLE Technological University",
      achievement: "3rd Place",
      highlight: "Technical and linguistics competition",
    },
  ],
};
