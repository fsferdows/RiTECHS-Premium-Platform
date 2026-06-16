// types.ts

export interface UserState {
  isLoggedIn: boolean;
  role: "mentee" | "mentor" | "admin" | null;
  name: string | null;
  email: string | null;
}

export interface Manuscript {
  id: string;
  title: string;
  serviceType: string;
  fileSize: string;
  fileName: string;
  status: "Submitted" | "Assigned" | "In Editing" | "QA Review" | "Delivered";
  date: string;
  timeline: { title: string; date: string; done: boolean }[];
  author?: string;
}

export interface Mentor {
  id: number | string;
  name: string;
  type?: 'mentor' | 'mentee';
  role?: 'mentor' | 'mentee';
  title?: string;
  university: string;
  country: string;
  fields: string[];
  rating: number;
  image: string;
  email: string;
  bio: string;
  publications: string[];
  featured?: boolean;
}

export interface BlogPost {
  id: number | string;
  title: string;
  date: string;
  url?: string;
  thumbnail?: string;
  excerpt: string;
  
  // Previous keys for backward compatibility
  content?: string;
  category?: "Academic Craft" | "Cybersecurity" | "Renewable Energy" | "IoT Excellence" | string;
  author?: string;
  readTime?: string;
  image?: string;
  featured?: boolean;
}

export interface Conference {
  id?: string;
  name: string;
  full_name?: string;
  type?: 'upcoming' | 'past';
  format: string;
  url?: string;
  location: string;
  startDate?: string;
  endDate?: string;
  deadlines?: { label: string; date: string }[];
  general_chairs?: string[];
  keynote_speakers?: string[];

  // Previous keys for backward compatibility
  slug?: string;
  fullName?: string;
  year?: string;
  dates?: string;
  description?: string;
  tracks?: string[];
  importantDates?: {
    event: string;
    date: string;
    status: "past" | "upcoming" | "current";
  }[];
  speakers?: {
    name: string;
    role: string;
    affiliation: string;
    topic: string;
    image: string;
  }[];
  pricing?: {
    tier: string;
    price: string;
    benefits: string[];
    isFeatured?: boolean;
  }[];
  cfpPdfUrl?: string;
  uploadsFolderUrl?: string;
  logoUrl?: string;
}

