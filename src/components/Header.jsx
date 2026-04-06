import React, { useRef, useEffect } from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  LayoutGrid, 
  LayoutList, 
  Settings,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

const Header = ({ searchQuery, setSearchQuery, theme, toggleTheme, onOpenTechStack, viewMode, setViewMode, onToggleSidebar, isSidebarOpen, resourceCount }) => {
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <button
          onClick={onToggleSidebar}
          className="header-action-btn"
          aria-label="Toggle Sidebar"
          title={isSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>

        <div className="search-container">
          <div className="search-input-wrapper">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Vault..."
              className="search-input"
            />
            <Search size={18} className="search-icon-fixed" />
            <div className="search-controls">
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="search-clear-btn"
                  title="Clear Search"
                >
                  <X size={14} />
                </button>
              )}
              <div className="cmd-k-hint">⌘K</div>
            </div>
          </div>
        </div>

        <div className="header-count-badge">
          <span className="header-count-num animate-in zoom-in duration-500">{resourceCount}</span>
          <span className="header-count-text hidden-mobile">Resources</span>
        </div>
      </div>

      <div className="header-right">
        <div className="view-mode-toggle">
          <button
            onClick={() => setViewMode('grid')}
            className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
            title="Grid View"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
            title="List View"
          >
            <LayoutList size={16} />
          </button>
        </div>

        <button
          onClick={toggleTheme}
          className="header-action-btn"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={onOpenTechStack}
          className="header-action-btn"
          title="System Information"
        >
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
