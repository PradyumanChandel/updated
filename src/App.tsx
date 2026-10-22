import React, { useState, useMemo } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  TaskDaily01Icon,
  Wallet02Icon,
  UserSquareIcon,
  Search01Icon,
  Logout01Icon,
  PowerIcon,
} from '@hugeicons/core-free-icons';
import { ProProfile, UniversalWorkOrder } from './types';
import {
  INITIAL_PRO_PROFILE,
  TEST_PERSONAS,
  TestPersonaConfig,
  getOrdersForTrade,
} from './data/mockData';
import { LoginView } from './components/LoginView';
import { HeaderModule } from './components/HeaderModule';
import { HeroJobCard } from './components/HeroJobCard';
import { AsymmetricWorkGrid } from './components/AsymmetricWorkGrid';
import { BottomDock, TabType } from './components/BottomDock';
import { WatermarkCameraModal } from './components/WatermarkCameraModal';
import { UpiPayoutModal } from './components/UpiPayoutModal';
import { SosModal } from './components/SosModal';
import { JobDetailModal } from './components/JobDetailModal';
import { SearchFilterModal } from './components/SearchFilterModal';
import { RadarWorkOrdersView } from './components/RadarWorkOrdersView';
import { LedgerWalletView } from './components/LedgerWalletView';
import { ProProfileView } from './components/ProProfileView';
import { resolveTradeIcon } from './utils/tradeIconResolver';
import { resolveTradeFromProId, getTradeTheme } from './utils/tradeThemeEngine';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pro, setPro] = useState<ProProfile>(INITIAL_PRO_PROFILE);
  const [orders, setOrders] = useState<UniversalWorkOrder[]>(
    getOrdersForTrade(INITIAL_PRO_PROFILE.tradeCategory || 'electrical')
  );
  const [activeTab, setActiveTab] = useState<TabType>('projects');

  // Dynamic Trade UI Profile (ambient theme, background gradient, card radius, dock style)
  const currentTheme = useMemo(
    () => getTradeTheme(pro.title || pro.tradeCategory),
    [pro.title, pro.tradeCategory]
  );

  // Modals state
  const [isWatermarkOpen, setIsWatermarkOpen] = useState(false);
  const [isUpiPayoutOpen, setIsUpiPayoutOpen] = useState(false);
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<UniversalWorkOrder | null>(null);

  // Quick Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRefreshingRadar, setIsRefreshingRadar] = useState(false);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleRefreshRadar = () => {
    setIsRefreshingRadar(true);
    setTimeout(() => {
      setIsRefreshingRadar(false);
      showToast('Dispatch Radar refreshed · Prayagraj 5 km Radius active');
    }, 600);
  };

  const handleCallClient = (phone: string, clientName: string) => {
    showToast(`Calling ${clientName} (${phone})...`);
    window.location.href = `tel:${phone}`;
  };

  const handlePayoutSuccess = (amount: number) => {
    setPro((prev) => ({
      ...prev,
      walletBalance: 0,
    }));
    showToast(`₹${amount.toLocaleString('en-IN')} transferred to ${pro.upiId}!`);
  };

  const handleCompleteOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: 'Completed', escrowStatus: 'Released' }
          : o
      )
    );

    const completed = orders.find((o) => o.id === orderId);
    if (completed) {
      const escrowVal = completed.escrowAmount ?? completed.escrowLockedAmount ?? 199;
      setPro((prev) => ({
        ...prev,
        walletBalance: prev.walletBalance + escrowVal,
        escrowPending: Math.max(0, prev.escrowPending - escrowVal),
        dailyTarget: {
          ...prev.dailyTarget,
          inspectionsDone: Math.min(
            prev.dailyTarget.inspectionsTarget,
            prev.dailyTarget.inspectionsDone + 1
          ),
        },
      }));
      const num = completed.orderNumber || completed.id;
      showToast(`Job ${num} completed! ₹${escrowVal} released to wallet.`);
    }
  };

  const handleToggleDuty = () => {
    setPro((prev) => {
      const nextState = !prev.isOnline;
      showToast(
        nextState
          ? 'On-Duty: Radar active for Prayagraj 5 km dispatches'
          : 'Off-Duty: Radar paused · Dispatches suspended'
      );
      return {
        ...prev,
        isOnline: nextState,
      };
    });
  };

  // Orders assignment with strict trade isolation
  const currentTradeOrders = useMemo(
    () => (orders.length > 0 ? orders : getOrdersForTrade(pro.title || pro.tradeCategory)),
    [orders, pro.title, pro.tradeCategory]
  );
  const primaryOrder = currentTradeOrders[0];
  const secondaryOrder = currentTradeOrders[1];
  const upcomingOrder = currentTradeOrders[2];

  const handleStartInspection = (order: UniversalWorkOrder) => {
    setSelectedOrder(order);
    setIsWatermarkOpen(true);
  };

  const handleSelectTrade = (tradeTitle: string) => {
    setPro((prev) => ({
      ...prev,
      title: tradeTitle,
    }));

    const resolved = resolveTradeIcon(tradeTitle);
    const isolated = getOrdersForTrade(tradeTitle);
    setOrders(isolated);

    showToast(`Active Trade: "${tradeTitle}" · ${resolved.label} ecosystem active!`);
  };

  const handleSelectPersona = (persona: TestPersonaConfig) => {
    setPro(persona.proProfile);
    const isolated = getOrdersForTrade(persona.title || persona.tradeCategory);
    setOrders(isolated);

    setIsLoggedIn(true);
    showToast(`Active Pro: ${persona.name} · ${persona.accountId} (${persona.title})`);
  };

  const handleLoginWithProId = (proIdInput: string) => {
    const cleanId = proIdInput.trim().toUpperCase();
    const exactMatch = TEST_PERSONAS.find(
      (p) => p.accountId.toUpperCase() === cleanId
    );

    if (exactMatch) {
      handleSelectPersona(exactMatch);
      showToast(`Welcome, ${exactMatch.name}! ${cleanId} Terminal active`);
      return;
    }

    const decodedTrade = resolveTradeFromProId(cleanId);
    const personaByTrade = TEST_PERSONAS.find(
      (p) =>
        p.tradeCategory === decodedTrade ||
        (decodedTrade === 'makeup' && p.tradeCategory === 'beauty')
    );

    if (personaByTrade) {
      const customPersona: TestPersonaConfig = {
        ...personaByTrade,
        accountId: cleanId,
        proProfile: {
          ...personaByTrade.proProfile,
          accountId: cleanId,
        },
      };
      handleSelectPersona(customPersona);
      showToast(`${cleanId} recognized: ${personaByTrade.title} OS active`);
    } else {
      handleSelectPersona(TEST_PERSONAS[0]);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    showToast('Session ended · Enter Pro Account ID');
  };

  // If not logged in, display dedicated LoginView
  if (!isLoggedIn) {
    return (
      <>
        <LoginView
          onSelectPersona={handleSelectPersona}
          onLoginWithProId={handleLoginWithProId}
          onLoginSuccess={(id) => handleLoginWithProId(id)}
        />
        {/* In-app Toast Banner */}
        {toastMessage && (
          <div className="fixed top-5 inset-x-5 max-w-[380px] mx-auto z-60 bg-[#111111] text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold backdrop-blur-md animate-in fade-in slide-in-from-top-3 duration-200">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span className="flex-1 truncate">{toastMessage}</span>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-100/90 text-[#111111] overflow-x-hidden relative">
      {/* DESKTOP TOP NAVBAR (>= 768px) */}
      <header className="hidden md:flex fixed top-0 inset-x-0 h-18 bg-white/85 backdrop-blur-xl border-b border-gray-200/80 z-50 px-8 items-center justify-between text-[#111111] select-none shadow-xs">
        {/* Zone 1: Left Brand Lockup & Search */}
        <div className="flex items-center gap-6 shrink-0">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setActiveTab('projects')}
          >
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-[#111111] flex items-center justify-center font-black text-lg shadow-md">
              M
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-[#111111] leading-tight">
                Magikscill Pro
              </h1>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                SaaS Command OS
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-xs font-bold text-slate-700 transition-all cursor-pointer border border-black/5"
            title="Search Dispatches"
          >
            <HugeiconsIcon icon={Search01Icon} size={16} strokeWidth={2.2} />
            <span>Search</span>
          </button>
        </div>

        {/* Zone 2: Center Navigation Tabs */}
        <nav className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs tracking-wide transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'projects' || activeTab === 'home'
                ? 'bg-[#111111] text-white shadow-xs font-black'
                : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
            }`}
          >
            <HugeiconsIcon icon={currentTheme.dockIcon} size={18} strokeWidth={2.2} />
            <span>Projects</span>
          </button>

          <button
            onClick={() => setActiveTab('queue')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs tracking-wide transition-all cursor-pointer relative whitespace-nowrap shrink-0 ${
              activeTab === 'queue' || activeTab === 'radar'
                ? 'bg-[#111111] text-white shadow-xs font-black'
                : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
            }`}
          >
            <HugeiconsIcon icon={TaskDaily01Icon} size={18} strokeWidth={2.2} />
            <span>Queue</span>
            {orders.filter((o) => o.status !== 'Completed').length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-[#111111] font-black text-[10px]">
                {orders.filter((o) => o.status !== 'Completed').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs tracking-wide transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'wallet'
                ? 'bg-[#111111] text-white shadow-xs font-black'
                : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
            }`}
          >
            <HugeiconsIcon icon={Wallet02Icon} size={18} strokeWidth={2.2} />
            <span>Wallet</span>
            <span className="text-[10px] font-mono text-emerald-600 font-bold">₹{pro.walletBalance}</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-xs tracking-wide transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              activeTab === 'profile'
                ? 'bg-[#111111] text-white shadow-xs font-black'
                : 'text-slate-600 hover:bg-slate-200/60 hover:text-slate-900'
            }`}
          >
            <HugeiconsIcon icon={UserSquareIcon} size={18} strokeWidth={2.2} />
            <span>Pro ID</span>
          </button>
        </nav>

        {/* Zone 3: Right Pro Duty & Profile */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={handleToggleDuty}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              pro.isOnline
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
            }`}
            title={pro.isOnline ? 'Go Off-Duty' : 'Go On-Duty'}
          >
            <span className={`w-2 h-2 rounded-full ${pro.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-400'}`} />
            <span>{pro.isOnline ? 'On-Duty' : 'Off-Duty'}</span>
            <HugeiconsIcon icon={PowerIcon} size={15} strokeWidth={2.4} />
          </button>

          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
              {pro.avatarInitials || 'RS'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#111111] truncate max-w-[120px]">{pro.name}</p>
              <p className="text-[10px] text-amber-700 font-semibold truncate">★ {pro.rating} · {pro.title}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-all cursor-pointer border border-black/5"
              title="Logout"
            >
              <HugeiconsIcon icon={Logout01Icon} size={16} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN WORKSPACE CANVAS */}
      <main className="w-full max-w-[390px] sm:max-w-[420px] md:max-w-7xl mx-auto px-3.5 sm:px-4 md:px-8 pt-3 md:pt-24 pb-28 md:pb-12 box-border relative z-10 text-[#111111] select-none">
        {/* Mobile Header (Hidden on Desktop since Top Navbar exists) */}
        <div className="md:hidden w-full mb-4">
          <HeaderModule
            pro={pro}
            onOpenSearch={() => setIsSearchOpen(true)}
            onSelectTrade={handleSelectTrade}
            onLogout={handleLogout}
          />
        </div>

        {/* Tab 1: Home / Projects View */}
        {(activeTab === 'projects' || activeTab === 'home') && (
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Primary Active Job promoted to Hero Card (Left Column) */}
            <div className="md:col-span-7 lg:col-span-7 flex flex-col gap-4">
              <HeroJobCard
                order={primaryOrder}
                trade={pro.title}
                onSelectOrder={(order) => setSelectedOrder(order)}
                onCallClient={handleCallClient}
                onStartInspection={handleStartInspection}
              />
              {/* Mobile Only Work Order Queue */}
              <div className="md:hidden">
                <AsymmetricWorkGrid
                  secondaryOrder={secondaryOrder}
                  upcomingOrder={upcomingOrder}
                  activeTrade={pro.title}
                  onSelectOrder={(order) => setSelectedOrder(order)}
                />
              </div>
            </div>

            {/* Desktop Only Dispatch Queue Sidebar (Right Column) */}
            <div className="hidden md:flex md:flex-col md:col-span-5 lg:col-span-5 bg-white/90 backdrop-blur-2xl p-6 rounded-[28px] border border-black/10 shadow-md sticky top-24 gap-4">
              <div className="flex items-center justify-between mb-1 shrink-0">
                <h3 className="text-[#111111] font-black text-base tracking-tight flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>Next in Queue</span>
                </h3>
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="px-3 py-1 rounded-xl bg-black text-white text-xs font-bold shadow-xs hover:bg-zinc-800 transition-all cursor-pointer"
                >
                  Search
                </button>
              </div>

              <AsymmetricWorkGrid
                secondaryOrder={secondaryOrder}
                upcomingOrder={upcomingOrder}
                activeTrade={pro.title}
                onSelectOrder={(order) => setSelectedOrder(order)}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Queue / Work Orders Radar */}
        {(activeTab === 'queue' || activeTab === 'radar') && (
          <div className="w-full max-w-4xl mx-auto">
            <RadarWorkOrdersView
              orders={orders}
              onSelectOrder={(order) => setSelectedOrder(order)}
              onRefreshRadar={handleRefreshRadar}
              isRefreshing={isRefreshingRadar}
            />
          </div>
        )}

        {/* Tab 3: Daily Ledger / Wallet */}
        {activeTab === 'wallet' && (
          <div className="w-full max-w-4xl mx-auto">
            <LedgerWalletView
              pro={pro}
              onOpenUpiPayout={() => setIsUpiPayoutOpen(true)}
            />
          </div>
        )}

        {/* Tab 4: Pro ID / Settings */}
        {activeTab === 'profile' && (
          <div className="w-full max-w-4xl mx-auto">
            <ProProfileView
              pro={pro}
              onToggleOnline={handleToggleDuty}
              onLogout={handleLogout}
            />
          </div>
        )}

        {/* Interactive Modals */}
        <WatermarkCameraModal
          isOpen={isWatermarkOpen}
          onClose={() => setIsWatermarkOpen(false)}
          activeOrder={selectedOrder || primaryOrder}
        />

        <UpiPayoutModal
          isOpen={isUpiPayoutOpen}
          onClose={() => setIsUpiPayoutOpen(false)}
          pro={pro}
          onPayoutSuccess={handlePayoutSuccess}
        />

        <SosModal
          isOpen={isSosOpen}
          onClose={() => setIsSosOpen(false)}
          pro={pro}
        />

        <JobDetailModal
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onCallClient={handleCallClient}
          onOpenWatermark={() => {
            setSelectedOrder(null);
            setIsWatermarkOpen(true);
          }}
          onCompleteOrder={handleCompleteOrder}
        />

        <SearchFilterModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          orders={orders}
          onSelectOrder={(order) => setSelectedOrder(order)}
        />

        {/* In-app Toast Banner */}
        {toastMessage && (
          <div className="fixed top-24 inset-x-5 md:left-1/2 md:-translate-x-1/2 max-w-[380px] z-60 bg-[#111111] text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold backdrop-blur-md animate-in fade-in slide-in-from-top-3 duration-200">
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span className="flex-1 truncate">{toastMessage}</span>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Dock (Hidden on Desktop) */}
      <div className="md:hidden">
        <BottomDock
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          onSelectTab={(tab) => setActiveTab(tab)}
          pendingOrdersCount={orders.filter((o) => o.status !== 'Completed').length}
          tradeTitle={pro.title}
        />
      </div>
    </div>
  );
}