export const INITIAL_CONFERENCES: Conference[] = [
  {
    slug: "icetcs",
    id: "icetcs",
    name: "ICETCS 2026",
    fullName: "3rd International Conference on Emerging Trends in Cybersecurity",
    full_name: "3rd International Conference on Emerging Trends in Cybersecurity",
    year: "2026",
    location: "University of Genoa, Italy",
    dates: "12-Oct-26 to 13-Oct-26",
    format: "Hybrid",
    cfpPdfUrl: "https://ritechs.org/uploads/1779448778.pdf",
    uploadsFolderUrl: "https://ritechs.org/uploads",
    description: "The primary objective of the International Conference on Emerging Trends in Cybersecurity (ICETCS 2026) is to provide a global platform for researchers, academicians, and industry professionals to discuss innovations, discuss cyber threats, and discover advanced security solutions.",
    tracks: [
      "Quantum-Resistant Cryptography & Public Key Frameworks",
      "Sovereign Cybersecurity & Public Key Architectures",
      "Machine Learning & Deep Learning for Real-Time Threat Hunting",
      "Hardware-Assisted Security Systems & IoT Edge Defenses"
    ],
    general_chairs: [
      "Prof. Dr. Arafatur Rahman",
      "Prof. Dr. Kim-Kwang Raymond Choo",
      "Prof. Fabio Patrone"
    ],
    keynote_speakers: [
      "Emma Fadlon",
      "Giulio Ferro",
      "Hendrik Wöhrle",
      "Imed Ben Dhaou",
      "Luigi Coppolino",
      "Mario Marchese",
      "Matteo Repetto",
      "Paul Wooderson"
    ],
    importantDates: [
      { event: "Paper Submission Deadline", date: "31-Jul-26", status: "current" },
      { event: "Completion of first review round", date: "31-Aug-26", status: "upcoming" },
      { event: "Deadline of revised manuscripts", date: "17-Sep-26", status: "upcoming" },
      { event: "Author Registration Deadline", date: "01-Oct-26", status: "upcoming" },
      { event: "Date of Conference", date: "12-Oct-26 to 13-Oct-26", status: "upcoming" }
    ],
    speakers: [
      {
        name: "Luigi Coppolino",
        role: "Keynote Speaker",
        affiliation: "University of Naples Parthenope",
        topic: "Behavioral Intrusion Signatures inside Industrial Kubernetes Clusters",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Emma Fadlon",
        role: "Keynote Speaker",
        affiliation: "Wolverhampton Cryptographic Corp",
        topic: "Securing Decentralized Smart Grids with Post-Quantum Keys",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
      }
    ],
    pricing: [
      {
        tier: "IEEE/ACM Student",
        price: "€290",
        benefits: ["Hybrid presentation slot", "SOP electronic book of abstracts", "IEEE CoMSoC registration rates", "Mentorship pairing session"]
      },
      {
        tier: "Standard Academic",
        price: "€480",
        benefits: ["Full paper publication fee included", "Wolverhampton / Genoa gala reception ticket", "Official physical book of abstracts", "Certificate of Presentation"],
        isFeatured: true
      },
      {
        tier: "Corporate Delegate",
        price: "€650",
        benefits: ["Venture Capital networking table", "Access to recordings & full slides", "Brochure presentation insert", "Gala dinner pass"]
      }
    ]
  },
  {
    slug: "itss-ioe",
    id: "itss-ioe",
    name: "ITSS-IoE 2026",
    fullName: "International Conference on Intelligent Technology, System and Service for Internet of Everything",
    full_name: "International Conference on Intelligent Technology, System and Service for Internet of Everything",
    year: "2026",
    location: "Babcock University, Nigeria",
    dates: "27-Oct-26 to 28-Oct-26",
    format: "Hybrid",
    description: "International Conference on Intelligent Technology, System and Service for Internet of Everything (ITSS-IoE 2026) aims to promote worldwide research work, innovative technologies, and state-of-the-art developments across all disciplines connected by the Internet of Everything.",
    tracks: [
      "Decentralized IoT Ledger Storage & Peer-to-Peer Consensus",
      "Smart-Grid Load Prediction with Low-Resource Tiny-ML",
      "Piezo-Electric Energy Gathering & Low-Power Embedded Systems",
      "Agri-Telemetry Protocols & Ubiquitous Remote Environments"
    ],
    general_chairs: [
      "Prof. Dr. Arafatur Rahman",
      "Prof. AJAEGBU"
    ],
    keynote_speakers: [
      "Dr. Zakirul Alam Bhuiyan",
      "Prof. Dr Md Arafatur Rahman",
      "Prof. Dr. Mohammed Atiquzzaman"
    ],
    importantDates: [
      { event: "Paper Submission Deadline", date: "31-Jul-26", status: "current" },
      { event: "Completion of first review round", date: "31-Aug-26", status: "upcoming" },
      { event: "Deadline of revised manuscripts", date: "17-Sep-26", status: "upcoming" },
      { event: "Author and Participant Registration Deadline", date: "01-Oct-26", status: "upcoming" },
      { event: "Date of Conference", date: "27-Oct-26 to 28-Oct-26", status: "upcoming" }
    ],
    speakers: [
      {
        name: "Prof. Dr. Mohammed Atiquzzaman",
        role: "Keynote Speaker",
        affiliation: "University of Oklahoma, USA",
        topic: "Bridging the Digital Divide via Satellite Edge-IoT Backhaul Protocols",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Dr. Zakirul Alam Bhuiyan",
        role: "Keynote Speaker",
        affiliation: "Fordham University, New York, USA",
        topic: "Resilient Smart Cities and Secure Ubiquitous Heterogeneous Networks",
        image: "https://images.unsplash.com/photo-1543132220-4bf3de6e10ae?auto=format&fit=crop&q=80&w=400"
      }
    ],
    pricing: [
      {
        tier: "African Scholar Rate",
        price: "$180",
        benefits: ["Reduced localized tariff", "Virtual presentation slot", "E-certificate of publication", "Q1 Editorial workspace access"]
      },
      {
        tier: "Standard Academic Hub",
        price: "$340",
        benefits: ["Hybrid presentation slot", "Official Babcock gala ticket", "Hardcopy proceedings booklet", "Review index mapping"],
        isFeatured: true
      },
      {
        tier: "Corporate Observer",
        price: "$520",
        benefits: ["Specialist B2B session access", "Keynotes & recorded panels access", "Corporate branding listing"]
      }
    ]
  },
  {
    slug: "aiot-rse",
    id: "aiot-rse",
    name: "AIoT-RSE 2026",
    fullName: "International Conference on AI-IoT Technologies for Renewable & Sustainable Energy",
    full_name: "International Conference on AI-IoT Technologies for Renewable & Sustainable Energy",
    year: "2026",
    location: "University of Genoa, Italy",
    dates: "12-Oct-26 to 13-Oct-26",
    format: "Hybrid",
    description: "The objective of the International Conference on AI–IoT Technologies for Renewable and Sustainable Energy (AIoT-RSE 2026) is to bring together researchers, industry experts, and academics to explore breakthroughs in physics-informed neural calculations, smart storage, and decarbonized grids.",
    tracks: [
      "AI Predictive Grids for Solar and Wind Battery Storages",
      "Decarbonized Industrial Manufacturing using IoT Auditing Labs",
      "Micro-Grid Load Balancing with Generative Smart Agents",
      "Battery Life Cycle Diagnostics, Analytics, and Smart Predictions"
    ],
    general_chairs: [
      "Dr. Arafatur Rahman",
      "Dr. Abu Yousuf",
      "Prof. Dr. Mohammed Atiquzzaman"
    ],
    keynote_speakers: [
      "Prof. Dr Md Arafatur Rahman",
      "Prof. Dr. Anurag Srivastava",
      "Prof. Dr. Thiago Jesus",
      "Professor Rajan Jose"
    ],
    importantDates: [
      { event: "Paper Submission Deadline", date: "31-Jul-26", status: "current" },
      { event: "Completion of first review round", date: "31-Aug-26", status: "upcoming" },
      { event: "Deadline of revised manuscripts", date: "17-Sep-26", status: "upcoming" },
      { event: "Author Registration Deadline", date: "01-Oct-26", status: "upcoming" },
      { event: "Date of Conference", date: "12-Oct-26 to 13-Oct-26", status: "upcoming" }
    ],
    speakers: [
      {
        name: "Prof. Dr. Anurag Srivastava",
        role: "Keynote Expert",
        affiliation: "West Virginia University, USA",
        topic: "Spatio-Temporal Synchrophasor Modeling with Edge Neural Grids",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "Professor Rajan Jose",
        role: "Keynote Speaker",
        affiliation: "Universiti Malaysia Pahang, Malaysia",
        topic: "Physics-Informed LSTM Networks for Hybrid Solid-State Electrolytes",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
      }
    ],
    pricing: [
      {
        tier: "Student Delegate",
        price: "£220",
        benefits: ["Hybrid session attendance", "Electronic proceedings link", "Abstract peer feedback summary"]
      },
      {
        tier: "Standard Academic",
        price: "£390",
        benefits: ["Speech / Poster talk booking", "Gala reception lunch entry", "Inclusion in book of abstracts", "Sovereign platform credential benefits"],
        isFeatured: true
      },
      {
        tier: "Venture Partner Pass",
        price: "£600",
        benefits: ["Private venture networking", "Premium dinner & panel access", "Interactive platform expo table"]
      }
    ]
  },
  {
    slug: "itss-ioe-2025",
    id: "itss-ioe-2025",
    name: "ITSS-IoE 2025",
    fullName: "International Conference on Intelligent Technology, System and Service for Internet of Everything",
    full_name: "International Conference on Intelligent Technology, System and Service for Internet of Everything",
    year: "2025",
    location: "Science Park, Wolverhampton",
    dates: "27-Oct-25 to 28-Oct-25",
    format: "Hybrid",
    description: "International Conference on Intelligent Technology, System and Service for Internet of Everything (ITSS-IoE 2025) aims to promote worldwide research work, innovative technologies, and state-of-the-art system implementations.",
    tracks: [
      "Securing High-Fidelity Kubernetes Slicing Models",
      "5G Spectrum Allocation under Distributed Local Nodes"
    ],
    general_chairs: [
      "Dr. Arafatur Rahman",
      "Md Zakirul Alam Bhuiyan"
    ],
    keynote_speakers: [
      "Prof. Dr Md Arafatur Rahman",
      "Prof. Dr. Mohammed Atiquzzaman",
      "Dr. Vasilis Katos"
    ],
    importantDates: [
      { event: "Full Length Paper Submission", date: "31-Jul-25", status: "past" },
      { event: "Author Notification", date: "15-Sep-25", status: "past" },
      { event: "Revised Submission Deadline", date: "15-Sep-25", status: "past" },
      { event: "Author Registration Deadline", date: "17-Oct-25", status: "past" },
      { event: "Date of Conference", date: "27-Oct-25 to 28-Oct-25", status: "past" }
    ],
    speakers: [
      {
        name: "Prof. Dr Md Arafatur Rahman",
        role: "Keynote Speaker",
        affiliation: "University of Wolverhampton",
        topic: "Pervasive Small-Satellite Backhaul Modulation inside Ultra-Low Power Grids",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
      }
    ],
    pricing: [
      {
        tier: "Archived Record",
        price: "Completed",
        benefits: ["Archived digital index available in Springer LNCS"]
      }
    ]
  },
  {
    slug: "icetcs-2025",
    id: "icetcs-2025",
    name: "ICETCS 2025",
    fullName: "Proceeding of International Conference on Emerging Trends in Cybersecurity",
    full_name: "Proceeding of International Conference on Emerging Trends in Cybersecurity",
    year: "2025",
    location: "Science Park, Wolverhampton",
    dates: "27-Oct-25 to 28-Oct-25",
    format: "Hybrid",
    description: "The primary objective of the International Conference on Emerging Trends in Cybersecurity (ICETCS 2025) is to provide a global platform for researchers, academicians, and industry specialists to publish proceedings and present quantum cryptographic studies.",
    tracks: [
      "Zero-Trust Edge Networks & Container Isolation",
      "Quantum Cryptographic Schemes on Resource-Constrained Devices"
    ],
    general_chairs: [
      "Prof. Dr. Kim-Kwang Raymond Choo",
      "Dr. Arafatur Rahman"
    ],
    keynote_speakers: [
      "Dr. Houbing Herbert Song, IEEE Fellow",
      "Dr. Steven Furnell",
      "Dr. Zakirul Alam Bhuiyan",
      "Dr Ihsan Ullah"
    ],
    importantDates: [
      { event: "Paper Submission Deadline", date: "31-Jul-25", status: "past" },
      { event: "Completion of first review round", date: "15-Sep-25", status: "past" },
      { event: "Deadline of revised manuscripts", date: "17-Sep-25", status: "past" },
      { event: "Author Registration Deadline", date: "17-Oct-25", status: "past" },
      { event: "Date of Conference", date: "27-Oct-25 to 28-Oct-25", status: "past" }
    ],
    speakers: [
      {
        name: "Dr. Zakirul Alam Bhuiyan",
        role: "Keynote Speaker",
        affiliation: "Fordham University",
        topic: "Real-world Intrusion Models on Industrial Modbus Networks",
        image: "https://images.unsplash.com/photo-1543132220-4bf3de6e10ae?auto=format&fit=crop&q=80&w=400"
      }
    ],
    pricing: [
      {
        tier: "Archived Record",
        price: "Completed",
        benefits: ["Fully indexed in IEEE Xplore database"]
      }
    ]
  }
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "b1",
    title: "Mastering Quantitative Data Analysis: Essential Tools and Methods",
    excerpt: "A comprehensive guide on leveraging Python, R, and SPSS to build statistically robust models that survive rigorous peer critique inside Q1 venues.",
    content: `Academic data analysis requires mathematical precision and thorough structural transparency. Peer reviewers in high-tier Q1 venues frequently single out flawed quantitative structures. Here is our direct, step-by-step strategy to align physical testing or virtual simulations with publication standards:\n\n1. **Verify Your Sample Integrity**: Every statistical inference depends heavily on proper sizing and sampling distribution. State clearly whether you utilized random sampling, stratified sampling, or convenience allocations, and mathematically justify your sample volume using a priori power analysis (e.g., G*Power models).\n\n2. **Conduct Rigorous Pre-processing**: Document all methodology stages regarding outlier removal, feature scaling, and normality testing (such as Kolmogorov-Smirnov or Shapiro-Wilk indexes).\n\n3. **Incorporate Effect Sizes beside P-Values**: Modern editors are moving away from sole reliance on arbitrary p-values. Always declare effect sizes (such as Cohen's d, Glass delta, or Pearson correlation margins) alongside standard ANOVA/ANOVA comparisons. This provides concrete evidence regarding the real-world significance of your technological or algorithmic intervention.`,
    category: "Academic Craft",
    author: "RiTECHS Scientific Board",
    date: "June 10, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800",
    featured: true
  },
  {
    id: "b2",
    title: "Reflections on ICETCS and the Cyber VehiCare Workshop",
    excerpt: "Summarizing the breakthrough insights on autonomous vehicle diagnostics, intrusion tolerances, and CAN bus sniffing defenses.",
    content: `Our recent workshop dedicated to autonomous vehicle networks highlighted critical physical and digital vulnerabilities in current automotive hardware standards.\n\n1. **CAN Bus Sniffing Defenses**: The Controller Area Network remains inherently vulnerable due to its legacy broadcast structure. Scholars presented light-weight message authentication codes (MACs) utilizing rolling cryptographic hashes that prevent sniffing with minor latency impact.\n\n2. **Physically-Informed Vehicle Diagnostics**: By combining physical mechanical equations with localized LSTM models, smart vehicles can detect brake degradation or motor failure before telemetry errors are triggered.`,
    category: "Cybersecurity",
    author: "Dr. Alistair J. Evans",
    date: "May 24, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "b3",
    title: "RiTECHS Seminar: How to Publish Review Papers in High-Impact Journals",
    excerpt: "A masterclass on structuring comprehensive literature taxonomies, avoiding catalog-style traps, and designing high-density synthesis diagrams.",
    content: `Review articles serve as critical landmarks for researchers. However, simply summarizing 50 papers is not enough to pass editorial reviews at major Elsevier or Springer journals. \n\nThis post structures the exact template used for high-impact review papers: mapping out Prisma flowcharts, organizing strict multi-dimensional classifications, and conducting detailed gap analysis studies.`,
    category: "Academic Craft",
    author: "Prof. Maria Santos & Editorial Team",
    date: "April 18, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "b4",
    title: "The Paradigm Shift to Quantum-Resistant Cryptographic Protocols",
    excerpt: "With national systems moving towards sovereign computing models, why cybersecurity scholars must accelerate transitions to hybrid PKIs.",
    content: `Quantum superiority demands action. Current RSA and ECC schemes are highly vulnerable to Shor's algorithm. \n\nThis post delves into NIST's selected standard algorithms—ML-KEM and ML-DSA. It maps experimental micro-controller integrations and hybrid transition paradigms. We evaluate performance benchmarks on resource-constrained microgrids, establishing that hybrid public key strategies provide sufficient current security with minor runtime overhead.`,
    category: "Cybersecurity",
    author: "Prof. Kenneth Sterling",
    date: "March 12, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
  }
];

