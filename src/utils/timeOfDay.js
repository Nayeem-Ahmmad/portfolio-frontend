// Time-of-day interpolation logic lives here.
// Built out in Phase 05 — Time-of-Day System.
//
// Will export a function like:
//   getTimeOfDayStyles(progress: number) => { skyGradient, sunPosition, ... }
// where `progress` is the 0–1 scroll journey progress from useScrollProgress.

export const TIME_OF_DAY_RANGES = {
  morning: [0, 0.2],
  day: [0.2, 0.45],
  afternoon: [0.45, 0.65],
  sunset: [0.65, 0.8],
  night: [0.8, 1],
};
