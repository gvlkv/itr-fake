import ErrCntSlider from "./err-cnt-slider";
import ErrCntInput from "./err-cnt-input";
import config from "@/app/lib/config";

export default function ErrCnt({
  errValue,
  onErrValueChange,
}: {
  errValue: number;
  onErrValueChange: Function;
}) {
  const sliderValue = Math.min(config.errSliderCap, errValue);
  return (
    <>
      <label htmlFor="err-cnt-input">Errors:</label>
      <ErrCntSlider value={sliderValue} onChange={onErrValueChange} />
      <ErrCntInput value={errValue} onChange={onErrValueChange} />
    </>
  );
}
