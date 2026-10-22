import React, { useMemo } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Call02Icon,
  Camera01Icon,
  Calendar01Icon,
  CheckmarkCircle02Icon,
  CheckmarkBadge01Icon,
  VoiceIcon,
  ShieldCheckIcon,
  LockKeyIcon,
  AlertCircleIcon,
  Location01Icon,
  Clock01Icon,
} from '@hugeicons/core-free-icons';
import { UniversalWorkOrder } from '../types';
import { DynamicJobShieldBadge } from './DynamicJobShieldBadge';
import { resolveDiagnosticRule } from '../utils/tradeIconResolver';
import { getTradeTheme } from '../utils/tradeThemeEngine';

interface HeroJobCardProps {
  order: UniversalWorkOrder;
  trade?: string;
  onSelectOrder: (order: UniversalWorkOrder) => void;
  onCallClient: (phone: string, clientName: string) => void;
  onStartInspection: (order: UniversalWorkOrder) => void;
}

export const HeroJobCard: React.FC<HeroJobCardProps> = ({
  order,
  trade,
  onSelectOrder,
  onCallClient,
  onStartInspection,
}) => {
  const escrowValue = order.escrowAmount ?? order.escrowLockedAmount ?? 199;
  const isHighPriority =
    order.priority === 'HIGH_PRIORITY' ||
    order.priority === 'High Priority' ||
    order.priority === 'Urgent';

  const priorityLabel = isHighPriority
    ? 'HIGH PRIORITY'
    : order.priority === 'SCHEDULED'
    ? 'SCHEDULED'
    : 'UPCOMING';

  const clientName = order.clientName || order.client?.name || 'Client';
  const clientPhone = order.clientPhone || order.client?.phone || '+91 98390 14221';
  const clientRole = order.clientRole || (order.client?.verifiedHomeowner ? 'Verified Homeowner' : 'Verified Client');
  const avatarInitials =
    order.clientAvatarInitials ||
    order.client?.avatarInitials ||
    clientName
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  const activeTrade = trade || order.tradeCategory || order.tradeLabel || order.trade || 'Electrical';
  const theme = useMemo(() => getTradeTheme(activeTrade), [activeTrade]);

  // 3-Tier Enterprise Diagnostic Requirement Engine Resolution
  const requirement = useMemo(
    () =>
      order.diagnosticRequirement ||
      resolveDiagnosticRule(activeTrade, order.issueTitle || order.title || ''),
    [order.diagnosticRequirement, activeTrade, order.issueTitle, order.title]
  );

  return (
    <div
      onClick={() => onSelectOrder(order)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelectOrder(order);
        }
      }}
      className={`liquid-glass-card ${theme.themeClass} w-full min-w-0 box-border overflow-hidden p-5 sm:p-6 md:p-7 rounded-[32px] sm:rounded-[36px] relative select-none cursor-pointer active:scale-[0.99] transition-all duration-300 group h-auto flex flex-col gap-4`}
    >
      {/* Dynamic 3D Shield Badge with Trade-Specific 3D Emblem & Live Beacon */}
      <DynamicJobShieldBadge trade={activeTrade} />

      {/* 1. Top Header: Trade Badge, Priority, Price/Escrow Pill, Diagnostic Chip */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 pr-16 md:pr-20 w-full">
        {/* Authoritative Trade Tag Badge */}
        <span className="bg-[#111111] text-white px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-2xs flex items-center gap-1.5 shrink-0">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
            style={{ backgroundColor: theme.accentHex }}
          />
          <span>{theme.tradeTag}</span>
        </span>

        <span className="bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-[#111111] shadow-2xs border border-white/60 shrink-0">
          {priorityLabel}
        </span>

        {/* Escrow Lock Badge */}
        <span className="bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-800 shadow-2xs border border-white/60 flex items-center gap-1 shrink-0">
          <HugeiconsIcon icon={LockKeyIcon} size={13} strokeWidth={2.4} className="text-emerald-700" />
          <span>₹{escrowValue}</span>
        </span>

        {/* Dynamic Diagnostic Requirement Badge */}
        {requirement === 'TEXT_SPECS_ONLY' && (
          <span className="bg-emerald-900/10 text-emerald-950 border border-emerald-600/30 backdrop-blur-md px-2 py-0.5 rounded-full text-[9.5px] font-bold flex items-center gap-1 shadow-2xs shrink-0">
            <HugeiconsIcon icon={LockKeyIcon} size={11} strokeWidth={2.4} />
            <span>TEXT SPECS ONLY</span>
          </span>
        )}

        {requirement === 'PHOTO_OPTIONAL' && (
          <span className="bg-amber-900/10 text-amber-950 border border-amber-600/30 backdrop-blur-md px-2 py-0.5 rounded-full text-[9.5px] font-bold flex items-center gap-1 shadow-2xs shrink-0">
            <HugeiconsIcon icon={VoiceIcon} size={11} strokeWidth={2.4} />
            <span>PHOTO OPTIONAL</span>
          </span>
        )}

        {requirement === 'PHOTO_MANDATORY' && (
          <span className="bg-rose-900/10 text-rose-950 border border-rose-600/30 backdrop-blur-md px-2 py-0.5 rounded-full text-[9.5px] font-bold flex items-center gap-1 shadow-2xs shrink-0">
            <HugeiconsIcon icon={AlertCircleIcon} size={13} strokeWidth={2.4} />
            <span>PHOTO MANDATORY</span>
          </span>
        )}
      </div>

      {/* 2. Title & ETA: Full-Width Clean Linear Layout */}
      <div className="relative z-10 w-full min-w-0">
        <h2 className="text-[22px] sm:text-[24px] font-extrabold tracking-tight text-[#111111] leading-snug break-words">
          {order.issueTitle || order.title}
        </h2>

        {/* Location & ETA */}
        <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#111111]/70 font-medium mt-1 leading-snug">
          <span className="flex items-center gap-1">
            <HugeiconsIcon icon={Location01Icon} size={14} strokeWidth={2.2} className="shrink-0 text-[#111111]/60" />
            <span>{order.location}</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1 shrink-0">
            <HugeiconsIcon icon={Clock01Icon} size={14} strokeWidth={2.2} className="shrink-0 text-[#111111]/60" />
            <span>{order.eta || '12 mins ETA'}</span>
          </span>
        </div>

        {/* Trade Telemetry Pill */}
        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-[#111111]/85 bg-white/50 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/60 w-fit">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: theme.accentHex }}
          />
          <span>{theme.telemetryFormat(order)}</span>
        </div>
      </div>

      {/* 3. Diagnostic Fault Proof Card (Full Width) */}
      <div className="relative z-10 w-full min-w-0">
        {requirement === 'TEXT_SPECS_ONLY' && (
          <div className="w-full flex flex-col justify-between bg-white/60 backdrop-blur-md rounded-2xl p-3.5 border border-white/60 shadow-2xs gap-2">
            <div className="flex items-center justify-between">
              <span className="bg-white/80 text-[10px] font-extrabold uppercase tracking-wider text-[#111111] px-2 py-0.5 rounded-md flex items-center gap-1">
                <HugeiconsIcon icon={ShieldCheckIcon} size={12} strokeWidth={2.2} className="text-emerald-700" />
                VERIFIED SERVICE SPECIFICATIONS
              </span>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                Privacy Mode Active
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 py-0.5">
              {(order.serviceSpecs || ['Client Privacy Protected', 'Direct Consultation', 'Custom Specs', 'Sanitized Kit']).map(
                (spec, idx) => (
                  <span
                    key={idx}
                    className="shrink-0 bg-white/90 px-2.5 py-1 rounded-xl text-[11px] font-semibold text-[#111111] border border-black/5 shadow-2xs"
                  >
                    {spec}
                  </span>
                )
              )}
            </div>
          </div>
        )}

        {requirement === 'PHOTO_OPTIONAL' && (
          <div className="w-full flex flex-col justify-between bg-white/60 backdrop-blur-md rounded-2xl p-3.5 border border-white/60 shadow-2xs gap-2">
            <div className="flex items-center justify-between">
              <span className="bg-white/80 text-[10px] font-extrabold uppercase tracking-wider text-[#111111] px-2 py-0.5 rounded-md flex items-center gap-1">
                <HugeiconsIcon icon={VoiceIcon} size={12} strokeWidth={2.2} className="text-amber-700" />
                ROUTINE REPAIR · VOICE & SPECS
              </span>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded">
                Photo Optional
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 bg-white/80 rounded-xl px-3 py-2 border border-black/5">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-900 flex items-center justify-center shrink-0">
                  <HugeiconsIcon icon={VoiceIcon} size={12} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-semibold text-[#111111] truncate">
                  {order.clientVoiceNoteDuration || '0:32 audio description attached'}
                </span>
              </div>
              <span className="text-[10px] font-bold text-[#111111]/70 bg-black/5 px-2 py-0.5 rounded-md shrink-0">
                Play Audio
              </span>
            </div>
          </div>
        )}

        {requirement === 'PHOTO_MANDATORY' && (
          <div className="w-full bg-white/60 backdrop-blur-md rounded-2xl p-3.5 border border-white/60 shadow-2xs flex items-center gap-3.5">
            {/* Visual Fault Photo Proof Thumbnail */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-slate-900/10 border border-black/10 overflow-hidden relative shrink-0 flex items-center justify-center">
              {order.evidenceThumbnailUrl ? (
                <img
                  src={order.evidenceThumbnailUrl}
                  alt="Fault Evidence"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-rose-500/20 to-amber-500/30 flex items-center justify-center">
                  <HugeiconsIcon icon={Camera01Icon} size={24} strokeWidth={2} className="text-rose-700" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/10" />
              <span className="absolute bottom-0.5 right-0.5 bg-rose-600 text-white text-[8px] font-black px-1 rounded">
                PROOF
              </span>
            </div>

            {/* Inspection details */}
            <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 gap-1">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-800 bg-rose-100/90 px-2 py-0.5 rounded leading-none flex items-center gap-1">
                  <HugeiconsIcon icon={AlertCircleIcon} size={12} strokeWidth={2.4} />
                  CRITICAL HAZARD PROOF
                </span>
                <span className="text-[10px] font-bold text-rose-700">Mandatory</span>
              </div>
              <p className="text-[13px] font-bold text-[#111111] truncate leading-tight">
                {order.diagnosticTag || 'Burn/Flashover Evidence Attached'}
              </p>
              <p className="text-[11px] text-[#111111]/70 font-medium leading-none">
                GPS Verified · Tap to Inspect
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 4. Verified Homeowner Bar */}
      <div className="relative z-10 w-full bg-white/70 backdrop-blur-md rounded-2xl p-3 flex items-center justify-between gap-3 border border-white/60 shadow-xs">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-[#111111] text-white font-bold text-xs flex items-center justify-center shrink-0">
            {avatarInitials}
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-[#111111] truncate leading-tight">
              {clientName}
            </p>
            <p className="text-[11px] text-emerald-700 font-semibold leading-none mt-0.5 flex items-center gap-1">
              <HugeiconsIcon icon={CheckmarkBadge01Icon} size={14} strokeWidth={2.4} className="text-emerald-600 shrink-0" />
              <span className="truncate">{clientRole}</span>
            </p>
          </div>
        </div>

        {/* Direct Call Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onCallClient(clientPhone, clientName);
          }}
          aria-label={`Call client ${clientName}`}
          className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full bg-[#111111] text-white flex items-center justify-center hover:bg-black active:scale-95 transition-all shrink-0 shadow-xs cursor-pointer"
          title="Direct Call Client"
        >
          <HugeiconsIcon icon={Call02Icon} size={18} strokeWidth={2.2} />
        </button>
      </div>

      {/* 5. Escrow Banner & Primary Action Button */}
      <div className="relative z-10 w-full space-y-2 pt-1">
        <div className="flex items-center justify-between px-1 text-[11px] font-semibold text-[#111111]/80">
          <span className="flex items-center gap-1.5 text-emerald-900 bg-emerald-100/80 border border-emerald-300/50 px-2.5 py-1 rounded-xl text-[10.5px] font-bold">
            <HugeiconsIcon icon={ShieldCheckIcon} size={14} strokeWidth={2.2} className="text-emerald-700" />
            100% Upfront RBI Escrow Guaranteed
          </span>
          <span className="text-[10px] text-[#111111]/60 font-mono">
            Dispatch ID: {order.orderNumber || order.id}
          </span>
        </div>

        {/* Dynamic Primary Action Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onStartInspection(order);
          }}
          className="relative z-10 w-full py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-[14px] font-bold bg-[#111111] hover:bg-black text-white shadow-md active:scale-98 transition-all cursor-pointer"
        >
          {requirement === 'TEXT_SPECS_ONLY' && (
            <>
              <HugeiconsIcon icon={Calendar01Icon} size={20} strokeWidth={2.2} />
              <span>Accept & Lock Slot</span>
            </>
          )}

          {requirement === 'PHOTO_OPTIONAL' && (
            <>
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} strokeWidth={2.2} />
              <span>Review Details & Accept</span>
            </>
          )}

          {requirement === 'PHOTO_MANDATORY' && (
            <>
              <HugeiconsIcon icon={Camera01Icon} size={20} strokeWidth={2.2} />
              <span>Start Inspection & Proof</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
