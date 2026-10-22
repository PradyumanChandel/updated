import React from 'react';
import { resolveTradeIcon } from '../utils/tradeIconResolver';

export type TradeArtifactCategory =
  | 'carpentry'
  | 'plumbing'
  | 'electrical'
  | 'hvac'
  | 'beauty'
  | 'auto'
  | 'cleaning';

/**
 * Resolves any trade string or label to one of the 7 native 3D artifact categories.
 */
export const resolveTradeCategory = (tradeName: string = ''): TradeArtifactCategory => {
  const q = tradeName.toLowerCase().trim();
  const resolved = resolveTradeIcon(tradeName);
  const cluster = resolved.label.toLowerCase();

  // 1. Beauty, Makeup, Personal Care & Lifestyle
  if (
    /makeup|beauty|salon|bridal|mehendi|hair|facial|cosmetic|draping|spa|skincare/i.test(q) ||
    cluster === 'beauty'
  ) {
    return 'beauty';
  }

  // 2. Carpentry, Woodwork, Furniture & Interior
  if (
    /carpent|wood|furnit|door|ply|cabinet|timber|chisel|mallet|table|wardrobe/i.test(q) ||
    cluster === 'carpentry' ||
    cluster === 'masonry'
  ) {
    return 'carpentry';
  }

  // 3. Plumbing, Water, Pipes & Sanitary
  if (
    /plumb|pipe|drain|leak|water|faucet|geyser|sanit|valve|sewer|motor\s*pump/i.test(q) ||
    cluster === 'plumbing'
  ) {
    return 'plumbing';
  }

  // 4. HVAC, Air Conditioning & Climate
  if (
    /hvac|ac\b|cool|chiller|refrig|vent|compressor|fan/i.test(q) ||
    cluster === 'hvac'
  ) {
    return 'hvac';
  }

  // 5. Automotive & Fleet
  if (
    /auto|car\b|bike|engine|vehic|wheel|gear|piston|clutch|brake|mechanic/i.test(q) ||
    cluster === 'auto'
  ) {
    return 'auto';
  }

  // 6. Cleaning, Hygiene & Pest Control
  if (
    /clean|pest|wash|hygiene|sanitiz|fumig|deep\s*clean/i.test(q) ||
    cluster === 'cleaning'
  ) {
    return 'cleaning';
  }

  // 7. Electrical & Power (Default fallback)
  return 'electrical';
};

/* =========================================================================
   1. CARPENTRY ARTIFACT: Dual 3D Wooden Mallet & Chisel with Amber Sheen
   ========================================================================= */
export const CarpentryArtifact3D: React.FC = () => {
  return (
    <div className="relative w-22 h-22 flex items-center justify-center select-none pointer-events-none">
      {/* Warm Wood & Amber Ambient Aura */}
      <div className="absolute inset-1 rounded-full bg-amber-500/20 blur-md" />

      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_8px_16px_rgba(180,83,9,0.35)]">
        <defs>
          {/* Forged Steel Hammer Head Gradient */}
          <linearGradient id="hammerSteelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="30%" stopColor="#CBD5E1" />
            <stop offset="70%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Solid Hickory Wood Handle Gradient */}
          <linearGradient id="hammerWoodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="75%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* Cold Steel Chisel Blade */}
          <linearGradient id="chiselBladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
        </defs>

        {/* Ambient Metric Compass Ring */}
        <circle cx="50" cy="50" r="42" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4" />
        <circle cx="50" cy="50" r="37" fill="#FEF3C7" fillOpacity="0.35" stroke="#FDE68A" strokeWidth="1" />

        {/* Floating Tool Assembly */}
        <g className="animate-gentle-float" style={{ transformOrigin: '50px 50px' }}>
          
          {/* Background Tool: Steel Joiner Bevel Chisel (Angled Left) */}
          <g transform="rotate(-35 50 50)">
            {/* Chisel Wooden Grip */}
            <rect x="47" y="52" width="6" height="34" rx="3" fill="#92400E" stroke="#78350F" strokeWidth="1" />
            {/* Steel Bolster Ferrule */}
            <rect x="46.5" y="48" width="7" height="4" rx="1" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.8" />
            {/* Hardened Steel Blade */}
            <polygon points="47,48 53,48 52,18 48,18" fill="url(#chiselBladeGrad)" stroke="#475569" strokeWidth="0.8" />
            {/* Angled Cutting Bevel Edge */}
            <polygon points="48,18 52,18 51,14 49,14" fill="#FFFFFF" opacity="0.9" />
          </g>

          {/* Foreground Primary Tool: Master Steel Claw Hammer (Angled Right) */}
          <g transform="rotate(25 50 50)">
            {/* Heavy Ergonomic Wood Handle */}
            <rect x="47" y="32" width="6.5" height="56" rx="3.2" fill="url(#hammerWoodGrad)" stroke="#78350F" strokeWidth="1" />
            {/* Rubber Grip Ribs */}
            <line x1="47" y1="74" x2="53.5" y2="74" stroke="#78350F" strokeWidth="1.2" opacity="0.6" />
            <line x1="47" y1="79" x2="53.5" y2="79" stroke="#78350F" strokeWidth="1.2" opacity="0.6" />
            <line x1="47" y1="84" x2="53.5" y2="84" stroke="#78350F" strokeWidth="1.2" opacity="0.6" />

            {/* Heavy Steel Hammer Head with Bevelled Striking Face & Curved Nail Claw */}
            {/* Striking Face Nose */}
            <path
              d="M 38 24 L 46 25 L 46 35 L 38 34 Z"
              fill="url(#hammerSteelGrad)"
              stroke="#334155"
              strokeWidth="1"
            />
            {/* Central Hammer Eye & Neck Sleeve */}
            <rect x="45" y="23" width="10.5" height="14" rx="1.5" fill="url(#hammerSteelGrad)" stroke="#334155" strokeWidth="1" />
            {/* Curved Nail-Pulling Rear Claw */}
            <path
              d="M 55 24 C 64 25, 72 32, 73 42 C 69 36, 62 33, 55 35 Z"
              fill="url(#hammerSteelGrad)"
              stroke="#334155"
              strokeWidth="1"
            />
            {/* Mirror Specular Highlight Line on Steel Crown */}
            <line x1="40" y1="26" x2="68" y2="28" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
          </g>

        </g>

        {/* Live Craftsmanship Golden Badge Dot */}
        <circle cx="78" cy="22" r="4.5" fill="#F59E0B" className="animate-pulse" />
        <circle cx="78" cy="22" r="7" fill="none" stroke="#FBBF24" strokeWidth="1.5" opacity="0.75" />
      </svg>
    </div>
  );
};

