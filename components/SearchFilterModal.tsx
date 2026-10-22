import React, { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Cancel01Icon,
  Search01Icon,
  SlidersHorizontalIcon,
} from '@hugeicons/core-free-icons';
import { UniversalWorkOrder } from '../types';

interface SearchFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: UniversalWorkOrder[];
  onSelectOrder: (order: UniversalWorkOrder) => void;
}

export const SearchFilterModal: React.FC<SearchFilterModalProps> = ({
  isOpen,
  onClose,
  orders,
  onSelectOrder,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrade, setSelectedTrade] = useState<string>('All');

  if (!isOpen) return null;

  const TRADES = ['All', 'Electrical', 'Plumbing', 'HVAC', 'Carpentry', 'Automotive', 'Cleaning'];

  const filteredOrders = orders.filter((order) => {
    const title = (order.issueTitle || order.title || '').toLowerCase();
    const loc = (order.location || '').toLowerCase();
    const client = (order.clientName || order.client?.name || '').toLowerCase();
    const num = (order.orderNumber || order.id || '').toLowerCase();
    const q = searchQuery.toLowerCase().trim();

    const matchesSearch =
      !q ||
      title.includes(q) ||
      loc.includes(q) ||
      client.includes(q) ||
      num.includes(q);

    const matchesTrade =
      selectedTrade === 'All' ||
      order.tradeCategory?.toLowerCase() === selectedTrade.toLowerCase() ||
      order.tradeLabel?.toLowerCase().includes(selectedTrade.toLowerCase()) ||
      order.trade?.toLowerCase() === selectedTrade.toLowerCase();

    return matchesSearch && matchesTrade;
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs select-none">
      <div className="w-full max-w-[430px] bg-white text-slate-900 rounded-t-3xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={SlidersHorizontalIcon} size={16} strokeWidth={2.2} className="text-slate-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Filter & Search Orders
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Filter"
            className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
          >
            <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={2.0} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-slate-100">
          <div className="relative">
            <HugeiconsIcon icon={Search01Icon} size={16} strokeWidth={2.2} className="text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by issue, trade, area, or client..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-slate-100 text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          {/* Trade Filter Pills */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar">
            {TRADES.map((trade) => (
              <button
                key={trade}
                type="button"
                onClick={() => setSelectedTrade(trade)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTrade === trade
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {trade}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="p-4 flex-1 overflow-y-auto space-y-2.5">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            {filteredOrders.length} {filteredOrders.length === 1 ? 'Order' : 'Orders'} Found
          </p>

          {filteredOrders.map((order) => {
            const escrowVal = order.escrowAmount ?? order.escrowLockedAmount ?? 199;
            const orderNum = order.orderNumber || order.id;
            const tradeTag = order.tradeLabel || order.trade || order.tradeCategory;
            const clientName = order.clientName || order.client?.name || 'Client';

            return (
              <div
                key={order.id}
                onClick={() => {
                  onSelectOrder(order);
                  onClose();
                }}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 cursor-pointer transition-all active:scale-[0.99]"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-600 bg-slate-200 px-1.5 py-0.5 rounded">
                      {orderNum}
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      {tradeTag}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    ₹{escrowVal} Locked
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {order.issueTitle || order.title}
                </h4>

                <div className="mt-1.5 flex items-center justify-between text-xs text-slate-500">
                  <span>{order.location}</span>
                  <span>Client: {clientName}</span>
                </div>
              </div>
            );
          })}

          {filteredOrders.length === 0 && (
            <div className="py-8 text-center text-slate-400 text-xs">
              No matching work orders found for "{searchQuery || selectedTrade}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
