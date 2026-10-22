import {
  FlashIcon,
  DropletIcon,
  AirVentIcon,
  SparklesIcon,
  ShieldCheckIcon,
  HammerIcon,
  Settings02Icon,
} from '@hugeicons/core-free-icons';
import { IconSvgElement } from '@hugeicons/react';
import { UniversalWorkOrder } from '../types';

export interface DetailedTradeTheme {
  appBackground: string;      // Root background gradient/color
  cardBorderRadius: string;   // e.g. 'rounded-[38px]' for cute makeup, 'rounded-[28px]' for technical
  badgeStyle: string;         // Pill style tokens
  ambientVibe: 'cute_luxury' | 'high_voltage' | 'hydro_aqua' | 'cryo_frost' | 'artisan_wood';
  dockActiveStyle: string;    // Custom liquid glass accent on bottom dock
  dockTabLabel: string;       // "Studio", "Grid", "Hydro", "Cryo", "Guild"
  dockIcon: IconSvgElement;   // Icon component
}

export interface TradeUIProfile extends DetailedTradeTheme {
  themeClass: string;          // e.g. 'glass-lilac' | 'glass-skyblue' | 'glass-cyan' | 'glass-rose' | 'glass-amber' | 'glass-emerald' | 'glass-slate'
  accentHex: string;           // Primary glow & beacon color
  tradeTag: string;            // e.g. "HVAC PRO COMMAND", "BRIDAL STUDIO OS"
  metricLabel: string;         // e.g. "Gas Levels Checked", "Zero-Leak Warranty"
  prideStatLabel: string;      // Bottom milestone badge text e.g. "100% Leak-Free Record"
  telemetryFormat: (order?: UniversalWorkOrder) => string; // Custom meta tag beneath the headline or location
}

