import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Calendar03Icon,
  Timer01Icon,
  SecurityCheckIcon,
  Location01Icon,
} from '@hugeicons/core-free-icons';
import { UniversalWorkOrder } from '../types';

interface AsymmetricWorkGridProps {
  secondaryOrder: UniversalWorkOrder;
  upcomingOrder?: UniversalWorkOrder;
  activeTrade?: string;
  onSelectOrder: (order: UniversalWorkOrder) => void;
}

export const AsymmetricWorkGrid: React.FC<AsymmetricWorkGridProps> = ({
  secondaryOrder,
  upcomingOrder,
  onSelectOrder,
}) => {
  const secondaryEscrow = secondaryOrder.escrowAmount ?? secondaryOrder.escrowLockedAmount ?? 349;
  const secondaryTag = secondaryOrder.priority === 'SCHEDULED' ? 'Scheduled' : 'Queue';
  const secondaryTiming = secondaryOrder.timeSlot || secondaryOrder.eta || '14:00';

  const upcomingEscrow = upcomingOrder ? (upcomingOrder.escrowAmount ?? upcomingOrder.escrowLockedAmount ?? 249) : 0;
  const upcomingTag = upcomingOrder?.priority === 'UPCOMING' ? 'Upcoming' : 'Scheduled';
  const upcomingTiming = upcomingOrder?.timeSlot || upcomingOrder?.eta || '16:30';

  return (
    <section className="mt-2 mb-2 select-none w-full">
      {/* Section Title (Mobile Only - Hidden in Desktop Sidebar since header exists) */}
      <h3 className="text-[20px] font-bold text-[#111111] mb-3 tracking-tight md:hidden">
        Next in Queue
      </h3>

      {/* 2-Column Grid on Mobile / 1-Column Vertical Stack on Desktop */}
      <div className="grid grid-cols-2 md:flex md:flex-col gap-3 md:gap-3.5 w-full min-w-0">
        {/* Card 1: Liquid Chromic Glass Sky Blue (#D2E7FF) Scheduled Job */}
        <div
          onClick={() => onSelectOrder(secondaryOrder)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onSelectOrder(secondaryOrder);
            }
          }}
          className="liquid-glass-card glass-skyblue p-3.5 sm:p-4 rounded-[22px] sm:rounded-[26px] min-w-0 overflow-hidden flex flex-col justify-between relative cursor-pointer select-none active:scale-[0.99] transition-all gap-2.5"
        >
          {/* Top Row: Time Badge on Left, Escrow Badge on Right */}
          <div className="flex flex-wrap items-center justify-between gap-1.5 w-full relative z-10">
            <div className="bg-white/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#111111] shadow-2xs border border-white/60 flex items-center gap-1.5 shrink-0">
              <HugeiconsIcon icon={Calendar03Icon} size={13} strokeWidth={2.2} className="shrink-0 text-slate-700" />
              <span>{secondaryTag} · {secondaryTiming}</span>
            </div>

            <span className="text-[10px] text-emerald-900 bg-emerald-100/90 font-bold px-2 py-0.5 rounded-xl flex items-center gap-1 border border-emerald-300/40 shrink-0">
              <HugeiconsIcon icon={SecurityCheckIcon} size={12} strokeWidth={2.4} className="text-emerald-700 shrink-0" />
              <span>₹{secondaryEscrow} Locked</span>
            </span>
          </div>

          {/* Middle Row: Full Job Title */}
          <div className="relative z-10 min-w-0 flex-1">
            <h4 className="font-bold text-[15px] text-gray-900 leading-snug break-words">
              {secondaryOrder.issueTitle || secondaryOrder.title}
            </h4>
          </div>

          {/* Bottom Row: Location with Icon */}
          <div className="relative z-10 flex items-center gap-1 text-[12px] text-gray-600 font-medium pt-1 border-t border-black/5">
            <HugeiconsIcon icon={Location01Icon} size={14} strokeWidth={2} className="shrink-0 text-gray-500" />
            <span className="break-words truncate">{secondaryOrder.location}</span>
          </div>
        </div>

        {/* Card 2: Liquid Chromic Glass Warm Apricot (#FFDFA6) Upcoming Job */}
        {upcomingOrder && (
          <div
            onClick={() => onSelectOrder(upcomingOrder)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectOrder(upcomingOrder);
              }
            }}
            className="liquid-glass-card glass-apricot p-3.5 sm:p-4 rounded-[22px] sm:rounded-[26px] min-w-0 overflow-hidden flex flex-col justify-between relative cursor-pointer select-none active:scale-[0.99] transition-all gap-2.5"
          >
            {/* Top Row: Time Badge on Left, Escrow Badge on Right */}
            <div className="flex flex-wrap items-center justify-between gap-1.5 w-full relative z-10">
              <div className="bg-white/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#111111] shadow-2xs border border-white/60 flex items-center gap-1.5 shrink-0">
                <HugeiconsIcon icon={Timer01Icon} size={13} strokeWidth={2.2} className="shrink-0 text-slate-700" />
                <span>{upcomingTag} · {upcomingTiming}</span>
              </div>

              <span className="text-[10px] text-emerald-900 bg-emerald-100/90 font-bold px-2 py-0.5 rounded-xl flex items-center gap-1 border border-emerald-300/40 shrink-0">
                <HugeiconsIcon icon={SecurityCheckIcon} size={12} strokeWidth={2.4} className="text-emerald-700 shrink-0" />
                <span>₹{upcomingEscrow} Locked</span>
              </span>
            </div>

            {/* Middle Row: Full Job Title */}
            <div className="relative z-10 min-w-0 flex-1">
              <h4 className="font-bold text-[15px] text-gray-900 leading-snug break-words">
                {upcomingOrder.issueTitle || upcomingOrder.title}
              </h4>
            </div>

            {/* Bottom Row: Location with Icon */}
            <div className="relative z-10 flex items-center gap-1 text-[12px] text-gray-600 font-medium pt-1 border-t border-black/5">
              <HugeiconsIcon icon={Location01Icon} size={14} strokeWidth={2} className="shrink-0 text-gray-500" />
              <span className="break-words truncate">{upcomingOrder.location}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
