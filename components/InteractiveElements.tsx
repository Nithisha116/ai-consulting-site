"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export function HeroAutomationTrack() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const steps = [
    { label: "Raw Telemetry Ingest", sublabel: "PLC Sensors & Real-Time ERP Feeds" },
    { label: "Autonomous Agent Core", sublabel: "Evaluating Edge Margins & Yields" },
    { label: "Deterministic Guardrail", sublabel: "Human-in-the-Loop 1-Click Approval" },
    { label: "Operational Dispatch", sublabel: "Automated PO Generation & Logistics Live" },
  ];

  return (
    <div className="relative w-full p-8 bg-white rounded-2xl border border-gray-100 flex flex-col gap-8 shadow-tactile-raised overflow-hidden">
      <div className="absolute left-[35px] top-12 bottom-12 w-1.5 bg-gray-100 rounded-full shadow-groove-inset overflow-hidden">
        <motion.div
          className="w-full h-24 bg-gradient-to-b from-transparent via-[var(--color-telemetry-node)] to-[var(--color-yield-gold)]"
          animate={{ y: ["-100%", "400%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {steps.map((step, idx) => (
        <div key={idx} className="relative z-10 flex items-start gap-5 cursor-pointer" onClick={() => setActiveStep(idx)}>
          <motion.div
            className="w-9 h-9 rounded-full border-2 bg-white flex items-center justify-center shadow-sm shrink-0"
            animate={activeStep === idx ? { borderColor: "#6366F1", scale: 1.05 } : { borderColor: "#E5E7EB" }}
          >
            <div className={`w-2.5 h-2.5 rounded-full ${activeStep === idx ? 'bg-[var(--color-telemetry-node)]' : 'bg-gray-300'}`} />
          </motion.div>
          <div className="flex-1 p-4 bg-white rounded-xl border border-gray-100 shadow-tactile-raised hover:border-indigo-100 transition-all">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-semibold text-[var(--color-industrial-obsidian)]">{step.label}</h4>
              {activeStep === idx && (
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-[var(--color-telemetry-node)] font-medium">Active</span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">{step.sublabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function AuditMetricCard({ value, prefix = "", suffix, label, subtext }: { value: number; prefix?: string; suffix: string; label: string; subtext: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return () => controls.stop();
  }, [value]);

  return (
    <motion.div 
      className="p-6 bg-white rounded-2xl border border-gray-100 shadow-tactile-raised relative overflow-hidden group"
      whileHover={{ y: -4 }}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--color-telemetry-node)] via-[var(--color-yield-gold)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</span>
      <div className="mt-3 flex items-baseline gap-0.5 text-[var(--color-industrial-obsidian)] font-bold text-3xl">
        {prefix && <span className="text-xl text-gray-400 mr-0.5">{prefix}</span>}
        <motion.span>{rounded}</motion.span>
        <span className="text-lg text-amber-600 font-semibold ml-0.5">{suffix}</span>
      </div>
      <p className="text-xs text-gray-500 mt-2 leading-relaxed">{subtext}</p>
    </motion.div>
  );
}

export function AuditWorkflowSteps() {
  const [activeTab, setActiveTab] = useState(0);
  const steps = [
    { title: "01. Operational Diagnostics", desc: "A 2-to-3 day deep on-site traversal shadowing your physical floor loops, manual entry bottlenecks, and inventory blindspots.", tag: "Paid On-Site Entrance" },
    { title: "02. Quantitative Leak Trailing", desc: "Compiling a complete, dollar-matched audit architecture calculating precisely where manual latency is bleeding capacity.", tag: "Data Validation Framework" },
    { title: "03. The Guardrail Solution Blueprint", desc: "Structuring complete agent mapping charts highlighting custom context loops before any construction lines are written.", tag: "Fixed-Timeline Roadmap" }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {steps.map((item, i) => (
        <div 
          key={i} 
          onClick={() => setActiveTab(i)}
          className={`p-6 rounded-2xl border transition-all cursor-pointer relative bg-white shadow-tactile-raised ${activeTab === i ? 'border-[var(--color-telemetry-node)]' : 'border-gray-100'}`}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">{item.tag}</span>
          <h4 className="text-base font-bold text-[var(--color-industrial-obsidian)] mt-4 mb-2">{item.title}</h4>
          <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
          {activeTab === i && <div className="absolute bottom-0 left-6 right-6 h-1 bg-[var(--color-telemetry-node)] rounded-t-full" />}
        </div>
      ))}
    </div>
  );
}