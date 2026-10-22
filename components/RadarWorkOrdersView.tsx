import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Clock01Icon,
  Location01Icon,
  LockKeyIcon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons';
import { UniversalWorkOrder } from '../types';

interface RadarWorkOrdersViewProps {
  orders: UniversalWorkOrder[];
  onSelectOrder: (order: UniversalWorkOrder) => void;
  onRefreshRadar: () => void;
  isRefreshing?: boolean;
}

export const RadarWorkOrdersView: React.FC<RadarWorkOrdersViewProps> = ({
  orders,
  onSelectOrder,
  onRefreshRadar,
  isRefreshing,
}) => {
  return (
    <div className="space-y-4 pb-4">
      {/* Radar Status Header - Soft Sky Blue Pastel */}
      <div className="rounded-[28px] bg-[#D2E7FF] text-[#111111] p-5 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
            <h3 className="text-sm font-bold tracking-tight text-[#111111] uppercase">
              Dispatch Radar · Prayagraj
            </h3>
          </div>
          {onRefreshRadar ? (
            <button
              type="button"
              onClick={onRefreshRadar}
              disabled={isRefreshing}
              className="text-[10px] font-bold text-[#111111] bg-white/70 hover:bg-white px-2.5 py-1 rounded-full shadow-2xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer min-h-[30px]"
              title="Click to refresh Prayagraj radar scan"
            >
              <span>{isRefreshing ? 'SCANNING...' : '5.0 KM RADIUS'}</span>
            </button>
          ) : (
            <span className="text-[10px] font-bold text-[#111111] bg-white/70 px-2.5 py-1 rounded-full shadow-2xs">
              5.0 KM RADIUS
            </span>
          )}
        </div>

        <p className="text-xs text-[#111111]/70 leading-relaxed font-medium">
          Listening on universal multi-trade emergency dispatches across certified pro networks. Upfront escrow is pre-funded for all orders.
        </p>

        <div className="mt-3 pt-3 border-t border-black/10 flex items-center justify-between text-xs">
          <span className="text-[#111111]/60 font-medium">Available Dispatches:</span>
          <span className="font-bold text-[#111111] tabular-nums">{orders.length} active work orders</span>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between px-1">
          <h4 className="text-xs font-bold text-[#111111] uppercase tracking-wider">
            Assigned & Nearby Queue
          </h4>
          <span className="text-[11px] text-[#71717A] font-medium">Sorted by ETA</span>
        </div>

        {orders.map((order) => {
          const escrowVal = order.escrowAmount ?? order.escrowLockedAmount ?? 199;
          const tradeTag = order.tradeLabel || order.trade || order.tradeCategory;
          const timeSlotDisplay = order.timeSlot || order.eta || '10:30–11:30 AM';
          const clientName = order.clientName || order.client?.name || 'Client';

          return (
            <div
              key={order.id}
              onClick={() => onSelectOrder(order)}
              className="rounded-[22px] bg-white p-4 shadow-xs hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-[#111111]">
                  {tradeTag}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-0.5 rounded-full flex items-center gap-1 tabular-nums">
                  <HugeiconsIcon icon={LockKeyIcon} size={12} strokeWidth={2.4} /> ₹{escrowVal} Escrow
                </span>
              </div>

              <h5 className="text-[15px] font-bold text-[#111111] leading-snug">
                {order.issueTitle || order.title}
              </h5>

              <div className="mt-2 flex items-center justify-between gap-2 text-xs text-[#71717A]">
                <div className="flex items-center gap-1 font-semibold text-[#111111] shrink-0">
                  <HugeiconsIcon icon={Clock01Icon} size={14} strokeWidth={2.2} className="text-amber-600" />
                  <span className="tabular-nums">{timeSlotDisplay}</span>
                </div>
                <div className="flex items-center gap-1 font-medium text-[#71717A] min-w-0 truncate">
                  <HugeiconsIcon icon={Location01Icon} size={14} strokeWidth={2.2} className="text-slate-400 shrink-0" />
                  <span className="truncate">{order.location}</span>
                  <span className="text-slate-300 shrink-0">·</span>
                  <span className="text-[#111111] font-semibold shrink-0">{order.distanceKm} km</span>
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[#71717A] font-medium">Client: {clientName}</span>
                <span className="text-[#111111] font-bold flex items-center gap-1">
                  <span>Inspect</span>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={14} strokeWidth={2.2} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