export const TRADE_THEMES: Record<string, TradeUIProfile> = {
  electrical: {
    appBackground: 'bg-gradient-to-b from-[#F5F3FF] via-[#EDE9FE] to-[#DDD6FE]',
    cardBorderRadius: 'rounded-[28px]',
    badgeStyle: 'bg-amber-100/90 text-amber-800 border border-amber-300/60',
    ambientVibe: 'high_voltage',
    dockActiveStyle: 'bg-amber-400/25 text-amber-200 shadow-[0_0_24px_rgba(245,158,11,0.55)] border border-amber-300/40',
    dockTabLabel: 'Grid',
    dockIcon: FlashIcon,
    themeClass: 'glass-lilac',
    accentHex: '#F59E0B',
    tradeTag: 'ELECTRICAL GRID OS',
    metricLabel: 'Arc-Flash Safety Audit',
    prideStatLabel: 'Zero Arc-Flash Incidents',
    telemetryFormat: () => '3-Phase 32A MCB · Live Panel Calibrated',
  },

  plumbing: {
    appBackground: 'bg-gradient-to-b from-[#F0FDFA] via-[#E0F7FA] to-[#CCFBF1]',
    cardBorderRadius: 'rounded-[30px]',
    badgeStyle: 'bg-cyan-100/90 text-cyan-800 border border-cyan-300/60',
    ambientVibe: 'hydro_aqua',
    dockActiveStyle: 'bg-cyan-400/25 text-cyan-100 shadow-[0_0_24px_rgba(6,182,212,0.55)] border border-cyan-300/40',
    dockTabLabel: 'Hydro',
    dockIcon: DropletIcon,
    themeClass: 'glass-cyan',
    accentHex: '#06B6D4',
    tradeTag: 'HYDRO DYNAMICS OS',
    metricLabel: 'Zero-Leak Warranty',
    prideStatLabel: '100% Leak-Free Record',
    telemetryFormat: () => '4.2 Bar Hydrostatic · Zero Seepage Checked',
  },

  hvac: {
    appBackground: 'bg-gradient-to-b from-[#F0F9FF] via-[#E0F2FE] to-[#BAE6FD]',
    cardBorderRadius: 'rounded-[28px]',
    badgeStyle: 'bg-sky-100/90 text-sky-800 border border-sky-300/60',
    ambientVibe: 'cryo_frost',
    dockActiveStyle: 'bg-sky-400/25 text-sky-100 shadow-[0_0_24px_rgba(2,132,199,0.55)] border border-sky-300/40',
    dockTabLabel: 'Cryo',
    dockIcon: AirVentIcon,
    themeClass: 'glass-skyblue',
    accentHex: '#0284C7',
    tradeTag: 'HVAC PRO COMMAND',
    metricLabel: 'Gas Levels Checked',
    prideStatLabel: 'R32 Vacuum Verified',
    telemetryFormat: () => 'R32 Inverter · 1.5 Ton Suction Verified',
  },

  makeup: {
    appBackground: 'bg-gradient-to-b from-[#FFF5F7] via-[#FFF0F5] to-[#FCE7F3]',
    cardBorderRadius: 'rounded-[38px]',
    badgeStyle: 'bg-rose-100/90 text-rose-700 border border-rose-200/60',
    ambientVibe: 'cute_luxury',
    dockActiveStyle: 'bg-rose-500/25 text-rose-100 shadow-[0_0_24px_rgba(244,63,94,0.55)] border border-rose-300/40',
    dockTabLabel: 'Studio',
    dockIcon: SparklesIcon,
    themeClass: 'glass-rose',
    accentHex: '#E11D48',
    tradeTag: 'BRIDAL STUDIO OS',
    metricLabel: 'Zero Defect HD Finish',
    prideStatLabel: '5.0 ★ Flawless Glow',
    telemetryFormat: (order?: UniversalWorkOrder) => {
      const spec = order?.serviceSpecs?.[0] || '4K HD Airbrush Finish';
      return `${spec} · Calibrated`;
    },
  },

  carpentry: {
    appBackground: 'bg-gradient-to-b from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]',
    cardBorderRadius: 'rounded-[32px]',
    badgeStyle: 'bg-amber-100/90 text-amber-900 border border-amber-300/60',
    ambientVibe: 'artisan_wood',
    dockActiveStyle: 'bg-amber-500/25 text-amber-100 shadow-[0_0_24px_rgba(217,119,6,0.55)] border border-amber-300/40',
    dockTabLabel: 'Guild',
    dockIcon: HammerIcon,
    themeClass: 'glass-amber',
    accentHex: '#D97706',
    tradeTag: 'CARPENTRY GUILD OS',
    metricLabel: 'Sub-Millimeter Joinery',
    prideStatLabel: 'Sub-Millimeter Joinery',
    telemetryFormat: () => 'Teak Hardwood · Concealed Hydraulic Hinges',
  },

  automotive: {
    appBackground: 'bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0]',
    cardBorderRadius: 'rounded-[28px]',
    badgeStyle: 'bg-slate-200/90 text-slate-800 border border-slate-300/60',
    ambientVibe: 'high_voltage',
    dockActiveStyle: 'bg-slate-500/25 text-slate-100 shadow-[0_0_24px_rgba(71,85,105,0.45)] border border-slate-400/40',
    dockTabLabel: 'Fleet',
    dockIcon: Settings02Icon,
    themeClass: 'glass-slate',
    accentHex: '#475569',
    tradeTag: 'AUTOMOTIVE FLEET OS',
    metricLabel: 'Pre-Torque Verification',
    prideStatLabel: 'Zero Comeback Warranty',
    telemetryFormat: () => 'ECU CAN-Bus Diagnostic · 12V Battery Healthy',
  },

  cleaning: {
    appBackground: 'bg-gradient-to-b from-[#F0FDF4] via-[#DCFCE7] to-[#BBF7D0]',
    cardBorderRadius: 'rounded-[34px]',
    badgeStyle: 'bg-emerald-100/90 text-emerald-800 border border-emerald-300/60',
    ambientVibe: 'hydro_aqua',
    dockActiveStyle: 'bg-emerald-500/25 text-emerald-100 shadow-[0_0_24px_rgba(16,185,129,0.45)] border border-emerald-400/40',
    dockTabLabel: 'Clean',
    dockIcon: ShieldCheckIcon,
    themeClass: 'glass-emerald',
    accentHex: '#059669',
    tradeTag: 'CLEAN SANITIZE OS',
    metricLabel: 'Hospital-Grade Disinfection',
    prideStatLabel: '100% Sanitized & Cleared',
    telemetryFormat: () => '99.9% Microbial Clearance · Non-Toxic Formula',
  },
};

/**
 * Resolves trade input to matching TradeUIProfile
 * Normalizes aliases ('beauty' -> 'makeup', 'ac' -> 'hvac', 'auto' -> 'automotive')
 */
export const getTradeTheme = (tradeInput: string = ''): TradeUIProfile => {
  const q = tradeInput.toLowerCase().trim();

  if (/ac\b|cool|hvac|chiller|refrig|vent|compressor/i.test(q)) {
    return TRADE_THEMES.hvac;
  }
  if (/beauty|makeup|salon|bridal|hair|spa|facial|cosmetic|draping/i.test(q)) {
    return TRADE_THEMES.makeup;
  }
  if (/plumb|pipe|drain|leak|water|pump|sewer|faucet/i.test(q)) {
    return TRADE_THEMES.plumbing;
  }
  if (/carpent|wood|furnit|door|ply|cabinet|timber/i.test(q)) {
    return TRADE_THEMES.carpentry;
  }
  if (/car|auto|bike|engine|vehic|wheel|brake/i.test(q)) {
    return TRADE_THEMES.automotive;
  }
  if (/clean|pest|wash|hygiene|sanit/i.test(q)) {
    return TRADE_THEMES.cleaning;
  }

  // Default to electrical
  return TRADE_THEMES.electrical;
};