/* =========================================================================
   2. PLUMBING ARTIFACT: Chrome CPVC Pipe Valve with Pressurized Aqua Droplet
   ========================================================================= */
export const PlumbingArtifact3D: React.FC = () => {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-[0_10px_20px_rgba(6,182,212,0.3)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Ambient Aqua Hydro Glow */}
        <radialGradient id="aquaAmbient" cx="60" cy="62" r="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06B6D4" stopOpacity="0.45" />
          <stop offset="0.65" stopColor="#0891B2" stopOpacity="0.18" />
          <stop offset="1" stopColor="#164E63" stopOpacity="0" />
        </radialGradient>

        {/* Polished Chrome Cylinder */}
        <linearGradient id="chromeCylinder" x1="20" y1="36" x2="20" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.25" stopColor="#E2E8F0" />
          <stop offset="0.5" stopColor="#94A3B8" />
          <stop offset="0.75" stopColor="#475569" />
          <stop offset="1" stopColor="#1E293B" />
        </linearGradient>

        {/* Chrome Hex Coupling Nut */}
        <linearGradient id="chromeNut" x1="38" y1="32" x2="56" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8FAFC" />
          <stop offset="0.4" stopColor="#CBD5E1" />
          <stop offset="0.8" stopColor="#64748B" />
          <stop offset="1" stopColor="#334155" />
        </linearGradient>

        {/* 3D Circular Valve Handle Wheel (Safety Red & Crimson) */}
        <linearGradient id="valveWheelGrad" x1="50" y1="12" x2="88" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCA5A5" />
          <stop offset="0.3" stopColor="#EF4444" />
          <stop offset="0.7" stopColor="#DC2626" />
          <stop offset="1" stopColor="#7F1D1D" />
        </linearGradient>

        {/* Pressurized 3D Aqua Water Droplet */}
        <linearGradient id="aquaDropletGrad" x1="45" y1="52" x2="75" y2="105" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E0F2FE" />
          <stop offset="0.25" stopColor="#67E8F9" />
          <stop offset="0.6" stopColor="#06B6D4" />
          <stop offset="0.85" stopColor="#0284C7" />
          <stop offset="1" stopColor="#0C4A6E" />
        </linearGradient>

        {/* Droplet Inner Caustic Refraction */}
        <linearGradient id="causticGrad" x1="50" y1="65" x2="70" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="0.7" stopColor="#38BDF8" stopOpacity="0.3" />
          <stop offset="1" stopColor="#0284C7" stopOpacity="0" />
        </linearGradient>

        {/* Live Cyan Beacon */}
        <linearGradient id="plumbBeacon" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#67E8F9" />
          <stop offset="1" stopColor="#0891B2" />
        </linearGradient>
      </defs>

      {/* Ambient Aqua Hydro Glow */}
      <circle cx="60" cy="60" r="46" fill="url(#aquaAmbient)" />

      {/* Horizontal Chrome Pipe Assembly */}
      <g id="pipeSection">
        {/* Main Pipe Cylinder */}
        <rect x="18" y="40" width="70" height="14" rx="2" fill="url(#chromeCylinder)" stroke="#334155" strokeWidth="0.8" />
        {/* Specular Pipe Top Highlight */}
        <line x1="20" y1="42" x2="86" y2="42" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />

        {/* Left Flange Ring */}
        <rect x="16" y="38" width="5" height="18" rx="1.5" fill="url(#chromeNut)" stroke="#1E293B" strokeWidth="0.8" />

        {/* Central Valve Hex Union */}
        <path
          d="M50 36L64 36L68 47L64 58L50 58L46 47Z"
          fill="url(#chromeNut)"
          stroke="#1E293B"
          strokeWidth="0.8"
        />
        <circle cx="57" cy="47" r="3" fill="#0F172A" />

        {/* Vertical Valve Stem Neck */}
        <rect x="53" y="24" width="8" height="13" rx="1" fill="url(#chromeCylinder)" stroke="#334155" strokeWidth="0.8" />
        {/* Thread Ribs */}
        <line x1="53" y1="28" x2="61" y2="28" stroke="#1E293B" strokeWidth="1" />
        <line x1="53" y1="32" x2="61" y2="32" stroke="#1E293B" strokeWidth="1" />

        {/* 3D Round Valve Wheel Handle with Rim Cutouts */}
        <ellipse cx="57" cy="20" rx="20" ry="8" fill="url(#valveWheelGrad)" stroke="#7F1D1D" strokeWidth="1" />
        <ellipse cx="57" cy="19" rx="16" ry="5.5" fill="#B91C1C" stroke="#FEF2F2" strokeWidth="0.6" opacity="0.8" />
        {/* Center Nut on Wheel */}
        <polygon points="57,17 59.5,18.5 59.5,21.5 57,23 54.5,21.5 54.5,18.5" fill="#FDE047" stroke="#854D0E" strokeWidth="0.6" />
      </g>

      {/* Pressurized 3D Aqua Water Droplet Hanging in Equilibrium */}
      <g id="waterDroplet" className="animate-droplet-bob">
        {/* Water Surface Tension Meniscus from Pipe Outlet */}
        <path d="M52 56C52 56 55 60 57 60C59 60 62 56 62 56" stroke="#67E8F9" strokeWidth="2" strokeLinecap="round" />

        {/* 3D Tear-drop Silhouette */}
        <path
          d="M57 60C57 60 77 82 77 94C77 105 68 112 57 112C46 112 37 105 37 94C37 82 57 60 57 60Z"
          fill="url(#aquaDropletGrad)"
          stroke="#0891B2"
          strokeWidth="1.2"
        />

        {/* Inner Caustic Gradient Arch */}
        <path
          d="M57 64C57 64 73 83 73 93C73 102 66 108 57 108C50 108 43 103 42 96C46 103 54 105 61 103C68 101 70 94 69 88C67 80 57 64 57 64Z"
          fill="url(#causticGrad)"
        />

        {/* Specular Curved Reflection Arc (Top Left) */}
        <ellipse cx="47" cy="85" rx="3.5" ry="9" transform="rotate(-24 47 85)" fill="#FFFFFF" opacity="0.85" />
        <circle cx="49" cy="74" r="2" fill="#FFFFFF" opacity="0.9" />

        {/* Orbiting Suspended Micro-droplets */}
        <circle cx="82" cy="72" r="2.5" fill="#67E8F9" opacity="0.8" className="animate-shimmer-glint" />
        <circle cx="32" cy="98" r="1.8" fill="#38BDF8" opacity="0.75" className="animate-shimmer-glint" />
      </g>

      {/* Live Cyan Trade Status Beacon */}
      <g id="liveBeacon" className="animate-beacon-pulse">
        <circle cx="100" cy="22" r="9" fill="rgba(6, 182, 212, 0.35)" />
        <circle cx="100" cy="22" r="6" fill="url(#plumbBeacon)" stroke="#FFFFFF" strokeWidth="1.2" />
        <circle cx="98.5" cy="20.5" r="2" fill="#FFFFFF" opacity="0.95" />
      </g>
    </svg>
  );
};

