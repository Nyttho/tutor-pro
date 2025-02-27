export const toSnakeCase = (str) =>
  str.replace(/([A-Z])/g, "_$1").toLowerCase();

export const convertKeysToSnake = (obj) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [toSnakeCase(key), value])
  );

export const toCamelCase = (str) =>
  str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

export const convertKeysToCamel = (obj) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [toCamelCase(key), value])
  );
