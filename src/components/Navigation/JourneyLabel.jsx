
export default function JourneyLabel({ timeOfDay, sectionLabel }) {
  return (
    <div className="fixed bottom-8 left-6 md:left-10 z-20 text-xs uppercase tracking-[0.25em] text-fog">
      <span className="text-moss">{timeOfDay}</span>
      <span className="mx-2 text-fog/40">—</span>
      <span>{sectionLabel}</span>
    </div>
  );
}