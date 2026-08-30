import Sky from './layers/Sky';
import Mountains from './layers/Mountains';
import Clouds from './layers/Clouds';
import GroundScene from './layers/GroundScene';
import { getCameraPosition } from '../utils/cameraPath';

// Full-bleed garden viewport. `progress` (0–1, from useScrollProgress)
// drives a virtual "camera" that pans across the 1440x820 scene toward
// whichever pathPoint the user has scrolled to. Layers move at different
// fractions of the camera offset — sky barely shifts, mountains shift a
// little, the ground shifts the most — which is what sells depth/parallax
// without any 3D engine.
export default function GardenScene({ progress = 0 }) {
  const camera = getCameraPosition(progress);
  const centerX = 720;
  const centerY = 500;
  const offsetX = camera.x - centerX;
  const offsetY = camera.y - centerY;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <svg
        viewBox="0 0 1440 820"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="img"
        aria-label="Illustrated garden scene representing the developer's journey"
      >
        <g style={{ transform: `translate(${offsetX * 0.05}px, ${offsetY * 0.05}px)` }}>
          <Sky />
        </g>
        <g style={{ transform: `translate(${offsetX * 0.15}px, ${offsetY * 0.1}px)` }}>
          <Mountains />
        </g>
        <g style={{ transform: `translate(${offsetX * 0.25}px, ${offsetY * 0.15}px)` }}>
          <Clouds />
        </g>
        <g style={{ transform: `translate(${-offsetX * 0.6}px, ${-offsetY * 0.6}px)` }}>
          <GroundScene />
        </g>
      </svg>
    </div>
  );
}