import { allFakers } from "@faker-js/faker";

const config = {
  defaultSeed: 0,
  locales: [allFakers.en, allFakers.de, allFakers.fr],
  errorsFaker: allFakers.ja,
  defaultLocale: 0,
  idCap: 1_000_000,
  errSliderCap: 10,
  errSliderStep: 0.25,
  errInputCap: 1000,
  initialBunchCnt: 2,
  entriesBunchSize: 10,
};

export default config;