/**
 * Smart Account ID Autonomous Decoder:
 * Decodes industry trade prefixes (e.g. MUA-7704, ELEC-9912, PLMB-3301, HVAC-6623, WOOD-5120)
 * into canonical trade keys.
 */
export const resolveTradeFromProId = (proId: string): string => {
  const cleaned = proId.trim().toUpperCase();
  if (cleaned.startsWith('MUA') || cleaned.startsWith('GLAM')) return 'makeup';
  if (cleaned.startsWith('ELEC') || cleaned.startsWith('VOLT')) return 'electrical';
  if (cleaned.startsWith('PLMB') || cleaned.startsWith('HYDRO')) return 'plumbing';
  if (cleaned.startsWith('HVAC') || cleaned.startsWith('CRYO')) return 'hvac';
  if (cleaned.startsWith('WOOD') || cleaned.startsWith('CRAFT')) return 'carpentry';
  if (cleaned.startsWith('AUTO') || cleaned.startsWith('MOTO')) return 'automotive';
  if (cleaned.startsWith('CLN') || cleaned.startsWith('CLEAN')) return 'cleaning';
  return 'electrical'; // Fallback
};

export interface ProIdAuraConfig {
  trade: string;
  label: string;
  osTitle: string;
  cardBorder: string;
  glowAura: string;
  badgeBg: string;
  badgeText: string;
  buttonClass: string;
  accentHex: string;
  sampleId: string;
}

export const getProIdAura = (proId: string = ''): ProIdAuraConfig => {
  const trade = resolveTradeFromProId(proId);
  switch (trade) {
    case 'makeup':
      return {
        trade: 'makeup',
        label: 'Bridal & HD Makeup',
        osTitle: 'Studio OS · Bridal Glam',
        cardBorder: 'border-pink-300 ring-4 ring-pink-100/80',
        glowAura: 'from-pink-100/90 via-rose-50/50 to-purple-100/40',
        badgeBg: 'bg-rose-100 border-rose-300',
        badgeText: 'text-rose-900',
        buttonClass: 'bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white shadow-rose-200',
        accentHex: '#E11D48',
        sampleId: 'MUA-7704',
      };
    case 'plumbing':
      return {
        trade: 'plumbing',
        label: 'Hydro Riser Plumbing',
        osTitle: 'Hydro Dynamics OS',
        cardBorder: 'border-cyan-300 ring-4 ring-cyan-100/80',
        glowAura: 'from-cyan-100/90 via-sky-50/50 to-blue-100/40',
        badgeBg: 'bg-cyan-100 border-cyan-300',
        badgeText: 'text-cyan-900',
        buttonClass: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-cyan-200',
        accentHex: '#06B6D4',
        sampleId: 'PLMB-3301',
      };
    case 'hvac':
      return {
        trade: 'hvac',
        label: 'AC & HVAC Specialist',
        osTitle: 'HVAC Cryo Command OS',
        cardBorder: 'border-sky-300 ring-4 ring-sky-100/80',
        glowAura: 'from-sky-100/90 via-blue-50/50 to-indigo-100/40',
        badgeBg: 'bg-sky-100 border-sky-300',
        badgeText: 'text-sky-900',
        buttonClass: 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white shadow-sky-200',
        accentHex: '#0284C7',
        sampleId: 'HVAC-6623',
      };
    case 'carpentry':
      return {
        trade: 'carpentry',
        label: 'Guild Master Carpenter',
        osTitle: 'Carpentry Guild OS',
        cardBorder: 'border-amber-400 ring-4 ring-amber-100/80',
        glowAura: 'from-amber-100/90 via-orange-50/50 to-yellow-100/40',
        badgeBg: 'bg-amber-100 border-amber-300',
        badgeText: 'text-amber-900',
        buttonClass: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-amber-200',
        accentHex: '#D97706',
        sampleId: 'WOOD-5120',
      };
    case 'electrical':
    default:
      return {
        trade: 'electrical',
        label: 'Master Electrician',
        osTitle: 'Electrical Grid OS',
        cardBorder: 'border-amber-400/80 ring-4 ring-purple-100/70',
        glowAura: 'from-purple-100/80 via-amber-50/50 to-yellow-100/30',
        badgeBg: 'bg-amber-100 border-amber-300',
        badgeText: 'text-amber-900',
        buttonClass: 'bg-[#111111] hover:bg-black text-white shadow-zinc-300',
        accentHex: '#F59E0B',
        sampleId: 'ELEC-9912',
      };
  }
};
