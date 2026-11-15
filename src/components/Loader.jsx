function Loader({ count = 2 }) {
  return (
    <div className="skeleton-feed" aria-label="Loading more photographs..." aria-live="polite">
      {Array.from({ length: count }, (_, index) => (
        <div className="skeleton-card" key={index} aria-hidden="true">
          <div className="skeleton-image" />
          <div className="skeleton-info">
            <div className="skeleton-author-group">
              <div className="skeleton-avatar" />
              <div className="skeleton-text-group">
                <div className="skeleton-line skeleton-label" />
                <div className="skeleton-line skeleton-name" />
              </div>
            </div>
            <div className="skeleton-button" />
          </div>
        </div>
      ))}
      <span className="visually-hidden">Loading more photographs...</span>
    </div>
  );
}

export default Loader;
