const iregexp = require("./iregexp");

/**
 * Return _true_ if _pattern_ is a valid I-Regexp
 * @param {string} pattern - Regular expression pattern to check.
 * @returns true if _pattern_ is valid, or false otherwise.
 */
function check(pattern) {
  try {
    iregexp.parse(pattern, {});
  } catch (error) {
    if (error instanceof iregexp.SyntaxError) {
      return false;
    }
    throw error;
  }
  return true;
}

module.exports = { check };
