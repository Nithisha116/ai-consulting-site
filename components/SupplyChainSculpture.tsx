"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useTransform,
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

  const nodes: NodeItem[] = [
    { id: "sensor", label: "01 SENSOR MATRIX", subtitle: "Streaming live machine data", x: 50, y: 10, details: "Reads raw vibration and temperature feeds directly from factory floor PLCs to identify anomalies before physical failures happen.", icon: <Activity className="w-4 h-4 text-indigo-500" /> },
    { id: "inventory", label: "02 INVENTORY LOGS", subtitle: "Real-time stock visibility", x: 23, y: 24, details: "Maintains a live inventory log layer, automatically tracking material usage rates against ongoing open orders.", icon: <Database className="w-4 h-4 text-indigo-500" /> },
    { id: "supplier", label: "03 SUPPLIER FLOW", subtitle: "Automating PO drafts to halt emergency buying", x: 77, y: 24, details: "Automatically drafts purchase orders when any raw material is projected to run out within its supplier's lead time.", icon: <Truck className="w-4 h-4 text-indigo-500" /> },
    { id: "scheduling", label: "04 SCHEDULING CORE", subtitle: "Optimizing line layouts instantly for rush orders", x: 18, y: 46, details: "Proposes an optimised weekly production schedule and re-runs the optimisation in seconds when a rush order arrives.", icon: <LineChart className="w-4 h-4 text-indigo-500" /> },
    { id: "maintenance", label: "05 MAINTENANCE LOG", subtitle: "Predicting breakdown signatures via sensor trends", x: 82, y: 46, details: "Trained against 18 months of historical maintenance logs to recognize early failure signatures and open tickets automatically.", icon: <Settings className="w-4 h-4 text-indigo-500" /> },
    { id: "production", label: "06 PRODUCTION LINE", subtitle: "Tracking line capacity yields frame-by-frame", x: 18, y: 66, details: "Monitors active line capacity yields frame-by-frame to prevent partial line idle or rescheduling lag.", icon: <Layers className="w-4 h-4 text-indigo-500" /> },
    { id: "erp", label: "07 MASTER ERP LINK", subtitle: "Syncing core execution variables safely", x: 82, y: 66, details: "Maintains a secure, non-invasive data synchronization bridge across legacy relational databases and central execution states.", icon: <Gauge className="w-4 h-4 text-indigo-500" /> },
    { id: "finance", label: "08 FINANCE SYSTEMS", subtitle: "Triggering same-day invoices automatically", x: 18, y: 88, details: "Closes the loop between physical delivery sign-offs and master financial systems to unlock billing velocity.", icon: <Landmark className="w-4 h-4 text-indigo-500" /> },
    { id: "dispatch", label: "09 DISPATCH HUB", subtitle: "Clustering vehicle delivery tracks in 2 minutes", x: 82, y: 88, details: "Takes confirmed jobs, driver locations, and traffic data to generate optimized vehicle route schedules in under 2 minutes.", icon: <Truck className="w-4 h-4 text-indigo-500" /> },
    { id: "customer", label: "10 CLIENT CONSOLE", subtitle: "Proactively pushing live status milestones", x: 50, y: 96, details: "Provides automated order-status links and proactive milestones via messaging integrations.", icon: <User className="w-4 h-4 text-indigo-500" /> }
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

  const [simulationState, setSimulationState] = useState<"equilibrium" | "guardrail" | "optimizing">("equilibrium");

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

export function LiveAuditProgress() {
  const [scanActive, setScanActive] = useState(false);
  const [activeIndex, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setScanActive(true);
      setTimeout(() => setScanActive(false), 2000);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { title: "Day 1-2: Traversal Diagnostics", desc: "A deep physical walkthrough analyzing floor workflows, inventory logging loops, and manual communications gap points.", tag: "On-Site Entrance" },
    { title: "Day 3: Leak Trailing Review", desc: "Building a dollar-matched framework identifying exactly where delayed responses are bleeding profit margins.", tag: "Yield Calculation" },
    { title: "Implementation: Guardrail Control", desc: "Deploying custom automation lines inside secure human-in-the-loop review screens before launch.", tag: "System Integration" }
  ];

  return (
    <div className="relative w-full">
      <AnimatePresence>
        {scanActive && (
          <motion.div 
            className="absolute top-0 bottom-0 w-[3px] bg-indigo-500/80 blur-[2px] z-40 pointer-events-none"
            initial={{ left: "0%" }}
            animate={{ left: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      <div className="grid md:grid-cols-3 gap-6 relative z-30">
        {steps.map((item, i) => (
          <motion.div 
            key={i} 
            onClick={() => setActiveTab(i)}
            className={`p-6 rounded-2xl border bg-white shadow-[0px_4px_16px_rgba(0,0,0,0.01)] relative overflow-hidden cursor-pointer select-none transition-all duration-300 ${
              activeIndex === i ? "border-indigo-500 ring-1 ring-indigo-100" : "border-gray-100"
            }`}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className={`absolute top-0 left-0 w-full h-[2px] bg-indigo-500 transition-transform duration-500 ${activeIndex === i ? "scale-x-100" : "scale-x-0 origin-left"}`} />
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full transition-colors duration-300 ${activeIndex === i ? "bg-indigo-600 text-white" : "bg-indigo-50 text-indigo-600"}`}>{item.tag}</span>
            <h4 className="text-sm font-bold text-gray-900 mt-4 mb-2 flex items-center gap-2">
              {activeIndex === i && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />}
              {item.title}
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed font-body">{item.desc}</p>
          </motion.div>
        ))}
      </div>
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
    <motion.div 
      className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0px_4px_16px_rgba(0,0,0,0.01)] text-left relative overflow-hidden group"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{label}</span>
      <div className="mt-3 text-gray-900 font-bold text-3xl font-sans flex items-baseline tracking-tight">
        {prefix && <span className="text-xl text-gray-400 font-medium mr-0.5">{prefix}</span>}
        <motion.span>{rounded}</motion.span>
        <span className="text-lg text-amber-600 font-semibold ml-0.5">{suffix}</span>
      </div>
      <p className="text-xs text-gray-500 mt-2 leading-relaxed font-body">{desc}</p>
    </motion.div>
  );
}