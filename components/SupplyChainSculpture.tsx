"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
  useScroll,
} from "framer-motion";
import { Database, LineChart, Truck, Landmark, User, Settings, Activity, Layers, Gauge, Cpu } from "lucide-react";

interface NodeItem {
  id: string;
  label: string;
  subtitle: string;
  x: number;
  y: number;
  details: string;
  icon: React.ReactNode;
}

export default function SupplyChainSculpture() {
  const [activeNode, setActiveNode] = useState<string | null>("core");
  const [glowColor, setGlowColor] = useState<string>("rgba(99, 102, 241, 0.4)");
  const [pulseColor, setPulseColor] = useState<string>("#6366F1");
  const [simulationState, setSimulationState] = useState<"equilibrium" | "guardrail" | "optimizing">("equilibrium");

  const nodes: NodeItem[] = [
    { id: "sensor", label: "01 SENSOR MATRIX", subtitle: "Streaming live machine data", x: 50, y: 10, details: "Reads raw vibration and temperature feeds directly from factory floor PLCs to identify anomalies before physical failures happen.", icon: <Activity className="w-4 h-4 text-indigo-500" /> },
    { id: "inventory", label: "02 INVENTORY LOGS", subtitle: "Real-time stock visibility", x: 23, y: 24, details: "Maintains a live inventory log layer, automatically tracking material usage rates against ongoing open orders.", icon: <Database className="w-4 h-4 text-indigo-500" /> },
    { id: "supplier", label: "03 SUPPLIER FLOW", subtitle: "Automating PO drafts to halt emergency buying", x: 77, y: 24, details: "Automatically drafts purchase orders when any raw material is projected to run out within its supplier's lead time.", icon: <Truck className="w-4 h-4 text-indigo-500" /> },
    { id: "scheduling", label: "04 SCHEDULING CORE", subtitle: "AI-driven production scheduling", x: 18, y: 46, details: "Re-optimizes line allocations in seconds instead of half a day when emergency customer changes interrupt production.", icon: <LineChart className="w-4 h-4 text-indigo-500" /> },
    { id: "maintenance", label: "05 MAINTENANCE LOG", subtitle: "Predictive failure intelligence", x: 82, y: 46, details: "Trained against 18 months of historical maintenance logs to recognize early failure signatures and open tickets automatically.", icon: <Settings className="w-4 h-4 text-indigo-500" /> },
    { id: "production", label: "06 PRODUCTION LINE", subtitle: "Live yield & performance tracking", x: 18, y: 68, details: "Monitors active line capacity yields frame-by-frame to prevent partial line idle or rescheduling lag.", icon: <Layers className="w-4 h-4 text-indigo-500" /> },
    { id: "erp", label: "07 MASTER ERP LINK", subtitle: "Seamless data synchronization", x: 82, y: 68, details: "Maintains absolute data consistency between your existing warehouse management databases and external vendor platforms.", icon: <Gauge className="w-4 h-4 text-indigo-500" /> },
    { id: "finance", label: "08 FINANCE SYSTEMS", subtitle: "Same-day invoice automation", x: 18, y: 88, details: "Instantly reconciles digital delivery verification files with accounting platforms, eliminating week-long collection delays.", icon: <Landmark className="w-4 h-4 text-indigo-500" /> },
    { id: "dispatch", label: "09 DISPATCH HUB", subtitle: "Intelligent route optimization", x: 82, y: 88, details: "Clusters cargo tracking allocations into optimal delivery routes within two minutes using vehicle capability metrics.", icon: <Truck className="w-4 h-4 text-indigo-500" /> },
    { id: "customer", label: "10 CLIENT CONSOLE", subtitle: "Real-time visibility & notifications", x: 50, y: 96, details: "Proactively sends shipment tracking link updates to customers without forcing them through tedious manual portals.", icon: <User className="w-4 h-4 text-indigo-500" /> }
  ];

  useEffect(() => {
    if (!activeNode) {
      setSimulationState("equilibrium");
      return;
    }
    if (["inventory", "supplier", "erp"].includes(activeNode)) {
      setSimulationState("guardrail");
    } else if (["scheduling", "dispatch"].includes(activeNode)) {
      setSimulationState("optimizing");
    } else {
      setSimulationState("equilibrium");
    }
  }, [activeNode]);

  useEffect(() => {
    if (!activeNode || activeNode === "core") {
      setPulseColor("#6366F1");
      setGlowColor("rgba(99, 102, 241, 0.4)");
    } else if (["inventory", "supplier", "erp"].includes(activeNode)) {
      setPulseColor("#D4AF37");
      setGlowColor("rgba(212, 175, 55, 0.4)");
    } else {
      setPulseColor("#10B981");
      setGlowColor("rgba(16, 185, 129, 0.4)");
    }
  }, [activeNode]);

  return (
    <div className="w-full h-[880px] bg-[#F9F9FB] rounded-3xl border border-gray-100 shadow-[0px_8px_32px_rgba(0,0,0,0.01)] relative overflow-hidden flex flex-col p-6 select-none will-change-transform">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4 z-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            System State Monitor:
          </span>
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full transition-colors duration-500 ${
            simulationState === "equilibrium" ? "bg-indigo-50 text-indigo-600" :
            simulationState === "guardrail" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"
          }`}>
            {simulationState}
          </span>
        </div>
        <span className="text-[9px] font-mono text-gray-300">SYSTEM_YIELD_EVAL_OK // 60FPS</span>
      </div>

      <div className="flex-1 relative w-full h-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50 pointer-events-none" />

        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <path d="M 50% 10% L 50% 96%" stroke={pulseColor} strokeWidth="6" strokeOpacity="0.12" fill="none" filter="url(#glow)" style={{ transition: "stroke 0.4s ease" }} />
          <path d="M 50% 10% L 50% 96%" stroke="#E2E8F0" strokeWidth="2" fill="none" />

          {nodes.map((node) => {
            if (node.id === "sensor" || node.id === "customer") return null;
            return (
              <g key={`track-${node.id}`}>
                <path
                  d={`M ${node.x}% ${node.y}% L 50% ${node.y}%`}
                  stroke={isActiveNode(node.id) ? pulseColor : "#EEF2F6"}
                  strokeWidth="5"
                  strokeOpacity={isActiveNode(node.id) ? 0.25 : 0.6}
                  fill="none"
                  filter="url(#glow)"
                  style={{ transition: "stroke 0.4s ease, stroke-opacity 0.4s ease" }}
                />
                <path
                  d={`M ${node.x}% ${node.y}% L 50% ${node.y}%`}
                  stroke={isActiveNode(node.id) ? pulseColor : "#CBD5E1"}
                  strokeWidth="1.5"
                  strokeOpacity={isActiveNode(node.id) ? 1 : 0.7}
                  fill="none"
                  style={{ transition: "stroke 0.4s ease" }}
                />
              </g>
            );
          })}

          <motion.circle r="4" fill={pulseColor} animate={{ cx: ["50%", "50%", "18%", "18%", "82%", "82%", "50%", "50%"], cy: ["10%", "24%", "24%", "66%", "66%", "88%", "88%", "96%"] }} transition={{ duration: simulationState === "guardrail" ? 10 : 5, repeat: Infinity, ease: "linear" }} />
          <motion.circle r="3.5" fill={pulseColor} animate={{ cx: ["23%", "50%"], cy: ["24%", "24%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }} />
          <motion.circle r="3.5" fill={pulseColor} animate={{ cx: ["77%", "50%"], cy: ["24%", "24%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.2 }} />
          <motion.circle r="3.5" fill={pulseColor} animate={{ cx: ["18%", "50%"], cy: ["46%", "46%"] }} transition={{ duration: 2.8, repeat: Infinity, ease: "linear", delay: 0.2 }} />
          <motion.circle r="3.5" fill={pulseColor} animate={{ cx: ["82%", "50%"], cy: ["46%", "46%"] }} transition={{ duration: 2.8, repeat: Infinity, ease: "linear", delay: 0.9 }} />
        </svg>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30" onMouseEnter={() => setActiveNode("core")}>
          <motion.div 
            className={`w-40 h-40 rounded-2xl bg-white border flex flex-col items-center justify-center text-center p-4 transition-all duration-300 ${
              activeNode === "core" ? "border-indigo-500 scale-105" : "border-gray-200"
            }`}
            style={{
              boxShadow: activeNode === "core" 
                ? `0px 12px 32px rgba(99, 102, 241, 0.08), 0px 0px 24px ${glowColor}`
                : "0px 4px 16px rgba(0,0,0,0.02)"
            }}
          >
            <div className="w-11 h-11 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100 mb-3">
              <Cpu className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-[11px] font-bold tracking-tight text-gray-900 leading-tight">AI AGENT CORE</h3>
            <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase tracking-wider">Decision Engine & Orchestration</p>
          </motion.div>
        </div>

        {nodes.map((node) => {
          const isActive = activeNode === node.id;
          const isNeighbor = activeNode !== "core" && activeNode !== null && (
            node.id === "sensor" || node.id === "customer" || node.y === nodes.find(n => n.id === activeNode)?.y
          );
          
          return (
            <div
              key={node.id}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 min-w-[195px]"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setActiveNode(node.id)}
            >
              <motion.div
                className={`p-3 bg-white rounded-xl border flex gap-3 items-center transition-all duration-300 cursor-pointer ${
                  isActive ? "border-indigo-600 shadow-md scale-[1.03]" : isNeighbor ? "border-indigo-300 shadow-sm" : "border-gray-100 shadow-[0px_2px_8px_rgba(0,0,0,0.01)]"
                }`}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-colors duration-300 ${isActive ? "bg-indigo-50 border-indigo-200" : "bg-slate-50 border-gray-100"}`}>
                  {node.icon}
                </div>
                <div className="text-left overflow-hidden">
                  <h4 className="text-[11px] font-bold tracking-tight text-gray-900 truncate">{node.label}</h4>
                  <p className="text-[9px] text-gray-400 truncate mt-0.5 font-medium">{node.subtitle}</p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="mt-2 bg-slate-50 border border-slate-100 p-4 rounded-xl z-20 min-h-[95px] text-left relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-[2px] h-full bg-indigo-500 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
        <AnimatePresence mode="wait">
          {activeNode && (
            <motion.div
              key={activeNode}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.15 }}
            >
              <h5 className="text-[11px] font-bold text-indigo-600 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-indigo-500 animate-ping" />
                {activeNode === "core" ? "Central Integration Matrix" : nodes.find(n => n.id === activeNode)?.label}
              </h5>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed font-body">
                {activeNode === "core" 
                  ? "Our central consulting methodology weaves missing technical pipelines directly into your operational assets. It coordinates edge nodes via structured safety guardrails."
                  : nodes.find(n => n.id === activeNode)?.details}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  function isActiveNode(id: string) {
    if (activeNode === "core") return true;
    return activeNode === id;
  }
}

