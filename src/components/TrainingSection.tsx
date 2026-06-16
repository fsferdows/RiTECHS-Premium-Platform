import { useState } from 'react';
import { BookOpen, BookOpenCheck, Clock, Award, Users, CheckCircle2, Search, ArrowRight } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  hours: number;
  category: string;
  instructor: string;
  desc: string;
  syllabus: string[];
}

export default function TrainingSection() {
  const [selectedCourse, setSelectedCourse] = useState<string>('c1');
  const [isReserved, setIsReserved] = useState<boolean>(false);
  const [reservedCourseTitle, setReservedCourseTitle] = useState<string>('');

  const courses: Course[] = [
    {
      id: 'c1',
      title: "Cyber Security awareness & Peer Publication (Cyber4Me)",
      hours: 48,
      category: "Cybersecurity & Cryptography",
      instructor: "Dr. Nadia Refat, PhD",
      desc: "Delve into hands-on student-led networks, vulnerability scanning, and cryptographic defenses. Learn the mechanics of structural drafts for IEEE and ACM symposia.",
      syllabus: ["Fundamentals of vulnerability assessments", "Writing secure cryptographic summaries", "Paper formatting & submission strategies"]
    },
    {
      id: 'c2',
      title: "Decentralized Microgrid Load Balancing & Batteries",
      hours: 64,
      category: "Energy & Electronics",
      instructor: "Prof. Nazmus Sadat, PhD",
      desc: "An in-depth modeling class covering battery lifecycle diagnostics, edge neural grids, piezo-electric energy harvesting, and load-balancing math telemetry.",
      syllabus: ["Piezo-electric mathematical layouts", "Edge IoT hardware backhaul mechanics", "Writing Q1 energy journals drafting"]
    },
    {
      id: 'c3',
      title: "IEEE/Springer LaTeX Writing & Formatting Mastery",
      hours: 32,
      category: "Academic Methodology",
      instructor: "Prof. Nadia Refat",
      desc: "Master the exact mechanics of international peer review. Learn to layout formulas, create complex matrices bibliography systems, and design high-DPI graphics.",
      syllabus: ["LaTeX mathematical notation modeling", "Optimal figures scaling & vector plotting", "Responding to editorial review comments"]
    }
  ];

  const handleEnroll = (title: string) => {
    setReservedCourseTitle(title);
    setIsReserved(true);
    setTimeout(() => {
      setIsReserved(false);
    }, 4500);
  };

  const activeCourse = courses.find(c => c.id === selectedCourse) || courses[0];

  return (
    <section id="training-section" className="py-16 bg-maroon-dark text-white border-b border-accent-gold/15">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Layout Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end text-left">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-accent-gold uppercase font-bold bg-accent-gold/10 px-3 py-1 border border-accent-gold/20 rounded-full inline-block mb-3">
              RI-TECHS SCHOLAR TRAINING
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4.5xl text-white font-bold leading-tight">
              High-Quality, Peer-Reviewed Online Courses
            </h2>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              The RiTECHS training delivers high-quality, peer-reviewed online courses on a variety of topics. There are many course hours in core and emerging technologies delivered by RiTECHS, offering professionals, professors, and students from academic institutions a better method to learn.
            </p>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light mt-3">
              Researchers may utilize RiTECHS training to quickly remain up to date on the newest advancements in relevant technologies, increasing collaboration with other research teams. These courses were created by accredited specialists in a variety of engineering and research technologies.
            </p>
          </div>
        </div>

        {/* Dynamic Learning Portal Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Courses Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-gold font-bold block mb-2 text-left">
              Select Emerging Technologies Catalog
            </span>
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => { setSelectedCourse(course.id); setIsReserved(false); }}
                className={`p-5 text-left border rounded-xs transition-all flex flex-col gap-2 relative cursor-pointer ${
                  selectedCourse === course.id
                    ? 'border-accent-gold bg-primary-maroon shadow-lg text-white'
                    : 'border-accent-gold/20 bg-maroon-dark hover:bg-primary-maroon/50 text-neutral-300'
                }`}
              >
                {selectedCourse === course.id && (
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-accent-gold animate-ping" />
                )}
                <div className={`flex justify-between items-center text-[10px] font-mono ${
                  selectedCourse === course.id ? 'text-accent-gold' : 'text-neutral-400'
                }`}>
                  <span>{course.category}</span>
                  <span className="flex items-center gap-1 text-accent-gold font-bold">
                    <Clock className="w-3 h-3" /> {course.hours} Hours
                  </span>
                </div>
                <h4 className="font-serif-display text-sm font-bold text-white leading-snug">
                  {course.title}
                </h4>
                <div className="text-[11px] text-neutral-400">By {course.instructor}</div>
              </button>
            ))}
          </div>

          {/* Core Selected course Details Pane */}
          <div className="lg:col-span-7 bg-primary-maroon border border-accent-gold/25 p-8 rounded-xs relative text-white shadow-xl text-left">
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-[9px] font-mono uppercase text-accent-gold font-bold tracking-widest">
                  Active Syllabus Explorer
                </span>
                <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-white mt-1 leading-snug">
                  {activeCourse.title}
                </h3>
              </div>
              <BookOpen className="w-8 h-8 text-accent-gold/30" />
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light mb-6">
              {activeCourse.desc}
            </p>

            <div className="bg-maroon-dark/65 border border-accent-gold/15 p-5 mb-6 rounded-xs">
              <span className="font-mono text-[9px] text-accent-gold font-bold uppercase tracking-wider block mb-3">
                Accredited Syllabus Chapters
              </span>
              <div className="flex flex-col gap-2.5">
                {activeCourse.syllabus.map((chapter, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start text-xs text-neutral-200 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                    <span>{chapter}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-accent-gold/15 pt-6">
              <div>
                <p className="text-[10px] font-mono text-neutral-300 uppercase">Sponsor Vetting Authority</p>
                <div className="font-serif-display text-xs font-bold text-white">
                  RiTECHS Peer-Review & Accreditation Committee
                </div>
              </div>

              <button
                onClick={() => handleEnroll(activeCourse.title)}
                className="bg-accent-gold hover:bg-[#B3934B] text-primary-maroon py-3 px-6 text-xs uppercase tracking-widest font-sans font-bold transition-all shrink-0 rounded-xs cursor-pointer shadow-md"
              >
                Reserve Seat Now
              </button>
            </div>

            {/* Reserved notification banner */}
            {isReserved && (
              <div className="absolute inset-0 bg-primary-maroon/95 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center animate-fade-in text-white rounded-sm">
                <BookOpenCheck className="w-12 h-12 text-accent-gold mb-3 animate-bounce" />
                <h4 className="font-serif-display text-lg font-bold text-white mb-1">Reservation Confirmed!</h4>
                <p className="text-xs text-white/70 max-w-sm leading-relaxed mb-4">
                  You have successfully reserved a seat for: <br /><strong>{reservedCourseTitle}</strong>. An email connection package will be sent to your inbox.
                </p>
                <button
                  onClick={() => setIsReserved(false)}
                  className="text-xs font-mono text-accent-gold select-none font-bold uppercase tracking-wider underline hover:text-white transition-colors cursor-pointer"
                >
                  Close panel
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
