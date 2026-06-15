import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, BookOpen, ToggleRight, X, ChevronUp, ChevronDown, CheckCircle, Flame, Send, ArrowRight, Loader } from 'lucide-react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'proof' | 'consult' | 'match'>('proof');
  const [inputVal, setInputVal] = useState('');
  const [targetVenue, setTargetVenue] = useState('IEEE Transactions');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Chat memory state for 'consult' tab
  const [chatLog, setChatLog] = useState<{ sender: 'user' | 'assistant'; text: string }[]>([
    { sender: 'assistant', text: "Welcome scholar. I am your RiTECHS Academic Copilot. Input an abstract, ask a question about your LaTeX formulas, or let's target matching journal venues." }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLog]);

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    setLoading(true);
    setResult(null);

    const backupInput = inputVal;

    if (activeTab === 'consult') {
      // Append user message to log
      setChatLog(prev => [...prev, { sender: 'user', text: backupInput }]);
      setInputVal('');
    }

    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: backupInput,
          type: activeTab === 'proof' ? 'abstract' : activeTab === 'match' ? 'matchmaker' : 'chat',
          extra: activeTab === 'proof' ? targetVenue : undefined
        })
      });

      if (!response.ok) {
        throw new Error("Advisory signal intercepted or lost. Please try again.");
      }

      const data = await response.json();
      const aiReply = data.result || "Scholar, my assessment is compiled but returned empty. Please refine your context.";

      if (activeTab === 'consult') {
        setChatLog(prev => [...prev, { sender: 'assistant', text: aiReply }]);
      } else {
        setResult(aiReply);
      }
    } catch (err: any) {
      const errorMsg = err.message || "Unable to establish communication with the academic mainframe.";
      if (activeTab === 'consult') {
        setChatLog(prev => [...prev, { sender: 'assistant', text: errorMsg }]);
      } else {
        setResult(`⚠️ **Error:** ${errorMsg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSample = () => {
    if (activeTab === 'proof') {
      setInputVal(
        "This project introduces a new secure framework optimized to utilize artificial intelligence structures inside dynamic microgrid loads. We leverage lightweight cryptographic keys to ensure state integrity during edge computations. Initial testing exhibits low overhead."
      );
    } else if (activeTab === 'match') {
      setInputVal("Research focusing on low-latency spectrum allocations, next-generation 6G cellular network modeling, and decentralized ledger encryption.");
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Floating Sparkle Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto flex items-center gap-3 bg-gradient-to-r from-primary-navy to-[#1a2f64] border-2 border-accent-gold/40 hover:border-accent-gold text-accent-gold px-4 py-3 rounded-full shadow-2xl transition-all hover:scale-105 group active:scale-95"
          title="Open Academic Copilot"
          id="ai-assistant-toggle-trigger"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-accent-gold animate-pulse text-yellow-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-yellow-400 rounded-full animate-ping" />
          </div>
          <span className="font-mono text-[10px] tracking-widest uppercase font-bold pr-1 select-none">
            ACADEMIC COPILOT
          </span>
        </button>
      )}

      {/* Embedded Luxury Panel */}
      {isOpen && (
        <div
          id="ai-academic-companion-panel"
          className="pointer-events-auto bg-primary-navy/95 border border-accent-gold/30 w-[350px] sm:w-[420px] max-h-[85vh] rounded-md shadow-2xl backdrop-blur-md text-white flex flex-col overflow-hidden animate-scale-up"
        >
          {/* Header Panel */}
          <div className="bg-gradient-to-r from-[#0d1b3e] to-[#1e3264] border-b border-accent-gold/20 p-4 flex justify-between items-center select-none">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent-gold/15 border border-accent-gold flex items-center justify-center text-accent-gold">
                <Sparkles className="w-4 h-4 text-accent-gold" />
              </div>
              <div className="text-left">
                <span className="text-[9px] font-mono tracking-widest text-[#C9A961] uppercase font-bold leading-none block">
                  RITECHS ELITE SERVICES
                </span>
                <h4 className="font-serif-display text-xs font-bold text-white tracking-widest uppercase">
                  Academic Copilot
                </h4>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-accent-gold transition-colors p-1"
              title="Close Panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Tab Selector Segment */}
          <div className="flex border-b border-white/5 bg-[#0a1532] text-[10px] select-none">
            <button
              onClick={() => { setActiveTab('proof'); setResult(null); setInputVal(''); }}
              className={`flex-1 py-3 text-center font-mono uppercase tracking-wider font-bold border-b-2 transition-all ${
                activeTab === 'proof' ? 'border-accent-gold text-accent-gold bg-[#C9A961]/5' : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              Proofreader
            </button>
            <button
              onClick={() => { setActiveTab('consult'); setResult(null); setInputVal(''); }}
              className={`flex-1 py-3 text-center font-mono uppercase tracking-wider font-bold border-b-2 transition-all ${
                activeTab === 'consult' ? 'border-accent-gold text-accent-gold bg-[#C9A961]/5' : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              Consult AI
            </button>
            <button
              onClick={() => { setActiveTab('match'); setResult(null); setInputVal(''); }}
              className={`flex-1 py-3 text-center font-mono uppercase tracking-wider font-bold border-b-2 transition-all ${
                activeTab === 'match' ? 'border-accent-gold text-accent-gold bg-[#C9A961]/5' : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              Matchmaker
            </button>
          </div>

          {/* Active Area Workspace */}
          <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-4 text-xs">
            {activeTab === 'proof' && (
              <div className="flex flex-col gap-3 text-left">
                <div className="bg-white/5 border border-white/10 p-3 rounded-[2px] leading-relaxed text-white/80 select-none">
                  🔬 Paste your research drafts below, specify your target template format (e.g. <strong>IEEE</strong>, <strong>Springer</strong>, <strong>Nature</strong>), and get elite structural refinement.
                </div>

                <div className="flex flex-col gap-1 select-none">
                  <label className="text-[9px] uppercase tracking-widest text-[#C9A961]/80 font-mono font-bold">Target Publisher Profile</label>
                  <select
                    value={targetVenue}
                    onChange={(e) => setTargetVenue(e.target.value)}
                    className="bg-[#0b1736] border border-accent-gold/25 text-white p-2 text-xs focus:border-accent-gold outline-none"
                  >
                    <option value="IEEE Transactions">IEEE Transactions Format</option>
                    <option value="Springer Nature Link">Springer Journal Blueprint</option>
                    <option value="ACM Computing Surveys">ACM Computing Surveys Template</option>
                    <option value="Q1 AIoT-RSE Global">AIoT-RSE Hybrid Forum</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] uppercase tracking-widest text-[#C9A961]/80 font-mono font-bold select-none">Draft Abstract</label>
                    <button
                      type="button"
                      onClick={handleSelectSample}
                      className="text-[9px] text-accent-gold hover:underline font-mono"
                    >
                      Use Sample Manuscript
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Enter your summary abstract here..."
                    className="w-full bg-[#0b1736] border border-white/10 p-3 text-xs outline-none focus:border-accent-gold transition-colors text-white resize-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'consult' && (
              <div className="flex-grow flex flex-col gap-3 min-h-[180px] max-h-[30vh] overflow-y-auto bg-black/20 p-3 border border-white/10 text-left">
                {chatLog.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[8px] font-mono tracking-widest text-[#C9A961]/70 uppercase font-bold mb-0.5 select-none">
                      {msg.sender === 'user' ? 'Scholar' : 'RiTECHS Elite Copilot'}
                    </span>
                    <div className={`p-2.5 rounded-sm max-w-[85%] leading-relaxed ${
                      msg.sender === 'user' ? 'bg-[#C9A961] text-primary-navy font-medium' : 'bg-white/5 border border-white/10 text-white/90'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
            )}

            {activeTab === 'match' && (
              <div className="flex flex-col gap-3 text-left">
                <div className="bg-white/5 border border-white/10 p-3 rounded-[2px] leading-relaxed text-white/80 select-none">
                  🧭 Specify your research's primary theme keywords (e.g. <em>TinyML grid load, Cybersecurity cryptosystems, 6G</em>) and our pipeline will align them with corresponding events.
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] uppercase tracking-widest text-[#C9A961]/80 font-mono font-bold select-none">Scientific Keywords</label>
                    <button
                      type="button"
                      onClick={handleSelectSample}
                      className="text-[9px] text-accent-gold hover:underline font-mono"
                    >
                      Fill sample keyword
                    </button>
                  </div>
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Decentralized identity systems, smart grids..."
                    className="w-full bg-[#0b1736] border border-white/10 p-3 text-xs outline-none focus:border-accent-gold transition-colors text-white"
                  />
                </div>
              </div>
            )}

            {/* General Submission Actions */}
            {activeTab !== 'consult' && (
              <button
                onClick={handleAction}
                disabled={loading || !inputVal.trim()}
                className="w-full bg-accent-gold hover:bg-[#B3934B] text-primary-navy hover:text-black py-3 uppercase tracking-widest font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-40 select-none"
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin text-primary-navy" />
                    Assembling Analysis...
                  </>
                ) : (
                  <>
                    Run Assessment Pipeline
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}

            {/* Generated output visualization */}
            {result && (
              <div className="bg-[#0b1736] border border-accent-gold/40 p-4 leading-relaxed text-left text-white/95 max-h-[35vh] overflow-y-auto text-xs prose-premium whitespace-pre-wrap select-text">
                <div className="text-[10px] uppercase tracking-widest font-mono text-accent-gold font-bold mb-2 select-none">
                  ★ ADVISORY CLASSIFICATION REPORT:
                </div>
                {result}
              </div>
            )}
          </div>

          {/* Chat input for consult tab */}
          {activeTab === 'consult' && (
            <form onSubmit={handleAction} className="p-3 border-t border-white/10 bg-[#0a1532] flex gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask any journal writing support question..."
                className="flex-grow bg-[#050c1f] text-white border border-white/10 px-3 py-2 text-xs outline-none focus:border-accent-gold"
              />
              <button
                type="submit"
                disabled={loading || !inputVal.trim()}
                className="bg-accent-gold hover:bg-[#B3934B] text-primary-navy px-4 py-2 font-mono uppercase tracking-wider font-bold text-[10px] flex items-center gap-1 hover:text-black active:scale-95 disabled:opacity-30"
              >
                {loading ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </form>
          )}

        </div>
      )}
    </div>
  );
}