export const INITIAL_MANUSCRIPTS: Manuscript[] = [
  {
    id: "manuscript-01",
    title: "A Sovereign Zero-Trust Framework for Post-Quantum Fog Networks",
    serviceType: "Premium Academic Editing & Language Polishing",
    fileSize: "14.2 MB",
    fileName: "zero_trust_pq_fog_v3.pdf",
    status: "In Editing",
    date: "June 14, 2026",
    timeline: [
      { title: "Submitted", date: "June 12, 2026", done: true },
      { title: "Assigned to Editor (Dr. Evans)", date: "June 13, 2026", done: true },
      { title: "In Editing", date: "June 14, 2026", done: true },
      { title: "QA Peer Review Review", date: "June 16, 2026", done: false },
      { title: "Delivered to Scholar", date: "June 18, 2026", done: false }
    ],
    author: "Prof. Kenneth Sterling"
  },
  {
    id: "manuscript-02",
    title: "LSTM-based Photovoltaic Power Estimation on Low-Resource Fog Nodes",
    serviceType: "Pre-Peer Review Formatting & Scope Assessment",
    fileSize: "8.6 MB",
    fileName: "photovoltaic_lstm_draft.docx",
    status: "Delivered",
    date: "June 05, 2026",
    timeline: [
      { title: "Submitted", date: "June 01, 2026", done: true },
      { title: "Assigned to Editor", date: "June 02, 2026", done: true },
      { title: "In Editing", date: "June 03, 2026", done: true },
      { title: "QA Peer Review Review", date: "June 04, 2026", done: true },
      { title: "Delivered to Scholar", date: "June 05, 2026", done: true }
    ],
    author: "Dr. LUHUR BAYUAJI"
  }
];

