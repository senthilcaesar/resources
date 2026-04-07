import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TechStackModal from './components/TechStackModal';
import { useColorMode } from '@chakra-ui/react';
import TableCard from './components/TableCard';
import { RESOURCES } from './data/resources';
import { Terminal } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [theme, setTheme] = useState('light');
  const [isTechStackOpen, setIsTechStackOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

  const { setColorMode } = useColorMode();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    setColorMode(theme);
  }, [theme, setColorMode]);

  useEffect(() => {
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const filteredResources = useMemo(() => {
    return RESOURCES.filter((res) => {
      const matchesCategory =
        activeCategory === 'All' || res.category === activeCategory;
      const matchesSearch =
        res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Handle closing sidebar on mobile when category changes
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  }, [activeCategory]);

  return (
    <div className='app-container'>
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className='sidebar-backdrop'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        resources={RESOURCES}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

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
        />

        <main className='content-area'>
          <div className='mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700'>
            {activeCategory !== 'All' && (
              <h2 className='text-3xl font-bold text-primary mb-2 tracking-tight'>
                {activeCategory}
              </h2>
            )}
          </div>

          {filteredResources.length > 0 ? (
            <TableCard resources={filteredResources} viewMode={viewMode} />
          ) : (
            <div className='flex flex-col items-center justify-center py-40 text-center glass rounded-[40px] border-dashed'>
              <div className='p-6 bg-white/5 rounded-full mb-6'>
                <Terminal size={48} className='text-dim opacity-30' />
              </div>
              <h3 className='text-xl font-bold text-primary mb-2'>
                No matches found
              </h3>
              <p className='text-dim text-sm max-w-sm'>
                Try a different search term or category to find your resource.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className='mt-8 text-accent-primary font-semibold hover:underline'
              >
                Reset Filters
              </button>
            </div>
          )}
        </main>

        <TechStackModal
          isOpen={isTechStackOpen}
          onClose={() => setIsTechStackOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
