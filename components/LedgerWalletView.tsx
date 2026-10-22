import React, { useMemo } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  FlashIcon,
  ArrowDownLeft01Icon,
  LockKeyIcon,
  ShieldCheckIcon,
  Award01Icon,
} from '@hugeicons/core-free-icons';
import { ProProfile } from '../types';
import { getTradeTheme } from '../utils/tradeThemeEngine';

interface LedgerWalletViewProps {
  pro: ProProfile;
  onOpenUpiPayout: () => void;
}

export const LedgerWalletView: React.FC<LedgerWalletViewProps> = ({
  pro,
  onOpenUpiPayout,
}) => {
  const activeTrade = pro.title || pro.tradeCategory || 'electrical';
  const theme = useMemo(() => getTradeTheme(activeTrade), [activeTrade]);

  return (
    <div className="space-y-4 pb-4">
      {/* Wallet Balance Hero Card - Warm Apricot Soft Card */}
      <div className="rounded-[28px] bg-[#FFDFA6] text-[#111111] p-5 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#111111]/70">
            Escrow Wallet Balance
          </span>
          {/* Trade Milestone Safety & Quality Badge */}
          <div className="flex items-center gap-1.5 bg-black/10 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-extrabold text-[#111111]">
            <HugeiconsIcon icon={Award01Icon} size={13} strokeWidth={2.4} className="text-amber-800 shrink-0" />
            <span>{theme.prideStatLabel}</span>
          </div>
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-3xl font-extrabold tracking-tight tabular-nums">
            ₹{pro.walletBalance.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-emerald-800 font-semibold bg-white/70 px-2 py-0.5 rounded-full">
            Ready to Payout
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-black/10 text-xs">
          <div>
            <span className="text-[10px] text-[#111111]/60 block font-semibold">LOCKED IN ESCROW</span>
            <span className="font-bold text-[#111111] tabular-nums">₹{pro.escrowPending}</span>
          </div>
          <div>
            <span className="text-[10px] text-[#111111]/60 block font-semibold">DAILY BONUS EARNED</span>
            <span className="font-bold text-emerald-800 tabular-nums">₹150 of ₹{pro.dailyTarget.bonusAmount}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenUpiPayout}
          className="mt-4 w-full min-h-[44px] h-11 rounded-2xl bg-[#111111] hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-98 transition-all cursor-pointer"
        >
          <HugeiconsIcon icon={FlashIcon} size={16} strokeWidth={2.4} className="text-amber-400" />
          <span>Instant UPI Withdrawal ({pro.upiId.split('@')[0]})</span>
        </button>
      </div>

      {/* Upfront Escrow Security Notice */}
      <div className="p-4 rounded-[22px] bg-white shadow-xs flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
          <HugeiconsIcon icon={ShieldCheckIcon} size={20} strokeWidth={2.2} />
        </div>
        <div className="text-xs">
          <p className="font-bold text-[#111111]">100% Upfront Escrow Guarantee</p>
          <p className="text-[#71717A] text-[11px] mt-0.5">
            Funds are locked in RBI-approved escrow prior to dispatch. Zero default risk.
          </p>
        </div>
      </div>

      {/* Transaction Ledger */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
            Today's Escrow Ledger
          </h4>
          <span className="text-[11px] text-[#71717A] font-mono">21 Oct 2026</span>
        </div>

        <div className="rounded-[22px] bg-white divide-y divide-slate-100 overflow-hidden shadow-xs">
          {/* Row 1: Released Payout */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={ArrowDownLeft01Icon} size={16} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#111111]">
                  Kitchen Rewiring (WO-8188)
                </p>
                <p className="text-[10px] text-[#71717A]">
                  09:15 AM · Escrow Released
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-700 tabular-nums block">
                +₹450.00
              </span>
              <span className="text-[9px] text-[#71717A] font-mono">
                UTR: #429810
              </span>
            </div>
          </div>

          {/* Row 2: In Progress Locked */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={LockKeyIcon} size={16} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#111111]">
                  MCB Tripping (WO-8192)
                </p>
                <p className="text-[10px] text-amber-800 font-semibold">
                  Active Inspection · Locked
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-amber-800 tabular-nums block">
                ₹199.00
              </span>
              <span className="text-[9px] text-[#71717A] font-mono">
                Escrow Hold
              </span>
            </div>
          </div>

          {/* Row 3: Scheduled Locked */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={LockKeyIcon} size={16} strokeWidth={2.2} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#111111]">
                  AC Wiring Check (WO-8195)
                </p>
                <p className="text-[10px] text-[#71717A]">
                  Scheduled 14:00 · Locked
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#111111] tabular-nums block">
                ₹349.00
              </span>
              <span className="text-[9px] text-[#71717A] font-mono">
                Escrow Hold
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
