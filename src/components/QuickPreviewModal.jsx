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
} from 'lucide-react';
import { CATEGORY_STYLES } from '../data/resources';

const QuickPreviewModal = ({ resource, onClose }) => {
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
    setTimeout(() => setCopiedField(null), 2000);
  };

  const codeSnippetText =
    resource.snippet ||
    `// ${resource.name}\n// ${resource.description}\n\n// Visit: ${resource.url}`;

  return (
    <div className="drawer-overlay-wrapper">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="drawer-backdrop"
        onClick={onClose}
      />

      {/* Slide-over Drawer Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="drawer-panel"
        style={categoryVars}
      >
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-header-content">
            <div className="flex items-center gap-2 mb-2">
              <span className="drawer-category-pill">
                {resource.category}
              </span>
              <span
                className={`drawer-importance-pill badge-${(
                  resource.importance || 'medium'
                ).toLowerCase()}`}
              >
                {resource.importance || 'Medium'} Priority
              </span>
            </div>
            <h2 className="drawer-title">{resource.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="drawer-close-button"
            title="Close (Esc)"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Info Bar */}
        <div className="drawer-url-bar">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="drawer-url-link"
          >
            <span>{resource.url}</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Navigation Tabs */}
        <div className="drawer-tabs">
          <button
            type="button"
            className={`drawer-tab ${activeTab === 'snippet' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('snippet')}
          >
            <Code2 size={15} />
            <span>Quick Code</span>
          </button>
          <button
            type="button"
            className={`drawer-tab ${activeTab === 'overview' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <BookOpen size={15} />
            <span>Overview</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="drawer-body">
          {activeTab === 'snippet' && (
            <div className="drawer-tab-content">
              {resource.installation && (
                <div className="snippet-section">
                  <div className="snippet-section-header">
                    <Terminal size={14} />
                    <span>Installation</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(resource.installation, 'install')
                      }
                      className="snippet-copy-btn"
                    >
                      {copiedField === 'install' ? (
                        <>
                          <Check size={13} />
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
                  <pre className="snippet-code-block">
                    <code>{resource.installation}</code>
                  </pre>
                </div>
              )}

              <div className="snippet-section">
                <div className="snippet-section-header">
                  <Sparkles size={14} />
                  <span>Quick Code & Usage</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(codeSnippetText, 'snippet')}
                    className="snippet-copy-btn"
                  >
                    {copiedField === 'snippet' ? (
                      <>
                        <Check size={13} />
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
                <pre className="snippet-code-block">
                  <code>{codeSnippetText}</code>
                </pre>
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="drawer-tab-content">
              <div className="overview-section">
                <h4 className="overview-subtitle">Description</h4>
                <p className="overview-description">{resource.description}</p>
              </div>

              <div className="overview-section">
                <h4 className="overview-subtitle flex items-center gap-1.5">
                  <Tag size={14} />
                  <span>Tags</span>
                </h4>
                <div className="drawer-tags-container">
                  {resource.tags.map((tag) => (
                    <span key={tag} className="drawer-tag-chip">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="overview-section">
                <h4 className="overview-subtitle flex items-center gap-1.5">
                  <Layers size={14} />
                  <span>Resource Details</span>
                </h4>
                <div className="drawer-meta-grid">
                  <div className="drawer-meta-item">
                    <span className="drawer-meta-label">Category</span>
                    <span className="drawer-meta-value">
                      {resource.category}
                    </span>
                  </div>
                  <div className="drawer-meta-item">
                    <span className="drawer-meta-label">Importance</span>
                    <span className="drawer-meta-value">
                      {resource.importance || 'Medium'}
                    </span>
                  </div>
                  <div className="drawer-meta-item">
                    <span className="drawer-meta-label">Target URL</span>
                    <span className="drawer-meta-value text-ellipsis overflow-hidden">
                      {resource.url}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="drawer-footer">
          <button
            type="button"
            onClick={() => handleCopy(resource.url, 'url')}
            className="drawer-footer-btn secondary"
          >
            {copiedField === 'url' ? (
              <>
                <Check size={16} />
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
            target="_blank"
            rel="noopener noreferrer"
            className="drawer-footer-btn primary"
          >
            <span>Visit Resource</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default QuickPreviewModal;
