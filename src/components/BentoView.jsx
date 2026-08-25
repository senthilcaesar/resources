import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  Copy,
  Check,
  ExternalLink,
  Star,
  Code2,
  Terminal,
  Layers,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { CATEGORY_STYLES } from '../data/resources';

const formatUrlParts = (rawUrl) => {
  try {
    const parsed = new URL(rawUrl);
    const hostname = parsed.hostname.replace(/^www\./, '');
    const path = `${parsed.pathname}${parsed.search}${parsed.hash}`;
    return {
      hostname,
      path: path === '/' ? '' : path,
    };
  } catch {
    return {
      hostname: rawUrl,
      path: '',
    };
  }
};

function BentoCard({
  resource,
  onCopy,
  copiedId,
  onSelectResource,
  isBookmarked,
  onToggleBookmark,
  onTagClick,
  playClick,
}) {
  const isCopied = copiedId === resource.name;
  const isPinned = isBookmarked(resource.name);
  const formattedUrl = formatUrlParts(resource.url);
  const categoryStyle =
    CATEGORY_STYLES[resource.category] || CATEGORY_STYLES.Default;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const categoryVars = {
    '--category-color': categoryStyle.color,
    '--category-bg': categoryStyle.bg,
    '--category-border': categoryStyle.border,
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='bento-card'
      style={categoryVars}
    >
      {/* Interactive Cursor Spotlight Glow */}
      {isHovered && (
        <div
          className='bento-spotlight'
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
          }}
        />
      )}

      {/* Top Card Bar */}
      <div className='bento-card-top'>
        <div className='flex items-center gap-2'>
          <span className='bento-category-pill'>{resource.category}</span>
        </div>

        <div className='bento-card-quick-actions'>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(resource.name);
              if (playClick) playClick();
            }}
            className={`bento-icon-btn ${isPinned ? 'is-bookmarked' : ''}`}
            title={isPinned ? 'Remove Bookmark' : 'Bookmark this Resource'}
          >
            <Star
              size={16}
              className={isPinned ? 'fill-amber-400 text-amber-400' : ''}
            />
          </button>

          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              onSelectResource(resource);
              if (playClick) playClick();
            }}
            className='bento-icon-btn'
            title='Inspect Details & Code'
          >
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Resource Title & Summary */}
      <div
        className='bento-card-body'
        onClick={() => onSelectResource(resource)}
      >
        <h3 className='bento-card-title'>
          <span>{resource.name}</span>
          <ArrowUpRight size={16} className='bento-title-arrow' />
        </h3>
        <p className='bento-card-desc'>{resource.description}</p>
      </div>

      {/* Tags & Code Snippet Indicator */}
      <div className='bento-card-tags'>
        {resource.snippet && (
          <span
            className='bento-feature-badge'
            title='Has copyable code snippet'
          >
            <Code2 size={12} />
            <span>Code</span>
          </span>
        )}
        {resource.installation && (
          <span
            className='bento-feature-badge terminal'
            title='Has CLI installation'
          >
            <Terminal size={12} />
            <span>CLI</span>
          </span>
        )}
        {resource.tags?.slice(0, 3).map((tag) => (
          <button
            key={tag}
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              onTagClick?.(tag);
            }}
            className='bento-tag-pill'
          >
            #{tag}
          </button>
        ))}
      </div>

      {/* Footer / URL Bar & Copy */}
      <div className='bento-card-footer'>
        <a
          href={resource.url}
          target='_blank'
          rel='noopener noreferrer'
          className='bento-url-link'
          title={resource.url}
          onClick={(e) => e.stopPropagation()}
        >
          <span className='bento-url-host'>{formattedUrl.hostname}</span>
          {formattedUrl.path && (
            <span className='bento-url-path'>{formattedUrl.path}</span>
          )}
        </a>

        <div className='bento-footer-action-group'>
          <button
            type='button'
            onClick={(e) => {
              e.stopPropagation();
              onCopy(resource.snippet || resource.url, resource.name);
            }}
            className={`bento-footer-action-btn ${isCopied ? 'is-copied' : ''}`}
            title='Copy URL or Code'
          >
            {isCopied ? (
              <Check size={14} className='text-emerald-400' />
            ) : (
              <Copy size={14} />
            )}
          </button>

          <a
            href={resource.url}
            target='_blank'
            rel='noopener noreferrer'
            className='bento-footer-action-btn primary'
            title='Open Link in New Tab'
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function BentoView({
  resources,
  onSelectResource,
  isBookmarked,
  onToggleBookmark,
  onTagClick,
  playClick,
  playSuccess,
}) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (playSuccess) playSuccess();
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className='bento-grid-layout'>
      <AnimatePresence mode='popLayout'>
        {resources.map((resource) => (
          <BentoCard
            key={resource.name}
            resource={resource}
            onCopy={handleCopy}
            copiedId={copiedId}
            onSelectResource={onSelectResource}
            isBookmarked={isBookmarked}
            onToggleBookmark={onToggleBookmark}
            onTagClick={onTagClick}
            playClick={playClick}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
