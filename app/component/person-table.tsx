import Person from "@/app/model/person";
import React, { UIEvent } from "react";

export default function PersonTable({
  people,
  setBunchCnt,
}: {
  people: Person[];
  setBunchCnt: Function;
}) {
  function onScroll(e: UIEvent<HTMLDivElement>) {
    const element = e.target as HTMLDivElement;
    if (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) < 1
    ) {
      setBunchCnt((x: number) => x + 1);
    }
  }

  return (
    <div
      className="overflow-x-auto overflow-y-scroll h-[400px]"
      onScroll={onScroll}
    >
      <table className="table table-sm table-pin-cols">
        <TableHeader
          captions={["#", "ID", "Name", "Address", "Phone number"]}
        />
        <tbody>
          {people.map((p, i) => (
            <tr key={`${i} ${p.id}`}>
              <td>{i + 1}</td>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.address}</td>
              <td>{p.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableHeader({ captions }: { captions: React.ReactNode[] }) {
  return (
    <thead>
      <tr>
        {captions.map((s, i) => (
          <td key={i}>{s}</td>
        ))}
      </tr>
    </thead>
  );
}