/* =========================================================================
   3. ELECTRICAL ARTIFACT: 3D High-Voltage Golden Bolt with Arc Discharge Ring
   ========================================================================= */
export const ElectricalArtifact3D: React.FC = () => {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-[0_10px_22px_rgba(245,158,11,0.35)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Intense Golden Plasma Aura */}
        <radialGradient id="elecPlasma" cx="60" cy="60" r="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE047" stopOpacity="0.55" />
          <stop offset="0.5" stopColor="#F59E0B" stopOpacity="0.28" />
          <stop offset="1" stopColor="#B45309" stopOpacity="0" />
        </radialGradient>

        {/* 3D Sunlit Lightning Facet (Front/Upper) */}
        <linearGradient id="boltSunlit" x1="45" y1="15" x2="85" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.3" stopColor="#FEF08A" />
          <stop offset="0.7" stopColor="#FACC15" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>

        {/* 3D Shadowed Lightning Facet (Side/Bevel) */}
        <linearGradient id="boltShadow" x1="40" y1="20" x2="70" y2="105" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F59E0B" />
          <stop offset="0.5" stopColor="#D97706" />
          <stop offset="0.85" stopColor="#B45309" />
          <stop offset="1" stopColor="#78350F" />
        </linearGradient>

        {/* Electric Arc Plasma Ring */}
        <linearGradient id="arcRingGrad" x1="15" y1="65" x2="105" y2="65" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38BDF8" />
          <stop offset="0.35" stopColor="#818CF8" />
          <stop offset="0.7" stopColor="#FACC15" />
          <stop offset="1" stopColor="#38BDF8" />
        </linearGradient>

        {/* Live Amber Beacon */}
        <linearGradient id="elecBeacon" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FEF08A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>

      {/* Plasma Backing Halo */}
      <circle cx="60" cy="60" r="48" fill="url(#elecPlasma)" />

      {/* 3D Orbiting Plasma Arc Discharge Ring (Tilted Orbital) */}
      <ellipse
        cx="60"
        cy="64"
        rx="46"
        ry="16"
        transform="rotate(-18 60 64)"
        stroke="url(#arcRingGrad)"
        strokeWidth="2.5"
        strokeDasharray="18 8 26 6"
        opacity="0.8"
        className="animate-slow-orbit"
      />

      {/* Arcing Corona Discharge Nodes */}
      <circle cx="22" cy="74" r="2.5" fill="#38BDF8" className="animate-beacon-pulse" />
      <circle cx="98" cy="54" r="2" fill="#818CF8" className="animate-beacon-pulse" />
      <path d="M22 74L16 78M98 54L104 50" stroke="#E0F2FE" strokeWidth="1.5" strokeLinecap="round" />

      {/* 3D High-Voltage Lightning Bolt with Dual Bevel Facets */}
      <g id="lightningBolt" transform="translate(4, -2)" className="animate-gentle-float">
        {/* Dark Under-Bevel / 3D Extrusion Wall */}
        <path
          d="M66 14L40 56H58L50 102L84 50H64L72 14Z"
          fill="url(#boltShadow)"
          stroke="#78350F"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Front Highlight Facet (Faceted Split Light) */}
        <path
          d="M68 14L44 56H60L54 98L82 50H66L72 14Z"
          fill="url(#boltSunlit)"
          stroke="#D97706"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* Pure Specular Core Line through the Center Spine */}
        <path
          d="M69 16L48 55M48 55H60M60 55L54 94"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />

        {/* Secondary Spark Forks */}
        <path
          d="M44 56L32 62M60 56L68 64"
          stroke="#FEF08A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>

      {/* High-Voltage Status Beacon */}
      <g id="liveBeacon" className="animate-beacon-pulse">
        <circle cx="102" cy="22" r="9" fill="rgba(245, 158, 11, 0.4)" />
        <circle cx="102" cy="22" r="6" fill="url(#elecBeacon)" stroke="#FFFFFF" strokeWidth="1.2" />
        <circle cx="100.5" cy="20.5" r="2" fill="#FFFFFF" opacity="0.95" />
      </g>
    </svg>
  );
};

