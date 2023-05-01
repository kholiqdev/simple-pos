export function safeParseInt(val: string | number, defaultValue = 0): number {
  if (typeof val === 'number') {
    return val;
  } else {
    const parsedString = parseInt(val?.replace(/\./g, ''), 10);
    if (isNaN(parsedString) || !isFinite(parsedString)) {
      return defaultValue;
    }
    return parsedString;
  }
}
