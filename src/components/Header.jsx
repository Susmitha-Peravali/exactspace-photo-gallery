import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';

function Header({
  totalPhotos = 0,
  totalLikes = 0,
  theme,
  onToggleTheme,
  compactView,
  onToggleCompactView,
}) {
  return (
    <header className="site-header">
      <div className="header-glow" aria-hidden="true" />

      {/* Floating Theme & Layout Quick Actions */}
      <div className="header-top-controls">
        <button
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="header-tool-btn"
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          type="button"
        >
          <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

        <button
          aria-label={`Switch to ${compactView ? 'comfortable' : 'compact'} view`}
          className="header-tool-btn"
          onClick={onToggleCompactView}
          title={`Switch to ${compactView ? 'comfortable' : 'compact'} view`}
          type="button"
        >
          <FontAwesomeIcon icon={compactView ? faExpandAlt : faCompressAlt} />
          <span>{compactView ? 'Spacious' : 'Compact'}</span>
        </button>
      </div>

      <div className="header-container">
        <div className="header-badge">
          <span className="badge-dot" />
          <span>Curated Photography Exhibition</span>
        </div>

        <h1 className="header-title">Photo Gallery</h1>

        <p className="header-subtitle">
          Discover beautiful moments, one photograph at a time.
        </p>

        {totalPhotos > 0 && (
          <div className="header-stats-bar">
            <div className="stat-item">
              <span className="stat-label">PHOTOS LOADED</span>
              <span className="stat-value">{totalPhotos}</span>
            </div>

            <div className="stat-divider" aria-hidden="true" />

            <div className="stat-item">
              <span className="stat-label">TOTAL LIKES</span>
              <span className="stat-value">{totalLikes}</span>
            </div>

            <div className="stat-divider" aria-hidden="true" />

            <div className="stat-item">
              <span className="stat-label">FEED STATUS</span>
              <span className="stat-value live-pulse">
                <span className="pulse-indicator" /> Live
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
