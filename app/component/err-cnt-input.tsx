import config from "@/app/lib/config";

export default function ErrCntInput({
  value,
  onChange,
}: {
  value: number;
  onChange: Function;
}) {
  return (
    <input
      id="err-cnt-input"
      type="number"
      min={0}
      max={config.errInputCap}
      value={value}
      onChange={(e) => onChange(+e.target.value)}
      className="input input-bordered w-full"
    />
  );
}
