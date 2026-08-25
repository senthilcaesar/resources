import React, { useState, useMemo } from 'react';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Copy,
  Check,
  Star,
  Eye,
  Code2,
} from 'lucide-react';

export default function DenseTableView({
  resources,
  onSelectResource,
  isBookmarked,
  onToggleBookmark,
  onTagClick,
  playClick,
  playSuccess,
}) {
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [copiedId, setCopiedId] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
    if (playClick) playClick();
  };

  const priorityWeight = { High: 3, Medium: 2, Low: 1 };

  const sortedResources = useMemo(() => {
    return [...resources].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === 'importance') {
        valA = priorityWeight[a.importance] || 0;
        valB = priorityWeight[b.importance] || 0;
      } else if (sortField === 'starred') {
        valA = isBookmarked(a.name) ? 1 : 0;
        valB = isBookmarked(b.name) ? 1 : 0;
      } else {
        valA = String(valA || '').toLowerCase();
        valB = String(valB || '').toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [resources, sortField, sortOrder, isBookmarked]);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (playSuccess) playSuccess();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderSortIcon = (field) => {
    if (sortField !== field)
      return <ArrowUpDown size={14} className='opacity-40' />;
    return sortOrder === 'asc' ? (
      <ArrowUp size={14} className='text-accent' />
    ) : (
      <ArrowDown size={14} className='text-accent' />
    );
  };

  return (
    <div className='dense-table-wrapper'>
      <table className='dense-table'>
        <thead>
          <tr>
            <th
              onClick={() => handleSort('starred')}
              className='cursor-pointer w-12 text-center'
            >
              <div className='flex items-center justify-center gap-1'>
                <Star size={14} />
                {renderSortIcon('starred')}
              </div>
            </th>
            <th onClick={() => handleSort('name')} className='cursor-pointer'>
              <div className='flex items-center gap-1.5'>
                <span>Resource</span>
                {renderSortIcon('name')}
              </div>
            </th>
            <th
              onClick={() => handleSort('category')}
              className='cursor-pointer'
            >
              <div className='flex items-center gap-1.5'>
                <span>Category</span>
                {renderSortIcon('category')}
              </div>
            </th>
            <th
              onClick={() => handleSort('importance')}
              className='cursor-pointer'
            >
              <div className='flex items-center gap-1.5'>
                <span>Priority</span>
                {renderSortIcon('importance')}
              </div>
            </th>
            <th>Tags</th>
            <th>Target URL</th>
            <th className='text-right'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedResources.map((res) => {
            const isPinned = isBookmarked(res.name);
            const isCopied = copiedId === res.name;

            return (
              <tr key={res.name} className='dense-table-row'>
                <td className='text-center'>
                  <button
                    type='button'
                    onClick={() => {
                      onToggleBookmark(res.name);
                      if (playClick) playClick();
                    }}
                    className='dense-star-btn'
                    title={isPinned ? 'Remove Star' : 'Star Resource'}
                  >
                    <Star
                      size={15}
                      className={
                        isPinned
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-dim hover:text-amber-400'
                      }
                    />
                  </button>
                </td>

                <td>
                  <div className='dense-resource-cell'>
                    <button
                      type='button'
                      onClick={() => onSelectResource(res)}
                      className='dense-resource-title'
                    >
                      {res.name}
                    </button>
                    <span className='dense-resource-desc'>
                      {res.description}
                    </span>
                  </div>
                </td>

                <td>
                  <span className='dense-category-pill'>{res.category}</span>
                </td>

                <td>
                  <span
                    className={`dense-priority-badge badge-${(res.importance || 'medium').toLowerCase()}`}
                  >
                    {res.importance}
                  </span>
                </td>

                <td>
                  <div className='flex flex-wrap gap-1 max-w-xs'>
                    {res.tags?.slice(0, 2).map((tag) => (
                      <button
                        key={tag}
                        type='button'
                        onClick={() => onTagClick?.(tag)}
                        className='dense-tag-pill'
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </td>

                <td>
                  <a
                    href={res.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='dense-url-link'
                  >
                    {res.url.replace(/^https?:\/\//, '').split('/')[0]}
                  </a>
                </td>

                <td className='text-right'>
                  <div className='flex items-center justify-end gap-1'>
                    <button
                      type='button'
                      onClick={() => onSelectResource(res)}
                      className='dense-action-btn'
                      title='Inspect Details'
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      type='button'
                      onClick={() =>
                        handleCopy(res.snippet || res.url, res.name)
                      }
                      className='dense-action-btn'
                      title='Copy URL or Code'
                    >
                      {isCopied ? (
                        <Check size={14} className='text-emerald-400' />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                    <a
                      href={res.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='dense-action-btn primary'
                      title='Open URL'
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