/* =========================================================================
   4. HVAC ARTIFACT: Ice-Blue Frost Rotor Cooling Fan with Snowflake Crystals
   ========================================================================= */
export const HvacArtifact3D: React.FC = () => {
  return (
    <div className="relative w-22 h-22 flex items-center justify-center">
      {/* Ambient Frost Glow & Radar Ring */}
      <div className="absolute inset-0 rounded-full bg-sky-400/15 blur-md" />
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(56,189,248,0.35)]">
        <defs>
          <radialGradient id="hvacBladeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="60%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </radialGradient>
          <radialGradient id="hvacHubGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#0284C7" />
          </radialGradient>
        </defs>

        {/* Outer Aerodynamic Vent Ring */}
        <circle cx="50" cy="50" r="42" fill="none" stroke="#38BDF8" strokeWidth="1.8" strokeDasharray="6 4" opacity="0.45" />
        <circle cx="50" cy="50" r="38" fill="#F0F9FF" fillOpacity="0.4" stroke="#7DD3FC" strokeWidth="1" />

        {/* Centered Rotating Rotor Blades */}
        <g className="animate-hvac-fan">
          {/* 5 Aerodynamic Curved Blades around (50, 50) */}
          {[0, 72, 144, 216, 288].map((angle) => (
            <path
              key={angle}
              d="M 50 50 Q 62 26, 50 16 Q 40 24, 50 50 Z"
              fill="url(#hvacBladeGrad)"
              opacity="0.92"
              transform={`rotate(${angle} 50 50)`}
            />
          ))}
          {/* Central Rotor Hub Cap */}
          <circle cx="50" cy="50" r="10" fill="url(#hvacHubGrad)" stroke="#0284C7" strokeWidth="1.5" />
          <circle cx="50" cy="50" r="4" fill="#0369A1" />
        </g>

        {/* Live Sub-Zero Indicator Dot */}
        <circle cx="78" cy="22" r="4" fill="#38BDF8" className="animate-pulse" />
        <circle cx="78" cy="22" r="6" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />
      </svg>
    </div>
  );
};

