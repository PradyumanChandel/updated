export type DiagnosticRequirement = 'TEXT_SPECS_ONLY' | 'PHOTO_OPTIONAL' | 'PHOTO_MANDATORY';

export type TradeCategory =
  | 'electrical'
  | 'plumbing'
  | 'hvac'
  | 'carpentry'
  | 'automotive'
  | 'cleaning'
  | 'masonry'
  | 'appliances'
  | 'beauty'
  | 'makeup';

export interface EvidencePhoto {
  id: string;
  url: string;
  label: string; // e.g. "Main MCB Burn", "Sub-panel Line", "Meter Reading"
  timestamp: string;
}

export interface UniversalWorkOrder {
  id: string;
  orderNumber?: string;
  tradeCategory: TradeCategory | string;
  tradeLabel: string;    // e.g. "Master Plumbing", "AC Tech", "Bridal & HD Makeup Artist"
  issueTitle: string;    // e.g. "Main Line Leakage", "Compressor Failure"
  title?: string;        // fallback alias for issueTitle
  location: string;      // "Civil Lines, Sector 4"
  eta: string;           // "12 mins ETA"
  distanceKm: number;    // 2.4
  escrowAmount: number;  // 199
  escrowLockedAmount?: number; // alias for escrowAmount
  priority: 'HIGH_PRIORITY' | 'SCHEDULED' | 'UPCOMING' | 'High Priority' | 'Standard' | 'Urgent';
  clientName: string;    // "Deepak Dubey"
  clientRole: string;    // "Verified Homeowner"
  clientPhone?: string;  // e.g. "+91 98390 14221"
  clientAvatarInitials?: string;
  safetyHazards?: string[];
  issueDescription?: string;
  timeSlot?: string;
  date?: string;
  status?: 'In Progress' | 'Scheduled' | 'Completed' | 'Pending Escrow';
  escrowStatus?: 'Locked in Escrow' | 'Released' | 'Inspection Hold';
  trade?: string;        // compatibility alias
  diagnosticRequirement?: DiagnosticRequirement;
  serviceSpecs?: string[];
  evidenceThumbnailUrl?: string;
  evidencePhotos?: EvidencePhoto[];
  clientVoiceNoteDuration?: string;
  diagnosticTag?: string;
  requiredTools?: string[];
  client?: {
    name: string;
    phone: string;
    address: string;
    avatarInitials: string;
    verifiedHomeowner: boolean;
  };
}

export type WorkOrder = UniversalWorkOrder;

export interface ProProfile {
  name: string;
  title: string;
  level: number;
  rating: number;
  completedJobs: number;
  hub: string;
  city: string;
  isOnline: boolean;
  upiId: string;
  walletBalance: number;
  escrowPending: number;
  phone?: string;
  avatarInitials?: string;
  tradeCategory?: TradeCategory | string;
  accountId?: string;
  dailyTarget: {
    inspectionsTarget: number;
    inspectionsDone: number;
    deadline: string;
    bonusAmount: number;
  };
}
