import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent } from '@chakra-ui/react';
import {
  X,
  Atom,
  Zap,
  Box,
  Shapes,
  Palette,
  Database,
  Search,
  HardDrive,
  Rocket,
  Check,
  Copy,
} from 'lucide-react';
import { RESOURCES } from '../data/resources';

const LINK_COUNT = RESOURCES.length;
const CATEGORY_COUNT = new Set(RESOURCES.map((r) => r.category)).size;

// Each tile's `size` maps to a grid span in index.css (.tech-tile--hero etc.).
const TILES = [
  {
    size: 'hero',
    icon: Atom,
    label: 'Core',
    title: 'React 18 + Vite 8',
    meta: 'react 18.3 · vite 8.3',
    text: 'Component UI rendered by React, bundled and served with hot reload by Vite.',
  },
  {
    size: 'wide',
    icon: Zap,
    label: 'Motion',
    title: 'Framer Motion 11',
    text: 'Card hover, layout and drawer transitions.',
  },
  {
    size: 'small',
    icon: Box,
    label: 'Dialogs',
    title: 'Chakra UI 2',
    text: 'Accessible modals, styled with Emotion.',
  },
  {
    size: 'small',
    icon: Shapes,
    label: 'Icons',
    title: 'Lucide',
    text: 'Stroke SVG icons.',
  },
  {
    size: 'wide',
    icon: Palette,
    label: 'Theming',
    title: 'CSS design tokens',
    text: 'Custom properties drive a charcoal-and-cyan dark theme and a Nordic light theme.',
    swatches: [
      'var(--bg-main)',
      'var(--bg-card)',
      'var(--text-primary)',
      'var(--accent-primary)',
      'var(--accent-secondary)',
    ],
  },
  {
    size: 'wide',
    icon: Database,
    label: 'Data',
    stats: [
      { value: LINK_COUNT, unit: 'links' },
      { value: CATEGORY_COUNT, unit: 'categories' },
    ],
    text: 'One static file, src/data/resources.js. No backend.',
  },
  {
    size: 'wide',
    icon: Search,
    label: 'Search & filters',
    title: 'In-memory filtering',
    text: 'Text, category, priority and tag filters run in the browser on every keystroke.',
  },
  {
    size: 'small',
    icon: HardDrive,
    label: 'Storage',
    title: 'localStorage',
    text: 'Bookmarks, theme, view.',
  },
  {
    size: 'small',
    icon: Rocket,
    label: 'Deploy',
    title: 'GitHub Pages',
    text: 'Built by Actions on push to main.',
  },
];

const SPEC_SUMMARY = [
  'Study Links: architecture',
  '- UI: React 18 + Vite 8',
  '- Motion: Framer Motion 11',
  '- Dialogs: Chakra UI 2 + Emotion',
  '- Icons: Lucide React',
  '- Theming: CSS custom properties (dark + light)',
  `- Data: static resources.js (${LINK_COUNT} links, ${CATEGORY_COUNT} categories)`,
  '- Search: in-memory text, category, priority and tag filters',
  '- Storage: localStorage (bookmarks, theme, view)',
  '- Deploy: GitHub Pages via GitHub Actions',
].join('\n');

const TechStackModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const copySpec = async () => {
    try {
      await navigator.clipboard.writeText(SPEC_SUMMARY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); nothing to do.
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg='var(--modal-overlay)' backdropFilter='blur(8px)' />
      <ModalContent
        className='tech-modal'
        bg='var(--bg-sidebar)'
        border='1px solid var(--border-subtle)'
        borderRadius='20px'
        boxShadow='var(--shadow-card)'
        w='calc(100vw - 32px)'
        maxW='56rem'
        mx='auto'
      >
        <div className='tech-modal-header'>
          <div>
            <h2 className='tech-modal-title'>Project Blueprint & Architecture</h2>
            <p className='tech-modal-subtitle'>What this site is built with</p>
          </div>
          <button
            type='button'
            className='tech-modal-close'
            onClick={onClose}
            aria-label='Close'
          >
            <X size={16} />
          </button>
        </div>

        <div className='tech-bento'>
          {TILES.map((tile) => {
            const Icon = tile.icon;
            return (
              <div
                key={tile.label}
                className={`tech-tile tech-tile--${tile.size}`}
              >
                <div className='tech-tile-label'>
                  <Icon size={14} />
                  <span>{tile.label}</span>
                </div>

                {tile.title && <h3 className='tech-tile-title'>{tile.title}</h3>}

                {tile.stats && (
                  <div className='tech-tile-stats'>
                    {tile.stats.map((s) => (
                      <div key={s.unit}>
                        <span className='tech-stat-value'>{s.value}</span>
                        <span className='tech-stat-unit'>{s.unit}</span>
                      </div>
                    ))}
                  </div>
                )}

                <p className='tech-tile-text'>{tile.text}</p>

                {tile.swatches && (
                  <div className='tech-swatches' aria-hidden='true'>
                    {tile.swatches.map((c) => (
                      <span key={c} style={{ background: c }} />
                    ))}
                  </div>
                )}

                {tile.meta && <code className='tech-tile-meta'>{tile.meta}</code>}
              </div>
            );
          })}
        </div>

        <div className='tech-modal-footer'>
          <button type='button' className='tech-copy-btn' onClick={copySpec}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied' : 'Copy tech spec'}</span>
          </button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default TechStackModal;
