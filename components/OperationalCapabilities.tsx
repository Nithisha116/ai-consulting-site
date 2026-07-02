"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useMotionValue,
  useTransform,
  useScroll,
} from "framer-motion";
import { Cpu, ShoppingCart, Calendar, ShieldCheck, Database, Navigation, Sliders, MessageSquare, FileText, CheckCircle2, ChevronDown, Activity } from "lucide-react";

interface CapabilityItem {
  id: string;
  title: string;
  status: string;
  desc: string;
  metric: string;
  flow: string[];
  icon: React.ReactNode;
}

export default function OperationalCapabilities() {
  const [activeTab, setActiveTab] = useState<string>("procurement");
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["0 1", "1 0"],
  });

  const videoY = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const videoRotate = useTransform(scrollYProgress, [0, 1], [-0.5, 0.5]);

  const capabilities: CapabilityItem[] = [
    { id: "procurement", title: "Procurement Intelligence Agent", status: "PREDICTING", desc: "Monitors material drawdown rates against live supplier logistics profiles to automate PO generation before inventory stockouts cause emergency margin leakages.", metric: "RM 140K Annualized Savings", flow: ["Live Drawdown Rates", "Supplier Lead Sync", "Auto-PO Generation"], icon: <ShoppingCart className="w-4 h-4 text-indigo-500" /> },
    { id: "scheduling", title: "Production Scheduling Agent", status: "OPTIMIZING", desc: "Processes real-time floor telemetry, order books, and resource capacity to calculate optimal machine allocation tables within seconds when rush shifts arrive.", metric: "7% Reclaimed Line Capacity", flow: ["Shift Metrics", "Constraint Re-Evaluation", "Live Line Push"], icon: <Calendar className="w-4 h-4 text-indigo-500" /> },
    { id: "maintenance", title: "Predictive Maintenance Agent", status: "MONITORING", desc: "Tracks continuous vibration, current draw, and temperature patterns directly over legacy hardware PLCs to trigger down-window work orders.", metric: "0 Broken Runs Since Launch", icon: <Sliders className="w-4 h-4 text-indigo-500" />, flow: ["Vibration Feeds", "Model Drifts Check", "Auto Work Ticket"] },
    { id: "dispatch", title: "Dispatch Optimization Engine", status: "ROUTING", desc: "Coordinates cross-border multi-stop delivery parameters, matching fleet tracking constraints to execute optimized routes within 120 seconds.", metric: "15% Lower Fleet Fuel Burns", icon: <Navigation className="w-4 h-4 text-indigo-500" />, flow: ["Job Board Pool", "OR-Tools Matrix Run", "Driver Mobile Sync"] },
    { id: "inventory", title: "Inventory Intelligence Agent", status: "BALANCING", desc: "Links mobile scanning apps to internal core accounting ledgers, dropping picked errors by tracking inventory movements instantly.", metric: "0.8% Target Error Margin", icon: <Database className="w-4 h-4 text-indigo-500" />, flow: ["Mobile QR Scan", "Discrepancy Sweep", "Master Balance Push"] },
    { id: "communication", title: "Customer Communication Agent", status: "RESPONDING", desc: "Proactively sequences client shipment updates across live delivery milestones, auto-routing edge edge inquiries cleanly to support staff.", metric: "16 CSR Hours Saved Weekly", icon: <MessageSquare className="w-4 h-4 text-indigo-500" />, flow: ["Milestone Capture", "Automated WATI Alert", "Staff Routing Escalate"] }
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6 lg:px-16 bg-[#F9F9FB] border-t border-gray-100 relative z-30 overflow-hidden">
      
      {/* Background Micro Telemetry Vectors */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px)] bg-[size:6rem_auto] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* --- LEFT PANEL: OPERATIONAL SYSTEM FEED --- */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-6">
          <div>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">Operational Core</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-[#111115] tracking-tight">AI Agents Built Around Your Value Chain.</h2>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Specialized autonomous matrices operating 24/7 on top of your current databases and system infrastructure.
            </p>
          </div>

          {/* Living Video Overlay Framework */}
          <motion.div 
            className="p-3 bg-white rounded-3xl border border-gray-100 shadow-[0px_16px_40px_rgba(0,0,0,0.015)] relative overflow-hidden group will-change-transform"
            style={{ y: videoY, rotate: videoRotate }}
          >
            {/* Soft Ambient Sweeping Reflection Glass Light */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-400 to-transparent opacity-40 z-20" />
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 shadow-inner">
              <video 
                className="w-full h-full object-cover scale-[1.02] opacity-85 mix-blend-screen"
                autoPlay 
                loop 
                muted 
                playsInline
              >
                <source src="/aiher.mp4" type="video/mp4" />
              </video>

              {/* Real-time Processing Waveform Simulation Overlay */}
              

              {/* Dynamic Status Dashboard Trackers */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 z-20 flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                  <div className="text-left">
                    <p className="text-[9px] font-mono font-bold text-white uppercase tracking-wider">
                      Active: {capabilities.find(c => c.id === activeTab)?.title.split(" ")[0]} Intelligence
                    </p>
                    <p className="text-[8px] font-mono text-gray-400 mt-0.5">MATRIX_ORCHESTRATION_ROUTE_OK</p>
                  </div>
                </div>
                <div className="flex gap-0.5 h-3 items-end">
                  {[0.4, 0.9, 0.2, 0.7, 0.5, 0.9, 0.3].map((val, i) => (
                    <motion.div 
                      key={i} 
                      className="w-[1.5px] bg-indigo-400 rounded-t-full"
                      animate={{ height: ["20%", "100%", "20%"] }}
                      transition={{ duration: 1 + val, repeat: Infinity, ease: "easeInOut", delay: val }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT PANEL: INTERACTIVE CAPABILITY ROWS --- */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {capabilities.map((item, index) => {
            const isOpen = activeTab === item.id;
            return (
              <motion.div
                key={item.id}
                className={`border bg-white rounded-2xl transition-all duration-300 relative overflow-hidden text-left select-none ${
                  isOpen ? "border-indigo-600 shadow-[0px_4px_24px_rgba(99,102,241,0.02)]" : "border-gray-100 hover:border-indigo-200"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.06, type: "spring", stiffness: 350, damping: 28 }}
                onMouseEnter={() => setActiveTab(item.id)}
              >
                {/* Collapsed Overview Header Bar Trigger */}
                <div className="p-4 flex justify-between items-center cursor-pointer">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors duration-300 shrink-0 ${
                      isOpen ? "bg-indigo-50 border-indigo-200" : "bg-slate-50 border-gray-100"
                    }`}>
                      {item.icon}
                    </div>
                    <div className="truncate">
                      <h3 className="text-sm font-bold text-gray-900 tracking-tight">{item.title}</h3>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5 tracking-wider font-semibold">
                        DEPLOYMENT_ID // 0{index + 1}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-md tracking-wider transition-colors duration-300 ${
                      isOpen ? "bg-indigo-600 text-white shadow-sm" : "bg-slate-100 text-gray-400"
                    }`}>
                      {item.status}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform duration-300 ${isOpen ? "rotate-180 text-indigo-500" : ""}`} />
                  </div>
                </div>

                {/* Smooth Expandable Core Segment Display */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-4 pb-5 pt-1 border-t border-gray-50 flex flex-col gap-4 bg-slate-50/40">
                        <p className="text-xs text-gray-500 leading-relaxed font-body">
                          {item.desc}
                        </p>

                        {/* Interactive Logic Graph / Workflow Track Simulator */}
                        <div className="grid sm:grid-cols-12 gap-3 items-center mt-1">
                          <div className="sm:col-span-8 flex flex-wrap items-center gap-1.5">
                            {item.flow.map((step, fIdx) => (
                              <React.Fragment key={fIdx}>
                                <div className="px-2 py-1 bg-white rounded-md border border-gray-200/60 text-[10px] font-mono text-gray-600 font-medium shadow-2xs">
                                  {step}
                                </div>
                                {fIdx < item.flow.length - 1 && (
                                  <span className="text-[10px] text-gray-300 font-bold px-0.5">→</span>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                          
                          {/* Reclaimed Monetary / Precision Metric Badge Target */}
                          <div className="sm:col-span-4 justify-self-start sm:justify-self-end bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-2xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <div className="text-left leading-tight">
                              <span className="text-[9px] text-emerald-700 font-bold uppercase tracking-wider block">Validated Gain</span>
                              <span className="text-[10px] text-gray-900 font-bold font-sans tracking-tight block mt-0.5">{item.metric.split(" ")[0]} {item.metric.split(" ")[1]}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}