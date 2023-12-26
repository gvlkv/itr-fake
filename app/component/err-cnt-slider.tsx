import config from "@/app/lib/config";

export default function ErrCntSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: Function;
}) {
  return (
    <input
      type="range"
      min={0}
      max={config.errSliderCap}
      value={value}
      step={config.errSliderStep}
      onChange={(e) => onChange(+e.target.value)}
      className="range w-full"
    />
  );
}
