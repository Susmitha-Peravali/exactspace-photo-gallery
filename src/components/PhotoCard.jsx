import { memo, useRef, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faExpand,
  faShareAlt,
  faCheck,
  faBookmark,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';

/* ─── Helpers ─────────────────────────────────────────── */

function nameHash(name = '') {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = name.charCodeAt(i) + ((h << 5) - h);
  }
  return Math.abs(h);
}

const AVATAR_GRADIENTS = [
  ['#3b82f6', '#1d4ed8'],
  ['#06b6d4', '#0284c7'],
  ['#8b5cf6', '#6d28d9'],
  ['#ec4899', '#be185d'],
  ['#10b981', '#047857'],
  ['#f59e0b', '#d97706'],
  ['#ef4444', '#b91c1c'],
  ['#14b8a6', '#0f766e'],
];

const APERTURES = ['f/1.4', 'f/1.8', 'f/2.8', 'f/4', 'f/5.6', 'f/8'];
const FOCAL_LENGTHS = ['24mm', '35mm', '50mm', '85mm', '105mm', '200mm'];
const CAMERAS = ['Sony α7 IV', 'Canon EOS R5', 'Nikon Z9', 'Fujifilm X-T5', 'Leica M11', 'Hasselblad X2D'];

function getInitials(name = '') {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

function getHandle(name = '') {
  return '@' + name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
}

/* Confetti burst particles */
function ConfettiBurst({ active }) {
  if (!active) return null;
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    angle: (i / 8) * 360,
    color: ['#38bdf8', '#818cf8', '#f472b6', '#34d399', '#fbbf24'][i % 5],
  }));
  return (
    <div className="confetti-burst" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="confetti-dot"
          style={{
            '--angle': `${p.angle}deg`,
            '--color': p.color,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────── */

function PhotoCard({ photo, index, isLiked = false, likeCount = 0, onToggleLike, onOpenLightbox }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [floatFeedback, setFloatFeedback] = useState(null);
  const [showHeartBurst, setShowHeartBurst] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [hovered, setHovered] = useState(false);

  const lastClickTimeRef = useRef(0);
  const h = nameHash(photo.author);
  const [gradA, gradB] = AVATAR_GRADIENTS[h % AVATAR_GRADIENTS.length];
  const initials = getInitials(photo.author);
  const handle = getHandle(photo.author);
  const aperture = APERTURES[h % APERTURES.length];
  const focal = FOCAL_LENGTHS[(h >> 2) % FOCAL_LENGTHS.length];
  const camera = CAMERAS[(h >> 4) % CAMERAS.length];
  const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(photo.author)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

  const handleLikeClick = useCallback(() => {
    setIsLiking(true);
    setFloatFeedback(isLiked ? '-1' : '+1');
    if (!isLiked) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 700);
    }
    onToggleLike();
    setTimeout(() => setIsLiking(false), 300);
    setTimeout(() => setFloatFeedback(null), 800);
  }, [isLiked, onToggleLike]);

  const handlePhotoDoubleClick = useCallback(() => {
    const now = Date.now();
    if (now - lastClickTimeRef.current < 320) {
      if (!isLiked) {
        setShowHeartBurst(true);
        setShowConfetti(true);
        setTimeout(() => setShowHeartBurst(false), 700);
        setTimeout(() => setShowConfetti(false), 700);
      }
      handleLikeClick();
      lastClickTimeRef.current = 0;
    } else {
      lastClickTimeRef.current = now;
    }
  }, [isLiked, handleLikeClick]);

  const handleShare = useCallback(async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(photo.download_url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }
    } catch { /* silent */ }
  }, [photo.download_url]);

  const handleBookmark = useCallback(() => {
    setBookmarked((b) => !b);
  }, []);

  return (
    <article
      className={`photo-card${hovered ? ' photo-card--hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image Frame ── */}
      <div
        className="photo-image-container"
        onClick={handlePhotoDoubleClick}
        title="Double-click to like • Click expand icon for fullscreen"
      >
        {!imageLoaded && <div className="photo-placeholder-shimmer" />}

        <img
          alt={`Photograph by ${photo.author}`}
          className={`photo-image${imageLoaded ? ' photo-loaded' : ''}`}
          decoding="async"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          src={photo.download_url}
          width={photo.width}
          height={photo.height}
        />

        {/* Hover overlay — gradient + meta */}
        <div className="photo-hover-overlay" aria-hidden="true">
          <div className="hover-overlay-meta">
            <span className="hover-resolution">{photo.width} × {photo.height}px</span>
            <span className="hover-hint">Double-click to like</span>
          </div>
        </div>

        {/* Double-click Heart Burst */}
        {showHeartBurst && (
          <div className="double-tap-burst" aria-hidden="true">
            <FontAwesomeIcon icon={faThumbsUp} />
          </div>
        )}

        {/* Top-left Expand Chip */}
        <button
          aria-label="View fullscreen photo"
          className="photo-action-chip photo-expand-btn"
          onClick={(e) => { e.stopPropagation(); onOpenLightbox(photo); }}
          type="button"
        >
          <FontAwesomeIcon icon={faExpand} />
        </button>

        {/* Top-right Index Pill */}
        {index !== undefined && (
          <span className="photo-index-pill" aria-label={`Photo ${index + 1}`}>
            #{String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>

      {/* ── Premium Photographer Profile Strip ── */}
      <div className="photo-profile-strip">

        {/* Left: Avatar + Identity */}
        <div className="profile-identity">
          {/* Avatar with DiceBear image + gradient fallback */}
          <div className="profile-avatar-wrap">
            <div
              className="profile-avatar-fallback"
              style={{ background: `linear-gradient(135deg, ${gradA}, ${gradB})` }}
              aria-hidden="true"
            >
              {initials}
            </div>
            <img
              src={avatarUrl}
              alt=""
              className={`profile-avatar-img${avatarLoaded ? ' avatar-visible' : ''}`}
              onLoad={() => setAvatarLoaded(true)}
              aria-hidden="true"
            />
            <div className="avatar-ring" aria-hidden="true" />
          </div>

          {/* Name + Handle + Meta */}
          <div className="profile-text-block">
            <div className="profile-name-row">
              <span className="profile-author-name">{photo.author}</span>
              <span className="verified-badge" aria-label="Verified photographer" title="Verified Photographer">
                <FontAwesomeIcon icon={faCheck} />
              </span>
            </div>
            <div className="profile-handle-row">
              <span className="profile-handle">{handle}</span>
              {photo.category && (
                <>
                  <span className="profile-dot" aria-hidden="true">·</span>
                  <span className="profile-category">{photo.category}</span>
                </>
              )}
            </div>
            {/* EXIF-style meta row */}
            <div className="photo-exif-row">
              <span className="exif-chip">
                <FontAwesomeIcon icon={faCamera} className="exif-icon" />
                {camera}
              </span>
              <span className="exif-chip">{aperture}</span>
              <span className="exif-chip">{focal}</span>
            </div>
          </div>
        </div>

        {/* Right: Action buttons */}
        <div className="photo-action-bar">
          {/* Bookmark */}
          <button
            aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark this photo'}
            className={`action-btn bookmark-btn${bookmarked ? ' bookmarked' : ''}`}
            onClick={handleBookmark}
            title={bookmarked ? 'Bookmarked' : 'Bookmark'}
            type="button"
          >
            <FontAwesomeIcon icon={faBookmark} />
          </button>

          {/* Share / Copy Link */}
          <button
            aria-label="Copy image link"
            className={`action-btn share-btn${copied ? ' share-copied' : ''}`}
            onClick={handleShare}
            title={copied ? 'Link copied!' : 'Copy link'}
            type="button"
          >
            <FontAwesomeIcon icon={copied ? faCheck : faShareAlt} />
            {copied && <span className="action-btn-label">Copied</span>}
          </button>

          {/* Like Toggle — pill with count */}
          <button
            aria-label={`${isLiked ? 'Unlike' : 'Like'} photo by ${photo.author}. Likes: ${likeCount}`}
            className={`like-pill${isLiked ? ' liked' : ''}${isLiking ? ' bump' : ''}`}
            onClick={handleLikeClick}
            title={isLiked ? 'Unlike' : 'Like'}
            type="button"
          >
            <FontAwesomeIcon aria-hidden="true" className="like-icon" icon={faThumbsUp} />
            <span className="like-count">{likeCount}</span>

            {/* Confetti burst */}
            <ConfettiBurst active={showConfetti} />

            {/* Floating +1 / -1 */}
            {floatFeedback && (
              <span
                className={`floating-feedback${floatFeedback === '-1' ? ' floating-minus' : ''}`}
                aria-hidden="true"
              >
                {floatFeedback}
              </span>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(PhotoCard);
