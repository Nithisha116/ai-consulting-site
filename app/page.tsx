"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SupplyChainSculpture, { LiveAuditProgress, IncrementingMetric } from "@/components/SupplyChainSculpture";
import OperationalCapabilities from "@/components/OperationalCapabilities";
import { ShieldCheck, ArrowRight, Radio } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayGlowRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);
  const paraRef = useRef<HTMLDivElement>(null);
  const btnGroupRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const scrollSceneRef = useRef<HTMLDivElement>(null);

  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string; speedX: number; speedY: number }>>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 20 };
  const textX = useSpring(mouseX, springConfig);
  const textY = useSpring(mouseY, springConfig);

  const glowX = useSpring(mouseX, { stiffness: 45, damping: 18 });
  const glowY = useSpring(mouseY, { stiffness: 45, damping: 18 });

  const bgX = useSpring(mouseX, { stiffness: 20, damping: 15 });
  const bgY = useSpring(mouseY, { stiffness: 20, damping: 15 });

  useEffect(() => {
    const colors = ["#6366F1", "#D4AF37", "#FFFFFF"];
    const generated = Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 0.04,
      speedY: (Math.random() - 0.5) * 0.04,
    }));
    setParticles(generated);

    let animationFrameId: number;
    const updateParticles = () => {
      setParticles((prev) =>
        prev.map((p) => {
          let nx = p.x + p.speedX;
          let ny = p.y + p.speedY;
          if (nx > 100) nx = 0;
          if (nx < 0) nx = 100;
          if (ny > 100) ny = 0;
          if (ny < 0) ny = 100;
          return { ...p, x: nx, y: ny };
        })
      );
      animationFrameId = requestAnimationFrame(updateParticles);
    };
    animationFrameId = requestAnimationFrame(updateParticles);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / 120;
      const y = (e.clientY - innerHeight / 2) / 120;
      
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      videoRef.current.play().catch(() => {});
      
      gsap.to(videoRef.current, {
        scale: 1.04,
        duration: 20,
        ease: "power1.inOut",
        repeat: -Infinity,
        yoyo: true
      });
    }

    const tl = gsap.timeline();

    tl.to(overlayGlowRef.current, {
      opacity: 0.15,
      duration: 1.2,
      ease: "power2.out"
    }, 0.15);

    tl.fromTo(badgeRef.current, 
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.8, ease: "elastic.out(1, 0.75)" },
      0.25
    );

    if (line1Ref.current) {
      const textSpan = line1Ref.current.querySelector(".reveal-text-span");
      tl.fromTo(textSpan, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.55);
    }

    if (line2Ref.current) {
      const textSpan = line2Ref.current.querySelector(".reveal-text-span");
      tl.fromTo(textSpan, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 0.95);
    }

    if (line3Ref.current) {
      const textSpan = line3Ref.current.querySelector(".gradient-text-span");
      tl.fromTo(textSpan, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 1.35);
      tl.fromTo(textSpan,
        { filter: "drop-shadow(0px 0px 0px rgba(99,102,241,0))" },
        { 
          filter: "drop-shadow(0px 0px 14px rgba(99,102,241,0.8))", 
          duration: 0.5, 
          ease: "power2.out",
          onComplete: () => {
            gsap.to(textSpan, {
              filter: "drop-shadow(0px 0px 8px rgba(212,175,55,0.5))",
              duration: 0.6,
              ease: "power1.inOut"
            });
          }
        }, 
        1.55
      );
    }

    if (line4Ref.current) {
      const textSpan = line4Ref.current.querySelector(".reveal-text-span");
      tl.fromTo(textSpan, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, 1.75);
      tl.fromTo(line4Ref.current,
        { scale: 0.98 },
        { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" },
        1.75
      );
    }

    tl.fromTo(paraRef.current,
      { opacity: 0, y: 25, filter: "blur(8px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power2.out" },
      2.10
    );

    tl.fromTo(btnGroupRef.current,
      { opacity: 0, scale: 0.92, y: 25 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "elastic.out(1, 0.75)" },
      2.35
    );

    tl.fromTo(indicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      2.80
    );

    const shimmerTl = gsap.timeline({ repeat: -Infinity, repeatDelay: 12 });
    shimmerTl.to(".gradient-text-span", {
      backgroundPosition: "200% center",
      duration: 2.2,
      ease: "power2.inOut"
    });

    if (scrollSceneRef.current) {
      gsap.to(scrollSceneRef.current, {
        scrollTrigger: {
          trigger: scrollSceneRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
        y: -120,
        opacity: 0.15,
        ease: "none"
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-[#F9F9FB] text-[#111115] selection:bg-indigo-100 relative overflow-x-hidden">
      
      {/* --- GLOBAL HEADER CONSOLE --- */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-md fixed top-0 left-0 right-0 z-50 px-6 lg:px-16 py-4 flex justify-between items-center text-white will-change-transform">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-indigo-50 to-amber-500 flex items-center justify-center text-white font-bold text-xs">Ψ</div>
          <span className="font-bold text-xs tracking-tight uppercase">Industrial Synthesis</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-tight uppercase text-gray-300">
          <a href="#sculpture" className="hover:text-white transition-colors">The Core Matrix</a>
          <a href="#problems" className="hover:text-white transition-colors">Friction Logs</a>
          <a href="#capabilities" className="hover:text-white transition-colors">Capabilities</a>
          <a href="#audit" className="hover:text-white transition-colors">The Entry Audit</a>
          <a href="#results" className="hover:text-white transition-colors">Validated ROI</a>
        </nav>
        <motion.a 
          href="#cta" 
          className="text-[11px] font-bold uppercase tracking-wider px-4 py-2 bg-white text-black rounded-lg transition-all shadow-sm"
          whileHover={{ scale: 1.03, boxShadow: "0px 4px 20px rgba(255,255,255,0.25)" }}
          whileTap={{ scale: 0.98 }}
        >
          Book Audit
        </motion.a>
      </header>

      {/* --- SECTION 01: HERO CONSOLE EXPERIENCE --- */}
      <section ref={scrollSceneRef} className="relative w-full h-screen flex items-center overflow-hidden bg-black text-white px-6 lg:px-16 will-change-transform">
        <motion.div className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden" style={{ x: bgX, y: bgY }}>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#F9F9FB]/10 z-10" />
          <video ref={videoRef} className="w-full h-full object-cover opacity-60 will-change-transform origin-center" loop muted playsInline>
            <source src="/backgroundblue.mp4" type="video/mp4" />
          </video>
        </motion.div>
        <motion.div ref={overlayGlowRef} className="absolute inset-0 pointer-events-none z-10 opacity-0 mix-blend-screen bg-[radial-gradient(circle_at_35%_45%,rgba(99,102,241,0.22),transparent_55%)]" style={{ x: glowX, y: glowY }} />
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <div key={p.id} className="absolute rounded-full will-change-transform opacity-25" style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px`, backgroundColor: p.color, boxShadow: `0 0 6px ${p.color}`, transition: "left 0.1s linear, top 0.1s linear" }} />
          ))}
        </div>
        <motion.div className="relative z-20 max-w-4xl w-full flex flex-col text-left mt-12 will-change-transform" style={{ x: textX, y: textY }}>
          
          <h1 className="text-4xl lg:text-7xl font-bold font-sans tracking-tight leading-[1.04] mb-6 max-w-3xl flex flex-col select-none">
            <div ref={line1Ref} className="relative overflow-hidden block h-[1.1em] w-full"><span className="reveal-text-span block opacity-0 will-change-transform">We eliminate industrial</span></div>
            <div ref={line2Ref} className="relative overflow-hidden block h-[1.1em] w-full"><span className="reveal-text-span block opacity-0 will-change-transform">cost leaks with</span></div>
            <div ref={line3Ref} className="relative overflow-hidden block h-[1.15em] w-full py-0.5"><span className="gradient-text-span inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-amber-300 bg-[size:200%_auto] will-change-transform opacity-0">deterministic AI</span></div>
            <div ref={line4Ref} className="relative overflow-hidden block h-[1.1em] w-full"><span className="reveal-text-span block opacity-0 will-change-transform">workflows.</span></div>
          </h1>
          <div ref={paraRef} className="opacity-0 will-change-transform">
            <p className="text-sm text-gray-300 max-w-xl leading-relaxed mb-8 font-body">
              We don't sell abstract software wrappers or chat interfaces. We engineer high-yield telemetry data-layers directly across your facility floor sensor loops and warehouse databases to halt unbudgeted cost bleeding.
            </p>
          </div>
          <div ref={btnGroupRef} className="opacity-0 flex flex-wrap gap-4 will-change-transform">
            <motion.a href="#audit" className="px-6 py-3.5 bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center gap-2 group border border-indigo-500 origin-center" whileHover={{ scale: 1.03, y: -3, rotate: 0.5, boxShadow: "0px 8px 24px rgba(99,102,241,0.35)", borderColor: "#818cf8" }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}><motion.span>Secure an AI Workflow Audit</motion.span> <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></motion.a>
            <motion.a href="#sculpture" className="px-6 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-white/20 transition-all origin-center" whileHover={{ scale: 1.03, y: -2, rotate: -0.5 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>Initialize Interactive Sculpture</motion.a>
          </div>
        </motion.div>
        <div ref={indicatorRef} className="opacity-0 absolute bottom-8 left-6 lg:left-16 z-20 flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Core Decision Matrix // Running Active 60FPS</span>
        </div>
      </section>

      {/* --- SECTION 02: THE TRUST STRIP --- */}
      <section className="border-b border-gray-100 bg-white py-6 px-6 lg:px-16 text-center relative z-30">
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <div className="flex items-center gap-2 group cursor-default"><ShieldCheck className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" /> Isolated Data Vaulting</div>
          <div className="flex items-center gap-2 group cursor-default"><ShieldCheck className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" /> ISO 9001 Alignment Verified</div>
          <div className="flex items-center gap-2 group cursor-default"><ShieldCheck className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" /> Hardened Process Frameworks</div>
          <div className="flex items-center gap-2 group cursor-default"><ShieldCheck className="w-4 h-4 text-indigo-500 group-hover:scale-110 transition-transform" /> Human-Guarded safety limiters</div>
        </div>
      </section>

      {/* --- SECTION 03: THE LIVING SCULPTURE MATRIX --- */}
      <section id="sculpture" className="px-6 lg:px-16 py-24 max-w-7xl mx-auto scroll-mt-12 relative z-30">
        <div className="mb-12 max-w-2xl text-left">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">Interactive Consulting Simulator</span>
          <h2 className="text-2xl lg:text-4xl font-bold mt-2 text-[#111115]">Explore our multi-node process orchestration mapping.</h2>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed font-body">
            Hover over any processing module spoke below to visualize exactly how custom operational models communicate instantly with our primary AI Agent Decision Hub.
          </p>
        </div>
        <SupplyChainSculpture />
      </section>

      {/* --- SECTION 04: FRICTION LOGS --- */}
      <section id="problems" className="px-6 lg:px-16 py-12 max-w-7xl mx-auto relative z-30">
        <div className="mb-12 max-w-xl text-left">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">System Friction Logs</span>
          <h2 className="text-2xl lg:text-4xl font-bold mt-2 text-[#111115]">Where manual latency bleeds mid-market operational margins.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0px_4px_16px_rgba(0,0,0,0.01)] relative overflow-hidden text-left" whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Procurement & Stock Gaps</h4>
            <h3 className="text-base font-bold mt-2 text-[#111115]">Manual sheet updates trigger high-cost emergency purchasing loops.</h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed font-body">Checking stocks by hand once a week leaves buying clerks blind to supplier delivery profiles until components fail to arrive. (~RM 180K/year lost to emergency buying)</p>
          </motion.div>
          <motion.div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0px_4px_16px_rgba(0,0,0,0.01)] relative overflow-hidden text-left" whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Logistics Routing Gaps</h4>
            <h3 className="text-base font-bold mt-2 text-[#111115]">Phone-based dispatching cross-tracks vehicles and wastes driver fuel.</h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">Scheduling 40 multi-stop routes from memory forces trucks to run half-empty, trapping fleet vehicle capacity and delaying invoices. (~18% excess fuel + driver-hours)</p>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 05: RECONCILED INSERTION POINT: DIGITAL WORKFORCE OPERATIONAL FEED --- */}
      <div id="capabilities" className="scroll-mt-12">
        <OperationalCapabilities />
      </div>

      {/* --- SECTION 06: THE AUDIT TIMELINE PROTOCOL --- */}
      <section id="audit" className="bg-white border-y border-gray-100 py-24 px-6 lg:px-16 relative z-30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center max-w-xl mx-auto">
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">The Entry Blueprint</span>
            <h2 className="text-2xl lg:text-4xl font-bold mt-1 text-[#111115]">The AI Workflow Audit Protocol</h2>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              We eliminate corporate risk barriers. We don't demand major initial engineering contract overrides. We benchmark your real floor leaks first through a low-profile standalone analysis.
            </p>
          </div>
          <LiveAuditProgress />
          <div className="mt-12 p-6 rounded-2xl bg-[#F9F9FB] border border-gray-100 flex flex-wrap items-center justify-between gap-6 max-w-4xl mx-auto shadow-sm">
            <div className="text-left">
              <h4 className="text-xs font-bold uppercase text-[#111115]">Ready to evaluate your facility's tracking layers?</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">S$2,000 – S$2,500 fixed upfront pricing based on plant scale. Completed in days.</p>
            </div>
            <motion.a href="#cta" className="px-4 py-2.5 bg-[#111115] text-white text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm" whileHover={{ scale: 1.02, backgroundColor: "#4f46e5" }} whileTap={{ scale: 0.97 }}>Secure Consultation Path</motion.a>
          </div>
        </div>
      </section>

      {/* --- SECTION 07: QUANTIFIED ROI GRID --- */}
      <section id="results" className="px-6 lg:px-16 py-20 max-w-7xl mx-auto relative z-30">
        <div className="mb-12 max-w-xl text-left">
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

      {/* --- SECTION 08: HIGH-INTENT CONVERSION ENTRY --- */}
      <section id="cta" className="px-6 lg:px-16 py-20 max-w-5xl mx-auto text-center relative z-30">
        <div className="p-8 lg:p-12 bg-white rounded-3xl border border-gray-100 shadow-[0px_8px_32px_rgba(0,0,0,0.01)] relative overflow-hidden group">
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">Secure System Assessment</span>
          <h2 className="text-3xl lg:text-5xl font-bold font-sans tracking-tight mt-2 mb-4 text-[#111115]">Initialize your facility's <span className="text-indigo-600">Workflow Audit</span>.</h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed mb-8 font-body">Put our strategy engineers on your floor floor for 2–3 days. We will map out your exact data flows, expose operational drag, and build your custom automation business case.</p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="Enter corporate email node..." className="flex-1 px-4 py-3 text-xs bg-[#F9F9FB] border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-colors shadow-inner" />
            <motion.button className="px-5 py-3 bg-[#111115] text-white text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-md shrink-0" whileHover={{ scale: 1.02, backgroundColor: "#4f46e5" }} whileTap={{ scale: 0.98 }}>Request On-Site Diagnostics</motion.button>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-100 bg-white py-8 px-6 text-center text-[10px] font-bold uppercase tracking-wider text-gray-400 relative z-30">
        &copy; {new Date().getFullYear()} Industrial Synthesis Firm. Engineered for Enterprise Operational Yield. All System Paths Secured.
      </footer>
    </main>
  );
}