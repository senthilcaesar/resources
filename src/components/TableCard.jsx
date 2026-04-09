import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

const ResourceCard = ({ resource, viewMode, onCopy, copiedId }) => {
  const isCopied = copiedId === resource.name;
  const formattedUrl = formatUrlParts(resource.url);
  const categoryStyle =
    CATEGORY_STYLES[resource.category] || CATEGORY_STYLES.Default;
  const categoryVars = {
    '--category-color': categoryStyle.color,
    '--category-bg': categoryStyle.bg,
    '--category-border': categoryStyle.border,
    '--resource-color': resource.color,
  };

  const hoverTransition = {
    type: 'spring',
    stiffness: 400,
    damping: 25,
  };

  const whileHoverState = {
    y: -4,
  };

  if (viewMode === 'list') {
    return (
      <motion.article
        layout
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 10 }}
        whileHover={whileHoverState}
        transition={hoverTransition}
        className='resource-list-card'
        style={categoryVars}
      >
        <div
          className='resource-list-category flex items-center gap-2'
        >
          <span>{resource.category}</span>
        </div>

        <div className='resource-list-main'>
          <div className='resource-list-heading'>
            <a
              href={resource.url}
              target='_blank'
              rel='noopener noreferrer'
              className='resource-title-link'
            >
              {resource.name}
            </a>
            {resource.tags.slice(0, 1).map((tag) => (
              <span key={tag} className='resource-inline-tag'>
                {tag}
              </span>
            ))}
          </div>

          <p className='resource-description resource-description-list'>
            {resource.description}
          </p>
        </div>

        <a
          href={resource.url}
          target='_blank'
          rel='noopener noreferrer'
          className='resource-url-chip resource-url-chip-list'
          title={resource.url}
        >
          <span className='resource-url-host'>{formattedUrl.hostname}</span>
          {formattedUrl.path && (
            <code className='resource-url-path'>{formattedUrl.path}</code>
          )}
        </a>

        {resource.snippet && (
          <button
            type='button'
            className='resource-snippet-preview'
            onClick={() => onCopy(resource.snippet, resource.name)}
            title='Copy snippet'
          >
            <code>{resource.snippet}</code>
          </button>
        )}

        <div className='resource-actions'>
          <button
            type='button'
            onClick={() =>
              onCopy(resource.snippet || resource.url, resource.name)
            }
            className={`resource-icon-button ${isCopied ? 'is-copied' : ''}`}
            title='Copy'
          >
            {isCopied ? (
              <LucideIcons.Check size={16} />
            ) : (
              <LucideIcons.Copy size={16} />
            )}
          </button>

          <a
            href={resource.url}
            target='_blank'
            rel='noopener noreferrer'
            className='resource-icon-button'
            title='Open link'
          >
            <LucideIcons.ExternalLink size={16} />
          </a>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={whileHoverState}
      transition={hoverTransition}
      className='resource-grid-card'
      style={categoryVars}
    >
      <div className='resource-grid-top'>
        <div>
          <div
            className='resource-category flex items-center gap-2'
          >
            <span>{resource.category}</span>
          </div>
          <a
            href={resource.url}
            target='_blank'
            rel='noopener noreferrer'
            className='resource-title-link resource-title-link-grid'
          >
            {resource.name}
          </a>
        </div>

        <button
          type='button'
          onClick={() =>
            onCopy(resource.snippet || resource.url, resource.name)
          }
          className={`resource-icon-button resource-copy-button ${isCopied ? 'is-copied' : ''}`}
          title='Copy'
        >
          {isCopied ? (
            <LucideIcons.Check size={18} />
          ) : (
            <LucideIcons.Copy size={18} />
          )}
        </button>
      </div>

      <p className='resource-description'>{resource.description}</p>

      <a
        href={resource.url}
        target='_blank'
        rel='noopener noreferrer'
        className='resource-url-panel'
        title={resource.url}
      >
        <div className='resource-url-label'>URL</div>
        <div className='resource-url-host'>{formattedUrl.hostname}</div>
        {formattedUrl.path && (
          <code className='resource-url-path resource-url-path-block'>
            {formattedUrl.path}
          </code>
        )}
      </a>

      {resource.snippet && (
        <div className='resource-snippet-box'>
          <div className='resource-snippet-label'>
            <LucideIcons.Terminal size={10} />
            <span>Snippet</span>
          </div>
          <code>{resource.snippet}</code>
        </div>
      )}

      <div className='resource-grid-footer'>
        <div className='resource-tag-row'>
          {resource.tags.slice(0, 2).map((tag) => (
            <span key={tag} className='resource-tag'>
              {tag}
            </span>
          ))}
        </div>

        <a
          href={resource.url}
          target='_blank'
          rel='noopener noreferrer'
          className='resource-icon-button'
          title='Open link'
        >
          <LucideIcons.ExternalLink size={16} />
        </a>
      </div>
    </motion.article>
  );
};

const TableCard = ({ resources, viewMode }) => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={viewMode === 'grid' ? 'resource-grid' : 'resource-list'}>
      <AnimatePresence mode='wait' initial={false}>
        {resources.map((resource) => (
          <ResourceCard
            key={resource.name}
            resource={resource}
            viewMode={viewMode}
            onCopy={handleCopy}
            copiedId={copiedId}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TableCard;
