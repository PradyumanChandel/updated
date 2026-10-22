import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Cancel01Icon,
  FlashIcon,
  CheckmarkCircle02Icon,
  ShieldCheckIcon,
  Building02Icon,
  Clock01Icon,
  RefreshIcon,
} from '@hugeicons/core-free-icons';
import { ProProfile } from '../types';

interface UpiPayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  pro: ProProfile;
  onPayoutSuccess: (amount: number) => void;
}

export const UpiPayoutModal: React.FC<UpiPayoutModalProps> = ({
  isOpen,
  onClose,
  pro,
  onPayoutSuccess,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleWithdraw = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      onPayoutSuccess(pro.walletBalance);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1800);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs select-none">
      <div className="w-full max-w-[430px] bg-white text-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <HugeiconsIcon icon={FlashIcon} size={16} strokeWidth={2.4} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                Instant UPI Payout
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Direct 0-fee IMPS payout to verified bank
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close UPI Payout"
            className="w-11 h-11 rounded-full bg-slate-200/70 hover:bg-slate-300 flex items-center justify-center text-slate-600 active:scale-95 transition-all cursor-pointer"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={2.0} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 flex-1 overflow-y-auto">
          {/* Balance Spotlight */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-zinc-900 text-white p-4.5 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <p className="text-[11px] uppercase tracking-wider text-zinc-400 font-semibold">
              Available for Instant Withdrawal
            </p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-extrabold tracking-tight tabular-nums">
                ₹{pro.walletBalance.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-emerald-400 font-semibold">
                · Ready now
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-300">
              <span className="text-[11px] text-zinc-400">Escrow Locked (3 active jobs):</span>
              <span className="font-bold tabular-nums text-amber-300">₹{pro.escrowPending}</span>
            </div>
          </div>

          {/* Destination Account */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Payout Destination
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                <HugeiconsIcon icon={CheckmarkCircle02Icon} size={13} strokeWidth={2.4} /> VERIFIED VPA
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-2xs font-bold text-xs">
                <HugeiconsIcon icon={Building02Icon} size={20} strokeWidth={2.0} className="text-blue-700" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-900 truncate">
                  HDFC Bank · A/c ending 8812
                </p>
                <p className="text-[11px] font-mono text-slate-500 truncate">
                  {pro.upiId}
                </p>
              </div>
            </div>
          </div>

          {/* Quick settlement features */}
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={ShieldCheckIcon} size={14} strokeWidth={2.2} className="text-emerald-600 shrink-0" />
              <span>NPCI Instant Settlement · Real-time UTR generation</span>
            </div>
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Clock01Icon} size={14} strokeWidth={2.2} className="text-emerald-600 shrink-0" />
              <span>Zero gateway deduction for Level 3 Certified Pros</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50">
          {isSuccess ? (
            <div className="w-full h-12 min-h-[44px] rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={18} strokeWidth={2.4} />
              <span>Payout Transferred Successfully!</span>
            </div>
          ) : (
            <button
              type="button"
              disabled={isProcessing || pro.walletBalance <= 0}
              onClick={handleWithdraw}
              className="w-full h-12 min-h-[44px] rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <HugeiconsIcon icon={RefreshIcon} size={16} strokeWidth={2.2} className="animate-spin text-amber-400" />
                  <span>Transferring to UPI...</span>
                </>
              ) : (
                <>
                  <HugeiconsIcon icon={FlashIcon} size={16} strokeWidth={2.4} className="text-amber-400" />
                  <span>Withdraw ₹{pro.walletBalance.toLocaleString('en-IN')} via UPI Now</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
