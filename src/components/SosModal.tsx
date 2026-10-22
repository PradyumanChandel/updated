import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Cancel01Icon,
  Call02Icon,
  Alert02Icon,
  AlertCircleIcon,
  ShieldAlertIcon,
  Radar01Icon,
} from '@hugeicons/core-free-icons';
import { ProProfile } from '../types';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
  pro: ProProfile;
}

export const SosModal: React.FC<SosModalProps> = ({
  isOpen,
  onClose,
  pro,
}) => {
  const [beaconActive, setBeaconActive] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-xs select-none">
      <div className="w-full max-w-[430px] bg-zinc-950 text-white rounded-t-3xl sm:rounded-3xl border border-rose-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-rose-500/20 bg-rose-950/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center animate-pulse">
              <HugeiconsIcon icon={Alert02Icon} size={16} strokeWidth={2.4} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Emergency & Safety Escalation
              </h3>
              <p className="text-[11px] text-rose-300 font-medium">
                {pro.hub} · Priority Safety Response
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close SOS"
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 active:scale-95 transition-all cursor-pointer"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={2.0} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-3.5 flex-1 overflow-y-auto">
          {/* Emergency Beacon Broadcast Toggle */}
          <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/40 text-center">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-xs font-bold text-rose-200">
                  Site Emergency Beacon
                </p>
                <p className="text-[11px] text-zinc-400">
                  Transmits GPS (Civil Lines, Sec 4) to Hub safety desk
                </p>
              </div>
              <button
                type="button"
                onClick={() => setBeaconActive(!beaconActive)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all min-h-[44px] cursor-pointer ${
                  beaconActive
                    ? 'bg-rose-600 text-white animate-pulse shadow-md'
                    : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                {beaconActive ? 'BEACON ACTIVE' : 'BROADCAST GPS'}
              </button>
            </div>
            {beaconActive && (
              <p className="text-[10px] text-rose-400 font-mono mt-2 flex items-center justify-center gap-1.5">
                <HugeiconsIcon icon={Radar01Icon} size={14} strokeWidth={2.2} className="animate-ping" />
                <span>Beacon broadcasting to Prayagraj Dispatch Command</span>
              </p>
            )}
          </div>

          {/* Quick Direct Contacts */}
          <div className="space-y-2">
            {/* Contact 1: Hub Safety Officer */}
            <a
              href="tel:+919415099881"
              className="w-full p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex items-center justify-between text-left active:scale-98 transition-all min-h-[48px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <HugeiconsIcon icon={Call02Icon} size={20} strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Hub Duty Supervisor</p>
                  <p className="text-[11px] text-zinc-400">Rajesh Gupta · Prayagraj Hub</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-full">
                Call Direct
              </span>
            </a>

            {/* Contact 2: Technical Line */}
            <a
              href="tel:+919839000112"
              className="w-full p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex items-center justify-between text-left active:scale-98 transition-all min-h-[48px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <HugeiconsIcon icon={ShieldAlertIcon} size={20} strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Arc Flash & High Voltage Expert</p>
                  <p className="text-[11px] text-zinc-400">Chief Electrical Engineer Desk</p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-full">
                Call Expert
              </span>
            </a>

            {/* Contact 3: Public Emergency 112 */}
            <a
              href="tel:112"
              className="w-full p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex items-center justify-between text-left active:scale-98 transition-all min-h-[48px]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600/20 text-rose-400 flex items-center justify-center">
                  <HugeiconsIcon icon={AlertCircleIcon} size={20} strokeWidth={2.4} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">National Emergency Service</p>
                  <p className="text-[11px] text-zinc-400">Police · Fire · Ambulance (Dial 112)</p>
                </div>
              </div>
              <span className="text-xs font-bold text-rose-400 bg-rose-400/10 px-3 py-1.5 rounded-full">
                Dial 112
              </span>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950">
          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[44px] h-11 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs flex items-center justify-center cursor-pointer transition-colors"
          >
            Dismiss SOS Screen
          </button>
        </div>
      </div>
    </div>
  );
};
