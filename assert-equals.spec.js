const assertEquals = require("./assert-equals");

describe("assertEquals", () => {
  describe("when the number of arguments is less than two", () => {
    it("throws an error when no arguments are given", () => {
      expect(() => assertEquals()).toThrow(
        `Expect at least two arguments: expect and actual`
      );
    });

    it("throws an error when only one argument is given", () => {
      expect(() => assertEquals("Hello")).toThrow(
        `Expect at least two arguments: expect and actual`
      );
    });
  });
  describe("when expected and actual are strings", () => {
    it("returns without throwing an error when strings match", () => {
      expect(() => assertEquals("abc", "abc")).not.toThrow();
    });

    it("throws an error when strings don't match", () => {
      expect(() => assertEquals("abc", "abcd")).toThrow(
        `Expected "abc" but found "abcd"`
      );
    });
  });

  describe("when expected and actual are numbers", () => {
    it("throws an error when numbers are different", () => {
      expect(() => assertEquals(1, 2)).toThrow(`Expected 1 but found 2`);
    });

    it("returns without throwing an error when numbers match", () => {
      expect(() => assertEquals(30, 30)).not.toThrow();
    });
  });

  describe("when expected and actual are different types", () => {
    it("throws an error", () => {
      expect(() => assertEquals(1, "1")).toThrow(
        `Expected type number, but found type string`
      );
    });
  });

  describe("when expected and actual are arrays", () => {
    it("throws an error if arrays are different lengths", () => {
      expect(() => assertEquals(["a", "b"], ["a", "b", "c"])).toThrow(
        `Expected array length 2, but found 3`
      );
    });

    it("throws an error when expected and actual are different arrays of the same length", () => {
      expect(() => assertEquals(["a", "b"], ["a", "d"])).toThrow(
        `Expected "b" but found "d"`
      );
    });

    it("throws an error when expected and actual are arrays with different types inside", () => {
      expect(() =>
        assertEquals(["a", { name: "Laurie" }], ["a", 31])
      ).toThrow();
    });

    it("returns without throwing an error when accessing nested objects in arrays", () => {
      expect(() =>
        assertEquals(
          [{ name: "laurie", age: { now: 31 } }],
          [{ name: "laurie", age: { now: 31 } }]
        )
      ).not.toThrow();
    });
  });

  describe("when expected and actual are objects", () => {
    it("throws an error when objects have a different number of propereties ", () => {
      expect(() =>
        assertEquals(
          { name: "laurie", age: 31 },
          { name: "laurie", age: 31, height: 182 }
        )
      ).toThrow(`Expected keys [name,age], but found keys [name,age,height]`);
    });

    it("throws an error when expected and actual are objects with different properties", () => {
      expect(() => assertEquals({ name: "laurie" }, { age: 31 })).toThrow(
        `Expected object with key 'name', but found object without this key`
      );
      expect(() =>
        assertEquals({ name: "laurie", age: 31 }, { name: "laurie", age: 30 })
      ).toThrow(`Expected 'age: 31', but found 'age: 30'`);
    });

    it("returns without throwing an error when accessing nested objects", () => {
      expect(() =>
        assertEquals(
          { name: "laurie", age: { now: 31 } },
          { name: "laurie", age: { now: 31 } }
        )
      ).not.toThrow();
    });

    it("returns without throwing an error when objects orders are different", () => {
      expect(() =>
        assertEquals(
          { age: { now: 31 }, name: "laurie" },
          { name: "laurie", age: { now: 31 } }
        )
      ).not.toThrow();
    });
  });

  describe("when expected and actual are circular objects", () => {
    it.todo("throws an error when objects have circular references");
    it.todo("throws an error when nested objects have circular references");
    it.todo("throws an error when nested arrays have circular references");
  });
});
