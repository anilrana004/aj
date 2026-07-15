'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { PartOption } from './BespokeBuilder';

interface PartStoryPanelProps {
  part: PartOption | null;
  onClose: () => void;
  mobile?: boolean;
}

export default function PartStoryPanel({ part, onClose, mobile = false }: PartStoryPanelProps) {
  return (
    <AnimatePresence>
      {part && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-aubergine/40"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={mobile ? { y: '100%' } : { x: '100%' }}
            animate={mobile ? { y: 0 } : { x: 0 }}
            exit={mobile ? { y: '100%' } : { x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={
              mobile
                ? 'fixed bottom-0 left-0 right-0 z-50 bg-cream max-h-[70vh] overflow-y-auto'
                : 'fixed top-0 right-0 bottom-0 z-50 w-[420px] bg-cream overflow-y-auto'
            }
          >
            {/* Drag handle (mobile) */}
            {mobile && (
              <div className="flex justify-center py-3">
                <div className="w-10 h-1 bg-stone/30 rounded-full" />
              </div>
            )}

            <div className="p-6 lg:p-8">
              <div className="flex items-start justify-between mb-6">
                <h2 className="font-serif text-subhead text-aubergine pr-4">
                  {part.name}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 -mt-2 text-bronze hover:text-aubergine transition-colors shrink-0"
                  aria-label="Close story"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Image */}
              <div className="aspect-[4/3] bg-stone/20 mb-6 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-sand/50 to-stone/60" />
              </div>

              {/* Meta */}
              <div className="flex flex-wrap gap-4 mb-6">
                {part.origin && (
                  <div>
                    <p className="text-label uppercase tracking-widest text-bronze/50 mb-1">Origin</p>
                    <p className="text-body text-aubergine">{part.origin}</p>
                  </div>
                )}
                {part.material && (
                  <div>
                    <p className="text-label uppercase tracking-widest text-bronze/50 mb-1">Material</p>
                    <p className="text-body text-aubergine">{part.material}</p>
                  </div>
                )}
                <div>
                  <p className="text-label uppercase tracking-widest text-bronze/50 mb-1">Lead Time</p>
                  <p className="text-body text-aubergine">{part.leadTimeDays} days</p>
                </div>
              </div>

              {/* Story */}
              <div className="border-t border-stone/20 pt-6">
                <h3 className="text-label uppercase tracking-widest text-bronze/60 mb-3">
                  The Story
                </h3>
                <p className="text-body text-bronze leading-relaxed whitespace-pre-line">
                  {part.story}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
