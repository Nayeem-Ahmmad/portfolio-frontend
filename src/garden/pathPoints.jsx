// Single source of truth for the garden's journey stops. GroundScene.jsx
// draws the path/markers from this; the camera math and the nav dots
// (Phase 04) read positions and order from here too — so everything
// always agrees on where "About" or "Projects" actually is.
export const pathPoints = [
  { id: 'home', x: 1180, y: 560, label: 'Home' },
  { id: 'about', x: 940, y: 610, label: 'About' },
  { id: 'skills', x: 700, y: 650, label: 'Skills' },
  { id: 'experience', x: 480, y: 610, label: 'Experience' },
  { id: 'projects', x: 300, y: 670, label: 'Projects' },
  { id: 'achievements', x: 160, y: 720, label: 'Achievements' },
  { id: 'contact', x: 90, y: 780, label: 'Contact' },
];