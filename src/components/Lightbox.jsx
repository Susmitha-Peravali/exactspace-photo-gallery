import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faTimes, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

function Lightbox({ photo, onClose, onToggleLike, isLiked, likeCount }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!photo) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        <button
          aria-label="Close fullscreen view"
          className="lightbox-close-btn"
          onClick={onClose}
          type="button"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className="lightbox-image-wrap">
          <img
            alt={`Photograph by ${photo.author}`}
            className="lightbox-image"
            src={photo.download_url}
          />
        </div>

        <div className="lightbox-bar">
          <div className="lightbox-author-info">
            <span className="lightbox-label">Photographer</span>
            <h3 className="lightbox-author-name">{photo.author}</h3>
            <span className="lightbox-meta">
              {photo.width} × {photo.height}px • {photo.category || 'Fine Art'}
            </span>
          </div>

          <div className="lightbox-actions">
            <button
              aria-label={`${isLiked ? 'Unlike' : 'Like'} photo by ${photo.author}`}
              className={`like-button ${isLiked ? 'liked' : ''}`}
              onClick={onToggleLike}
              title={isLiked ? 'Unlike' : 'Like'}
              type="button"
            >
              <FontAwesomeIcon icon={faThumbsUp} className="like-icon" />
              <span className="like-count">{likeCount}</span>
            </button>

            {photo.url && (
              <a
                className="lightbox-external-link"
                href={photo.url}
                rel="noreferrer"
                target="_blank"
                title="View original source"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lightbox;
