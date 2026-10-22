import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Award01Icon,
  CheckmarkCircle02Icon,
  Location01Icon,
  Radar01Icon,
  Exchange01Icon,
  Logout01Icon,
} from '@hugeicons/core-free-icons';
import { ProProfile } from '../types';

interface ProProfileViewProps {
  pro: ProProfile;
  onToggleOnline: () => void;
  onLogout?: () => void;
}

export const ProProfileView: React.FC<ProProfileViewProps> = ({
  pro,
  onToggleOnline,
  onLogout,
}) => {
  const initials =
    pro.avatarInitials ||
    pro.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  return (
    <div className="space-y-4 pb-4 select-none">
      {/* Digital Pro ID Card - Soft Pastel Lilac (#D6C5FF) */}
      <div className="rounded-[28px] bg-[#D6C5FF] text-[#111111] p-5 shadow-xs relative overflow-hidden">
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#111111]">
              Magikscill Pro Identity
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-[#111111] bg-white/80 px-2 py-0.5 rounded-full shadow-2xs">
              ID: {pro.accountId || 'ELEC-9912'}
            </span>
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                className="text-[10px] font-bold text-[#111111] bg-white/90 hover:bg-white px-2 py-0.5 rounded-full flex items-center gap-1 active:scale-95 transition-all cursor-pointer min-h-[30px]"
                title="Switch Pro Persona"
              >
                <HugeiconsIcon icon={Exchange01Icon} size={13} strokeWidth={2.2} className="text-[#111111]" />
                Switch
              </button>
            )}
          </div>
        </div>

        {/* Pro Details */}
        <div className="mt-4 flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-white p-1 flex items-center justify-center shrink-0 shadow-xs">
            <div className="w-full h-full rounded-xl bg-[#111111] flex items-center justify-center font-bold text-lg text-white">
              {initials}
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-[#111111] truncate">
                {pro.name}
              </h3>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-white text-[#111111]">
                Level {pro.level}
              </span>
            </div>
            <p className="text-xs text-[#111111]/80 font-medium">
              {pro.title}
            </p>
            <p className="text-[11px] text-[#111111]/60 mt-0.5 flex items-center gap-1">
              <HugeiconsIcon icon={Location01Icon} size={13} strokeWidth={2.2} className="text-[#111111]/60 shrink-0" />
              {pro.hub} · {pro.city}
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-black/10 text-center">
          <div className="bg-white/60 p-2 rounded-xl">
            <span className="text-[10px] text-[#111111]/70 block font-semibold">RATING</span>
            <span className="text-sm font-extrabold text-[#111111] tabular-nums">★ {pro.rating}</span>
          </div>
          <div className="bg-white/60 p-2 rounded-xl">
            <span className="text-[10px] text-[#111111]/70 block font-semibold">JOBS DONE</span>
            <span className="text-sm font-extrabold text-[#111111] tabular-nums">{pro.completedJobs}+</span>
          </div>
          <div className="bg-white/60 p-2 rounded-xl">
            <span className="text-[10px] text-[#111111]/70 block font-semibold">ESCROW TRUST</span>
            <span className="text-sm font-extrabold text-emerald-800">100%</span>
          </div>
        </div>
      </div>

      {/* Online Dispatch Status Switch */}
      <div className="p-4 rounded-[22px] bg-white flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${pro.isOnline ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'}`}>
            <HugeiconsIcon icon={Radar01Icon} size={18} strokeWidth={2.0} />
          </div>
          <div>
            <p className="text-xs font-bold text-[#111111]">Dispatch Radar Broadcast</p>
            <p className="text-[11px] text-[#71717A]">
              {pro.isOnline ? 'Online · Receiving Prayagraj work orders' : 'Offline · Not accepting jobs'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggleOnline}
          aria-label="Toggle Online Dispatch"
          className={`w-12 h-7 rounded-full p-1 transition-colors min-h-[44px] flex items-center ${pro.isOnline ? 'bg-[#111111]' : 'bg-slate-300'}`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
              pro.isOnline ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Certifications & Badges */}
      <div className="rounded-[22px] bg-white p-4 space-y-3 shadow-xs">
        <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider flex items-center gap-1.5">
          <HugeiconsIcon icon={Award01Icon} size={16} strokeWidth={2.2} className="text-amber-600 shrink-0" /> Verified Trade Certifications
        </h4>

        <div className="space-y-2 text-xs">
          {pro.title.toLowerCase().includes('beauty') || pro.title.toLowerCase().includes('makeup') ? (
            <>
              <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={2.2} className="text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-[#111111]">CIDESCO Certified Bridal Cosmetologist</p>
                    <p className="text-[10px] text-[#71717A]">Certification #IN-MU-2021-4820</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  VERIFIED
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={2.2} className="text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-[#111111]">Client Privacy & Hygiene Protocol</p>
                    <p className="text-[10px] text-[#71717A]">Zero Photo Disclosure Protocol</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>
            </>
          ) : pro.title.toLowerCase().includes('plumb') ? (
            <>
              <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={2.2} className="text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-[#111111]">Master High-Pressure Plumbing License</p>
                    <p className="text-[10px] text-[#71717A]">License #UP-PL-2017-8812</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  VERIFIED
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={2.2} className="text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-[#111111]">Commercial Riser & Valve Safety</p>
                    <p className="text-[10px] text-[#71717A]">Indian Plumbing Association (IPA)</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>
            </>
          ) : pro.title.toLowerCase().includes('ac') || pro.title.toLowerCase().includes('hvac') ? (
            <>
              <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={2.2} className="text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-[#111111]">Inverter AC & VRF Master Certification</p>
                    <p className="text-[10px] text-[#71717A]">License #UP-HV-2019-3391</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  VERIFIED
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={2.2} className="text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-[#111111]">R32/R410A Refrigerant & Flare Safety</p>
                    <p className="text-[10px] text-[#71717A]">Bureau of Energy Efficiency (BEE)</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>
            </>
          ) : pro.title.toLowerCase().includes('carpent') ? (
            <>
              <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={2.2} className="text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-[#111111]">Architectural Joinery & Modular Fitting</p>
                    <p className="text-[10px] text-[#71717A]">Skill India Guild #CP-2020-109</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  VERIFIED
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={2.2} className="text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-[#111111]">Concealed 3D Hydraulic Hinge Alignment</p>
                    <p className="text-[10px] text-[#71717A]">Hafele & Hettich Certified</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={2.2} className="text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-[#111111]">CEA Grade-A Electrician License</p>
                    <p className="text-[10px] text-[#71717A]">License #UP-EA-2018-9941</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  VERIFIED
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={2.2} className="text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold text-[#111111]">1000V High Voltage Arc Flash Safety</p>
                    <p className="text-[10px] text-[#71717A]">National Skill Development Corp</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Prominent Switch Pro Persona / Logout Button */}
      {onLogout && (
        <button
          type="button"
          onClick={onLogout}
          className="w-full min-h-[48px] py-3.5 px-4 rounded-[22px] bg-red-50 hover:bg-red-100 border border-red-200/80 text-red-600 font-bold text-xs tracking-wide flex items-center justify-center gap-2 active:scale-[0.99] transition-all cursor-pointer shadow-xs"
        >
          <HugeiconsIcon icon={Logout01Icon} size={18} strokeWidth={2.2} className="text-red-600" />
          <span>Switch Pro Persona / Log Out</span>
        </button>
      )}
    </div>
  );
};
