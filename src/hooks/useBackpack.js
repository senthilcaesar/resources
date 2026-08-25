import { useState, useEffect, useCallback } from 'react';

const BOOKMARKS_STORAGE_KEY = 'hypervault_bookmarks_v1';
const MASTERED_STORAGE_KEY = 'hypervault_mastered_v1';

export function useBackpack() {
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [masteredItems, setMasteredItems] = useState(() => {
    try {
      const saved = localStorage.getItem(MASTERED_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.warn('Failed to save bookmarks to localStorage', e);
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem(MASTERED_STORAGE_KEY, JSON.stringify(masteredItems));
    } catch (e) {
      console.warn('Failed to save mastered items to localStorage', e);
    }
  }, [masteredItems]);

  const toggleBookmark = useCallback((resourceName) => {
    setBookmarks((prev) => {
      const exists = prev.includes(resourceName);
      if (exists) {
        return prev.filter((id) => id !== resourceName);
      }
      return [...prev, resourceName];
    });
  }, []);

  const isBookmarked = useCallback(
    (resourceName) => bookmarks.includes(resourceName),
    [bookmarks],
  );

  const toggleMastered = useCallback((itemId) => {
    setMasteredItems((prev) => {
      const exists = prev.includes(itemId);
      if (exists) {
        return prev.filter((id) => id !== itemId);
      }
      return [...prev, itemId];
    });
  }, []);

  const isMastered = useCallback(
    (itemId) => masteredItems.includes(itemId),
    [masteredItems],
  );

  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
  }, []);

  return {
    bookmarks,
    bookmarkCount: bookmarks.length,
    toggleBookmark,
    isBookmarked,
    masteredItems,
    toggleMastered,
    isMastered,
    clearBookmarks,
  };
}
