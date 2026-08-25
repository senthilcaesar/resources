import React, { useMemo } from 'react';
import {
  LayoutGrid,
  Tag,
  Filter,
  RotateCcw,
  Star,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { CATEGORY_ICONS, CATEGORY_STYLES } from '../data/resources';

const Sidebar = ({
  resources,
  activeCategory,
  setActiveCategory,
  selectedPriority,
  setSelectedPriority,
  selectedTags,
  setSelectedTags,
  showOnlyBookmarks,
  setShowOnlyBookmarks,
  bookmarkCount,
  isOpen,
  onClose,
  onHomeClick,
  playClick,
}) => {
  const categories = useMemo(() => {
    return ['All', ...new Set(resources.map((r) => r.category))];
  }, [resources]);

  // Compute top tags with frequency
  const allTagsWithCounts = useMemo(() => {
    const counts = {};
    resources.forEach((r) => {
      r.tags?.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 18);
  }, [resources]);

  const getCount = (cat) =>
    cat === 'All'
      ? resources.length
      : resources.filter((r) => r.category === cat).length;

  const getIcon = (cat) => {
    if (cat === 'All') return <LayoutGrid size={16} />;
    const iconName = CATEGORY_ICONS[cat] || CATEGORY_ICONS.Default || 'Folder';
    const IconComponent = LucideIcons[iconName] || LucideIcons.Folder;
    return <IconComponent size={16} />;
  };

  const getCategoryStyle = (cat) => {
    const style = CATEGORY_STYLES[cat] || CATEGORY_STYLES.Default;
    return {
      '--category-color': style.color,
      '--category-bg': style.bg,
      '--category-border': style.border,
    };
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
    if (playClick) playClick();
  };

  const hasActiveFilters =
    activeCategory !== 'All' ||
    selectedPriority !== 'All' ||
    selectedTags.length > 0 ||
    showOnlyBookmarks;

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSelectedPriority('All');
    setSelectedTags([]);
    setShowOnlyBookmarks(false);
    if (playClick) playClick();
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <div className='sidebar-inner-content'>
        {/* Sidebar Header Title */}
        <div className='sidebar-top-bar'>
          <button
            type='button'
            onClick={onHomeClick}
            className='sidebar-brand-btn'
            title='Go to Home & Scroll to Top'
          >
            <span className='sidebar-brand-title'>Study Links</span>
          </button>
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className='sidebar-reset-btn'
              title='Reset All Filters'
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className='sidebar-scroll-area'>
          {/* Bookmarks Quick Tab */}
          <div className='sidebar-section'>
            <div
              className={`nav-item bookmark-tab ${showOnlyBookmarks ? 'active' : ''}`}
              onClick={() => {
                setShowOnlyBookmarks(!showOnlyBookmarks);
                if (playClick) playClick();
              }}
            >
              <div className='nav-item-icon'>
                <Star
                  size={16}
                  className={
                    showOnlyBookmarks || bookmarkCount > 0
                      ? 'fill-amber-400 text-amber-400'
                      : ''
                  }
                />
              </div>
              <span className='nav-item-text font-medium'>
                My Backpack / Pinned
              </span>
              <span className='nav-item-count'>{bookmarkCount}</span>
            </div>
          </div>

          {/* Categories Section */}
          <div className='sidebar-section'>
            <div className='nav-label'>Categories</div>
            <div className='sidebar-nav-list'>
              {categories.map((cat) => (
                <div
                  key={cat}
                  className={`nav-item ${activeCategory === cat && !showOnlyBookmarks ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat);
                    setShowOnlyBookmarks(false);
                    if (playClick) playClick();
                  }}
                  style={getCategoryStyle(cat)}
                >
                  <div className='nav-item-icon'>{getIcon(cat)}</div>
                  <span className='nav-item-text'>{cat}</span>
                  <span className='nav-item-count'>{getCount(cat)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Priority Filter Section */}
          <div className='sidebar-section'>
            <div className='nav-label'>Priority Filter</div>
            <div className='sidebar-priority-group'>
              {['All', 'High', 'Medium', 'Low'].map((p) => (
                <button
                  key={p}
                  onClick={() => {
                    setSelectedPriority(p);
                    if (playClick) playClick();
                  }}
                  className={`sidebar-priority-chip ${selectedPriority === p ? 'active' : ''}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Tag Matrix Section */}
          <div className='sidebar-section'>
            <div className='nav-label flex items-center justify-between'>
              <span>Filter by Tags</span>
              {selectedTags.length > 0 && (
                <span className='text-xs text-accent'>
                  ({selectedTags.length} active)
                </span>
              )}
            </div>
            <div className='sidebar-tag-cloud'>
              {allTagsWithCounts.map(([tag, count]) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`sidebar-tag-pill ${isSelected ? 'active' : ''}`}
                    title={`${count} resources with #${tag}`}
                  >
                    <span>#{tag}</span>
                    <span className='sidebar-tag-count'>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
