import { useCallback, useEffect, useRef, useState } from 'react';
import Header from './components/Header.jsx';
import PhotoList from './components/PhotoList.jsx';
import Loader from './components/Loader.jsx';
import Lightbox from './components/Lightbox.jsx';
import AnimatedBackground from './components/AnimatedBackground.jsx';
import { useInfinitePhotos } from './hooks/useInfinitePhotos.js';
import './App.css';

function App() {
  const sentinelRef = useRef(null);
  const [likedPhotos, setLikedPhotos] = useState(() => new Set());
  const [likeCounts, setLikeCounts] = useState({});
  const [totalLikes, setTotalLikes] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState(null);
  const [compactView, setCompactView] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('photo_gallery_theme') || 'dark';
  });

  const { photos, loading, error, hasMore, loadNextPage } = useInfinitePhotos();

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('photo_gallery_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCompactView = () => {
    setCompactView((prev) => !prev);
  };

  // Toggle like/unlike logic: 1 like per user per photo
  const handleToggleLike = useCallback((photoId) => {
    setLikedPhotos((prevLiked) => {
      const nextLiked = new Set(prevLiked);
      const isCurrentlyLiked = nextLiked.has(photoId);

      if (isCurrentlyLiked) {
        nextLiked.delete(photoId);
        setLikeCounts((prevCounts) => ({
          ...prevCounts,
          [photoId]: Math.max(0, (prevCounts[photoId] || 1) - 1),
        }));
        setTotalLikes((prev) => Math.max(0, prev - 1));
      } else {
        nextLiked.add(photoId);
        setLikeCounts((prevCounts) => ({
          ...prevCounts,
          [photoId]: (prevCounts[photoId] || 0) + 1,
        }));
        setTotalLikes((prev) => prev + 1);
      }

      return nextLiked;
    });
  }, []);

  // Track scroll position for Back-to-Top FAB and reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(progress);
      setShowScrollTop(scrollTop > 450);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Infinite scroll Intersection Observer
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || error || loading) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadNextPage();
        }
      },
      {
        root: null,
        rootMargin: '450px 0px',
        threshold: 0.05,
      },
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [error, hasMore, loading, loadNextPage]);

  return (
    <div className={`app-container ${compactView ? 'layout-compact' : ''}`}>
      {/* Full-Screen Animated Background */}
      <AnimatedBackground />

      {/* Top Reading Progress Line */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <Header
        compactView={compactView}
        onToggleCompactView={toggleCompactView}
        onToggleTheme={toggleTheme}
        theme={theme}
        totalLikes={totalLikes}
        totalPhotos={photos.length}
      />

      <main className="gallery-main">
        {/* Full-State Initial Error Panel */}
        {error && photos.length === 0 ? (
          <section className="state-panel error-panel" role="alert">
            <div className="state-icon error-icon" aria-hidden="true">
              !
            </div>
            <h2>Unable to load photographs</h2>
            <p>{error}</p>
            <button className="btn btn-primary" onClick={loadNextPage} type="button">
              Try again
            </button>
          </section>
        ) : (
          <>
            {/* The single-column photo feed */}
            <PhotoList
              likeCounts={likeCounts}
              likedPhotos={likedPhotos}
              onOpenLightbox={(photo) => setActiveLightboxPhoto(photo)}
              onToggleLike={handleToggleLike}
              photos={photos}
            />

            {/* In-feed error banner when a subsequent page fails */}
            {error && photos.length > 0 && (
              <div className="in-feed-error" role="alert">
                <p>Could not load the next set of photographs. {error}</p>
                <button className="btn btn-retry" onClick={loadNextPage} type="button">
                  Retry
                </button>
              </div>
            )}

            {/* Skeleton loading indicator */}
            {loading && <Loader count={photos.length === 0 ? 3 : 2} />}

            {/* Empty state when API returns no photos */}
            {!loading && photos.length === 0 && !error && (
              <section className="state-panel empty-panel" aria-live="polite">
                <h2>No photographs found</h2>
                <p>There are no photographs available right now. Please check back later.</p>
              </section>
            )}

            {/* End of collection card */}
            {!hasMore && photos.length > 0 && (
              <div className="end-feed-card" aria-live="polite">
                <div className="end-icon" aria-hidden="true">
                  ✨
                </div>
                <h3>You’re All Caught Up</h3>
                <p>You have explored all available photographs in the gallery.</p>
                <button className="btn btn-secondary-subtle" onClick={scrollToTop} type="button">
                  Back to Top
                </button>
              </div>
            )}

            {/* Infinite scrolling trigger sentinel */}
            {hasMore && !loading && !error && (
              <div className="scroll-sentinel" ref={sentinelRef} aria-hidden="true" />
            )}
          </>
        )}
      </main>

      {/* Fullscreen Photo Lightbox Modal */}
      {activeLightboxPhoto && (
        <Lightbox
          isLiked={likedPhotos.has(activeLightboxPhoto.id)}
          likeCount={likeCounts[activeLightboxPhoto.id] || 0}
          onClose={() => setActiveLightboxPhoto(null)}
          onToggleLike={() => handleToggleLike(activeLightboxPhoto.id)}
          photo={activeLightboxPhoto}
        />
      )}

      {/* Floating Action Button (Back to Top) */}
      {showScrollTop && (
        <button
          aria-label="Scroll back to top"
          className="back-to-top-fab"
          onClick={scrollToTop}
          type="button"
        >
          ↑
        </button>
      )}

      <footer className="site-footer">
        <p className="footer-brand">Modern React Photo Gallery</p>
        <p className="footer-sub">
          Single-column infinite scroll feed &bull; Powered by Picsum Photos REST API
        </p>
      </footer>
    </div>
  );
}

export default App;
