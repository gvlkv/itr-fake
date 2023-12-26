export default function SeedInput({
  seed,
  onSeedChange,
}: {
  seed: number;
  onSeedChange: Function;
}) {
  return (
    <input
      id="seed-input"
      type="number"
      value={seed}
      className="input input-bordered w-full"
      onChange={(e) => onSeedChange(+e.target.value)}
    />
  );
}
