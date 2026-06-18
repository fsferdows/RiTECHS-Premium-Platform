import React, { useState, useMemo } from 'react';
import { Conference } from '../types';
import { 
  Calendar, MapPin, Laptop, Search, Info, Award, UserCheck, 
  MapPinIcon, Sparkles, Building, CreditCard, ChevronLeft, Check, Ticket,
  Shield, Globe, FileText, Users, Download, ExternalLink, Cpu, BookOpen, 
  Layers, Network, CheckCircle, ChevronDown, ListFilter, AlertTriangle, 
  FileCheck, HelpCircle, ArrowRight, User, FolderOpen, BookMarked
} from 'lucide-react';
import { TiltCard } from './TiltCard';
import { FadeUpSection } from './FadeUpSection';
import { ConferenceCard } from './ConferenceCard';
import { SafeImageWithSkeleton } from './SafeImageWithSkeleton';

// Comprehensive static dataset for ICETCS 2026 to make the UI detailed and advance
const ICETCS_TPC_MEMBERS = [
  { name: "Dr. Rashed Al Amin", role: "TPC Chair", affiliation: "University of Siegen", country: "Germany", region: "Europe" },
  { name: "Prof. Dr. Prashant Pillai", role: "Patron", affiliation: "University of Wolverhampton", country: "United Kingdom", region: "Europe" },
  { name: "Prof. Dr. Mohammed Atiquzzaman", role: "Patron / Advisor", affiliation: "University of Oklahoma", country: "United States", region: "Americas" },
  { name: "Prof. Mario Marchese", role: "General Chair", affiliation: "University of Genoa", country: "Italy", region: "Europe" },
  { name: "Prof. Dr. Arafatur Rahman", role: "Executive General Chair", affiliation: "University of Wolverhampton", country: "United Kingdom", region: "Europe" },
  { name: "Prof. Dr. Kim-Kwang Raymond Choo", role: "Publicity Chair", affiliation: "University of Texas at San Antonio", country: "United States", region: "Americas" },
  { name: "Prof. Fabio Patrone", role: "Publicity Chair", affiliation: "University of Genoa", country: "Italy", region: "Europe" },
  { name: "Dr. Giovanni Gaggero", role: "Publicity Co-Chair", affiliation: "University of Genoa", country: "Italy", region: "Europe" },
  { name: "Dr. Shancang Li", role: "Publicity Co-Chair", affiliation: "Cardiff University", country: "United Kingdom", region: "Europe" },
  { name: "Dr. Nazmul Hussain", role: "Publication Chair", affiliation: "University of Nottingham", country: "United Kingdom", region: "Europe" },
  { name: "Dr. Zakirul Alam Bhuiyan", role: "Publication Chair", affiliation: "Fordham University", country: "United States", region: "Americas" },
  { name: "Ihsan Ullah", role: "Program Chair", affiliation: "National University of Ireland", country: "Ireland", region: "Europe" },
  { name: "Jasim Uddin", role: "Program Chair", affiliation: "Cardiff Metropolitan University", country: "United Kingdom", region: "Europe" },
  { name: "Dr. Adeel Rafiq", role: "Program Chair", affiliation: "University of Wolverhampton", country: "United Kingdom", region: "Europe" },
  { name: "Dr. S M Nazmus Sadat", role: "TPC Member", affiliation: "Uttara University", country: "Bangladesh", region: "Asia" },
  { name: "Dr. Muhammad Kamran Naeem", role: "TPC Member", affiliation: "University of Northampton", country: "United Kingdom", region: "Europe" },
  { name: "Dr. Zeeshan Ahmad", role: "TPC Member", affiliation: "University of Wolverhampton", country: "United Kingdom", region: "Europe" },
  { name: "Hai Tao", role: "TPC Member", affiliation: "Baoji University of Arts and Science", country: "China", region: "Asia" },
  { name: "Dr. Manimuthu", role: "TPC Member", affiliation: "Aston University", country: "United Kingdom", region: "Europe" },
  { name: "Nour Moustafa", role: "TPC Member", affiliation: "UNSW", country: "Australia", region: "Oceania" },
  { name: "Dr. A. Taufiq Asyhari", role: "TPC Member", affiliation: "Monash University", country: "Australia", region: "Oceania" },
  { name: "Xiaokang Wang", role: "TPC Member", affiliation: "St. Francis Xavier University", country: "Canada", region: "Americas" },
  { name: "Mohammad Saedi", role: "TPC Member", affiliation: "City St George's, University of London", country: "United Kingdom", region: "Europe" },
  { name: "Dr. Ahmad Firdaus bin Zainal Abidin", role: "TPC Member", affiliation: "Universiti Malaysia Pahang Al-Sultan Abdullah", country: "Malaysia", region: "Asia" },
  { name: "Andultahman Ahmed Mohammed Al-Sewari", role: "TPC Member", affiliation: "Universiti Malaysia Pahang", country: "Malaysia", region: "Asia" },
  { name: "Celia Shahnaz", role: "TPC Member", affiliation: "Bangladesh University of Engineering & Technology (BUET)", country: "Bangladesh", region: "Asia" },
  { name: "Lounis Chermak", role: "TPC Member", affiliation: "University of London (Birkbeck College)", country: "United Kingdom", region: "Europe" },
  { name: "Paul Yoo", role: "TPC Member", affiliation: "University of London (Birkbeck College)", country: "United Kingdom", region: "Europe" },
  { name: "B.K. Kaushik", role: "TPC Member", affiliation: "IIT Roorkee", country: "India", region: "Asia" },
  { name: "Debajani Mitra", role: "TPC Member", affiliation: "IIT(ISM) Dhanbad", country: "India", region: "Asia" },
  { name: "Mohammad M. Hassan", role: "TPC Member", affiliation: "King Saud University, Riyadh", country: "Saudi Arabia", region: "Middle East" },
  { name: "Xiong Li", role: "TPC Member", affiliation: "Hunan University of Science and Technology", country: "China", region: "Asia" },
  { name: "Zubair Md. Fadlullah", role: "TPC Member", affiliation: "Tohoku University, Sendai", country: "Japan", region: "Asia" },
  { name: "Khoirul Anwar", role: "TPC Member", affiliation: "Telkom University", country: "Indonesia", region: "Asia" },
  { name: "Valentina E. Balas", role: "TPC Member", affiliation: "Aurel Vlaicu University of Arad", country: "Romania", region: "Europe" },
  { name: "Musfiq Rahman", role: "TPC Member", affiliation: "Thompson Rivers University", country: "Canada", region: "Americas" },
  { name: "Mohd Mawardi Bin Saari", role: "TPC Member", affiliation: "Universiti Malaysia Pahang", country: "Malaysia", region: "Asia" },
  { name: "Roshahliza M Ramli", role: "TPC Member", affiliation: "Universiti Malaysia Pahang", country: "Malaysia", region: "Asia" },
  { name: "Sikder M Kamruzzaman", role: "TPC Member", affiliation: "Ryerson University", country: "Canada", region: "Americas" },
  { name: "Eklas Hossain", role: "TPC Member", affiliation: "Oregon Institute of Technology", country: "United States", region: "Americas" },
  { name: "Mohammad Osiur Rahman", role: "TPC Member", affiliation: "University of Chittagong", country: "Bangladesh", region: "Asia" },
  { name: "Ganesh Gopal", role: "TPC Member", affiliation: "Galgotias University", country: "India", region: "Asia" },
  { name: "Anton Satria Prabuwono", role: "TPC Member", affiliation: "King Abdulaziz University", country: "Saudi Arabia", region: "Middle East" },
  { name: "Deepak Gupta", role: "TPC Member", affiliation: "Maharaja Agrasen Institute of Technology", country: "India", region: "Asia" },
  { name: "Waheb AbdulJabar", role: "TPC Member", affiliation: "Universiti Malaysia Pahang", country: "Malaysia", region: "Asia" },
  { name: "Syifak Izhar Hisham", role: "TPC Member", affiliation: "Universiti Malaysia Pahang", country: "Malaysia", region: "Asia" },
  { name: "Belal Abdullah Al-Fuhaidi", role: "TPC Member", affiliation: "University of Science and Technology", country: "Yemen", region: "Middle East" },
  { name: "Ashish Khanna", role: "TPC Member", affiliation: "Maharaja Agrasen Institute of Technology", country: "India", region: "Asia" },
  { name: "Gandeva Bayu Satrya", role: "TPC Member", affiliation: "Telkom University", country: "Indonesia", region: "Asia" },
  { name: "Vitaliy Mezhuyev", role: "TPC Member", affiliation: "FH JOANNEUM University of Applied Sciences", country: "Austria", region: "Europe" },
  { name: "Dr. Md Saiful Azad", role: "TPC Member", affiliation: "Green University", country: "Bangladesh", region: "Asia" },
  { name: "Dr. Mohd Faizal bin Ab Razak", role: "TPC Member", affiliation: "Universiti Malaysia Pahang Al-Sultan Abdullah", country: "Malaysia", region: "Asia" },
  { name: "Dr. Muhammad Ajmal Azad", role: "TPC Member", affiliation: "Birmingham City University", country: "United Kingdom", region: "Europe" },
  { name: "Dr. Faisal Saeed", role: "TPC Member", affiliation: "Birmingham City University", country: "United Kingdom", region: "Europe" },
  { name: "Fuad Ghaleb", role: "TPC Member", affiliation: "Birmingham City University", country: "United Kingdom", region: "Europe" },
  { name: "Junaid Arshad", role: "TPC Member", affiliation: "Birmingham City University", country: "United Kingdom", region: "Europe" },
  { name: "Dr. Raouf Abozariba", role: "TPC Member", affiliation: "Birmingham City University", country: "United Kingdom", region: "Europe" },
  { name: "Abdurrahman Alsewari", role: "TPC Member", affiliation: "Birmingham City University", country: "United Kingdom", region: "Europe" }
];

