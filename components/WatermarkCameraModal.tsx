import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Cancel01Icon,
  Camera01Icon,
  ShieldCheckIcon,
  Tick01Icon,
} from '@hugeicons/core-free-icons';
import { WorkOrder } from '../types';

interface WatermarkCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrder?: WorkOrder;
}

export const WatermarkCameraModal: React.FC<WatermarkCameraModalProps> = ({
  isOpen,
  onClose,
  activeOrder,
}) => {
  const [photoState, setPhotoState] = useState<'viewfinder' | 'captured' | 'saved'>('viewfinder');
  const [watermarkTag, setWatermarkTag] = useState<'Before Work' | 'Hazard Found' | 'After Work'>('Before Work');

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalWidth = document.body.style.width;
      const originalHeight = document.body.style.height;

      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100vh';

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.width = originalWidth;
        document.body.style.height = originalHeight;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  const handleCapture = () => {
    setPhotoState('captured');
  };

  const handleSave = () => {
    setPhotoState('saved');
    setTimeout(() => {
      onClose();
      setPhotoState('viewfinder');
    }, 1200);
  };

  const orderTitle = activeOrder ? (activeOrder.issueTitle || activeOrder.title) : 'Active Field Work Order';
  const orderNumber = activeOrder ? (activeOrder.orderNumber || activeOrder.id) : 'WO-8192';
  const orderLocation = activeOrder ? activeOrder.location : 'Civil Lines, Sector 4, Prayagraj';

  return createPortal(
    <div className="fixed inset-0 z-[999] flex flex-col justify-end pointer-events-auto select-none">
      {/* Dark Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-Up Bottom Sheet */}
      <div className="relative w-full max-w-[390px] sm:max-w-[420px] mx-auto h-[88vh] max-h-[88dvh] bg-[#121214] text-white rounded-t-[36px] border border-white/10 shadow-2xl flex flex-col overflow-hidden z-10 animate-in slide-in-from-bottom duration-300">
        {/* Header with drag handle */}
        <div className="pt-3 pb-2.5 px-5 flex flex-col items-center border-b border-white/10 shrink-0 bg-[#121214]">
          <div className="w-12 h-1.5 bg-zinc-700 rounded-full mb-2.5" />
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={Camera01Icon} size={16} strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white tracking-tight truncate">
                  Camera Watermark Proof
                </h3>
                <p className="text-[10px] text-zinc-400 truncate">
                  GPS & Escrow Timestamped Documentation
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Watermark Camera"
              className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={2.0} />
            </button>
          </div>
        </div>

        {/* Tag Switcher */}
        <div className="px-5 pt-3 pb-1 flex items-center gap-2">
          {(['Before Work', 'Hazard Found', 'After Work'] as const).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setWatermarkTag(tag)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all min-h-[36px] cursor-pointer ${
                watermarkTag === tag
                  ? 'bg-amber-400 text-black shadow-xs font-bold'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Viewfinder / Captured Photo Area */}
        <div className="p-4 flex-1">
          <div className="relative aspect-4/3 rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden flex flex-col justify-between p-3.5">
            {/* Background Simulated Panel Graphic */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-800 to-zinc-950 opacity-90 flex items-center justify-center pointer-events-none">
              <svg viewBox="0 0 200 150" className="w-full h-full opacity-30" fill="none">
                <rect x="20" y="20" width="160" height="110" rx="8" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M50 40h100M50 75h100M50 110h100" stroke="#71717A" strokeWidth="1.5" />
                <circle cx="60" cy="55" r="5" fill="#EF4444" />
                <circle cx="80" cy="55" r="5" fill="#10B981" />
                <circle cx="100" cy="55" r="5" fill="#F59E0B" />
                <path d="M130 50l10 15-10 15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Top Overlay Badge */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-amber-400 border border-amber-400/30 uppercase tracking-wider">
                {watermarkTag}
              </span>
              <span className="text-[10px] font-mono text-zinc-300 bg-black/60 px-2 py-0.5 rounded">
                {orderNumber}
              </span>
            </div>

            {/* Mandatory Enterprise Watermark Overlay (Bottom of Photo) */}
            <div className="relative z-10 bg-black/85 backdrop-blur-md rounded-xl p-2.5 border border-white/10 text-left font-mono">
              <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-1.5">
                <span className="text-[11px] font-bold text-white tracking-wide">
                  MAGIKSCILL PRO CERTIFIED
                </span>
                <span className="text-[9px] text-emerald-400 font-semibold flex items-center gap-1">
                  <HugeiconsIcon icon={ShieldCheckIcon} size={12} strokeWidth={2.4} /> ESCROW SECURED
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9px] text-zinc-300">
                <div>
                  <span className="text-zinc-500">PRO:</span> Ramesh Sharma (L3)
                </div>
                <div>
                  <span className="text-zinc-500">DATE:</span> 21 Oct 2026 10:48 IST
                </div>
                <div className="col-span-2 truncate">
                  <span className="text-zinc-500">LOC:</span> {orderLocation} (25.4358°N, 81.8463°E)
                </div>
                <div className="col-span-2 truncate text-amber-300">
                  <span className="text-zinc-500">JOB:</span> {orderTitle}
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-zinc-400 text-center mt-2 font-medium">
            Watermarked evidence is tamper-proof and required to unlock client escrow payout.
          </p>
        </div>

        {/* Footer controls */}
        <div className="p-4 border-t border-white/10 bg-zinc-950 flex items-center gap-3">
          {photoState === 'viewfinder' && (
            <button
              type="button"
              onClick={handleCapture}
              className="w-full min-h-[44px] h-12 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:bg-amber-300 active:scale-98 transition-all cursor-pointer"
            >
              <HugeiconsIcon icon={Camera01Icon} size={16} strokeWidth={2.4} />
              <span>Capture Watermarked Proof</span>
            </button>
          )}

          {photoState === 'captured' && (
            <div className="flex items-center gap-2 w-full">
              <button
                type="button"
                onClick={() => setPhotoState('viewfinder')}
                className="w-1/3 min-h-[44px] h-12 rounded-xl bg-zinc-800 text-zinc-200 font-semibold text-xs flex items-center justify-center hover:bg-zinc-700 cursor-pointer active:scale-95 transition-all"
              >
                Retake
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="w-2/3 min-h-[44px] h-12 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg hover:bg-emerald-400 cursor-pointer active:scale-95 transition-all"
              >
                <HugeiconsIcon icon={Tick01Icon} size={16} strokeWidth={2.4} />
                <span>Save & Attach to Work Order</span>
              </button>
            </div>
          )}

          {photoState === 'saved' && (
            <div className="w-full min-h-[44px] h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm flex items-center justify-center gap-2">
              <HugeiconsIcon icon={Tick01Icon} size={16} strokeWidth={2.4} />
              <span>Photo Attached to Escrow File!</span>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
