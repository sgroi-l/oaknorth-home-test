function assertEquals(expect, actual) {
  const expectedType = typeof expect;
  const actualType = typeof actual;

  if (expectedType !== actualType) {
    // throws an error if types are different
    throw new Error(
      `Expected type ${expectedType}, but found type ${actualType}`
    );
  } else if (Array.isArray(expect) && Array.isArray(actual)) {
    if (expect.length !== actual.length) {
      // throws an error if arrays of differing lengths
      throw new Error(
        `Expected array length ${expect.length}, but found ${actual.length}`
      );
    }

    for (let i = 0; i < expect.length; i++) {
      if (expect[i] !== actual[i]) {
        // throws an error if arrays elements differ
        throw new Error(`Expected "${expect[i]}" but found "${actual[i]}"`);
      }
    }
  } else if (expectedType === "object" && expect !== null && actual !== null) {
    const expectedKeys = Object.keys(expect);
    const actualKeys = Object.keys(actual);

    if (expectedKeys.length !== actualKeys.length) {
      // throws an error if objects with differing number of properties
      throw new Error(
        `Expected keys [${expectedKeys}], but found keys [${actualKeys}]`
      );
    }

    for (const key of expectedKeys) {
      if (!(key in actual)) {
        // throws an error if objects property names or values are different
        throw new Error(
          `Expected object with key ${key} but found object without this key`
        );
      }
      // Recursive comparison for nested objects
      if (typeof expect[key] === "object" && typeof actual[key] === "object") {
        assertEquals(expect[key], actual[key]);
      } else if (expect[key] !== actual[key]) {
        throw new Error(
          `Expected '${key}: ${expect[key]}', but found '${key}: ${actual[key]}'`
        );
      }
    }
  } else if (expectedType === "number") {
    if (expect !== actual) {
      // throw an error if different numbers
      throw new Error(`Expected ${expect} but found ${actual}`);
    }
  } else if (expect !== actual) {
    throw new Error(`Expected "${expect}" but found "${actual}"`);
  }
}

module.exports = assertEquals;