const ICETCS_DETAILED_TRACKS = [
  {
    num: "01",
    title: "Cyber Security and Network Space Challenges and Solutions",
    subtitle: "Core network security paradigms, threat intelligence architectures, and risk remediation.",
    topics: ["Hacking & Intrusion Defense", "Phishing & Social Engineering", "Supply Chain Risks & Asset Trust", "Man-in-the-Middle (MitM) & Wiretapping Defense", "DNS Tunnelling & Traffic Analysis", "Malware and Advanced Ransomware", "Distributed Denial of Service (DoS/DDoS) Abatement", "Cloud Vulnerabilities & Insider Threats", "Cybersecurity Awareness & Human Factors", "Expert Support Systems in Cybersecurity", "Continuous System Updates & Automated Patching", "Database Exposure Prevention & Access Auditing", "Spyware, Trojan Horse, and Rootkit countermeasures", "Strategic Threat Intelligence (State/Enterprise)", "Tactical, Operational, and Technical Threat Intelligence", "Information Gathering, Reconnaissance, and Intel", "Sniffing, Spoofing, and Packet Injection Mitigations", "Structured Query Language (SQL) Injection Prevention", "Exploitation of Connected Devices and Corporate Networks"]
  },
  {
    num: "02",
    title: "Cyber Security Challenges for Mobility, Transport Infrastructure, Connected and Autonomous Vehicles (CAVs)",
    subtitle: "Automotive threat vectors, V2X security, physical transit control resilience.",
    topics: ["Automatic License Plate Recognition (ALPR) Security", "Automatic Traffic Control Signals and Cyber-Resilient Systems", "Digital Control System of Networks in Subterranean Tunnels", "Passenger Announcement Systems (PAS) tampering mitigation", "Guideway Intrusion Detection Systems (GIDS) telemetry protection", "Closed-Circuit Television (CCTV) with Real-Time Cyber Defence Solutions", "Digital Ticketing & Secure Electronic Transit Wallets", "Physical / Logical Access Control Systems for Transit Staff", "Distributed Control Systems (DCS) and Operations Security Zones", "Sensor Jamming, Blinding, and Blindspot Saturation Defense", "GPS / GNSS Spoofing Countermeasures", "DDoS Attacks on Connected Fleet Equipment", "Manipulation of V2X and V2I Wireless Communication Systems", "Preventing Information Disclosure of Sensitive Personal and Automated Transit Data"]
  },
  {
    num: "03",
    title: "Cloud Security, and Its Future",
    subtitle: "Secure cloud architectures, IAM governance, container orchestration safety.",
    topics: ["State of Cloud Security & Hypervisor Vulnerabilities", "Manual Configurations and Security Drift Remediation", "Disaster Recovery Testing & Business Continuity Planning (BCP)", "Domain Hijacking Prevention & DNSSEC Implementation", "Cloud Resource Inventory Management & Access Ledgering", "Log Management, Auditing, and SIEM Telemetry Integrity", "Misconfigured Networks & Zero-Trust Cloud Architecture", "Broken Access Control (BAC) & Principle of Least Privilege", "Improper Use of Default Configurations & Factory Credential Auditing", "Publicly Accessible Object Storage Buckets Security", "Securing Developer Credentials & API Keys (Anti-Seeding)"]
  },
  {
    num: "04",
    title: "Blockchain Architecture and Security",
    subtitle: "Consensus mechanics, cryptography of distributed ledgers, smart contract audits.",
    topics: ["Theories of Blockchain and Distributed Ledger Technology (DLT)", "New Distributed Scalable Blockchain Architecture & Sharding", "Distributed Consensus Models & Fault Tolerance Mechanisms", "Security, Privacy, and Trust of Distributed Ledger Systems", "The Trilemma: Decentralization, Scalability, and Security Tradeoff", "Performance Analysis & Execution Optimization", "Simulation and Academic Performance Evaluation Techniques", "Smart Contract Security, Formal Verification & Chain Code Audit", "Peer-to-Peer Applications and Financial Ecosystem Services Based on Blockchain", "Routing Protocols and Cryptographic Algorithms Based on Blockchain"]
  },
  {
    num: "05",
    title: "Securing the Connected World — Challenges and Solutions in IoT Cybersecurity",
    subtitle: "Ubiquitous hardware interfaces, IoT supply chains, smart agriculture.",
    topics: ["Challenges and Solutions in Resource-Constrained IoT Device Security", "Cybersecurity in IoT-enabled Cyber-Physical Systems (CPS)", "Securing Social Networks within Interactive IoT Frameworks", "IoT Hardware Supply Chain Security & Blockchain Integrity Tracking", "Ensuring Cyber Resilience in Smart Agriculture & IoT Milieu", "Security Measures for Connected Fleet Management & Electric Vehicles (EVs)", "Crowdsourcing and Crowdsensing Data Integrity in IoT Environments", "Securing Mobile Cellular Networks (4G, 5G, 6G) in IoT Landscapes", "Edge and Cloud Computing Security Co-Design for IoT Infrastructure", "Next-Generation Communication Protocols Security in IoT", "Cryptocurrency Security in Autonomous IoT-to-IoT Micro-Transactions", "Artificial Intelligence & ML-driven Automation in IoT Defense", "Game Theory Models for Strategic IoT Cybersecurity Operations", "Industry 4.0 cybersecurity challenges and industrial SCADA security"]
  },
  {
    num: "06",
    title: "Cybersecurity for Space Systems and Space Infrastructure — Securing the Final Frontier",
    subtitle: "Satellite networks, GNSS integrity, ground-station defenses.",
    topics: ["Cyber Resilience of Satellite Payload & Complex Ground-Segment Systems", "Real-Time Detection of Jamming & Spoofing in GNSS/Satellite Feeds", "Secure Telemetry, Tracking & Command (TT&C) Architectures for Satellites", "Secure Architectures for LEO, MEO, and GEO Satellite Constellations", "AI & Machine Learning on Edge Satellites for Cyber Threat Profiling", "Zero-Trust Architecture for Integrated Space-Ground Communication Nodes", "Secure Space-Based IoT and Inter-Satellite Optical/RF Communication", "Space Situational Awareness (SSA) & Cyber-Physical Ground Protection", "Regulatory Policy, Accord Drafting, and Cooperation in Space Cybersecurity", "Quantum-Resistant Cryptography for In-Orbit Satellite Cryptographic Hardware", "Risk Assessment & High-Fidelity Digital Twin Modelling for Space Assets"]
  },
  {
    num: "07",
    title: "CyberVehiCare — Cybersecurity, Resilience and Intelligent Health Monitoring for Connected and Autonomous Vehicles (CAVs)",
    subtitle: "In-vehicle network intrusion detection, OTA updates, and ISO/UNECE compliance.",
    topics: ["Cyber-Physical Vehicular Health Monitoring Systems (CP-VHMS) Architecture", "AI-ML-driven Anomaly Detection in Controller Area Networks (CAN), Automotive Ethernet, and V2X Communities", "Intrusion Detection & Prevention Systems (IDS/IPS) for Real-Time OBD/CAN Safety", "Secure Over-the-Air (OTA) Cryptographic Firmware Update Mechanisms", "Edge and Fog Computing Architectures for Vehicular Cyber-Defense Nodes", "Digital Twins for Vehicle Health Profiling and Predictive Cybersecurity Diagnostics", "Resilient V2X Communication Protocols (5G-V2X, 6G-enabled Intelligent Transport)", "Cyber Resilience Modelling & Redundant Fail-Safe Systems for Level-5 AVs", "Integration of Safety and Security Co-Design (ISO 21434, UNECE WP.29 standards)", "Blockchain & Decentralized Trust Protocols for Vehicular Event Data Recorders", "Comprehensive Threat Modelling & Multi-Hazard Risk Assessment for ITS Networks"]
  },
  {
    num: "08",
    title: "Hardware Security",
    subtitle: "Silicons trust, PUFs, side-channel analysis, and cryptographic chips.",
    topics: ["Hardware Trojans Detection, Silicon Inspection, and Supply Chain Integrity", "Physically Unclonable Functions (PUF) for Secure Device Fingerprinting", "Side-Channel Attack (SCA) & Differential Power Analysis (DPA) defenses", "Hardware-Based Cryptography & Cryptographic Co-Processors", "Reverse Engineering Countermeasures & Active Chip Anti-Tampering", "Automotive and Industrial Micro-Controller Hardware Trust Anchors", "Large Language Models (LLM) for Hardware Verification & HDL Security", "Embedded Systems Security, JTAG Debug Port Lockdown, and Test Scaffolding"]
  }
];

