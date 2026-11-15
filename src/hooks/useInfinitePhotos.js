import { useCallback, useEffect, useRef, useState } from 'react';
import { getPaginatedPhotos } from '../data/picsumData.js';

const API_BASE_URL = 'https://picsum.photos/v2/list';
const FAST_PROBE_TIMEOUT_MS = 500;

export function useInfinitePhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const nextPageRef = useRef(1);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const requestedPagesRef = useRef(new Set());
  const knownPhotoIdsRef = useRef(new Set());
  const isMountedRef = useRef(true);
  const isLiveBlockedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const loadNextPage = useCallback(async () => {
    const page = nextPageRef.current;

    // Prevent duplicate concurrent requests or requests beyond feed
    if (loadingRef.current || !hasMoreRef.current || requestedPagesRef.current.has(page)) {
      return;
    }

    loadingRef.current = true;
    requestedPagesRef.current.add(page);
    setLoading(true);
    setError(null);

    let incomingPhotos = null;

    // 1. Try Live API if not already determined to be firewalled/blocked
    if (!isLiveBlockedRef.current) {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), FAST_PROBE_TIMEOUT_MS);

      try {
        const response = await fetch(`${API_BASE_URL}?page=${page}&limit=6`, {
          signal: controller.signal,
        });

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            incomingPhotos = data;
          }
        }
      } catch {
        // Fast probe failed due to campus firewall / CORS restriction
        isLiveBlockedRef.current = true;
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    // 2. High-speed, endless paginated photography dataset
    if (!incomingPhotos) {
      incomingPhotos = getPaginatedPhotos(page);
    }

    // 3. Handle true end of collection
    if (incomingPhotos.length === 0) {
      hasMoreRef.current = false;
      if (isMountedRef.current) {
        setHasMore(false);
        setLoading(false);
      }
      loadingRef.current = false;
      return;
    }

    // 4. Filter and deduplicate photos by ID
    const uniqueBatch = incomingPhotos.filter((item) => {
      if (!item?.id || !item?.author || !item?.download_url) return false;
      if (knownPhotoIdsRef.current.has(item.id)) return false;
      knownPhotoIdsRef.current.add(item.id);
      return true;
    });

    if (isMountedRef.current) {
      setPhotos((prev) => [...prev, ...uniqueBatch]);
      nextPageRef.current = page + 1;
      setLoading(false);
    }

    loadingRef.current = false;
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    loadNextPage();
  }, [loadNextPage]);

  return { photos, loading, error, hasMore, loadNextPage };
}
