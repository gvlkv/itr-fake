import Person from "@/app/model/person";
import config from "@/app/lib/config";
import type { Faker as FakerLib } from "@faker-js/faker";

export default class Faker {
  // eslint-disable-next-line no-use-before-define
  private static _instance: Faker;

  private _faker: FakerLib;
  private _fakerErrors: FakerLib;
  private _alphas: Array<string>;
  private _numbers: string = "0123456789";
  private _errCnt: number;
  private _usedIds: Set<number> = new Set();

  private constructor() {
    this._fakerErrors = config.errorsFaker;
    this._faker = config.locales[0];
    this._setLocale(config.defaultLocale);
    this._alphas = [
      ...new Set(
        Array(100)
          .fill(0)
          .map((_) => this._faker.person.fullName())
          .join("")
      ),
    ];
    this._setSeed(config.defaultSeed);
    this._errCnt = 0;
    this._resetIdGen();
  }

  public static get(): Faker {
    if (!Faker._instance) {
      Faker._instance = new Faker();
    }

    return Faker._instance;
  }

  private _setSeed(seed: number) {
    this._faker.seed(seed);
    this._fakerErrors.seed(seed);
  }

  private _setLocale(locale: number) {
    this._faker = config.locales[locale];
  }

  private _setErrorCnt(cnt: number) {
    this._errCnt = cnt;
  }

  private _resetIdGen() {
    this._usedIds.clear();
  }

  private _nextId() {
    let genId;
    do {
      genId = this._nextInt(config.idCap);
    } while (this._usedIds.has(genId));
    this._usedIds.add(genId);
    return genId;
  }

  private _nextAddr() {
    return this._nextInt(3) !== 0
      ? this._faker.location.city() +
          ", " +
          this._faker.location.streetAddress()
      : this._faker.location.city();
  }

  public fakePerson(): Person {
    return {
      id: this._nextId(),
      name: this._faker.person.fullName(),
      address: this._nextAddr(),
      phone: this._faker.phone.number(),
    };
  }

  public generateAll(
    seed: number,
    locale: number,
    errCnt: number,
    bunches: number
  ) {
    return Array(bunches)
      .fill(0)
      .flatMap((_, ind) =>
        Faker.get().generateBunch(seed, locale, errCnt, ind)
      );
  }

  public generateBunch(
    seed: number,
    locale: number,
    errCnt: number,
    index: number
  ) {
    this._resetIdGen();
    this._setSeed(seed + index);
    this._setLocale(locale);
    this._setErrorCnt(errCnt);
    const persons = Array(config.entriesBunchSize)
      .fill(0)
      .map(() => Faker.get().fakePerson());
    this._applyErrors(persons);
    return persons;
  }

  private _applyErrors(persons: Array<Person>): void {
    const rounds = Math.floor(this._errCnt) + 1;
    const lastProbability = this._errCnt - Math.floor(this._errCnt);
    const maxAddrLen = persons
      .map((p) => p.address.length)
      .reduce((x, y) => (x > y ? x : y));
    const minAddrLen = persons
      .map((p) => p.address.length)
      .reduce((x, y) => (x < y ? x : y));
    const maxPhoneLen = persons
      .map((p) => p.phone.length)
      .reduce((x, y) => (x > y ? x : y));
    const minPhoneLen = persons
      .map((p) => p.phone.length)
      .reduce((x, y) => (x < y ? x : y));
    const maxNameLen = persons
      .map((p) => p.name.length)
      .reduce((x, y) => (x > y ? x : y));
    const minNameLen = persons
      .map((p) => p.name.length)
      .reduce((x, y) => (x < y ? x : y));

    for (let i = 0; i < rounds; i++) {
      const lastRound = i === rounds - 1;
      for (let p of persons) {
        if (lastRound && this._fakerErrors.number.float(1) > lastProbability)
          continue;
        switch (this._nextIntForErrors(3)) {
          case 0:
            p.address = this._shakeString(
              p.address,
              minAddrLen,
              maxAddrLen,
              false
            );
            break;
          case 1:
            p.phone = this._shakeString(
              p.phone,
              minPhoneLen,
              maxPhoneLen,
              true
            );
            break;
          case 2:
            p.name = this._shakeString(p.name, minNameLen, maxNameLen, false);
            break;
        }
      }
    }
  }

  private _shakeString(
    str: string,
    minAllowedLenght: number,
    maxAllowedLength: number,
    useNumbers: boolean
  ): string {
    let validOperations = [
      this._exchangeInString.bind(this),
      ...(str.length > minAllowedLenght
        ? [this._deleteInString.bind(this)]
        : []),
      ...(str.length < maxAllowedLength
        ? [this._insertInString.bind(this, useNumbers)]
        : []),
    ];
    str = this._giveRandomElementForErrors(validOperations)(str);
    return str;
  }

  private _deleteInString(str: string): string {
    const deletePos = this._nextIntForErrors(str.length);
    return str.substring(0, deletePos) + str.substring(deletePos + 1);
  }

  private _insertInString(useNumbers: boolean, str: string): string {
    const possibleChars = useNumbers ? [...this._numbers] : this._alphas;
    const insertPos = this._nextIntForErrors(str.length + 1);
    const insertChar = this._giveRandomElementForErrors(possibleChars);
    return str.substring(0, insertPos) + insertChar + str.substring(insertPos);
  }

  private _exchangeInString(str: string): string {
    const exchangePos = this._nextIntForErrors(str.length - 1);
    return (
      str.substring(0, exchangePos) +
      str[exchangePos + 1] +
      str[exchangePos] +
      str.substring(exchangePos + 2)
    );
  }

  private _nextInt(upper: number): number {
    return this._faker.number.int() % upper;
  }

  private _nextIntForErrors(upper: number): number {
    return this._fakerErrors.number.int() % upper;
  }

  private _giveRandomElement<T>(arr: Array<T>): T {
    return arr[this._nextInt(arr.length)];
  }

  private _giveRandomElementForErrors<T>(arr: Array<T>): T {
    return arr[this._nextIntForErrors(arr.length)];
  }
}
