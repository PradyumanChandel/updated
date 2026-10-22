import React, { useState, useMemo } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Shield02Icon,
  ArrowRight01Icon,
  SparklesIcon,
  UserCircle02Icon,
  LockKeyIcon,
} from '@hugeicons/core-free-icons';
import { TEST_PERSONAS, TestPersonaConfig } from '../data/mockData';
import { getProIdAura } from '../utils/tradeThemeEngine';
import { DynamicJobShieldBadge } from './DynamicJobShieldBadge';

interface LoginViewProps {
  onSelectPersona: (persona: TestPersonaConfig) => void;
  onLoginWithProId?: (proId: string) => void;
  onLoginSuccess?: (identifier: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onSelectPersona,
  onLoginWithProId,
  onLoginSuccess,
}) => {
  const [proId, setProId] = useState('ELEC-9912');
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>(TEST_PERSONAS[0].id);

  // Real-Time Ambient Shift based on active typed Pro ID
  const aura = useMemo(() => getProIdAura(proId), [proId]);

  const QUICK_DEMO_CHIPS = [
    {
      id: 'MUA-7704',
      label: 'MUA-7704 (Pooja - Makeup)',
      personaId: 'persona-pooja',
      badge: 'bg-rose-100 text-rose-800 border-rose-200',
    },
    {
      id: 'ELEC-9912',
      label: 'ELEC-9912 (Ramesh - Electrician)',
      personaId: 'persona-ramesh',
      badge: 'bg-purple-100 text-purple-900 border-purple-200',
    },
    {
      id: 'PLMB-3301',
      label: 'PLMB-3301 (Suresh - Plumber)',
      personaId: 'persona-suresh',
      badge: 'bg-cyan-100 text-cyan-900 border-cyan-200',
    },
    {
      id: 'HVAC-6623',
      label: 'HVAC-6623 (Amit - AC Tech)',
      personaId: 'persona-hvac',
      badge: 'bg-sky-100 text-sky-900 border-sky-200',
    },
    {
      id: 'WOOD-5120',
      label: 'WOOD-5120 (Vikram - Carpenter)',
      personaId: 'persona-vikram',
      badge: 'bg-amber-100 text-amber-900 border-amber-200',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = proId.trim().toUpperCase() || 'ELEC-9912';

    if (onLoginWithProId) {
      onLoginWithProId(cleanId);
    } else {
      const match = TEST_PERSONAS.find(
        (p) => p.accountId.toUpperCase() === cleanId
      ) || TEST_PERSONAS[0];
      onSelectPersona(match);
      if (onLoginSuccess) {
        onLoginSuccess(cleanId);
      }
    }
  };

  const handle1TapLaunch = (persona: TestPersonaConfig) => {
    setSelectedPersonaId(persona.id);
    setProId(persona.accountId);
    onSelectPersona(persona);
    if (onLoginSuccess) {
      onLoginSuccess(persona.accountId);
    }
  };

  const handleApplyChip = (chipId: string) => {
    setProId(chipId);
    const persona = TEST_PERSONAS.find((p) => p.accountId === chipId);
    if (persona) {
      setSelectedPersonaId(persona.id);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row bg-white select-none">
      {/* DESKTOP LEFT PANE (>=1024px): Branding, Ambient Aura & 3D Trade Artifact */}
      <div className="hidden lg:flex lg:w-1/2 min-h-screen bg-slate-50 border-r border-gray-200 flex-col justify-between p-10 xl:p-12 relative overflow-hidden">
        <div className="w-full max-w-[420px] mx-auto my-auto space-y-8">
          {/* Brand Logo & Shield Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#111111] text-white flex items-center justify-center font-black text-xl shadow-lg relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${aura.glowAura} opacity-40`} />
              <HugeiconsIcon icon={Shield02Icon} size={24} strokeWidth={2.2} className="relative z-10" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-[#111111] leading-none">
                Magikscill Pro
              </h1>
              <p className="text-xs text-[#71717A] font-bold uppercase tracking-wider mt-1">
                Command OS for Field Pros
              </p>
            </div>
          </div>

          {/* Real-time Interactive Trade Artifact Preview Box */}
          <div className="relative p-6 rounded-[28px] bg-white border border-black/5 shadow-lg overflow-hidden flex flex-col items-center text-center">
            <div className={`absolute inset-0 bg-gradient-to-br ${aura.glowAura} opacity-50`} />
            <div className="relative z-10 w-28 h-28 flex items-center justify-center mb-2">
              <DynamicJobShieldBadge trade={aura.trade} className="!top-0 !right-0 !relative w-28 h-28" />
            </div>
            <div className="relative z-10">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border mb-1.5 ${aura.badgeBg} ${aura.badgeText}`}>
                {aura.label}
              </span>
              <p className="text-xs text-[#71717A] font-medium leading-relaxed max-w-[220px]">
                {aura.osTitle} · Pre-calibrated 3D artifacts and telemetry ready
              </p>
            </div>
          </div>

          {/* Value Proposition Highlights */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-2.5 text-xs font-bold text-[#111111]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>Prayagraj Hub 5 km Live Mesh Dispatch</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-[#111111]">
              <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
              <span>100% Upfront RBI Escrow Lock Guarantee</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs font-bold text-[#111111]">
              <span className="w-2 h-2 rounded-full bg-sky-500 shrink-0" />
              <span>Instant Watermarked Photo & Telemetry Logs</span>
            </div>
          </div>
        </div>

        {/* Desktop Left Security Footer */}
        <div className="w-full max-w-[420px] mx-auto pt-6 text-xs font-semibold text-[#71717A] flex items-center gap-2 border-t border-gray-200/80">
          <HugeiconsIcon icon={LockKeyIcon} size={14} strokeWidth={2} />
          <span>256-Bit Encrypted Terminal · License v3.4</span>
        </div>
      </div>

      {/* DESKTOP RIGHT PANE / MOBILE MAIN CONTAINER */}
      <div className="flex-1 w-full min-h-screen bg-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-[400px] sm:max-w-[420px] my-auto space-y-5">
          {/* Mobile Header (Hidden on Desktop) */}
          <div className="lg:hidden pb-2 flex flex-col items-center text-center relative">
            <div
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full blur-3xl opacity-60 transition-all duration-500 pointer-events-none bg-gradient-to-br ${aura.glowAura}`}
            />

            <div className="relative mb-3 group z-10">
              <div className="w-16 h-16 rounded-[22px] bg-white border border-black/5 shadow-md flex items-center justify-center p-3 relative overflow-hidden transition-all duration-300">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${aura.glowAura} opacity-70 transition-all duration-500`}
                />
                <HugeiconsIcon
                  icon={Shield02Icon}
                  size={32}
                  strokeWidth={2}
                  className="text-[#111111] relative z-10"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white" />
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-black/5 text-[11px] font-bold text-[#71717A] mb-1.5 z-10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Prayagraj Hub · 5 km Live Mesh
            </div>

            <h1 className="text-[26px] font-black tracking-tight text-[#111111] leading-tight z-10">
              Magikscill Pro
            </h1>
            <p className="text-xs text-[#71717A] font-medium max-w-[280px] mt-1 z-10">
              The Global Pro Network
            </p>
          </div>

          {/* Smart Account ID Autonomous Login Module */}
          <div
            className={`bg-white rounded-[26px] p-4.5 lg:p-6 border transition-all duration-300 shadow-sm relative overflow-hidden ${aura.cardBorder}`}
          >
            <div
              className={`absolute top-0 inset-x-0 h-1.5 transition-all duration-500 ${aura.buttonClass}`}
            />

            <div className="flex items-center justify-between pb-3 mb-3 border-b border-black/5 gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-xl bg-slate-100 flex items-center justify-center text-[#111111] shrink-0">
                  <HugeiconsIcon icon={UserCircle02Icon} size={16} strokeWidth={2} />
                </div>
                <div className="min-w-0">
                  <span className="text-[12.5px] lg:text-sm font-black text-[#111111] block leading-tight truncate">
                    Smart Pro Account ID
                  </span>
                  <span className="text-[9.5px] lg:text-xs text-[#71717A] font-semibold block leading-tight truncate">
                    Auto-Morphs App UI & Ecosystem
                  </span>
                </div>
              </div>

              <span
                className={`text-[9.5px] lg:text-xs font-extrabold px-2.5 py-0.5 rounded-full border transition-all duration-300 flex items-center gap-1 shrink-0 ${aura.badgeBg} ${aura.badgeText}`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                  style={{ backgroundColor: aura.accentHex }}
                />
                <span className="truncate max-w-[120px] lg:max-w-[160px]">{aura.osTitle}</span>
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-black text-[#71717A] uppercase tracking-wider">
                    Enter Pro Account ID
                  </label>
                  <span className="text-[10px] font-bold text-[#71717A]">
                    Prefix detects trade
                  </span>
                </div>

                <div className="flex items-center bg-[#F6F7FA] border border-black/10 rounded-2xl p-1 focus-within:border-[#111111] focus-within:ring-2 focus-within:ring-black/5 transition-all">
                  <span className="px-3 py-2 text-xs font-black text-[#111111] border-r border-black/10 flex items-center gap-1.5 shrink-0 font-mono">
                    <span
                      className="w-2 h-2 rounded-full shrink-0 transition-colors duration-300"
                      style={{ backgroundColor: aura.accentHex }}
                    />
                    PRO ID:
                  </span>
                  <input
                    type="text"
                    value={proId}
                    onChange={(e) => setProId(e.target.value.toUpperCase())}
                    placeholder="e.g. MUA-7704 or ELEC-9912"
                    className="w-full px-3 py-2 text-sm font-black text-[#111111] bg-transparent outline-hidden tracking-wider uppercase font-mono placeholder:normal-case placeholder:font-medium placeholder:text-zinc-400"
                    autoCapitalize="characters"
                    required
                  />
                </div>
              </div>

              {/* 1-Tap Quick Fill Demo Chips */}
              <div>
                <p className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                  <HugeiconsIcon icon={SparklesIcon} size={11} strokeWidth={2.2} className="text-amber-500" />
                  <span>1-Tap Demo ID Chips:</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_DEMO_CHIPS.map((chip) => {
                    const isActive = proId.toUpperCase() === chip.id;
                    return (
                      <button
                        key={chip.id}
                        type="button"
                        onClick={() => handleApplyChip(chip.id)}
                        className={`text-[10.5px] font-bold px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1 active:scale-95 ${
                          isActive
                            ? 'bg-[#111111] text-white border-black shadow-xs ring-1 ring-black/20'
                            : 'bg-white hover:bg-slate-50 text-[#111111] border-black/10 shadow-2xs'
                        }`}
                      >
                        <span className="font-mono">{chip.id}</span>
                        <span className="text-[9px] opacity-70">
                          {chip.id.startsWith('MUA') ? 'Makeup' : chip.id.startsWith('ELEC') ? 'Electric' : chip.id.startsWith('PLMB') ? 'Plumb' : chip.id.startsWith('HVAC') ? 'HVAC' : 'Wood'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className={`w-full min-h-[46px] rounded-2xl font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-all duration-300 cursor-pointer ${aura.buttonClass}`}
              >
                <span>Launch {aura.label} Terminal</span>
                <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2.5} />
              </button>
            </form>
          </div>

          {/* 1-Tap Persona Tray */}
          <div>
            <div className="flex items-center justify-between mb-2.5 px-1">
              <div>
                <h2 className="text-xs font-black uppercase tracking-wider text-[#111111] flex items-center gap-1.5">
                  <span>Select Test Pro Persona</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </h2>
                <p className="text-[11px] text-[#71717A] mt-0.5">
                  1-Tap launch into trade ecosystem
                </p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-[#111111] border border-black/5">
                5 Personas
              </span>
            </div>

            <div className="space-y-2.5 max-h-[260px] lg:max-h-[280px] overflow-y-auto pr-1 no-scrollbar">
              {TEST_PERSONAS.map((persona) => {
                const isSelected = selectedPersonaId === persona.id;

                return (
                  <button
                    key={persona.id}
                    type="button"
                    onClick={() => handle1TapLaunch(persona)}
                    className={`w-full text-left p-3.5 rounded-[22px] transition-all relative cursor-pointer active:scale-[0.99] group border ${
                      isSelected
                        ? 'bg-white border-[#111111] shadow-md ring-2 ring-black/5'
                        : 'bg-white/80 hover:bg-white border-black/5 hover:border-black/15 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-2xl ${persona.avatarBg} text-white flex items-center justify-center font-black text-sm shrink-0 shadow-xs`}
                        >
                          {persona.initials}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h3 className="text-sm font-bold text-[#111111] truncate">
                              {persona.name}
                            </h3>
                            <span className="text-[9.5px] font-black font-mono px-1.5 py-0.2 rounded-md bg-black text-white">
                              {persona.accountId}
                            </span>
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1 rounded">
                              ★ {persona.rating}
                            </span>
                          </div>
                          <p className="text-[11.5px] font-semibold text-[#52525B] truncate mt-0.5">
                            {persona.title}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#111111] text-white text-[11px] font-bold shadow-xs group-hover:bg-amber-500 group-hover:text-black transition-colors">
                          <span>Launch</span>
                          <HugeiconsIcon icon={ArrowRight01Icon} size={12} strokeWidth={2.5} />
                        </span>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-black/5 flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-lg border ${persona.badgeBg} ${persona.badgeText}`}
                        >
                          {persona.diagnosticLabel}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#71717A] font-mono">
                        {persona.phone}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Security Footer */}
          <div className="lg:hidden pt-4 text-center">
            <div className="flex items-center justify-center gap-3 text-[11px] font-semibold text-[#71717A] mb-1">
              <span className="flex items-center gap-1">
                <HugeiconsIcon icon={LockKeyIcon} size={12} strokeWidth={2} /> 256-Bit Encrypted
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <HugeiconsIcon icon={Shield02Icon} size={12} strokeWidth={2} /> Escrow Auto-Lock
              </span>
            </div>
            <p className="text-[10px] text-[#A1A1AA]">
              Magikscill Pro v3.4.2 · Licensed for Certified Field Technicians
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
