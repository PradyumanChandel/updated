import React, { useMemo } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  TaskDaily01Icon,
  Wallet02Icon,
  UserSquareIcon,
} from '@hugeicons/core-free-icons';
import { getTradeTheme } from '../utils/tradeThemeEngine';

export type TabType = 'projects' | 'queue' | 'wallet' | 'profile' | 'home' | 'radar';

interface BottomDockProps {
  activeTab: TabType;
  onTabChange?: (tab: TabType) => void;
  onSelectTab?: (tab: TabType) => void;
  pendingOrdersCount?: number;
  tradeTitle?: string;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  activeTab,
  onTabChange,
  onSelectTab,
  tradeTitle = 'Master Electrician',
}) => {
  // Dynamically resolve theme for dockActiveStyle and trade-native dynamic icon
  const theme = useMemo(() => getTradeTheme(tradeTitle), [tradeTitle]);
  const handleSelect = onSelectTab || onTabChange || (() => {});

  const NAV_TABS = [
    {
      id: 'projects' as TabType,
      label: 'Projects',
      icon: theme.dockIcon,
      aliasId: 'home',
    },
    {
      id: 'queue' as TabType,
      label: 'Queue',
      icon: TaskDaily01Icon,
      hasBadge: true,
      aliasId: 'radar',
    },
    {
      id: 'wallet' as TabType,
      label: 'Wallet',
      icon: Wallet02Icon,
    },
    {
      id: 'profile' as TabType,
      label: 'Pro ID',
      icon: UserSquareIcon,
    },
  ];

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-1.75rem)] max-w-[370px] sm:max-w-[390px] z-50 h-[66px] bg-[#111111]/95 text-white rounded-full flex items-center justify-around px-3 sm:px-4 shadow-2xl select-none backdrop-blur-xl border border-white/10 transition-all duration-300"
    >
      {NAV_TABS.map((tab) => {
        const isActive = activeTab === tab.id || (tab.aliasId && activeTab === tab.aliasId);

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleSelect(tab.id)}
            aria-label={tab.label}
            aria-current={isActive ? 'page' : undefined}
            className="min-h-[48px] min-w-[64px] flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
          >
            {isActive ? (
              // Active Tab: Trade-Specific Liquid Glass Aura
              <div
                className={`px-3.5 py-1.5 rounded-2xl flex flex-col items-center gap-0.5 shadow-md transition-all duration-300 ${theme.dockActiveStyle}`}
              >
                <div className="relative flex items-center justify-center">
                  <HugeiconsIcon icon={tab.icon} size={20} strokeWidth={2.0} />
                  {tab.hasBadge && (
                    <span
                      className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full ring-1 ring-white"
                      style={{ backgroundColor: theme.accentHex }}
                    />
                  )}
                </div>
                <span className="text-[10px] font-black tracking-tight leading-none select-none">
                  {tab.label}
                </span>
              </div>
            ) : (
              // Inactive Tab: Clean outline Hugeicons with subtle legibility labels
              <div className="px-3 py-1 flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors">
                <div className="relative flex items-center justify-center">
                  <HugeiconsIcon icon={tab.icon} size={20} strokeWidth={2.0} />
                  {tab.hasBadge && (
                    <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-1 ring-[#111111]" />
                  )}
                </div>
                <span className="text-[10px] font-medium tracking-tight text-white/70 hover:text-white leading-none select-none">
                  {tab.label}
                </span>
              </div>
            )}
          </button>
        );
      })}
    </nav>
  );
};
