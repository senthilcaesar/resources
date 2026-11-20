import React, { useRef, useEffect } from 'react';
import {
  Search,
  Sun,
  Moon,
  Sparkles,
  LayoutGrid,
  Table,
  Compass,
  Star,
  Settings,
  ChevronRight,
  X,
  Palette,
} from 'lucide-react';

const Header = ({
  searchQuery,
  setSearchQuery,
  theme,
  toggleTheme,
  onOpenTechStack,
  viewMode,
  setViewMode,
  onToggleSidebar,
  isSidebarOpen,
  onOpenCommandPalette,
  bookmarkCount,
  showOnlyBookmarks,
  setShowOnlyBookmarks,
  playClick,
}) => {
  const searchInputRef = useRef(null);

  return (
    <header className='header'>
      <div className='header-left'>
        {!isSidebarOpen && (
          <button
            onClick={() => {
              onToggleSidebar();
              if (playClick) playClick();
            }}
            className='header-action-btn'
            aria-label='Expand Filter Sidebar'
            title='Expand Filter Sidebar'
          >
            <ChevronRight size={18} />
          </button>
        )}
      </div>

      <div className='header-center'>
        {/* Global Search Bar */}
        <div className='search-container'>
          <div className='search-input-wrapper'>
            <input
              ref={searchInputRef}
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search library, tags, topics...'
              className='search-input'
            />
            <Search size={17} className='search-icon-fixed' />
            <div className='search-controls'>
              {!searchQuery && (
                <button
                  type='button'
                  onClick={onOpenCommandPalette}
                  className='cmd-k-hint'
                  title='Open Spotlight Command Palette (⌘K / Ctrl+K)'
                >
                  ⌘K
                </button>
              )}
              {searchQuery && (
                <button
                  type='button'
                  onClick={() => setSearchQuery('')}
                  className='search-clear-btn'
                  title='Clear Search'
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='header-right'>
        {/* Interactive View Switcher */}
        <div className='view-mode-tabs'>
          <button
            onClick={() => {
              setViewMode('bento');
              if (playClick) playClick();
            }}
            className={`view-mode-pill ${viewMode === 'bento' ? 'active' : ''}`}
            title='Bento Matrix View'
          >
            <LayoutGrid size={15} />
            <span className='hidden-tablet'>Bento</span>
          </button>

          <button
            onClick={() => {
              setViewMode('table');
              if (playClick) playClick();
            }}
            className={`view-mode-pill ${viewMode === 'table' ? 'active' : ''}`}
            title='Dense Data Grid'
          >
            <Table size={15} />
            <span className='hidden-tablet'>Table</span>
          </button>
        </div>

        {/* Saved Backpack Filter Toggle */}
        <button
          onClick={() => {
            setShowOnlyBookmarks(!showOnlyBookmarks);
            if (playClick) playClick();
          }}
          className={`header-backpack-btn ${showOnlyBookmarks ? 'is-active' : ''}`}
          title='Toggle Bookmarked Items'
        >
          <Star
            size={16}
            className={
              showOnlyBookmarks || bookmarkCount > 0
                ? 'fill-amber-400 text-amber-400'
                : ''
            }
          />
          <span className='header-backpack-count'>{bookmarkCount}</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => {
            toggleTheme();
            if (playClick) playClick();
          }}
          className='header-action-btn'
          title={
            theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'
          }
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* System Tech Stack Modal */}
        <button
          onClick={() => {
            onOpenTechStack();
            if (playClick) playClick();
          }}
          className='header-action-btn'
          title='System Architecture & Credits'
        >
          <Settings size={17} />
        </button>
      </div>
    </header>
  );
};

export default Header;
