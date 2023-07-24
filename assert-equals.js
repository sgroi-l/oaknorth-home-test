function assertEquals(expect, actual) {
  // Check if at least two arguments (expect and actual) are provided
  if (arguments.length < 2) {
    throw new Error("Expect at least two arguments: expect and actual");
  }

  // Determine the types of expected and actual values
  const expectedType = Array.isArray(expect) ? "array" : typeof expect;
  const actualType = Array.isArray(actual) ? "array" : typeof actual;

  // Check if the types of expected and actual values match
  if (expectedType !== actualType) {
    // Throws an error if types are different
    throw new Error(
      `Expected type ${expectedType}, but found type ${actualType}`
    );
  }
  // Perform comparison based on the data types
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

function compareArrays(expect, actual, visitedObjects = new Set()) {
  if (expect.length !== actual.length) {
    throw new Error(
      `Expected array length ${expect.length}, but found ${actual.length}`
    );
  }

  for (let i = 0; i < expect.length; i++) {
    if (typeof expect[i] === "object" && typeof actual[i] === "object") {
      // For array elements that are objects, perform a recursive comparison
      compareObjects(expect[i], actual[i], visitedObjects);
    } else if (expect[i] !== actual[i]) {
      throw new Error(`Expected "${expect[i]}" but found "${actual[i]}"`);
    }
  }
}

function compareObjects(expect, actual) {
  // Check if both objects are not null
  if (expect !== null && actual !== null) {
    // Get the keys of expected and actual objects
    const expectedKeys = Object.keys(expect);
    const actualKeys = Object.keys(actual);

    // Check if the number of properties (keys) is the same
    if (expectedKeys.length !== actualKeys.length) {
      throw new Error(
        `Expected keys [${expectedKeys}], but found keys [${actualKeys}]`
      );
    }

    // Iterate through the object properties
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
  // If the data types are not object or array, perform a direct comparison
  if (expect !== actual) {
    throw new Error(
      `Expected ${JSON.stringify(expect)} but found ${JSON.stringify(actual)}`
    );
  }
}

module.exports = assertEquals;
