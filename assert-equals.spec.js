const assertEquals = require("./assert-equals");

describe("assertEquals", () => {
  describe("when expected and actual are the same string", () => {
    it("returns without throwing an error", () => {
      expect(() => assertEquals("abc", "abc")).not.toThrow();
    });
  });

  describe("when expected and actual are different strings", () => {
    it("throws an error", () => {
      expect(() => assertEquals("abc", "abcd")).toThrow(
        `Expected "abc" but found "abcd"`
      );
    });
  });

  describe("when expected and actual are different numbers", () => {
    it("throws an error", () => {
      const expectedMessage = `Expected 1 but found 2`;
      expect(() => assertEquals(1, 2)).toThrow(expectedMessage);
    });
  });

  describe("when expected and actual are different types", () => {
    it("throws an error", () => {
      expect(() => assertEquals(1, "1")).toThrow(
        `Expected type number, but found type string`
      );
    });
  });

  describe("when expected and actual are different lengths", () => {
    it("throws an error", () => {
      expect(() => assertEquals(["a", "b"], ["a", "b", "c"])).toThrow(
        `Expected array length 2, but found 3`
      );
    });
  });

  describe("when expected and actual are different arrays of the same length", () => {
    it("throws an error", () => {
      expect(() => assertEquals(["a", "b"], ["a", "d"])).toThrow(
        `Expected "b" but found "d"`
      );
    });
  });

  describe("when expected and actual are objects with different number of keys ", () => {
    it("throws an error", () => {
      expect(() =>
        assertEquals(
          { name: "laurie", age: 31 },
          { name: "laurie", age: 31, height: 182 }
        )
      ).toThrow(`Found unexpected key [height] in object`);
    });
  });

  describe("when expected and actual are objects with different values", () => {
    it("throws an error", () => {
      expect(() =>
        assertEquals({ name: "laurie", age: 31 }, { name: "laurie", age: 30 })
      ).toThrow(
        `Expected same values, but found different values for key [age]`
      );
    });
  });

  describe("when expected and actual are nested objects", () => {
    it("returns without throwing an error", () => {
      expect(() =>
        assertEquals(
          { name: "laurie", age: { now: 31 } },
          { name: "laurie", age: { now: 31 } }
        )
      ).not.toThrow();
    });
  });
});