/* =========================================================================
   5. BEAUTY / MAKEUP ARTIFACT: Rose-Gold Vanity Compact Mirror & Angled Brush
   ========================================================================= */
export const BeautyArtifact3D: React.FC = () => {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-[0_10px_22px_rgba(236,72,153,0.32)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Luxury Rose Shimmer Aura */}
        <radialGradient id="roseAura" cx="60" cy="60" r="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F472B6" stopOpacity="0.45" />
          <stop offset="0.6" stopColor="#DB2777" stopOpacity="0.2" />
          <stop offset="1" stopColor="#831843" stopOpacity="0" />
        </radialGradient>

        {/* 3D Rose-Gold Rim Gradient */}
        <linearGradient id="roseGoldRim" x1="25" y1="20" x2="85" y2="85" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF1F2" />
          <stop offset="0.25" stopColor="#FDA4AF" />
          <stop offset="0.6" stopColor="#F43F5E" />
          <stop offset="0.85" stopColor="#BE123C" />
          <stop offset="1" stopColor="#881337" />
        </linearGradient>

        {/* Silver-Crystal Mirror Face */}
        <linearGradient id="mirrorGlassGrad" x1="32" y1="32" x2="78" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.45" stopColor="#F1F5F9" />
          <stop offset="0.8" stopColor="#E2E8F0" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>

        {/* Pressed Silk Blush Powder Basin */}
        <linearGradient id="blushPowderGrad" x1="36" y1="36" x2="74" y2="74" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFE4E6" />
          <stop offset="0.5" stopColor="#FB7185" />
          <stop offset="1" stopColor="#E11D48" />
        </linearGradient>

        {/* Luxury Cosmetic Brush Bristles */}
        <linearGradient id="brushBristles" x1="70" y1="30" x2="90" y2="12" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFF1F2" />
          <stop offset="0.4" stopColor="#F43F5E" />
          <stop offset="0.85" stopColor="#4A044E" />
          <stop offset="1" stopColor="#1E1B4B" />
        </linearGradient>

        {/* Polished Gold Ferrule */}
        <linearGradient id="goldFerrule" x1="60" y1="42" x2="74" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FEF08A" />
          <stop offset="0.5" stopColor="#EAB308" />
          <stop offset="1" stopColor="#854D0E" />
        </linearGradient>

        {/* Brush Slim Handle */}
        <linearGradient id="brushHandle" x1="38" y1="68" x2="65" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FCE7F3" />
          <stop offset="0.4" stopColor="#F472B6" />
          <stop offset="0.8" stopColor="#9D174D" />
          <stop offset="1" stopColor="#4C0519" />
        </linearGradient>

        {/* Live Rose Beacon */}
        <linearGradient id="roseBeacon" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FBCFE8" />
          <stop offset="1" stopColor="#DB2777" />
        </linearGradient>
      </defs>

      {/* Luxury Rose Shimmer Aura */}
      <circle cx="60" cy="60" r="48" fill="url(#roseAura)" />

      {/* 3D Open Rose-Gold Vanity Compact */}
      <g id="compactCase">
        {/* Bottom Beveled Housing Base (Shadow) */}
        <ellipse cx="54" cy="58" rx="30" ry="26" fill="#881337" opacity="0.4" />
        {/* Main 3D Rose Gold Outer Rim */}
        <ellipse cx="52" cy="54" rx="28" ry="24" fill="url(#roseGoldRim)" stroke="#9F1239" strokeWidth="1" />
        {/* Raised Inner Lip */}
        <ellipse cx="52" cy="54" rx="24" ry="20" fill="#4C0519" opacity="0.7" />

        {/* Half Mirror / Half Blush Split */}
        {/* Reflective Mirror Plate */}
        <ellipse cx="52" cy="54" rx="22" ry="18" fill="url(#mirrorGlassGrad)" />
        {/* Diagonal Specular Sheen Beam across mirror */}
        <path
          d="M36 44L48 38L66 64L54 70Z"
          fill="#FFFFFF"
          opacity="0.65"
        />

        {/* Embedded Silk Blush Pan */}
        <ellipse cx="52" cy="54" rx="16" ry="13" fill="url(#blushPowderGrad)" stroke="#BE123C" strokeWidth="0.8" />
        {/* Silk Embossed Swirl on Powder */}
        <path
          d="M44 54C44 49 50 46 54 48C58 50 58 56 53 58C49 60 47 57 48 55"
          stroke="#FFF1F2"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>

      {/* 3D Angled Cosmetic Blending Brush Laid Across */}
      <g id="cosmeticBrush" className="animate-gentle-float">
        {/* Slender Contoured Handle */}
        <path
          d="M26 94L54 62C56 60 59 60 61 62L62 63C64 65 64 68 62 70L34 102C32 104 28 103 26 100C24 98 24 96 26 94Z"
          fill="url(#brushHandle)"
          stroke="#4C0519"
          strokeWidth="0.8"
        />
        {/* Polished Gold Ferrule Collar */}
        <path
          d="M56 60L66 49L72 54L62 65Z"
          fill="url(#goldFerrule)"
          stroke="#713F12"
          strokeWidth="0.8"
        />
        {/* Dense Angled Ombre Bristles */}
        <path
          d="M66 49L80 32C84 27 91 30 92 36L72 54Z"
          fill="url(#brushBristles)"
          stroke="#3B0764"
          strokeWidth="0.8"
        />
        {/* Bristle Highlight Wisps */}
        <line x1="79" y1="34" x2="71" y2="50" stroke="#FFF1F2" strokeWidth="1" opacity="0.75" />
        <line x1="85" y1="34" x2="75" y2="48" stroke="#FDA4AF" strokeWidth="1" opacity="0.6" />
      </g>

      {/* Sparkling 4-Point Diamond Stars */}
      {/* Star 1 */}
      <g transform="translate(86, 26)" className="animate-shimmer-glint">
        <path
          d="M0 -7C0 -2 2 0 7 0C2 0 0 2 0 7C0 2 -2 0 -7 0C-2 0 0 -2 0 -7Z"
          fill="#FFFFFF"
        />
        <circle cx="0" cy="0" r="1.5" fill="#FDE047" />
      </g>
      {/* Star 2 */}
      <g transform="translate(24, 38) scale(0.65)" className="animate-shimmer-glint">
        <path
          d="M0 -7C0 -2 2 0 7 0C2 0 0 2 0 7C0 2 -2 0 -7 0C-2 0 0 -2 0 -7Z"
          fill="#FFF1F2"
        />
      </g>

      {/* Live Rose Status Beacon */}
      <g id="liveBeacon" className="animate-beacon-pulse">
        <circle cx="102" cy="22" r="9" fill="rgba(236, 72, 153, 0.35)" />
        <circle cx="102" cy="22" r="6" fill="url(#roseBeacon)" stroke="#FFFFFF" strokeWidth="1.2" />
        <circle cx="100.5" cy="20.5" r="2" fill="#FFFFFF" opacity="0.95" />
      </g>
    </svg>
  );
};

