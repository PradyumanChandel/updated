import React, { useEffect, useRef, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Cancel01Icon,
  Call02Icon,
  Location01Icon,
  Clock01Icon,
  CheckmarkCircle02Icon,
  Compass01Icon,
  AlertCircleIcon,
  Camera01Icon,
  LockKeyIcon,
  ShieldCheckIcon,
  Maximize01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Image01Icon,
} from '@hugeicons/core-free-icons';
import { UniversalWorkOrder, EvidencePhoto } from '../types';
import { resolveDiagnosticRule } from '../utils/tradeIconResolver';

interface JobDetailModalProps {
  order: UniversalWorkOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onCallClient: (phone: string, name: string) => void;
  onOpenWatermark: () => void;
  onCompleteOrder: (orderId: string) => void;
}

export const JobDetailModal: React.FC<JobDetailModalProps> = ({
  order,
  isOpen,
  onClose,
  onCallClient,
  onOpenWatermark,
  onCompleteOrder,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const [isFullScreenPhotoOpen, setIsFullScreenPhotoOpen] = useState<boolean>(false);

  // Complete Scroll Decoupling & Auto-Reset to Top & Active Photo Reset
  useEffect(() => {
    if (!isOpen || !order) return;

    // Reset active photo index to first item when order changes
    setActivePhotoIndex(0);
    setIsFullScreenPhotoOpen(false);

    // Auto-reset scroll position to top when modal opens
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }

    // Strict body lock to prevent background scroll interference
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
  }, [isOpen, order?.id]);

  // Derived Multi-Photo Gallery Array
  const fallbackPhotoUrl =
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80';

  const galleryPhotos: EvidencePhoto[] = useMemo(() => {
    if (!order) return [];

    if (order.evidencePhotos && order.evidencePhotos.length > 0) {
      return order.evidencePhotos;
    }

    const primaryUrl = order.evidenceThumbnailUrl || fallbackPhotoUrl;
    const category = (order.tradeCategory || order.trade || '').toLowerCase();

    if (category.includes('plumb') || category.includes('hydro')) {
      return [
        {
          id: 'photo-1',
          url: primaryUrl,
          label: order.diagnosticTag || 'Main Riser Joint Pressure Test',
          timestamp: '21 Oct · 10:22 AM',
        },
        {
          id: 'photo-2',
          url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&auto=format&fit=crop&q=80',
          label: '4.2 Bar Hydrostatic Gauge Hold',
          timestamp: '21 Oct · 10:25 AM',
        },
        {
          id: 'photo-3',
          url: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&auto=format&fit=crop&q=80',
          label: 'CPVC Primer & Gate Valve Seat',
          timestamp: '21 Oct · 10:28 AM',
        },
      ];
    }

    if (category.includes('hvac') || category.includes('cryo') || category.includes('ac')) {
      return [
        {
          id: 'photo-1',
          url: primaryUrl,
          label: order.diagnosticTag || 'R32 Inverter Suction Line Frost',
          timestamp: '21 Oct · 10:18 AM',
        },
        {
          id: 'photo-2',
          url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80',
          label: 'Outdoor Condenser Fan Overload',
          timestamp: '21 Oct · 10:21 AM',
        },
        {
          id: 'photo-3',
          url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
          label: 'Micron Gauge Vacuum Drawdown',
          timestamp: '21 Oct · 10:26 AM',
        },
      ];
    }

    if (category.includes('beauty') || category.includes('makeup')) {
      return [
        {
          id: 'photo-1',
          url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&auto=format&fit=crop&q=80',
          label: 'HD Airbrush Base Skin Calibration',
          timestamp: '21 Oct · 09:15 AM',
        },
        {
          id: 'photo-2',
          url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
          label: 'Custom Pigment Swatch Match',
          timestamp: '21 Oct · 09:25 AM',
        },
        {
          id: 'photo-3',
          url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80',
          label: 'Vanity 5600K Lighting Test',
          timestamp: '21 Oct · 09:40 AM',
        },
      ];
    }

    // Default 3-photo diagnostic gallery for Electrical & other trades
    return [
      {
        id: 'photo-1',
        url: primaryUrl,
        label: order.diagnosticTag || 'Main DB Box MCB Arc Spark Evidence',
        timestamp: '21 Oct · 10:22 AM',
      },
      {
        id: 'photo-2',
        url: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80',
        label: '32A Breaker Contact Terminal Overheat',
        timestamp: '21 Oct · 10:25 AM',
      },
      {
        id: 'photo-3',
        url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
        label: 'Thermal Infrared Overload Scan',
        timestamp: '21 Oct · 10:28 AM',
      },
    ];
  }, [order, fallbackPhotoUrl]);

  if (!isOpen || !order) return null;
  if (typeof document === 'undefined') return null;

  const activePhoto = galleryPhotos[activePhotoIndex] || galleryPhotos[0];

  const handleHeaderTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleHeaderTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY !== null) {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchEndY - touchStartY;
      if (diff > 50) {
        onClose();
      }
      setTouchStartY(null);
    }
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : galleryPhotos.length - 1));
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev < galleryPhotos.length - 1 ? prev + 1 : 0));
  };

  const escrowVal = order.escrowAmount ?? order.escrowLockedAmount ?? 199;
  const orderNum = order.orderNumber || order.id;
  const tradeTag = order.tradeLabel || order.trade || order.tradeCategory || 'Field Pro';
  const jobTitle = order.issueTitle || order.title;
  const clientName = order.clientName || order.client?.name || 'Client';
  const clientPhone = order.clientPhone || order.client?.phone || '+91 98390 14221';
  const clientRole = order.clientRole || (order.client?.verifiedHomeowner ? 'Verified Homeowner' : 'Verified Client');
  const avatarInitials =
    order.clientAvatarInitials ||
    order.client?.avatarInitials ||
    clientName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  const clientAddress = order.client?.address || order.location;
  const dateStr = order.date || 'Today';
  const timeStr = order.timeSlot || order.eta || '10:30–11:30 AM';
  const hazardsList = order.safetyHazards && order.safetyHazards.length > 0 ? order.safetyHazards : ['Standard Field PPE Required'];

  const diagnosticReq =
    order.diagnosticRequirement ||
    resolveDiagnosticRule(tradeTag, jobTitle);

  return createPortal(
    <div className="fixed inset-0 z-[999] flex flex-col justify-end lg:justify-center items-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 select-none p-0 lg:p-6">
      {/* Dismiss Backdrop */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Standalone Viewport-Anchored Sheet (Mobile Bottom Sheet / Desktop Centered Dialog) */}
      <div className="relative w-full max-w-[390px] sm:max-w-[420px] lg:max-w-2xl mx-auto h-[86vh] lg:h-[82vh] max-h-[86dvh] lg:max-h-[82vh] bg-white rounded-t-[36px] lg:rounded-[32px] shadow-2xl flex flex-col overflow-hidden z-10 animate-in slide-in-from-bottom lg:zoom-in-95 duration-300 pointer-events-auto">
        {/* Top Drag Handle & Sticky Header with Swipe-down Dismiss */}
        <div
          className="pt-3 pb-2.5 px-6 flex flex-col items-center border-b border-gray-100 shrink-0 bg-white cursor-grab active:cursor-grabbing select-none"
          onTouchStart={handleHeaderTouchStart}
          onTouchEnd={handleHeaderTouchEnd}
        >
          {/* Visual Drag Handle Bar (tap or drag down to dismiss) */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Drag down or tap to dismiss"
            className="w-12 h-1.5 bg-gray-300 hover:bg-gray-400 active:bg-gray-500 rounded-full mb-2.5 transition-colors cursor-pointer"
          />

          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 min-w-0">
              <span className="px-2.5 py-1 rounded-full bg-gray-100 text-[11px] font-bold text-gray-700 font-mono truncate">
                {orderNum}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-[11px] font-bold text-amber-800 truncate">
                {tradeTag}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close Job Details"
              className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full bg-gray-100 hover:bg-gray-200 active:scale-95 flex items-center justify-center text-gray-600 font-bold transition-all cursor-pointer shrink-0"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={2.2} />
            </button>
          </div>
        </div>

        {/* Fully Controllable Internal Scroll Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-4 touch-pan-y [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* Dynamic Interactive Client Photo Gallery Viewer */}
          <div className="space-y-2">
            {/* Main Interactive Preview Box with Zero Layout Shift */}
            <div
              onClick={() => setIsFullScreenPhotoOpen(true)}
              className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-black aspect-video flex items-center justify-center shrink-0 cursor-pointer group select-none"
              title="Click to view full-screen photo detail"
            >
              <img
                src={activePhoto.url}
                alt={activePhoto.label}
                className="w-full h-full object-cover transition-opacity duration-200"
              />

              {/* Top Bar Overlay: Photo Counter + Fullscreen Zoom Trigger */}
              <div className="absolute top-2 inset-x-2 flex items-center justify-between pointer-events-none z-10">
                <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-white border border-white/20 flex items-center gap-1 shadow-sm">
                  <HugeiconsIcon icon={Image01Icon} size={12} strokeWidth={2.2} className="text-amber-400" />
                  <span>Photo {activePhotoIndex + 1} of {galleryPhotos.length}</span>
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFullScreenPhotoOpen(true);
                  }}
                  aria-label="Full-Screen Photo Zoom View"
                  title="Expand to Full-Screen"
                  className="w-8 h-8 min-w-[32px] min-h-[32px] rounded-xl bg-black/75 backdrop-blur-md text-white hover:bg-black active:scale-95 flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-md pointer-events-auto"
                >
                  <HugeiconsIcon icon={Maximize01Icon} size={15} strokeWidth={2.2} />
                </button>
              </div>

              {/* Bottom Bar Overlay: Label & Timestamp */}
              <div className="absolute bottom-2 inset-x-2 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center justify-between text-[11px] text-white font-mono z-10 shadow-sm">
                <span className="truncate max-w-[65%] font-semibold">📍 {activePhoto.label}</span>
                <span className="shrink-0 text-emerald-400 font-bold">⏱️ {activePhoto.timestamp}</span>
              </div>
            </div>

            {/* Interactive Thumbnail Reel Strip (rendered if multiple photos) */}
            {galleryPhotos.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {galleryPhotos.map((photo, index) => {
                  const isSelected = activePhotoIndex === index;
                  return (
                    <button
                      key={photo.id || index}
                      type="button"
                      onClick={() => setActivePhotoIndex(index)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? 'border-amber-500 ring-2 ring-amber-400/50 scale-105 shadow-md'
                          : 'border-gray-200 opacity-70 hover:opacity-100 hover:border-gray-400'
                      }`}
                      title={photo.label}
                    >
                      <img
                        src={photo.url}
                        alt={photo.label}
                        className="w-full h-full object-cover"
                      />
                      <span
                        className={`absolute bottom-0 inset-x-0 text-[8px] font-bold text-center py-0.5 truncate px-0.5 ${
                          isSelected ? 'bg-amber-500 text-black font-extrabold' : 'bg-black/70 text-white'
                        }`}
                      >
                        #{index + 1}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Issue Title & Description */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider">
                {order.priority}
              </span>
              <span className="text-[10px] font-medium text-slate-400">
                Status: {order.status || 'Active'}
              </span>
            </div>
            <h3 className="text-[20px] font-extrabold text-[#111111] leading-snug">
              {jobTitle}
            </h3>
            <p className="text-[13px] text-gray-600 leading-relaxed pt-1">
              {order.issueDescription ||
                'Homeowner reports severe sparking from the 32A MCB box upon connecting heavy load. Diagnostic evidence verified for electrical hazard compliance.'}
            </p>
          </div>

          {/* Upfront Escrow Guarantee */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-800 flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={LockKeyIcon} size={16} strokeWidth={2.4} />
              </div>
              <div>
                <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider leading-tight">
                  Upfront Escrow Locked
                </div>
                <div className="text-[16px] font-extrabold text-emerald-950 leading-tight">
                  ₹{escrowVal} Guaranteed
                </div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-2xs">
              Secured
            </span>
          </div>

          {/* Diagnostic Requirement Engine Panel */}
          {diagnosticReq === 'TEXT_SPECS_ONLY' && (
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} strokeWidth={2.2} className="text-emerald-600" />
                  Verified Service Specifications
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                  Privacy Mode
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Client privacy protected. Work executed according to verified specs.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {(order.serviceSpecs || ['Client Privacy Mode', 'Direct Service Specs']).map((spec, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-semibold bg-white text-slate-800 px-2.5 py-1 rounded-lg border border-emerald-200/60 shadow-2xs"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          )}

          {diagnosticReq === 'PHOTO_MANDATORY' && (
            <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                  <HugeiconsIcon icon={AlertCircleIcon} size={15} strokeWidth={2.4} className="text-rose-600" />
                  Mandatory Hazard Proof
                </span>
                <span className="text-[10px] font-bold text-rose-700 bg-rose-100/90 px-2 py-0.5 rounded-full">
                  Strict Inspection
                </span>
              </div>
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {order.diagnosticTag || 'Burn/Flashover Evidence Attached'}
              </p>
              <p className="text-[11px] text-slate-600">
                Watermarked pre-work and post-work photos mandatory for escrow release.
              </p>
            </div>
          )}

          {diagnosticReq === 'PHOTO_OPTIONAL' && (
            <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">
                  Routine Maintenance · Photo Optional
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  {order.clientVoiceNoteDuration || 'Voice/Photo note attached (optional)'}
                </span>
              </div>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                Optional
              </span>
            </div>
          )}

          {/* Schedule & Location */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <HugeiconsIcon icon={Clock01Icon} size={16} strokeWidth={2.2} className="text-amber-600 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block font-semibold">SCHEDULE</span>
                <span className="font-bold text-slate-800 tabular-nums truncate block">{dateStr} · {timeStr}</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
              <HugeiconsIcon icon={Compass01Icon} size={16} strokeWidth={2.2} className="text-blue-600 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 block font-semibold">DISTANCE</span>
                <span className="font-bold text-slate-800 tabular-nums truncate block">{order.distanceKm} km away</span>
              </div>
            </div>
          </div>

          {/* Client Details Card with Call Client */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {clientRole}
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <HugeiconsIcon icon={ShieldCheckIcon} size={13} strokeWidth={2.4} /> VERIFIED
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {avatarInitials}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 leading-tight truncate">
                    {clientName}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono truncate">
                    {clientPhone}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onCallClient(clientPhone, clientName)}
                className="h-11 min-h-[44px] px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer shrink-0"
              >
                <HugeiconsIcon icon={Call02Icon} size={15} strokeWidth={2.2} />
                <span>Call Client</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 flex items-start gap-1.5">
              <HugeiconsIcon icon={Location01Icon} size={15} strokeWidth={2.2} className="text-slate-400 mt-0.5 shrink-0" />
              <span className="leading-snug">{clientAddress}</span>
            </div>
          </div>

          {/* Safety Hazards Notice */}
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs space-y-1">
            <span className="font-bold text-amber-900 flex items-center gap-1.5">
              <HugeiconsIcon icon={AlertCircleIcon} size={15} strokeWidth={2.4} className="text-amber-600" /> Site Safety Hazards
            </span>
            <div className="flex flex-wrap gap-1">
              {hazardsList.map((hazard: string, idx: number) => (
                <span
                  key={idx}
                  className="text-[10px] font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded"
                >
                  • {hazard}
                </span>
              ))}
            </div>
          </div>

          {/* Extra Padding at Bottom for Safe Scroll Clearance */}
          <div className="h-8" />
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 border-t border-gray-100 bg-white/95 backdrop-blur-md shrink-0 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenWatermark}
            className="h-12 min-h-[44px] px-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-800 font-bold text-xs flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
            title="Launch Camera Watermark Proof"
          >
            <HugeiconsIcon icon={Camera01Icon} size={16} strokeWidth={2.2} className="text-gray-700" />
            <span>Watermark</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onCompleteOrder(order.id);
              onClose();
            }}
            className="flex-1 h-12 min-h-[44px] py-3.5 px-4 bg-[#111111] hover:bg-black active:scale-[0.98] text-white rounded-2xl font-bold text-[14px] shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={16} strokeWidth={2.4} className="text-emerald-400" />
            <span>Acknowledge & Release ₹{escrowVal}</span>
          </button>
        </div>
      </div>

      {/* FULL-SCREEN DETAIL VIEW LIGHTBOX (PORTAL AT Z-[1000]) */}
      {isFullScreenPhotoOpen &&
        createPortal(
          <div className="fixed inset-0 z-[1000] bg-black/95 text-white flex flex-col justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200 pointer-events-auto">
            {/* Top Bar: Close Button + Photo Label + Counter */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10 z-10">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-mono font-bold bg-amber-500 text-black px-2.5 py-1 rounded-full shrink-0">
                  #{activePhotoIndex + 1}/{galleryPhotos.length}
                </span>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold truncate leading-tight">
                    {activePhoto.label}
                  </p>
                  <p className="text-[10px] text-zinc-400 truncate">
                    📍 {order.location} · ⏱️ {activePhoto.timestamp}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsFullScreenPhotoOpen(false)}
                aria-label="Close Fullscreen View"
                className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all cursor-pointer shrink-0"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={18} strokeWidth={2.2} />
              </button>
            </div>

            {/* Central Viewport with Image & Prev/Next Arrows */}
            <div className="relative flex-1 flex items-center justify-center py-4 my-auto overflow-hidden">
              {galleryPhotos.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevPhoto}
                  aria-label="Previous Photo"
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white hover:bg-black active:scale-95 flex items-center justify-center z-20 cursor-pointer shadow-xl"
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={20} strokeWidth={2.2} />
                </button>
              )}

              <img
                src={activePhoto.url}
                alt={activePhoto.label}
                className="max-h-[72vh] max-w-full w-auto h-auto object-contain rounded-2xl shadow-2xl transition-all duration-300 border border-white/10"
              />

              {galleryPhotos.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextPhoto}
                  aria-label="Next Photo"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white hover:bg-black active:scale-95 flex items-center justify-center z-20 cursor-pointer shadow-xl"
                >
                  <HugeiconsIcon icon={ArrowRight01Icon} size={20} strokeWidth={2.2} />
                </button>
              )}
            </div>

            {/* Bottom Lightbox Thumbnail Switcher Strip */}
            {galleryPhotos.length > 1 && (
              <div className="pt-2 border-t border-white/10 flex justify-center gap-2 overflow-x-auto no-scrollbar z-10">
                {galleryPhotos.map((photo, index) => {
                  const isSelected = activePhotoIndex === index;
                  return (
                    <button
                      key={photo.id || index}
                      type="button"
                      onClick={() => setActivePhotoIndex(index)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105 shadow-md'
                          : 'border-white/20 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={photo.url}
                        alt={photo.label}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>,
          document.body
        )}
    </div>,
    document.body
  );
};
