export class Repository {
  static *getBigArray(): Iterable<string> {
    for (let i = 0; i < 100_000_000; i++) {
      yield i.toString().padStart(9, "0") + "\n";
    }
  }
}