export interface Author {
  id: string;
  name: string;
  image: string;
  credentials: string;
  bio: string;
  publishedWorks: { title: string; url?: string }[];
  links: { label: string; url: string }[];
}

export const INITIAL_AUTHORS: Author[] = [
  {
    id: "alistair-evans",
    name: "Dr. Alistair J. Evans",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format,compress&fit=crop&q=70&w=280",
    credentials: "Ph.D. in Cybernetic Autonomy, University of Wolverhampton",
    bio: "Dr. Alistair J. Evans is a leading expert in secure Controller Area Networks (CAN) and vehicular telematics security. He advises numerous international automotive consortiums.",
    publishedWorks: [
      { title: "Defending Controller Area Networks against Frame-Injections (IEEE Transactions on Intelligence 2024)" },
      { title: "Anomaly Detections in High-Mobility Vehicular Units (Springer Lecture Notes 2025)" }
    ],
    links: [
      { label: "ORCID", url: "https://orcid.org" },
      { label: "Google Scholar", url: "https://scholar.google.com" }
    ]
  },
  {
    id: "kenneth-sterling",
    name: "Prof. Kenneth Sterling",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format,compress&fit=crop&q=70&w=280",
    credentials: "Ph.D. in Mathematical Cryptology, University of Oxford",
    bio: "Prof. Kenneth Sterling acts as the Chair for sovereign cryptology research. He advises governments on transitioning computing systems to secure post-quantum architectures.",
    publishedWorks: [
      { title: "A Sovereign Zero-Trust Framework for Post-Quantum Fog Networks (Q1 Journal of Cybersecurity 2026)" },
      { title: "NIST's Selected Standard Algorithms: A Comparative Power Study on Microcontrollers (IEEE Security 2025)" }
    ],
    links: [
      { label: "ResearchGate", url: "https://researchgate.net" },
      { label: "Google Scholar", url: "https://scholar.google.com" }
    ]
  },
  {
    id: "luhur-bayuaji",
    name: "Dr. LUHUR BAYUAJI",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format,compress&fit=crop&q=70&w=280",
    credentials: "Ph.D. in Embedded Systems, Universiti Malaysia Pahang",
    bio: "Dr. Luhur Bayuaji conducts cutting-edge research in TinyML neural simulations and power load-prediction. His research optimizes clean energy grids across Southeast Asia.",
    publishedWorks: [
      { title: "LSTM-based Photovoltaic Power Estimation on Low-Resource Fog Nodes (IEEE IoT Journal 2024)" },
      { title: "Predictors for Solar Battery Storages under Meteorological Disparities (Elsevier 2025)" }
    ],
    links: [
      { label: "University Profile", url: "https://ritechs.org" },
      { label: "Google Scholar", url: "https://scholar.google.com" }
    ]
  },
  {
    id: "maria-santos",
    name: "Prof. Maria Santos & Editorial Team",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format,compress&fit=crop&q=70&w=280",
    credentials: "Editorial Directorate, RiTECHS Scientific Publishing House",
    bio: "The RiTECHS Scientific Publishing Team, coordinated by Prof. Maria Santos, produces comprehensive literature guidelines and methodologies to aid scholars worldwide.",
    publishedWorks: [
      { title: "Critical Literature Gap Auditing Methods in Modern Computing: A Systematic Survey (ScienceDirect 2025)" }
    ],
    links: [
      { label: "RiTECHS Publishing House", url: "https://ritechs.org" }
    ]
  },
  {
    id: "ritechs-board",
    name: "RiTECHS Scientific Board",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format,compress&fit=crop&q=70&w=280",
    credentials: "Board of Editors, RiTECHS Conferences Series",
    bio: "The central RiTECHS Scientific Board oversees review board approvals, paper formatting guidelines, and publisher vetting standards for all series conferences.",
    publishedWorks: [
      { title: "Guidelines to Academic Literature Review Structures and Statistically Grounded Sample Sizing (IEEE 2026)" }
    ],
    links: [
      { label: "Editorial Standards", url: "https://ritechs.org" }
    ]
  }
];
