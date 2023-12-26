const RANDOM_CAP = 1_000_000_000;

export default function RndButton({
  onSeedChange,
}: {
  onSeedChange: Function;
}) {
  return (
    <button
      className="btn"
      onClick={() => onSeedChange(Math.floor(Math.random() * RANDOM_CAP))}
    >
      Randomize
    </button>
  );
}
