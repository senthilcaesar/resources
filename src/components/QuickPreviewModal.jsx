import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  BookOpen,
  Tag,
  Sparkles,
  Layers,
  Code2,
  Star,
  ArrowRight,
  Share2,
} from 'lucide-react';
import {
  CATEGORY_STYLES,
  getRelatedResources,
  RESOURCES,
} from '../data/resources';

const QuickPreviewModal = ({
  resource,
  onClose,
  onSelectResource,
  isBookmarked,
  onToggleBookmark,
  onTagClick,
  playClick,
  playSuccess,
}) => {
  const [activeTab, setActiveTab] = useState('snippet');
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!resource) return null;

  const isPinned = isBookmarked ? isBookmarked(resource.name) : false;
  const related = getRelatedResources(resource, RESOURCES, 3);

  const categoryStyle =
    CATEGORY_STYLES[resource.category] || CATEGORY_STYLES.Default;
  const categoryVars = {
    '--category-color': categoryStyle.color,
    '--category-bg': categoryStyle.bg,
    '--category-border': categoryStyle.border,
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    if (playSuccess) playSuccess();
    setTimeout(() => setCopiedField(null), 2000);
  };

  const codeSnippetText =
    resource.snippet ||
    `// ${resource.name}\n// ${resource.description}\n\n// Visit: ${resource.url}`;

  return (
    <div className='drawer-overlay-wrapper'>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className='drawer-backdrop'
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className='drawer-panel'
        style={categoryVars}
      >
        {/* Header */}
        <div className='drawer-header'>
          <div className='drawer-header-content'>
            <div className='flex items-center gap-2 mb-2'>
              <span className='drawer-category-pill'>{resource.category}</span>
            </div>
            <h2 className='drawer-title'>{resource.name}</h2>
          </div>

          <div className='flex items-center gap-1.5'>
            {onToggleBookmark && (
              <button
                type='button'
                onClick={() => {
                  onToggleBookmark(resource.name);
                  if (playClick) playClick();
                }}
                className={`drawer-icon-btn ${isPinned ? 'is-active' : ''}`}
                title={isPinned ? 'Remove from Backpack' : 'Add to Backpack'}
              >
                <Star
                  size={18}
                  className={isPinned ? 'fill-amber-400 text-amber-400' : ''}
                />
              </button>
            )}

            <button
              onClick={onClose}
              className='drawer-close-button'
              title='Close (Esc)'
              type='button'
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Quick Info Bar */}
        <div className='drawer-url-bar'>
          <a
            href={resource.url}
            target='_blank'
            rel='noopener noreferrer'
            className='drawer-url-link'
          >
            <span>{resource.url}</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Navigation Tabs */}
        <div className='drawer-tabs'>
          <button
            type='button'
            className={`drawer-tab ${activeTab === 'snippet' ? 'is-active' : ''}`}
            onClick={() => {
              setActiveTab('snippet');
              if (playClick) playClick();
            }}
          >
            <Code2 size={15} />
            <span>Code & Snippet</span>
          </button>
          <button
            type='button'
            className={`drawer-tab ${activeTab === 'overview' ? 'is-active' : ''}`}
            onClick={() => {
              setActiveTab('overview');
              if (playClick) playClick();
            }}
          >
            <BookOpen size={15} />
            <span>Details & Related</span>
          </button>
        </div>

        {/* Body Content */}
        <div className='drawer-body'>
          {activeTab === 'snippet' && (
            <div className='drawer-tab-content'>
              {resource.installation && (
                <div className='snippet-section'>
                  <div className='snippet-section-header'>
                    <Terminal size={14} />
                    <span>CLI Command / Package</span>
                    <button
                      type='button'
                      onClick={() =>
                        handleCopy(resource.installation, 'install')
                      }
                      className='snippet-copy-btn'
                    >
                      {copiedField === 'install' ? (
                        <>
                          <Check size={13} className='text-emerald-400' />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className='snippet-code-block'>
                    <code>{resource.installation}</code>
                  </pre>
                </div>
              )}

              <div className='snippet-section'>
                <div className='snippet-section-header'>
                  <Sparkles size={14} />
                  <span>Code Synopsis & Example</span>
                  <button
                    type='button'
                    onClick={() => handleCopy(codeSnippetText, 'snippet')}
                    className='snippet-copy-btn'
                  >
                    {copiedField === 'snippet' ? (
                      <>
                        <Check size={13} className='text-emerald-400' />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy Snippet</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className='snippet-code-block'>
                  <code>{codeSnippetText}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className='drawer-tab-content'>
              <div className='overview-section'>
                <h4 className='overview-subtitle'>About this Resource</h4>
                <p className='overview-description'>{resource.description}</p>
              </div>

              <div className='overview-section'>
                <h4 className='overview-subtitle flex items-center gap-1.5'>
                  <Tag size={14} />
                  <span>Tags & Topics</span>
                </h4>
                <div className='drawer-tags-container'>
                  {resource.tags.map((tag) => (
                    <button
                      key={tag}
                      type='button'
                      onClick={() => {
                        onTagClick?.(tag);
                        onClose();
                      }}
                      className='drawer-tag-chip clickable'
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Related Resources Network */}
              {related.length > 0 && (
                <div className='overview-section'>
                  <h4 className='overview-subtitle flex items-center gap-1.5'>
                    <Sparkles size={14} className='text-accent' />
                    <span>Related Discoveries in Vault</span>
                  </h4>
                  <div className='drawer-related-list'>
                    {related.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => {
                          onSelectResource?.(item);
                          if (playClick) playClick();
                        }}
                        className='drawer-related-card'
                      >
                        <div className='flex items-center justify-between gap-1 mb-1'>
                          <span className='drawer-related-title'>
                            {item.name}
                          </span>
                          <ArrowRight size={13} className='text-dim' />
                        </div>
                        <p className='drawer-related-desc'>
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className='drawer-footer'>
          <button
            type='button'
            onClick={() => handleCopy(resource.url, 'url')}
            className='drawer-footer-btn secondary'
          >
            {copiedField === 'url' ? (
              <>
                <Check size={16} className='text-emerald-400' />
                <span>Link Copied</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy Link</span>
              </>
            )}
          </button>

          <a
            href={resource.url}
            target='_blank'
            rel='noopener noreferrer'
            className='drawer-footer-btn primary'
          >
            <span>Launch External</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default QuickPreviewModal;