/* =========================================================================
   6. AUTOMOTIVE ARTIFACT: Heavy Dual Mechanical Chrome Gears & Piston Assembly
   ========================================================================= */
export const AutomotiveArtifact3D: React.FC = () => {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-[0_10px_22px_rgba(239,68,68,0.3)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Ambient Industrial Ruby Glow */}
        <radialGradient id="autoAura" cx="60" cy="60" r="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F87171" stopOpacity="0.45" />
          <stop offset="0.6" stopColor="#DC2626" stopOpacity="0.2" />
          <stop offset="1" stopColor="#7F1D1D" stopOpacity="0" />
        </radialGradient>

        {/* 3D Chrome Gear Gradient */}
        <linearGradient id="chromeGear" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.3" stopColor="#E2E8F0" />
          <stop offset="0.6" stopColor="#94A3B8" />
          <stop offset="0.85" stopColor="#475569" />
          <stop offset="1" stopColor="#0F172A" />
        </linearGradient>

        {/* Small Counter Gear Gradient */}
        <linearGradient id="pinionGear" x1="60" y1="50" x2="100" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F1F5F9" />
          <stop offset="0.4" stopColor="#CBD5E1" />
          <stop offset="0.8" stopColor="#64748B" />
          <stop offset="1" stopColor="#1E293B" />
        </linearGradient>

        {/* Heavy Mechanical Piston Steel Rod */}
        <linearGradient id="pistonRod" x1="20" y1="80" x2="80" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E2E8F0" />
          <stop offset="0.5" stopColor="#64748B" />
          <stop offset="1" stopColor="#1E293B" />
        </linearGradient>

        {/* Bronze Center Bushing */}
        <linearGradient id="bronzeBush" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FEF08A" />
          <stop offset="0.6" stopColor="#D97706" />
          <stop offset="1" stopColor="#78350F" />
        </linearGradient>

        {/* Live Ruby Beacon */}
        <linearGradient id="autoBeacon" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FCA5A5" />
          <stop offset="1" stopColor="#DC2626" />
        </linearGradient>
      </defs>

      {/* Industrial Ruby Glow */}
      <circle cx="60" cy="60" r="48" fill="url(#autoAura)" />

      {/* 3D Heavy Mechanical Connecting Rod / Piston Shank in Perspective */}
      <g id="pistonAssembly" className="animate-gentle-float">
        <path
          d="M26 88L72 32C74 30 78 30 80 32L84 36C86 38 86 42 84 44L38 100C36 102 32 102 30 100L26 96C24 94 24 90 26 88Z"
          fill="url(#pistonRod)"
          stroke="#0F172A"
          strokeWidth="1"
        />
        {/* Recessed I-Beam Channel on Rod */}
        <path
          d="M34 88L74 40"
          stroke="#0F172A"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M34 88L74 40"
          stroke="#94A3B8"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>

      {/* Primary 3D Chrome Spur Gear (Center Left) */}
      <g id="mainGear" className="animate-gear-cw" transform="translate(48, 52)">
        {/* 8-Tooth Beveled Cog Outline */}
        <path
          d="M-8 -26 L8 -26 L10 -18 L18 -18 L24 -12 L18 -6 L20 2 L26 8 L22 16 L14 16 L10 22 L12 28 L4 30 L-4 30 L-10 24 L-16 26 L-22 20 L-18 12 L-22 4 L-28 0 L-26 -8 L-18 -10 L-16 -18 L-10 -20 Z"
          fill="url(#chromeGear)"
          stroke="#1E293B"
          strokeWidth="1.2"
        />

        {/* Gear Rim Chamfer Reflection */}
        <circle cx="0" cy="0" r="19" fill="#0F172A" opacity="0.3" />
        <circle cx="0" cy="0" r="17" fill="url(#chromeGear)" stroke="#CBD5E1" strokeWidth="0.8" />

        {/* 3 Weight-Reduction Cutout Holes */}
        <circle cx="0" cy="-9" r="4" fill="#0F172A" />
        <circle cx="-8" cy="5" r="4" fill="#0F172A" />
        <circle cx="8" cy="5" r="4" fill="#0F172A" />

        {/* Center Bronze Bearing Bushing */}
        <circle cx="0" cy="0" r="6" fill="url(#bronzeBush)" stroke="#78350F" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="3" fill="#0F172A" />
      </g>

      {/* Interlocking Secondary Pinion Gear (Bottom Right) */}
      <g id="pinionGear" className="animate-gear-ccw" transform="translate(82, 78) scale(0.68)">
        <path
          d="M-6 -20 L6 -20 L8 -14 L14 -14 L18 -8 L14 -4 L16 2 L20 6 L18 12 L12 12 L8 16 L10 22 L4 22 L-4 22 L-8 18 L-12 18 L-16 14 L-14 8 L-18 4 L-20 -2 L-16 -6 L-14 -12 L-8 -14 Z"
          fill="url(#pinionGear)"
          stroke="#0F172A"
          strokeWidth="1.2"
        />
        <circle cx="0" cy="0" r="11" fill="#1E293B" />
        <circle cx="0" cy="0" r="5" fill="#EF4444" stroke="#B91C1C" strokeWidth="0.8" />
      </g>

      {/* Live Ruby Status Beacon */}
      <g id="liveBeacon" className="animate-beacon-pulse">
        <circle cx="102" cy="22" r="9" fill="rgba(239, 68, 68, 0.35)" />
        <circle cx="102" cy="22" r="6" fill="url(#autoBeacon)" stroke="#FFFFFF" strokeWidth="1.2" />
        <circle cx="100.5" cy="20.5" r="2" fill="#FFFFFF" opacity="0.95" />
      </g>
    </svg>
  );
};

