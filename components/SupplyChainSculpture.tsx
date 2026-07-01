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
    { id: "supplier", label: "03 SUPPLIER FLOW", subtitle: "Automated PO generation", x: 77, y: 24, details: "Automatically drafts purchase orders when stocks drop, tracking vendor latency profiles dynamically.", icon: <Truck className="w-4 h-4 text-indigo-500" /> },
    { id: "scheduling", label: "04 SCHEDULING CORE", subtitle: "AI-driven production scheduling", x: 18, y: 46, details: "Re-optimizes line allocations in seconds instead of half a day when emergency customer changes interrupt production.", icon: <LineChart className="w-4 h-4 text-indigo-500" /> },
    { id: "maintenance", label: "05 MAINTENANCE LOG", subtitle: "Predictive failure intelligence", x: 82, y: 46, details: "Schedules preventative service items during regular down windows, stopping unplanned line shutdowns.", icon: <Settings className="w-4 h-4 text-indigo-500" /> },
    { id: "production", label: "06 PRODUCTION LINE", subtitle: "Live yield & performance tracking", x: 18, y: 68, details: "Monitors active run metrics continuously, capturing capacity variables across multiple production setups.", icon: <Layers className="w-4 h-4 text-indigo-500" /> },
    { id: "erp", label: "07 MASTER ERP LINK", subtitle: "Seamless data synchronization", x: 82, y: 68, details: "Maintains absolute data consistency between your existing warehouse management databases and external vendor platforms.", icon: <Gauge className="w-4 h-4 text-indigo-500" /> },
    { id: "finance", label: "08 FINANCE SYSTEMS", subtitle: "Same-day invoice automation", x: 18, y: 88, details: "Instantly reconciles digital delivery verification files with accounting platforms, eliminating week-long collection delays.", icon: <Landmark className="w-4 h-4 text-indigo-500" /> },
    { id: "dispatch", label: "09 DISPATCH HUB", subtitle: "Intelligent route optimization", x: 82, y: 88, details: "Clusters cargo tracking allocations into optimal delivery routes within two minutes using vehicle capability metrics.", icon: <Truck className="w-4 h-4 text-indigo-500" /> },
    { id: "customer", label: "10 CLIENT CONSOLE", subtitle: "Real-time visibility & notifications", x: 50, y: 96, details: "Proactively sends shipment tracking link updates to customers without forcing them through tedious manual portals.", icon: <User className="w-4 h-4 text-indigo-500" /> }
  ];

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
      <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-2 z-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            Active Telemetry Path Flow:
          </span>
          <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
            {activeNode === "core" ? "SYSTEMS_INTEGRATED" : `NODE_${activeNode?.toUpperCase()}_EVAL`}
          </span>
        </div>
        <span className="text-[9px] font-mono text-gray-300 font-semibold">ORCHESTRATOR // RUN_ACTIVE_60FPS</span>
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

          <motion.circle r="4" fill={pulseColor} animate={{ cx: ["50%", "50%"], cy: ["10%", "50%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
          <motion.circle r="3.5" fill={pulseColor} animate={{ cx: ["23%", "50%"], cy: ["24%", "24%"] }} transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, ease: "linear" }} />
          <motion.circle r="3.5" fill={pulseColor} animate={{ cx: ["77%", "50%"], cy: ["24%", "24%"] }} transition={{ duration: 2.5, delay: 1.2, repeat: Infinity, ease: "linear" }} />
          <motion.circle r="3.5" fill={pulseColor} animate={{ cx: ["18%", "50%"], cy: ["46%", "46%"] }} transition={{ duration: 2.2, delay: 0.2, repeat: Infinity, ease: "linear" }} />
          <motion.circle r="3.5" fill={pulseColor} animate={{ cx: ["82%", "50%"], cy: ["46%", "46%"] }} transition={{ duration: 2.2, delay: 0.9, repeat: Infinity, ease: "linear" }} />
          <motion.circle r="3.5" fill={pulseColor} animate={{ cx: ["18%", "50%"], cy: ["68%", "68%"] }} transition={{ duration: 2.8, delay: 0.7, repeat: Infinity, ease: "linear" }} />
          <motion.circle r="3.5" fill={pulseColor} animate={{ cx: ["82%", "50%"], cy: ["68%", "68%"] }} transition={{ duration: 2.8, delay: 1.5, repeat: Infinity, ease: "linear" }} />
          <motion.circle r="4" fill={pulseColor} animate={{ cx: ["50%", "50%"], cy: ["50%", "96%"] }} transition={{ duration: 3.2, delay: 0.1, repeat: Infinity, ease: "linear" }} />
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
          return (
            <div
              key={node.id}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 min-w-[195px]"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setActiveNode(node.id)}
            >
              <motion.div
                className={`p-3 bg-white rounded-xl border flex gap-3 items-center transition-all duration-300 cursor-pointer ${
                  isActive ? "border-indigo-600 shadow-md scale-[1.01]" : "border-gray-100 shadow-[0px_2px_8px_rgba(0,0,0,0.01)] hover:border-indigo-200"
                }`}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center shrink-0 border border-gray-100">
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
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -2 }}
              transition={{ duration: 0.1 }}
            >
              <h5 className="text-[11px] font-bold text-indigo-600 tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-indigo-500 animate-ping" />
                {activeNode === "core" ? "Central Integration Matrix" : nodes.find(n => n.id === activeNode)?.label}
              </h5>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
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
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {[
        { title: "Day 1-2: Traversal Diagnostics", desc: "A deep physical walkthrough analyzing floor workflows, inventory logging loops, and manual communications gap points.", tag: "On-Site Entrance" },
        { title: "Day 3: Leak Trailing Review", desc: "Building a dollar-matched framework identifying exactly where delayed responses are bleeding profit margins.", tag: "Yield Calculation" },
        { title: "Implementation: Guardrail Control", desc: "Deploying custom automation lines inside secure human-in-the-loop review screens before launch.", tag: "System Integration" }
      ].map((item, i) => (
        <motion.div 
          key={i} 
          className="p-6 rounded-2xl border border-gray-100 bg-white shadow-[0px_4px_16px_rgba(0,0,0,0.01)] relative overflow-hidden group cursor-default"
          whileHover={{ y: -4 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">{item.tag}</span>
          <h4 className="text-sm font-bold text-gray-900 mt-4 mb-2">{item.title}</h4>
          <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function IncrementingMetric({ value, prefix = "", suffix, label, desc }: { value: number; prefix?: string; suffix: string; label: string; desc: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return () => controls.stop();
  }, [value]);

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-[0px_4px_16px_rgba(0,0,0,0.01)] text-left relative overflow-hidden group">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">{label}</span>
      <div className="mt-3 text-gray-900 font-bold text-3xl font-sans flex items-baseline">
        {prefix && <span className="text-xl text-gray-400 font-medium mr-0.5">{prefix}</span>}
        <motion.span>{rounded}</motion.span>
        <span className="text-lg text-amber-600 font-semibold ml-0.5">{suffix}</span>
      </div>
      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{desc}</p>
    </div>
  );
}