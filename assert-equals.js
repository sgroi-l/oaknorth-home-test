function assertEquals(expect, actual) {
  const expectedType = typeof expect;
  const actualType = typeof actual;

  if (expectedType !== actualType) {
    throw new Error(
      `Expected type ${expectedType}, but found type ${actualType}`
    );
  } else if (Array.isArray(expect) && Array.isArray(actual)) {
    if (expect.length !== actual.length) {
      throw new Error(
        `Expected array length ${expect.length}, but found ${actual.length}`
      );
    }

    for (let i = 0; i < expect.length; i++) {
      if (expect[i] !== actual[i]) {
        throw new Error(`Expected "${expect[i]}" but found "${actual[i]}"`);
      }
    }
  } else if (expectedType === "object" && expect !== null && actual !== null) {
    for (const key in expect) {
      if (!(key in actual)) {
        throw new Error(
          `Expected object with key "${key}" but found object without this key`
        );
      }

      if (expect[key] !== actual[key]) {
        throw new Error(
          `Expected same values, but found different values for key [${key}]`
        );
      }
    }

    for (const key in actual) {
      if (!(key in expect)) {
        throw new Error(`Found unexpected key [${key}] in object`);
      }
    }
  } else if (expectedType === "number") {
    if (expect !== actual) {
      throw new Error(`Expected ${expect} but found ${actual}`);
    }
  } else if (expect !== actual) {
    throw new Error(`Expected "${expect}" but found "${actual}"`);
  }
}

//assertEquals(
// { name: "laurie", age: { now: 31 } },
//  { name: "laurie", age: { now: 31 } }
//);

module.exports = assertEquals;
