import RndButton from "./rnd-button";
import SeedInput from "./seed-input";

export default function Seed({
  seed,
  onSeedChange,
}: {
  seed: number;
  onSeedChange: Function;
}) {
  return (
    <>
      <label htmlFor="seed-input">Seed:</label>
      <SeedInput seed={seed} onSeedChange={onSeedChange} />
      <RndButton onSeedChange={onSeedChange} />
    </>
  );
}
