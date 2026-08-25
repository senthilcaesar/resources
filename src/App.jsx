import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BentoView from './components/BentoView';
import TerminalView from './components/TerminalView';
import DenseTableView from './components/DenseTableView';
import TechStackModal from './components/TechStackModal';
import QuickPreviewModal from './components/QuickPreviewModal';
import CommandPalette from './components/CommandPalette';
import ResourceRouletteModal from './components/ResourceRouletteModal';
import { useColorMode } from '@chakra-ui/react';
import { RESOURCES } from './data/resources';
import { useBackpack } from './hooks/useBackpack';
import { useSoundEffects } from './hooks/useSoundEffects';
import { Terminal, RotateCcw, Filter } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedTags, setSelectedTags] = useState([]);
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('hypervault_theme') || 'dark';
  });

  const [viewMode, setViewMode] = useState(() => {
    const saved = localStorage.getItem('hypervault_viewMode');
    if (saved === 'bento' || saved === 'terminal' || saved === 'table') {
      return saved;
    }
    return 'bento';
  });

  const [isTechStackOpen, setIsTechStackOpen] = useState(false);
  const [isRouletteOpen, setIsRouletteOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

  const { setColorMode } = useColorMode();
  const {
    bookmarks,
    bookmarkCount,
    toggleBookmark,
    isBookmarked,
    masteredItems,
    toggleMastered,
    isMastered,
  } = useBackpack();

  const {
    soundEnabled,
    toggleSound,
    playClick,
    playHover,
    playSuccess,
    playRouletteSpin,
  } = useSoundEffects();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hypervault_theme', theme);
    setColorMode(theme === 'dark' ? 'dark' : 'light');
  }, [theme, setColorMode]);

  useEffect(() => {
    localStorage.setItem('hypervault_viewMode', viewMode);
  }, [viewMode]);

  // Global keyboard shortcuts (⌘K for spotlight, 1-5 for view switching)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // ⌘K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleTagClick = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    }
    if (playClick) playClick();
  };

  // Filter pipeline
  const filteredResources = useMemo(() => {
    return RESOURCES.filter((res) => {
      // Category filter
      if (activeCategory !== 'All' && res.category !== activeCategory) {
        return false;
      }
      // Priority filter
      if (selectedPriority !== 'All' && res.importance !== selectedPriority) {
        return false;
      }
      // Bookmarks filter
      if (showOnlyBookmarks && !isBookmarked(res.name)) {
        return false;
      }
      // Multi-tag filter
      if (selectedTags.length > 0) {
        const hasAllTags = selectedTags.every((t) => res.tags?.includes(t));
        if (!hasAllTags) return false;
      }
      // Search query fuzzy match
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = res.name.toLowerCase().includes(q);
        const matchesDesc = res.description.toLowerCase().includes(q);
        const matchesCat = res.category.toLowerCase().includes(q);
        const matchesTags = res.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCat && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [
    activeCategory,
    selectedPriority,
    showOnlyBookmarks,
    selectedTags,
    searchQuery,
    isBookmarked,
  ]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setSelectedPriority('All');
    setSelectedTags([]);
    setShowOnlyBookmarks(false);
    if (playClick) playClick();
  };

  const handleHomeClick = () => {
    resetAllFilters();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const mainArea = document.querySelector('.main-content');
    if (mainArea) {
      mainArea.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
      contentArea.scrollTo({ top: 0, behavior: 'smooth' });
    }
    if (window.innerWidth <= 1024) {
      setIsSidebarOpen(false);
    }
    if (playClick) playClick();
  };

  return (
    <div className='app-container'>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className='sidebar-backdrop'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Interactive Sidebar */}
      <Sidebar
        resources={RESOURCES}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        showOnlyBookmarks={showOnlyBookmarks}
        setShowOnlyBookmarks={setShowOnlyBookmarks}
        bookmarkCount={bookmarkCount}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onHomeClick={handleHomeClick}
        playClick={playClick}
      />

      {/* Main Content Area */}
      <div className='main-content'>
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenTechStack={() => setIsTechStackOpen(true)}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
          resourceCount={filteredResources.length}
          onOpenRoulette={() => setIsRouletteOpen(true)}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          bookmarkCount={bookmarkCount}
          showOnlyBookmarks={showOnlyBookmarks}
          setShowOnlyBookmarks={setShowOnlyBookmarks}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
          playClick={playClick}
        />

        <main className='content-area'>
          {/* Active Filter Chips / Status Banner */}
          <div className='filter-status-banner'>
            <div className='flex flex-wrap items-center gap-2'>
              {activeCategory !== 'All' && (
                <span className='active-filter-chip'>
                  <span>Category: {activeCategory}</span>
                  <button onClick={() => setActiveCategory('All')}>×</button>
                </span>
              )}

              {selectedPriority !== 'All' && (
                <span className='active-filter-chip'>
                  <span>Priority: {selectedPriority}</span>
                  <button onClick={() => setSelectedPriority('All')}>×</button>
                </span>
              )}

              {showOnlyBookmarks && (
                <span className='active-filter-chip bookmark'>
                  <span>Backpack Only</span>
                  <button onClick={() => setShowOnlyBookmarks(false)}>×</button>
                </span>
              )}

              {selectedTags.map((tag) => (
                <span key={tag} className='active-filter-chip tag'>
                  <span>#{tag}</span>
                  <button
                    onClick={() =>
                      setSelectedTags(selectedTags.filter((t) => t !== tag))
                    }
                  >
                    ×
                  </button>
                </span>
              ))}

              {(activeCategory !== 'All' ||
                selectedPriority !== 'All' ||
                showOnlyBookmarks ||
                selectedTags.length > 0 ||
                searchQuery) && (
                <button
                  onClick={resetAllFilters}
                  className='filter-clear-all-btn'
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Main View Renderer */}
          {filteredResources.length > 0 ? (
            <div className='view-content-wrapper'>
              {viewMode === 'bento' && (
                <BentoView
                  resources={filteredResources}
                  onSelectResource={setSelectedResource}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={toggleBookmark}
                  onTagClick={handleTagClick}
                  playClick={playClick}
                  playSuccess={playSuccess}
                />
              )}

              {viewMode === 'terminal' && (
                <TerminalView
                  resources={filteredResources}
                  onSelectResource={setSelectedResource}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={toggleBookmark}
                  playClick={playClick}
                  playSuccess={playSuccess}
                />
              )}

              {viewMode === 'table' && (
                <DenseTableView
                  resources={filteredResources}
                  onSelectResource={setSelectedResource}
                  isBookmarked={isBookmarked}
                  onToggleBookmark={toggleBookmark}
                  onTagClick={handleTagClick}
                  playClick={playClick}
                  playSuccess={playSuccess}
                />
              )}
            </div>
          ) : (
            /* Empty State */
            <div className='empty-state-card animate-in fade-in zoom-in-95 duration-300'>
              <div className='empty-icon-wrap'>
                <Terminal size={40} className='text-accent opacity-60' />
              </div>
              <h3 className='text-xl font-bold text-primary mb-2'>
                No matching vault entries
              </h3>
              <p className='text-dim text-sm max-w-md mx-auto mb-6'>
                We couldn't find any resources matching your search or active
                filters.
              </p>
              <button onClick={resetAllFilters} className='empty-reset-btn'>
                <RotateCcw size={15} />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </main>

        {/* Global Modals & Overlays */}
        <TechStackModal
          isOpen={isTechStackOpen}
          onClose={() => setIsTechStackOpen(false)}
        />

        <AnimatePresence>
          {selectedResource && (
            <QuickPreviewModal
              resource={selectedResource}
              onClose={() => setSelectedResource(null)}
              onSelectResource={setSelectedResource}
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              onTagClick={handleTagClick}
              playClick={playClick}
              playSuccess={playSuccess}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isRouletteOpen && (
            <ResourceRouletteModal
              isOpen={isRouletteOpen}
              onClose={() => setIsRouletteOpen(false)}
              resources={RESOURCES}
              onSelectResource={setSelectedResource}
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              playRouletteSpin={playRouletteSpin}
              playSuccess={playSuccess}
              playClick={playClick}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isCommandPaletteOpen && (
            <CommandPalette
              isOpen={isCommandPaletteOpen}
              onClose={() => setIsCommandPaletteOpen(false)}
              resources={RESOURCES}
              activeView={viewMode}
              setActiveView={setViewMode}
              onSelectResource={setSelectedResource}
              onOpenRoulette={() => setIsRouletteOpen(true)}
              theme={theme}
              toggleTheme={toggleTheme}
              isBookmarked={isBookmarked}
              onToggleBookmark={toggleBookmark}
              playClick={playClick}
              playSuccess={playSuccess}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
