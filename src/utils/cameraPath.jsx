import { pathPoints } from '../garden/pathPoints';

// Given overall journey progress (0–1), returns the {x, y} the "camera"
// should be centered on inside the garden's 1440x820 viewBox, plus which
// stop index is currently active. The journey is divided into N-1 equal
// segments between consecutive pathPoints, and we lerp within whichever
// segment `progress` currently falls in.
export function getCameraPosition(progress) {
  const clamped = Math.min(Math.max(progress, 0), 1);
  const segmentCount = pathPoints.length - 1;
  const rawIndex = clamped * segmentCount;
  const fromIndex = Math.min(Math.floor(rawIndex), segmentCount - 1);
  const toIndex = fromIndex + 1;
  const localT = rawIndex - fromIndex;

  const from = pathPoints[fromIndex];
  const to = pathPoints[toIndex];

  return {
    x: from.x + (to.x - from.x) * localT,
    y: from.y + (to.y - from.y) * localT,
    activeIndex: localT < 0.5 ? fromIndex : toIndex,
  };
}

export function getActiveSectionId(progress) {
  const { activeIndex } = getCameraPosition(progress);
  return pathPoints[activeIndex].id;
}