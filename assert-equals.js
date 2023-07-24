function assertEquals(expect, actual) {
  if (arguments.length < 2) {
    throw new Error("Expect at least two arguments: expect and actual");
  }

  const expectedType = Array.isArray(expect) ? "array" : typeof expect;
  const actualType = Array.isArray(actual) ? "array" : typeof actual;

  if (expectedType !== actualType) {
    // throws an error if types are different
    throw new Error(
      `Expected type ${expectedType}, but found type ${actualType}`
    );
  }

  switch (expectedType) {
    case "array":
      compareArrays(expect, actual);
      break;

    case "object":
      compareObjects(expect, actual);
      break;

    default:
      compareOthers(expect, actual);
  }
}

function compareArrays(expect, actual) {
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
}

function compareObjects(expect, actual) {
  if (expect !== null && actual !== null) {
    const expectedKeys = Object.keys(expect);
    const actualKeys = Object.keys(actual);

    if (expectedKeys.length !== actualKeys.length) {
      throw new Error(
        `Expected keys [${expectedKeys}], but found keys [${actualKeys}]`
      );
    }

    for (const key of expectedKeys) {
      if (!(key in actual)) {
        throw new Error(
          `Expected object with key '${key}', but found object without this key`
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
  }
}

function compareOthers(expect, actual) {
  if (expect !== actual) {
    throw new Error(
      `Expected ${JSON.stringify(expect)} but found ${JSON.stringify(actual)}`
    );
  }
}

module.exports = assertEquals;
