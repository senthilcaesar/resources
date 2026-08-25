import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dice5,
  Sparkles,
  X,
  RotateCw,
  ExternalLink,
  BookOpen,
  Star,
  Copy,
  Check,
  Zap,
} from 'lucide-react';
import { CATEGORY_STYLES } from '../data/resources';

export default function ResourceRouletteModal({
  isOpen,
  onClose,
  resources,
  onSelectResource,
  isBookmarked,
  onToggleBookmark,
  playRouletteSpin,
  playSuccess,
  playClick,
}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentPick, setCurrentPick] = useState(null);
  const [rollingName, setRollingName] = useState('');
  const [copied, setCopied] = useState(false);

  const spinRoulette = () => {
    if (resources.length === 0 || isSpinning) return;
    setIsSpinning(true);
    setCurrentPick(null);
    if (playRouletteSpin) playRouletteSpin();

    let counter = 0;
    const totalTicks = 18;
    const interval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * resources.length);
      setRollingName(resources[randomIdx].name);
      counter++;

      if (counter >= totalTicks) {
        clearInterval(interval);
        // Choose final winner
        const finalIdx = Math.floor(Math.random() * resources.length);
        setCurrentPick(resources[finalIdx]);
        setIsSpinning(false);
        if (playSuccess) playSuccess();
      }
    }, 65);
  };

  useEffect(() => {
    if (isOpen) {
      spinRoulette();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categoryStyle = currentPick
    ? CATEGORY_STYLES[currentPick.category] || CATEGORY_STYLES.Default
    : CATEGORY_STYLES.Default;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    if (playClick) playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='roulette-overlay-backdrop' onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className='roulette-modal-card'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='roulette-header'>
          <div className='flex items-center gap-2'>
            <div className='roulette-dice-icon'>
              <Dice5
                size={20}
                className={
                  isSpinning ? 'animate-spin text-accent' : 'text-accent'
                }
              />
            </div>
            <div>
              <h3 className='roulette-title'>Resource Roulette</h3>
              <p className='roulette-sub'>
                Serendipitous developer tool discovery
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='roulette-close-btn'
            title='Close (ESC)'
          >
            <X size={18} />
          </button>
        </div>

        {/* Roulette Stage */}
        <div className='roulette-stage'>
          {isSpinning && (
            <div className='roulette-spinning-state'>
              <div className='roulette-spinner-ring' />
              <div className='roulette-rolling-text animate-pulse'>
                {rollingName}
              </div>
              <div className='text-xs text-dim mt-2'>
                Searching the cosmos for a hidden gem...
              </div>
            </div>
          )}

          {!isSpinning && currentPick && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className='roulette-result-card'
            >
              <div className='roulette-celebrate-badge'>
                <Sparkles size={14} />
                <span>Today's Discovered Gem</span>
              </div>

              <div className='flex items-center gap-2 mb-2 mt-3'>
                <span className='bento-category-pill'>
                  {currentPick.category}
                </span>
              </div>

              <h2 className='roulette-result-name'>{currentPick.name}</h2>
              <p className='roulette-result-desc'>{currentPick.description}</p>

              {/* Tags */}
              <div className='flex flex-wrap gap-1.5 my-4'>
                {currentPick.tags?.map((tag) => (
                  <span key={tag} className='bento-tag-pill'>
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className='roulette-actions-row'>
                <button
                  type='button'
                  onClick={() => {
                    onClose();
                    onSelectResource(currentPick);
                    if (playClick) playClick();
                  }}
                  className='roulette-btn secondary'
                >
                  <BookOpen size={16} />
                  <span>Inspect Code & Details</span>
                </button>

                <a
                  href={currentPick.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='roulette-btn primary'
                >
                  <span>Visit Resource</span>
                  <ExternalLink size={16} />
                </a>

                <button
                  type='button'
                  onClick={() => {
                    onToggleBookmark(currentPick.name);
                    if (playClick) playClick();
                  }}
                  className={`roulette-btn icon-only ${isBookmarked(currentPick.name) ? 'is-active' : ''}`}
                  title='Bookmark'
                >
                  <Star
                    size={16}
                    className={
                      isBookmarked(currentPick.name)
                        ? 'fill-amber-400 text-amber-400'
                        : ''
                    }
                  />
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer Spin Again */}
        <div className='roulette-footer'>
          <button
            type='button'
            disabled={isSpinning}
            onClick={spinRoulette}
            className='roulette-spin-again-btn'
          >
            <RotateCw size={16} className={isSpinning ? 'animate-spin' : ''} />
            <span>Roll the Dice Again</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
