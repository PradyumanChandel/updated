import {
  FlashIcon,
  Wrench01Icon,
  AirVentIcon,
  HammerIcon,
  PaintBoardIcon,
  Car01Icon,
  CpuIcon,
  SparklesIcon,
  Home01Icon,
} from '@hugeicons/core-free-icons';
import { DiagnosticRequirement } from '../types';

export interface ResolvedTrade {
  icon: typeof FlashIcon;
  label: string;
  category: string;
}

/**
 * Scalable dynamic trade icon resolver for Magikscill Pro.
 * Resolves 1,000+ specialized trade titles into canonical trade clusters
 * with lightweight regex keyword matching and fallback.
 */
export const resolveTradeIcon = (tradeName: string = ''): ResolvedTrade => {
  const q = tradeName.toLowerCase().trim();

  // 1. HVAC & Refrigeration (checked early to catch "Car AC Specialist" as HVAC)
  if (/ac\b|cool|hvac|chiller|refrig|vent|air\s*condition|compressor/i.test(q)) {
    return { icon: AirVentIcon, label: 'HVAC', category: 'HVAC & Climate' };
  }

  // 2. Electrical & Solar
  if (/electr|wire|volt|solar|circuit|mcb|light|inverter|switch|panel|generator/i.test(q)) {
    return { icon: FlashIcon, label: 'Electrical', category: 'Electrical & Power' };
  }

  // 3. Plumbing, Motors & Water Supply
  if (/plumb|pipe|drain|leak|water|bore|pump|sanit|geyser|faucet|sewer/i.test(q)) {
    return { icon: Wrench01Icon, label: 'Plumbing', category: 'Plumbing & Water' };
  }

  // 4. Carpentry, Furniture & Interior
  if (/carpent|wood|furnit|door|ply|gypsum|cabinet|timber|locksmith/i.test(q)) {
    return { icon: HammerIcon, label: 'Carpentry', category: 'Carpentry & Woodwork' };
  }

  // 5. Masonry, Welding, Civil & Painting
  if (/paint|mason|civil|tile|weld|plaster|concrete|brick|marble|roof/i.test(q)) {
    return { icon: PaintBoardIcon, label: 'Masonry', category: 'Civil & Finishing' };
  }

  // 6. Automotive & Mechanics
  if (/car|auto|bike|engine|vehic|wheel|clutch|brake|battery/i.test(q)) {
    return { icon: Car01Icon, label: 'Auto', category: 'Automotive & Fleet' };
  }

  // 7. Electronics & Home Appliances
  if (/appliance|wash|oven|ro\b|tv\b|gadget|fridge|microwave|chimney|purifier/i.test(q)) {
    return { icon: CpuIcon, label: 'Appliance', category: 'Appliances & Devices' };
  }

  // 8. Cleaning, Disinfection & Pest Control
  if (/clean|pest|wash|hygiene|fumig|termit|sanitiz|deep\s*clean/i.test(q)) {
    return { icon: SparklesIcon, label: 'Cleaning', category: 'Cleaning & Pest Control' };
  }

  // 9. Beauty, Wellness, Personal Care & Lifestyle
  if (/beauty|makeup|salon|bridal|mehendi|hair|spa|facial|skincare|cosmetic|draping/i.test(q)) {
    return { icon: SparklesIcon, label: 'Beauty', category: 'Beauty & Lifestyle' };
  }

  // Default Fallback
  return { icon: Home01Icon, label: 'Home', category: 'General Field Pro' };
};

/**
 * Enterprise 3-Tier Diagnostic Requirement Engine.
 * Dynamically classifies work orders into:
 * - TEXT_SPECS_ONLY: Privacy & lifestyle / wellness (zero photo mandate)
 * - PHOTO_MANDATORY: High-risk hazards (sparks, arc flash, gas leak, high voltage)
 * - PHOTO_OPTIONAL: Routine maintenance & repairs (default)
 */
export const resolveDiagnosticRule = (
  tradeTitle: string = '',
  issueTitle: string = ''
): DiagnosticRequirement => {
  const combined = `${tradeTitle} ${issueTitle}`.toLowerCase();

  // Tier 1: Text Specs Only (Client Privacy / Salon / Bridal / Wellness / Tutoring)
  if (
    /makeup|beauty|salon|mehendi|hair|bridal|draping|tutor|yoga|massage|physio|fitness|wellness|spa|cosmetic/i.test(
      combined
    )
  ) {
    return 'TEXT_SPECS_ONLY';
  }

  // Tier 3: Strict Photo Mandatory (High-risk hazards / Burn / Flashover / Leaks / High Voltage)
  if (
    /mcb|spark|panel|volt|short\s*circuit|burst|seepage|crack|weld|pcb|burnt|boiler|compressor|overheat|gas\s*leak|hazard|fire|smoke|shock|flame|transformer|flashover/i.test(
      combined
    )
  ) {
    return 'PHOTO_MANDATORY';
  }

  // Tier 2: Photo/Voice Optional (Routine repairs, maintenance, carpentry, auto, standard plumbing)
  return 'PHOTO_OPTIONAL';
};

