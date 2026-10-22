import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Search01Icon,
  Exchange01Icon,
  ShieldCheckIcon,
} from '@hugeicons/core-free-icons';
import { ProProfile } from '../types';

interface HeaderModuleProps {
  pro: ProProfile;
  onOpenSearch: () => void;
  onSelectTrade?: (trade: string) => void;
  onLogout?: () => void;
}

export const HeaderModule: React.FC<HeaderModuleProps> = ({
  pro,
  onOpenSearch,
  onSelectTrade,
  onLogout,
}) => {
  const [showTradeTray, setShowTradeTray] = useState(false);

  const DEMO_TRADES = [
    { title: 'Master Electrician', chipLabel: 'Electrician' },
    { title: 'Bridal & HD Makeup Artist', chipLabel: 'Bridal Makeup' },
    { title: 'Master Plumbing', chipLabel: 'Plumber' },
    { title: 'AC Specialist', chipLabel: 'HVAC' },
    { title: 'Master Carpenter', chipLabel: 'Carpenter' },
    { title: 'Auto Fleet Mechanic', chipLabel: 'Automotive' },
    { title: 'Deep Sanitization Lead', chipLabel: 'Cleaning' },
  ];

  const initials =
    pro.avatarInitials ||
    (pro.name
      ? pro.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase()
      : 'MP');

  return (
    <header className="pt-2 pb-3">
      <div className="flex items-center justify-between gap-2 sm:gap-3">
        {/* Left: Rounded circular avatar with subtle outer border and clean green online badge */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setShowTradeTray(!showTradeTray)}
              aria-label="Toggle Trade Switcher Demo Tray"
              title="Click avatar to test dynamic trade resolver"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white p-0.5 shadow-sm border border-black/5 flex items-center justify-center cursor-pointer active:scale-95 transition-transform group"
            >
              <div className="w-full h-full rounded-full bg-[#1E293B] text-white flex items-center justify-center font-black text-xs tracking-wider overflow-hidden group-hover:ring-2 group-hover:ring-amber-400 transition-all shadow-inner">
                {initials}
              </div>
            </button>
            {/* Active green online status indicator */}
            <span
              className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-[#10B981] border-2 border-[#F6F7FA]"
              title="Online"
            />
          </div>

          {/* Text Lockup: Hello, Ramesh / Studio Command · Pooja + Active Trade Indicator */}
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap min-w-0">
              <h1 className="text-[16px] sm:text-[17px] font-bold text-[#111111] leading-snug truncate">
                {pro.accountId?.startsWith('MUA') || pro.tradeCategory === 'beauty' || pro.tradeCategory === 'makeup'
                  ? `Studio Command · ${pro.name.split(' ')[0]}`
                  : `Hello, ${pro.name.split(' ')[0]}`}
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200/60 leading-none shrink-0">
                L{pro.level}
              </span>
              {pro.accountId && (
                <span className="text-[10px] font-extrabold font-mono px-1.5 py-0.5 rounded-md bg-slate-200/80 text-[#111111] border border-black/10 flex items-center gap-1 shrink-0">
                  <HugeiconsIcon icon={ShieldCheckIcon} size={14} strokeWidth={2.2} className="text-emerald-700" />
                  <span>{pro.accountId}</span>
                </span>
              )}
            </div>
            <p className="text-[11px] sm:text-[11.5px] text-[#71717A] font-medium leading-none mt-1 truncate">
              Today, 21 Oct · <span className="text-[#111111] font-semibold">{pro.title}</span>
            </p>
          </div>
        </div>

        {/* Right actions: Switch Persona + Search Trigger */}
        <div className="flex items-center gap-1.5 shrink-0">
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              aria-label="Switch Pro Persona"
              className="h-10 px-2.5 rounded-full bg-white shadow-sm border border-black/5 flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#111111] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer"
              title="Switch Pro Persona / Logout"
            >
              <HugeiconsIcon icon={Exchange01Icon} size={16} strokeWidth={2.2} className="text-amber-600" />
              <span>Switch</span>
            </button>
          )}

          {/* Clean minimal circular search icon button using @hugeicons/react Search01Icon */}
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Search and Filter"
            className="w-10 h-10 rounded-full bg-white shadow-sm border border-black/5 flex items-center justify-center text-[#111111] hover:bg-slate-50 active:scale-95 transition-all shrink-0 cursor-pointer"
            title="Search"
          >
            <HugeiconsIcon icon={Search01Icon} size={18} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* Trade Switcher Demo Tray (Click avatar to toggle) */}
      {showTradeTray && (
        <div className="mt-3 p-3 bg-white rounded-2xl border border-black/5 shadow-xs animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A]">
              Dynamic Universal Trade Switcher
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live App Sync
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {DEMO_TRADES.map((item) => {
              const isCurrent = pro.title === item.title;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => {
                    onSelectTrade?.(item.title);
                  }}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#111111] text-white shadow-xs'
                      : 'bg-slate-100 text-[#111111] hover:bg-slate-200'
                  }`}
                >
                  {item.chipLabel}
                </button>
              );
            })}
          </div>
          <p className="text-[10px] text-[#71717A] mt-2 leading-tight">
            Click any trade to immediately adapt hero jobs, 3D emblems, tools, and dock icons across all 6 core categories.
          </p>

          {onLogout && (
            <div className="mt-2.5 pt-2 border-t border-black/5 flex justify-end">
              <button
                type="button"
                onClick={onLogout}
                className="text-[11px] font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 py-1 px-2.5 rounded-xl hover:bg-amber-50 active:scale-95 transition-all cursor-pointer"
              >
                <HugeiconsIcon icon={Exchange01Icon} size={15} strokeWidth={2.2} />
                <span>Switch Persona / Return to Login</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