/* =========================================================================
   7. CLEANING ARTIFACT: Emerald / Violet Sparkle Burst Cluster with Clean Aura
   ========================================================================= */
export const CleaningArtifact3D: React.FC = () => {
  return (
    <svg
      viewBox="0 0 120 120"
      className="w-full h-full drop-shadow-[0_10px_22px_rgba(139,92,246,0.32)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Clean Aura Prismatic Halo */}
        <radialGradient id="cleanAura" cx="60" cy="60" r="50" gradientUnits="userSpaceOnUse">
          <stop stopColor="#A7F3D0" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#C084FC" stopOpacity="0.25" />
          <stop offset="1" stopColor="#6D28D9" stopOpacity="0" />
        </radialGradient>

        {/* 3D Prismatic Diamond Starburst Gradient */}
        <linearGradient id="prismaticGrad" x1="20" y1="20" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.3" stopColor="#A7F3D0" />
          <stop offset="0.6" stopColor="#34D399" />
          <stop offset="0.85" stopColor="#A855F7" />
          <stop offset="1" stopColor="#6B21A8" />
        </linearGradient>

        {/* 3D Soap Bubble Iridescent Shell */}
        <radialGradient id="bubbleShell" cx="38" cy="74" r="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="0.4" stopColor="#C4B5FD" stopOpacity="0.4" />
          <stop offset="0.75" stopColor="#6EE7B7" stopOpacity="0.25" />
          <stop offset="1" stopColor="#8B5CF6" stopOpacity="0.65" />
        </radialGradient>

        {/* Live Violet Beacon */}
        <linearGradient id="cleanBeacon" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#E9D5FF" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>

      {/* Clean Aura Prismatic Halo */}
      <circle cx="60" cy="60" r="48" fill="url(#cleanAura)" />

      {/* 3D Iridescent Soap Bubble (Floating in bottom-left depth) */}
      <g id="soapBubble" className="animate-gentle-float">
        <circle cx="42" cy="74" r="18" fill="url(#bubbleShell)" stroke="#E9D5FF" strokeWidth="1" />
        {/* Specular Crescent Highlight on Bubble Rim */}
        <path
          d="M32 64C36 60 44 60 48 62"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="34" cy="68" r="1.5" fill="#FFFFFF" />
      </g>

      {/* Dominant 3D Faceted 4-Point Prismatic Diamond Starburst */}
      <g id="mainStar" className="animate-shimmer-glint" transform="translate(62, 54)">
        {/* Outer Faceted Starburst Silhouette with Deep Curves */}
        <path
          d="M0 -34C0 -10 10 0 34 0C10 0 0 10 0 34C0 10 -10 0 -34 0C-10 0 0 -10 0 -34Z"
          fill="url(#prismaticGrad)"
          stroke="#581C87"
          strokeWidth="1.2"
        />

        {/* Diagonal Bevel Facet Split (Emerald Light vs Violet Shade) */}
        <path
          d="M0 -34C0 -10 10 0 34 0L0 0Z"
          fill="#ECFDF5"
          opacity="0.85"
        />
        <path
          d="M0 34C0 10 -10 0 -34 0L0 0Z"
          fill="#4C1D95"
          opacity="0.4"
        />

        {/* Brilliant Diamond Core */}
        <polygon points="0,-10 10,0 0,10 -10,0" fill="#FFFFFF" />
        <circle cx="0" cy="0" r="3.5" fill="#10B981" />
        <circle cx="-1" cy="-1" r="1.5" fill="#FFFFFF" />
      </g>

      {/* Secondary Orbiting Micro Sparkle Stars */}
      {/* Top Left Mini Star */}
      <g transform="translate(26, 28) scale(0.65)" className="animate-shimmer-glint">
        <path
          d="M0 -16C0 -5 5 0 16 0C5 0 0 5 0 16C0 5 -5 0 -16 0C-5 0 0 -5 0 -16Z"
          fill="#34D399"
          stroke="#065F46"
          strokeWidth="1"
        />
        <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
      </g>

      {/* Right Orbiting Diamond Star */}
      <g transform="translate(94, 76) scale(0.55)" className="animate-shimmer-glint">
        <path
          d="M0 -16C0 -5 5 0 16 0C5 0 0 5 0 16C0 5 -5 0 -16 0C-5 0 0 -5 0 -16Z"
          fill="#C084FC"
          stroke="#6B21A8"
          strokeWidth="1"
        />
        <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
      </g>

      {/* Clean Glint Particles */}
      <circle cx="80" cy="28" r="2" fill="#FFFFFF" opacity="0.9" className="animate-shimmer-glint" />
      <circle cx="72" cy="88" r="1.8" fill="#A7F3D0" opacity="0.8" className="animate-shimmer-glint" />

      {/* Live Violet Status Beacon */}
      <g id="liveBeacon" className="animate-beacon-pulse">
        <circle cx="102" cy="22" r="9" fill="rgba(139, 92, 246, 0.35)" />
        <circle cx="102" cy="22" r="6" fill="url(#cleanBeacon)" stroke="#FFFFFF" strokeWidth="1.2" />
        <circle cx="100.5" cy="20.5" r="2" fill="#FFFFFF" opacity="0.95" />
      </g>
    </svg>
  );
};

/* =========================================================================
   MAIN COMPONENT: DynamicJobShieldBadge (Trade-Native 3D Floating Artifact)
   ========================================================================= */
interface DynamicJobShieldBadgeProps {
  trade?: string;
  className?: string;
}

export const DynamicJobShieldBadge: React.FC<DynamicJobShieldBadgeProps> = ({
  trade = 'electrical',
  className = '',
}) => {
  const category = React.useMemo(() => resolveTradeCategory(trade), [trade]);

  return (
    <div
      className={`absolute top-2 right-2 w-22 h-22 sm:w-24 sm:h-24 flex items-center justify-center pointer-events-none select-none z-10 transition-transform duration-300 group-hover:scale-105 ${className}`}
      aria-label={`Trade artifact: ${category}`}
    >
      {category === 'carpentry' && <CarpentryArtifact3D />}
      {category === 'plumbing' && <PlumbingArtifact3D />}
      {category === 'hvac' && <HvacArtifact3D />}
      {category === 'beauty' && <BeautyArtifact3D />}
      {category === 'auto' && <AutomotiveArtifact3D />}
      {category === 'cleaning' && <CleaningArtifact3D />}
      {category === 'electrical' && <ElectricalArtifact3D />}
    </div>
  );
};