// --- NEW HIGHLY OPTIMIZED LIVE DICTIONARY CARD COMPONENT ---
function LivingAuditCard({ item, index, activeIndex, onClick, mouseX, mouseY }: { item: any, index: number, activeIndex: number, onClick: () => void, mouseX: any, mouseY: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isOpen = activeIndex === index;

  const cardX = useSpring(0, { stiffness: 90, damping: 24 });
  const cardY = useSpring(0, { stiffness: 90, damping: 24 });
  const cardRotate = useSpring(0, { stiffness: 90, damping: 24 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left - rect.width / 2) / 25;
    const cy = (e.clientY - rect.top - rect.height / 2) / 25;
    cardX.set(cx);
    cardY.set(cy);
    cardRotate.set(cx * 0.05);
  };

  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
    cardRotate.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`p-6 bg-white rounded-2xl border text-left relative overflow-hidden transition-all duration-500 cursor-pointer select-none will-change-transform ${
        isOpen ? "border-indigo-500 shadow-[0px_12px_32px_rgba(99,102,241,0.03)]" : "border-gray-100 shadow-[0px_4px_16px_rgba(0,0,0,0.005)] hover:border-indigo-200"
      }`}
      style={{ x: cardX, y: cardY, rotateZ: cardRotate }}
      variants={{
        hidden: { opacity: 0, y: 35, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1 }
      }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
    >
      {/* Soft breathing border glow layer */}
      {isOpen && (
        <motion.div 
          className="absolute inset-0 border border-indigo-500/30 rounded-2xl pointer-events-none"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Blinking status LED indicator */}
      <div className="absolute top-6 right-6 flex items-center gap-1.5">
        <motion.span 
          className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-indigo-600" : "bg-gray-300"}`}
          animate={isOpen ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full transition-colors duration-300 ${
        isOpen ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600"
      }`}>
        {item.tag}
      </span>

      <h4 className="text-sm font-bold text-gray-900 mt-4 mb-2 flex items-center gap-2 font-sans tracking-tight">
        {item.title}
      </h4>
      <p className="text-xs text-gray-500 leading-relaxed font-body">{item.desc}</p>

      {/* Static connector anchor points */}
      {index < 2 && (
        <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-40 text-gray-300 pointer-events-none">
          →
        </div>
      )}
    </motion.div>
  );
}

// --- MASTER RE-ENGINEERED ENTRY BLUEPRINT ---
export function LiveAuditProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [activeIndex, setActiveTab] = useState(0);
  const [bootStep, setBootStep] = useState(0);
  const [liveLog, setLiveDiagnosis] = useState("Workflow Synced");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0 1", "1 0"],
  });

  const bgParallax = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // Live progressive diagnostic ticker text arrays
  useEffect(() => {
    if (!isInView) return;
    const bootSequence = setTimeout(() => setBootStep(1), 500);
    const step2 = setTimeout(() => setBootStep(2), 1100);
    const step3 = setTimeout(() => setBootStep(3), 1700);
    const step4 = setTimeout(() => setBootStep(4), 2200);

    return () => {
      clearTimeout(bootSequence);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(step4);
    };
  }, [isInView]);

  useEffect(() => {
    const diagnosticStates = [
      "Workflow Synced",
      "Inventory Indexed",
      "Route Graph Updated",
      "Machine Signals Received",
      "Audit Stable",
      "Constraint Mapping Complete"
    ];
    let idx = 0;
    const ticker = setInterval(() => {
      idx = (idx + 1) % diagnosticStates.length;
      setLiveDiagnosis(diagnosticStates[idx]);
    }, 4500);
    return () => clearInterval(ticker);
  }, []);

  const steps = [
    { title: "Day 1-2: Traversal Diagnostics", desc: "A deep physical walkthrough analyzing floor workflows, inventory logging loops, and manual communications gap points.", tag: "On-Site Entrance" },
    { title: "Day 3: Leak Trailing Review", desc: "Building a dollar-matched framework identifying exactly where delayed responses are bleeding profit margins.", tag: "Yield Calculation" },
    { title: "Implementation: Guardrail Control", desc: "Deploying custom automation lines inside secure human-in-the-loop review screens before launch.", tag: "System Integration" }
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const bounds = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - bounds.left - bounds.width / 2) / 30);
    mouseY.set((e.clientY - bounds.top - bounds.height / 2) / 30);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-4 overflow-hidden"
    >
      {/* 1. Subtle Engineering Blueprint Sub-layer Layout Grid */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 will-change-transform"
        style={{ y: bgParallax }}
      />
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.015)_1px,transparent_1px)] bg-[size:120px_auto] opacity-50"
      />

      {/* Travelling Light pulse line sweep animation */}
      <motion.div 
        className="absolute top-0 bottom-0 w-[150px] bg-gradient-to-r from-transparent via-indigo-500/3 to-transparent pointer-events-none z-10"
        initial={{ left: "-20%" }}
        animate={isInView ? { left: "120%" } : {}}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
      />

      {/* 2. Progressive Loading / AI Boot Console Monitor */}
      <div className="mb-10 max-w-xl mx-auto p-4 bg-slate-50/70 border border-gray-100 rounded-xl flex flex-col gap-1.5 text-left font-mono text-[10px] text-gray-400 z-10 relative">
        <div className="flex justify-between items-center opacity-80 pb-1 border-b border-gray-200/50">
          <span className="flex items-center gap-1.5 text-indigo-600 font-bold uppercase tracking-wider">
            <span className="w-1 h-1 rounded-full bg-indigo-600 animate-ping" />
            Audit Diagnostics Pipeline
          </span>
          <AnimatePresence mode="wait">
            <motion.span 
              key={liveLog}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {liveLog}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-1 pt-1 font-medium select-none">
          <div className="flex items-center gap-2">
            <span className={bootStep >= 1 ? "text-indigo-600 font-bold" : "text-gray-300"}>{bootStep >= 1 ? "✓" : "○"}</span>
            <span className={bootStep >= 1 ? "text-gray-600" : "text-gray-300"}>Initializing Facility Audit...</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={bootStep >= 2 ? "text-indigo-600 font-bold" : "text-gray-300"}>{bootStep >= 2 ? "✓" : "○"}</span>
            <span className={bootStep >= 2 ? "text-gray-600" : "text-gray-300"}>Factory System Connected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={bootStep >= 3 ? "text-indigo-600 font-bold" : "text-gray-300"}>{bootStep >= 3 ? "✓" : "○"}</span>
            <span className={bootStep >= 3 ? "text-gray-600" : "text-gray-300"}>Production Floor Logged</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={bootStep >= 4 ? "text-indigo-600 font-bold" : "text-gray-300"}>{bootStep >= 4 ? "✓" : "○"}</span>
            <span className={bootStep >= 4 ? "text-gray-600" : "text-gray-300"}>Mapping Complete // Operational Ready</span>
          </div>
        </div>
      </div>

      {/* SVG Pipeline connector track lines between rows */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 z-0 hidden md:block pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <line x1="15%" y1="50%" x2="85%" y2="50%" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="3 3" />
          <motion.circle 
            r="2" 
            fill="#6366F1"
            animate={{ cx: ["25%", "75%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      {/* 3. Sequential Card Blueprint Deployments */}
      <motion.div 
        className="grid md:grid-cols-3 gap-6 relative z-10"
        initial="hidden"
        animate={bootStep >= 3 ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        {steps.map((item, i) => (
          <LivingAuditCard
            key={i}
            item={item}
            index={i}
            activeIndex={activeIndex}
            onClick={() => setActiveTab(i)}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function IncrementingMetric({ value, prefix = "", suffix, label, desc }: { value: number; prefix?: string; suffix: string; label: string; desc: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(count, value, { duration: 2.5, ease: "easeOut" });
    return () => controls.stop();
  }, [value]);

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0px_4px_16px_rgba(0,0,0,0.01)] text-left relative overflow-hidden group">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{label}</span>
      <div className="mt-3 text-gray-900 font-bold text-3xl font-sans flex items-baseline tracking-tight">
        {prefix && <span className="text-xl text-gray-400 font-medium mr-0.5">{prefix}</span>}
        <motion.span>{rounded}</motion.span>
        <span className="text-lg text-amber-600 font-semibold ml-0.5">{suffix}</span>
      </div>
      <p className="text-xs text-gray-500 mt-2 leading-relaxed font-body">{desc}</p>
    </div>
  );
}