import Person from "@/app/model/person";
import { mkConfig, generateCsv, download } from "export-to-csv";

export default function ExportButton({ people }: { people: Array<Person> }) {
  const csvConfig = mkConfig({ useKeysAsHeaders: true, filename: "people" });
  const csv = generateCsv(csvConfig)(people as Array<any>);
  return (
    <button className="btn" onClick={() => download(csvConfig)(csv)}>
      Export as CSV
    </button>
  );
}
