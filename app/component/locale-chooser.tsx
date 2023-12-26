import config from "@/app/lib/config";

export default function LocaleChooser({
  option,
  onChange,
}: {
  option: number;
  onChange: Function;
}) {
  return (
    <>
      <label htmlFor="locale-chooser">Language:</label>
      <select
        id="locale-chooser"
        className="select select-bordered"
        value={option}
        onChange={(e) => onChange(+e.target.value)}
      >
        {config.locales.map((locale, i) => (
          <option key={i} value={i}>
            {locale.getMetadata().title}
          </option>
        ))}
      </select>
    </>
  );
}
