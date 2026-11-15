import PhotoCard from './PhotoCard.jsx';

function PhotoList({
  photos,
  likedPhotos = new Set(),
  likeCounts = {},
  onToggleLike,
  onOpenLightbox,
}) {
  return (
    <div className="photo-feed" aria-label="Photo feed">
      {photos.map((photo, index) => (
        <PhotoCard
          index={index}
          isLiked={likedPhotos.has(photo.id)}
          key={photo.id}
          likeCount={likeCounts[photo.id] || 0}
          onOpenLightbox={onOpenLightbox}
          onToggleLike={() => onToggleLike(photo.id)}
          photo={photo}
        />
      ))}
    </div>
  );
}

export default PhotoList;
