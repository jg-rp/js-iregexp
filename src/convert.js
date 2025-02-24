const iregexp = require("./iregexp");

/**
 * Return the equivalent ECMAscript RegExp if _pattern_ is a valid I-Regexp
 * @param {string} pattern - Regular expression pattern to check.
 * @returns RegExp if _pattern_ is valid, undefined otherwise
 */
function convert(pattern) {
  try {
    return iregexp.parse(pattern, {});
  } catch (error) {
    return undefined;
  }
}

module.exports = { convert };
