"use client";

import LocaleChooser from "@/app/component/locale-chooser";
import ErrCnt from "@/app/component/err-cnt";
import PersonTable from "@/app/component/person-table";
import Seed from "@/app/component/seed";
import Faker from "@/app/faker/person";
import { useState } from "react";
import config from "@/app/lib/config";
import ExportButton from "@/app/component/export-button";

export default function FakerPage() {
  const [seed, setSeed] = useState(config.defaultSeed);
  const [locale, setLocale] = useState(config.defaultLocale);
  const [errCnt, setErrCnt] = useState(0);
  const [bunchCnt, setBunchCnt] = useState(config.initialBunchCnt);
  const people = Faker.get().generateAll(seed, locale, errCnt, bunchCnt);
  return (
    <div className="flex flex-col rounded h-screen">
      <div className="flex flex-row justify-items-center place-content-between items-center w-full space-x-2">
        <LocaleChooser option={locale} onChange={setLocale} />
        <ErrCnt errValue={errCnt} onErrValueChange={setErrCnt} />
        <Seed seed={seed} onSeedChange={setSeed} />
        <ExportButton people={people} />
      </div>
      <div className="mt-4 overflow-x-auto max-h-full max-w-full">
        <PersonTable people={people} setBunchCnt={setBunchCnt} />
      </div>
    </div>
  );
}
