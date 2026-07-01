import React from "react";
import SupplyChainSculpture, { LiveAuditProgress, IncrementingMetric } from "@/components/SupplyChainSculpture";
import { ShieldCheck, ArrowRight, Radio } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F9F9FB] text-[#111115] selection:bg-indigo-100 relative">
      
      {/* --- GLOBAL FIXED HEADER --- */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-md fixed top-0 left-0 right-0 z-50 px-6 lg:px-16 py-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-indigo-50 to-amber-500 flex items-center justify-center text-white font-bold text-xs">Ψ</div>
          <span className="font-bold text-xs tracking-tight uppercase">Industrial Synthesis</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-tight uppercase text-gray-300">
          <a href="#sculpture" className="hover:text-white transition-colors">The Core Matrix</a>
          <a href="#problems" className="hover:text-white transition-colors">Friction Logs</a>
          <a href="#audit" className="hover:text-white transition-colors">The Entry Audit</a>
          <a href="#results" className="hover:text-white transition-colors">Validated ROI</a>
        </nav>
        <a href="#cta" className="text-[11px] font-bold uppercase tracking-wider px-4 py-2 bg-white text-black rounded-lg hover:bg-indigo-50 transition-all">
          Book Audit
        </a>
      </header>

      {/* --- SCENE 1: CINEMATIC FULL-SCREEN AMBIENT HERO --- */}
      <section className="relative w-full h-screen flex items-center overflow-hidden bg-black text-white px-6 lg:px-16">
        
        {/* Hardware-Accelerated Background Video Canvas */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none">
          {/* Left-to-right fade to protect text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent z-10" />
          
          {/* CRITICAL RECONCILIATION: Reduced bottom fog matrix layout to expose the circuit art */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#F9F9FB]/10 z-10" />
          
          <video 
            className="w-full h-full object-cover opacity-60 scale-[1.01]"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src="/hero-telemetry.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Floating Strategy Console Layer */}
        <div className="relative z-20 max-w-4xl w-full flex flex-col text-left mt-12">
          
          <h1 className="text-4xl lg:text-7xl font-bold font-sans tracking-tight leading-[1.04] mb-6 drop-shadow-sm max-w-3xl">
            We eliminate industrial cost leaks with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300">deterministic AI</span> workflows.
          </h1>
          <p className="text-sm text-gray-300 max-w-xl leading-relaxed mb-8 font-body">
            We engineer high-yield telemetry data-layers directly across your facility floor sensor loops and warehouse databases to halt unbudgeted cost bleeding.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#audit" className="px-6 py-3.5 bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-indigo-500 transition-all shadow-lg flex items-center gap-2 group">
              Secure an AI Workflow Audit <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a href="#sculpture" className="px-6 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/20 transition-all">
              Initialize Interactive Sculpture
            </a>
          </div>
        </div>

        {/* Bottom Scroll Indicator Anchors */}
        <div className="absolute bottom-8 left-6 lg:left-16 z-20 flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Core Decision Matrix // Running Active 60FPS</span>
        </div>
      </section>

      {/* --- SCENE 2: COMPLIANCE INDICATOR CONSOLE STRIP --- */}
      <section className="border-b border-gray-100 bg-white py-6 px-6 lg:px-16 text-center">
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-indigo-500" /> Isolated Data Vaulting</div>
          <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-indigo-500" /> ISO 9001 Alignment Verified</div>
          <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-indigo-500" /> Hardened Process Frameworks</div>
          <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-indigo-500" /> Human-Guarded safety limiters</div>
        </div>
      </section>

      {/* --- SCENE 3: THE LIVING SCULPTURE HUB --- */}
      <section id="sculpture" className="px-6 lg:px-16 py-24 max-w-7xl mx-auto scroll-mt-12">
        <div className="mb-12 max-w-2xl text-left">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">Interactive Consulting Simulator</span>
          <h2 className="text-2xl lg:text-4xl font-bold mt-2 text-[#111115]">Explore our multi-node process orchestration mapping.</h2>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            Hover over any processing module spoke below to visualize exactly how custom operational models communicate instantly with our primary AI Agent Decision Hub.
          </p>
        </div>
        <SupplyChainSculpture />
      </section>

      {/* --- SCENE 4: SYSTEM FRICTION / LEAK LOGS --- */}
      <section id="problems" className="px-6 lg:px-16 py-12 max-w-7xl mx-auto">
        <div className="mb-12 max-w-xl">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">System Friction Logs</span>
          <h2 className="text-2xl lg:text-4xl font-bold mt-2 text-[#111115]">Where manual latency bleeds mid-market operational margins.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0px_4px_16px_rgba(0,0,0,0.01)] relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Procurement & Stock Gaps</h4>
            <h3 className="text-base font-bold mt-2 text-[#111115]">Manual sheet updates trigger high-cost emergency purchasing loops.</h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">Checking stocks by hand once a week leaves buying clerks blind to supplier delivery profiles until components fail to arrive. (~RM 180K/year lost to emergency buying)</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0px_4px_16px_rgba(0,0,0,0.01)] relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Logistics Routing Gaps</h4>
            <h3 className="text-base font-bold mt-2 text-[#111115]">Phone-based dispatching cross-tracks vehicles and wastes driver fuel.</h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">Scheduling 40 multi-stop routes from memory forces trucks to run half-empty, trapping fleet vehicle capacity and delaying invoices. (~18% excess fuel + driver-hours)</p>
          </div>
        </div>
      </section>

      {/* --- SCENE 5: THE AUDIT CONTRACT PROTOCOL --- */}
      <section id="audit" className="bg-white border-y border-gray-100 py-24 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">The Entry Blueprint</span>
            <h2 className="text-2xl lg:text-4xl font-bold mt-1 text-[#111115]">The AI Workflow Audit Protocol</h2>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              We eliminate corporate risk barriers. We don't demand major initial engineering contract overrides. We benchmark your real floor leaks first through a low-profile standalone analysis.
            </p>
          </div>
          <LiveAuditProgress />
          <div className="mt-12 p-6 rounded-2xl bg-[#F9F9FB] border border-gray-100 flex flex-wrap items-center justify-between gap-6 max-w-4xl mx-auto">
            <div>
              <h4 className="text-xs font-bold uppercase text-[#111115]">Ready to evaluate your facility's tracking layers?</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">S$2,000 – S$2,500 fixed upfront pricing based on plant scale. Completed in days.</p>
            </div>
            <a href="#cta" className="px-4 py-2.5 bg-[#111115] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg hover:bg-indigo-600 transition-all shadow-sm">
              Secure Consultation Path
            </a>
          </div>
        </div>
      </section>

      {/* --- SCENE 6: ROI METRICS GRID --- */}
      <section id="results" className="px-6 lg:px-16 py-20 max-w-7xl mx-auto">
        <div className="mb-12 max-w-xl">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">Quantified System Metrics</span>
          <h2 className="text-2xl lg:text-4xl font-bold mt-2 text-[#111115]">Measurable capacity returns live across ASEAN supply paths.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <IncrementingMetric label="Procurement Saved" value={140000} prefix="RM" suffix="/yr" desc="Halted margin leakages by matching raw sensor stocks directly to auto-PO blueprints." />
          <IncrementingMetric label="Capacity Recovered" value={7} suffix="% Net" desc="Reclaimed lost scheduling hours by adjusting lines dynamically to active rush logs." />
          <IncrementingMetric label="Logistics Optimization" value={15} suffix="% Cut" desc="Lowered vehicle fuel burn by clustering delivery stops inside clear 2-minute vectors." />
          <IncrementingMetric label="Billing Velocity" value={0} suffix=" Lag" desc="Achieved same-day processing by linking mobile signatures straight to accounting pools." />
        </div>
      </section>

      {/* --- SCENE 7: CALL TO ACTION --- */}
      <section id="cta" className="px-6 lg:px-16 py-20 max-w-5xl mx-auto text-center">
        <div className="p-8 lg:p-12 bg-white rounded-3xl border border-gray-100 shadow-[0px_8px_32px_rgba(0,0,0,0.01)] relative overflow-hidden">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">Secure System Assessment</span>
          <h2 className="text-3xl lg:text-5xl font-bold font-sans tracking-tight mt-2 mb-4 text-[#111115]">
            Initialize your facility's <span className="text-indigo-600">Workflow Audit</span>.
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed mb-8">
            Put our strategy engineers on your floor floor for 2–3 days. We will map out your exact data flows, expose operational drag, and build your custom automation business case.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Enter corporate email node..." 
              className="flex-1 px-4 py-3 text-xs bg-[#F9F9FB] border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <button className="px-5 py-3 bg-[#111115] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl hover:bg-indigo-600 transition-all shrink-0">
              Request On-Site Diagnostics
            </button>
          </div>
        </div>
      </section>

      {/* --- GLOBAL FOOTER PANEL --- */}
      <footer className="border-t border-gray-100 bg-white py-8 px-6 text-center text-[10px] font-bold uppercase tracking-wider text-gray-400">
        &copy; {new Date().getFullYear()} Industrial Synthesis Firm. Engineered for Enterprise Operational Yield. All System Paths Secured.
      </footer>
    </main>
  );
}