import { convert } from "../src/index";

describe("valid iregexp patterns", () => {
  it("converts simple", () => {
    expect(convert("foo")).toStrictEqual(/^(?:foo)$/u);
    expect(convert("foo.")).toStrictEqual(/^(?:foo[^\n\r])$/u);
  });

  it("converts edge cases", () => {
    // eslint-disable-next-line prettier/prettier
    expect(convert("f[.](o.|p.)+[^.]"))
      .toStrictEqual(/^(?:f[.](o[^\n\r]|p[^\n\r])+[^.])$/u);
  });

  it("returns undefined on failure", () => {
    expect(convert("(?<group>[a-z]*)")).toBe(undefined);
  });
});
