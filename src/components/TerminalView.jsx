import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Terminal,
  Copy,
  Check,
  ExternalLink,
  Star,
  Bookmark,
  Code,
  Cpu,
  Activity,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { CATEGORY_STYLES } from '../data/resources';

export default function TerminalView({
  resources,
  onSelectResource,
  isBookmarked,
  onToggleBookmark,
  playClick,
  playSuccess,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedText, setCopiedText] = useState(null);
  const listContainerRef = useRef(null);

  // Keep selected index within bounds when resources change
  useEffect(() => {
    if (selectedIndex >= resources.length) {
      setSelectedIndex(Math.max(0, resources.length - 1));
    }
  }, [resources.length, selectedIndex]);

  // Keyboard navigation for HUD
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't capture keys if an input is active
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < resources.length - 1 ? prev + 1 : 0,
        );
        if (playClick) playClick();
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : resources.length - 1,
        );
        if (playClick) playClick();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const current = resources[selectedIndex];
        if (current) {
          window.open(current.url, '_blank', 'noopener,noreferrer');
        }
      } else if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        const current = resources[selectedIndex];
        if (current) {
          onSelectResource(current);
        }
      } else if (e.key === 'c') {
        e.preventDefault();
        const current = resources[selectedIndex];
        if (current) {
          const textToCopy = current.snippet || current.url;
          navigator.clipboard.writeText(textToCopy);
          setCopiedText(current.name);
          if (playSuccess) playSuccess();
          setTimeout(() => setCopiedText(null), 2000);
        }
      } else if (e.key === 'b') {
        e.preventDefault();
        const current = resources[selectedIndex];
        if (current) {
          onToggleBookmark(current.name);
          if (playClick) playClick();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    resources,
    selectedIndex,
    onSelectResource,
    onToggleBookmark,
    playClick,
    playSuccess,
  ]);

  const activeResource = resources[selectedIndex] || resources[0];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    if (playSuccess) playSuccess();
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className='terminal-hud-container'>
      {/* Top HUD Telemetry Status */}
      <div className='terminal-telemetry-bar'>
        <div className='terminal-telemetry-item'>
          <Activity size={14} className='text-emerald-400 animate-pulse' />
          <span>STATUS: ONLINE</span>
        </div>
        <div className='terminal-telemetry-item'>
          <Cpu size={14} className='text-accent' />
          <span>
            INDEX: {resources.length > 0 ? selectedIndex + 1 : 0} /{' '}
            {resources.length}
          </span>
        </div>
        <div className='terminal-telemetry-item hidden-mobile'>
          <Terminal size={14} className='text-cyan-400' />
          <span>
            SHORTCUTS: [j/k] NAV · [Enter] OPEN · [Space] PEEK · [c] COPY · [b]
            PIN
          </span>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className='terminal-hud-main'>
        {/* Left Column: Command List */}
        <div className='terminal-list-pane' ref={listContainerRef}>
          {resources.length === 0 ? (
            <div className='p-8 text-center text-dim'>
              No matching records in buffer.
            </div>
          ) : (
            resources.map((res, index) => {
              const isSelected = index === selectedIndex;
              const isPinned = isBookmarked(res.name);

              return (
                <div
                  key={res.name}
                  onClick={() => {
                    setSelectedIndex(index);
                    if (playClick) playClick();
                  }}
                  className={`terminal-list-row ${isSelected ? 'is-selected' : ''}`}
                >
                  <div className='terminal-row-cursor'>
                    {isSelected ? (
                      <ChevronRight
                        size={16}
                        className='text-accent animate-pulse'
                      />
                    ) : (
                      <span className='w-4' />
                    )}
                  </div>
                  <div className='terminal-row-index'>
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className='terminal-row-info'>
                    <div className='terminal-row-title'>
                      <span>{res.name}</span>
                      {isPinned && (
                        <Star
                          size={12}
                          className='text-amber-400 fill-amber-400'
                        />
                      )}
                    </div>
                    <div className='terminal-row-meta'>
                      <span className='terminal-badge-cat'>{res.category}</span>
                      <span className='terminal-badge-tag'>
                        #{res.tags?.[0] || 'dev'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Live Telemetry Inspection Panel */}
        {activeResource ? (
          <div className='terminal-inspect-pane'>
            <div className='terminal-inspect-header'>
              <div>
                <div className='flex items-center gap-2 mb-1'>
                  <span className='terminal-badge-cat'>
                    {activeResource.category}
                  </span>
                </div>
                <h3 className='terminal-inspect-title'>
                  {activeResource.name}
                </h3>
              </div>

              <div className='terminal-inspect-actions'>
                <button
                  type='button'
                  onClick={() => onToggleBookmark(activeResource.name)}
                  className={`terminal-hud-btn ${isBookmarked(activeResource.name) ? 'is-active' : ''}`}
                  title={
                    isBookmarked(activeResource.name)
                      ? 'Remove Favorite'
                      : 'Add to Favorites'
                  }
                >
                  <Star
                    size={16}
                    className={
                      isBookmarked(activeResource.name)
                        ? 'fill-amber-400 text-amber-400'
                        : ''
                    }
                  />
                </button>
                <button
                  type='button'
                  onClick={() =>
                    handleCopy(
                      activeResource.snippet || activeResource.url,
                      activeResource.name,
                    )
                  }
                  className='terminal-hud-btn'
                  title='Copy Snippet / URL'
                >
                  {copiedText === activeResource.name ? (
                    <Check size={16} className='text-emerald-400' />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
                <a
                  href={activeResource.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='terminal-hud-btn primary'
                  title='Open URL in New Tab'
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <div className='terminal-inspect-body'>
              <div className='terminal-field-block'>
                <div className='terminal-field-label'>DESCRIPTION</div>
                <p className='terminal-field-value'>
                  {activeResource.description}
                </p>
              </div>

              <div className='terminal-field-block'>
                <div className='terminal-field-label'>TARGET URL</div>
                <code className='terminal-code-line'>{activeResource.url}</code>
              </div>

              {activeResource.installation && (
                <div className='terminal-field-block'>
                  <div className='terminal-field-label'>
                    CLI INSTALL COMMAND
                  </div>
                  <div className='terminal-command-box'>
                    <code>$ {activeResource.installation}</code>
                    <button
                      onClick={() =>
                        handleCopy(activeResource.installation, 'cmd')
                      }
                      className='terminal-inline-copy'
                    >
                      {copiedText === 'cmd' ? (
                        <Check size={14} />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {activeResource.snippet && (
                <div className='terminal-field-block'>
                  <div className='terminal-field-label'>
                    CODE SNIPPET & SYNOPSIS
                  </div>
                  <pre className='terminal-snippet-pre'>
                    <code>{activeResource.snippet}</code>
                  </pre>
                </div>
              )}

              <div className='terminal-field-block'>
                <div className='terminal-field-label'>ASSOCIATED TAGS</div>
                <div className='flex flex-wrap gap-1.5 mt-1'>
                  {activeResource.tags?.map((t) => (
                    <span key={t} className='terminal-tag-pill'>
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className='terminal-inspect-footer'>
              <button
                type='button'
                onClick={() => onSelectResource(activeResource)}
                className='terminal-full-inspect-btn'
              >
                Launch Deep Inspector Drawer [Space] →
              </button>
            </div>
          </div>
        ) : (
          <div className='terminal-inspect-pane flex items-center justify-center text-dim'>
            Select a resource from the left buffer
          </div>
        )}
      </div>
    </div>
  );
}