const ICETCS_KEYNOTE_SPEAKER_PROFILES = [
  {
    name: "Emma Fadlon",
    role: "Investment Projects Lead and Programme Director, CyberASAP",
    affiliation: "Innovate UK Business Connect, United Kingdom",
    topic: "Commercializing Breakthrough Cyber-Security: The Academic Roadmap",
    desc: "Spearheads the pre-eminent cyber academic commercialization program inside the UK under Innovate UK, nurturing spinouts from top-tier research institutes.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Giulio Ferro",
    role: "Tenure Track Professor",
    affiliation: "University of Genoa, Italy",
    topic: "Smart Grid Cyber Resilience: Optimization and Edge Fail-safe Protocol",
    desc: "Renowned expert in control systems engineering, focused on cyber-physical defenses for critical smart power systems.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Hendrik Wöhrle",
    role: "Professor & Senior Researcher",
    affiliation: "University of Duisburg-Essen & Fraunhofer IMS, Germany",
    topic: "Neuromorphic Hardware-Assisted Threat Classification at the IoT Edge",
    desc: "Leading expert in low-power neuromorphic hardware architectures, designing secure chips for autonomous systems and industrial IoT.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Imed Ben Dhaou",
    role: "Professor of Cyber-Physical Systems",
    affiliation: "University of Turku, Finland",
    topic: "Intelligent Transportation Systems: Cryptographic Latency Optimization in 5G-V2X",
    desc: "Specializes in design methods for resource-constrained electronics, secure automotive software, and sustainable smart infrastructure.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Luigi Coppolino",
    role: "Full Professor of Computer Engineering",
    affiliation: "University Parthenope - Naples, Italy",
    topic: "Industrial Kubernetes Resilience: Orchestration-Level Attack Signatures",
    desc: "Authored over 100 high-citation research papers in cloud threat defense, virtualization security, and mission-critical networks.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Mario Marchese",
    role: "Full Professor of Telecommunications",
    affiliation: "University of Genoa, Italy",
    topic: "Satellite zero-trust infrastructures and ground-segment communications",
    desc: "Serves as the General Chair of ICETCS 2026. Renowned expert in satellite network quality of service, security protocols, and space internetworks.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Matteo Repetto",
    role: "Head Researcher",
    affiliation: "CNR/IMATI, Italy",
    topic: "Decentralized Access Management and Virtual Function Identity Security",
    desc: "Coordinates flagship European cyber security research and developer teams focused on dynamic network function virtualization.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
  },
  {
    name: "Paul Wooderson",
    role: "Chief Engineer (Cybersecurity)",
    affiliation: "HORIBA MIRA, United Kingdom",
    topic: "Implementing ISO 21434 and UNECE WP.29 in Modern Connected Fleets",
    desc: "Leads vehicle cybersecurity validation and policy, advising global automotive conglomerates on cyber protection and type approval safety.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
  }
];

interface ConferencesViewProps {
  currentPath: string;
  conferences: Conference[];
  onNavigate: (path: string) => void;
}

