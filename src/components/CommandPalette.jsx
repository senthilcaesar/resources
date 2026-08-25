import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Sparkles,
  Dice5,
  Star,
  Moon,
  Sun,
  Compass,
  Terminal,
  LayoutGrid,
  Table,
  ExternalLink,
  ChevronRight,
  X,
} from 'lucide-react';

export default function CommandPalette({
  isOpen,
  onClose,
  resources,
  activeView,
  setActiveView,
  onSelectResource,
  onOpenRoulette,
  theme,
  toggleTheme,
  isBookmarked,
  onToggleBookmark,
  playClick,
  playSuccess,
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Command items + Resource search results
  const systemActions = [
    {
      id: 'roulette',
      type: 'action',
      title: 'Roll Resource Roulette',
      subtitle: 'Spin for a serendipitous random tool discovery',
      icon: Dice5,
      action: () => {
        onClose();
        onOpenRoulette();
      },
    },
    {
      id: 'view-bento',
      type: 'action',
      title: 'Switch to Bento Grid View',
      subtitle: 'Modern 3D interactive bento cards',
      icon: LayoutGrid,
      action: () => {
        setActiveView('bento');
        onClose();
      },
    },
    {
      id: 'view-terminal',
      type: 'action',
      title: 'Switch to Terminal HUD Mode',
      subtitle: 'Keyboard-first hacker telemetry view',
      icon: Terminal,
      action: () => {
        setActiveView('terminal');
        onClose();
      },
    },
    {
      id: 'view-table',
      type: 'action',
      title: 'Switch to Dense Table Grid',
      subtitle: 'Sortable high-density data matrix',
      icon: Table,
      action: () => {
        setActiveView('table');
        onClose();
      },
    },
    {
      id: 'theme-toggle',
      type: 'action',
      title: `Toggle Theme (Current: ${theme})`,
      subtitle: 'Cycle through visual color themes',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme();
        onClose();
      },
    },
  ];

  const matchedActions = systemActions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(query.toLowerCase()),
  );

  const matchedResources = resources
    .filter(
      (r) =>
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.description.toLowerCase().includes(query.toLowerCase()) ||
        r.category.toLowerCase().includes(query.toLowerCase()) ||
        r.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())),
    )
    .slice(0, 8);

  const allItems = [...matchedActions, ...matchedResources];

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation inside command palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < allItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : allItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = allItems[selectedIndex];
        if (selected) {
          if (selected.type === 'action') {
            selected.action();
          } else {
            onClose();
            onSelectResource(selected);
          }
          if (playClick) playClick();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, allItems, selectedIndex, onClose, onSelectResource, playClick]);

  if (!isOpen) return null;

  return (
    <div className='cmd-overlay-backdrop' onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.15 }}
        className='cmd-modal-box'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input bar */}
        <div className='cmd-input-row'>
          <Search size={18} className='text-dim' />
          <input
            ref={inputRef}
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Type a command, search resource, or switch view...'
            className='cmd-input-field'
          />
          {query && (
            <button onClick={() => setQuery('')} className='cmd-clear-btn'>
              <X size={14} />
            </button>
          )}
          <kbd className='cmd-kbd-esc'>ESC</kbd>
        </div>

        {/* Results List */}
        <div className='cmd-results-list'>
          {matchedActions.length > 0 && (
            <div className='cmd-section-group'>
              <div className='cmd-section-label'>Quick Commands</div>
              {matchedActions.map((action, idx) => {
                const isSelected = selectedIndex === idx;
                const IconComponent = action.icon;
                return (
                  <div
                    key={action.id}
                    onClick={() => {
                      action.action();
                      if (playClick) playClick();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`cmd-item-row ${isSelected ? 'is-active' : ''}`}
                  >
                    <div className='cmd-item-icon'>
                      <IconComponent size={16} />
                    </div>
                    <div className='cmd-item-content'>
                      <div className='cmd-item-title'>{action.title}</div>
                      <div className='cmd-item-sub'>{action.subtitle}</div>
                    </div>
                    {isSelected && (
                      <ChevronRight size={14} className='text-accent' />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {matchedResources.length > 0 && (
            <div className='cmd-section-group'>
              <div className='cmd-section-label'>
                Resources ({matchedResources.length})
              </div>
              {matchedResources.map((res, idx) => {
                const itemIndex = matchedActions.length + idx;
                const isSelected = selectedIndex === itemIndex;
                const isPinned = isBookmarked(res.name);

                return (
                  <div
                    key={res.name}
                    onClick={() => {
                      onClose();
                      onSelectResource(res);
                      if (playClick) playClick();
                    }}
                    onMouseEnter={() => setSelectedIndex(itemIndex)}
                    className={`cmd-item-row ${isSelected ? 'is-active' : ''}`}
                  >
                    <div className='cmd-item-icon'>
                      <ExternalLink size={16} />
                    </div>
                    <div className='cmd-item-content'>
                      <div className='flex items-center gap-2'>
                        <span className='cmd-item-title'>{res.name}</span>
                        <span className='cmd-item-cat'>{res.category}</span>
                        {isPinned && (
                          <Star
                            size={12}
                            className='fill-amber-400 text-amber-400'
                          />
                        )}
                      </div>
                      <div className='cmd-item-sub'>{res.description}</div>
                    </div>
                    {isSelected && (
                      <span className='cmd-item-hint'>Open [↵]</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {allItems.length === 0 && (
            <div className='cmd-empty-state'>
              No matching commands or resources found for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className='cmd-footer-bar'>
          <span>
            Navigate with <kbd>↑</kbd> <kbd>↓</kbd>
          </span>
          <span>
            Select with <kbd>↵</kbd>
          </span>
          <span>
            Close with <kbd>ESC</kbd>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