export default function ConferencesView({ currentPath, conferences, onNavigate }: ConferencesViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [formatFilter, setFormatFilter] = useState<'All' | 'Hybrid' | 'In-Person'>('All');
  const [subjectFilter, setSubjectFilter] = useState<'All' | 'Cybersecurity' | 'Internet of Things'>('All');
  
  // Payment states
  const [stripeModalOpen, setStripeModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<{ tier: string; price: string; confName: string } | null>(null);
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardHolder, setCardHolder] = useState('');
  const [cmtPaperId, setCmtPaperId] = useState('');
  const [academicAffiliation, setAcademicAffiliation] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Detail view states for ICETCS
  const [activeTab, setActiveTab] = useState<'overview' | 'tracks' | 'submission' | 'committee' | 'speakers' | 'registration'>('overview');
  const [trackSearchQuery, setTrackSearchQuery] = useState('');
  const [tpcSearchQuery, setTpcSearchQuery] = useState('');
  const [tpcRegionFilter, setTpcRegionFilter] = useState<string>('All');

  // Parse path for details (e.g. #/conferences/icetcs)
  const isDetailsPage = currentPath.startsWith('#/conferences/');
  const activeSlug = isDetailsPage ? currentPath.replace('#/conferences/', '') : null;
  const activeConference = conferences.find(c => c.slug === activeSlug);

  const downloadFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportConfBibTeX = (conf: Conference) => {
    const year = conf.year || "2026";
    const cleanId = conf.slug ? conf.slug.replace(/[^a-zA-Z0-9]/g, '') : 'icetcs';
    const bib = `@proceedings{${cleanId}_${year},
  title = {${conf.fullName || conf.name}},
  year = {${year}},
  publisher = {RiTECHS Publishing House},
  address = {${conf.location}},
  series = {RiTECHS Conference Proceedings Series},
  url = {${window.location.origin}/#/conferences/${conf.slug}}
}`;
    downloadFile(`${conf.slug}_proceedings_citation.bib`, bib, 'application/x-bibtex');
  };

  const exportConfRIS = (conf: Conference) => {
    const year = conf.year || "2026";
    const ris = `TY  - CONF
TI  - ${conf.fullName || conf.name}
CY  - ${conf.location}
PY  - ${year}
PB  - RiTECHS Publishing House
UR  - ${window.location.origin}/#/conferences/${conf.slug}
N1  - Format: ${conf.format}
ER  - `;
    downloadFile(`${conf.slug}_proceedings_citation.ris`, ris, 'application/x-research-info-systems');
  };

  const filteredConferences = conferences.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.tracks && c.tracks.some(track => track.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesFormat = formatFilter === 'All' || c.format === formatFilter;
    const matchesSubject = subjectFilter === 'All' || (
      subjectFilter === 'Cybersecurity' ? (c.slug === 'icetcs' || c.name.toLowerCase().includes('cyber') || (c.tracks && c.tracks.some(t => t.toLowerCase().includes('cyber') || t.toLowerCase().includes('crypt')))) :
      subjectFilter === 'Internet of Things' ? (c.slug === 'itss-ioe' || c.name.toLowerCase().includes('ioe') || (c.tracks && c.tracks.some(t => t.toLowerCase().includes('iot') || t.toLowerCase().includes('internet') || t.toLowerCase().includes('everything')))) : true
    );
    return matchesSearch && matchesFormat && matchesSubject;
  });

  const launchStripe = (confName: string, tier: string, price: string) => {
    setSelectedTier({ confName, tier, price });
    setStripeModalOpen(true);
    setPaymentSuccess(false);
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 1800);
  };

  // Memoized Search Filter for Technical Program Committee
  const filteredTpc = useMemo(() => {
    return ICETCS_TPC_MEMBERS.filter(member => {
      const matchText = member.name.toLowerCase().includes(tpcSearchQuery.toLowerCase()) ||
                        member.affiliation.toLowerCase().includes(tpcSearchQuery.toLowerCase()) ||
                        member.country.toLowerCase().includes(tpcSearchQuery.toLowerCase()) ||
                        member.role.toLowerCase().includes(tpcSearchQuery.toLowerCase());
      const matchRegion = tpcRegionFilter === 'All' || member.region === tpcRegionFilter;
      return matchText && matchRegion;
    });
  }, [tpcSearchQuery, tpcRegionFilter]);

  // Memoized Search Filter for Tracks & Core Cyber Space Topics
  const filteredTracks = useMemo(() => {
    if (!trackSearchQuery) return ICETCS_DETAILED_TRACKS;
    return ICETCS_DETAILED_TRACKS.map(track => {
      const filteredTopics = track.topics.filter(topic => 
        topic.toLowerCase().includes(trackSearchQuery.toLowerCase())
      );
      const trackMatchesMeta = track.title.toLowerCase().includes(trackSearchQuery.toLowerCase()) ||
                               track.subtitle.toLowerCase().includes(trackSearchQuery.toLowerCase());
      
      if (filteredTopics.length > 0 || trackMatchesMeta) {
        return {
          ...track,
          // If the track matches the title, show all topics; otherwise, show only topics that match the query
          topics: filteredTopics.length > 0 ? filteredTopics : track.topics,
          highlight: true
        };
      }
      return null;
    }).filter(Boolean) as typeof ICETCS_DETAILED_TRACKS;
  }, [trackSearchQuery]);

  if (activeConference) {
    const isIcetcs = activeConference.slug === 'icetcs';

    return (
      <div id="conference-detail-view" className="pt-20 animate-fade-in text-white bg-maroon-dark min-h-screen">
        {/* Dynamic Editorial Hero Header with high contrast */}
        <section className="bg-gradient-to-b from-[#2C0509] to-[#3D0C11] text-white py-16 px-6 relative premium-noise overflow-hidden border-b border-accent-gold/25 shadow-lg">
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-accent-gold/5 blur-[120px]" />
          </div>
          
          <div className="max-w-5xl mx-auto relative z-10 text-left">
            <button 
              onClick={() => onNavigate('#/conferences')}
              className="inline-flex items-center gap-2 text-[#C9A961] hover:text-white text-[11px] uppercase tracking-widest font-mono mb-6 transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Conference Hub
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-accent-gold/15 border border-accent-gold/30 text-accent-gold text-[10px] uppercase font-mono tracking-wider font-bold rounded-xs">
                {activeConference.year || '2026'} EDITION
              </span>
              <span className="px-3 py-1 bg-white/10 uppercase border border-white/25 text-[10px] font-mono tracking-wider rounded-xs font-semibold text-white">
                {activeConference.format || 'Hybrid'}
              </span>
              {isIcetcs && (
                <span className="px-3 py-1 bg-blue-500/10 border border-blue-400/20 text-blue-300 text-[10px] font-mono tracking-wider font-bold rounded-xs uppercase w-fit">
                  LNEE, SPRINGER PUBLISHING
                </span>
              )}
            </div>

            <h1 className="font-serif-display text-3xl sm:text-4.5xl lg:text-5.5xl font-bold tracking-tight mb-6 leading-tight text-white drop-shadow-sm">
              {activeConference.fullName || activeConference.name}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-[12px] text-neutral-300 font-mono mt-8 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A961] shrink-0" />
                <span><strong className="text-white">Venue:</strong> {activeConference.location}</span>
               </div>
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-[#C9A961] shrink-0" />
                <span><strong className="text-white">Dates:</strong> {activeConference.dates}</span>
              </div>
            </div>
          </div>
        </section>

        {/* 1000x Luxury Interactive Tab Selector Deck */}
        <section className="bg-maroon-dark/95 border-b border-accent-gold/15 sticky top-16 z-20 shadow-xl backdrop-blur-md text-white">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex overflow-x-auto scrollbar-none gap-2 sm:gap-4 py-2 text-xs font-mono tracking-wider uppercase">
              {[
                { id: 'overview', label: 'About & Context', icon: <BookOpen className="w-3.5 h-3.5" /> },
                { id: 'tracks', label: 'Major Tracks', icon: <Layers className="w-3.5 h-3.5" /> },
                { id: 'submission', label: 'Paper Submission', icon: <FileCheck className="w-3.5 h-3.5" /> },
                { id: 'committee', label: 'Board & TPC', icon: <Users className="w-3.5 h-3.5" /> },
                { id: 'speakers2', label: 'Keynotes', icon: <Award className="w-3.5 h-3.5" /> },
                { id: 'registration', label: 'Register & Passes', icon: <Ticket className="w-3.5 h-3.5" /> }
              ].map(tab => {
                const isSelected = activeTab === (tab.id === 'speakers2' ? 'speakers' : tab.id);
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id === 'speakers2' ? 'speakers' : tab.id as any)}
                    className={`flex items-center gap-2 py-3 px-4 shrink-0 border-b-2 font-bold cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'border-accent-gold text-accent-gold bg-accent-gold/5 font-semibold'
                        : 'border-transparent text-neutral-400 hover:text-white hover:border-accent-gold/30'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Tab content area */}
        <div className="max-w-5xl mx-auto px-6 py-12">

          {/* ----------------- TAB: OVERVIEW & CONTEXT ----------------- */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in text-left">
              <div className="lg:col-span-8 flex flex-col gap-8">
                <div>
                  <h3 className="font-serif-display text-2.5xl font-bold text-[#0a182f] mb-4">
                    Conference Objective
                  </h3>
                  <p className="text-sm text-charcoal/90 leading-relaxed font-light mb-4">
                    {isIcetcs 
                      ? "The primary objective of ICETCS 2026 is to provide a global platform for researchers, academicians, industry professionals, and policymakers to converge, share insights, and collaboratively explore the latest advancements and emerging trends in the field of cybersecurity. The conference aims to facilitate discussion on cutting-edge research, innovative technologies, and practical solutions addressing evolving cyber threats in an interconnected world." 
                      : activeConference.description
                    }
                  </p>
                  <p className="text-sm text-charcoal/95 leading-relaxed font-light">
                    {isIcetcs && "By fostering interdisciplinary dialogue and knowledge exchange, the conference seeks to contribute to robust cybersecurity strategies, enhance academia–industry collaboration, and strengthen collective global resilience against cyber threats."}
                  </p>
                </div>

                {isIcetcs && (
                  <div className="bg-[#EDF2FC]/45 border border-blue-500/10 p-6 rounded-xs relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 text-blue-500/5 select-none pointer-events-none">
                      <Award className="w-40 h-40" />
                    </div>
                    <div className="flex items-center gap-2 text-blue-800 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
                      <Sparkles className="w-4 h-4 text-accent-gold animate-pulse" /> Springer Proceedings Linkage
                    </div>
                    <p className="text-xs text-blue-900 leading-relaxed font-light">
                      <strong>Highlight:</strong> All accepted technical research papers will be compiled and submitted for publication in the prestigious <strong>Lecture Notes in Electrical Engineering (LNEE) by Springer Nature</strong> (Scopus Indexed, subject to academic approval).
                    </p>
                  </div>
                )}

                {/* Scope area */}
                <div>
                  <h3 className="font-serif-display text-xl font-bold text-[#0a182f] mb-4">
                    Join Us (Call for Participation)
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-gray leading-relaxed mb-6 font-light">
                    The scientific committee invites authors and practitioners to submit premium papers across cybersecurity disciplines, ubiquitous intelligence models, big data security architectures, and decentralized IoT ledger applications. Options are also available for tutorial sheets, workshops, and exhibitions.
                  </p>
                  
                  {isIcetcs && (
                    <div className="bg-white border border-divider-gold/45 p-6 shadow-xs rounded-xs">
                      <div className="flex items-center gap-2 mb-4 font-serif-display text-sm font-bold text-primary-navy">
                        <Award className="w-4.5 h-4.5 text-accent-gold" /> Recommended Journals for Extended Papers
                      </div>
                      <p className="text-xs text-[#6B7280] font-light mb-4 leading-relaxed">
                        Selected papers matching standards will be recommended for potential expanded scope review in leading index journals:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                        {[
                          "International Journal of Information Privacy, Security and Integrity",
                          "EAI Endorsed Transactions on Internet of Things",
                          "Computers (MDPI Editorial)",
                          "International Journal of Software Engineering and Computer Systems",
                          "Journal of Network and Computer Applications",
                          "Vehicular Communications Journal"
                        ].map((journal, jIdx) => (
                          <div key={jIdx} className="bg-neutral-warm/40 p-2.5 border border-divider-gold/30 rounded-xs flex items-center gap-2 text-[11px]">
                            <span className="text-accent-gold font-bold shrink-0">·</span>
                            <span className="truncate text-primary-navy font-sans font-medium">{journal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Free Workshop Card */}
                {isIcetcs && (
                  <div className="border border-accent-gold/25 bg-amber-50/10 p-6 rounded-xs flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="w-12 h-12 rounded-full bg-accent-gold/15 flex items-center justify-center shrink-0 text-accent-gold">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-accent-gold font-bold uppercase tracking-wider">COMPLIMENTARY WORKSHOP</span>
                      <h4 className="font-serif-display font-bold text-primary-navy text-base mt-0.5">"How to Write a Quality Conference Paper"</h4>
                      <p className="text-xs text-muted-gray leading-relaxed font-light mt-1">
                        Free access is provided to registered attendees and post-grad students. Guidelines detail methodology modeling, structuring citations properly, and matching Springer Q1 formatting limits.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar layout */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                {/* Timeline details */}
                <div className="bg-neutral-warm border border-divider-gold/45 p-6 rounded-xs text-left shadow-xs">
                  <h3 className="font-serif-display text-lg text-primary-navy font-bold mb-4 flex items-center gap-2 border-b border-divider-gold/25 pb-3">
                    <Calendar className="w-5 h-5 text-accent-gold" /> Important Dates
                  </h3>
                  <div className="flex flex-col gap-4">
                    {activeConference.importantDates.map((d, index) => (
                      <div key={index} className="flex gap-3 relative group">
                        {index < activeConference.importantDates.length - 1 && (
                          <div className="absolute top-5 left-1.5 bottom-[-16px] w-px bg-divider-gold" />
                        )}
                        <div className={`w-3.5 h-3.5 rounded-full mt-1.5 shrink-0 z-10 ${
                          d.status === 'current' 
                            ? 'bg-accent-gold ring-3 ring-accent-gold/25 animate-pulse' 
                            : 'bg-primary-navy/20'
                        }`} />
                        <div>
                          <p className="text-[11px] font-mono uppercase font-bold tracking-wider text-primary-navy">
                            {d.event}
                          </p>
                          <p className="text-xs font-serif-accent italic text-muted-gray mt-0.5">{d.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Official Documents & Files */}
                <div className="border border-divider-gold/45 p-6 rounded-xs bg-white text-left shadow-xs mb-6">
                  <h3 className="font-sans text-xs text-[#6B7280] font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-accent-gold shrink-0" /> Conference Files & Assets
                  </h3>
                  
                  {/* RiTECHS logo or school logo inside resource sidebar */}
                  <div className="flex items-center gap-4 p-3 bg-neutral-warm/40 border border-divider-gold/20 rounded-xs mb-4">
                    <img 
                      src={activeConference.logoUrl || "/logo.png"} 
                      alt="Institution Logo" 
                      className="w-12 h-12 object-contain bg-primary-maroon p-1 border border-accent-gold/30 rounded-xs shrink-0" 
                      onError={(e) => {
                        e.currentTarget.src = "/logo.png";
                      }}
                    />
                    <div>
                      <h4 className="text-[11px] font-mono uppercase font-bold text-primary-navy">Official Logo Badge</h4>
                      <p className="text-[9px] text-[#6B7280] leading-tight font-light">Official publication and affiliation seal of RiTECHS.</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <a 
                      href={activeConference.cfpPdfUrl || "https://ritechs.org/uploads/1779448778.pdf"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-accent-gold/10 hover:bg-accent-gold/20 p-3.5 rounded-xs border border-[#C9A961]/40 flex justify-between items-center transition-all duration-300 text-xs text-primary-navy font-medium group/link"
                    >
                      <span className="font-sans font-semibold flex items-center gap-2">
                        <Download className="w-4 h-4 text-accent-gold shrink-0" />
                        Download CFP PDF
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#6B7280] group-hover/link:text-accent-gold transition-colors shrink-0" />
                    </a>

                    <a 
                      href={activeConference.uploadsFolderUrl || "https://ritechs.org/uploads"} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="bg-neutral-warm hover:bg-neutral-warm/80 p-3.5 rounded-xs border border-divider-gold/30 flex justify-between items-center transition-all duration-300 text-xs text-primary-navy font-medium group/link"
                    >
                      <span className="font-sans font-semibold flex items-center gap-2">
                        <FolderOpen className="w-4 h-4 text-accent-gold shrink-0" />
                        Web Uploads Folder
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#6B7280] group-hover/link:text-accent-gold transition-colors shrink-0" />
                    </a>

                    {/* Exporters */}
                    <div className="grid grid-cols-2 gap-2 mt-2 pt-4 border-t border-divider-gold/25 select-none">
                      <button 
                        onClick={() => exportConfBibTeX(activeConference)}
                        className="bg-[#102447] hover:bg-opacity-90 text-[#C9A961] hover:text-white font-sans font-bold uppercase tracking-widest text-[9px] py-3.5 px-2 flex items-center justify-center gap-1.5 border border-accent-gold/30 hover:border-accent-gold transition-all duration-200 cursor-pointer rounded-xs"
                        title="Export conference proceeding reference in BibTeX format"
                      >
                        <BookMarked className="w-3.5 h-3.5 text-accent-gold shrink-0" />
                        BIBTEX
                      </button>
                      <button 
                        onClick={() => exportConfRIS(activeConference)}
                        className="bg-[#102447] hover:bg-opacity-90 text-[#C9A961] hover:text-white font-sans font-bold uppercase tracking-widest text-[9px] py-3.5 px-2 flex items-center justify-center gap-1.5 border border-accent-gold/30 hover:border-accent-gold transition-all duration-200 cursor-pointer rounded-xs"
                        title="Export conference proceeding reference in RIS format"
                      >
                        <BookMarked className="w-3.5 h-3.5 text-accent-gold shrink-0" />
                        RIS
                      </button>
                    </div>
                  </div>
                </div>

                {/* Organizer Associated Links & Logos */}
                <div className="border border-divider-gold/40 p-6 rounded-xs bg-white text-left shadow-xs">
                  <h3 className="font-sans text-xs text-[#6B7280] font-bold uppercase tracking-wider mb-4">
                    Linked Organizations
                  </h3>
                  <div className="flex flex-col gap-3">
                    {[
                      { name: "Airfield Security Italy", url: "https://www.airfieldsecurity.it/" },
                      { name: "Cardiff University (UK)", url: "https://www.cardiff.ac.uk/" },
                      { name: "University of Genoa (Italy)", url: "https://unige.it/en" },
                      { name: "University of Wolverhampton (UK)", url: "https://www.wlv.ac.uk/" }
                    ].map((org, oIdx) => (
                      <a 
                        key={oIdx} 
                        href={org.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="bg-neutral-warm/40 hover:bg-accent-gold/10 p-3 rounded-xs border border-divider-gold/20 flex justify-between items-center transition-all duration-300 text-xs text-primary-navy group/link"
                      >
                        <span className="font-sans font-semibold">{org.name}</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#6B7280] group-hover/link:text-accent-gold transition-colors" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* ----------------- TAB: RESEARCH TRACKS ----------------- */}
          {activeTab === 'tracks' && (
            <div className="animate-fade-in text-left">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-2">Scope Directory</h3>
                <h2 className="font-serif-display text-2.5xl font-bold text-primary-navy">
                  Major Tracks & Specific Topics
                </h2>
                <p className="text-xs text-[#6B7280] leading-relaxed mt-2 font-light">
                  Search through our indexing catalog of topics to find the correct fit for your scholarship, experimental metrics, and cyber-defense proofs.
                </p>
              </div>

              {/* Dynamic Search Filter Bar for Tracks */}
              <div className="relative max-w-xl mx-auto mb-12">
                <Search className="w-4 h-4 text-accent-gold absolute left-4 top-3.5" />
                <input 
                  type="text" 
                  placeholder="Filter track subjects (e.g. 'vehicular', 'ransomware', 'satellite')..."
                  value={trackSearchQuery}
                  onChange={(e) => setTrackSearchQuery(e.target.value)}
                  className="w-full bg-white border border-divider-gold pl-11 pr-4 py-3 text-xs outline-none focus:border-accent-gold transition-all shadow-sm rounded-xs"
                />
                {trackSearchQuery && (
                  <button 
                    onClick={() => setTrackSearchQuery('')}
                    className="absolute right-4 top-3 text-[10px] text-muted-gray uppercase hover:text-black font-mono font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Tracks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isIcetcs ? (
                  filteredTracks.length > 0 ? (
                    filteredTracks.map((track, idx) => (
                      <div 
                        key={idx} 
                        className={`bg-white border p-6 flex flex-col h-full rounded-xs transition-shadow duration-300 relative ${
                          trackSearchQuery ? 'border-accent-gold shadow-md bg-amber-50/5' : 'border-divider-gold/45 shadow-xs'
                        }`}
                      >
                        <div className="flex gap-4 items-start mb-4">
                          <div className="w-8 h-8 rounded-full bg-primary-navy/[0.04] text-accent-gold flex items-center justify-center font-mono text-xs font-bold shrink-0">
                            {track.num}
                          </div>
                          <div>
                            <h4 className="font-serif-display font-extrabold text-[#0a182f] text-base leading-snug">
                              Track {track.num}: {track.title}
                            </h4>
                            <p className="text-[11px] text-[#6B7280] font-light mt-1 italic">
                              {track.subtitle}
                            </p>
                          </div>
                        </div>

                        {/* Dropdown topic listing */}
                        <div className="flex-grow border-t border-divider-gold/20 pt-4 mt-2">
                          <p className="text-[10px] font-mono uppercase font-bold tracking-wider text-accent-gold mb-2">Subject Fields:</p>
                          <ul className="flex flex-wrap gap-1.5">
                            {track.topics.map((topic, tIdx) => {
                              const matchesSearch = trackSearchQuery && topic.toLowerCase().includes(trackSearchQuery.toLowerCase());
                              return (
                                <li 
                                  key={tIdx} 
                                  className={`text-[11px] px-2 py-1 rounded-xs border font-light tracking-wide ${
                                    matchesSearch 
                                      ? 'bg-accent-gold/25 border-accent-gold font-semibold text-primary-navy' 
                                      : 'bg-neutral-warm/25 border-divider-gold/20 text-[#4B5563]'
                                  }`}
                                >
                                  {topic}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-16 bg-neutral-warm/20 border border-dashed border-divider-gold">
                      <HelpCircle className="w-8 h-8 text-accent-gold mx-auto mb-2" />
                      <p className="text-xs text-muted-gray font-mono uppercase font-bold">No tracks fit search keywords</p>
                    </div>
                  )
                ) : (
                  activeConference.tracks && activeConference.tracks.map((track, i) => (
                    <div key={i} className="bg-white border border-divider-gold/45 p-6 flex items-start gap-4 rounded-xs shadow-xs">
                      <div className="w-8 h-8 rounded-full bg-primary-navy/5 flex items-center justify-center text-accent-gold shrink-0 font-mono text-sm font-bold">
                        0{i + 1}
                      </div>
                      <div>
                        <h4 className="font-serif-display text-base font-bold text-primary-navy mb-2">Technical Core Scope</h4>
                        <p className="text-xs sm:text-sm text-muted-gray font-light leading-relaxed">
                          {track}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}


          {/* ----------------- TAB: PAPER SUBMISSION ----------------- */}
          {activeTab === 'submission' && (
            <div className="animate-fade-in text-left flex flex-col gap-8">
              
              {/* Microsoft CMT Portal Card */}
              <div className="border border-primary-navy bg-[#0e1e38] text-white p-8 relative rounded-xs overflow-hidden shadow-lg premium-noise">
                <div className="absolute top-1/2 right-0 translate-x-14 translate-y-[-50%] text-white/5 pointer-events-none select-none">
                  <Globe className="w-72 h-72" />
                </div>
                
                <span className="bg-accent-gold text-primary-navy text-[9px] font-mono font-extrabold px-3 py-1 uppercase tracking-widest rounded-xs">
                  OFFICIAL CMT PORTAL
                </span>
                
                <h3 className="font-serif-display text-2.5xl font-bold mt-4 mb-2">
                  Submit Your Manuscript File
                </h3>
                
                <p className="text-xs text-white/80 max-w-3xl leading-relaxed font-light mb-6">
                  "The Microsoft CMT service is utilized for managing the complete peer-reviewing process for this conference. This service is provided for free by Microsoft, who bears all operational expenses, including licensing costs for Azure cloud computing resources, software maintenance, and global security hosting support."
                </p>

                <div className="flex flex-wrap gap-4 items-center">
                  <a 
                    href="https://cmt3.research.microsoft.com/ICETCS2026/Submission/Index" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent-gold hover:bg-[#B3934B] text-primary-navy text-xs font-mono font-extrabold uppercase tracking-widest px-6 py-3.5 transition-all duration-300 shadow-md group/btn"
                  >
                    <span>GO TO MICROSOFT CMT</span>
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover/btn:translate-x-1.5 transition-transform" />
                  </a>
                  <span className="text-[10px] font-mono text-white/50 bg-white/5 px-2.5 py-1">
                    Initial Paper Submission Due: July 31, 2026
                  </span>
                </div>
              </div>

              {/* Manuscript template guidelines and copyright */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                
                {/* Formatting Card */}
                <div className="bg-white border border-divider-gold/55 p-6 rounded-xs shadow-xs">
                  <h3 className="font-serif-display font-extrabold text-[#0a182f] text-lg mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-accent-gold" /> Manuscript Specifications
                  </h3>
                  <p className="text-xs text-[#6B7280] font-light leading-relaxed mb-4">
                    Springer conference papers must follow uniform stylesheet configurations including margin widths, typeface metrics, block indentation styles, and reference tags.
                  </p>
                  
                  <ul className="flex flex-col gap-2.5 text-xs text-charcoal mb-6">
                    <li className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                      <span><strong>Ideal Length:</strong> Submissions should be approximately <strong>15 pages</strong>.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                      <span><strong>Similarity index limit:</strong> Strictly <strong>&lt; 10%</strong> (references excluded). Block plagiarisms trigger immediate triage rejection.</span>
                    </li>
                    <li className="flex gap-2 items-start">
                      <Check className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                      <span><strong>Double-Blind:</strong> Omit all author names, associations, or contact strings inside draft versions sent for initial evaluation.</span>
                    </li>
                  </ul>

                  <div className="flex flex-col gap-2">
                    <a 
                      href="https://www.springer.com/gp/authors-editors/conference-proceedings/conference-proceedings-guidelines" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-between p-3.5 bg-neutral-warm/50 hover:bg-neutral-warm rounded-xs border border-divider-gold/30 text-xs font-mono font-bold text-primary-navy group/link"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-[#6B7280]" /> Springer Latex / Word Guidelines
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-gray group-hover/link:text-accent-gold transition-colors" />
                    </a>
                    
                    <a 
                      href="https://media.springer.com/full/springer-instructions-for-authors-assets/pdf/1662914_173916103_Copyright+Transfer+Statement.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-between p-3.5 bg-[#EDF2FC]/30 hover:bg-[#EDF2FC]/55 rounded-xs border border-blue-500/10 text-xs font-mono font-bold text-blue-900 group/link"
                    >
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-blue-500" /> Springer Copyright Transfer Statement
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-blue-500/70 group-hover/link:text-blue-900 transition-colors" />
                    </a>
                  </div>
                </div>

                {/* Plagiarism Caution & Structural Mapping */}
                <div className="bg-white border border-divider-gold/55 p-6 rounded-xs shadow-xs flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif-display font-extrabold text-[#0a182f] text-lg mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-accent-gold" /> Peer Review Policies
                    </h3>
                    
                    {/* Security Alert Block */}
                    <div className="bg-red-50/50 border border-red-500/10 p-4 rounded-xs mb-6 text-xs text-red-900 leading-relaxed font-light flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                      <div>
                        <strong>Plagiarism & Multiple Submissions Policy:</strong> Submissions must encompass original, unpublished research. Re-submitting papers currently undergoing active screening at other journals, venues, or symposia is strictly prohibited and triggers academic blocklisting.
                      </div>
                    </div>

                    <h4 className="text-[10px] uppercase font-mono font-bold tracking-wider text-accent-gold mb-3">Structured Outline Sequence:</h4>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-muted-gray font-light">
                      {["1. Broad Objective / Title", "2. Contextual Abstract", "3. Introducing Introduction", "4. Thematic Related Works", "5. Precise Methodology Setup", "6. Quantitative Outcomes/Discussion", "7. Future-Scope Conclusion", "8. 15 Recent Scholarly Refs"].map((sect, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-1.5 selection:bg-amber-15">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0" />
                          <span>{sect}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-[10px] text-muted-gray leading-normal italic mt-4 border-t border-divider-gold/20 pt-4">
                    *For unique submission exceptions or pages overages questions, contact the Publication Chair Prof. Dr. Arafatur Rahman.
                  </p>
                </div>

              </div>
            </div>
          )}


          {/* ----------------- TAB: BOARD & COMMITTEE ----------------- */}
          {activeTab === 'committee' && (
            <div className="animate-fade-in text-left">
              
              {/* Executive Board Hierarchy Grid */}
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h3 className="text-xs font-mono tracking-widest text-accent-gold uppercase mb-2">Scientific Board</h3>
                <h2 className="font-serif-display text-2.5xl font-bold text-primary-navy">
                  Organising Committee Members
                </h2>
                <div className="h-0.5 w-12 bg-accent-gold mx-auto mt-4" />
              </div>

              {isIcetcs ? (
                <div className="flex flex-col gap-10">
                  {/* Chairs Table Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { title: "Conference Patron", names: ["Prof. Dr. Prashant Pillai (University of Wolverhampton, UK)", "Prof. Dr. Mohammed Atiquzzaman (Hitachi Chair, University of Oklahoma, USA)"] },
                      { title: "General Chair(s)", names: ["Prof. Mario Marchese (University of Genoa, Italy)"] },
                      { title: "Executive General Chair", names: ["Prof. Dr. Arafatur Rahman (University of Wolverhampton, UK)"] },
                      { title: "Publicity Chairs", names: ["Prof. Dr. Kim-Kwang Raymond Choo (University of Texas at San Antonio, USA)", "Prof. Fabio Patrone (University of Genoa, Italy)"] },
                      { title: "Publicity Co-Chairs", names: ["Dr. Giovanni Gaggero (University of Genoa, Italy)", "Dr. Shancang Li (Cardiff University, UK)"] },
                      { title: "Publication Chairs", names: ["Dr. Nazmul Hussain (University of Nottingham, UK)", "Dr. Zakirul Alam Bhuiyan (Fordham University, USA)"] },
                      { title: "Program Chairs", names: ["Ihsan Ullah (National University of Ireland)", "Jasim Uddin (Cardiff Metropolitan University, UK)", "Dr. Adeel Rafiq (University of Wolverhampton, UK)"] },
                      { title: "TPC Chair", names: ["Dr. Rashed Al Amin (University of Siegen, Germany)"] },
                      { title: "Advisory Board", names: ["Sabira Khatun (RiTECHS)", "Md Rafiqul Islam (IIUM, Malaysia)", "A. H. M. Zahirul Alam (IIUM, Malaysia)", "Naveen Chilamkur (La Trobe University, Australia)"] },
                    ].map((role, rIdx) => (
                      <div key={rIdx} className="bg-white border border-divider-gold/45 p-6 rounded-xs shadow-xs relative flex flex-col justify-between">
                        <div className="w-1.5 h-12 bg-accent-gold absolute left-0 top-6" />
                        <div>
                          <span className="text-[10px] font-mono text-accent-gold uppercase font-bold tracking-wider block mb-2">{role.title}</span>
                          <div className="flex flex-col gap-3">
                            {role.names.map((name, nIdx) => (
                              <p key={nIdx} className="text-xs font-sans font-bold text-primary-navy leading-relaxed">
                                {name}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Interactive TPC Members Lookup Panel (1000x Advance aspect) */}
                  <div className="bg-white border border-divider-gold/55 p-8 rounded-xs shadow-sm mt-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-divider-gold/25 pb-6 mb-6">
                      <div>
                        <h4 className="font-serif-display font-extrabold text-[#0a182f] text-xl flex items-center gap-2">
                          <Users className="w-5.5 h-5.5 text-accent-gold" /> Technical Program Committee (TPC) Directory
                        </h4>
                        <p className="text-xs text-[#6B7280] font-light mt-1">
                          Showing {filteredTpc.length} distinguished reviewers checking manuscript alignments.
                        </p>
                      </div>

                      {/* Region Category filters */}
                      <div className="flex flex-wrap gap-1">
                        {["All", "Europe", "Americas", "Asia", "Middle East", "Oceania"].map((region) => (
                          <button
                            key={region}
                            onClick={() => setTpcRegionFilter(region)}
                            className={`px-3 py-1.5 border text-[10px] font-mono uppercase tracking-wider transition-colors ${
                              tpcRegionFilter === region 
                                ? 'bg-primary-navy border-primary-navy text-accent-gold font-bold' 
                                : 'border-divider-gold/55 text-muted-gray bg-transparent hover:bg-neutral-warm'
                            }`}
                          >
                            {region}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Search bar specifically for TPC members */}
                    <div className="relative max-w-md mb-8">
                      <Search className="w-4 h-4 text-accent-gold absolute left-3.5 top-3" />
                      <input 
                        type="text" 
                        placeholder="Filter TPC members by professor name, university, or country..."
                        value={tpcSearchQuery}
                        onChange={(e) => setTpcSearchQuery(e.target.value)}
                        className="w-full bg-neutral-warm/25 border border-divider-gold/55 pl-10 pr-4 py-2.5 text-xs outline-none focus:border-accent-gold transition-colors rounded-xs"
                      />
                    </div>

                    {/* Highly responsive TPC dynamic list board */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredTpc.map((member, mIdx) => (
                        <div key={mIdx} className="bg-neutral-warm/15 border border-divider-gold/15 p-4 rounded-xs flex gap-3 items-start group hover:border-[#C9A961]/45 transition-colors duration-300">
                          <div className="w-7 h-7 bg-primary-navy/5 text-[#A18241] rounded-full flex items-center justify-center shrink-0 text-[10px] font-mono font-extrabold uppercase">
                            {member.name.charAt(4) || member.name.charAt(0)}
                          </div>
                          <div className="text-left">
                            <h5 className="text-xs font-bold text-primary-navy font-sans tracking-tight">
                              {member.name}
                            </h5>
                            <p className="text-[10px] text-muted-gray mt-0.5 leading-snug font-light">{member.affiliation}</p>
                            <div className="flex gap-1.5 items-center mt-1">
                              <span className="text-[8px] bg-accent-gold/15 text-primary-navy font-mono px-1.5 font-bold uppercase tracking-wider rounded-xs">{member.role}</span>
                              <span className="text-[8px] text-[#9CA3AF] font-mono leading-none">{member.country}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* General Fallback layout */}
                  {activeConference.general_chairs && activeConference.general_chairs.length > 0 && (
                    <div className="bg-white border border-divider-gold/30 p-8 rounded-sm shadow-xs">
                      <h3 className="font-mono text-xs text-accent-gold uppercase tracking-widest mb-4 font-bold">
                        General Chair(s)
                      </h3>
                      <ul className="flex flex-col gap-3">
                        {activeConference.general_chairs.map((chair, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-sm text-primary-navy font-semibold font-serif-display">
                            <span className="w-1.5 h-1.5 bg-accent-gold rounded-full" />
                            {chair}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}


          {/* ----------------- TAB: KEYNOTE SPEAKERS ----------------- */}
          {activeTab === 'speakers' && (
            <div className="animate-fade-in text-left">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h3 className="text-xs font-mono tracking-widest text-[#A18241] uppercase mb-2">Academic Keynotes</h3>
                <h2 className="font-serif-display text-2.5xl font-bold text-primary-navy">
                  Distinguished Keynote Speakers
                </h2>
                <div className="h-0.5 w-12 bg-accent-gold mx-auto mt-4" />
              </div>

              {/* Dynamic Portait Grid with grayscale hover transition */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {isIcetcs ? (
                  ICETCS_KEYNOTE_SPEAKER_PROFILES.map((prof, pIdx) => (
                    <div 
                      key={pIdx} 
                      className="bg-white border border-divider-gold/45 p-6 flex flex-col sm:flex-row gap-6 shadow-xs hover:shadow-md transition-all duration-300 rounded-xs group text-left align-middle"
                    >
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xs overflow-hidden shrink-0 bg-charcoal/10 border border-divider-gold/35 relative">
                        <SafeImageWithSkeleton 
                          src={prof.image} 
                          alt={prof.name}
                          className="w-full h-full object-cover transition-all duration-[850ms] ease-out group-hover:scale-105"
                          fallbackSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
                          skeletonClassName="bg-primary-maroon-dark/60"
                        />
                      </div>

                      <div className="flex flex-col justify-between flex-grow">
                        <div>
                          <span className="text-[10px] font-mono text-accent-gold font-bold uppercase tracking-wider block">KEYNOTE PRESENTATION</span>
                          <h4 className="font-serif-display font-black text-primary-navy text-lg leading-tight mt-0.5 mb-1">
                            {prof.name}
                          </h4>
                          <p className="text-[11px] text-muted-gray uppercase font-mono leading-tight tracking-[0.05em] mb-3">
                            {prof.affiliation}
                          </p>
                          <p className="text-[12px] text-primary-navy font-serif-accent italic leading-relaxed font-semibold">
                            "{prof.topic}"
                          </p>
                        </div>
                        <p className="text-[11px] text-charcoal/80 font-light leading-relaxed mt-3 border-t border-divider-gold/15 pt-2.5">
                          {prof.desc}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  activeConference.speakers && activeConference.speakers.map((speaker, index) => (
                    <div key={index} className="flex flex-col sm:flex-row gap-6 items-center border border-divider-gold/30 p-6 bg-neutral-warm/40 group">
                      <div className="w-32 h-32 rounded-sm overflow-hidden shrink-0 bg-charcoal/10 border border-divider-gold relative">
                        <SafeImageWithSkeleton 
                          src={speaker.image} 
                          alt={speaker.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-[700ms]"
                          fallbackSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
                          skeletonClassName="bg-primary-maroon-dark/60"
                        />
                      </div>
                      <div className="text-center sm:text-left">
                        <span className="text-[10px] font-mono text-accent-gold uppercase tracking-wider font-bold">
                          {speaker.role}
                        </span>
                        <h3 className="font-serif-display text-lg text-primary-navy font-bold mt-1 mb-1">
                          {speaker.name}
                        </h3>
                        <p className="text-xs text-muted-gray font-mono font-medium tracking-wide uppercase">
                          {speaker.affiliation}
                        </p>
                        <p className="text-xs text-primary-navy/80 font-serif-accent italic font-light mt-3 leading-relaxed">
                          "{speaker.topic}"
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}


          {/* ----------------- TAB: REGISTRATION & STRIPE CHECKOUT ----------------- */}
          {activeTab === 'registration' && (
            <div className="animate-fade-in text-left">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h3 className="text-xs font-mono tracking-widest text-[#A18241] uppercase mb-2">Registration Rates</h3>
                <h2 className="font-serif-display text-2.5xl font-bold text-primary-navy">
                  Academic & Observer Passes
                </h2>
                <p className="text-xs text-muted-gray leading-normal mt-2 font-light">
                  Early Bird rates expire shortly. Register your CMT Accepted paper hash in our portal structure to lock in peer publication.
                </p>
              </div>

              {/* Pricing Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                  {
                    tier: "Early Bird Rate",
                    price: "€400",
                    term: "Local or Overseas",
                    benefits: [
                      "Full peer-review publication slot",
                      "Microsoft CMT accepted paper mapping",
                      "Full conference program & virtual grids access",
                      "Springer electronic manuscript compilation"
                    ],
                    active: true,
                    isFeatured: true
                  },
                  {
                    tier: "Regular Academic Rate",
                    price: "€450",
                    term: "Post Oct 1, 2026",
                    benefits: [
                      "Full presentation index link",
                      "Spring Gala networking dinner (Genoa)",
                      "Electronic & standard proceedings copy",
                      "Academic board certification"
                    ],
                    active: false
                  },
                  {
                    tier: "IEEE/ACM Student Rate",
                    price: "€290",
                    term: "Vetted Credentials Required",
                    benefits: [
                      "Mentorship pairing session access",
                      "Digital paper publication slot",
                      "Full workspace tools allocation",
                      "Virtual presentation channels link"
                    ],
                    active: false
                  }
                ].map((tier, idx) => (
                  <div 
                    key={idx} 
                    className={`border flex flex-col justify-between p-6 shadow-xs rounded-xs relative group ${
                      tier.isFeatured
                        ? 'border-accent-gold bg-[#0e1e38] text-white premium-noise'
                        : 'border-divider-gold bg-white text-charcoal'
                    }`}
                  >
                    {tier.isFeatured && (
                      <span className="absolute top-0 right-1/2 translate-x-1/2 translate-y-[-50%] bg-accent-gold text-primary-navy font-mono text-[8px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-sm text-center">
                        EARLY BIRD DECK
                      </span>
                    )}

                    <div>
                      <h4 className="text-xs font-mono tracking-widest uppercase mb-4 text-[#C9A961]/90 font-bold">
                        {tier.tier}
                      </h4>
                      <div className="flex items-baseline gap-1.5 mb-6 border-b border-divider-gold/25 pb-4">
                        <span className="font-serif-display text-4.5xl font-black">{tier.price}</span>
                        <span className="text-[11px] text-muted-gray">/ pass</span>
                      </div>
                      <p className="text-[10px] text-accent-gold/90 font-mono tracking-wide uppercase font-semibold mb-6">
                        Category: {tier.term}
                      </p>

                      <ul className="flex flex-col gap-3 text-xs mb-8">
                        {tier.benefits.map((b, bIdx) => (
                          <li key={bIdx} className="flex gap-2 items-start font-light leading-snug">
                            <Check className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => launchStripe(activeConference.name, tier.tier, tier.price)}
                      className={`w-full py-3 text-xs font-sans uppercase tracking-widest font-semibold cursor-pointer transition-all duration-300 rounded-sm ${
                        tier.isFeatured
                          ? 'bg-accent-gold text-primary-navy hover:bg-[#B3934B]'
                          : 'border border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white'
                      }`}
                    >
                      Process Pass Checkout
                    </button>
                  </div>
                ))}
              </div>

              {/* Eventbrite Ticket Booking Integration panel */}
              {isIcetcs && (
                <div className="bg-neutral-warm/30 border border-divider-gold p-6 rounded-xs flex flex-col sm:flex-row gap-6 items-center justify-between text-left shadow-xs">
                  <div className="max-w-xl">
                    <h4 className="font-serif-display font-medium text-lg text-primary-navy mb-2 flex items-center gap-1.5">
                      <Ticket className="w-5 h-5 text-accent-gold shrink-0" /> Manual External Booking option (Eventbrite)
                    </h4>
                    <p className="text-xs text-muted-gray leading-relaxed font-light">
                      If you prefer to book ticketing via an external credit processor platform, Eventbrite links are available below. Standard local taxes applying at checkout.
                    </p>
                  </div>
                  <a 
                    href="https://eventbrite.com/tickets-external?eid=18432753863&ref=etckt" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-3 bg-primary-navy border border-[#0d2242] text-accent-gold hover:text-white font-mono uppercase font-bold tracking-widest text-[11px] rounded-xs shrink-0 transition-colors text-center inline-flex items-center gap-2"
                  >
                    <span>External Eventbrite</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Dynamic Venue Access Sub-Deck */}
        <section className="py-12 bg-neutral-warm/25 border-t border-divider-gold/45 text-left bg-white">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h4 className="font-mono text-accent-gold text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <MapPinIcon className="w-4 h-4 shrink-0" /> Venue & Access Coordinates
              </h4>
              <p className="text-xs text-muted-gray leading-relaxed font-light">
                Sessions take place inside historical halls of the University of Genoa, Italy. Linked with real-time video streaming channels for remote presenters so that the academic dialogue continues continuously.
              </p>
              <div className="border border-divider-gold/30 rounded-xs mt-4 grid grid-cols-3 text-[10px] font-mono text-center overflow-hidden">
                <div className="bg-[#fbfcfa] p-2 border-r border-divider-gold/15">
                  <span className="text-[#9CA3AF] block uppercase">Network:</span>
                  <span className="text-primary-navy font-bold">RITECHS_WIFI</span>
                </div>
                <div className="bg-[#fbfcfa] p-2 border-r border-divider-gold/15">
                  <span className="text-[#9CA3AF] block uppercase">Plenary Room:</span>
                  <span className="text-primary-navy font-bold">Lecture Hall V</span>
                </div>
                <div className="bg-[#fbfcfa] p-2">
                  <span className="text-[#9CA3AF] block uppercase">Stream Portal:</span>
                  <span className="text-green-600 font-extrabold uppercase">LIVE</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h4 className="font-mono text-[#6B7280] text-xs font-bold uppercase tracking-wider mb-3">
                Co-Sponsoring Alliances & Academies
              </h4>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-serif-display font-medium text-primary-navy">
                {["Cardiff Univ", "UniGe Genoa", "Wolverhampton", "Airfield S&P"].map((all, aIdx) => (
                  <div key={aIdx} className="bg-white border border-divider-gold/25 p-3 rounded-xs shrink-0 flex items-center justify-center font-bold font-mono tracking-wider shadow-xs uppercase text-[9px] text-[#A18241]">
                    {all}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------
            UPGRADED SECURE CHECKOUT MODAL 
           ---------------------------------------- */}
        {stripeModalOpen && selectedTier && (
          <div className="fixed inset-0 bg-[#0a182f]/85 z-50 flex items-center justify-center p-6 backdrop-blur-sm">
            <div className="bg-white border border-accent-gold/45 w-full max-w-lg shadow-2xl relative animate-scale-up rounded-xs overflow-hidden">
              
              {/* Stripe Header bar */}
              <div className="bg-[#0a182f] p-6 text-white border-b border-accent-gold/20 flex justify-between items-center premium-noise">
                <div className="flex items-center gap-2">
                  <Shield className="w-5.5 h-5.5 text-accent-gold" />
                  <span className="font-serif-display text-[17px] font-bold tracking-tight">Stripe Secure Publication Intake</span>
                </div>
                <button 
                  onClick={() => setStripeModalOpen(false)}
                  className="text-white/60 hover:text-white text-base font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {!paymentSuccess ? (
                <form onSubmit={handlePay} className="p-8 flex flex-col gap-4 text-xs text-left">
                  <div className="bg-neutral-warm border border-divider-gold/45 p-4 rounded-xs mb-2">
                    <div className="text-[10px] uppercase font-mono tracking-widest text-[#A18241] font-bold">Secure Order details</div>
                    <div className="font-serif-display text-base font-bold text-primary-navy mt-1">
                      {selectedTier.confName} · {selectedTier.tier}
                    </div>
                    <div className="text-xl font-bold font-serif-display text-accent-gold mt-2 flex items-baseline gap-1">
                      {selectedTier.price} <span className="text-[9px] font-mono text-muted-gray uppercase italic tracking-normal">(Fully Vetted Rate)</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-primary-navy font-bold uppercase">Cardholder Scholar Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Prof. Arafatur Rahman" 
                        required 
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="border border-divider-gold p-3 bg-neutral-warm/20 font-sans text-xs focus:border-accent-gold outline-none rounded-xs"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-primary-navy font-bold uppercase">University Affiliation</label>
                      <input 
                        type="text" 
                        placeholder="e.g. University of Wolverhampton" 
                        required 
                        value={academicAffiliation}
                        onChange={(e) => setAcademicAffiliation(e.target.value)}
                        className="border border-divider-gold p-3 bg-neutral-warm/20 font-sans text-xs focus:border-accent-gold outline-none rounded-xs"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-primary-navy font-bold uppercase flex justify-between">
                      <span>Microsoft CMT Accepted Paper ID</span>
                      <span className="text-accent-gold text-[8px] transform uppercase font-sans tracking-tight">Requires matching hash value</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. ICETCS-2026-407 (Or 'Attendee-Observer')" 
                      required 
                      value={cmtPaperId}
                      onChange={(e) => setCmtPaperId(e.target.value)}
                      className="border border-divider-gold p-3 bg-neutral-warm/20 font-mono text-xs focus:border-accent-gold outline-none rounded-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-primary-navy font-bold uppercase">Card Credentials (STRIPE SANDBOX)</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="border border-divider-gold p-3 bg-neutral-warm/20 font-mono text-xs focus:border-accent-gold outline-none w-full rounded-xs pr-12"
                      />
                      <span className="absolute right-3 top-2 text-[8px] bg-accent-gold/20 text-[#A18241] px-1.5 py-1 font-mono font-black tracking-widest rounded-xs">TEST CARD</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-primary-navy font-bold uppercase">Expiry (MM/YY)</label>
                      <input 
                        type="text" 
                        placeholder="12/28" 
                        required 
                        maxLength={5}
                        className="border border-divider-gold p-3 text-center bg-neutral-warm/20 text-xs focus:border-accent-gold outline-none rounded-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-primary-navy font-bold uppercase">CVV / CVC Code</label>
                      <input 
                        type="password" 
                        placeholder="•••" 
                        required 
                        maxLength={4}
                        className="border border-divider-gold p-3 text-center bg-neutral-warm/20 text-xs focus:border-accent-gold outline-none rounded-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-accent-gold hover:bg-[#B3934B] text-primary-navy py-4 font-sans font-bold uppercase tracking-widest mt-4 text-xs transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    {isProcessing ? (
                      <div className="w-4 h-4 border-2 border-primary-navy/40 border-t-primary-navy rounded-full animate-spin" />
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" /> Finalize Publication Registration
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="p-8 text-center flex flex-col items-center gap-6 text-charcoal">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-600 border border-green-500/15 flex items-center justify-center animate-bounce">
                    <Check className="w-8 h-8 font-black" />
                  </div>
                  <div>
                    <h3 className="font-serif-display text-xl font-bold text-primary-navy">Intake Processed Successfully</h3>
                    <p className="text-xs text-muted-gray leading-relaxed font-light mt-2 max-w-sm mx-auto">
                      Your CMT accepted paper reference and credentials have been linked correctly. An official Springer copyright validation packet and registration receipt invoice has been routed to your associated email.
                    </p>
                  </div>
                  
                  {/* Detailed Invoice Receipt */}
                  <div className="bg-neutral-warm/60 border border-divider-gold/30 p-4 font-mono text-[11px] w-full text-left rounded-xs flex flex-col gap-1.5 shadow-inner">
                    <div><span className="text-muted-gray">Attendee Name:</span> <strong className="text-primary-navy">{cardHolder}</strong></div>
                    <div><span className="text-muted-gray">Affiliation:</span> {academicAffiliation}</div>
                    <div><span className="text-muted-gray">Linked Paper ID:</span> <span className="text-accent-gold font-bold">{cmtPaperId}</span></div>
                    <div><span className="text-muted-gray">Vested Tier:</span> {selectedTier.tier}</div>
                    <div><span className="text-muted-gray">Invoice Order:</span> INV-ICETCS-{Math.floor(Math.random() * 90000 + 10000)}</div>
                    <div><span className="text-muted-gray">Status Flag:</span> <span className="text-green-600 font-extrabold uppercase bg-green-500/10 px-1 py-0.5 rounded-xs">SECURED VIA STRIPE</span></div>
                  </div>
                  
                  <button
                    onClick={() => setStripeModalOpen(false)}
                    className="w-full bg-primary-navy text-white hover:bg-accent-gold hover:text-primary-navy py-3 uppercase text-xs tracking-widest font-semibold transition-colors rounded-sm cursor-pointer"
                  >
                    Return to Portal
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------
  // CONFERENCES PORTAL HUB MAIN VIEW
  // ----------------------------------------
  return (
    <div id="conferences-hub-view" className="pt-16 animate-fade-in-up text-white bg-maroon-dark min-h-screen">
      {/* Editorial Header */}
      <section className="bg-gradient-to-b from-[#2C0509] to-[#3D0C11] text-white py-12 lg:py-16 px-6 relative premium-noise overflow-hidden border-b border-accent-gold/25">
        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
          {/* Left Column: Clear premium academic headings */}
          <div className="lg:col-span-7 flex flex-col justify-center text-white">
            <span className="text-[10px] font-mono tracking-widest text-[#C9A961] uppercase font-bold bg-[#C9A961]/15 px-3 py-1.5 border border-[#C9A961]/30 rounded-full mb-4 inline-block self-start">
              Scientific Symposiums
            </span>
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 mt-2 text-white leading-tight animate-fade-in">
              The Conference Hub
            </h1>
            <p className="font-serif-accent text-sm sm:text-base lg:text-lg italic text-neutral-200 max-w-2xl leading-relaxed font-light">
              Providing index-linked platforms where cyber defense, advanced IoT grids, and sustainable energy methodologies meet peer recognition.
            </p>
          </div>

          {/* Right Column: Clear, unobstructed PNG background/banner image */}
          <div className="lg:col-span-5 w-full h-48 sm:h-64 lg:h-80 overflow-hidden relative border border-accent-gold/30 rounded-xs shadow-xl group bg-maroon-dark">
            <SafeImageWithSkeleton 
              src="/banner 3.png" 
              alt="Scholastic Campus Backdrop" 
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 opacity-80"
              fallbackSrc="https://images.unsplash.com/photo-1491841573176-0aa59e4b67ad?auto=format&fit=crop&q=80&w=1600"
              skeletonClassName="bg-maroon-light"
            />
            {/* Subtle elegant gold overlay/plaque line */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-maroon-dark/90 border border-accent-gold/45 text-accent-gold font-mono text-[8px] uppercase tracking-widest font-semibold rounded-xs shadow-xs">
              SYMPOSIUM DIRECTORY
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Search Toolbar */}
      <section className="py-6 bg-maroon-dark/95 border-b border-accent-gold/15 sticky top-16 z-20 shadow-xl backdrop-blur-md text-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          <div className="relative w-full lg:w-80 shrink-0">
            <Search className="w-4 h-4 text-accent-gold absolute left-3.5 top-3.5" />
            <input 
              type="text" 
              placeholder="Search by city, name, or track..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-primary-maroon/60 border border-accent-gold/25 focus:border-accent-gold outline-none text-xs text-white placeholder-neutral-400 font-mono transition-colors rounded-xs"
            />
          </div>

          {/* Real-time Category & Format selectors */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-end items-stretch sm:items-center">
            {/* Subject Area Categories */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-mono uppercase tracking-wider text-accent-gold/60 mr-1.5 self-center">Subject Area:</span>
              {(["All", "Cybersecurity", "Internet of Things"] as const).map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSubjectFilter(subject)}
                  className={`px-3 py-1.5 border text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer rounded-xs ${
                    subjectFilter === subject 
                      ? 'bg-accent-gold border-accent-gold text-primary-maroon font-bold shadow-xs' 
                      : 'border-accent-gold/15 bg-transparent text-neutral-300 hover:bg-primary-maroon hover:text-white hover:border-accent-gold/30'
                  }`}
                >
                  {subject === "Internet of Things" ? "IoT" : subject}
                </button>
              ))}
            </div>

            {/* Attendance Format */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] font-mono uppercase tracking-wider text-accent-gold/60 mr-1.5 self-center">Format:</span>
              {(["All", "Hybrid", "In-Person"] as const).map((format) => (
                <button
                  key={format}
                  onClick={() => setFormatFilter(format)}
                  className={`px-3 py-1.5 border text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer rounded-xs ${
                    formatFilter === format 
                      ? 'bg-accent-gold border-accent-gold text-primary-maroon font-bold shadow-xs' 
                      : 'border-accent-gold/15 bg-transparent text-neutral-300 hover:bg-primary-maroon hover:text-white hover:border-accent-gold/30'
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Conference Grid List */}
      <FadeUpSection className="py-20 max-w-5xl mx-auto px-6">
        {filteredConferences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredConferences.map((conf) => (
              <ConferenceCard 
                key={conf.slug}
                conf={conf}
                onNavigate={onNavigate}
                searchTerm={searchTerm}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-primary-maroon/40 border border-dashed border-accent-gold/20 rounded-sm">
            <Info className="w-8 h-8 text-accent-gold/60 mx-auto mb-4" />
            <h3 className="font-serif-display text-lg text-white font-bold">No conferences match criteria</h3>
            <p className="text-xs text-neutral-300 mt-1 max-w-sm mx-auto font-light leading-relaxed">
              Adjust filters or clear your search term to explore our upcoming index-linked editions.
            </p>
          </div>
        )}
      </FadeUpSection>
    </div>
  );
}
